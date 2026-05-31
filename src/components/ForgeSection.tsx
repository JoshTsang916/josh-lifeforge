import { ForgeConstellation } from "./ForgeConstellation";

// 首頁 About(02) 與 Services(03) 之間的「鐵鎚敲擊火花」互動間奏。
// 刻意做成全寬暖炭暗帶（火花在暗處才發光），不標題、不編號 —— 純互動動畫。
// 上下緣用漸層融進相鄰的米白區（About bg = #F8EDDF，Services bg = #FFF8F0），
// 不讓暗帶像突兀的方塊。
export function ForgeSection() {
  return (
    <section
      id="forge"
      aria-label="互動：敲一下，看看我能為你做什麼"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 45%, #2e211a 0%, #221812 50%, #1a120d 100%)",
      }}
    >
      {/* 上緣：從 About 的米白漸隱入暗 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20"
        style={{ background: "linear-gradient(to bottom, #F8EDDF, transparent)" }}
      />
      {/* 爐火餘暉 */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-spark) 20%, transparent) 0%, transparent 68%)",
        }}
      />

      <div className="relative z-10 flex items-center justify-center px-4 py-20 sm:py-28">
        <ForgeConstellation />
      </div>

      {/* 下緣：漸隱入 Services 的米白 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
        style={{ background: "linear-gradient(to top, #FFF8F0, transparent)" }}
      />
    </section>
  );
}
