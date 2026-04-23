export function RecentWork() {
  return (
    <section id="work" className="section bg-[color:var(--color-bg-muted)]">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)]">
                04
              </span>
              <span className="h-px w-8 bg-[color:var(--color-line-strong)]" />
            </div>
            <h2 className="eyebrow">Recent Work</h2>
            <p className="font-display text-2xl md:text-3xl mt-4 leading-tight text-[color:var(--color-ink)]">
              近期作品
            </p>
          </div>
          <div className="lg:col-span-9 max-w-2xl">
            <p className="font-display text-2xl md:text-3xl leading-[1.4] text-[color:var(--color-ink)]">
              分享會、工作坊、演講 —— 累積中。
            </p>
            <p className="mt-6 font-sans text-base text-[color:var(--color-fg-muted)]">
              2026 年初開始，我慢慢把零散的經驗整理成可以教的形狀。
              這裡會陸續放上代表作，以及即將開的場次。
            </p>
          </div>
        </div>

        {/* Placeholder grid — editorial frame for future entries */}
        <div className="border-t border-[color:var(--color-line-strong)]">
          <div className="grid lg:grid-cols-12 gap-8 py-12 border-b border-[color:var(--color-line-strong)]">
            <div className="lg:col-span-2">
              <div className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)]">
                次回
              </div>
            </div>
            <div className="lg:col-span-7">
              <h3 className="font-display text-2xl md:text-3xl leading-tight text-[color:var(--color-ink)] mb-3">
                [工作坊排期 — 即將公開]
              </h3>
              <p className="font-sans text-base leading-[1.7] text-[color:var(--color-fg-muted)]">
                規劃中的第一場實作型工作坊，主題圍繞「用對話建系統」。
                想第一時間收到通知，寫信跟我說。
              </p>
            </div>
            <div className="lg:col-span-3 flex lg:justify-end items-start">
              <a href="#contact" className="link-underline font-sans text-sm font-medium">
                留下 email →
              </a>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 py-12 border-b border-[color:var(--color-line-strong)]">
            <div className="lg:col-span-2">
              <div className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)]">
                past
              </div>
            </div>
            <div className="lg:col-span-7">
              <h3 className="font-display text-2xl md:text-3xl leading-tight text-[color:var(--color-ink)] mb-3">
                [過往分享會 — 整理中]
              </h3>
              <p className="font-sans text-base leading-[1.7] text-[color:var(--color-fg-muted)]">
                HPX 神經可塑性說書、讀書會主講等分享，
                照片與回顧會陸續補上。
              </p>
            </div>
            <div className="lg:col-span-3 flex lg:justify-end items-start">
              <span className="font-sans text-sm text-[color:var(--color-fg-subtle)]">
                coming soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
