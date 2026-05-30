import Image from "next/image";
import { HeroTitle } from "./HeroTitle";
import { HairlineLine } from "./HairlineLine";
import { Reveal } from "./Reveal";
import { TypingText } from "./TypingText";

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

            {/* 小字逐字浮現；startDelay 約對齊標題第三行跑完前，讓節奏接續不留空白 */}
            <p className="font-sans text-lg md:text-xl leading-[1.6] text-[color:var(--color-fg-muted)] mb-10 max-w-xl">
              <TypingText
                text="在被加速的時代，走一條不急的路"
                startDelay={1300}
                perChar={95}
                charDur={700}
                riseY={8}
              />
            </p>

            <Reveal delay={2000}>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="btn btn-primary">
                  預約 1 對 1 諮詢
                </a>
                <a href="#work" className="btn btn-ghost">
                  看作品
                </a>
              </div>
            </Reveal>
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
          <HairlineLine />
          <span>Josh — Sharing what I learn along the way</span>
        </div>
      </div>
    </section>
  );
}
