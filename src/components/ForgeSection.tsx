import { ForgeConstellation } from "./ForgeConstellation";

// 首頁 Hero(01) 與 Services(02) 之間的「鐵鎚敲擊火花」互動間奏（2026-07-14 About 退位後）。
// 用跟 RecentWork(05) 同款的米白稍深底（--color-bg-muted #F8EDDF），
// 跟全站暖調一致、無暗帶突兀。火花改實心暖色+柔陰影（淺底上不靠發光）。
// 不標題、不編號 —— 純互動動畫。
export function ForgeSection() {
  return (
    <section
      id="forge"
      aria-label="互動：敲一下，看看我能為你做什麼"
      // 不用 .section（其 padding-block clamp 到 8rem 太大）—— 自訂較小上下留白
      className="bg-[color:var(--color-bg-muted)] px-[clamp(1.25rem,4vw,3rem)] py-10 sm:py-14"
    >
      <div className="container-narrow flex items-center justify-center">
        <ForgeConstellation />
      </div>
    </section>
  );
}
