"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Hero 照片「素描鍛造」：進 hero 時，標題逐字與「空白紙 → 鉛筆草稿」手繪影片（Veo 生成）同時開始 →
//   影片結束停在草稿，真實授課照像山水潑墨般暈開、蓋過草稿。呼應「人生鍛造所」從草稿鍛造成真實。
//   底層 = 手繪影片（1.5x 加速、停尾幀草稿）；上層 = 真實照（.hero-ink-reveal 潑墨遮罩）。
//   reduced-motion / 影片無法播時，直接定格在真實照。
const SIZES = "(max-width: 1024px) 100vw, 40vw";

export function HeroSketchReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inked, setInked] = useState(false); // 真實照潑墨浮現

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      // 不播影片，直接定格在真實照
      const raf = requestAnimationFrame(() => setInked(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          // 影片跟標題同時開始（捲到 hero 即播）
          const v = videoRef.current;
          if (!v) return setInked(true);
          v.playbackRate = 1.5; // 加速手繪過程（8s → ~5.3s）
          // 程式觸發 muted 播放（自動播放政策允許）；播不動就直接跳潑墨真實
          v.play().catch(() => setInked(true));
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative aspect-[3/4] overflow-hidden rounded-sm">
      {/* 底層：Veo 手繪影片（空白紙 → 鉛筆草稿），跟標題同時開始、結束停在草稿尾幀 */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        preload="auto"
        poster="/photos/hero-blank.png"
        aria-hidden
        onEnded={() => setInked(true)}
      >
        <source src="/photos/hero-draw.mp4" type="video/mp4" />
      </video>

      {/* 上層：真實授課照，影片結束後潑墨般暈開、蓋過草稿 */}
      <Image
        src="/photos/hero.jpg"
        alt="Josh 在 n8n workshop 授課現場"
        fill
        priority
        sizes={SIZES}
        className={`object-cover hero-ink-reveal${inked ? " is-inked" : ""}`}
      />
    </div>
  );
}
