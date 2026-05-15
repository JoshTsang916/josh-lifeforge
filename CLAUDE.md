# CLAUDE.md — josh-lifeforge

## Project
Josh's personal brand website — **人生鍛造所 (Lifeforge Studio)**.
Single-page site for workshops, 1:1 consulting, speaking, writings, and recent work.

Audience: students + prospective clients. Goal: clarify who Josh is and convert curious visitors into conversations.

## Tech stack
- **Next.js 16** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS v4** (via `@theme` block in `globals.css`, no `tailwind.config.*`)
- **Fonts** (locked v0.5): Noto Serif TC (display, 思源宋) + LXGW WenKai TC (body, 霞鶩文楷) + Outfit (Latin UI labels) — all via `next/font/google`
- **Deployment**: Vercel (preview = branch URL, production = main)
- **Database**: 網站目前 read-only Supabase 資料只用於 Writings；其他區塊內容仍 hardcoded 在 component 中
  - Testimonials / Recent Work / Services / Hero / About 等區塊：人工挑選 → hardcode
  - Daily 的 IG 影片素材來源是 Supabase `ig_posts`（shared instance `srpqvtkliesdfnqirdpt`），但網站不直接連——更新流程：開發時用 Supabase MCP 撈最新 reels → 下載縮圖到 `public/photos/writings/`（路徑沿用舊名）→ 改 `Daily.tsx` 的 `videos` 陣列
  - 之後若要動態抓最新 N 則影片，需重新加回 `@supabase/supabase-js` 依賴並建立 server-side fetch
  - **Writings（規劃中，2026-05-10 拍板，待動工）**：Josh 寫 Obsidian `80-blogpost/<slug>.md` 初稿 → 跟 Claude 校稿 → Claude 用 Supabase MCP push 到 shared instance `srpqvtkliesdfnqirdpt` 的 `writings` table（schema：`slug / title / excerpt / body_md / cover_image_url / status / published_at / tags / reading_time`）→ 配圖 / 投影片截圖 / mp3 audio 走 Storage `writings-assets/<slug>/` bucket → 前端 Next.js `/writings/[slug]` ISR 60s revalidate 讀 + `react-markdown` + `remark-gfm` + `rehype-raw` 渲染（允許 `<audio>` / `<iframe>` 等 HTML）。**不走 build-time sync / 不走 markdown-in-repo / 不走 MDX**——Supabase runtime 對 non-coder 寫作流程摩擦最低 + Claude 介入 (校稿 / push) 用 MCP 直接操作。詳見 TODO.md 🔴 #1 4-phase plan。

## Design system (Warm brown editorial)

Defined in `src/app/globals.css` via `@theme` (Tailwind v4):

- **Colors**: oklch-based, warm brown palette
  - `--color-bg` light cream / `--color-fg` ink brown / `--color-accent` chocolate
  - All UI colors must come from these tokens — no rogue hex values
- **Typography** (v0.5): `--font-display` (Noto Serif TC 思源宋) for headlines, `--font-sans` (LXGW WenKai TC 霞鶩文楷) for body, `--font-ui` (Outfit) for Latin UI labels & buttons
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
    ├── About.tsx           # Section 02 — Josh 的故事
    ├── Services.tsx        # Section 03 — workshops / 1:1 / speaking / Build With Me（04 客製化開發含 doris/tibonus proof cases）
    ├── RecentWork.tsx      # Section 04 — 近期作品（hardcoded：n8n / AI 自動化進入文件驅動的時代 / 神經可塑性說書專場）
    ├── Testimonials.tsx    # Section 05 — 學員見證（hardcoded：Du / Tammy / Kin / 大大）
    ├── Daily.tsx           # Section 06 — 日更短影片（環形 DayCounter 從 2026-04-01 算 day，每小時 ISR 刷新）
    ├── DayCounter.tsx      # client component — SVG 環形 + IntersectionObserver + RAF count-up，1.8s easeOutCubic
    ├── Contact.tsx         # Section 07 — Email + Calendly
    └── Footer.tsx          # Connect (Threads/IG/YouTube) + reach out + copyright
```

**Section 編號規則**：每個 content section 左欄顯示兩位數編號（01–07）。新增 content section 時整體重編，編號必須連續、不得跳號或重複。對調順序時左欄編號要同步換（譬如 2026-05-15 把 Testimonials 04 跟 RecentWork 05 對調，兩個 component 內的編號字串也都翻過來）。

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
- **Daily**：4 則手選日更短影片（Day 33/31/25/24），縮圖在 `public/photos/writings/`（路徑沿用舊名），連回 IG Reel
- **Writings**（純文章區塊）：尚未建立。未來規劃從 Obsidian vault 的 `published/` 子目錄走 markdown + frontmatter，build 時 sync 到網站，不走線上 CMS
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
