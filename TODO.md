# josh-lifeforge — 待調整清單

> 最近更新：2026-05-09
> 按優先度分組；按「先決策、再實作、最後加錦上添花」排序。
> 維護慣例：完成一項就從 🔴/🟡/🟢 移到「已完成」並標日期；想到新的就加到對應分類。

---

## 🔴 要改但未改（影響體驗）

### 1. Writings 升級成完整 content pipeline（5/10 拍板；Phase 1 基礎建設已寫好、待 merge）

> **Phase 1 基礎建設已寫好（branch `feat/writings-section`，2026-05-12，⚠️ 尚未 merge / 未上線）** —— `/writings` 列表頁 + `/writings/[slug]` 文章頁、Supabase `writings` 表 + RLS + `writings-assets` bucket、`react-markdown`+`remark-gfm`+`rehype-raw`+`rehype-sanitize` 渲染、`.article-prose` 排版、Nav/MobileMenu 加「文章」跨頁連結 —— 都做好、tsc/lint/build 過、本地 + preview 都驗過（preview env var 已設、branch-scoped）。實作細節寫進 CLAUDE.md「Database」段。
>
> **merge 卡在兩件「等下次」做的事**（2026-05-12 Josh review 後）：
> 1. **第一篇內容 Josh 要重寫** —— 現有 `body_md` 是 AI 改寫版，Josh 判定「100% AI 味」、要親自寫一版。所以那筆 `writings` row 已改回 `status = 'draft'`（Josh 版本 ready 後 `UPDATE` 該 row 的 `body_md`（+ `title`/`excerpt`/`reading_time` 視情況）+ 翻回 `published`）。
> 2. **首頁順便重排** —— Daily 區塊太長，Josh 想縮成 1–2 張影片卡片，並在那附近加一個**首頁 Writings section**。⚠️ 這推翻了下面 sub-decision #6「純分頁、首頁不動」的一部分——之後是「首頁有精簡 Writings section + `/writings` 分頁（完整列表 + 文章頁）並存」。
>
> 這兩件可在同一條 `feat/writings-section` branch 接著做完、再一起 merge → production。在那之前 branch 就放著（已 push、有 preview deploy）。**Phase 2–5（配圖/投影片 / 校稿 SOP / Newsletter / 短影片轉文章）排在這之後。**

**重新 frame**（2026-05-10 session 討論結果）：原本只是「文章變可點擊」（A/B/C 選一），升級成「Josh 寫 Obsidian → Claude 校稿 → 直接 push Supabase → 前端 Next.js ISR 讀」的 content pipeline，未來接 Newsletter + 短影片轉文章。

**sub-decisions**
1. ✅ Supabase reuse Daily 已用的 shared instance `srpqvtkliesdfnqirdpt`，加新 `writings` table（不另建 lifeforge 專屬）
2. ✅（主題）/ ⚠️（內容）第一篇 = **「CLAUDE.md 起手模板」**（slug `claude-md-starter`）—— 工具型 / 可帶走 / 呼應 5/12 日更影片（Eugene Yan 第二原則 + Josh 自己的 CLAUDE.md 設置），符合「evergreen anchor、不是 daily 流水」精神。主題定了；**但 AI 改寫的初版內容 Josh 不收（太 AI 味），要親自重寫**。（原寫的「FORGE 五步法 / 為什麼開人生鍛造所 anchor 文」作廢——FORGE 框架還在打磨，見 `~/project/memory/project_lifeforge_forge_hold.md`）
3. ✅ 卡片加日期 / reading time / cover preview —— 目前在 `/writings` 列表頁；首頁重排後也會有一份精簡的在首頁 Writings section（見 #6 的修正）
4. ✅ `/writings` index page —— 已建（含空狀態 fallback）
5. ⚠️ Status 欄位 default `draft` —— 表 default 是 `draft`；第一篇曾短暫設 `published`（為了讓 Josh 能在 preview URL 上 review，因為 draft + RLS 擋 anon），review 後判定內容要重寫 → **已改回 `draft`**。`status` 欄位用途如設計：草稿放著不上線
6. ⚠️ 原拍板「純分頁、首頁不動」（2026-05-12）—— **同日 Josh review 後部分推翻**：首頁還是要加一個精簡的 Writings section，跟「Daily 縮成 1–2 卡」一起做。所以最終是：首頁精簡 Writings section + `/writings` 分頁（完整列表 + 文章頁）並存。`Nav.tsx` / `MobileMenu.tsx` 的「文章」跨頁連結保留（首頁重排時看要不要改成 `#writings` 錨點或兩者都有）

