import Image from "next/image";

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

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left — copy */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <h1 className="font-display text-[clamp(2.75rem,7vw,6rem)] leading-[1.05] tracking-[-0.02em] text-[color:var(--color-ink)] mb-8">
              用對話建系統，<br />
              把 AI 鍛造成{" "}
              <span style={{ color: "var(--color-accent)" }}>
                你的第二曲線
              </span>
            </h1>

            <p className="font-sans text-lg md:text-xl leading-[1.6] text-[color:var(--color-fg-muted)] mb-10 max-w-xl">
              我是 Josh — 原本的高中數學老師，現在的 AI 創作者。
              幫想突破天花板的人，用對話把 AI 鍛造成屬於自己的內容工作流。
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="btn btn-primary">
                預約 1:1 諮詢
              </a>
              <a href="#work" className="btn btn-ghost">
                看作品
              </a>
            </div>
          </div>

          {/* Right — photo */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <Image
                src="/photos/hero.jpg"
                alt="Josh 在 n8n workshop 授課現場"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Footer marker */}
        <div className="mt-20 flex items-center gap-4 text-xs font-sans text-[color:var(--color-fg-subtle)]">
          <span className="font-mono tabular-nums">01</span>
          <span className="h-px w-8 bg-[color:var(--color-line-strong)]" />
          <span>Currently writing on AI × Education</span>
        </div>
      </div>
    </section>
  );
}
