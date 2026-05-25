"use client";

// PAUSED 2026-05-25 — 只被 Daily.tsx 使用，Daily 暫停後當前無 caller。
// 恢復時跟 Daily 一起復活，無需獨立改動。
import { useEffect, useRef, useState } from "react";

type Props = {
  day: number;
  milestone?: number;
};

export function DayCounter({ day, milestone = 100 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    let raf: number | null = null;
    let startTime: number | null = null;
    const duration = 1800;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;

        // 尊重 prefers-reduced-motion — 進入區塊直接落定，跳過動畫
        // 這個檢查放在 observer callback 而不是 effect body，避免觸發
        // react-hooks/set-state-in-effect lint rule（effect 本體直接 setState
        // 會造成 cascading render；external event callback 內則 OK）
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        if (reduce) {
          setProgress(1);
        } else {
          raf = requestAnimationFrame(tick);
        }
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  // 環形比例：每滿 milestone（預設 100）天循環一圈
  // day=45 → 45% / day=100 → 100% / day=101 → 1% / day=200 → 100%
  const cycleRatio =
    day === 0 ? 0 : day % milestone === 0 ? 1 : (day % milestone) / milestone;

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const animatedRatio = progress * cycleRatio;
  const dashOffset = circumference * (1 - animatedRatio);
  const displayCount = Math.round(progress * day);

  return (
    <div
      ref={ref}
      className="relative w-[220px] h-[220px] mx-auto lg:mx-0"
      aria-label={`日更第 ${day} 天`}
      role="img"
    >
      <svg
        className="w-full h-full -rotate-90"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth="2"
        />
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-ui text-[11px] tracking-[0.22em] uppercase text-[color:var(--color-fg-subtle)]">
          Day
        </div>
        <div className="font-display text-6xl tabular-nums leading-none text-[color:var(--color-ink)] mt-1">
          {displayCount}
        </div>
      </div>
    </div>
  );
}
