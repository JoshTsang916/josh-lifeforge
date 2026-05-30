import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { ForgeConstellation } from "@/components/ForgeConstellation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "鍛造宇宙 — 人生鍛造所",
  description:
    "敲下這一鎚，火花四濺 —— 每一顆火花，是一條認識人生鍛造所的路。互動式探索 Josh 的服務、作品與理念。",
};

// /forge — 鍛造宇宙：互動式星圖導覽。獨立於首頁 single-page，
// 不掛 <Nav>（首頁錨點在此不存在），用自己的極簡 header + 完整 Footer，
// 同 /links、/writings、/fonts 的 pattern。
export default function ForgePage() {
  return (
    // paper-grain：globals.css ::after 鋪極淡紙感顆粒；overflow-hidden 收住光暈
    <main className="paper-grain relative flex min-h-dvh flex-col overflow-hidden">
      {/* 極淡暖色光暈 —— 從上方暈開，給縱深但不喧賓奪主 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[130%] max-w-3xl -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--color-accent-soft),transparent_70%)] opacity-30 blur-3xl"
      />

      {/* Header */}
      <header className="relative z-10 px-[clamp(1.25rem,4vw,3rem)] pt-8">
        <div className="container-narrow">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-ui text-sm text-[color:var(--color-fg-muted)] transition-colors hover:text-[color:var(--color-accent)]"
          >
            <ArrowLeft className="h-4 w-4" /> 回首頁
          </Link>
        </div>
      </header>

      {/* 標題區 */}
      <section className="relative z-10 px-[clamp(1.25rem,4vw,3rem)] pt-12 pb-4 text-center">
        <p className="eyebrow mb-4">The Forge</p>
        <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-[-0.01em] text-[color:var(--color-ink)]">
          鍛造宇宙
        </h1>
        <p className="mx-auto mt-5 max-w-md font-sans text-base leading-[1.7] text-[color:var(--color-fg-muted)]">
          一鎚落下，火花四濺。
          <br className="hidden sm:block" />
          每一顆火花，是一條認識這裡的路。
        </p>
      </section>

      {/* 星圖互動 */}
      <section className="relative z-10 flex flex-1 items-center justify-center px-4 py-10">
        <ForgeConstellation />
      </section>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
