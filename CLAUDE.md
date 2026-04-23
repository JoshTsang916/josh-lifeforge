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
- **Database**: Supabase (shared with `ccdailytalk` — same `srpqvtkliesdfnqirdpt` instance)
  - Will read `contents` table (published articles/videos) for **Writings** and **Recent Work** sections
  - Read-only via anon key

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
│   ├── layout.tsx        # Newsreader + Outfit fonts, metadata
│   ├── page.tsx          # Composes all sections
│   └── globals.css       # @theme tokens + .section/.btn/.link-underline classes
└── components/
    ├── Nav.tsx           # Sticky top nav with anchor links
    ├── Hero.tsx          # Section 01 — headline + CTAs
    ├── About.tsx         # Section 02 — story + FORGE callout
    ├── Services.tsx      # Section 03 — workshops / 1:1 / speaking
    ├── Work.tsx          # [TODO] Section 04 — Supabase contents auto-sync
    ├── Writings.tsx      # [TODO] Section 05 — articles from contents
    ├── Contact.tsx       # [TODO] Section 06 — form or Calendly
    └── Footer.tsx        # Connect + reach out + copyright
```

## Editorial tone
- Headlines: serif italic accents on key concept words (e.g. "*第二曲線*", "*跟 AI 對話建出系統*")
- Number labels: `01`, `02`, `03` (1-indexed, mono font, tabular-nums)
- Hairline rules between sections instead of heavy dividers
- Generous whitespace — content density is low on purpose

## Content placeholders (need Josh input)
- `[email placeholder — need real address]` in Footer
- Social links in Footer (Threads / IG / YouTube) — currently `href="#"`
- About copy is a draft — Josh should rewrite in his voice
- Service descriptions are drafts — Josh should validate the framing
- No real workshop / talk titles yet (Recent Work section pending)

## Workflow with Josh
- Josh communicates in 繁體中文, doesn't write code
- Show preview URL for visual review, not code diffs
- He may ask via Telegram — replies happen in the parent ccdailytalk session
- For 3+ file changes → submit to 智囊團 agent for multi-model review

## Related repos
- Parent workspace: `D:/VibeCodingProject/ClaudeCodeProject/ccdailytalk` (his content studio + skills + CLAUDE.md hub)
- Sister: `D:/VibeCodingProject/ClaudeCodeProject/remotion` (video rendering)
