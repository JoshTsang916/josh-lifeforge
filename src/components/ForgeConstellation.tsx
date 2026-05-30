"use client";

import { useEffect, useState } from "react";
import { Hammer, ArrowLeft } from "lucide-react";
import { FORGE_ROOT, FORGE_CENTER, type ForgeNode } from "./forge/forgeData";

// 徑向佈局：把 n 個節點均勻分佈在以 stage 中心為圓心、半徑 RADIUS(%) 的圓周上。
// 從正上方（-90°）開始順時針。回傳百分比座標（相對 stage 方形）。
const RADIUS = 34;
function nodePos(index: number, total: number) {
  const angleDeg = -90 + index * (360 / total);
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: 50 + RADIUS * Math.cos(rad),
    y: 50 + RADIUS * Math.sin(rad),
  };
}

// 依 path 取得當前要顯示的火花群 + 當前父節點（path 為空 = root，父為鍛錘）
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

export function ForgeConstellation() {
  // phase: idle = 只有鍛錘（進場前）；sparked = 火花已噴出、可互動
  const [phase, setPhase] = useState<"idle" | "sparked">("idle");
  // path: 展開路徑（[] = root；['services'] = 在「我提供什麼」這層）
  const [path, setPath] = useState<string[]>([]);
  // hovered / focused 節點 → 驅動 caption
  const [active, setActive] = useState<ForgeNode | null>(null);
  // 每次切層 +1，讓火花重新從中心飛出
  const [burst, setBurst] = useState(0);

  // 進場敲擊：mount 後在「敲下」時刻噴出火花。
  // reduced-motion 由 globals.css 全域砍動畫；這裡仍跳過等待直接 sparked。
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = prefersReduced ? 0 : 690; // ≈ forge-strike 85%（敲到最低點）後濺出
    const t = setTimeout(() => setPhase("sparked"), delay);
    return () => clearTimeout(t);
  }, []);

  const { parent, nodes } = resolve(path);
  const atRoot = path.length === 0;

  // 麵包屑：鍛造宇宙 › 父層 label
  const crumbs: { label: string; depth: number }[] = [
    { label: "鍛造宇宙", depth: 0 },
  ];
  {
    let cur = FORGE_ROOT;
    path.forEach((id, i) => {
      const n = cur.find((x) => x.id === id);
      if (n) {
        crumbs.push({ label: n.label, depth: i + 1 });
        cur = n.children ?? [];
      }
    });
  }

  const goTo = (depth: number) => {
    setPath((p) => p.slice(0, depth));
    setActive(null);
    setBurst((b) => b + 1);
  };

  const openNode = (node: ForgeNode) => {
    if (node.children) {
      setPath((p) => [...p, node.id]);
      setActive(null);
      setBurst((b) => b + 1);
    }
    // 葉節點：用 <a href>，不走這裡（瀏覽器原生跳轉）
  };

  const caption =
    active?.blurb ??
    (atRoot ? FORGE_CENTER.hint : parent?.blurb ?? FORGE_CENTER.hint);

  return (
    <div className="flex flex-col items-center w-full">
      {/* 麵包屑 */}
      <nav
        aria-label="鍛造宇宙路徑"
        className="mb-6 flex items-center gap-2 font-ui text-xs tracking-wider min-h-5"
      >
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <span key={c.depth} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-[color:var(--color-fg-subtle)]">›</span>
              )}
              {isLast ? (
                <span className="text-[color:var(--color-accent)]">{c.label}</span>
              ) : (
                <button
                  type="button"
                  onClick={() => goTo(c.depth)}
                  className="text-[color:var(--color-fg-subtle)] hover:text-[color:var(--color-accent)] transition-colors"
                >
                  {c.label}
                </button>
              )}
            </span>
          );
        })}
      </nav>

      {/* Stage — 方形舞台，所有定位用百分比，整體隨寬度等比縮放（RWD） */}
      <div
        className="relative"
        style={{ width: "min(92vw, 560px)", aspectRatio: "1 / 1" }}
      >
        {/* 連線層 — 從中心畫到每個火花（呼應 logo 三角形的細線） */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {nodes.map((node, i) => {
            const p = nodePos(i, nodes.length);
            return (
              <line
                key={`${burst}-${node.id}`}
                x1="50"
                y1="50"
                x2={p.x}
                y2={p.y}
                stroke="var(--color-line-strong)"
                strokeWidth="0.4"
                strokeLinecap="round"
                style={{
                  opacity: phase === "sparked" ? 0.7 : 0,
                  transition: "opacity 600ms ease",
                  transitionDelay: `${300 + i * 70}ms`,
                }}
              />
            );
          })}
        </svg>

        {/* 中央 — root 為鍛錘（可重敲）；深入層為父節點 + 收起返回 */}
        <CenterCore
          atRoot={atRoot}
          parent={parent}
          phase={phase}
          onStrike={() => {
            // 彩蛋：在 root 再敲一下 → 火花重新噴發
            if (atRoot) {
              setPhase("idle");
              setBurst((b) => b + 1);
              setTimeout(() => setPhase("sparked"), 690);
            }
          }}
          onBack={() => goTo(path.length - 1)}
        />

        {/* 火花節點 */}
        {nodes.map((node, i) => {
          const p = nodePos(i, nodes.length);
          const shown = phase === "sparked";
          const Icon = node.icon;
          const isLeaf = !node.children;

          const common = {
            onMouseEnter: () => setActive(node),
            onMouseLeave: () => setActive(null),
            onFocus: () => setActive(node),
            onBlur: () => setActive(null),
            "aria-label": node.blurb,
            className:
              "group absolute flex flex-col items-center gap-2 outline-none",
            style: {
              left: `${shown ? p.x : 50}%`,
              top: `${shown ? p.y : 50}%`,
              transform: "translate(-50%, -50%)",
              opacity: shown ? 1 : 0,
              transition:
                "left 700ms cubic-bezier(0.16,1,0.3,1), top 700ms cubic-bezier(0.16,1,0.3,1), opacity 500ms ease",
              transitionDelay: `${i * 70}ms`,
            } as React.CSSProperties,
          };

          const inner = (
            <>
              <span
                className="flex items-center justify-center rounded-full border backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110"
                style={{
                  width: "clamp(58px, 15vmin, 82px)",
                  height: "clamp(58px, 15vmin, 82px)",
                  backgroundColor: `color-mix(in srgb, ${node.tint} 14%, transparent)`,
                  borderColor: node.tint,
                  boxShadow: `0 0 0 0 ${node.tint}`,
                }}
              >
                <Icon
                  style={{ width: "42%", height: "42%", color: node.tint }}
                  strokeWidth={1.6}
                />
              </span>
              <span
                className="font-sans text-center leading-tight text-[color:var(--color-fg)]"
                style={{ fontSize: "clamp(0.72rem, 2.6vmin, 0.85rem)", maxWidth: "11ch" }}
              >
                {node.label}
              </span>
            </>
          );

          // 葉節點 → <a> 原生跳轉（首頁錨點）；可展開 → <button>
          return isLeaf ? (
            <a key={`${burst}-${node.id}`} href={node.href} {...common}>
              {inner}
            </a>
          ) : (
            <button
              key={`${burst}-${node.id}`}
              type="button"
              onClick={() => openNode(node)}
              {...common}
            >
              {inner}
            </button>
          );
        })}
      </div>

      {/* Caption — 顯示 hover/focus 節點的描述，預設顯示當前層提示。min-h 防跳動 */}
      <p
        className="mt-8 max-w-md text-center font-sans text-sm leading-[1.7] text-[color:var(--color-fg-muted)] min-h-[2.5rem] px-4"
        aria-live="polite"
      >
        {caption}
      </p>
    </div>
  );
}

