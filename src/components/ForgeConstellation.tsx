"use client";

import { useEffect, useRef, useState } from "react";
import { Hammer } from "lucide-react";
import { FORGE_ROOT, type ForgeNode } from "./forge/forgeData";
import { SparkStar } from "./forge/SparkStar";

// round2 統一精度，避免 SSR/client 浮點差造成 hydration mismatch
const round2 = (n: number) => Math.round(n * 100) / 100;

// ── 主火花佈局：角度+半徑手調，散開錯落、長度刻意不一（非等長、非十字）──────
const LAYOUT_4 = [
  { angle: -64, r: 38 }, // 我提供什麼 — 右上（中長）
  { angle: 24, r: 31 }, //  近期作品 — 右（短）
  { angle: 120, r: 37 }, // 關於鍛造所 — 左下（長）
  { angle: 210, r: 29 }, // 學員見證 — 左上（最短）
];
function nodePos(i: number) {
  const { angle, r } = LAYOUT_4[i] ?? { angle: -90 + i * 90, r: 29 };
  const rad = (angle * Math.PI) / 180;
  return { x: round2(50 + r * Math.cos(rad)), y: round2(50 + r * Math.sin(rad)) };
}

// 弧線：起點→終點的二次貝茲，控制點往下垂（重力墜落感）。
// 配合 SVG preserveAspectRatio="none"（容器扁，弧度會跟著壓，sagMul 補償加大）。
function arcPath(x1: number, y1: number, x2: number, y2: number, sagMul = 0.26) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  return `M ${round2(x1)} ${round2(y1)} Q ${round2(mx)} ${round2(my + dist * sagMul)} ${round2(x2)} ${round2(y2)}`;
}

// 小火花分支：從父火花往「離心方向」扇形長出，散更開、長度不一（不碰中心、不抽換主支線）
function childPos(parent: { x: number; y: number }, i: number, n: number) {
  const outAng = (Math.atan2(parent.y - 50, parent.x - 50) * 180) / Math.PI;
  const arc = n <= 1 ? 0 : 132;
  const a = outAng + (i - (n - 1) / 2) * (arc / Math.max(1, n - 1));
  const rad = (a * Math.PI) / 180;
  const dist = 16 + (i % 3) * 5; // 長度不一
  return { x: round2(parent.x + dist * Math.cos(rad)), y: round2(parent.y + dist * Math.sin(rad)) };
}

// 砸擊瞬間從中心炸開的火星碎屑
const EMBERS = Array.from({ length: 16 }, (_, i) => {
  const angle = (i * 360) / 16 + (i % 3) * 7;
  const rad = (angle * Math.PI) / 180;
  const dist = 20 + (i % 4) * 9;
  return {
    dx: round2(Math.cos(rad) * dist),
    dy: round2(Math.sin(rad) * dist),
    size: 3 + (i % 3) * 3,
    delay: (i % 5) * 16,
  };
});

