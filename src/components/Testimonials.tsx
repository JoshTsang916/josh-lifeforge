type Testimonial = {
  number: string;
  name: string;
  role: string;
  quote: string;
};

// 真實學員見證（出自 2026 n8n Automation Workshop）
const testimonials: Testimonial[] = [
  {
    number: "01",
    name: "Du",
    role: "保經",
    quote:
      "第一次接觸 n8n 時完全就是小白一枚，Josh 生動且詳細的講解，完全可以快速了解其中邏輯，一步一步帶我們操作，沒有壓力就能上手。現在課程結束後，可以自由發揮自己所想的方式創立不同節點，超級好玩！",
  },
  {
    number: "02",
    name: "大大",
    role: "創業顧問",
    quote:
      "我終於完成人生第一次的 n8n 自動化流程，去達成我要的開發項目。不知道該怎樣表達感謝，但⋯⋯謝謝。",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section bg-[color:var(--color-bg-muted)]"
    >
      <div className="container-narrow">
        {/* Section header */}
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)]">
                04
              </span>
              <span className="h-px w-8 bg-[color:var(--color-line-strong)]" />
            </div>
            <h2 className="eyebrow">Testimonials</h2>
            <p className="font-display text-2xl md:text-3xl mt-4 leading-tight text-[color:var(--color-ink)]">
              學員怎麼說
            </p>
          </div>
          <div className="lg:col-span-9 max-w-2xl">
            <p className="font-display text-2xl md:text-3xl leading-[1.4] text-[color:var(--color-ink)]">
              不是行銷文案，是上完課後留下來的真實心得。
            </p>
            <p className="mt-6 font-sans text-base text-[color:var(--color-fg-muted)]">
              出自 2026 n8n Automation Workshop。
              工作坊不在規模，而在離開教室時你能不能繼續用。
            </p>
          </div>
        </div>

        {/* Testimonial list — editorial stack */}
        <div className="border-t border-[color:var(--color-line-strong)]">
          {testimonials.map((t) => (
            <article
              key={t.number}
              className="grid lg:grid-cols-12 gap-8 py-12 border-b border-[color:var(--color-line-strong)]"
            >
              <div className="lg:col-span-2">
                <div className="font-mono text-sm tabular-nums text-[color:var(--color-fg-subtle)] mb-2">
                  {t.number}
                </div>
                <div className="eyebrow">{t.role}</div>
              </div>

              <div className="lg:col-span-10 max-w-3xl">
                {/* 大引號裝飾 */}
                <span
                  className="font-display text-6xl leading-none text-[color:var(--color-accent)] block mb-2"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <blockquote className="font-display text-xl md:text-2xl leading-[1.6] text-[color:var(--color-ink)] italic">
                  {t.quote}
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-[color:var(--color-line-strong)]" />
                  <cite className="font-sans not-italic text-sm text-[color:var(--color-fg)]">
                    {t.name}
                    <span className="text-[color:var(--color-fg-subtle)]">
                      {" · "}
                      {t.role}
                    </span>
                  </cite>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
