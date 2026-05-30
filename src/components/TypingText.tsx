"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Props = {
  text: string;
  /** 第一個字開始浮現的延遲（ms），相對觸發時刻 */
  startDelay?: number;
  /** 每個字之間的間隔（ms）—— 中文字數少，60-110 之間最自然；越大越慢越「不急」 */
  perChar?: number;
  /** 每個字淡入的時長（ms） */
  charDur?: number;
  /** 每個字浮上來的距離（px，0 = 純淡入不位移） */
  riseY?: number;
  /** true = 捲動進入視窗才觸發（非首屏，如 About）；false（預設）= mount 立即觸發（首屏 Hero） */
  whenVisible?: boolean;
  /** whenVisible 時，元素可見比例達多少才觸發 */
  threshold?: number;
  className?: string;
  style?: CSSProperties;
};

// 逐字浮現文字：把字串拆成單字，每個字依序淡入 + 微微上浮。
// 視覺逐字、語意完整：外層掛 aria-label 念整句，每個字 span aria-hidden，
// 避免螢幕閱讀器一個字一個字念。
// 觸發：whenVisible=false → mount（首屏立即）；true → IntersectionObserver（捲到才播一次）。
// prefers-reduced-motion 由 globals.css 全域砍 transition（duration + delay 歸零）→ 整句立即落定。
export function TypingText({
  text,
  startDelay = 0,
  perChar = 75,
  charDur = 600,
  riseY = 8,
  whenVisible = false,
  threshold = 0.9,
  className = "",
  style,
}: Props) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!whenVisible) {
      // 首屏：mount 後用 rAF 觸發（避免在 effect body 直接 setState 觸發 React 19 lint rule）
      const raf = requestAnimationFrame(() => setStarted(true));
      return () => cancelAnimationFrame(raf);
    }
    // 非首屏：捲動進入視窗才觸發，播完即 disconnect（IO callback 非同步，不觸發 set-state-in-effect）
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [whenVisible, threshold]);

  return (
    <span ref={ref} className={className} style={style} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: "inline-block",
            whiteSpace: "pre", // 保留字串內的空格（如紅黑字之間的留白）
            transitionProperty: "opacity, transform",
            transitionDuration: `${charDur}ms`,
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: `${startDelay + i * perChar}ms`,
            opacity: started ? 1 : 0,
            transform: started ? "none" : `translateY(${riseY}px)`,
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
