# CLAUDE.md — josh-lifeforge

## Project
Josh's personal brand website — **人生鍛造所 (Lifeforge Studio)**.
Single-page homepage（sections 01–06）+ `/writings` 部落格文章區（Supabase ISR）+ `/links` linktree 落地頁（IG/FB bio 用）。For workshops, 1:1 consulting, speaking, writings, and recent work.

Audience: students + prospective clients. Goal: clarify who Josh is and convert curious visitors into conversations.

## Tech stack
- **Next.js 16** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS v4** (via `@theme` block in `globals.css`, no `tailwind.config.*`)
- **Fonts** (locked v0.5): Noto Serif TC (display, 思源宋) + LXGW WenKai TC (body, 霞鶩文楷) + Outfit (Latin UI labels) — all via `next/font/google`
- **Deployment**: Vercel (preview = branch URL, production = main)
- **Database**: 只有 Writings 區塊讀 Supabase（read-only, server-side）；其餘區塊內容 hardcoded 在 component 中
  - Testimonials / Recent Work / Services / Hero / About 等區塊：人工挑選 → hardcode
  - **Daily section paused 2026-05-25** — 日更暫停，已從 `page.tsx` 移除 import 與 render。`Daily.tsx` / `DayCounter.tsx` 兩個 component 檔保留並標 paused 註解，恢復時加回 import + section 編號重編即可。歷史脈絡：早期 Daily 影片素材曾從 Supabase `ig_posts`（shared instance `srpqvtkliesdfnqirdpt`）由 MCP 撈 reels → 縮圖落 `public/photos/writings/`；後來精簡為純環形 DayCounter + 文案 + IG 連結（沒 videos 陣列）。
  - **Writings — Phase 1 基礎建設（branch `feat/writings-section`，2026-05-27 unpark merge）**：流程是 Josh 寫 Obsidian `~/Documents/cc-vault/80-blogpost/<slug>.md` → 跟 Claude 校稿（typo / 排版 / tone，**AI 不起草**）→ Claude 用 Supabase MCP（`apply_migration` / `execute_sql`）把 markdown push 到 shared instance `srpqvtkliesdfnqirdpt` 的 `public.writings` 表 → 前端 ISR 讀。**不走 build-time sync / markdown-in-repo / MDX**（Supabase runtime 對 non-coder 摩擦最低 + Claude 校稿/push 直接用 MCP）
    - **2026-05-27 reframe**：第一篇從 anchor 文（FORGE 五步法 / 為什麼開人生鍛造所）降到「簡單短文起跑」。背景：5/12 Josh review 判定 AI 改寫版「100% AI 味」、要親寫一版，但 anchor 文門檻太高一直沒動手；改用 200-500 字短觀察 / 心法 / 想法累積寫作肌肉，等手感回來再回 anchor 文。
    - **Writings 工作流鐵則**：Josh 親寫初稿（哪怕 200 字短文）→ AI 校稿 typo / 排版 / tone，**AI 不起草**。原因：修改 AI 起草版的力氣 > 從零親寫的力氣（AI 味滲透語句結構、邏輯不是自己的也記不住）。同精神參照翻譯卡 `translate-card` skill 的 authorship 規範。
    - `writings` schema：`id / slug(unique) / title / excerpt / body_md / cover_image_url / status('draft'|'published') / published_at / tags(text[]) / reading_time(int) / created_at`；RLS：anon 只能讀 `status='published'`（草稿對外不可見）。Storage bucket `writings-assets`（public read）Phase 2 才用（配圖 / 投影片截圖 / mp3）
    - 前端：`src/lib/supabase.ts`（read-only client，`import "server-only"`，env 未設回 null → 列表頁/文章頁優雅 fallback 空狀態 / notFound）、`src/lib/writings.ts`（`getPublishedWritings` / `getWritingBySlug`，都用 React `cache()` 包；含 `formatDate` helper）、`src/app/writings/page.tsx` 列表頁 + `src/app/writings/[slug]/page.tsx` 文章頁（都 `revalidate = 60` ISR，`[slug]` 有 `generateStaticParams` + `generateMetadata` OG），渲染 `react-markdown` + `remark-gfm` + `rehype-raw` + `rehype-sanitize`（順序：raw 解析 HTML → sanitize 用 `defaultSchema` + 白名單 `<audio>`/`<source>`/`<iframe>` 過濾；`body_md` 雖只來自 Supabase / RLS-gated MCP 寫入，多一層 defense-in-depth），排版用 `globals.css` 的 `.article-prose` class（暖棕 editorial，刻意不用 `@tailwindcss/typography`；`pre` 用 `pre-wrap` 讓窄螢幕 wrap）。`/writings` pages **不掛 `<Nav>`**（首頁錨點在那裡不存在）→ 自己的極簡 header（← 回首頁 / ← 回文章列表）+ 完整 `<Footer>`，同 `/fonts` pattern；`Nav.tsx` / `MobileMenu.tsx` 加了「文章」→ `/writings` 跨頁連結（`<Link>`，href 開頭 `/` vs `#` 區分 render）
    - env var：`SUPABASE_URL` / `SUPABASE_ANON_KEY`（server-side，**無** `NEXT_PUBLIC_` 前綴）。production 已設；**preview 環境沒設 → preview deploy 的 Writings 會 fallback 到空狀態**（要展示需在 Vercel dashboard 補 preview env var，見 TODO 🟢#10）；本地用 `.env.local`。新依賴：`@supabase/supabase-js` / `react-markdown` / `remark-gfm` / `rehype-raw` / `rehype-sanitize` / `server-only`；`next.config.ts` 加了 `images.remotePatterns` 指向 Supabase Storage（Phase 2 封面用）
    - 後續 phase（Phase 2 配圖/投影片 / Phase 3 校稿協作 SOP / Phase 4 Newsletter / Phase 5 短影片轉文章）見 TODO.md 🔴 #1

