import { ForgeConstellation } from "./ForgeConstellation";

// 首頁 About(02) 與 Services(03) 之間的「鐵鎚敲擊火花」互動間奏。
// 暖褐底 + 暖色星塵（.forge-stardust 多層 radial 光點），破除純漸層死色板感，
// 呼應「想要星空」但維持全暖調（不用冷色星空照跟全站打架）。
// 不標題、不編號。上下用加高漸層融進相鄰米白區（About #F8EDDF / Services #FFF8F0）。
export function ForgeSection() {
  return (
    <section
      id="forge"
      aria-label="互動：敲一下，看看我能為你做什麼"
      className="relative overflow-hidden"
      style={{
        // 深暖褐（比前版再深一點點當星塵的襯底，但星塵+餘暉會把它撐出層次，不死板）
        background:
          "radial-gradient(125% 95% at 50% 42%, #4a3526 0%, #3a2a1e 55%, #2c2017 100%)",
      }}
    >
      {/* 暖色星塵層：散佈的暖橘金細光點，給暗底深度與「星空/餘燼」感 */}
      <div
        aria-hidden
        className="forge-stardust pointer-events-none absolute inset-0 opacity-80"
      />

      {/* 爐火餘暉：中心暖光暈，把中央撐亮、邊緣自然壓暗 */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] max-w-[94vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-spark) 26%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* 上緣：從 About 米白漸隱入暗（高 h-48，融接更長更柔）*/}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-40 sm:h-48"
        style={{ background: "linear-gradient(to bottom, #F8EDDF 0%, rgba(248,237,223,0.5) 45%, transparent 100%)" }}
      />

      <div className="relative z-10 flex items-center justify-center px-4 py-20 sm:py-28">
        <ForgeConstellation />
      </div>

      {/* 下緣：漸隱入 Services 米白（高 h-48）*/}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40 sm:h-48"
        style={{ background: "linear-gradient(to top, #FFF8F0 0%, rgba(255,248,240,0.5) 45%, transparent 100%)" }}
      />
    </section>
  );
}
