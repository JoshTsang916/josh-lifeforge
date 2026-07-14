"use client";

import { useEffect, useState } from "react";

// 2026-07-14 B2B 新軸主標（REBUILD-PLAN 01，Josh 雛形收尖版）：
// 舊「AI 給你槓桿／閱讀給你底氣／一人公司給你自由」對個人自我實現說話，退場；
// 新主標對「流程卡住的老闆」說話，accent 從行首詞移到行中關鍵詞（pre + accent 結構）。
const LINES = [
  { pre: "先搞懂你的", accent: "工作流程" },
  { pre: "再陪你鍛造成", accent: "自己的系統" },
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
          {line.pre}
          <span style={{ color: "var(--color-accent)" }}>{line.accent}</span>
        </span>
      ))}
    </h1>
  );
}
