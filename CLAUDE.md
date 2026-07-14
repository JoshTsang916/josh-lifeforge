# CLAUDE.md — josh-lifeforge

## Project
Josh's personal brand website — **人生鍛造所 (Lifeforge Studio)**.
Single-page site for workshops, 1:1 consulting, speaking, writings, and recent work（主站為 single-page；另有獨立 `/links` linktree 落地頁給社群 bio 導流用）。

Audience: students + prospective clients. Goal: clarify who Josh is and convert curious visitors into conversations.

## Tech stack
- **Next.js 16** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS v4** (via `@theme` block in `globals.css`, no `tailwind.config.*`)
- **Fonts** (locked v0.5): Noto Serif TC (display, 思源宋) + LXGW WenKai TC (body, 霞鶩文楷) + Outfit (Latin UI labels) — all via `next/font/google`
- **Deployment**: Vercel (preview = branch URL, production = main)
- **Database**: 網站目前 read-only Supabase 資料只用於 Writings；其他區塊內容仍 hardcoded 在 component 中
  - Testimonials / Recent Work / Services / Hero / About 等區塊：人工挑選 → hardcode
  - **Daily section paused 2026-05-25** — 日更暫停，已從 `page.tsx` 移除 import 與 render。`Daily.tsx` / `DayCounter.tsx` 兩個 component 檔保留並標 paused 註解，恢復時加回 import + section 編號重編即可。歷史脈絡：早期 Daily 影片素材來源是 Supabase `ig_posts`（shared instance `srpqvtkliesdfnqirdpt`），由 Supabase MCP 撈 reels → 縮圖落 `public/photos/writings/` → 改 `Daily.tsx` 的 `videos` 陣列；後來精簡為純環形 DayCounter + 一段文案 + IG 連結（沒 videos 陣列）。
  - **Writings（規劃中，2026-05-10 拍板，待動工）**：Josh 寫 Obsidian `80-blogpost/<slug>.md` 初稿 → 跟 Claude 校稿 → Claude 用 Supabase MCP push 到 shared instance `srpqvtkliesdfnqirdpt` 的 `writings` table（schema：`slug / title / excerpt / body_md / cover_image_url / status / published_at / tags / reading_time`）→ 配圖 / 投影片截圖 / mp3 audio 走 Storage `writings-assets/<slug>/` bucket → 前端 Next.js `/writings/[slug]` ISR 60s revalidate 讀 + `react-markdown` + `remark-gfm` + `rehype-raw` 渲染（允許 `<audio>` / `<iframe>` 等 HTML）。**不走 build-time sync / 不走 markdown-in-repo / 不走 MDX**——Supabase runtime 對 non-coder 寫作流程摩擦最低 + Claude 介入 (校稿 / push) 用 MCP 直接操作。詳見 TODO.md 🔴 #1 4-phase plan。

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
│   ├── page.tsx            # Composes all sections in 01–07 order（2026-07-14 About 退位後：Hero → Forge → Services → Builds → About → RecentWork → Testimonials → Contact）
│   ├── links/
│   │   └── page.tsx        # /links — 獨立 linktree 落地頁（IG/FB bio 用），data-driven 連結陣列，非 single-page 主站的一部分
│   └── globals.css         # @theme tokens + .section/.btn/.link-underline/.paper-grain classes
└── components/
    ├── Nav.tsx             # Sticky top nav，desktop 橫式選單 + mobile 漢堡 trigger
    ├── MobileMenu.tsx      # client component，用 React Portal 渲染到 body 避開 Nav backdrop-blur 造成的 stacking 限制
    ├── Hero.tsx            # Section 01 — B2B 主標「用 AI 陪你鍛造屬於你自己的系統」（AI 藍/鍛造紅/系統橘，HeroTitle 每行 Segment[] 多色）+ 處境副標 + CTA（聊聊你的工作流程 #contact／看實戰案例 #builds）
    ├── Services.tsx        # Section 02 — 「如何開始鍛造」分支版面：01 流程診斷全寬入口 → 02 教你建 / 03 幫你建並排分岔（proofLink → #builds）+ 演講尾註（2026-07-14 光譜重構 + 分支動態化，REBUILD-PLAN 05，PR #44）
    ├── ServicesBranch.tsx  # client component — Services 的分支段：SVG 分岔線 scroll 生長 + 火花拖光尾擊中卡片（閃光/漣漪/頂邊熱冷卻，A 光脈+B 火花融合方案）；mobile 退化成 rail+兩站；動畫 CSS 在 globals.css .branch-* 區
    ├── Builds.tsx          # Section 03 — 實戰：五個匿名案例（會計事務所/食品代理商/匹克球館/家教/創作者頻道），各含階梯爬升線 from→to + 之前/做了/現在（2026-07-14 新增，REBUILD-PLAN 04）
    ├── About.tsx           # Section 04 — Josh 的故事（2026-07-14 退位到實戰後 + 開頭加教師橋段；主文一字未動）
    ├── RecentWork.tsx      # Section 05 — 近期作品（hardcoded：n8n / AI 自動化進入文件驅動的時代 / 神經可塑性說書專場）
    ├── Testimonials.tsx    # Section 06 — 學員見證（hardcoded：Du / Tammy / Kin / 大大）
    ├── Daily.tsx           # [paused 2026-05-25] 原日更短影片 section，已從 page.tsx 移除 import；檔案保留待恢復
    ├── DayCounter.tsx      # [paused 2026-05-25] client component — SVG 環形 + IO + RAF count-up；只給 Daily 用，跟著 paused
    ├── Contact.tsx         # Section 07 — Email + Calendly + ContactForm（服務選項＝診斷/教你建/幫你建/演講，與 actions/contact.ts zod enum 同步）
    └── Footer.tsx          # Connect (Threads/IG/YouTube) + reach out + copyright
