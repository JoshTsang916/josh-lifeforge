"use client";

import { useEffect, useMemo, useState } from "react";
import { Hammer } from "lucide-react";
import { FORGE_ROOT, type ForgeNode } from "./forge/forgeData";
import { SparkStar } from "./forge/SparkStar";

// ── 佈局 ────────────────────────────────────────────────
// 火花從鐵鎚砸擊點往外迸散。刻意「不」均分圓周（均分=正交十字最死板），
// 改用一組手調的角度 + 半徑，讓火花像真的炸開後散落、高低遠近不一。
// round2 統一精度，避免 SSR/client 浮點差造成 hydration mismatch。
const round2 = (n: number) => Math.round(n * 100) / 100;

// 角度：0=正右，順時針增。半徑：% of stage 半邊。手調出「散開」的感覺。
// 依節點數量取對應組（4 顆走 LAYOUT_4，其餘 fallback 均分+微擾）。
const LAYOUT_4 = [
  { angle: -68, r: 36 }, // 右上偏上
  { angle: 22, r: 33 }, // 右偏下
  { angle: 108, r: 38 }, // 左下偏下
  { angle: 200, r: 32 }, // 左上
];
const LAYOUT_3 = [
  { angle: -74, r: 35 },
  { angle: 44, r: 37 },
  { angle: 158, r: 33 },
];

function nodePos(index: number, total: number) {
  let angle: number, r: number;
  const table = total === 4 ? LAYOUT_4 : total === 3 ? LAYOUT_3 : null;
  if (table) {
    ({ angle, r } = table[index]);
  } else {
    // fallback：均分 + 交錯半徑微擾
    angle = -90 + index * (360 / total) + (index % 2 ? 9 : -7);
    r = 34 + (index % 2 ? -3 : 3);
  }
  const rad = (angle * Math.PI) / 180;
  return { x: round2(50 + r * Math.cos(rad)), y: round2(50 + r * Math.sin(rad)), angle };
}

// 樹導航
function resolve(path: string[]): { parent: ForgeNode | null; nodes: ForgeNode[] } {
  let nodes = FORGE_ROOT;
  let parent: ForgeNode | null = null;
  for (const id of path) {
    const found = nodes.find((n) => n.id === id);
    if (!found || !found.children) break;
    parent = found;
    nodes = found.children;
  }
  return { parent, nodes };
}

// 砸擊瞬間從中心炸開的火星碎屑：一次性向外飛散後淡出。round2（上方宣告）統一精度。
const EMBERS = Array.from({ length: 14 }, (_, i) => {
  const angle = (i * 360) / 14 + (i % 3) * 9;
  const rad = (angle * Math.PI) / 180;
  const dist = 22 + (i % 4) * 9; // 飛散距離 %
  return {
    dx: round2(Math.cos(rad) * dist),
    dy: round2(Math.sin(rad) * dist),
    size: 4 + (i % 3) * 3,
    delay: (i % 5) * 18,
  };
});

