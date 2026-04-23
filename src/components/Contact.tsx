// TODO[josh]: set real email + optional Calendly URL
const EMAIL = "joshailearing0916@gmail.com";
const CALENDLY_URL: string | null = null; // set to Calendly link when ready

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)]">
                06
              </span>
              <span className="h-px w-8 bg-[color:var(--color-line-strong)]" />
            </div>
            <h2 className="eyebrow">Contact</h2>
            <p className="font-display text-2xl md:text-3xl mt-4 leading-tight text-[color:var(--color-ink)]">
              跟我聊聊
            </p>
          </div>
          <div className="lg:col-span-9 max-w-2xl">
            <p className="font-display text-3xl md:text-4xl leading-[1.3] text-[color:var(--color-ink)] mb-8">
              想把 AI 放進你的工作流？
              <br />
              <span className="text-[color:var(--color-accent)]">
                我們先聊 30 分鐘。
              </span>
            </p>
            <p className="font-sans text-base leading-[1.7] text-[color:var(--color-fg-muted)] mb-10">
              不收費的初談。告訴我你在做什麼、卡在哪、想走到哪裡。
              如果我能幫上忙，我會誠實告訴你要怎麼開始；
              如果不是我擅長的，我也會說，可能幫你推薦別人。
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {/* Email */}
              <div className="p-6 border border-[color:var(--color-line-strong)]">
                <div className="eyebrow mb-3">Email</div>
                <a
                  href={`mailto:${EMAIL}?subject=關於人生鍛造所`}
                  className="font-display text-xl text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)] transition-colors break-all"
                >
                  {EMAIL}
                </a>
                <p className="mt-3 font-sans text-xs text-[color:var(--color-fg-subtle)]">
                  一週內回覆
                </p>
              </div>

              {/* Calendly (conditional) */}
              <div className="p-6 border border-[color:var(--color-line-strong)]">
                <div className="eyebrow mb-3">直接預約</div>
                {CALENDLY_URL ? (
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-xl text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)] transition-colors"
                  >
                    打開行事曆 →
                  </a>
                ) : (
                  <p className="font-display text-xl text-[color:var(--color-fg-subtle)]">
                    [Calendly 連結即將啟用]
                  </p>
                )}
                <p className="mt-3 font-sans text-xs text-[color:var(--color-fg-subtle)]">
                  30 分鐘 · 視訊
                </p>
              </div>
            </div>

            {/* What to include in email */}
            <div className="pt-8 border-t border-[color:var(--color-line)]">
              <div className="eyebrow mb-4">寫信時大概告訴我</div>
              <ul className="space-y-3 font-sans text-base text-[color:var(--color-fg-muted)]">
                <li className="flex gap-3">
                  <span className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)] mt-1.5">
                    01
                  </span>
                  <span>你現在在做什麼（工作 / 學習 / 創作）</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)] mt-1.5">
                    02
                  </span>
                  <span>目前卡在哪個環節</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)] mt-1.5">
                    03
                  </span>
                  <span>你希望 30 分鐘後帶走什麼</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