**Phase 1 基礎建設 — 已寫好（branch `feat/writings-section`，待 merge）**
- ✅ Supabase 建 `writings` table（`id / slug / title / excerpt / body_md / cover_image_url / status / published_at / tags(text[]) / reading_time / created_at`）+ RLS（anon 只讀 `published`）+ `writings-assets` bucket（public read）—— 用 Supabase MCP `apply_migration` 跑
- ✅ Next.js `/writings/page.tsx`（列表頁，含空狀態 fallback）+ `/writings/[slug]/page.tsx`（文章頁，`revalidate = 60` ISR + `generateStaticParams` + `generateMetadata` OG，`<article>` 只包文章本體、頂欄 + `<Footer/>` 在外）+ `src/lib/supabase.ts`（`server-only`）+ `src/lib/writings.ts`（`getPublishedWritings` / `getWritingBySlug` 用 React `cache()` + `formatDate` helper）
- ✅ 渲染 `react-markdown` + `remark-gfm` + `rehype-raw` + `rehype-sanitize`（raw 解析 → sanitize 白名單過濾；允許 `<audio>` / `<source>` / `<iframe>` 給 Phase 2）+ `.article-prose` 排版（`globals.css`，暖棕 editorial；**改用自寫 prose CSS 不用 `@tailwindcss/typography`**——要 override 的太多）；`pre` 用 `pre-wrap` 讓 code block 在窄螢幕 wrap
- ✅ `Nav.tsx` + `MobileMenu.tsx` 加「文章」→ `/writings` 跨頁連結（href 開頭 `/` 用 next/link、`#` 用 `<a>`）；MobileMenu 順手拿掉多餘的 `mounted` flag（修掉舊 lint #12）
- ⚠️ 第一篇「CLAUDE.md 起手模板」row 在 Supabase 但 `status = 'draft'`（內容 Josh 要重寫，見 sub-decision 2/5）
- ✅ preview 環境 env var 已設（`SUPABASE_URL` / `SUPABASE_ANON_KEY`，branch-scoped 到 `feat/writings-section`；想 all-preview-branches 要 dashboard——見 🟢#10）

**下一步（待 Josh）**
- Josh 親寫第一篇「CLAUDE.md 起手模板」→ 給 Claude → `UPDATE` Supabase `writings` row 的 `body_md`（+ `title`/`excerpt`/`reading_time` 視情況）+ 翻 `published`
- 首頁重排：`Daily.tsx` 縮成 1–2 張影片卡片 + 加一個精簡的首頁 Writings section（near Daily）——可在同 `feat/writings-section` branch 接著做（會動到 `page.tsx` / 可能 `SectionIndex.tsx` / section 編號）
- 兩件都好 → 開 PR / squash merge → production deploy → curl 驗第一篇 live

**Phase 2 — 配圖 + 投影片素材**
- Obsidian paste 圖 → vault `attachments/` → Claude upload 到 Supabase Storage `writings-assets/<slug>/` + markdown body URL rewrite
- NotebookLM 投影片：截圖路線（不依賴 iframe — 穩定性 + 手機友善）+ 文末附 share link
- audio overview（NotebookLM podcast）：mp3 上 Storage + markdown `<audio>` HTML（rehype-raw 渲染）

