// 鐵鎚敲擊星圖的節點樹（嵌在首頁 About 與 Services 之間）。
// 互動：鐵鎚敲下 → 主火花炸出（主支線恆在）→ 點主火花「就地」長出小火花分支
//   （不抽換主結構）→ 點小火花 = 捲到首頁對應 section。
// 四顆主火花全部有 children。tint 一律用 globals.css @theme token。
export type ForgeNode = {
  id: string;
  label: string;
  tint: string;
  /** hover 時舞台下方顯示的一句話 */
  blurb: string;
  /** 葉節點：點擊捲到的首頁錨點 */
  href?: string;
  /** 點主火花就地長出的小火花 */
  children?: ForgeNode[];
};

export const FORGE_ROOT: ForgeNode[] = [
  {
    id: "services",
    label: "我提供什麼",
    tint: "var(--color-accent)", // 磚紅
    blurb: "工作坊、一對一諮詢、演講、客製開發 —— 我能幫你的四種方式。",
    children: [
      { id: "workshop", label: "工作坊", tint: "var(--color-accent)", href: "/#services", blurb: "從 0 到 1 帶你把 AI 變成每天都在用的工具。" },
      { id: "consulting", label: "一對一諮詢", tint: "var(--color-accent)", href: "/#services", blurb: "你的 AI 顧問，陪你拆解轉型、自動化、技術卡點。" },
      { id: "speaking", label: "演講", tint: "var(--color-accent)", href: "/#services", blurb: "用故事和實例，讓抽象技術變得可感、可用。" },
      { id: "build", label: "一起蓋", tint: "var(--color-accent)", href: "/#services", blurb: "Build With Me —— 用 AI 加速，陪你把 MVP 做出來。" },
    ],
  },
  {
    id: "work",
    label: "近期作品",
    tint: "var(--color-spark)", // 火花橘
    blurb: "最近在做、在分享的事 —— 每一顆都是一場真實的活動。",
    children: [
      { id: "n8n", label: "n8n 工作坊", tint: "var(--color-spark)", href: "/#work", blurb: "帶學員從零到能自己 build 自動化流程的完整閉環。" },
      { id: "doc-era", label: "文件驅動", tint: "var(--color-spark)", href: "/#work", blurb: "AI 自動化進入文件驅動的時代 —— 談脈絡如何決定對話品質。" },
      { id: "neuro", label: "神經可塑性", tint: "var(--color-spark)", href: "/#work", blurb: "用一場說書講大腦如何被重塑，配上我自己的真實軌跡。" },
    ],
  },
  {
    id: "about",
    label: "關於鍛造所",
    tint: "var(--color-ai)", // 沉穩藍
    blurb: "我相信的事 —— 向外鍛造工具，向內鍛造自己。",
    children: [
      { id: "outward", label: "向外 · AI", tint: "var(--color-ai)", href: "/#about", blurb: "向外：刻意練習駕馭 AI，讓它操控電腦、碰你的資料，放大十倍百倍。" },
      { id: "inward", label: "向內 · 閱讀", tint: "var(--color-ai)", href: "/#about", blurb: "向內：用閱讀靜下來思索、沉澱知識，跟自己的現狀碰撞出新的自己。" },
      { id: "slow", label: "不急", tint: "var(--color-ai)", href: "/#about", blurb: "『不急』，是相信時間，也相信自己。慢，不是拖延，是必然的進展。" },
    ],
  },
  {
    // 原「學員見證」改為「工具」(2026-06-03)：見證仍在 Testimonials section 05 + Nav「見證」，
    // 此處改指向 /skills 工具頁，讓 forge 從「首頁地圖」擴成「全站地圖」入口。
    // 子火花 href 從 /#錨點（同頁捲動）變 /skills（跨頁）—— 這顆是 forge 唯一的跨頁目的地。
    id: "tools",
    label: "工具",
    tint: "var(--color-reading)", // 抹茶綠（沿用第 4 顆位置的色，佈局色彩平衡不變）
    blurb: "我做的、可以帶走的 skill 與 agent —— 點開挑一個，裝進你自己的環境。",
    children: [
      { id: "tl-skillcreator", label: "skill-creator", tint: "var(--color-reading)", href: "/skills", blurb: "建立 / 重構 Claude Code skill 的 meta-skill，內含七層架構放置指南。" },
      { id: "tl-translate", label: "translate-card", tint: "var(--color-reading)", href: "/skills", blurb: "把英文好文翻成繁中、做成中英對照的 Obsidian 卡，自動下載圖片。" },
      { id: "tl-braintrust", label: "智囊團", tint: "var(--color-reading)", href: "/skills", blurb: "Claude + Codex + Gemini 三方交叉審查，幫你的程式碼或決策抓盲點。" },
    ],
  },
];