export function ForgeConstellation() {
  // idle = 鐵鎚舉著還沒敲；struck = 已敲、火花炸開就位
  const [phase, setPhase] = useState<"idle" | "struck">("idle");
  const [path, setPath] = useState<string[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [burst, setBurst] = useState(0);

  // 進場：鐵鎚砸下 → 在敲到底那刻切 struck（火花炸出）
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setPhase("struck"), reduce ? 0 : 760);
    return () => clearTimeout(t);
  }, []);

  const { parent, nodes } = resolve(path);
  const atRoot = path.length === 0;

  const crumbs = useMemo(() => {
    const out: { label: string; depth: number }[] = [{ label: "鍛造宇宙", depth: 0 }];
    let cur = FORGE_ROOT;
    path.forEach((id, i) => {
      const n = cur.find((x) => x.id === id);
      if (n) {
        out.push({ label: n.label, depth: i + 1 });
        cur = n.children ?? [];
      }
    });
    return out;
  }, [path]);

  const goTo = (depth: number) => {
    setPath((p) => p.slice(0, depth));
    setHovered(null);
    setBurst((b) => b + 1);
  };
  const openNode = (node: ForgeNode) => {
    if (node.children) {
      setPath((p) => [...p, node.id]);
      setHovered(null);
      setBurst((b) => b + 1);
    }
  };

  const activeNode = nodes.find((n) => n.id === hovered) ?? null;
  const caption = activeNode?.blurb ?? parent?.blurb ?? "";

  return (
    <div className="flex w-full flex-col items-center">
      {/* 麵包屑 */}
      <nav
        aria-label="鍛造宇宙路徑"
        className="mb-6 flex min-h-5 items-center gap-2 font-ui text-xs tracking-wider"
      >
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <span key={c.depth} className="flex items-center gap-2">
              {i > 0 && <span className="text-[#7a6651]">›</span>}
              {isLast ? (
                <span className="text-[color:var(--color-spark)]">{c.label}</span>
              ) : (
                <button
                  type="button"
                  onClick={() => goTo(c.depth)}
                  className="text-[#9a866d] transition-colors hover:text-[color:var(--color-spark)]"
                >
                  {c.label}
                </button>
              )}
            </span>
          );
        })}
      </nav>

      {/* 舞台 */}
      <div
        className="relative"
        style={{ width: "min(92vw, 580px)", aspectRatio: "1 / 1" }}
        onMouseLeave={() => setHovered(null)}
      >
        {/* 連線：從中心到每顆火花，hover 時非當前的線一起變暗 */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
          {nodes.map((node, i) => {
            const p = nodePos(i, nodes.length);
            const dim = hovered !== null && hovered !== node.id;
            return (
              <line
                key={`${burst}-${node.id}`}
                x1="50"
                y1="50"
                x2={p.x}
                y2={p.y}
                stroke={node.tint}
                strokeWidth="0.3"
                strokeLinecap="round"
                style={{
                  opacity: phase === "struck" ? (dim ? 0.06 : 0.32) : 0,
                  transition: "opacity 450ms ease",
                  transitionDelay: phase === "struck" ? `${250 + i * 60}ms` : "0ms",
                }}
              />
            );
          })}
        </svg>

        {/* 砸擊火星碎屑（一次性，root 進場 + 重敲時播） */}
        {atRoot && (
          <div
            key={`embers-${burst}`}
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2"
            style={{ width: 0, height: 0 }}
          >
            {EMBERS.map((e, i) => (
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
                  // CSS 變數帶給 keyframe 目標位移
                  ["--dx" as string]: `${e.dx}%`,
                  ["--dy" as string]: `${e.dy}%`,
                  opacity: 0,
                  animation:
                    phase === "struck"
                      ? `forge-ember 820ms ease-out ${e.delay}ms both`
                      : "none",
                }}
              />
            ))}
          </div>
        )}

        {/* 中央：root = 鐵鎚（可重敲）；深入層 = 返回核心 */}
        <CenterCore
          atRoot={atRoot}
          parent={parent}
          phase={phase}
          dimmed={hovered !== null}
          onStrike={() => {
            if (atRoot) {
              setPhase("idle");
              setBurst((b) => b + 1);
              setTimeout(() => setPhase("struck"), 760);
            }
          }}
          onBack={() => goTo(path.length - 1)}
        />

        {/* 火花節點 */}
        {nodes.map((node, i) => {
          const p = nodePos(i, nodes.length);
          const shown = phase === "struck";
          const isHovered = hovered === node.id;
          const dim = hovered !== null && !isHovered;
          const isLeaf = !node.children;

          const handlers = {
            onMouseEnter: () => setHovered(node.id),
            onFocus: () => setHovered(node.id),
            onBlur: () => setHovered(null),
            "aria-label": node.blurb,
            className: "group absolute outline-none",
            style: {
              left: `${shown ? p.x : 50}%`,
              top: `${shown ? p.y : 50}%`,
              transform: "translate(-50%, -50%)",
              opacity: shown ? (dim ? 0.32 : 1) : 0,
              transition:
                "left 720ms cubic-bezier(0.18,1.1,0.3,1), top 720ms cubic-bezier(0.18,1.1,0.3,1), opacity 360ms ease",
              transitionDelay: shown ? `${i * 70}ms` : "0ms",
              zIndex: isHovered ? 20 : 10,
            } as React.CSSProperties,
          };

          const body = (
            <SparkNode node={node} isHovered={isHovered} burst={burst} />
          );

          return isLeaf ? (
            <a key={`${burst}-${node.id}`} href={node.href} {...handlers}>
              {body}
            </a>
          ) : (
            <button
              key={`${burst}-${node.id}`}
              type="button"
              onClick={() => openNode(node)}
              {...handlers}
            >
              {body}
            </button>
          );
        })}
      </div>

      {/* Caption：hover 才顯示該火花描述，無 hover 時留白（不放那種形容詞文案） */}
      <p
        className="mt-8 min-h-[2.5rem] max-w-md px-4 text-center font-sans text-sm leading-[1.7] text-[#bda988]"
        aria-live="polite"
      >
        {caption}
      </p>
    </div>
  );
}