**Phase 3 — Claude 校稿 collaboration**
- Josh Obsidian `80-blogpost/` 子資料夾寫初稿（PARA-ish 編號）
- 跟 Claude 說「校稿這篇」→ 讀 markdown 改 typo / 排版 / tone 對齊 BRAND / opening hook 建議
- Josh 拍板每條建議 → Claude 用 Supabase MCP push（含 markdown body + cover upload + Storage rewrite）

**Phase 4 — Newsletter**
- Stack: Resend Audiences（既有 Resend account / API key 直接接，不新註冊 Buttondown / ConvertKit）
- 訂閱框上 Hero / Footer 拉前（zero 成本，先有訪客留 email）
- 新文 publish trigger 寄信 list（手動或 webhook 自動）
- 升級 TODO 🟡 #5 進這

**Phase 5（未來）— 短影片 → 文章**
- IG Reel transcript → AI 擴寫 → Josh 校稿 → publish
- 借鏡 Windows 機 ccdailytalk 工作室既有 pipeline

**SoT 修正**
- ✅ CLAUDE.md「Database」段已改成 Supabase runtime data（Phase 1 上線時一併更新；舊的「build-time markdown sync」說法已刪）
- ✅ 此 TODO 5/8 提的「contents 表加 slug / url 欄位」過時 → 已改新建獨立 `public.writings` 表（`contents` 表沒動）

**Funnel framing**：日更短影片（top）→ 月文章（mid）→ 季 anchor 文 + Newsletter（bottom）→ 諮詢 / 報名 / 付費轉化。Phase 1 是 funnel 中段缺的 mid 層 step change，不是 small fix。

來源：2026-05-10 session 討論（Josh 提 Supabase 路徑反推 → Claude 修正 4 phase plan + 5 sub-decisions 拍板）

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

### 4. FORGE 框架展開說明 — ⏸ 暫緩（框架重打磨中）

**狀態（2026-05-12）**：FORGE 五步法**暫不上線**。Josh 認為 F/O/R/G/E 為拼「人生鍛造所」太硬湊，框架本身在重新打磨中，打磨完才會重新放上網站。**此重打磨由 Win + M1 端處理，M5 這台不碰。** 在那之前 `About.tsx` 裡刻意沒有 FORGE callout——deliberate hold，不是疏漏，不要去補。

~~FORGE 是你品牌核心 IP，目前只在 About 有一行 callout，太可惜。可以視覺化 5 個字母代表什麼。~~（待框架打磨完後再回來決定怎麼呈現）

來源：智囊團審核 #J → 2026-05-12 Josh 確認 hold

### 5. Newsletter 訂閱框
給「觀望型」訪客（還沒準備諮詢但想追蹤你）一個門檻低的入口。現在門檻太高（Gmail / Calendly 二選一）。

來源：智囊團審核 #D
要 Josh 決定：
- 要做嗎？
- 要的話選哪家？**Buttondown** 最簡單、**ConvertKit** 功能多

### 6. 找更好的標題字體（取代思源宋）
你之前說「思源宋有點氾濫」park 起來。候選可以去 justfont / 文鼎 / Adobe Fonts 看商用付費字體，或試其他 Google Fonts 開源字體。

Parked: 2026-04-23

### 7. FORGE callout 副標重寫 — ⏸ 暫緩（FORGE 框架重打磨中，見 #4）
2026-04-25 BRAND 重新定位後 FORGE callout 文字本是 placeholder，但 2026-05-12 起 FORGE 五步法暫不上線（框架重打磨中、Win/M1 端處理，見 #4），所以副標重寫一併暫緩——等框架打磨完、確定要不要 / 怎麼把 FORGE 放回 About 再回來處理。

（原內容存查）位置：`src/components/About.tsx` FORGE callout 第 2 個 `<p>`；要 Josh 寫 FORGE 五步法的一句話副標；來源：2026-04-25 morning-flow 五元素定錨討論；參照：BRAND.md「FORGE callout」段

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

