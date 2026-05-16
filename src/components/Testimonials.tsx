import { Reveal } from "./Reveal";
import { HairlineLine } from "./HairlineLine";

type Testimonial = {
  number: string;
  name: string;
  role: string;
  quote: string;
};

// 真實學員見證
// 來源：2026 n8n Automation Workshop（Du、大大）+ 引導力學院 AI 分享會（Tammy、Kin）
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
    name: "Tammy",
    role: "引導師",
    quote:
      "謝謝 Josh 來學會分享，跟大家分享這陣子研究的心法和技法，以及踩過的坑，連休息時、中場時大家都捨不得離開座位～收穫超多😍",
  },
  {
    number: "03",
    name: "Kin",
    role: "企業顧問",
    quote:
      "感謝 Josh 老師🙏 從單純的對話、記憶移轉，再到完整的 Skill 架構，收穫滿滿🥰",
  },
  {
    number: "04",
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
        <Reveal>
          <div className="grid lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)]">
                  05
                </span>
                <HairlineLine />
              </div>
              <h2 className="eyebrow">Testimonials</h2>
              <p className="font-display text-2xl md:text-3xl mt-4 leading-tight text-[color:var(--color-ink)]">
                課後留下來的話
              </p>
            </div>
            <div className="lg:col-span-9 max-w-2xl">
              <p className="font-display text-2xl md:text-3xl leading-[1.4] text-[color:var(--color-ink)]">
                n8n 工作坊與 AI 自動化分享會的學員見證。
              </p>
              <p className="mt-6 font-sans text-base text-[color:var(--color-fg-muted)]">
                幾乎一字不改放在這裡。
              </p>
            </div>
          </div>
        </Reveal>

        {/* Testimonial cards — 2x2 grid, staggered reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-12 gap-y-12 pt-12 border-t border-[color:var(--color-line-strong)]">
          {testimonials.map((t, idx) => (
            <Reveal
              key={t.number}
              delay={idx * 80}
              variant="fade-scale"
              className="h-full"
            >
              <figure className="flex flex-col h-full">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)]">
                    {t.number}
                  </span>
                  <span className="eyebrow">{t.role}</span>
                </div>
                <blockquote className="font-display text-lg md:text-xl leading-[1.6] text-[color:var(--color-ink)] mb-6">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-px w-6 bg-[color:var(--color-line-strong)]"
                  />
                  <span className="font-sans text-sm text-[color:var(--color-fg)]">
                    {t.name}
                    <span className="text-[color:var(--color-fg-subtle)]">
                      <span aria-hidden="true">{" · "}</span>
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
