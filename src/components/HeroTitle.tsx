"use client";

import { useEffect, useState } from "react";

// 2026-07-14 B2B 新軸主標（REBUILD-PLAN 01；同日 Josh preview 三修）：
// 「用 AI 陪你鍛造屬於你自己的系統」，AI=沉穩藍（工具）、鍛造=磚紅（動作）、
// 屬於你自己的系統=焦糖橘（成果）；AI 入主標讓受眾五秒對號（B2B 認知入口是「AI」這個詞），
// 藍色小面積當暖底上的冷點綴。每行拆 segments 支援一行多色，斷行手動控制。
type Segment = { text: string; color?: string };
const LINES: Segment[][] = [
  [
    { text: "用 " },
    { text: "AI", color: "var(--color-ai)" },
    { text: " 陪你" },
    { text: "鍛造", color: "var(--color-accent)" },
  ],
  [{ text: "屬於你自己的系統", color: "var(--color-spark)" }],
];

// Hero 主標：逐行整體 fade-up 浮現（黑字 pre + 紅字 accent 一起，不逐字）。
// mount 觸發（首屏立即可見），每行 stagger 220ms。
// 逐字效果刻意只留給底下標語（處境鉤子句）——
// 標題俐落定調、標語慢慢道出，兩種手法分開。
// prefers-reduced-motion 由 globals.css 全域處理。
export function HeroTitle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <h1 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.2] tracking-[-0.02em] text-[color:var(--color-ink)] mb-8 text-balance">
      {LINES.map((line, i) => (
        <span
          key={i}
          className="block"
          style={{
            transitionProperty: "opacity, transform",
            transitionDuration: "800ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: `${i * 220}ms`,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(24px)",
          }}
        >
          {line.map((seg, j) =>
            seg.color ? (
              <span key={j} style={{ color: seg.color }}>
                {seg.text}
              </span>
            ) : (
              <span key={j}>{seg.text}</span>
            )
          )}
        </span>
      ))}
    </h1>
  );
}
