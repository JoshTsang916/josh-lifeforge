import Link from "next/link";

type FontSpec = {
  id: string;
  name: string;
  english: string;
  source: string;
  license: string;
  fit: string;
  cssVar: string; // CSS variable from layout.tsx
};

const fonts: FontSpec[] = [
  {
    id: "noto-serif-tc",
    name: "思源宋體",
    english: "Noto Serif TC",
    source: "Adobe / Google",
    license: "SIL OFL — 完全免費可商用",
    fit: "知識型內容、品牌故事、長文閱讀。具文學氣質、思想深度感。",
    cssVar: "var(--font-noto-serif-tc)",
  },
  {
    id: "noto-sans-tc",
    name: "思源黑體",
    english: "Noto Sans TC",
    source: "Adobe / Google",
    license: "SIL OFL — 完全免費可商用",
    fit: "企業形象、產品頁、介面文字。俐落現代、可讀性高、不出錯首選。",
    cssVar: "var(--font-noto-sans-tc)",
  },
  {
    id: "huninn",
    name: "jf open 粉圓",
    english: "Huninn",
    source: "justfont",
    license: "SIL OFL — 商用免費",
    fit: "親子、活動、教育品牌。圓潤可愛、親和力強、降低距離感。",
    cssVar: "var(--font-huninn)",
  },
  {
    id: "lxgw-wenkai",
    name: "霞鶩文楷",
    english: "LXGW WenKai TC",
    source: "GitHub / 開源",
    license: "SIL OFL — 商用免費",
    fit: "文化、文創、復古氣質、書卷感。手寫筆韻、需搭配簡潔版型。",
    cssVar: "var(--font-lxgw-wenkai-tc)",
  },
];

const sampleTexts = {
  brandName: "人生鍛造所",
  brandEnglish: "The Life Forge",
  slogan: "用對話建系統，把 AI 鍛造成你的第二曲線",
  paragraph:
    "我是 Josh。原本是高中數學老師，2024 年離開教職，把全部精力投入「AI × 教育」的第二曲線。這幾年我發現，大部分人對 AI 的想像，還停留在「叫 ChatGPT 寫一段文字」。但真正的可能性，是跟 AI 對話，建出一整套屬於自己的工作流。",
  sectionHeading: "FORGE 五步法 — Context is King",
  buttonLabel: "預約 1:1 諮詢",
};

export default function FontsPlayground() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[color:var(--color-line-strong)] section !py-12">
        <div className="container-narrow">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="font-ui text-sm link-underline text-[color:var(--color-fg-muted)]"
            >
              ← 回首頁
            </Link>
            <span className="font-ui text-xs uppercase tracking-[0.22em] text-[color:var(--color-fg-subtle)]">
              Font Playground
            </span>
          </div>

          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-tight text-[color:var(--color-ink)] mb-4">
            字體比較
          </h1>
          <p className="font-sans text-lg text-[color:var(--color-fg-muted)] max-w-2xl">
            同一段品牌文字，4 套字體並排呈現。憑感覺挑出最對的那個 —
            這比抽象描述「氣質」有效太多。
          </p>
        </div>
      </header>

      {/* Font specimens */}
      <main>
        {fonts.map((font, idx) => (
          <section
            key={font.id}
            className="section border-b border-[color:var(--color-line-strong)]"
            style={{
              background:
                idx % 2 === 0
                  ? "var(--color-bg)"
                  : "var(--color-bg-muted)",
            }}
          >
            <div className="container-narrow">
              {/* Spec header */}
              <div className="grid lg:grid-cols-12 gap-8 mb-12 pb-8 border-b border-[color:var(--color-line)]">
                <div className="lg:col-span-3">
                  <div className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)] mb-2">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h2
                    className="text-3xl md:text-4xl leading-tight text-[color:var(--color-ink)] mb-1"
                    style={{ fontFamily: font.cssVar }}
                  >
                    {font.name}
                  </h2>
                  <p className="font-ui text-sm text-[color:var(--color-fg-subtle)] tracking-wide">
                    {font.english}
                  </p>
                </div>

                <dl className="lg:col-span-9 grid sm:grid-cols-3 gap-6 font-sans text-sm">
                  <div>
                    <dt className="eyebrow mb-2">來源</dt>
                    <dd className="text-[color:var(--color-fg)]">
                      {font.source}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-2">授權</dt>
                    <dd className="text-[color:var(--color-fg)]">
                      {font.license}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-2">適合</dt>
                    <dd className="text-[color:var(--color-fg-muted)] leading-relaxed">
                      {font.fit}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Sample 1: Brand name (display, huge) */}
              <div className="mb-16">
                <div className="eyebrow mb-4">品牌主視覺</div>
                <div
                  className="text-[clamp(3.5rem,10vw,8rem)] leading-[1.05] tracking-[0.02em] text-[color:var(--color-ink)]"
                  style={{ fontFamily: font.cssVar }}
                >
                  {sampleTexts.brandName}
                </div>
                <div
                  className="font-ui text-sm tracking-[0.3em] uppercase text-[color:var(--color-fg-subtle)] mt-3"
                >
                  {sampleTexts.brandEnglish}
                </div>
              </div>

              {/* Sample 2: Slogan (display, medium) */}
              <div className="mb-16">
                <div className="eyebrow mb-4">Slogan</div>
                <p
                  className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.4] tracking-[0.02em] text-[color:var(--color-ink)] max-w-3xl"
                  style={{ fontFamily: font.cssVar }}
                >
                  {sampleTexts.slogan}
                </p>
              </div>

              {/* Sample 3: Section heading */}
              <div className="mb-16">
                <div className="eyebrow mb-4">Section 標題</div>
                <h3
                  className="text-2xl md:text-3xl leading-tight text-[color:var(--color-accent)]"
                  style={{ fontFamily: font.cssVar }}
                >
                  {sampleTexts.sectionHeading}
                </h3>
              </div>

              {/* Sample 4: Body paragraph */}
              <div className="mb-16">
                <div className="eyebrow mb-4">內文段落</div>
                <p
                  className="text-base md:text-lg leading-[1.8] text-[color:var(--color-fg-muted)] max-w-3xl"
                  style={{ fontFamily: font.cssVar }}
                >
                  {sampleTexts.paragraph}
                </p>
              </div>

              {/* Sample 5: Button preview */}
              <div>
                <div className="eyebrow mb-4">CTA 按鈕</div>
                <button
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[color:var(--color-accent)] text-[color:var(--color-bg)] text-base"
                  style={{
                    fontFamily: font.cssVar,
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  {sampleTexts.buttonLabel}
                </button>
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="section !py-12">
        <div className="container-narrow">
          <Link
            href="/"
            className="font-ui text-sm link-underline text-[color:var(--color-fg-muted)]"
          >
            ← 回首頁
          </Link>
        </div>
      </footer>
    </div>
  );
}
