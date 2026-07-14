"use client";

import { useEffect, useRef, useState } from "react";
import type { Service } from "./Services";

// 「如何開始鍛造」的分支段（REBUILD-PLAN 05 延伸）：
// 01 診斷是唯一入口，這裡渲染從它分岔出去的兩條路（02 教你建 / 03 幫你建）。
//   Desktop —— SVG 分岔線從 01 底部長出、分成兩股接到並排的兩張卡；
//   Mobile  —— 並排放不下，退化成左側 rail + 站點（捷運路線圖），卡片垂直堆疊。
// 動畫樣式全在 globals.css 的 .branch-* 區，這裡只負責一件事：
// IntersectionObserver 首次進入 viewport 時打開 data-revealed，
// 之後的時序（線→節點→卡片）由 CSS transition-delay 自己走完。
export function ServicesBranch({ services }: { services: Service[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-revealed={revealed} className="branch-zone">
      {/* Desktop 分岔線。viewBox 高度=實際高度（h-32=128px）避免曲線變形；
          preserveAspectRatio="none" 讓線末端跟著兩欄中心（24% / 76%）走，
          vector-effect 維持 hairline 粗細不被水平拉伸。
          起點小圓騎在 y=0（01 的正下方），是線的出發點。
          分岔曲線的控制點 y 值必須單調遞增（44→84→88→128）：
          非單調（如 96→76）會讓曲線中段短暫上凸、肩部隆起成傘形。 */}
      <div className="relative hidden md:block h-32" aria-hidden="true">
        <span className="branch-node branch-origin absolute top-0 left-1/2 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[color:var(--color-accent)]" />
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 128"
          preserveAspectRatio="none"
        >
          <path
            className="branch-path branch-trunk"
            d="M 500 0 V 44"
            pathLength={1}
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="branch-path branch-arm branch-arm-l"
            d="M 500 44 C 500 84 240 88 240 128"
            pathLength={1}
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="branch-path branch-arm branch-arm-r"
            d="M 500 44 C 500 84 760 88 760 128"
            pathLength={1}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="relative grid md:grid-cols-2 gap-x-10 gap-y-14 mt-10 md:mt-0">
        {services.map((service, idx) => (
          <article
            key={service.number}
            className="branch-card group relative pl-7 md:pl-0 md:border-t md:border-[color:var(--color-line-strong)]"
          >
            {/* Mobile rail：掛在第一張卡上、一條線貫穿兩站——
                top 往上伸 40px 接到 01 底部（= grid 的 mt-10），
                bottom 往下伸 66px 停在 03 節點中心（gap-y-14 56px + 節點 top 5px + 半徑 5px）。
                rail / 節點放 wrapper（不動層），卡片內容另放 body（動畫層），
                進場位移才不會把結構線一起拖著跑。 */}
            {idx === 0 && (
              <span
                className="branch-rail md:hidden absolute left-[4px] top-[-40px] bottom-[-66px] w-px bg-[color:var(--color-line-strong)]"
                aria-hidden="true"
              />
            )}
            {/* 站點節點：mobile 騎在 rail 上對齊編號行；desktop 騎在卡片頂
                hairline 的中央，正好接住分岔線末端（欄中心）。
                定位用 calc 不用 translate——transform 要留給 scale 彈入動畫。 */}
            <span
              className="branch-node absolute w-2.5 h-2.5 rounded-full bg-[color:var(--color-accent)] group-hover:bg-[color:var(--color-accent-hover)] left-0 top-[5px] md:left-[calc(50%-5px)] md:top-[-5px]"
              aria-hidden="true"
            />

            <div className="branch-card-body flex flex-col h-full md:pt-8">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-sm tabular-nums text-[color:var(--color-fg-subtle)]">
                  {service.number}
                </span>
                <span className="eyebrow">{service.subtitle}</span>
              </div>
              <h3 className="font-display text-3xl leading-tight text-[color:var(--color-ink)] mb-3 transition-colors duration-300 group-hover:text-[color:var(--color-accent)]">
                {service.title}
              </h3>
              <p className="font-sans text-base leading-[1.65] text-[color:var(--color-fg-muted)] mb-3">
                {service.description}
              </p>
              {service.proofLink && (
                <p className="mt-2 mb-3">
                  <a
                    href={service.proofLink.href}
                    className="link-underline font-sans text-sm font-medium text-[color:var(--color-accent)]"
                  >
                    {service.proofLink.label} ↓
                  </a>
                </p>
              )}
              <p className="font-sans text-sm text-[color:var(--color-fg-subtle)] mb-8">
                <span className="text-[color:var(--color-fg)]">適合 </span>
                {service.forWho}
              </p>
              {/* mt-auto 讓兩張卡的 CTA 底部對齊（desc 長短不一時） */}
              <p className="mt-auto">
                <a
                  href="#contact"
                  className="link-underline font-sans text-sm font-medium"
                >
                  {service.cta} →
                </a>
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
