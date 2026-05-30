"use client";

import { useEffect, useState } from "react";

const LINES = [
  { accent: "AI", rest: " 給你槓桿" },
  { accent: "閱讀", rest: " 給你底氣" },
  { accent: "一人公司", rest: "給你自由" },
];

// Hero 主標：三行逐行整體 fade-up 浮現（紅字 accent + 黑字一起，不逐字）。
// mount 觸發（首屏立即可見），每行 stagger 220ms。
// 逐字效果刻意只留給底下標語「…走一條不急的路」+ About『不急』那行——
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
          <span style={{ color: "var(--color-accent)" }}>{line.accent}</span>
          {line.rest}
        </span>
      ))}
    </h1>
  );
}
