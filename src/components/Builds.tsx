import Image from "next/image";
import { Reveal } from "./Reveal";
import { HairlineLine } from "./HairlineLine";

// 實戰 section —— REBUILD-PLAN 04「實戰[重框・升格]」的落地：
// proof cases 從 Services 04 的兩行小字升格成獨立 section。
// 每案標「成熟度階梯 from → to」（紙本→數位→系統→自動→智能，佔位五階，
// 正式框架 Win/M1 成熟後回填），呈現「之前的痛 → 做了什麼 → 現在」三段。
// 2026-10-26 陣容換血：神綺匹克球館（停擺）、某創作者頻道（沒交付、workflow 已停用）下架，
// 加某醬料食品工廠、某運動工作室、匹克球小助手；寶晟補 7 月後上線的功能。
// 露名規則：拿到客戶授權才露真名＋放系統截圖（01 寶晟、04 學橋）；沒授權的匿名、
// 純文字卡、不放客戶系統畫面（02、03）；05 家教、06 小助手是 Josh 自己的系統。

// 每案一張代表畫面：手機截圖配手機外框、桌面截圖配瀏覽器外框。
// src 留空時 render 佔位框（preview 討論版面用）；正式截圖須先去識別化
// 才能進 public/（repo 是公開的，原始截圖絕不入版控）。
type BuildShot = {
  frame: "phone" | "browser";
  /** 去識別化後的截圖路徑（public/photos/builds/）；佔位階段留空 */
  src?: string;
  alt: string;
  caption: string;
};

type Build = {
  number: string;
  industry: string;
  /** 階梯起點 —— 用客戶認得出自己的具象詞（紙本／Excel／手抄名單） */
  from: string;
  /** 階梯終點 —— 用成熟度階梯的階段詞（系統／自動／智能） */
  to: string;
  before: string;
  built: string;
  now: string;
  /** 代表畫面，最多兩張（phone + browser 各一）；沒有的案例維持純文字卡 */
  shots?: BuildShot[];
};

