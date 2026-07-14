"use client";

import { useEffect, useState } from "react";

// 2026-07-14 B2B 新軸主標（REBUILD-PLAN 01；同日 Josh preview 二修，issue #38）：
// 「陪你鍛造屬於你自己的系統」——鍛造=磚紅（動作），屬於你自己的系統=焦糖橘（成果），
// 暖色階層遞進；「先搞懂流程」的診斷訊息由副標鉤子與 Services 01 承接。
// 每行 accent 可各自指定色（color 欄位），斷行手動控制不交給 text-balance 賭。
const LINES = [
  { pre: "陪你", accent: "鍛造", color: "var(--color-accent)" },
  { pre: "", accent: "屬於你自己的系統", color: "var(--color-spark)" },
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
          <span style={{ color: line.color }}>{line.accent}</span>
        </span>
      ))}
    </h1>
  );
}
