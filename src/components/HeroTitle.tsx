"use client";

import { useEffect, useState } from "react";
import { TypingText } from "./TypingText";

// 2026-07-14 B2B 新軸主標（REBUILD-PLAN 01；同日 Josh preview 三修）：
// 「用 AI 陪你鍛造屬於你自己的系統」，AI=沉穩藍（工具）、鍛造=磚紅（動作）、
// 屬於你自己的系統=焦糖橘（成果）；AI 入主標讓受眾五秒對號（B2B 認知入口是「AI」這個詞），
// 藍色小面積當暖底上的冷點綴。
// 2026-07-23 逐字效果從副標搬來第二行：副標句變長後逐字要 5 秒才顯示完，太久；
// 改把逐字留給短促的「屬於你自己的系統」，副標改一次浮現（見 Hero.tsx）。
// 第二行只能是單一顏色的單一 segment（TypingText 不支援字元級變色）。
type Segment = { text: string; color?: string };
const LINE_1: Segment[] = [
  { text: "用 " },
  { text: "AI", color: "var(--color-ai)" },
  { text: " 陪你" },
  { text: "鍛造", color: "var(--color-accent)" },
];
const LINE_2_TEXT = "屬於你自己的系統";
const LINE_2_COLOR = "var(--color-spark)";

// Hero 主標：第一行整體 fade-up 浮現（黑字 pre + 紅字 accent 一起，不逐字）；
// 第二行逐字打字機浮現，接在第一行之後。
// mount 觸發（首屏立即可見）。
// prefers-reduced-motion 由 globals.css 全域處理。
export function HeroTitle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <h1 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.2] tracking-[-0.02em] text-[color:var(--color-ink)] mb-8 text-balance">
      <span
        className="block"
        style={{
          transitionProperty: "opacity, transform",
          transitionDuration: "800ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(24px)",
        }}
      >
        {LINE_1.map((seg, j) =>
          seg.color ? (
            <span key={j} style={{ color: seg.color }}>
              {seg.text}
            </span>
          ) : (
            <span key={j}>{seg.text}</span>
          )
        )}
      </span>
      <TypingText
        text={LINE_2_TEXT}
        className="block"
        style={{ color: LINE_2_COLOR }}
        startDelay={500}
        perChar={130}
        charDur={600}
      />
    </h1>
  );
}