// 中央核心 —— root 顯示鍛錘（可敲擊彩蛋）；深入層顯示父節點 icon + 收起返回
function CenterCore({
  atRoot,
  parent,
  phase,
  onStrike,
  onBack,
}: {
  atRoot: boolean;
  parent: ForgeNode | null;
  phase: "idle" | "sparked";
  onStrike: () => void;
  onBack: () => void;
}) {
  if (atRoot) {
    return (
      <>
        {/* 火花爆發閃光 — sparked 瞬間一次性 */}
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "46%",
            height: "46%",
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-spark) 45%, transparent) 0%, transparent 65%)",
            animation: phase === "sparked" ? "forge-flash 900ms ease-out" : "none",
            opacity: 0,
          }}
        />
        <button
          type="button"
          onClick={onStrike}
          aria-label="敲擊鍛錘，火花重新噴發"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 outline-none"
          style={{
            animation:
              phase === "idle" ? "forge-strike 760ms cubic-bezier(0.5,0,0.2,1) both" : "none",
            transformOrigin: "bottom center",
          }}
        >
          <span className="flex items-center justify-center">
            <Hammer
              style={{
                width: "clamp(54px, 13vmin, 76px)",
                height: "clamp(54px, 13vmin, 76px)",
                color: "var(--color-ink)",
              }}
              strokeWidth={1.4}
            />
          </span>
        </button>
      </>
    );
  }

  // 深入層：中央為父節點，點擊收起返回
  const Icon = parent?.icon ?? Hammer;
  return (
    <button
      type="button"
      onClick={onBack}
      aria-label={`收起，返回上一層`}
      className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 outline-none"
    >
      <span
        className="flex items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-105"
        style={{
          width: "clamp(64px, 16vmin, 88px)",
          height: "clamp(64px, 16vmin, 88px)",
          backgroundColor: `color-mix(in srgb, ${parent?.tint ?? "var(--color-accent)"} 18%, transparent)`,
          borderColor: parent?.tint ?? "var(--color-accent)",
        }}
      >
        <Icon
          style={{ width: "42%", height: "42%", color: parent?.tint }}
          strokeWidth={1.6}
        />
      </span>
      <span className="flex items-center gap-1 font-ui text-[0.65rem] tracking-wider text-[color:var(--color-fg-subtle)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <ArrowLeft className="h-3 w-3" /> 收起
      </span>
    </button>
  );
}
