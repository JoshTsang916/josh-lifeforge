"use client";

import { useEffect, useState } from "react";

const LINES = [
  { accent: "AI", rest: " 給你槓桿" },
  { accent: "閱讀", rest: " 給你底氣" },
  { accent: "一人公司", rest: "給你自由" },
];

// Hero 主標：三行逐行 fade-up 進場（mount-triggered，Hero 在首屏立即 visible）。
// 每行 delay 250ms 間隔。setMounted 透過 rAF callback 觸發，避免直接在 effect body
// 內 setState 觸發 React 19 的 react-hooks/set-state-in-effect lint rule。
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
            transitionDelay: `${i * 250}ms`,
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
