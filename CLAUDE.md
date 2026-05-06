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
- **Database**: 目前網站本身不連線上資料庫——所有區塊內容均 hardcoded 在各 component 中
  - Testimonials / Recent Work / Daily 的素材都是「人工挑選 → hardcode」
  - Daily 的 IG 影片素材來源是 Supabase `ig_posts`（shared instance `srpqvtkliesdfnqirdpt`），但網站不直接連——更新流程：開發時用 Supabase MCP 撈最新 reels → 下載縮圖到 `public/photos/writings/`（路徑沿用舊名）→ 改 `Daily.tsx` 的 `videos` 陣列
  - 之後若要動態抓最新 N 則影片，需重新加回 `@supabase/supabase-js` 依賴並建立 server-side fetch
  - 未來若新增 Writings（純文章）區塊，預計走 Obsidian → markdown + frontmatter → build-time sync 到網站，不走 CMS

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
    ├── About.tsx           # Section 02 — Josh 的故事
    ├── Services.tsx        # Section 03 — workshops / 1:1 / speaking
    ├── Testimonials.tsx    # Section 04 — 學員見證（hardcoded：Du、大大）
    ├── RecentWork.tsx      # Section 05 — 近期作品（hardcoded：n8n / 80字魔法 / 騎象人）
    ├── Daily.tsx           # Section 06 — 日更短影片（hardcoded 4 則 IG reels + 縮圖）
    ├── Contact.tsx         # Section 07 — Email + Calendly
    └── Footer.tsx          # Connect (Threads/IG/YouTube) + reach out + copyright
```

**Section 編號規則**：每個 section 左欄顯示兩位數編號（01–07）。新增 section 時整體重編，編號必須連續、不得跳號或重複。

## Editorial tone
- Headlines: serif italic accents on key concept words (e.g. "*第二曲線*", "*跟 AI 對話建出系統*")
- Number labels: `01`, `02`, `03` (1-indexed, mono font, tabular-nums)
- Hairline rules between sections instead of heavy dividers
- Generous whitespace — content density is low on purpose

## Content status (2026-05-06)
- **Email** / **Calendly** / **Threads / IG / YouTube** 全部接真實連結，已無 placeholder
- **About copy**：Josh 親寫版本（commit 24a624f / 6814cb2 之後）
- **Testimonials**：兩條真實學員見證（Du / 大大），出自 `2026n8nWorkshop` repo——若要新增引用前請與 Josh 核對真偽（同 repo 內曾有 AI 生假見證 Betty）
- **Recent Work**：三場真實活動，照片在 `public/photos/`
- **Daily**：4 則手選日更短影片（Day 33/31/25/24），縮圖在 `public/photos/writings/`（路徑沿用舊名），連回 IG Reel
- **Writings**（純文章區塊）：尚未建立。未來規劃從 Obsidian vault 的 `published/` 子目錄走 markdown + frontmatter，build 時 sync 到網站，不走線上 CMS
- **Service descriptions** 仍是草稿——之後 Josh 會回頭重寫

## Workflow with Josh
- Josh communicates in 繁體中文, doesn't write code
- Show preview URL for visual review, not code diffs
- He may ask via Telegram — replies happen in the parent ccdailytalk session
- For 3+ file changes → submit to 智囊團 agent for multi-model review

## Related repos
- Parent workspace: `D:/VibeCodingProject/ClaudeCodeProject/ccdailytalk` (his content studio + skills + CLAUDE.md hub)
- Sister: `D:/VibeCodingProject/ClaudeCodeProject/remotion` (video rendering)
