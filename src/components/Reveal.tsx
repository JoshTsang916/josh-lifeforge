"use client";

import { useEffect, useRef, useState } from "react";

type Variant = "fade-up" | "fade-scale";

type Props = {
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
  className?: string;
  variant?: Variant;
};

// 進場動畫 wrapper：
//   variant="fade-up"     opacity 0→1 + translateY 20px→0（預設，長文 / vertical stack）
//   variant="fade-scale"  opacity 0→1 + scale 0.96→1（grid cards "settle in"，跟 fade-up 形成節奏對比）
// 第一次進入 viewport 觸發後 disconnect observer。
// prefers-reduced-motion 由 globals.css 全域 @media query 處理（直接零化 transition）。
export function Reveal({
  children,
  delay = 0,
  threshold = 0.15,
  className = "",
  variant = "fade-up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  const initialTransform =
    variant === "fade-scale" ? "scale(0.96)" : "translateY(20px)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
        opacity: revealed ? 1 : 0,
        transform: revealed ? "none" : initialTransform,
      }}
    >
      {children}
    </div>
  );
}