### 10. Vercel Preview 環境變數（Writings Phase 1 上線後變相關）
目前只有 **Production** 設了 `SUPABASE_URL` / `SUPABASE_ANON_KEY`；**Preview 沒設** → 任何 preview deploy 的 `/writings` 列表頁是空狀態、`/writings/[slug]` 是 404（`src/lib/supabase.ts` env 未設回 null）。

要在 preview URL 上 review 文章，Josh 需在 Vercel dashboard → Settings → Environment Variables 給 **Preview** 環境加這兩個（值同 production / 本地 `.env.local`：`SUPABASE_URL = https://srpqvtkliesdfnqirdpt.supabase.co`、`SUPABASE_ANON_KEY = <anon key>`）。anon key 是 public-by-design（RLS 才是保護層），不算敏感。

替代方案：不設 preview env var，改靠本地 `npm run dev` 截圖 review，OK 後直接 squash merge 進 main（production 有設，merge 後就 live）。

### 11. Services section `<article>` 語意
審核提到每個服務項目用 `<article>` 語意不精確（article = 可獨立分發的內容）。可以在下次重構時改成 `<li>` in `<ol>` 或 `<div>`。低優先。
（Writings `/writings/[slug]` 也曾有類似問題——`<article>` 包了頂部導覽列 + `<Footer/>`——已在 2026-05-12 重構掉，`<article>` 現在只包標題→內文→文末導覽，頂欄 + `<Footer/>` 移到外面。Services 這個還沒處理。）

### 12. 動工機路徑寫死
CLAUDE.md「Related repos」段把 ccdailytalk / remotion 寫成 `D:/...` Windows 路徑。M5 (Mac) 已是 lifeforge 動工機（多個 commit 證實）。已在 CLAUDE.md 加註，但長期看路徑寫死太脆，未來第三台或團隊接手要重整。

低優先——不影響開發。

來源：2026-05-08 加 toolbar 時掃 CLAUDE.md 發現

---

## ✅ 今天完成（2026-05-12）

**Writings Phase 1 基礎建設**（原 🔴 #1 的 Phase 1）—— branch `feat/writings-section`，**尚未 merge**（merge 卡在第一篇內容要 Josh 重寫 + 首頁要重排，見 #12）。

