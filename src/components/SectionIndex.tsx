type IndexEntry = {
  number: string;
  label: string;
  hook: string;
  href: string;
};

const entries: IndexEntry[] = [
  {
    number: "02",
    label: "About",
    hook: "我為什麼相信慢富、為什麼 AI 讓一人公司變可能",
    href: "#about",
  },
  {
    number: "03",
    label: "Services",
    hook: "四種協作形式：工作坊、1 對 1、演講、一起把它蓋出來",
    href: "#services",
  },
  {
    number: "04",
    label: "Testimonials",
    hook: "兩位真實學員留下的話",
    href: "#testimonials",
  },
  {
    number: "05",
    label: "Recent Work",
    hook: "n8n workshop、80 字的魔法、騎象人學會了與大象共處",
    href: "#work",
  },
  {
    number: "06",
    label: "Daily",
    hook: "每天一則 IG reels 紀錄當下的觀察",
    href: "#daily",
  },
  {
    number: "07",
    label: "Contact",
    hook: "Email、Calendly、社群連結",
    href: "#contact",
  },
];

export function SectionIndex() {
  return (
    <section
      aria-label="頁面索引"
      className="border-t border-[color:var(--color-line-strong)] bg-[color:var(--color-bg-muted)]"
    >
      <div className="container-narrow py-12 md:py-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-8 bg-[color:var(--color-line-strong)]" />
          <span className="eyebrow">On this page</span>
        </div>

        <ol>
          {entries.map((entry) => (
            <li
              key={entry.number}
              className="border-t border-[color:var(--color-line)] last:border-b group"
            >
              <a
                href={entry.href}
                className="block py-4 md:py-5 px-2 -mx-2 transition-colors hover:bg-[color:var(--color-bg)]"
              >
                <div className="grid grid-cols-12 gap-x-3 md:gap-x-6 gap-y-2 items-baseline">
                  <span className="col-span-2 md:col-span-1 font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)]">
                    {entry.number}
                  </span>
                  <span className="col-span-10 md:col-span-3 font-display text-lg leading-tight text-[color:var(--color-ink)] group-hover:text-[color:var(--color-accent)] transition-colors duration-300">
                    {entry.label}
                  </span>
                  <span className="col-span-12 md:col-span-7 font-sans text-sm md:text-base leading-[1.65] text-[color:var(--color-fg-muted)] md:mt-0">
                    {entry.hook}
                  </span>
                  <span className="hidden md:block md:col-span-1 text-right text-[color:var(--color-fg-subtle)] group-hover:text-[color:var(--color-accent)] transition-colors duration-300">
                    →
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
