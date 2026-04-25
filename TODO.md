# josh-lifeforge — 待調整清單

> 今天 (2026-04-23) 從 0 到 1 上線。以下是還沒做、要慢慢處理的事。
> 按優先度分組；按「先決策、再實作、最後加錦上添花」排序。

---

## 🔴 要改但未改（影響體驗）

### 1. 手機版漢堡選單
目前 768px 以下 Nav 的 5 個錨點連結被隱藏（`hidden md:flex`），手機訪客只看到 Logo + 「預約諮詢」按鈕，無法跳 About / Services / Work / Writings。

來源：智囊團審核 #3（high）
處理：在 `src/components/Nav.tsx` 加 `useState` + hamburger icon + 展開 drawer
預估：30 分鐘

### 2. Writings 文章無法點擊
現在 Writings section 顯示 9 篇 published articles，但**標題只有 hover 變色，沒有連結**。訪客點了沒反應。

來源：智囊團審核 #1（high）
**要 Josh 先決策的問題**：
- (A) 連到外部平台（Threads / Vocus / Medium 等你實際發布的地方）？
- (B) 建站內 `/writings/[slug]` 頁面，文章內容在自己網站上讀？
- (C) 混合：一部分站內、一部分外部

如果走 A：contents 表要補一個 `url` 或 `external_url` 欄位，Josh 把每篇文章的發布 URL 填進去，我讀來顯示。
如果走 B：contents 表要補 `slug` 欄位，我建 `/writings/[slug]/page.tsx` SSR 讀 body 渲染。

---

## 🟡 建議改 / 待決策（可以排期，不急上線）

### 3. Hero vs Services 訊息不一致
Hero 說「**內容工作流**」，About / Services 說「**職涯轉型、學習方法**」——訪客不確定 Josh 的核心服務是哪個。

來源：智囊團審核 #H
要 Josh 決定：主打哪個？
- 「幫人建內容工作流」→ 偏創作者 / 內容人
- 「職涯轉型 × 學習方法」→ 偏專業工作者 / 轉職者
- 還是兩個都要（需要新的更上位的一句話涵蓋）

### 4. Services 加「適合對象」標籤
工作坊（偏企業/團體）、1 對 1（個人）、演講（機構）受眾不同，訪客要自己判斷。加一個小 badge 降低判斷成本。

來源：智囊團審核 #I
預估：10 分鐘

### 5. FORGE 框架展開說明
FORGE 是你品牌核心 IP，目前只在 About 有一行 callout，太可惜。可以視覺化 5 個字母代表什麼。

來源：智囊團審核 #J
要 Josh 決定：
- 要不要在網站公開解釋這套方法論？
- 如果要，用 5 個字母的卡片列表，還是一段文字 + 流程圖？

### 6. Newsletter 訂閱框
給「觀望型」訪客（還沒準備諮詢但想追蹤你）一個門檻低的入口。現在門檻太高（Gmail / Calendly 二選一）。

來源：智囊團審核 #D
要 Josh 決定：
- 要做嗎？
- 要的話選哪家？**Buttondown** 最簡單、**ConvertKit** 功能多

### 7. 找更好的標題字體（取代思源宋）
你之前說「思源宋有點氾濫」park 起來。候選可以去 justfont / 文鼎 / Adobe Fonts 看商用付費字體，或試其他 Google Fonts 開源字體。

Parked: 2026-04-23

### 7a. FORGE callout 副標重寫
2026-04-25 BRAND 重新定位後，FORGE callout 文字目前是 placeholder「[副標待 Josh 親寫，原 AI 生版本已拋棄]」。

位置：`src/components/About.tsx` FORGE callout 第 2 個 `<p>`
要 Josh 寫的：FORGE 五步法的一句話副標描述（取代原 AI 生版本）
來源：2026-04-25 morning-flow 五元素定錨討論
參照：BRAND.md 「FORGE callout」段

### 7b. Services section 對齊新定位
TODO #3「Hero vs Services 訊息不一致」中 Hero / About 已於 2026-04-25 替換成五元素定位（一人公司 + AI + 閱讀 + 慢富 + 數位游牧），但 Services 三個服務（工作坊 / 1 對 1 / 演講）的描述還沒同步調整。

來源：2026-04-23 智囊團審核 #H + 2026-04-25 BRAND 重新定位 follow-up
要 Josh 決定：Services 文案是否要對齊新主軸；以及 #3「主打哪個」現在答案是「一人公司必須會的 AI 知識」，Services 是否要按這條重寫

---

## 🟢 錦上添花 / 標準件

### 8. 正式 OG image（1200×630 橫式）
目前 OG image 用 logo.png（1080×1080 方形）湊數。社群分享預覽品質更好做一張專用橫式圖含品牌名 + slogan。
Canva / Figma 做一張，檔名 `og-image.png` 放 `public/`，改 `layout.tsx` metadata。

### 9. 社群連結
Footer 現在 Threads / IG / YouTube 的 href 都是 `#`。你把 URL 給我，我替換進去。

### 10. Calendly URL
Josh 啟用 Calendly 後，把 URL 給我，改 `src/components/Contact.tsx` 的 `CALENDLY_URL` 常數，`即將啟用` 變成真的按鈕。

### 11. robots.txt / sitemap.xml / 404 page
SEO 標準件。Next.js App Router 可用 `app/robots.ts` + `app/sitemap.ts` + `app/not-found.tsx` 自動生成。
預估：20 分鐘

### 12. 剩餘照片利用
目前用了 3 張，還有 8 張沒用：
- `workshop-n8n-1/2/4/5.jpg` — n8n workshop 其他角度
- `talk-ai-forum-group.jpg` — 為未來 AI 分享會團體
- `talk-ai-forum-solo.jpg` — 已用於 About
- `talk-neuroplasticity-group.jpg` — 神經可塑性團體

之後可做「活動詳情頁」(`/work/[slug]`)，點卡片進入看更多照片 + 詳細描述。

### 13. Vercel Preview 環境變數
目前只有 production 設了 SUPABASE_URL / SUPABASE_ANON_KEY。preview deploy 時 Writings 會 fallback 到 empty state。如果要讓 preview deploys 也能展示文章，手動在 Vercel dashboard 設 preview env vars。

### 14. Services section `<article>` 語意
Claude 審核提到每個服務項目用 `<article>` 語意不精確（article = 可獨立分發的內容）。可以在下次重構時改成 `<li>` in `<ol>` 或 `<div>`。低優先。

---

## ✅ 今天完成（2026-04-23）

Next.js 16 + Tailwind v4 + TypeScript 初始化 / Vercel production / GitHub public /
6 個 sections / Supabase Writings 自動同步 / 字體迭代 v0.1→v0.5 (Noto Serif TC + LXGW WenKai TC) /
/fonts playground / Logo + 品牌色系統對齊 SSoT / 智囊團三方審核 /
審核 high-priority fixes 套用完 / Hero/About/RecentWork 加入 Josh 真實照片 /
n8n Workshop / 為未來 AI 分享會 / HPX × Wee 神經可塑性 三個 Recent Work 活動卡

---

**維護慣例**：完成一項就從 🔴/🟡/🟢 移到「已完成」並標日期。Josh 想到新的就加到對應分類。
