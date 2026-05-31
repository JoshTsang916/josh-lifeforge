import Link from "next/link";
import type { Metadata } from "next";
import { ForgeConstellation } from "@/components/ForgeConstellation";

export const metadata: Metadata = {
  title: "鍛造宇宙 — 人生鍛造所",
  description:
    "互動式探索人生鍛造所 —— 敲一下鐵鎚，火花散開，每一顆是一條認識 Josh 的路：服務、作品與理念。",
};

// /forge — 鍛造宇宙：互動式火花星圖。獨立於首頁 single-page，
// 暖炭鍛爐底（自己的暗色氛圍，火花在暗處才發光），不掛 <Nav>、
// 不套亮底 Footer（深咖啡字在暗底看不見），用暗底專屬極簡 header / footer。
export default function ForgePage() {
  return (
    <main
      className="relative flex min-h-dvh flex-col overflow-hidden"
      style={{
        // 暖炭：深褐黑，中心偏暖（爐火餘溫），不是冷黑
        background:
          "radial-gradient(120% 90% at 50% 42%, #2e211a 0%, #221812 45%, #1a120d 100%)",
      }}
    >
      {/* 爐火餘暉：中心一抹暖光暈，給火花一個「在爐邊」的環境光 */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[44%] h-[34rem] w-[34rem] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-spark) 22%, transparent) 0%, transparent 68%)",
        }}
      />

      {/* Header */}
      <header className="relative z-10 px-[clamp(1.25rem,4vw,3rem)] pt-8">
        <div className="container-narrow">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-ui text-sm text-[#bda988] transition-colors hover:text-[color:var(--color-spark)]"
          >
            ← 回首頁
          </Link>
        </div>
      </header>

      {/* 標題區 —— 極簡，不放形容詞文案 */}
      <section className="relative z-10 px-[clamp(1.25rem,4vw,3rem)] pt-10 pb-2 text-center">
        <p className="eyebrow mb-4" style={{ color: "#9a866d" }}>
          The Forge
        </p>
        <h1
          className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-[-0.01em]"
          style={{ color: "#f0e3cf" }}
        >
          鍛造宇宙
        </h1>
      </section>

      {/* 火花星圖互動 */}
      <section className="relative z-10 flex flex-1 items-center justify-center px-4 py-8">
        <ForgeConstellation />
      </section>

      {/* 暗底專屬極簡 footer */}
      <footer className="relative z-10 px-[clamp(1.25rem,4vw,3rem)] pb-10 pt-4">
        <div
          className="container-narrow flex flex-col items-center gap-3 border-t pt-6 text-center"
          style={{ borderColor: "rgba(189,169,136,0.18)" }}
        >
          <div
            className="flex items-center gap-5 font-sans text-sm"
            style={{ color: "#bda988" }}
          >
            <a
              href="https://www.threads.com/@josh_lifeforge"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[color:var(--color-spark)]"
            >
              Threads
            </a>
            <a
              href="https://www.instagram.com/josh_lifeforge/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[color:var(--color-spark)]"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@JoshTheLifeForge"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[color:var(--color-spark)]"
            >
              YouTube
            </a>
          </div>
          <p className="font-sans text-xs" style={{ color: "#7a6651" }}>
            © {new Date().getFullYear()} 人生鍛造所
          </p>
        </div>
      </footer>
    </main>
  );
}
