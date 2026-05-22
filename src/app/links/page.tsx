import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "連結 — 人生鍛造所",
  description:
    "Josh 的所有連結匯整：YouTube、Instagram、Threads，以及預約 30 分鐘免費初談。",
};

// === Linktree 連結資料（data-driven）===
// 之後要新增「電子報訂閱 / Skill 專區 / Blog 文章」時，往這個陣列加一筆物件即可，
// 頁面排版邏輯完全不用動 —— 做好一個服務就點亮一顆按鈕，零重工。
//   external: true  → 外部連結，新分頁開啟（社群 / Calendly）
//   external: false → mailto 或站內，沿用當前分頁
//   primary: true   → 視覺主強調（磚紅實心），目前只給轉換目標「預約聊聊」當主 CTA
type LinkItem = {
  label: string;
  handle: string;
  href: string;
  external: boolean;
  primary?: boolean;
};

const links: LinkItem[] = [
  {
    label: "預約聊聊",
    handle: "30 分鐘免費初談 · 視訊",
    href: "https://calendly.com/joshailearing0916",
    external: true,
    primary: true,
  },
  {
    label: "YouTube",
    handle: "@JoshTheLifeForge",
    href: "https://www.youtube.com/@JoshTheLifeForge",
    external: true,
  },
  {
    label: "Instagram",
    handle: "@josh_lifeforge",
    href: "https://www.instagram.com/josh_lifeforge/",
    external: true,
  },
  {
    label: "Threads",
    handle: "@josh_lifeforge",
    href: "https://www.threads.com/@josh_lifeforge",
    external: true,
  },
  {
    label: "Email",
    handle: "joshailearing0916@gmail.com",
    href: "mailto:joshailearing0916@gmail.com?subject=關於人生鍛造所",
    external: false,
  },
];

export default function LinksPage() {
  const year = new Date().getFullYear();

  return (
    // paper-grain：globals.css 的 ::after 在最上層鋪極淡紙感顆粒；overflow-hidden 收住光暈
    <main className="paper-grain relative flex min-h-dvh flex-col items-center overflow-hidden px-6 py-16">
      {/* 暖色光暈：頂部一抹從磚紅 accent-soft 暈開的橢圓，增加深度，不喧賓奪主 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[140%] max-w-3xl -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--color-accent-soft),transparent_70%)] opacity-50 blur-3xl"
      />

      <div className="relative z-10 my-auto w-full max-w-md">
        {/* 頂部 duotone 演講照 banner —— 全彩照經雙色調處理統一到品牌米咖啡調，不跟暖色站打架 */}
        <Reveal>
          <div className="relative isolate mb-7 aspect-[4/3] overflow-hidden rounded-md ring-1 ring-[color:var(--color-line-strong)] shadow-[0_8px_30px_rgba(92,64,51,0.12)]">
            <Image
              src="/photos/hero.jpg"
              alt="Josh 在 n8n 自動化工作坊帶領學員"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 28rem"
              className="object-cover object-[68%_22%]"
              style={{
                filter:
                  "grayscale(1) sepia(0.55) contrast(1.05) brightness(0.96)",
              }}
            />
            {/* 暖磚紅 tint：把去飽和後的褐調統一到品牌暖色（multiply 不洗白、保留照片細節）*/}
            <div
              aria-hidden
              className="absolute inset-0 bg-[color:var(--color-accent)] opacity-25 mix-blend-multiply"
            />
            {/* 底部漸層：讓照片下緣平滑融入頁面米白底 */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[color:var(--color-bg)] to-transparent"
            />
          </div>
        </Reveal>

        {/* 名字 + 引導語（logo 縮小，整塊可點連回首頁）*/}
        <Reveal delay={80}>
          <header className="mb-10 flex flex-col items-center text-center">
            <Link
              href="/"
              className="group inline-flex flex-col items-center gap-2"
              aria-label="回到人生鍛造所首頁"
            >
              <Image
                src="/logo.png"
                alt=""
                width={96}
                height={96}
                priority
                className="h-12 w-12 transition-transform duration-300 group-hover:rotate-[3deg]"
              />
              <span>
                <span className="block font-display text-2xl tracking-wider text-[color:var(--color-ink)]">
                  人生鍛造所
                </span>
                <span className="mt-1 block font-ui text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-fg-subtle)]">
                  The Life Forge
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-[16rem] font-sans text-sm leading-[1.7] text-[color:var(--color-fg-muted)]">
              AI 給你槓桿，閱讀給你底氣。
              <br />
              挑一個你想去的地方。
            </p>
          </header>
        </Reveal>

        {/* 連結按鈕牆：垂直堆疊、大可點區塊、mobile first（流量來源是手機 IG/FB bio）*/}
        <nav className="flex flex-col gap-3" aria-label="所有連結">
          {links.map((item, idx) => {
            const externalProps = item.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : undefined;

            return (
              // delay 隨索引遞增 → 由上而下依序浮現，跟主站 Reveal 節奏一致
              <Reveal key={item.label} delay={160 + idx * 80}>
                <a
                  href={item.href}
                  {...externalProps}
                  className={[
                    "group flex items-center justify-between gap-4 rounded-sm px-6 py-5 transition-all duration-200",
                    // 暖色系陰影（取自 --color-fg），讓按鈕從「平貼」變「浮起的卡片」
                    "shadow-[0_2px_10px_rgba(92,64,51,0.06)] hover:shadow-[0_6px_18px_rgba(92,64,51,0.12)]",
                    item.primary
                      ? "bg-[color:var(--color-accent)] text-[color:var(--color-bg)] hover:bg-[color:var(--color-accent-hover)]"
                      : "border border-[color:var(--color-line-strong)] bg-[color:var(--color-bg)] text-[color:var(--color-ink)] hover:border-[color:var(--color-accent)] hover:bg-[color:var(--color-bg-muted)]",
                  ].join(" ")}
                >
                  <span className="min-w-0">
                    <span className="block font-ui text-base font-medium tracking-wide">
                      {item.label}
                    </span>
                    <span
                      className={[
                        "mt-0.5 block truncate font-sans text-sm",
                        item.primary
                          ? "text-[color:var(--color-bg)] opacity-80"
                          : "text-[color:var(--color-fg-subtle)]",
                      ].join(" ")}
                    >
                      {item.handle}
                    </span>
                  </span>
                  {/* 外連用 ↗、站內/mailto 用 →；hover 時箭頭右移呼應「前往」*/}
                  <span
                    className={[
                      "shrink-0 font-ui text-lg transition-transform duration-200 group-hover:translate-x-1",
                      item.primary
                        ? ""
                        : "text-[color:var(--color-fg-subtle)] group-hover:text-[color:var(--color-accent)]",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {item.external ? "↗" : "→"}
                  </span>
                </a>
              </Reveal>
            );
          })}
        </nav>

        {/* 頁尾：導回完整網站 + copyright */}
        <Reveal delay={160 + links.length * 80 + 80}>
          <footer className="mt-14 text-center">
            <Link
              href="/"
              className="link-underline font-sans text-sm text-[color:var(--color-fg-muted)]"
            >
              ← 回到完整網站
            </Link>
            <p className="mt-6 font-sans text-xs text-[color:var(--color-fg-subtle)]">
              © {year} 人生鍛造所
            </p>
          </footer>
        </Reveal>
      </div>
    </main>
  );
}