// ── 單顆火花 ────────────────────────────────────────────
// hover 時：本體放大、發光增強，並從身上抽出小火花分支往外彈開（星星散開）。
const BRANCH_ANGLES = [-52, -18, 18, 52, 90]; // 相對「離心方向」往外扇開
function SparkNode({
  node,
  isHovered,
  burst,
}: {
  node: ForgeNode;
  isHovered: boolean;
  burst: number;
}) {
  return (
    <span className="relative flex flex-col items-center gap-2">
      {/* 小火花分支：hover 才長出，從中心往外彈散 */}
      <span aria-hidden className="pointer-events-none absolute left-1/2 top-[18px] -translate-x-1/2">
        {BRANCH_ANGLES.map((a, bi) => {
          const rad = (a * Math.PI) / 180;
          const dist = 30 + (bi % 3) * 10;
          return (
            <span
              key={`${burst}-${bi}`}
              className="absolute left-0 top-0"
              style={{
                ["--bx" as string]: `${round2(Math.sin(rad) * dist)}px`,
                ["--by" as string]: `${round2(-Math.cos(rad) * dist)}px`,
                opacity: 0,
                animation: isHovered
                  ? `forge-branch 520ms cubic-bezier(0.16,1,0.3,1) ${bi * 45}ms forwards`
                  : "none",
              }}
            >
              <SparkStar size={9 + (bi % 2) * 4} color={node.tint} coreOpacity={0.6} />
            </span>
          );
        })}
      </span>

      {/* 主火花 */}
      <span
        className="transition-all duration-300"
        style={{
          filter: isHovered
            ? `drop-shadow(0 0 14px ${node.tint}) drop-shadow(0 0 28px ${node.tint})`
            : `drop-shadow(0 0 6px color-mix(in srgb, ${node.tint} 55%, transparent))`,
          transform: isHovered ? "scale(1.32)" : "scale(1)",
        }}
      >
        <SparkStar
          size="clamp(40px, 11vmin, 60px)"
          color={node.tint}
          coreOpacity={isHovered ? 1 : 0.82}
        />
      </span>

      {/* 標籤 */}
      <span
        className="font-sans leading-tight transition-colors duration-300"
        style={{
          fontSize: "clamp(0.74rem, 2.5vmin, 0.9rem)",
          maxWidth: "12ch",
          textAlign: "center",
          color: isHovered ? "#fff2dd" : "#d8c4a3",
        }}
      >
        {node.label}
      </span>
    </span>
  );
}

// ── 中央核心 ────────────────────────────────────────────
function CenterCore({
  atRoot,
  parent,
  phase,
  dimmed,
  onStrike,
  onBack,
}: {
  atRoot: boolean;
  parent: ForgeNode | null;
  phase: "idle" | "struck";
  dimmed: boolean;
  onStrike: () => void;
  onBack: () => void;
}) {
  if (atRoot) {
    return (
      <>
        {/* 砸擊閃光：敲到底瞬間中心一炸 */}
        <span
          key={`flash-${phase}`}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: "40%",
            height: "40%",
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-spark) 70%, transparent) 0%, transparent 62%)",
            transform: "translate(-50%, -50%)",
            opacity: 0,
            animation: phase === "struck" ? "forge-flash 760ms ease-out" : "none",
          }}
        />
        <button
          type="button"
          onClick={onStrike}
          aria-label="敲擊鐵鎚，火花重新炸開"
          className="absolute left-1/2 top-1/2 outline-none"
          style={{
            transform: "translate(-50%, -50%)",
            opacity: dimmed ? 0.4 : 1,
            transition: "opacity 300ms ease",
          }}
        >
          <span
            className="block"
            style={{
              transformOrigin: "bottom center",
              animation:
                phase === "idle"
                  ? "forge-strike 780ms cubic-bezier(0.5,0,0.2,1) both"
                  : "none",
            }}
          >
            <Hammer
              style={{
                width: "clamp(46px, 12vmin, 66px)",
                height: "clamp(46px, 12vmin, 66px)",
                color: "#e8d6b8",
              }}
              strokeWidth={1.5}
            />
          </span>
        </button>
      </>
    );
  }

  return (
    <button
      type="button"
      onClick={onBack}
      aria-label="收起，返回上一層"
      className="group absolute left-1/2 top-1/2 flex flex-col items-center gap-1.5 outline-none"
      style={{ transform: "translate(-50%, -50%)", opacity: dimmed ? 0.4 : 1, transition: "opacity 300ms ease" }}
    >
      <span
        style={{
          filter: `drop-shadow(0 0 10px ${parent?.tint ?? "var(--color-spark)"})`,
        }}
      >
        <SparkStar size="clamp(48px, 13vmin, 70px)" color={parent?.tint ?? "var(--color-spark)"} coreOpacity={1} />
      </span>
      <span className="flex items-center gap-1 font-ui text-[0.65rem] tracking-wider text-[#9a866d] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        ← 收起
      </span>
    </button>
  );
}
