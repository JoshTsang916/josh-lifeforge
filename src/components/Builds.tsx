import Image from "next/image";
import { Reveal } from "./Reveal";
import { HairlineLine } from "./HairlineLine";

// 實戰 section —— REBUILD-PLAN 04「實戰[重框・升格]」的落地：
// proof cases 從 Services 04 的兩行小字升格成獨立 section。
// 每案標「成熟度階梯 from → to」（紙本→數位→系統→自動→智能，佔位五階，
// 正式框架 Win/M1 成熟後回填），呈現「之前的痛 → 做了什麼 → 現在」三段。
// 客戶露名進度不一：01/02/03 已取得授權露真名＋補系統截圖，05 仍匿名（授權未拿）。

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
    built:
      "員工在 LINE 說句「下午外出收件」，AI 解析寫進行事曆，主管週曆一覽全所；月薪結算自動帶入分潤；交辦變成 LINE 卡片，按一下回報完成。",
    now: "登記、結算、交辦都在系統裡跑，老闆看報表就好。",
    shots: [
      {
        frame: "phone",
        src: "/photos/builds/doris-line.jpg",
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
  {
    number: "02",
    industry: "神綺匹克球館",
    from: "手抄名單",
    to: "智能",
    before:
      "臨打報名、包場、候補全靠館主盯著 LINE 手抄，對外場次圖天天手工做。",
    built:
      "報名截圖或文字丟給 LINE 機器人，AI 解析自動記名單；滿員自動候補；包場名冊配對帳單，誰逾期一眼看到；對外場次圖一鍵下載。",
    now: "六百多場真實場次在系統裡跑。",
    shots: [
      {
        frame: "phone",
        src: "/photos/builds/pickleball-line.jpg",
        alt: "神綺館匹克球報名系統 LINE 對話畫面，機器人自動回報包場登記狀態",
        caption: "報名訊息丟給 LINE 機器人",
      },
      {
        frame: "browser",
        src: "/photos/builds/pickleball-schedule.png",
        alt: "匹克球館報名後台畫面，顯示場次名單與候補狀態",
        caption: "名單、候補、逾期一次看到",
      },
    ],
  },
  {
    number: "03",
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
    number: "04",
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
    number: "05",
    industry: "某創作者頻道",
    from: "手動回覆",
    to: "自動",
    before: "每支短影片下面重複貼長片連結，漏回就是流量流失。",
    built: "定時掃留言、關鍵字比對、自動回覆對應連結，回過的記著不重複。",
    now: "核心流程已跑通，正在真實頻道上調校。",
    shots: [
      {
        frame: "phone",
        src: "/photos/builds/ytreply-comment.jpg",
        alt: "YouTube 短影片留言區在手機上的畫面，機器人自動回覆對應的長片連結",
        caption: "留言區現場，機器人自動回上連結",
      },
    ],
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
                五種產業，五套正在日常裡跑的系統。
              </p>
              <p className="mt-6 font-sans text-base text-[color:var(--color-fg-muted)]">
                起點不一樣：有的從紙本開始，有的從 Excel。
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
