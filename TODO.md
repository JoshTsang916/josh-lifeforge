# josh-lifeforge — 待調整清單

> 最近更新：2026-05-08
> 按優先度分組；按「先決策、再實作、最後加錦上添花」排序。
> 維護慣例：完成一項就從 🔴/🟡/🟢 移到「已完成」並標日期；想到新的就加到對應分類。

---

## 🔴 要改但未改（影響體驗）

### 1. Writings 文章無法點擊
現在 Writings section 顯示 9 篇 published articles，但**標題只有 hover 變色，沒有連結**。訪客點了沒反應。

來源：智囊團審核 #1（high）
**要 Josh 先決策的問題**：
- (A) 連到外部平台（Threads / Vocus / Medium 等你實際發布的地方）？
- (B) 建站內 `/writings/[slug]` 頁面，文章內容在自己網站上讀？
- (C) 混合：一部分站內、一部分外部

如果走 A：contents 表要補一個 `url` 或 `external_url` 欄位，Josh 把每篇文章的發布 URL 填進去，我讀來顯示。
如果走 B：contents 表要補 `slug` 欄位，我建 `/writings/[slug]/page.tsx` SSR 讀 body 渲染。

### 2. 客戶授權後 doris/tibonus 露名 + 截圖
Services 04 Build With Me 目前用「某會計事務所」「某食品代理商」匿名版。客戶授權拿到後可：
- 把 `proof.cases` 內字串替換成具體公司名（doris 客戶會計事務所 / 台灣愛玉）
- 加產品截圖（doris dashboard / tibonus Excel 薪資條 / LINE bot 截圖）
- 視情況升級到獨立 Builds section（編號重編到 01-08）

CLAUDE.md「Design notes」記錄這個拍板：先匿名上線，等授權升級。

來源：2026-05-08 加 04 Build With Me 時的 trade-off

---

## 🟡 建議改 / 待決策（可以排期，不急上線）

### 3. Services 01-03 對齊新 BRAND（7b 殘餘）
04 Build With Me 已對齊「一人公司 + AI」主軸，01 工作坊 / 02 1 對 1 / 03 演講 仍是 v0 草稿——當初寫的是「內容工作流 / 職涯轉型」訊息，跟新 BRAND 的「AI 鍛造工具 / 閱讀鍛造自己 / 慢富」不同步。

要 Josh 決定的：
- 三條 description 是否要重寫對齊「一人公司必須會的 AI 知識」主軸？
- 或維持原描述（教學產品定位本來就跟 04 客製化開發不同主軸，不一定要硬同步）

來源：2026-04-23 智囊團審核 #H → 2026-04-25 BRAND 重新定位 → 2026-05-08 04 加完後殘餘

### 4. FORGE 框架展開說明
FORGE 是你品牌核心 IP，目前只在 About 有一行 callout，太可惜。可以視覺化 5 個字母代表什麼。

來源：智囊團審核 #J
要 Josh 決定：
- 要不要在網站公開解釋這套方法論？
- 如果要，用 5 個字母的卡片列表，還是一段文字 + 流程圖？

### 5. Newsletter 訂閱框
給「觀望型」訪客（還沒準備諮詢但想追蹤你）一個門檻低的入口。現在門檻太高（Gmail / Calendly 二選一）。

來源：智囊團審核 #D
要 Josh 決定：
- 要做嗎？
- 要的話選哪家？**Buttondown** 最簡單、**ConvertKit** 功能多

### 6. 找更好的標題字體（取代思源宋）
你之前說「思源宋有點氾濫」park 起來。候選可以去 justfont / 文鼎 / Adobe Fonts 看商用付費字體，或試其他 Google Fonts 開源字體。

Parked: 2026-04-23

### 7. FORGE callout 副標重寫
2026-04-25 BRAND 重新定位後，FORGE callout 文字目前是 placeholder「[副標待 Josh 親寫，原 AI 生版本已拋棄]」。

位置：`src/components/About.tsx` FORGE callout 第 2 個 `<p>`
要 Josh 寫的：FORGE 五步法的一句話副標描述（取代原 AI 生版本）
來源：2026-04-25 morning-flow 五元素定錨討論
參照：BRAND.md 「FORGE callout」段

---

## 🟢 錦上添花 / 標準件

### 8. robots.txt / sitemap.xml / 404 page
SEO 標準件。Next.js App Router 可用 `app/robots.ts` + `app/sitemap.ts` + `app/not-found.tsx` 自動生成。
預估：20 分鐘

### 9. 剩餘照片利用
目前用了 3 張，還有 8 張沒用：
- `workshop-n8n-1/2/4/5.jpg` — n8n workshop 其他角度
- `talk-ai-forum-group.jpg` — 為未來 AI 分享會團體
- `talk-ai-forum-solo.jpg` — 已用於 About
- `talk-neuroplasticity-group.jpg` — 神經可塑性團體

之後可做「活動詳情頁」(`/work/[slug]`)，點卡片進入看更多照片 + 詳細描述。

