import { ForgeConstellation } from "./ForgeConstellation";

// 首頁 About(02) 與 Services(03) 之間的「鐵鎚敲擊火花」互動間奏。
// 暖褐底（不死黑 —— 夠暗讓火花發光，但跟米白區明度落差收斂），不標題、不編號。
// 上下緣用「加高」的漸層融進相鄰的米白區（About bg = #F8EDDF，Services bg = #FFF8F0），
// 讓它從米白慢慢沉下去再浮上來，不像突兀的方塊。
export function ForgeSection() {
  return (
    <section
      id="forge"
      aria-label="互動：敲一下，看看我能為你做什麼"
      className="relative overflow-hidden"
      style={{
        // 中等暖褐（從原本接近黑的 #1a120d 提亮）：中心 #5a4334，邊緣 #3d2c20(≈ink)
        background:
          "radial-gradient(125% 90% at 50% 44%, #5a4334 0%, #4a3628 52%, #3d2c20 100%)",
      }}
    >
      {/* 上緣：從 About 米白漸隱入暗（加高到 h-40，融接更柔）*/}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 sm:h-40 z-[5]"
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

      {/* 下緣：漸隱入 Services 米白（加高到 h-40，融接更柔）*/}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-40 z-[5]"
        style={{ background: "linear-gradient(to top, #FFF8F0, transparent)" }}
      />
    </section>
  );
}
