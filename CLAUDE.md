# CLAUDE.md — josh-lifeforge

## Project
Josh's personal brand website — **人生鍛造所 (Lifeforge Studio)**.
Single-page homepage (sections 01–07) + a `/writings` article section. For workshops, 1:1 consulting, speaking, writings, and recent work.

Audience: students + prospective clients. Goal: clarify who Josh is and convert curious visitors into conversations.

## Tech stack
- **Next.js 16** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS v4** (via `@theme` block in `globals.css`, no `tailwind.config.*`)
- **Fonts** (locked v0.5): Noto Serif TC (display, 思源宋) + LXGW WenKai TC (body, 霞鶩文楷) + Outfit (Latin UI labels) — all via `next/font/google`
- **Deployment**: Vercel (preview = branch URL, production = main)
- **Database**: 只有 Writings 區塊讀 Supabase（read-only, server-side）；其餘區塊內容 hardcoded 在 component 中
  - Testimonials / Recent Work / Services / Hero / About / Daily 等區塊：人工挑選 → hardcode（Daily 的 IG reels 縮圖開發時用 Supabase MCP 撈 `ig_posts` 後下載到 `public/photos/writings/`，網站不直接連）
  - **Writings — Phase 1 基礎建設已寫好（branch `feat/writings-section`，2026-05-12，**尚未 merge / 未上線**）**：流程是 Josh 寫 Obsidian `80-blogpost/<slug>.md` → 跟 Claude 校稿 → Claude 用 Supabase MCP（`apply_migration` / `execute_sql`）把 markdown push 到 shared instance `srpqvtkliesdfnqirdpt` 的 `public.writings` 表 → 前端 ISR 讀。**不走 build-time sync / markdown-in-repo / MDX**（Supabase runtime 對 non-coder 摩擦最低 + Claude 校稿/push 直接用 MCP）
    - **merge 卡在兩件事（2026-05-12 Josh review 後）**：(1) 第一篇「CLAUDE.md 起手模板」目前的 `body_md` 是 AI 改寫版 —— Josh 判定「100% AI 味」、要親自重寫一版（所以那筆已改回 `status = 'draft'`，Josh 版本 ready 後 `UPDATE` 該 row + 翻回 `published`）；(2) Josh 想順便重排首頁 —— Daily 區塊太長、想縮成 1–2 張影片卡片，並在那附近加一個首頁 Writings section（**這推翻了下面 TODO 🔴#1 sub-decision #6「純分頁、首頁不動」的一部分**）。這兩件「等下次」做，可在同 branch 接著做完再 merge。在那之前 `feat/writings-section` 就放著（已 push、有 preview deploy）
    - `writings` schema：`id / slug(unique) / title / excerpt / body_md / cover_image_url / status('draft'|'published') / published_at / tags(text[]) / reading_time(int) / created_at`；RLS：anon 只能讀 `status='published'`（草稿對外不可見）。Storage bucket `writings-assets`（public read）Phase 2 才用（配圖 / 投影片截圖 / mp3）
    - 前端：`src/lib/supabase.ts`（read-only client，`import "server-only"`，env 未設回 null → 列表頁/文章頁優雅 fallback 空狀態 / notFound）、`src/lib/writings.ts`（`getPublishedWritings` / `getWritingBySlug`，都用 React `cache()` 包；含 `formatDate` helper）、`src/app/writings/page.tsx` 列表頁 + `src/app/writings/[slug]/page.tsx` 文章頁（都 `revalidate = 60` ISR，`[slug]` 有 `generateStaticParams` + `generateMetadata` OG），渲染 `react-markdown` + `remark-gfm` + `rehype-raw` + `rehype-sanitize`（順序：raw 解析 HTML → sanitize 用 `defaultSchema` + 白名單 `<audio>`/`<source>`/`<iframe>` 過濾；`body_md` 雖只來自 Supabase / RLS-gated MCP 寫入，多一層 defense-in-depth），排版用 `globals.css` 的 `.article-prose` class（暖棕 editorial，刻意不用 `@tailwindcss/typography`；`pre` 用 `pre-wrap` 讓窄螢幕 wrap）。`/writings` pages **不掛 `<Nav>`**（首頁錨點在那裡不存在）→ 自己的極簡 header（← 回首頁 / ← 回文章列表）+ 完整 `<Footer>`，同 `/fonts` pattern；`Nav.tsx` / `MobileMenu.tsx` 加了「文章」→ `/writings` 跨頁連結（`<Link>`，href 開頭 `/` vs `#` 區分 render）
    - env var：`SUPABASE_URL` / `SUPABASE_ANON_KEY`（server-side，**無** `NEXT_PUBLIC_` 前綴）。production 已設；**preview 環境沒設 → preview deploy 的 Writings 會 fallback 到空狀態**（要展示需在 Vercel dashboard 補 preview env var，見 TODO 🟢#10）；本地用 `.env.local`。新依賴：`@supabase/supabase-js` / `react-markdown` / `remark-gfm` / `rehype-raw` / `rehype-sanitize` / `server-only`；`next.config.ts` 加了 `images.remotePatterns` 指向 Supabase Storage（Phase 2 封面用）
    - 後續 phase（Phase 2 配圖/投影片 / Phase 3 校稿協作 SOP / Phase 4 Newsletter / Phase 5 短影片轉文章）見 TODO.md 🔴 #1