```

**Section 編號規則**：每個 content section 左欄顯示兩位數編號（目前 01–07）。新增 / 移除 / 暫停 content section 時整體重編，編號必須連續、不得跳號或重複。對調順序時左欄編號要同步換（譬如 2026-05-15 把 Testimonials 04 跟 RecentWork 05 對調；2026-05-25 Daily paused 後 Contact 07→06；2026-07-14 Builds 新增 + About 退位，全站重編成 Services 02 / Builds 03 / About 04 / RecentWork 05 / Testimonials 06 / Contact 07）。ForgeSection 為無編號互動間奏，不參與重編。

## Editorial tone
- Headlines: serif italic accents on key concept words (e.g. "*第二曲線*", "*跟 AI 對話建出系統*")
- Number labels: `01`, `02`, `03` (1-indexed, mono font, tabular-nums)
- Hairline rules between sections instead of heavy dividers
- Generous whitespace — content density is low on purpose

## Design notes（過往決策）

- **SectionIndex（editorial TOC）2026-05-15 移除** — 原本在 Hero/About 之間，列 02-07 各 section 的編號 + label + hook 描述。移除原因：sticky Nav 已 cover navigation 需求，TOC 是 redundant + 拉長到 About 的 scroll 路徑。如要復原翻 git history 找 component + page.tsx render line（commit 之前是 `SectionIndex.tsx`）。
- **Testimonials ↔ RecentWork 2026-05-15 對調為 04→RecentWork / 05→Testimonials** — 兩個 trust block 從「客觀（教過什麼）→ 主觀（學員怎麼說）」遞進，讓主觀背書更靠近 Contact。Nav.tsx navLinks 順序也對調，MobileMenu 編號是 `idx+1` 動態算自動跟著。
- ~~**Services 04「Build With Me」用 inline `proof.cases` 而不是另開 Portfolio section**~~（deprecated 2026-07-14：proof 已升格成獨立 Builds section，見下條）
- **實戰 Builds section 升格 + About 退位 + Services 光譜（2026-07-14，PR #36 + #43）** — proof 從 Services 內兩行小字升格為獨立 section（五案全匿名：doris=某會計事務所 / tibonus=某食品代理商 / pickleball=某匹克球館 / student-progress=家教教學現場 / YT留言=某創作者頻道），每案標成熟度階梯 from→to；About 退到實戰後（REBUILD-PLAN 06「先能幫我、再認同你」），開頭加教師橋段；Services 從四格商品重構成「診斷→教你建/幫你建」光譜，演講退尾註；星圖第 4 主星 工具→實戰五子星（/skills 入口剩 Nav）；全站顯示文案禁用「——」破折號（Josh 偏好，code 註解不限）。**授權拿到後**：逐案露名 + 補去識別化系統截圖（TODO #2 殘餘）。
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
- **Writings**（純文章區塊）：尚未建立。未來規劃從 Obsidian vault 的 `published/` 子目錄走 markdown + frontmatter，build 時 sync 到網站，不走線上 CMS
- **Service descriptions**：2026-07-14 光譜重構全數改寫（01 流程診斷 / 02 教你建 / 03 幫你建 + 演講尾註），proof cases 移至獨立 Builds section。Josh 表示文案「之後慢慢修」，個別句子仍會迭代（原「01-03 是 v0 草稿等 BRAND 對齊」的描述 deprecated 2026-07-14）

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