const builds: Build[] = [
  {
    number: "01",
    industry: "寶晟稅務記帳士事務所",
    from: "紙本",
    to: "智能",
    before:
      "行程登記靠紙本，月薪、工商案件分潤每月手算，交辦事項講完就散。",
    // 2026-10-26 拿掉「月薪結算自動帶入分潤」：10 月起在職員工都不走分潤公式了
    // （一位改固定薪、一位離職），用現在式寫會不準；改寫 7 月後上線且有真實使用的功能
    built:
      "員工在 LINE 說句「下午外出收件」，AI 解析排進主管週曆，報稅期限也自動排上去；工商案件照案型追進度，指派時 LINE 通知承辦人；交辦變成 LINE 卡片，按一下回報完成。",
    now: "行程、案件、交辦、薪資、請款都在同一套系統裡跑，老闆看報表就好。",
    shots: [
      {
        frame: "phone",
        // 2026-10-26 改 PNG：補遮一處疑似客戶簡稱時改存無損格式，才能逐像素證明只動到黑條
        src: "/photos/builds/doris-line.png",
        alt: "寶晟事務所 LINE 群組畫面，AI 待辦通知機器人自動發出提醒卡片",
        caption: "員工在 LINE 說一句",
      },
      {
        frame: "browser",
        src: "/photos/builds/doris-calendar.png",
        alt: "會計事務所行程系統的主管週曆畫面，員工在 LINE 回報的行程自動排進週曆",
        caption: "行程自動排進主管週曆",
      },
    ],
  },
  // 02、03 客戶授權還沒拿到：匿名、純文字卡，不放系統截圖；拿到授權再露名＋補圖
  {
    number: "02",
    industry: "某醬料食品工廠",
    from: "外包舊系統",
    to: "自動",
    before:
      "外包的進銷存系統長期不好用：報表要下載才看得到，每家客戶折數不同、一漲價就全部重算，出貨單一次印三張。",
    built:
      "從零重做一套自己的工廠系統：出貨、製作（批號、效期）、進貨、代工、禮盒都在線上開單；底價乘折數自動算價；每天早上 LINE 列出待處理的單。",
    now: "10 月中上線，老闆已經直接在新系統開單，11 月起舊系統退場。",
  },
  {
    number: "03",
    industry: "某運動工作室",
    from: "Google Sheet",
    to: "自動",
    before:
      "課程、繳費記在 Google Sheet，合約是紙本；有一館上課不用學生簽名，教練多報堂數，年底做帳才對不出來。",
    built:
      "學員在 LINE 簽到、請假、看剩幾堂；教練從 LINE 打開週曆排課，系統自動通知學員，過了時間沒簽到就自動扣堂；合約、續約、收款搬上網頁，老闆在一個待辦盒裡確認。",
    // 不寫「陪跑／教老闆用 AI 自己接手」：老闆太忙，實際上不會自己接手維護（Josh 2026-10-26）
    now: "兩間館、一百多位學員的課都在系統裡跑。",
  },
  {
    number: "04",
    industry: "學橋文理補習班",
    from: "紙本",
    to: "自動",
    before:
      "兩百多位學生，國一到高三六個年級，繳費全靠紙本登記，誰繳了誰沒繳、對帳翻半天。",
    built:
      "學生、科目、收費期間建進系統；繳費狀態未通知／已送出／已繳費一鍵切換，分期、教材費、收據編號都留得住；繳費單自動產生、批次下載一次匯出。",
    now: "篩年級跟科目就看到誰繳了誰沒繳，繳費單、收據不用再手寫。",
    shots: [
      {
        frame: "browser",
        src: "/photos/builds/tuition-list.jpg",
        alt: "補習班繳費管理系統的繳費記錄列表畫面，顯示年級、科目、學費、繳費狀態等篩選與資料欄位",
        caption: "誰繳了誰沒繳，篩一下就看到",
      },
    ],
  },
  {
    number: "05",
    industry: "家教教學現場",
    from: "腦袋記",
    to: "系統",
    before: "三十幾個學生的年級、進度、數 A 數 B 分流，靠腦袋跟筆記。",
    built: "學生進度系統：章節進度、分流標記、升年級一鍵處理。",
    now: "我自己每週上課都在用。自己賣的東西，自己先用。",
    shots: [
      {
        frame: "browser",
        src: "/photos/builds/student-progress.png",
        alt: "學生進度系統畫面，列出每位學生的章節進度與數 A 數 B 分流標記",
        caption: "每週上課前打開的進度看板",
      },
    ],
  },
  {
    // Josh 自己的 LINE 官方帳號。10/20 起要邀請碼才能用，卡片不寫「加 LINE 就能用」；
    // 截圖待補：場卡會出現真實球友名字，要用假名字開一場再截
    number: "06",
    industry: "匹克球小助手",
    from: "人工排",
    to: "自動",
    before:
      "一面場地、六到十個人輪流上，誰下一場、跟誰搭都靠人工排，排久了就有人連打、有人一直坐。",
    built:
      "主辦人在 LINE 打上今天來的名字，小助手一場一場排雙打：打最少的先上、盡量換隊友換對手；輸入比分直接出下一場，中途有人來、有人走都照排；結束一張卡看完整場戰績。",
    now: "10 月中上線，朋友已經拿它排過好幾場真球敘，也能拉進球團 LINE 群組一起看。",
  },
];

// 階梯爬升線 —— 這個 section 的視覺 signature：
// 起點（客戶現在的樣子，淡）─────▸ 終點（爬到哪一階，磚紅強調）。
// 純 geometry 箭頭（rotate-45 邊框），不用 emoji / 字元箭頭。
function LadderPath({ from, to }: { from: string; to: string }) {
  return (
    <div
      className="mt-3 flex items-center gap-2.5 font-sans text-sm"
      aria-label={`成熟度階梯：從${from}到${to}`}
    >
      <span className="shrink-0 text-[color:var(--color-fg-subtle)]">
        {from}
      </span>
      <span
        aria-hidden
        className="relative h-px min-w-10 max-w-24 flex-1 bg-[color:var(--color-line-strong)]"
      >
        <span className="absolute -right-px top-1/2 h-1.5 w-1.5 -translate-y-1/2 rotate-45 border-r border-t border-[color:var(--color-line-strong)]" />
      </span>
      <span className="shrink-0 font-medium text-[color:var(--color-accent)]">
        {to}
      </span>
    </div>
  );
}