## Design system (Warm brown editorial)

Defined in `src/app/globals.css` via `@theme` (Tailwind v4):

- **Colors**: oklch-based, warm brown palette
  - `--color-bg` light cream / `--color-fg` ink brown / `--color-accent` chocolate
  - All UI colors must come from these tokens — no rogue hex values
- **Typography**: `--font-display` (Newsreader, serif italic) for headlines, `--font-sans` (Outfit) for body
- **Radii**: small (2/6/10px) — editorial restraint, not soft consumer
- **Component classes**: `.section`, `.container-narrow`, `.eyebrow`, `.btn`, `.btn-primary`, `.btn-ghost`, `.link-underline`

## Design rules (from `.claude/skills/web-design-engineer/`)
This project uses the **web-design-engineer** skill globally installed at `~/.claude/skills/`. When editing visuals, follow:

- **No** Inter / Roboto / Arial / Fraunces / system-ui as primary fonts
- **No** purple-pink-blue gradients
- **No** left-border accent cards
- **No** emoji as icon substitutes — use `[icon]` placeholder text or simple geometry
- **No** fabricated stats / fake testimonials / dummy logo walls
- **No** filler content — use placeholders (e.g. `[email placeholder — need real address]`)
- **All colors come from `@theme` tokens** — derive variants in oklch, never invent new hues
- Use `text-wrap: pretty` for body copy
- Pre-delivery checklist: console clean, all states (hover/focus/disabled), responsive verified

## Component structure
```
src/
├── app/
│   ├── layout.tsx          # Noto Serif TC + LXGW WenKai TC + Outfit fonts, metadata
│   ├── page.tsx            # Composes all sections in 01–07 order
│   └── globals.css         # @theme tokens + .section/.btn/.link-underline classes
└── components/
    ├── Nav.tsx             # Sticky top nav，desktop 橫式選單 + mobile 漢堡 trigger
    ├── MobileMenu.tsx      # client component，用 React Portal 渲染到 body 避開 Nav backdrop-blur 造成的 stacking 限制
    ├── Hero.tsx            # Section 01 — headline + CTAs
    ├── SectionIndex.tsx    # navigation aid 在 Hero/About 之間（不算 01-07 內容 section）— editorial TOC 含 hook 描述
    ├── About.tsx           # Section 02 — Josh 的故事
    ├── Services.tsx        # Section 03 — workshops / 1:1 / speaking / Build With Me（04 客製化開發含 doris/tibonus proof cases）
    ├── Testimonials.tsx    # Section 04 — 學員見證（hardcoded：Du / Tammy / Kin / 大大）
    ├── RecentWork.tsx      # Section 05 — 近期作品（hardcoded：n8n / AI 自動化進入文件驅動的時代 / 神經可塑性說書專場）
    ├── Daily.tsx           # Section 06 — 日更短影片（hardcoded 4 則 IG reels + 縮圖）
    ├── Contact.tsx         # Section 07 — Email + Calendly
    └── Footer.tsx          # Connect (Threads/IG/YouTube) + reach out + copyright
```

**Section 編號規則**：每個 content section 左欄顯示兩位數編號（01–07）。新增 content section 時整體重編，編號必須連續、不得跳號或重複。**SectionIndex.tsx 例外**——它是 navigation aid 不是 content section，不佔 01-07 編號（避免破壞既有規則時整體重編所有 section markers）。

## Editorial tone
- Headlines: serif italic accents on key concept words (e.g. "*第二曲線*", "*跟 AI 對話建出系統*")
- Number labels: `01`, `02`, `03` (1-indexed, mono font, tabular-nums)
- Hairline rules between sections instead of heavy dividers
- Generous whitespace — content density is low on purpose

## Design notes（過往決策）