1. **Supabase**（shared instance `srpqvtkliesdfnqirdpt`，用 MCP `apply_migration` 跑）—— 建 `public.writings` 表（schema 見上）+ RLS（anon 只讀 `published`）+ `writings-assets` Storage bucket（public read，Phase 2 才用）；INSERT 第一篇文章
2. **依賴 + lib** —— 加 `@supabase/supabase-js` / `react-markdown` / `remark-gfm` / `rehype-raw` / `rehype-sanitize` / `server-only`；`src/lib/supabase.ts`（read-only client，`server-only`，env 未設回 null）+ `src/lib/writings.ts`（`getPublishedWritings` / `getWritingBySlug`，React `cache()` 包；`formatDate` helper）；`next.config.ts` 加 Supabase Storage `images.remotePatterns`
3. **路由** —— `src/app/writings/page.tsx`（列表頁，編號/日期/reading time/excerpt/封面預覽 + 空狀態 fallback）+ `src/app/writings/[slug]/page.tsx`（文章頁，`revalidate = 60` ISR + `generateStaticParams` + `generateMetadata` OG + `notFound()`）；都不掛 `<Nav>`、用自己的極簡 header + `<Footer>`（同 `/fonts` pattern）
4. **排版** —— `globals.css` 加 `.article-prose` class（暖棕 editorial：serif 標題 + hairline 分隔 + 磚紅連結 + 暗底 code block + `pre-wrap` 讓窄螢幕 wrap），刻意不用 `@tailwindcss/typography`
5. **Nav** —— `Nav.tsx` + `MobileMenu.tsx` 加「文章」→ `/writings` 跨頁連結（`<Link>`；render 時 `/` 開頭用 next/link、`#` 開頭用一般 `<a>`）
6. **第一篇（初版，已退回）** —— 「CLAUDE.md 起手模板」（slug `claude-md-starter`）：把 `~/project/claude-md-starter-template.md`（去識別化的 CLAUDE.md 模板）改寫成文章——加開頭故事段（兩三週長出來 + 跟 Eugene Yan 的 behavior 區塊撞了好幾條 + 為什麼出公開版）、調 tone、INSERT 進 Supabase 設 `published`。**→ Josh review 後判定「100% AI 味」、要親自重寫，那筆 row 已改回 `draft`（見 #12）**
7. **驗證** —— 本地 `npm run dev` + Playwright 截圖驗（列表頁 + 文章頁，desktop + mobile，console clean，404 處理）+ `tsc --noEmit` pass + `next build` pass（`/writings/claude-md-starter` 顯示為 SSG + ISR 1m）
8. **智囊團審核 + 修** —— Claude + Codex + Gemini 三方審查後套用 fixes：`import "server-only"` 進 lib 兩檔、`getWritingBySlug`/`getPublishedWritings` 用 React `cache()` 去重 round-trip、`formatDate` 抽進 `writings.ts`（原本兩頁各 copy）、加 `rehype-sanitize`（在 `rehype-raw` 後白名單過濾）、`.article-prose` 補 `font-family` + `text-wrap: pretty` + iframe `aspect-ratio: 16/9`。**未採納**：Nav link helper 的 protocol-relative-URL 防護（`navLinks` 是 hardcoded 常數非使用者輸入）。三方一致「可直接上線」，RLS-disabled 舊表那條（`contents`/`ig_posts` 等 anon 全曝光）是 pre-existing 問題、需 Josh 決定存取策略後另開 session 補
9. **第二輪審核（Josh 另一個 session）+ 修** —— 套用：`/writings/[slug]` 的 `<article>` 重構（把頂部導覽列 + `<Footer/>` 移出 `<article>`，`<article>` 只包標題→內文→文末導覽——TODO 🟢#11 同類問題，Services 那個還沒處理）、`getPublishedWritings` 的 `.order` 加 `nullsFirst: false`（防 published_at=null 排到最上面）、文章 OG image 沒專屬封面時 fallback 到 `/og-image.jpg`、**MobileMenu 拿掉多餘的 `mounted` flag**（Portal 只在 open 時 render、open 一定是 client 端按漢堡後才 true → `mounted` 是多餘的；順帶**修掉 TODO 🟢#12 的 `react-hooks/set-state-in-effect` lint error**）、`sanitizeSchema` 註解補上「Phase 2 真放 iframe 時除協定限制外還要做 domain allowlist」的提醒。**延後**：iframe domain allowlist（schema.protocols 做不到，Phase 2 真有 iframe 內容再在那層或 CSP 擋）
10. **環境 / 部署** —— Vercel CLI `vercel link` 連專案；`SUPABASE_URL` / `SUPABASE_ANON_KEY` 加到 **Preview** 環境（scope 綁 `feat/writings-section`——CLI agent 模式做不到「all preview branches」，想一勞永逸要 dashboard 勾）；push `feat/writings-section` → preview deploy（build log 確認 `/writings/claude-md-starter` 有 pre-render = env vars 有吃到）→ 等 Josh 在 preview URL 線上驗
11. **文件** —— 更新 CLAUDE.md「Database」段 + Project 段 + Content status 段；更新 TODO #1 + #10 + #11（Writings `<article>` 已修，Services 待）+ 刪掉 #12 舊的 lint TODO（已修）；刪掉 `WRITINGS-PHASE1-HANDOFF.md` 交接檔
12. **Josh review → 改方向（收工狀態）** —— Josh 在 preview 上看 → (a) 第一篇內容判定「100% AI 味」、要親自重寫一版 → 那筆 `writings` row 已 `UPDATE ... SET status = 'draft'`（infra 在 / Josh 版本 ready 後換 `body_md` + 翻 `published`）；(b) Josh 覺得首頁 Daily 區塊太長 → 想縮成 1–2 張影片卡片、並在那附近加一個精簡的**首頁 Writings section**（部分推翻 sub-decision #6 的「首頁不動」）。這兩件「等下次」做，可在同 `feat/writings-section` branch 接著做完再一起 merge。**這次先收工：branch 不 merge、不開 PR、就放著**（已 push、preview deploy 在、preview env var 在）。CLAUDE.md「Database」段 + 上面 #1 已記成「基礎建設寫好、待 merge」狀態

