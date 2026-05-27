# josh-lifeforge — 待調整清單

> 最近更新：2026-05-16
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

**進度更新（2026-05-16）**：
- Phase 1 infra 已寫進 `feat/writings-section` branch（10+ commits、智囊團三方審核 + 修完、Vercel preview deploy + branch-scoped preview env var 設好）—— branch parked 未 merge
- **卡點 1**：第一篇「100% AI 味」要 Josh 親寫（AI 改寫版被 Josh 終審判定，row status 從 `published` 改回 `draft`）
- **卡點 2**：首頁改造 — Daily 縮短（5/16 早 PR #15 已環形化省 73% ✓）+ 加首頁 Writings section（未做）
- **threshold**：Josh 親寫第一篇 ready + 決定首頁 Writings section 位置 → 再 unpark merge

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

**2026-05-18 update**：04 description 又從 stack-flex (developer voice，「用 AI + Supabase + Next.js 蓋一套真的能跑的系統」) 升級到 customer voice (PR #24 squash merge，「討論需求，幫你打造訂製化的系統」)。01-03 重寫時對齊新 voice 標準：受眾痛點 entry、不堆 stack 名、講客戶能拿到什麼。

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
- 做了之後：`/links`（PR #29）也加一顆「電子報訂閱」按鈕——往 `src/app/links/page.tsx` 的 `links` 陣列加一筆物件即可點亮

### 6. 找更好的標題字體（取代思源宋）
你之前說「思源宋有點氾濫」park 起來。候選可以去 justfont / 文鼎 / Adobe Fonts 看商用付費字體，或試其他 Google Fonts 開源字體。

Parked: 2026-04-23

### 7. FORGE callout 副標重寫 — ⏸ 暫緩（FORGE 框架重打磨中，見 #4）
2026-04-25 BRAND 重新定位後 FORGE callout 文字本是 placeholder，但 2026-05-12 起 FORGE 五步法暫不上線（框架重打磨中、Win/M1 端處理，見 #4），所以副標重寫一併暫緩——等框架打磨完、確定要不要 / 怎麼把 FORGE 放回 About 再回來處理。

（原內容存查）位置：`src/components/About.tsx` FORGE callout 第 2 個 `<p>`；要 Josh 寫 FORGE 五步法的一句話副標；來源：2026-04-25 morning-flow 五元素定錨討論；參照：BRAND.md「FORGE callout」段

### 14. Reveal SSR `opacity:0` → CSS `@starting-style`（LCP 改善）
目前 `src/components/Reveal.tsx` 用 JS state（`useState` + `IntersectionObserver`）做 fade-in，SSR 初始 HTML 全部 `opacity:0`、JS hydrate 後才接管 → FCP/LCP 在 Reveal-wrapped sections 略 slow。

修法：用 CSS `@starting-style`（Tailwind v4 + Next 16 支援）取代 JS state-based Reveal——CSS-only，無 hydration 等待。需要重寫 Reveal API + 影響範圍 verify（About 左 rail / Hero subtitle+CTAs / Services articles / RecentWork cards / Testimonials cards / Contact）。

預估：1-2 小時
來源：2026-05-16 PR #21 智囊團 round 1 review，deferred 為獨立 PR

### 15. About narrative copy 校稿（Josh 親改）
2026-05-16 PR #21 智囊團 round 1 review 由 Codex 發現：
- `src/components/About.tsx` 代名詞「他/它」混用——同段主詞 AI 在不同句換稱謂
- `src/components/About.tsx:59`「不著痕跡的滑過」應為「地」非「的」（助詞）

About 是 Josh 親寫 narrative copy（CLAUDE.md「Content status」標明），AI 不動。要 Josh 親自改。

來源：2026-05-16 PR #21 智囊團 round 1 review（Claude + Codex 同意）

### 16. HyperFrames demo video v0.8 下一步用途決定
v0.8 已 settle 到 22s 5-beat、no VO、customer voice 演示影片（22s / 1.6 MB）。下一步用途有 4 個方向沒拍板：
- **A**：社群 preview（30-60s 短版，FB/Threads/IG 連結預覽 / OpenGraph video）
- **C**：邀約 pitch（90s 長版，給講座 / 工作坊 / 諮詢邀約方）
- **嵌 hero**：lifeforge 首頁 Hero section 內嵌 muted autoplay loop（取代 hero 靜態圖 / 配合 hero-loop 設計）
- **Skill 範例**：lifeforge-skills repo 的 hyperframes / video 類 skill 範例素材

要 Josh 決定的：
- 4 個方向哪個（或哪幾個）先做？
- 嵌 hero 要不要做 9:16 mobile 版？
- A/C 方向上 social 平台要不要做平台適配（IG 1:1 / FB 16:9 / Threads 文字+影片）？

延伸：影響 [[reference_skill_backlog]] D 條目 (M5 audio-first video skill) — 5/14 dev-log 設計 Remotion-based audio-first，5/18 dogfood HyperFrames 確認 no-VO 純動畫對 lifeforge demo 的 fit 度高，是否要 reframe skill 為「audio-optional video」？等用途拍板後 settle。

來源：2026-05-18 HyperFrames dogfood + lifeforge demo v0.8 build
參照：`~/project/dev-logs/2026-05-18-josh-lifeforge-hyperframes-demo-and-services-copy-review.md`

---

## 🟢 錦上添花 / 標準件

### 9. 剩餘照片利用
目前用了 3 張，還有 8 張沒用：
- `workshop-n8n-1/2/4/5.jpg` — n8n workshop 其他角度
- `talk-ai-forum-group.jpg` — 為未來 AI 分享會團體
- `talk-ai-forum-solo.jpg` — 已用於 About
- `talk-neuroplasticity-group.jpg` — 神經可塑性團體

之後可做「活動詳情頁」(`/work/[slug]`)，點卡片進入看更多照片 + 詳細描述。

### 11. Services section `<article>` 語意
審核提到每個服務項目用 `<article>` 語意不精確（article = 可獨立分發的內容）。可以在下次重構時改成 `<li>` in `<ol>` 或 `<div>`。低優先。
（Writings `/writings/[slug]` 也曾有類似問題——`<article>` 包了頂部導覽列 + `<Footer/>`——已在 2026-05-12 重構掉，`<article>` 現在只包標題→內文→文末導覽，頂欄 + `<Footer/>` 移到外面。Services 這個還沒處理。）

### 13. 動工機路徑寫死
CLAUDE.md「Related repos」段把 ccdailytalk / remotion 寫成 `D:/...` Windows 路徑。M5 (Mac) 已是 lifeforge 動工機（多個 commit 證實）。已在 CLAUDE.md 加註，但長期看路徑寫死太脆，未來第三台或團隊接手要重整。

低優先——不影響開發。

來源：2026-05-08 加 toolbar 時掃 CLAUDE.md 發現

---

## ✅ 今天完成（2026-05-23）

PR #29 (`feat/links-page`)：新增 `/links` linktree 落地頁——給 IG/FB bio 放單一連結用，訪客點進來直接挑想去的地方、不必滑完主站長頁。**開立 + preview 驗收完成，待 Josh merge 到 main**（上線後正式網址 `josh0916.com/links`，那個才是貼 bio 用的）。

- 3 commits：`7f28efa` feat 基礎頁面（data-driven 連結：預約聊聊 / YouTube / IG / Threads / Email，全真連結零死連結）+ `a29a542` duotone banner + paper-grain 材質 + 暖光暈 + 卡片陰影 + `16fb2b6` fix 色調（膚色修正）
- 內容決策：**精實派**——只放現有真連結；電子報 / Skill 專區 / Blog 等 roadmap 項目不放佔位按鈕（避免死連結），做好一個往 `links` 陣列加一筆即可點亮
- 設計：沿用 warm brown editorial，頂部 `hero.jpg` 暖調 banner + 紙感 + 暖光暈 + 卡片陰影；`my-auto` safe-centering
- 踩雷：人臉照片重度單色 duotone → 膚色詭異，改輕暖調（詳見 CLAUDE.md Design notes `/links` 條）
- 待 Josh 決定：merge 時機（現在上線 / 之後色調再調一起）；可調旋鈕＝色調暖度 / banner 裁切 / 預約排序

---

## ✅ 今天完成（2026-05-16 PM）

PR #21 + PR #22 兩條 branch 收尾「post-#20 review backlog」——智囊團跑三輪、修十條、合計 8 commits / 24 檔案動到。

### PR #21 (`fix/review-pr16-20-followups` → squash `3e43860`)：5 commits / 14 檔案
智囊團 round 1 + round 2：
1. `5262996` **fix(a11y)** — MobileMenu rAF wrap setMounted（修 ✅ 原 #12 lint）+ focus trap + 背景 inert + ContactForm aria-invalid/aria-describedby + radio focus-visible + Testimonials `<cite>` → `<figcaption>`（HTML spec）+ HairlineLine decorative aria-hidden
2. `cce5576` **fix(hero,about)** — HeroTitle 移除 `whitespace-nowrap` + `text-balance`（320px 防溢出）/ Hero 補 Reveal 包 paragraph + CTAs（delay 750/1000ms 對齊 HeroTitle stagger）/ 拿掉 About 整塊 Reveal wrapper（長文 fade 影響閱讀）/ Hero footer hyphen → em dash
3. `e8db2d9` **chore** — Noto Sans TC + Huninn 字型從 root html 移到 `/fonts/page` scope（省 ~50-100KB 主站 preload）+ globals.css reduced-motion 註解修正不再宣稱 cover DayCounter
4. `72f3f65` **fix(a11y) round-2**（智囊團 catch 我修法的 bug）— MobileMenu inert target 改 `main, footer` 不全 body children（避免把 nav 內 trigger button 一起 inert 導致 keyboard 進 dialog 後 click 不到 X）+ filter 既有 inert 元素避免 cleanup 誤移除 / ContactForm radio aria-describedby 加在個別 input（不只 fieldset）/ Testimonials separator `{" · "}` 包 aria-hidden span
5. `ced2f96` **fix(nav)** — mobile narrow viewport bug：commit `e71e212` (5/14) logo 64→96px 後沒同步 `hidden sm:flex` → mobile 只剩無名 logo + 漢堡，Josh 截圖回報。修：logo `h-12` mobile / `h-24` sm+，「人生鍛造所」永遠 visible，「The Life Forge」副標仍 sm+ 才顯示

### PR #22 (`chore/layout-seo-a11y-followups` → squash `63a67cb`)：3 commits / 10 檔案
Josh 選「2+3」layout 殘餘 + SEO 收尾，智囊團 round 3（0 必修符合 prediction + 3 polish）：
1. `2a2caa7` **fix(layout)** — 全 section header 補 `md:grid-cols-12 md:col-span-4/8`（tablet 768-1023px 不再退單欄）/ RecentWork cards `md:grid-cols-3` / Hero `min-h-[88vh]` → `min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-7rem)]`（short laptop 不擠壓 CTAs）/ About 補 partial Reveal 只裹 left rail（長文 narrative 不裹）/ 「預約 1:1 諮詢」「預約 1:1」 統一為「預約 1 對 1 諮詢」「預約 1 對 1」
2. `00e80a1` **feat(seo)** — `src/app/robots.ts`（allow + disallow `/fonts`）+ `src/app/sitemap.ts`（單一 `/`）+ `src/app/not-found.tsx`（warm-brown editorial 風格 404，不是 Next 預設）—— ✅ 收掉原 #8 SEO 標準件
3. `f37195a` **fix round-3**（智囊團 round 3 polish）— sitemap.ts 拿掉 `lastModified`（防 Google 看到頻繁跳動長期忽略）+ Hero svh 加 `100vh` fallback（Safari < 15.4 防呆，cascade 寫法）+ `fonts/page.tsx:76` `buttonLabel` + `layout.tsx:43` SEO description 漏網「1:1」字串統一

### 附帶閉環
- ✅ 原 #8 SEO 標準件（robots/sitemap/404 全做）
- ✅ 原 #12 MobileMenu lint error（rAF wrap setMounted）

### 智囊團 review 紀律（三輪 brief 一致）
每輪 spawn 附「上輪結論摘要避免重複」+「主對話已 self-verify 不報」+「800 字內、質>量、無新發現直說」—— round 3 真有兩模型「無新發現」直說沒湊數，brief 起作用。

### Deferred（PR description 標明，等 Josh 拍板）
- `#15` About narrative 代名詞「他/它」混用 + 「不著痕跡的滑過」助詞 → 上面 🟡 區，要 Josh 親改
- `#14` Reveal SSR `opacity:0` → CSS `@starting-style` LCP 改善 → 上面 🟡 區，獨立 PR
- About 補 Reveal 視覺一致性 — 智囊團 round 2 提，已選擇「只裹 left rail，長 narrative 不裹」折衷做法
- Hero `dvh` vs `svh` — 智囊團 round 3 分歧（風格取捨），維持 svh（無 reflow）

### 沉澱 → dev-log
- 📝 `~/project/dev-logs/2026-05-16-josh-lifeforge-multi-round-review-and-fix-surface-area.md`
- **萃出 P35**：fix 自帶 surface area，修完要 re-review（B1 inert scope wrong / B2 aria-invalid on radio lint flag / B3 self-verify viewport single-point sample / B4 single-pass 兩 concern 沒分開 verify ── 4 instance 同源同 session）
- 新 E1-E2 josh-lifeforge sub-thread reset（Josh 把 review ROI 評估外推給 AI / Mobile narrow viewport 手動測補 Playwright 盲點）

---

## ✅ 今天完成（2026-05-16 AM）

7 個 PR 一條 session 連發、全 merge 進 main：homepage 連環瘦身 + scroll-reveal 動畫。累積首頁省 2400px+ scroll。

1. **`#14`** `docs` — 字體 docs drift（CLAUDE.md Design system 段過時：寫 Newsreader + Outfit，實際 v0.5 是 Noto Serif TC + LXGW WenKai TC + Outfit）
2. **`#15`** `feat(daily)` — 環形 day counter SVG + IntersectionObserver + rAF count-up（1.8s easeOutCubic）+ 每小時 ISR 刷新；4 篇 IG reel 卡片改成 1 個環形 counter，**省 73% 高度**
3. **`#16`** `feat(recentwork)` — 3-column grid 取代 editorial stack，省 24%
4. **`#17`** `feat(homepage)` — eyebrow 加「est. 2026」/ drop SectionIndex（sticky Nav 已 cover navigation 需求）/ Testimonials ↔ RecentWork 對調（trust block 從客觀→主觀遞進）
5. **`#18`** `feat(homepage)` — Testimonials 2x2 grid + Services layout 收緊（padding/spacing/leading；description 字數不動，由 Josh 親寫）
6. **`#19`** `fix(logo)` — logo PNG asset 收尾：transparent alpha + 1.5x + crop wordmark（y_end iterate 4 次定案 726；row density alpha profile 找 graphic↔wordmark anti-alias overlap zone）
7. **`#20`** `feat(homepage)` — scroll-reveal animations A/B/C set：Reveal client wrapper（IntersectionObserver-triggered fade-up / fade-scale variant）+ HeroTitle mount-triggered 三行 stagger + HairlineLine scaleX(0→1) draw-in；reduced-motion 用 globals.css 全域 `@media` zero transition duration（避開 per-component JS 偵測）

### 沉澱 → dev-log
- 📝 `~/project/dev-logs/2026-05-16-josh-lifeforge-homepage-trim-and-animations.md`
- **萃出 P33-P34**：funnel-role 投資判斷（editorial cadence 對 trust signal section 是 over-investment、對 conversion section 是必要）/ layout 動 vs copy 動嚴格分離（AI 動 layout、brand voice copy 不碰）

---

## ✅ 今天完成（2026-05-12，部分閉環）

- ✅ 原 #10 Vercel Preview 環境變數 — Writings Phase 1 deploy 時設好 `feat/writings-section` branch-scoped preview env var（SUPABASE_URL / SUPABASE_ANON_KEY），preview deploy 能 read writings table
- 📦 Writings Phase 1 infra 寫完進 `feat/writings-section` branch（智囊團三方審核 + 修完、push + Vercel preview deploy 上線）—— **branch parked 未 merge，狀態見上方 #1 「進度更新」段**

### 沉澱 → dev-log
- 📝 `~/project/dev-logs/2026-05-12-josh-lifeforge-writings-phase1.md`（萃出 P27-P28：AI 改寫=注入 AI 味 / 架構決策看實物後 revise）

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