## Design system (Warm brown editorial)

Defined in `src/app/globals.css` via `@theme` (Tailwind v4):

- **Colors**: oklch-based, warm brown palette
  - `--color-bg` light cream / `--color-fg` ink brown / `--color-accent` chocolate
  - All UI colors must come from these tokens — no rogue hex values
- **Typography** (v0.5): `--font-display` (Noto Serif TC 思源宋) for headlines, `--font-sans` (LXGW WenKai TC 霞鶩文楷) for body, `--font-ui` (Outfit) for Latin UI labels & buttons
- **Radii**: small (2/6/10px) — editorial restraint, not soft consumer
- **Component classes**: `.section`, `.container-narrow`, `.eyebrow`, `.btn`, `.btn-primary`, `.btn-ghost`, `.link-underline`, `.paper-grain`（紙感顆粒材質 overlay，目前用於 `/links`）

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
│   ├── page.tsx            # Composes all sections in 01–06 order
│   ├── links/
│   │   └── page.tsx        # /links — 獨立 linktree 落地頁（IG/FB bio 用），data-driven 連結陣列，非 single-page 主站的一部分
│   └── globals.css         # @theme tokens + .section/.btn/.link-underline/.paper-grain classes
└── components/
    ├── Nav.tsx             # Sticky top nav，desktop 橫式選單 + mobile 漢堡 trigger
    ├── MobileMenu.tsx      # client component，用 React Portal 渲染到 body 避開 Nav backdrop-blur 造成的 stacking 限制
    ├── Hero.tsx            # Section 01 — headline + CTAs
    ├── About.tsx           # Section 02 — Josh 的故事
    ├── Services.tsx        # Section 03 — workshops / 1:1 / speaking / Build With Me（04 客製化開發含 doris/tibonus proof cases）
    ├── RecentWork.tsx      # Section 04 — 近期作品（hardcoded：n8n / AI 自動化進入文件驅動的時代 / 神經可塑性說書專場）
    ├── Testimonials.tsx    # Section 05 — 學員見證（hardcoded：Du / Tammy / Kin / 大大）
    ├── Daily.tsx           # [paused 2026-05-25] 原 Section 06 日更短影片，已從 page.tsx 移除 import；檔案保留待恢復
    ├── DayCounter.tsx      # [paused 2026-05-25] client component — SVG 環形 + IO + RAF count-up；只給 Daily 用，跟著 paused
    ├── Contact.tsx         # Section 06 — Email + Calendly（原 07，Daily paused 後改 06）
    └── Footer.tsx          # Connect (Threads/IG/YouTube) + reach out + copyright