// 佔位內裡 —— 斜線紋 + 標籤，明示「這裡等真素材」而不是假圖
// （design rule：placeholder > 假貨；正式截圖去識別化後換上、才 merge）。
function ShotPlaceholder() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 grid place-items-center"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent, transparent 9px, color-mix(in oklab, var(--color-line-strong) 40%, transparent) 9px, color-mix(in oklab, var(--color-line-strong) 40%, transparent) 10px)",
      }}
    >
      <span className="rounded-[var(--radius-sm)] border border-[color:var(--color-line)] bg-[color:var(--color-bg)] px-2.5 py-1 font-sans text-xs text-[color:var(--color-fg-subtle)]">
        [截圖 placeholder]
      </span>
    </div>
  );
}

// 代表畫面 —— 桌面截圖配瀏覽器外框、手機截圖配手機外框。
// 外框全用 hairline token（不上陰影），跟 section 的 editorial 線條語彙一致；
// 圖不做 hover 動效：這是內容不是控制項，進場交給外層既有的 Reveal。
function ShotFigure({ shot }: { shot: BuildShot }) {
  const isPhone = shot.frame === "phone";

  return (
    <figure className={isPhone ? "mx-auto w-full max-w-[200px]" : "w-full"}>
      {isPhone ? (
        // 手機外框：外圈圓角走裝置剪影（比 UI 圓角大是刻意的，讓它讀成「一支手機」），
        // 螢幕裁 9:16 —— LINE 對話擷取關鍵一來一回就夠，不需要整支手機的長截圖
        <div className="rounded-[1.25rem] border border-[color:var(--color-line-strong)] bg-[color:var(--color-bg)] p-1.5">
          <div
            aria-hidden
            className="mx-auto mb-1.5 mt-0.5 h-1 w-8 rounded-full bg-[color:var(--color-line-strong)]"
          />
          <div className="relative aspect-[9/16] overflow-hidden rounded-[0.85rem] bg-[color:var(--color-bg-deep)]">
            {shot.src ? (
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(min-width: 1024px) 200px, 60vw"
                className="object-cover"
              />
            ) : (
              <ShotPlaceholder />
            )}
          </div>
        </div>
      ) : (
        // 瀏覽器外框：頂欄三個小圓點用純 geometry（不用 emoji / 紅黃綠擬真色），
        // 螢幕裁 16:10 —— 桌面系統畫面的通用比例
        <div className="overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-line-strong)] bg-[color:var(--color-bg)]">
          <div className="flex items-center gap-1.5 border-b border-[color:var(--color-line)] px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-line-strong)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-line-strong)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-line-strong)]" />
          </div>
          <div className="relative aspect-[16/10] bg-[color:var(--color-bg-deep)]">
            {shot.src ? (
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover"
              />
            ) : (
              <ShotPlaceholder />
            )}
          </div>
        </div>
      )}
      <figcaption
        className={`mt-3 font-sans text-xs leading-relaxed text-[color:var(--color-fg-subtle)] ${
          isPhone ? "text-center" : ""
        }`}
      >
        {shot.caption}
      </figcaption>
    </figure>
  );
}

// 之前／做了／現在 三段 —— dt 用加寬字距的中文小標，
// 「現在」（成效）用主文字色加重，掃讀時跟產業名、階梯線構成第一眼層級。
const stageLabel =
  "font-sans text-xs tracking-[0.25em] text-[color:var(--color-fg-subtle)] pt-0.5 shrink-0 w-12";

