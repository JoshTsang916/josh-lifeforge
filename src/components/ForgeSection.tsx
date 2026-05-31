import { ForgeConstellation } from "./ForgeConstellation";

// 首頁 About(02) 與 Services(03) 之間的「鐵鎚敲擊火花」互動間奏。
// 用跟 04(RecentWork) 同款的米白稍深底（--color-bg-muted #F8EDDF），
// 跟全站暖調一致、無暗帶突兀。火花改實心暖色+柔陰影（淺底上不靠發光）。
// 不標題、不編號 —— 純互動動畫。
export function ForgeSection() {
  return (
    <section
      id="forge"
      aria-label="互動：敲一下，看看我能為你做什麼"
      className="section bg-[color:var(--color-bg-muted)]"
    >
      <div className="container-narrow flex items-center justify-center">
        <ForgeConstellation />
      </div>
    </section>
  );
}