### 10. Vercel Preview 環境變數
目前只有 production 設了 SUPABASE_URL / SUPABASE_ANON_KEY。preview deploy 時 Writings 會 fallback 到 empty state。如果要讓 preview deploys 也能展示文章，手動在 Vercel dashboard 設 preview env vars。

### 11. Services section `<article>` 語意
Claude 審核提到每個服務項目用 `<article>` 語意不精確（article = 可獨立分發的內容）。可以在下次重構時改成 `<li>` in `<ol>` 或 `<div>`。低優先。

### 12. MobileMenu.tsx 既有 lint error
`react-hooks/set-state-in-effect` 錯誤——`useEffect` 內直接 `setMounted(true)` 觸發 cascading renders。

從 PR #1 (`472b4d8` / `68a6930`) 引入時就有，2026-05-08 跑 `npm run build` 才注意到。Vercel build 仍過所以非阻塞。

修法（任選）：
- 用 `useSyncExternalStore` 取代 mounted flag
- 用 `useId()` + `useState(() => typeof document !== "undefined")` 條件初始化

預估：10 分鐘。低優先——不影響功能。

來源：2026-05-08 加 SectionIndex 後跑 build 抓到

### 13. 動工機路徑寫死
CLAUDE.md「Related repos」段把 ccdailytalk / remotion 寫成 `D:/...` Windows 路徑。M5 (Mac) 已是 lifeforge 動工機（多個 commit 證實）。已在 CLAUDE.md 加註，但長期看路徑寫死太脆，未來第三台或團隊接手要重整。

低優先——不影響開發。

來源：2026-05-08 加 toolbar 時掃 CLAUDE.md 發現

---

## ✅ 今天完成（2026-05-08）

Branch `feat/services-add-build-with-me` 累積 4 個 commit + 5 條 issue 處理：

1. **`c01db37` Services 加 04 Build With Me**——第 4 條「一起把它蓋出來 / Build With Me」服務，含 doris/tibonus 匿名 proof cases，補上 BRAND「一人公司 + AI」的實作型服務 slot；section subtitle 從「三種協作形式」改成「四種協作形式，從教學到實作」
2. **`039f953` 加 SectionIndex strip**——Hero/About 之間的 editorial TOC + 6 條 hook 描述，給訪客 1-screen page overview。設計選擇：**不歸 01-07 編號**（CLAUDE.md Design notes 紀錄）
3. **`88d98b6` 整合 @vercel/toolbar**——preview-env-only 條件 inject，讓 Playwright / 同事 / 訪客（非依賴 Josh 個人 Chrome extension）都看得到 toolbar，解鎖 Vercel Comments → GitHub Issue workflow
4. **`f2b34a9` 5 條 Vercel inbox issue 處理**：
   - #5 RecentWork 03 title：騎象人學會了與大象共處 → 神經可塑性說書專場
   - #6 RecentWork 02 title：80 字的魔法 → AI 自動化，進入了文件驅動的時代
   - #7 Testimonials quote 拿掉 `italic` class（4 條全部）
   - #8 Testimonials 拿掉 `&ldquo;` 大引號裝飾 span
   - #9 Testimonials subtitle：上過 n8n 工作坊、或來引導力學院分享會之後寫來的訊息 → n8n 工作坊與 AI 自動化分享會的學員見證
   - 連帶：SectionIndex Recent Work hook 同步新 titles，Testimonials hook「兩位 → 四位」

**確立的協作 workflow**（CLAUDE.md「Comments / Feedback workflow」紀錄）：
Josh 在 preview 留 Vercel Comments → 每條 click GitHub icon → Convert to Issue → Claude 用 `gh issue list` 撈純文字接手。**禁用 OCR / screenshot 視覺讀**（同 session 證實「不要斜體」會被讀成「不要糾結」）。

**過去 sessions 完成（這次一併移進來）**：
- 手機版漢堡選單（PR #1 `472b4d8` / `68a6930`）—— 原 #1 完成
- 正式 OG image（PR #2 `74eb7f2`）—— 原 #8 完成
- 社群連結 / Calendly URL（PR #2-#4）—— 原 #9 / #10 完成
- Services forWho 文字（forWho 已加在 01-04 description 內，**visual badge 未做**）—— 原 #4 部分完成

---

## ✅ 今天完成（2026-04-23）

Next.js 16 + Tailwind v4 + TypeScript 初始化 / Vercel production / GitHub public /
6 個 sections / Supabase Writings 自動同步 / 字體迭代 v0.1→v0.5 (Noto Serif TC + LXGW WenKai TC) /
/fonts playground / Logo + 品牌色系統對齊 SSoT / 智囊團三方審核 /
審核 high-priority fixes 套用完 / Hero/About/RecentWork 加入 Josh 真實照片 /
n8n Workshop / 為未來 AI 分享會 / HPX × Wee 神經可塑性 三個 Recent Work 活動卡
