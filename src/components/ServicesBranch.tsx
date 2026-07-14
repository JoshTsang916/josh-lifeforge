"use client";

import { useEffect, useRef, useState } from "react";
import type { Service } from "./Services";

// 「如何開始鍛造」的分支段（REBUILD-PLAN 05 延伸）：
// 01 診斷是唯一入口，這裡渲染從它分岔出去的兩條路（02 教你建 / 03 幫你建）。
//   Desktop —— SVG 分岔線從 01 底部長出、分成兩股接到並排的兩張卡；
//   Mobile  —— 並排放不下，退化成左側 rail + 站點（捷運路線圖），卡片垂直堆疊。
// 動畫樣式全在 globals.css 的 .branch-* 區，由 data-revealed 單一 state 驅動，
// 時序（線→節點→卡片）用 CSS transition-delay 編排，不用 JS 排程。
//
// ⚠️ 動畫方案評估中（demo）：data-variant 切換四種動畫個性，
// 右下角切換器是評估用臨時 UI——Josh 選定方案後留贏家、拆輸家＋切換器。

const TRUNK_D = "M 500 0 V 44";
// 分岔曲線的控制點 y 值必須單調遞增（44→84→88→128）：
// 非單調（如 96→76）會讓曲線中段短暫上凸、肩部隆起成傘形。
const ARM_L_D = "M 500 44 C 500 84 240 88 240 128";
const ARM_R_D = "M 500 44 C 500 84 760 88 760 128";

const VARIANTS = [
  { key: "a", label: "A 光脈漣漪" },
  { key: "b", label: "B 鍛造火花" },
  { key: "c", label: "C 彈性回彈" },
  { key: "d", label: "D 墨滴暈開" },
] as const;
type VariantKey = (typeof VARIANTS)[number]["key"];

export function ServicesBranch({ services }: { services: Service[] }) {
  const [variant, setVariant] = useState<VariantKey>("a");
  const [runId, setRunId] = useState(0);

  return (
    <>
      {/* key 換 = BranchZone 整個 remount：revealed 歸零、IO 重掛，
          zone 還在視口內就立刻重新觸發 = 重播動畫 */}
      <BranchZone
        key={`${variant}-${runId}`}
        variant={variant}
        services={services}
      />

      {/* 動畫方案切換器（demo 評估用，選定後整組移除） */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1 rounded-md border border-[color:var(--color-line-strong)] bg-[color:var(--color-bg)]/95 p-1.5 shadow-sm backdrop-blur">
        {VARIANTS.map((v) => (
          <button
            key={v.key}
            onClick={() => {
              setVariant(v.key);
              setRunId((r) => r + 1);
            }}
            className={`font-ui text-xs px-2.5 py-1.5 rounded-sm transition duration-150 active:scale-95 ${
              variant === v.key
                ? "bg-[color:var(--color-accent)] text-[color:var(--color-bg)]"
                : "text-[color:var(--color-fg-muted)] hover:bg-[color:var(--color-bg-muted)]"
            }`}
          >
            {v.label}
          </button>
        ))}
        <button
          onClick={() => setRunId((r) => r + 1)}
          aria-label="重播動畫"
          title="重播動畫"
          className="font-ui text-sm px-2 py-1 rounded-sm text-[color:var(--color-fg-muted)] transition duration-150 hover:bg-[color:var(--color-bg-muted)] active:scale-95"
        >
          ↻
        </button>
      </div>
    </>
  );
}

function BranchZone({
  variant,
  services,
}: {
  variant: VariantKey;
  services: Service[];
}) {
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
    <div
      ref={ref}
      data-revealed={revealed}
      data-variant={variant}
      className="branch-zone"
    >
      {/* Desktop 分岔線。viewBox 高度=實際高度（h-32=128px）避免曲線變形；
          preserveAspectRatio="none" 讓線末端跟著兩欄中心（24% / 76%）走，
          vector-effect 維持 hairline 粗細不被水平拉伸。
          起點小圓騎在 y=0（01 的正下方），是線的出發點。 */}
      <div className="relative hidden md:block h-32" aria-hidden="true">
        <span className="branch-node branch-origin absolute top-0 left-1/2 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[color:var(--color-accent)]" />
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 128"
          preserveAspectRatio="none"
        >
          <path
            className="branch-path branch-trunk"
            d={TRUNK_D}
            pathLength={1}
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="branch-path branch-arm branch-arm-l"
            d={ARM_L_D}
            pathLength={1}
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="branch-path branch-arm branch-arm-r"
            d={ARM_R_D}
            pathLength={1}
            vectorEffect="non-scaling-stroke"
          />

          {/* 方案 A：光脈層（accent 光點沿線溜過） */}
          {variant === "a" && (
            <>
              <path
                className="branch-pulse branch-pulse-trunk"
                d={TRUNK_D}
                pathLength={1}
                vectorEffect="non-scaling-stroke"
              />
              <path
                className="branch-pulse branch-pulse-arm"
                d={ARM_L_D}
                pathLength={1}
                vectorEffect="non-scaling-stroke"
              />
              <path
                className="branch-pulse branch-pulse-arm"
                d={ARM_R_D}
                pathLength={1}
                vectorEffect="non-scaling-stroke"
              />
            </>
          )}

          {/* 方案 B：兩顆火花沿 motion path 飛向卡片（offset-path 在 CSS） */}
          {variant === "b" && (
            <>
              <circle className="branch-spark branch-spark-l" r={4} />
              <circle className="branch-spark branch-spark-r" r={4} />
            </>
          )}

          {/* 方案 D：墨頭沿線運筆（深咖啡、比光脈慢沉） */}
          {variant === "d" && (
            <>
              <path
                className="branch-ink branch-ink-trunk"
                d={TRUNK_D}
                pathLength={1}
                vectorEffect="non-scaling-stroke"
              />
              <path
                className="branch-ink branch-ink-arm"
                d={ARM_L_D}
                pathLength={1}
                vectorEffect="non-scaling-stroke"
              />
              <path
                className="branch-ink branch-ink-arm"
                d={ARM_R_D}
                pathLength={1}
                vectorEffect="non-scaling-stroke"
              />
            </>
          )}
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
                進場位移才不會把結構線一起拖著跑。
                rail 的 ::after 是各方案的「行者」（光段/火花/墨頭）軌道。 */}
            {idx === 0 && (
              <span
                className="branch-rail md:hidden absolute left-[4px] top-[-40px] bottom-[-66px] w-px bg-[color:var(--color-line-strong)]"
                aria-hidden="true"
              />
            )}
            {/* 站點節點：mobile 騎在 rail 上對齊編號行；desktop 騎在卡片頂
                hairline 的中央，正好接住分岔線末端（欄中心）。
                定位用 calc 不用 translate——transform 要留給 scale 彈入動畫；
                ::after 是 halo（漣漪/閃光/墨暈）容器。 */}
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