**驗證 trail**：tsc + lint（**全 pass**——MobileMenu #12 lint error 這次一併修掉）→ `next build` pass（中間重跑過一次，Google Fonts fetch 偶發失敗、`rm -rf .next` 後重建 pass）→ 本地 Playwright e2e（desktop + mobile，含兩輪審核 fixes 後各重驗一次）→ 智囊團多模型審核 + Josh 另一 session 審核 + 修 → push branch + preview deploy → **（待）Josh 在 preview URL 線上驗** → 開 PR / squash merge → production deploy → curl 驗第一篇 live

**已知遺留**：(a) preview env var 已設但 scope 綁 `feat/writings-section`（想 all-preview-branches 要 dashboard）；(b) 404 用 Next 預設頁（沒做暖棕主題的 `not-found.tsx`，那是 TODO 🟢#8 範圍）；(c) 封面預覽 code path 沒視覺驗（第一篇沒封面）；(d) Services section 的 `<article>` 語意還沒修（TODO 🟢#11）；(e) `~/project/claude-md-starter-template.md` 草稿檔留著（Josh 的檔，之後可清）

---

## ✅ 今天完成（2026-05-09）

Contact section 從 mailto 升級成結構化諮詢表單（原 🔴 #3 完成）。Branch `feat/contact-form` 6 個 commit 走完，PR #11 squash merge 進 main，production deploy 上線（curl 驗 placeholder「張小姐」live）。

1. **`81015bc`** feat(contact): structured inquiry form with Resend + honeypot —— Server Action + ContactForm（client）+ Contact 整合，3 fields + honeypot + zod validate + Resend send，editorial 米色框 + 磚紅 accent，4 service radio 對齊 Services 01-04 順序
2. **`983b39a`** docs(todo): record 5/8 contact form spec carry-over
3. **`a5a867f`** fix(contact): use Resend verified email as form recipient —— Resend free tier sandbox 限制 to 必須是 account verified email；Josh 用 bonkerser 註冊 → to 改 bonkerser；**公開 mailto 仍是 joshailearing0916（公開門面 vs 內部信箱分離）**
4. **`7ebc96d`** feat(contact): add required name field —— Josh feedback「訪客忘了寫名字回信會尷尬」→ 必填「你怎麼稱呼」欄位 + email subject 帶稱呼
5. **`4fe0f4e`** + **`0685b96`** style(contact): name placeholder 兩輪微調 —— 「Josh、小華、都可以」→「Tom、張先生、小楊...都行」（網站主人名字當範例會 confused）→「Tom、張小姐、小楊...都行」（性別範例 balance）

**驗證 trail**：本地 `npm run dev` Playwright e2e 一次 → push preview 線上 e2e 一次 → Josh production 親手驗 → squash merge → production curl 驗 「張小姐」 live

**前置（Josh 親做）**：Resend 註冊（bonkerser）+ Vercel env var `RESEND_API_KEY` 設 Production + Preview（Sensitive var 規則 Development 自動跳過，本地用 `.env.local`）

**附帶處理**：
- 散落 46 張截圖（27 in `~/project/` + 19 in `~/`）清光
- Playwright MCP `--output-dir` 設 `~/.cache/claude-shots/` dotdir，user-scope `~/.claude.json` 記入；下次 session 啟動才生效
- Memory 新增 `tools_playwright_screenshots.md`（cookbook + wrap-up 清理慣例）

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