export function Builds() {
  return (
    <section id="builds" className="section bg-[color:var(--color-bg-muted)]">
      <div className="container-narrow">
        {/* Section header */}
        <Reveal>
          <div className="grid md:grid-cols-12 gap-12 mb-20">
            <div className="md:col-span-4 lg:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)]">
                  03
                </span>
                <HairlineLine />
              </div>
              <h2 className="eyebrow">Builds</h2>
              <p className="font-display text-2xl md:text-3xl mt-4 leading-tight text-[color:var(--color-ink)]">
                實戰
              </p>
            </div>
            <div className="md:col-span-8 lg:col-span-9 max-w-2xl">
              <p className="font-display text-2xl md:text-3xl leading-[1.4] text-[color:var(--color-ink)]">
                六套正在日常裡跑的系統。
              </p>
              <p className="mt-6 font-sans text-base text-[color:var(--color-fg-muted)]">
                起點不一樣：有的從紙本開始，有的從試算表，有的從一套用不順的外包系統。
                走的是同一條路：把卡住的流程，一階一階鍛造成自己的系統。
              </p>
            </div>
          </div>
        </Reveal>

        {/* Case list — editorial stack，同 Services 的 table-like 節奏 */}
        <div className="border-t border-[color:var(--color-line-strong)]">
          {builds.map((build, idx) => {
            // 手機圖直式高、放右側欄跟文字並排；瀏覽器圖橫式寬、疊在文字下方
            // （兩張都有時，瀏覽器圖疊在文字欄下方、手機圖仍在右側欄，
            // 讀起來是「LINE 一句話 → 系統自動生成畫面」的因果對）。
            // 沒圖的案例維持原本兩欄，混排下每案的文字節奏不變。
            const phoneShot = build.shots?.find((s) => s.frame === "phone");
            const browserShot = build.shots?.find(
              (s) => s.frame === "browser",
            );

            return (
              <Reveal key={build.number} delay={idx * 100}>
                <article className="grid lg:grid-cols-12 gap-6 py-10 border-b border-[color:var(--color-line-strong)]">
                  <div className="lg:col-span-4">
                    <div className="font-mono text-sm tabular-nums text-[color:var(--color-fg-subtle)] mb-2">
                      {build.number}
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl leading-tight text-[color:var(--color-ink)]">
                      {build.industry}
                    </h3>
                    <LadderPath from={build.from} to={build.to} />
                  </div>

                  <div className={phoneShot ? "lg:col-span-5" : "lg:col-span-8"}>
                    <dl className="space-y-4 lg:pt-1">
                      <div className="flex gap-4">
                        <dt className={stageLabel}>之前</dt>
                        <dd className="font-sans text-sm leading-[1.7] text-[color:var(--color-fg-muted)]">
                          {build.before}
                        </dd>
                      </div>
                      <div className="flex gap-4">
                        <dt className={stageLabel}>做了</dt>
                        <dd className="font-sans text-sm leading-[1.7] text-[color:var(--color-fg-muted)]">
                          {build.built}
                        </dd>
                      </div>
                      <div className="flex gap-4">
                        <dt className={stageLabel}>現在</dt>
                        <dd className="font-sans text-base leading-[1.7] text-[color:var(--color-fg)]">
                          {build.now}
                        </dd>
                      </div>
                    </dl>
                    {browserShot && (
                      <div className="mt-8">
                        <ShotFigure shot={browserShot} />
                      </div>
                    )}
                  </div>

                  {phoneShot && (
                    <div className="lg:col-span-3">
                      <ShotFigure shot={phoneShot} />
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Footnote — 匿名說明本身就是信任線索，順手接一個低門檻 CTA */}
        <Reveal>
          <p className="mt-10 font-sans text-sm text-[color:var(--color-fg-subtle)]">
            部分案例已徵得客戶同意公開名稱，其餘維持去識別化。想看系統實際跑起來的樣子，
            <a
              href="#contact"
              className="link-underline text-[color:var(--color-accent)]"
            >
              來聊的時候示範給你看
            </a>
            。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
