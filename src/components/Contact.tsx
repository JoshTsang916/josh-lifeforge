import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { HairlineLine } from "./HairlineLine";

const EMAIL = "joshailearing0916@gmail.com";
const CALENDLY_URL = "https://calendly.com/joshailearing0916";

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container-narrow">
        <Reveal>
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)]">
                  07
                </span>
                <HairlineLine />
              </div>
              <h2 className="eyebrow">Contact</h2>
              <p className="font-display text-2xl md:text-3xl mt-4 leading-tight text-[color:var(--color-ink)]">
                跟我聊聊
              </p>
            </div>
            <div className="lg:col-span-9 max-w-2xl">
              <p className="font-display text-3xl md:text-4xl leading-[1.3] text-[color:var(--color-ink)] mb-6">
                想把 AI 放進你的工作流？
                <br />
                <span className="text-[color:var(--color-accent)]">
                  我們先聊 30 分鐘。
                </span>
              </p>
              <p className="font-sans text-base leading-[1.7] text-[color:var(--color-fg-muted)] mb-12">
                不收費的初談。告訴我你在做什麼、卡在哪、想走到哪裡。
                如果我能幫上忙，我會誠實告訴你要怎麼開始；
                如果不是我擅長的，我也會說，可能幫你推薦別人。
              </p>

              {/* 主視覺：結構化表單 */}
              <ContactForm />

              {/* 次選：Calendly 直接預約 */}
              <div className="mt-12 pt-10 border-t border-[color:var(--color-line)]">
                <div className="border border-[color:var(--color-line-strong)] p-6 sm:flex sm:items-center sm:justify-between gap-6">
                  <div>
                    <div className="eyebrow mb-2">直接預約</div>
                    <p className="font-display text-xl text-[color:var(--color-ink)]">
                      打開行事曆，挑一個你方便的時間
                    </p>
                    <p className="mt-2 font-sans text-xs text-[color:var(--color-fg-subtle)]">
                      30 分鐘 · 視訊
                    </p>
                  </div>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost mt-4 sm:mt-0 shrink-0"
                  >
                    打開行事曆 →
                  </a>
                </div>
              </div>

              {/* 最次：mailto 小字 fallback */}
              <p className="mt-8 font-sans text-sm text-[color:var(--color-fg-subtle)]">
                或者直接寫信給我：
                <a
                  href={`mailto:${EMAIL}?subject=關於人生鍛造所`}
                  className="link-underline text-[color:var(--color-fg-muted)] ml-1"
                >
                  {EMAIL}
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