- **SectionIndex 不歸 01-07 編號** — 它是 Hero/About 之間的 navigation aid（editorial TOC + hook 描述），不是 content section。原因：避免每加一個 nav aid 就要重編所有 content section markers。
- **Services 04「Build With Me」用 inline `proof.cases` 而不是另開 Portfolio section** — 因為 doris/tibonus 客戶授權還沒拿，先匿名（「某會計事務所」/「某食品代理商」）嵌在 service description 內。等授權拿到後可升級到獨立 Builds section + 截圖。
- **Vercel Toolbar 用 `process.env.VERCEL_ENV === "preview"` gate 條件 inject** — 不在 production main branch 出現（避免真實訪客看到），也不在 dev 出現（Josh 不需要）。改 gate 把 `'development'` 加進去就會在 dev 出現。

## Comments / Feedback workflow

Vercel Preview Comments 是 Josh 跟 Claude 之間做 design review feedback 的主要管道。**禁用 OCR / screenshot 視覺讀取**（曾把「不要斜體」讀成「不要糾結」幾乎改錯文案）。

**運作流程**：
1. Josh 在 preview URL toolbar inbox 留 comment（描述格式：「原本字串 → 後來字串」sed-style）
2. Josh 每條 comment 點右上角 GitHub icon → Convert to Issue → 自動產 GitHub Issue（label `vercel: <team>/<project>`）
3. Claude 跑 `gh issue list --repo JoshTsang916/josh-lifeforge --state open --json number,title,body` 撈
4. Issue body 結構：第一段 quote 是元素「原本字串」；joshtsang916 留言是「後來字串」
5. Claude 找對應 code 位置改（同字串多處出現要全部改保 consistency，譬如 RecentWork title + SectionIndex hook 引用）
6. Commit message 加 `Closes #N`，PR merge 進 main 時 GitHub 自動 close issues

**前置設定**（已完成於 commit `88d98b6`，2026-05-08）：
- `@vercel/toolbar` package 進 build：`layout.tsx` 條件 inject `<VercelToolbar />`
- GitHub App `vercel-toolbar` 安裝在此 repo（https://github.com/apps/vercel-toolbar）— 注意不是 `vercel` app（那是 CI/CD 用），是另一個獨立 GitHub App

**為什麼不用其他路徑**：
- Vercel Comments 沒公開 REST API、沒 webhook（已 probe 30+ endpoint 確認 404）
- Toolbar UI 在 closed shadow DOM，Playwright 無法 click / read DOM
- Screenshot OCR 不可靠（前面案例證實）

## Content status (2026-05-08)
- **Email** / **Calendly** / **Threads / IG / YouTube** 全部接真實連結，已無 placeholder
- **About copy**：Josh 親寫版本（commit 24a624f / 6814cb2 之後）
- **Testimonials**：四條真實學員見證（Du / Tammy / Kin / 大大），出自 `2026n8nWorkshop` repo + 引導力學院 AI 分享會——若要新增引用前請與 Josh 核對真偽（同 repo 內曾有 AI 生假見證 Betty）
- **Recent Work**：三場真實活動（n8n Automation Workshop / AI 自動化進入文件驅動的時代 / 神經可塑性說書專場），照片在 `public/photos/`
- **Daily**：4 則手選日更短影片（Day 33/31/25/24），縮圖在 `public/photos/writings/`（路徑沿用舊名），連回 IG Reel
- **Writings**：Phase 1 已上線（2026-05-12）—— `/writings` 列表頁 + `/writings/[slug]` 文章頁，內容存 Supabase `writings` 表（不走 build-time markdown sync）。第一篇「CLAUDE.md 起手模板」（slug `claude-md-starter`）。詳見上方 Tech stack「Database」段 + TODO 🔴#1
- **Service descriptions**：04 Build With Me 寫定（含 doris/tibonus 匿名 proof cases），01-03（工作坊 / 1:1 / 演講）仍是 v0 草稿，等 BRAND 重新對齊後重寫（TODO 7b 殘餘）

## Workflow with Josh
- Josh communicates in 繁體中文, doesn't write code
- Show preview URL for visual review, not code diffs
- He may ask via Telegram — replies happen in the parent ccdailytalk session
- For 3+ file changes → submit to 智囊團 agent for multi-model review

## Related repos
- Parent workspace: `D:/VibeCodingProject/ClaudeCodeProject/ccdailytalk` (his content studio + skills + CLAUDE.md hub) — Windows 機路徑
- Sister: `D:/VibeCodingProject/ClaudeCodeProject/remotion` (video rendering) — Windows 機路徑
- **M5 (Mac) 也是動工機**：lifeforge clone 在 `/Users/josh/project/josh-lifeforge`，commit `472b4d8` (PR #1) / `c01db37` / `039f953` / `88d98b6` / `f2b34a9` 都是 M5 上 push 的。同 repo 兩台機器都可動工，但同一時間應只有一台在改避免 conflict