export function ForgeConstellation() {
  const ref = useRef<HTMLDivElement>(null);
  const [struck, setStruck] = useState(false); // 火花是否已炸出
  const [strikeKey, setStrikeKey] = useState(0); // 重敲時 +1，重播鐵鎚 + 火星動畫
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // 捲到才敲：IntersectionObserver 進入視窗一次性觸發（解決「載入即播、滾到已結束」）
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    if (reduce) {
      // rAF callback 觸發，避免在 effect body 同步 setState（React 19 lint rule）
      const raf = requestAnimationFrame(() => setStruck(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          setStrikeKey((k) => k + 1); // 播鐵鎚敲擊
          timer = setTimeout(() => setStruck(true), 540); // ≈ 敲到底那刻火花炸出
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const replay = () => {
    setExpandedId(null);
    setHoveredId(null);
    setStruck(false);
    setStrikeKey((k) => k + 1);
    setTimeout(() => setStruck(true), 540);
  };

  const onMainClick = (node: ForgeNode) => {
    setExpandedId((cur) => (cur === node.id ? null : node.id));
    setHoveredId(null);
  };

  const expanded = expandedId ? FORGE_ROOT.find((n) => n.id === expandedId) ?? null : null;
  const hoveredNode =
    (hoveredId &&
      (FORGE_ROOT.find((n) => n.id === hoveredId) ||
        FORGE_ROOT.flatMap((n) => n.children ?? []).find((c) => c.id === hoveredId))) ||
    null;
  const caption = hoveredNode?.blurb ?? expanded?.blurb ?? "";

  return (
    <div className="flex w-full flex-col items-center">
      {/* 舞台 */}
      <div
        ref={ref}
        className="relative"
        style={{ width: "min(92vw, 680px)", aspectRatio: "3 / 2" }}
        onMouseLeave={() => setHoveredId(null)}
      >
        {/* 主支線 + 分支連線 */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          {/* 主支線：中心 → 四顆主火花（恆在，不因展開而消失）*/}
          {FORGE_ROOT.map((node, i) => {
            const p = nodePos(i);
            const otherExpanded = expandedId !== null && expandedId !== node.id;
            const dimByHover = hoveredId !== null && hoveredId !== node.id;
            return (
              <path
                key={`spine-${node.id}`}
                d={arcPath(50, 50, p.x, p.y)}
                fill="none"
                stroke={node.tint}
                strokeWidth="1"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{
                  opacity: struck ? (otherExpanded || dimByHover ? 0.12 : 0.4) : 0,
                  transition: "opacity 450ms ease",
                  transitionDelay: struck ? `${200 + i * 70}ms` : "0ms",
                }}
              />
            );
          })}
          {/* 分支連線：展開的主火花 → 它的小火花 */}
          {expanded?.children?.map((child, ci) => {
            const pp = nodePos(FORGE_ROOT.findIndex((n) => n.id === expanded.id));
            const cp = childPos(pp, ci, expanded.children!.length);
            return (
              <path
                key={`twig-${child.id}`}
                d={arcPath(pp.x, pp.y, cp.x, cp.y, 0.32)}
                fill="none"
                stroke={child.tint}
                strokeWidth="1"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{
                  opacity: 0.5,
                  transition: "opacity 400ms ease",
                  transitionDelay: `${ci * 60}ms`,
                }}
              />
            );
          })}
        </svg>

        {/* 砸擊火星碎屑（敲到底炸出，重敲重播）*/}
        <div
          key={`embers-${strikeKey}`}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2"
          style={{ width: 0, height: 0 }}
        >
          {strikeKey > 0 &&
            EMBERS.map((e, i) => (
              <span
                key={i}
                className="absolute rounded-full"
                style={{
                  left: 0,
                  top: 0,
                  width: e.size,
                  height: e.size,
                  background: "var(--color-spark)",
                  boxShadow: "0 0 6px var(--color-spark)",
                  ["--dx" as string]: `${e.dx}%`,
                  ["--dy" as string]: `${e.dy}%`,
                  opacity: 0,
                  animation: `forge-ember 760ms ease-out ${e.delay}ms both`,
                }}
              />
            ))}
        </div>

        {/* 中央鐵鎚（捲到自動敲；點擊重敲）*/}
        <button
          type="button"
          onClick={replay}
          aria-label="敲擊鐵鎚，火花重新炸開"
          className="absolute left-1/2 top-1/2 outline-none"
          style={{
            transform: "translate(-50%, -50%)",
            opacity: expandedId || hoveredId ? 0.5 : 1,
            transition: "opacity 300ms ease",
          }}
        >
          {/* 砸擊閃光 */}
          <span
            key={`flash-${strikeKey}`}
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: 150,
              height: 150,
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-spark) 75%, transparent) 0%, transparent 60%)",
              transform: "translate(-50%, -50%)",
              opacity: 0,
              animation: strikeKey > 0 ? "forge-flash 700ms ease-out" : "none",
            }}
          />
          <span
            key={`hammer-${strikeKey}`}
            className="block"
            style={{
              transformOrigin: "bottom center",
              animation:
                strikeKey > 0 ? "forge-strike 900ms cubic-bezier(0.45,0,0.25,1) both" : "none",
            }}
          >
            <Hammer
              style={{
                width: "clamp(48px, 12vmin, 70px)",
                height: "clamp(48px, 12vmin, 70px)",
                color: "var(--color-ink)",
              }}
              strokeWidth={1.5}
            />
          </span>
        </button>

        {/* 四顆主火花 */}
        {FORGE_ROOT.map((node, i) => {
          const p = nodePos(i);
          const isHovered = hoveredId === node.id;
          const isExpanded = expandedId === node.id;
          const dim =
            (hoveredId !== null && !isHovered) || (expandedId !== null && !isExpanded);
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => onMainClick(node)}
              onMouseEnter={() => setHoveredId(node.id)}
              onFocus={() => setHoveredId(node.id)}
              onBlur={() => setHoveredId(null)}
              aria-label={`${node.label} —— ${node.blurb}`}
              aria-expanded={isExpanded}
              className="group absolute outline-none"
              style={{
                left: `${struck ? p.x : 50}%`,
                top: `${struck ? p.y : 50}%`,
                transform: "translate(-50%, -50%)",
                opacity: struck ? (dim ? 0.34 : 1) : 0,
                transition:
                  "left 760ms cubic-bezier(0.18,1.1,0.3,1), top 760ms cubic-bezier(0.18,1.1,0.3,1), opacity 360ms ease",
                transitionDelay: struck ? `${i * 80}ms` : "0ms",
                zIndex: isHovered || isExpanded ? 20 : 10,
              }}
            >
              <SparkNode node={node} active={isHovered || isExpanded} main />
            </button>
          );
        })}

        {/* 展開的小火花（就地長出，主支線/主火花不抽換）*/}
        {expanded?.children?.map((child, ci) => {
          const pp = nodePos(FORGE_ROOT.findIndex((n) => n.id === expanded.id));
          const cp = childPos(pp, ci, expanded.children!.length);
          const isHovered = hoveredId === child.id;
          return (
            <a
              key={`${expanded.id}-${child.id}`}
              href={child.href}
              onMouseEnter={() => setHoveredId(child.id)}
              onFocus={() => setHoveredId(child.id)}
              onBlur={() => setHoveredId(null)}
              onClick={() => setExpandedId(null)}
              aria-label={child.blurb}
              className="group absolute outline-none"
              style={{
                left: `${cp.x}%`,
                top: `${cp.y}%`,
                transform: "translate(-50%, -50%)",
                opacity: 0,
                animation: `forge-twig 460ms cubic-bezier(0.16,1,0.3,1) ${ci * 70}ms forwards`,
                zIndex: isHovered ? 25 : 15,
              }}
            >
              <SparkNode node={child} active={isHovered} />
            </a>
          );
        })}
      </div>

      {/* Caption：hover 才顯示該火花描述（無形容詞標語）*/}
      <p
        className="mt-6 min-h-[2.75rem] max-w-md px-4 text-center font-sans text-sm leading-[1.7]"
        style={{ color: "var(--color-fg-muted)" }}
        aria-live="polite"
      >
        {caption}
      </p>
    </div>
  );
}

