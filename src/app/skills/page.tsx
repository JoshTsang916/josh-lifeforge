import Link from "next/link";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Layers, Languages, Users } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { CopyCommand } from "@/components/CopyCommand";

export const metadata: Metadata = {
  title: "工具 — 人生鍛造所",
  description:
    "Josh 自己在用的 Claude Code skill 與 agent，整理過、去個人化、開源 —— skill-creator、translate-card，以及智囊團多模型審查。一行指令裝進你的環境。",
};

const REPO_URL = "https://github.com/JoshTsang916/lifeforge-skills";
const INSTALL_CMD = "npx skills add JoshTsang916/lifeforge-skills";

// === 工具清單（hardcode）===
// canonical source 是 lifeforge-skills repo 的 SKILL.md / reviewer.md frontmatter；
// 目前只有 3 個資產，為它建 Supabase table + RLS 是過度管理，長到 5-6 個再遷。
// 文案同步自該 repo README 的「這裡有什麼」表格。
// accent = 每個工具的 category 色（既有 @theme brand tints），用於卡頂色條 + 圖示，破除全米白單調。
type Tool = {
  name: string;
  tagline: string;
  detail?: string;
  prereq?: string; // 省略 = 無前置需求
  status: "stable" | "beta";
  sourceUrl: string;
  accent: string;
  Icon: LucideIcon;
};

const skills: Tool[] = [
  {
    name: "skill-creator",
    tagline: "幫你建立 / 重構 Claude Code skill 的 meta-skill。",
    detail:
      "內含「七層架構放置指南」—— 一個功能該放 CLAUDE.md、Memory、Skill、Hook、Agent、MCP 還是 Settings，給你一套判斷框架；再把 9 種 skill 類型對應到三種架構模式。",
    status: "stable",
    sourceUrl: `${REPO_URL}/tree/main/skills/skill-creator`,
    accent: "var(--color-ai)", // 沉穩藍 — 架構 / 工程感
    Icon: Layers, // 呼應「七層架構」
  },
  {
    name: "translate-card",
    tagline:
      "把英文素材（blog post / X thread / X article）翻成繁中，加中英對照、深度強化、思考引導，寫成 Obsidian 卡並自動下載圖片。",
    prereq: "Obsidian vault",
    status: "beta",
    sourceUrl: `${REPO_URL}/tree/main/skills/translate-card`,
    accent: "var(--color-reading)", // 抹茶綠 — 閱讀 / 翻譯（token 本名就是 reading）
    Icon: Languages,
  },
];

const agents: Tool[] = [
  {
    name: "智囊團",
    tagline:
      "多模型交叉審查協調者。把一份程式碼變更、架構決策或內容策略，交給 Claude + Codex + Gemini 三方獨立審查，彙整成一份標記共識與衝突的報告。",
    detail: "內建並行呼叫、timeout／缺席分類、prompt injection 防護。",
    prereq: "Codex CLI + Gemini CLI（兩個都要裝且登入，各需付費訂閱）",
    status: "beta",
    sourceUrl: `${REPO_URL}/tree/main/agents/brain-trust`,
    accent: "var(--color-spark)", // 焦糖橘 — 火花 / 多方協作
    Icon: Users, // 智囊「團」= 多方
  },
];

// 狀態徽章：穩定 = 實心點、Beta = 空心圈（用 geometry 區分而非顏色），
// 把彩色記憶點讓給卡片的 category 色，狀態退為中性次要資訊。
function StatusBadge({ status }: { status: Tool["status"] }) {
  const isStable = status === "stable";
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-bg)] px-2.5 py-1 font-ui text-[11px] tracking-wide text-[color:var(--color-fg-muted)]">
      <span
        aria-hidden
        className={
          isStable
            ? "h-1.5 w-1.5 rounded-full bg-[color:var(--color-fg-muted)]"
            : "h-1.5 w-1.5 rounded-full border border-[color:var(--color-fg-subtle)]"
        }
      />
      {isStable ? "穩定可用" : "Beta"}
    </span>
  );
}

