export function Hero() {
  return (
    <section
      id="hero"
      className="section min-h-[88vh] flex items-center"
    >
      <div className="container-narrow w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-10">
          <span className="eyebrow">Lifeforge Studio</span>
          <span className="h-px w-12 bg-[color:var(--color-line-strong)]" />
          <span className="eyebrow">est. 2024</span>
        </div>

        {/* Headline — accent color emphasis (no italic; CJK fake-italic looks wrong) */}
        <h1 className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-[1.02] tracking-[-0.02em] text-[color:var(--color-ink)] mb-8 max-w-5xl">
          用對話建系統，<br />
          把 AI 鍛造成{" "}
          <span
            className="font-display"
            style={{ color: "var(--color-accent)" }}
          >
            你的第二曲線
          </span>
        </h1>

        {/* Sub */}
        <p className="font-sans text-lg md:text-xl leading-[1.6] text-[color:var(--color-fg-muted)] max-w-2xl mb-12">
          我是 Josh — 原本的高中數學老師，現在的 AI 創作者。<br />
          幫想突破天花板的人，用對話把 AI 鍛造成屬於自己的內容工作流。
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <a href="#contact" className="btn btn-primary">
            預約 1:1 諮詢
          </a>
          <a href="#work" className="btn btn-ghost">
            看作品
          </a>
        </div>

        {/* Footer marker — small editorial detail */}
        <div className="mt-24 flex items-center gap-4 text-xs font-sans text-[color:var(--color-fg-subtle)]">
          <span className="font-mono tabular-nums">01</span>
          <span className="h-px w-8 bg-[color:var(--color-line-strong)]" />
          <span>Currently writing on AI × Education</span>
        </div>
      </div>
    </section>
  );
}
