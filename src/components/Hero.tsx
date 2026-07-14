import { HeroTitle } from "./HeroTitle";
import { HairlineLine } from "./HairlineLine";
import { Reveal } from "./Reveal";
import { TypingText } from "./TypingText";
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

            {/* 小字逐字浮現；startDelay 約對齊標題第二行跑完前，讓節奏接續不留空白。
                2026-07-14 副標從哲學句（在被加速的時代…）換成處境鉤子（REBUILD-PLAN 01）；
                「不急」線由 About 與星圖子星承接，不孤兒。句變長故 perChar 95→70 補償節奏。 */}
            <p className="font-sans text-lg md:text-xl leading-[1.6] text-[color:var(--color-fg-muted)] mb-10 max-w-xl">
              <TypingText
                text="還在紙本登記、Excel 對帳？你卡住的地方，通常就是系統該進場的地方。"
                startDelay={1300}
                perChar={70}
                charDur={700}
                riseY={8}
              />
            </p>

            <Reveal delay={2000}>
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
          <span>Josh — Sharing what I learn along the way</span>
        </div>
      </div>
    </section>
  );
}
