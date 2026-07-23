// 鐵鎚敲擊星圖的節點樹（嵌在首頁 Hero 與 Services 之間，2026-07-14 About 退位後）。
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
    // 2026-07-14 對齊 Services 光譜重構（REBUILD-PLAN 05）：四子星（商品格）→ 三子星（一條路）。
    // 「幫你建」是星圖第二個跨出 /#services 的目的地（指實戰 /#builds，proof 就地可看）。
    id: "services",
    label: "如何開始鍛造",
    tint: "var(--color-accent)", // 磚紅
    blurb: "入口是診斷：先聊你的流程，要教你建還是幫你建，聊完才分路。",
    children: [
      { id: "diagnosis", label: "流程診斷", tint: "var(--color-accent)", href: "/#services", blurb: "入口。聊一小時，看你卡在哪、哪些能交給 AI。" },
      { id: "learn", label: "教你建", tint: "var(--color-accent)", href: "/#services", blurb: "工作坊帶團隊、一對一陪個人，把自建能力留在你手上。" },
      { id: "build", label: "幫你建", tint: "var(--color-accent)", href: "/#builds", blurb: "我跟你一起從場景拆到上線。五套正在跑的系統在這。" },
    ],
  },
  {
    id: "work",
    label: "近期作品",
    tint: "var(--color-spark)", // 火花橘
    blurb: "最近在做、在分享的事，每一顆都是一場真實的活動。",
    children: [
      { id: "n8n", label: "n8n 工作坊", tint: "var(--color-spark)", href: "/#work", blurb: "帶學員從零到能自己 build 自動化流程的完整閉環。" },
      { id: "doc-era", label: "文件驅動", tint: "var(--color-spark)", href: "/#work", blurb: "AI 自動化進入文件驅動的時代，談脈絡如何決定對話品質。" },
      { id: "neuro", label: "神經可塑性", tint: "var(--color-spark)", href: "/#work", blurb: "用一場說書講大腦如何被重塑，配上我自己的真實軌跡。" },
    ],
  },
  {
    id: "about",
    label: "關於鍛造所",
    tint: "var(--color-ai)", // 沉穩藍
    blurb: "我相信的事：向外鍛造工具，向內鍛造自己。",
    children: [
      { id: "outward", label: "向外 · AI", tint: "var(--color-ai)", href: "/#about", blurb: "向外：刻意練習駕馭 AI，讓它操控電腦、碰你的資料，放大十倍百倍。" },
      { id: "inward", label: "向內 · 閱讀", tint: "var(--color-ai)", href: "/#about", blurb: "向內：用閱讀靜下來思索、沉澱知識，跟自己的現狀碰撞出新的自己。" },
      { id: "slow", label: "不急", tint: "var(--color-ai)", href: "/#about", blurb: "『不急』，是相信時間，也相信自己。慢，不是拖延，是必然的進展。" },
    ],
  },
  {
    // 第 4 顆主星沿革：學員見證 → 工具 /skills (2026-06-03) → 實戰 (2026-07-14，Josh 拍板)。
    // B2B 新軸下 proof 比工具重要——五顆子星＝實戰五案例，全部同頁捲到 /#builds；
    // /skills 工具頁入口由 Nav「工具」承接，星圖回歸首頁地圖。
    id: "builds",
    label: "實戰",
    tint: "var(--color-reading)", // 抹茶綠（沿用第 4 顆位置的色，佈局色彩平衡不變）
    blurb: "五套正在別人日常裡跑的系統，點開看每一套解了什麼。",
    children: [
      { id: "bd-account", label: "某會計事務所", tint: "var(--color-reading)", href: "/#builds", blurb: "LINE 一句話寫進行事曆，登記、結算、交辦都在系統裡跑。" },
      { id: "bd-tuition", label: "某文理補習班", tint: "var(--color-reading)", href: "/#builds", blurb: "兩百多位學生的繳費，從紙本登記變成篩一下就看到。" },
      { id: "bd-pickle", label: "某匹克球館", tint: "var(--color-reading)", href: "/#builds", blurb: "AI 解析報名訊息，六百多場真實場次在系統裡跑。" },
      { id: "bd-tutor", label: "家教教學現場", tint: "var(--color-reading)", href: "/#builds", blurb: "三十幾個學生的進度系統。自己賣的東西，自己先用。" },
      { id: "bd-creator", label: "某創作者頻道", tint: "var(--color-reading)", href: "/#builds", blurb: "留言關鍵字自動回覆，正在真實頻道上調校。" },
    ],
  },
];