// 工具卡：卡頂 category 色條 + accent 色圖示，破除全米白的單調。
// hover 浮起 + 陰影加深；微互動只列 box-shadow／transform（不用 transition-all）。
function ToolCard({ tool }: { tool: Tool }) {
  const { Icon } = tool;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-[color:var(--color-line-strong)] bg-[color:var(--color-bg)] shadow-[0_2px_10px_rgba(92,64,51,0.06)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(92,64,51,0.12)]">
      {/* 頂部 category 色條 */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: tool.accent }}
        aria-hidden
      />

      <div className="flex flex-1 flex-col p-7">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {/* category 色圖示 + 同色淡底 */}
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
              style={{
                color: tool.accent,
                backgroundColor: `color-mix(in srgb, ${tool.accent} 12%, transparent)`,
              }}
              aria-hidden
            >
              <Icon size={18} strokeWidth={1.75} />
            </span>
            <h3 className="font-mono text-lg text-[color:var(--color-ink)]">
              {tool.name}
            </h3>
          </div>
          <StatusBadge status={tool.status} />
        </div>

        <p className="font-sans text-base leading-[1.7] text-[color:var(--color-fg)]">
          {tool.tagline}
        </p>

        {tool.detail && (
          <p className="mt-3 font-sans text-sm leading-[1.7] text-[color:var(--color-fg-muted)]">
            {tool.detail}
          </p>
        )}

        <div className="mt-auto border-t border-[color:var(--color-line)] pt-5">
          <p className="eyebrow mb-1.5">前置需求</p>
          <p className="font-sans text-sm leading-[1.6] text-[color:var(--color-fg-muted)]">
            {tool.prereq ?? "無 —— 裝了就能用"}
          </p>
        </div>

        <a
          href={tool.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${tool.name} 原始碼（在新分頁開啟）`}
          className="link-underline mt-5 inline-flex items-center gap-1.5 self-start font-ui text-sm font-medium text-[color:var(--color-fg-muted)]"
        >
          看原始碼
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </a>
      </div>
    </article>
  );
}

export default function SkillsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 頁首 —— 沿用 /writings、/fonts 的「非首頁路由」pattern：自己的極簡 header，不掛 Nav（首頁錨點在這裡不存在） */}
      <header className="section border-b border-[color:var(--color-line)] !pb-12">
        <div className="container-narrow">
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/"
              className="link-underline font-ui text-sm text-[color:var(--color-fg-muted)]"
            >
              ← 回首頁
            </Link>
            <span className="eyebrow">Tools</span>
          </div>

          <h1 className="mb-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-tight text-[color:var(--color-ink)]">
            可以帶走的工具
          </h1>
          <p className="max-w-2xl font-sans text-lg leading-[1.75] text-[color:var(--color-fg-muted)]">
            我自己在用的 Claude Code skill 與 agent —— 整理過、去個人化、開源，
            <br className="hidden sm:block" />
            讓你裝進自己的環境，跟著你跑。
          </p>
        </div>
      </header>

      <main className="flex-1">
        {/* === Skills 區（米白稍深底，分塊一） === */}
        <section
          aria-labelledby="skills-heading"
          className="section bg-[color:var(--color-bg-muted)]"
        >
          <div className="container-narrow">
            <Reveal>
              <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 id="skills-heading" className="eyebrow">
                    Skills
                  </h2>
                  <p className="mt-3 font-display text-2xl leading-tight text-[color:var(--color-ink)] md:text-3xl">
                    兩個我天天在用的 skill
                  </p>
                  <p className="mt-3 max-w-md font-sans text-base text-[color:var(--color-fg-muted)]">
                    一行指令裝好，跨 Claude Code／Cursor／Codex 都能用。
                  </p>
                </div>
                <div className="md:shrink-0">
                  <CopyCommand command={INSTALL_CMD} />
                  <p className="mt-2 font-sans text-xs text-[color:var(--color-fg-subtle)]">
                    這一行會裝下面所有 skill。
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2">
              {skills.map((tool, idx) => (
                <Reveal
                  key={tool.name}
                  delay={idx * 100}
                  variant="fade-scale"
                  className="h-full"
                >
                  <ToolCard tool={tool} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* === Agents 區（米白更深底，分塊二；裝法跟 skill 不同） === */}
        <section
          aria-labelledby="agents-heading"
          className="section bg-[color:var(--color-bg-deep)]"
        >
          <div className="container-narrow">
            <Reveal>
              <div className="mb-10">
                <h2 id="agents-heading" className="eyebrow">
                  Agents
                </h2>
                <p className="mt-3 font-display text-2xl leading-tight text-[color:var(--color-ink)] md:text-3xl">
                  不是 skill —— 裝法不一樣
                </p>
                <p className="mt-3 max-w-2xl font-sans text-base leading-[1.7] text-[color:var(--color-fg-muted)]">
                  agent 是另一種 Claude Code 擴充，裝在{" "}
                  <code className="rounded bg-[color:var(--color-bg)] px-1.5 py-0.5 font-mono text-[0.9em] text-[color:var(--color-fg)]">
                    ~/.claude/agents/
                  </code>
                  ，<code className="rounded bg-[color:var(--color-bg)] px-1.5 py-0.5 font-mono text-[0.9em] text-[color:var(--color-fg)]">
                    npx skills add
                  </code>{" "}
                  不會處理它。最省事的裝法：把這個 repo 的網址貼給你的 AI agent，說「讀 README，幫我裝智囊團」。
                </p>
              </div>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2">
              {agents.map((tool, idx) => (
                <Reveal
                  key={tool.name}
                  delay={idx * 100}
                  variant="fade-scale"
                  className="h-full"
                >
                  <ToolCard tool={tool} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