```

**Section 編號規則**：每個 content section 左欄顯示兩位數編號（目前 01–06）。新增 / 移除 / 暫停 content section 時整體重編，編號必須連續、不得跳號或重複。對調順序時左欄編號要同步換（譬如 2026-05-15 把 Testimonials 04 跟 RecentWork 05 對調，兩個 component 內的編號字串也都翻過來；2026-05-25 Daily section paused 後 Contact 從 07 改 06）。

## Editorial tone
- Headlines: serif italic accents on key concept words (e.g. "*第二曲線*", "*跟 AI 對話建出系統*")
- Number labels: `01`, `02`, `03` (1-indexed, mono font, tabular-nums)
- Hairline rules between sections instead of heavy dividers
- Generous whitespace — content density is low on purpose

## Design notes（過往決策）

- **SectionIndex（editorial TOC）2026-05-15 移除** — 原本在 Hero/About 之間，列 02-07 各 section 的編號 + label + hook 描述。移除原因：sticky Nav 已 cover navigation 需求，TOC 是 redundant + 拉長到 About 的 scroll 路徑。如要復原翻 git history 找 component + page.tsx render line（commit 之前是 `SectionIndex.tsx`）。
- **Testimonials ↔ RecentWork 2026-05-15 對調為 04→RecentWork / 05→Testimonials** — 兩個 trust block 從「客觀（教過什麼）→ 主觀（學員怎麼說）」遞進，讓主觀背書更靠近 Contact。Nav.tsx navLinks 順序也對調，MobileMenu 編號是 `idx+1` 動態算自動跟著。
- **Services 04「Build With Me」用 inline `proof.cases` 而不是另開 Portfolio section** — 因為 doris/tibonus 客戶授權還沒拿，先匿名（「某會計事務所」/「某食品代理商」）嵌在 service description 內。等授權拿到後可升級到獨立 Builds section + 截圖。
- **Vercel Toolbar 用 `process.env.VERCEL_ENV === "preview"` gate 條件 inject** — 不在 production main branch 出現（避免真實訪客看到），也不在 dev 出現（Josh 不需要）。改 gate 把 `'development'` 加進去就會在 dev 出現。
- **`/links` linktree 落地頁 2026-05-23 新增（PR #29，待 merge）** — 獨立於主站 single-page 的精實連結頁，給 IG/FB bio 放單一連結用。`src/app/links/page.tsx` 單檔，連結用 data-driven 陣列（加一筆物件＝多一顆按鈕，未來電子報 / Skill / Blog 直接擴充，版面零改動）。頂部 `hero.jpg` 暖調 banner + `.paper-grain` 紙感 + 暖光暈 + 卡片暖陰影；`my-auto` safe-centering 防內容高於視窗被裁。**踩雷記錄**：對人臉照片做重度單色 duotone（`grayscale` + `sepia` + accent `multiply`）會讓膚色變土褐「臘像」詭異感 → 改回保留原色 + 極輕暖調（`sepia(0.12)` + faint accent-soft `soft-light`）。教訓：有人臉的照片，自然膚色 > 完全色溫統一。

## Comments / Feedback workflow

Vercel Preview Comments 是 Josh 跟 Claude 之間做 design review feedback 的主要管道。**禁用 OCR / screenshot 視覺讀取**（曾把「不要斜體」讀成「不要糾結」幾乎改錯文案）。

**運作流程**：
1. Josh 在 preview URL toolbar inbox 留 comment（描述格式：「原本字串 → 後來字串」sed-style）
2. Josh 每條 comment 點右上角 GitHub icon → Convert to Issue → 自動產 GitHub Issue（label `vercel: <team>/<project>`）
3. Claude 跑 `gh issue list --repo JoshTsang916/josh-lifeforge --state open --json number,title,body` 撈
4. Issue body 結構：第一段 quote 是元素「原本字串」；joshtsang916 留言是「後來字串」
5. Claude 找對應 code 位置改（同字串多處出現要全部改保 consistency，譬如同一 section title 可能同時出現在 component 內 + Nav.tsx label）
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
- **Daily**：paused 2026-05-25（日更暫停，section 從首頁移除）。歷史內容為環形 DayCounter 從 2026-04-01 算 day + IG Reel 導流連結。
- **Writings**：Phase 1 unpark merge 2026-05-27，`/writings` 列表頁 + `/writings/[slug]` 文章頁上線，內容存 Supabase `writings` 表。第一篇待 Josh 親寫短文（reframe 後不再追求 anchor 文門檻）。詳見 Tech stack「Database」段 + TODO 🔴#1
- **Service descriptions**：04 Build With Me 寫定（含 doris/tibonus 匿名 proof cases），01-03（工作坊 / 1:1 / 演講）仍是 v0 草稿，等 BRAND 重新對齊後重寫（TODO 7b 殘餘）

## Workflow with Josh
- Josh communicates in 繁體中文, doesn't write code
- Show preview URL for visual review, not code diffs
- He may ask via Telegram — replies happen in the parent ccdailytalk session
- For 3+ file changes → submit to 智囊團 agent for multi-model review

## Git workflow

- **Production code changes → feature branch + PR + squash merge**（lifeforge 22+ commits 慣例）。Vercel auto preview，Josh 自己 merge
- **Doc-only changes → commit `main` directly, no PR**（2026-05-16 拍板）：
  - ✅ `*.md`（TODO / CLAUDE / README / dev-logs / ATTRIBUTION 等元資料）
  - ✅ Code comment-only edits（不改 runtime behavior）
  - ❌ `next.config.*` / `package.json` / `.env.example` / `tsconfig.*`（build / runtime 設定）
  - ❌ `src/app/layout.tsx` 的 `metadata` title / description / openGraph / twitter（SEO/OG runtime 影響）
  - Rationale: solo repo + 沒 branch protection，PR 純 overhead（preview build / branch cleanup）；doc 改錯直接再 commit 修就好
- **Commit message**: 英文 Conventional Commits (`feat / fix / chore / refactor / docs`)
- **Author**: `bonkerser@gmail.com` / `JoshTsang916`（Vercel 會 block invalid author）

## Related repos
- Parent workspace: `D:/VibeCodingProject/ClaudeCodeProject/ccdailytalk` (his content studio + skills + CLAUDE.md hub) — Windows 機路徑
- Sister: `D:/VibeCodingProject/ClaudeCodeProject/remotion` (video rendering) — Windows 機路徑
- **M5 (Mac) 也是動工機**：lifeforge clone 在 `/Users/josh/project/josh-lifeforge`，commit `472b4d8` (PR #1) / `c01db37` / `039f953` / `88d98b6` / `f2b34a9` 都是 M5 上 push 的。同 repo 兩台機器都可動工，但同一時間應只有一台在改避免 conflict