// 單顆火花：本體 + hover 高亮發光 + 小火花 shimmer 分支（星星散開）
const SHIMMER = [-46, 0, 46];
function SparkNode({
  node,
  active,
  main = false,
}: {
  node: ForgeNode;
  active: boolean;
  main?: boolean;
}) {
  const size = main ? "clamp(38px, 9.5vmin, 54px)" : "clamp(28px, 7vmin, 38px)";
  return (
    <span className="relative flex flex-col items-center gap-1.5">
      {/* hover shimmer：小火花往上方扇形彈散（純裝飾，呼應「星星散開」）*/}
      <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {SHIMMER.map((a, si) => {
          const rad = (a * Math.PI) / 180;
          const d = 26;
          return (
            <span
              key={si}
              className="absolute left-0 top-0"
              style={{
                ["--bx" as string]: `${round2(Math.sin(rad) * d)}px`,
                ["--by" as string]: `${round2(-Math.cos(rad) * d)}px`,
                opacity: 0,
                animation: active
                  ? `forge-branch 520ms cubic-bezier(0.16,1,0.3,1) ${si * 50}ms forwards`
                  : "none",
              }}
            >
              <SparkStar size={8} color={node.tint} coreOpacity={0.6} />
            </span>
          );
        })}
      </span>

      {/* 主體 */}
      <span
        className="transition-all duration-300"
        style={{
          filter: active
            ? `drop-shadow(0 0 12px ${node.tint}) drop-shadow(0 0 26px ${node.tint})`
            : `drop-shadow(0 0 5px color-mix(in srgb, ${node.tint} 50%, transparent))`,
          transform: active ? "scale(1.28)" : "scale(1)",
        }}
      >
        <SparkStar size={size} color={node.tint} coreOpacity={active ? 1 : 0.8} />
      </span>

      {/* 標籤 */}
      <span
        className="font-sans leading-tight transition-colors duration-300"
        style={{
          fontSize: main ? "clamp(0.74rem, 2.4vmin, 0.9rem)" : "clamp(0.68rem, 2vmin, 0.8rem)",
          maxWidth: "11ch",
          textAlign: "center",
          color: active ? "var(--color-ink)" : "var(--color-fg-muted)",
        }}
      >
        {node.label}
      </span>
    </span>
  );
}
