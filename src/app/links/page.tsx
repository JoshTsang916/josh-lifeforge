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
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        {/* 頁首：logo + 名字 + 一句引導，整塊可點連回首頁 */}
        <Reveal>
          <header className="flex flex-col items-center text-center mb-12">
            <Link
              href="/"
              className="group inline-flex flex-col items-center gap-4"
              aria-label="回到人生鍛造所首頁"
            >
              <Image
                src="/logo.png"
                alt="人生鍛造所"
                width={96}
                height={96}
                priority
                className="h-20 w-20 transition-transform duration-300 group-hover:rotate-[3deg]"
              />
              <span>
                <span className="block font-display text-2xl text-[color:var(--color-ink)] tracking-wider">
                  人生鍛造所
                </span>
                <span className="block font-ui text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-fg-subtle)] mt-1">
                  The Life Forge
                </span>
              </span>
            </Link>
            <p className="mt-6 font-sans text-sm leading-[1.7] text-[color:var(--color-fg-muted)] max-w-[16rem]">
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
              <Reveal key={item.label} delay={120 + idx * 80}>
                <a
                  href={item.href}
                  {...externalProps}
                  className={[
                    "group flex items-center justify-between gap-4 rounded-sm px-6 py-5 transition-all duration-200",
                    item.primary
                      ? "bg-[color:var(--color-accent)] text-[color:var(--color-bg)] hover:bg-[color:var(--color-accent-hover)]"
                      : "border border-[color:var(--color-line-strong)] bg-transparent text-[color:var(--color-ink)] hover:border-[color:var(--color-accent)] hover:bg-[color:var(--color-bg-muted)]",
                  ].join(" ")}
                >
                  <span className="min-w-0">
                    <span className="block font-ui text-base font-medium tracking-wide">
                      {item.label}
                    </span>
                    <span
                      className={[
                        "block font-sans text-sm mt-0.5 truncate",
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
                      "font-ui text-lg shrink-0 transition-transform duration-200 group-hover:translate-x-1",
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
        <Reveal delay={120 + links.length * 80 + 80}>
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
