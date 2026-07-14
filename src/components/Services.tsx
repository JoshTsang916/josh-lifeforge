import { Reveal } from "./Reveal";
import { HairlineLine } from "./HairlineLine";
import { ServicesBranch } from "./ServicesBranch";

export type Service = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  forWho: string;
  cta: string;
  /** proof 內容已升格成獨立「實戰」section（#builds），這裡只留錨點連過去 */
  proofLink?: {
    href: string;
    label: string;
  };
};

// 2026-07-14 光譜重構（REBUILD-PLAN 05）：四格並排商品 → 同一條路的不同深度。
// 入口一律是流程診斷，「教你建 vs 幫你建」是診斷後才分的兩條路；
// 工作坊／一對一併入「教你建」，演講退為 map 外的尾註輕選項（見 component 底部）。
// 03 幫你建的 description 沿用 f07de7a 打磨過的 customer voice，只留 proofLink 接實戰。
const services: Service[] = [
  {
    number: "01",
    title: "流程診斷",
    subtitle: "Process Diagnosis",
    description:
      "坐下來聊一小時。你不用先學會任何術語，用平常講話的方式講你的日常就行。我看你卡在哪：哪裡還在紙本、哪裡在 Excel 之間搬資料、哪裡其實可以交給 AI。聊完你會拿到一張現況地圖，跟一條看得見的升級路徑。",
    forWho: "還不確定從哪開始的老闆、主管、工作室",
    cta: "預約診斷",
  },
  {
    number: "02",
    title: "教你建",
    subtitle: "Learn to Build",
    description:
      "診斷後想自己動手？工作坊帶你的團隊從真實場景拆起，現場把第一套流程建出來；一對一陪跑則是你的進度、你的專案，我在旁邊看著你把系統長出來。學會的是能力，留下的是你們自己維護得動的系統。",
    forWho: "想讓團隊長出自建能力的公司、部門",
    cta: "聊聊團隊狀態",
  },
  {
    number: "03",
    title: "幫你建",
    subtitle: "Build With Me",
    description:
      "你的流程卡住、團隊還在用 Excel、想把資料串起來，想幫自己的團隊每天省下幾個小時。想知道 AI 自動化怎麼低成本地引進工作流程。我跟你一起，從場景拆到資料模型再到上線，打造出一個屬於你自己或團隊的客製化系統。",
    forWho: "想把日常重複工作交給系統處理的中小企業、傳產老闆、專業事務所",
    cta: "聊聊你的場景",
    proofLink: {
      href: "#builds",
      label: "看五個實戰案例",
    },
  },
];

export function Services() {
  // 01 是入口、02/03 是分支——版面結構跟著這個語意走，不再是平排三兄弟
  const [entryService, ...branchServices] = services;

  return (
    <section id="services" className="section">
      <div className="container-narrow">
        {/* Section header */}
        <Reveal>
          <div className="grid md:grid-cols-12 gap-12 mb-20">
            <div className="md:col-span-4 lg:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)]">
                  02
                </span>
                <HairlineLine />
              </div>
              <h2 className="eyebrow">Services</h2>
              <p className="font-display text-2xl md:text-3xl mt-4 leading-tight text-[color:var(--color-ink)]">
                如何開始鍛造
              </p>
            </div>
            <div className="md:col-span-8 lg:col-span-9 max-w-2xl">
              <p className="font-display text-2xl md:text-3xl leading-[1.4] text-[color:var(--color-ink)]">
                鍛造的起點，一起挖掘出你的卡點。
              </p>
              <p className="mt-6 font-sans text-base text-[color:var(--color-fg-muted)]">
                入口都一樣：先聊你的流程，
                我會誠實告訴你該走哪條、該多深。
              </p>
            </div>
          </div>
        </Reveal>

        {/* 分支結構（2026-07 動態化）：01 診斷保留全寬橫排、坐穩「唯一入口」，
            底部不收 border——分支線就從這裡長出去，岔成 02 / 03 並排兩條路
            （線的生長動畫與兩張卡都在 ServicesBranch，client component）。 */}
        <Reveal>
          <div className="border-t border-[color:var(--color-line-strong)]">
            <article className="grid lg:grid-cols-12 gap-6 pt-10 pb-6 group">
              <div className="lg:col-span-2">
                <div className="font-mono text-sm tabular-nums text-[color:var(--color-fg-subtle)] mb-2">
                  {entryService.number}
                </div>
                <div className="eyebrow">{entryService.subtitle}</div>
              </div>

              <div className="lg:col-span-7">
                <h3 className="font-display text-3xl md:text-4xl leading-tight text-[color:var(--color-ink)] mb-3 group-hover:text-[color:var(--color-accent)] transition-colors duration-300">
                  {entryService.title}
                </h3>
                <p className="font-sans text-base leading-[1.65] text-[color:var(--color-fg-muted)] mb-3">
                  {entryService.description}
                </p>
                <p className="font-sans text-sm text-[color:var(--color-fg-subtle)]">
                  <span className="text-[color:var(--color-fg)]">適合 </span>
                  {entryService.forWho}
                </p>
              </div>

              <div className="lg:col-span-3 flex lg:justify-end items-start">
                <a
                  href="#contact"
                  className="link-underline font-sans text-sm font-medium"
                >
                  {entryService.cta} →
                </a>
              </div>
            </article>
          </div>
        </Reveal>

        <ServicesBranch services={branchServices} />

        {/* 演講退位為尾註（REBUILD-PLAN 05：不再是招牌，是「想先讓團隊有共識」的入口）*/}
        <Reveal>
          <p className="mt-10 font-sans text-sm text-[color:var(--color-fg-subtle)]">
            想先讓團隊聽一場、有個共識再說？
            <a
              href="#contact"
              className="link-underline text-[color:var(--color-accent)]"
            >
              演講邀約也開著
            </a>
            。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
