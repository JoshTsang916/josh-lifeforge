import { DayCounter } from "./DayCounter";
import { HairlineLine } from "./HairlineLine";

// 日更起算日：2026-04-01（台北時區）
// 用 UTC+8 鎖定避免伺服器在 UTC 0:00–8:00 之間少算一天
const DAILY_START = Date.UTC(2026, 3, 1) - 8 * 60 * 60 * 1000;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function calcDay(): number {
  const elapsed = Date.now() - DAILY_START;
  return Math.max(1, Math.floor(elapsed / MS_PER_DAY) + 1);
}

export function Daily() {
  const day = calcDay();

  return (
    <section id="daily" className="section">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)]">
                06
              </span>
              <HairlineLine />
            </div>
            <h2 className="eyebrow">Daily</h2>
            <p className="font-display text-2xl md:text-3xl mt-4 leading-tight text-[color:var(--color-ink)]">
              日更短影片
            </p>
          </div>

          <div className="lg:col-span-9 flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
            <div className="shrink-0">
              <DayCounter day={day} milestone={100} />
            </div>
            <div className="max-w-xl">
              <p className="font-display text-2xl md:text-3xl leading-[1.4] text-[color:var(--color-ink)]">
                每天一支短影片，不為什麼，只為經歷與累積。
              </p>
              <p className="mt-6 font-sans text-base leading-[1.7] text-[color:var(--color-fg-muted)]">
                在 AI 與閱讀的交界處，一天一錘，鑄下屬於自己的紋路。從
                2026 年 4 月 1 日開始，每日不間斷。
              </p>
              <a
                href="https://www.instagram.com/josh_lifeforge/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-8 inline-block font-sans text-sm font-medium"
              >
                看完整日更 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
