// 鍛造宇宙的節點樹。
// 結構：中央鐵鎚敲擊 → 砸擊點炸出火花 → 每顆火花是一個主題 →
//   hover 火花高亮、其餘變暗、長出小火花分支（星星散開）→
//   可展開的火花點擊進下一層，葉節點點擊跳回首頁對應 section。
// tint 一律用 globals.css @theme token，火花在暖炭底上發光。
export type ForgeNode = {
  id: string;
  /** 火花旁的短標籤 */
  label: string;
  /** 火花色調 — @theme CSS 變數 */
  tint: string;
  /** hover / focus 時舞台下方顯示的一句話 */
  blurb: string;
  /** 葉節點：點擊導向（首頁錨點）。有 children 時不需要 */
  href?: string;
  /** 可展開的下一層火花 */
  children?: ForgeNode[];
};

// 第一層：呼應 Josh 構想「主星：我提供什麼、近期作品…」
// 服務 / 作品可再展開；見證 / 關於直接跳轉（資訊已在首頁該段完整呈現）
export const FORGE_ROOT: ForgeNode[] = [
  {
    id: "services",
    label: "我提供什麼",
    tint: "var(--color-accent)", // 磚紅 — 主力服務
    blurb: "工作坊、一對一諮詢、演講、客製開發 —— 我能幫你的四種方式。",
    children: [
      {
        id: "workshop",
        label: "工作坊",
        tint: "var(--color-accent)",
        blurb:
          "工作坊 —— 從 0 到 1 帶你把 AI 變成每天都在用的工具，當場做出來、回家用得上。",
        href: "/#services",
      },
      {
        id: "consulting",
        label: "一對一諮詢",
        tint: "var(--color-accent)",
        blurb:
          "一對一諮詢 —— 你的 AI 顧問。想轉型、想自動化、卡在技術問題，我們一起拆解。",
        href: "/#services",
      },
      {
        id: "speaking",
        label: "演講",
        tint: "var(--color-accent)",
        blurb:
          "演講 —— 企業內訓、公開分享、社群活動，用故事和實例讓抽象技術變得可感、可用。",
        href: "/#services",
      },
      {
        id: "build",
        label: "Build With Me",
        tint: "var(--color-accent)",
        blurb:
          "Build With Me —— 把你的想法變成真正能用的產品，用 AI 加速開發，陪你把 MVP 做出來。",
        href: "/#services",
      },
    ],
  },
  {
    id: "work",
    label: "近期作品",
    tint: "var(--color-spark)", // 火花橘 — 鍛造的產物
    blurb: "最近在做、在分享的事 —— 每一顆都是一場真實的活動。",
    children: [
      {
        id: "n8n",
        label: "n8n 工作坊",
        tint: "var(--color-spark)",
        blurb:
          "n8n Automation Workshop —— 帶學員從零開始，從 webhook 到 API 串接，當天做出能跑的流程。",
        href: "/#work",
      },
      {
        id: "doc-era",
        label: "文件驅動的時代",
        tint: "var(--color-spark)",
        blurb:
          "AI 自動化進入文件驅動的時代 —— 在引導力學院分享 AI 如何改變知識工作者的生產方式。",
        href: "/#work",
      },
      {
        id: "neuro",
        label: "神經可塑性說書",
        tint: "var(--color-spark)",
        blurb:
          "神經可塑性說書專場 —— 深入淺出講《用神經科學打造高效大腦》，把腦科學變成可實踐的方法。",
        href: "/#work",
      },
    ],
  },
  {
    id: "testimonials",
    label: "學員見證",
    tint: "var(--color-reading)", // 抹茶綠 — 信任
    blurb: "學員怎麼說 —— 點擊看完整見證。",
    href: "/#testimonials",
  },
  {
    id: "about",
    label: "關於鍛造所",
    tint: "var(--color-ai)", // 沉穩藍 — 理念
    blurb: "我是 Josh，這是我相信的事 —— 點擊認識人生鍛造所。",
    href: "/#about",
  },
];
