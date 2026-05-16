"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  width?: string;
  className?: string;
};

// Section header 旁邊的短 hairline，進入 viewport 時 scaleX(0→1) 從左拉到右。
// 編輯版面的核心元素之一，動畫放大 editorial 語言。
// prefers-reduced-motion 由 globals.css 全域處理。
export function HairlineLine({ width = "w-8", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
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
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`h-px ${width} bg-[color:var(--color-line-strong)] inline-block origin-left ${className}`}
      style={{
        transform: revealed ? "scaleX(1)" : "scaleX(0)",
        transitionProperty: "transform",
        transitionDuration: "900ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    />
  );
}
