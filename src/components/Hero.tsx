import { HeroTitle } from "./HeroTitle";
import { HairlineLine } from "./HairlineLine";
import { Reveal } from "./Reveal";
import { HeroSketchReveal } from "./HeroSketchReveal";

export function Hero() {
  return (
    <section
      id="hero"
      className="section min-h-[calc(100vh-4rem)] min-h-[calc(100svh-4rem)] sm:min-h-[calc(100vh-7rem)] sm:min-h-[calc(100svh-7rem)] flex items-center"
    >
      <div className="container-narrow w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-10">
          <span className="eyebrow">Lifeforge Studio</span>
          <HairlineLine width="w-12" />
          <span className="eyebrow">est. 2026</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left — copy */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <HeroTitle />

            {/* 2026-07-23 從逐字打字機改一次浮現：句子長，逐字要 5 秒才顯示完太久。
                逐字效果搬去標題第二行（見 HeroTitle），delay 接在第二行打完之後（~2000ms，
                7/23 稍後 Josh 要求打字機再放慢，perChar/charDur 調過，這裡的 delay 跟著補）。
                Reveal 輸出 div，不能包在 p 裡（p > div 不合法），故直接用 Reveal 取代 p。 */}
            <Reveal
              delay={2100}
              className="font-sans text-lg md:text-xl leading-[1.6] text-[color:var(--color-fg-muted)] mb-10 max-w-xl"
            >
              還在紙本登記、Excel 對帳？想要利用 AI 做點什麼卻沒有頭緒？AI 自動化、提升工作效率，其實比你想像的還要近。
            </Reveal>

            <Reveal delay={2900}>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="btn btn-primary">
                  聊聊你的工作流程
                </a>
                <a href="#builds" className="btn btn-ghost">
                  看實戰案例
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — photo（素描浮現：真實照 → 從上到下擦成手繪版）*/}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <HeroSketchReveal />
          </div>
        </div>

        {/* Footer marker */}
        <div className="mt-20 flex items-center gap-4 text-xs font-sans text-[color:var(--color-fg-subtle)]">
          <span className="font-mono tabular-nums">01</span>
          <HairlineLine />
          <span>Josh — Forging workflows into systems</span>
        </div>
      </div>
    </section>
  );
}
