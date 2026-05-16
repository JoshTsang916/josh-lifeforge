import Image from "next/image";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { href: "#about", label: "關於" },
  { href: "#services", label: "服務" },
  { href: "#work", label: "作品" },
  { href: "#testimonials", label: "見證" },
  { href: "#daily", label: "日更" },
  { href: "#contact", label: "聯絡" },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[color:var(--color-bg)]/80 border-b border-[color:var(--color-line)]">
      <div className="container-narrow flex items-center justify-between py-2 px-[clamp(1.25rem,4vw,3rem)]">
        <a
          href="#hero"
          className="flex items-center gap-3 group relative z-50"
          aria-label="人生鍛造所 首頁"
        >
          <Image
            src="/logo.png"
            alt="人生鍛造所"
            width={96}
            height={96}
            priority
            className="h-12 w-12 sm:h-24 sm:w-24 transition-transform duration-300 group-hover:rotate-[3deg]"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-base sm:text-lg font-normal text-[color:var(--color-ink)] tracking-wider">
              人生鍛造所
            </span>
            <span className="hidden sm:block font-ui text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-fg-subtle)] mt-1">
              The Life Forge
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-sans text-[color:var(--color-fg-muted)]">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-underline">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="btn btn-primary !py-2 !px-4 text-sm hidden md:inline-flex"
          >
            預約諮詢
          </a>
          <MobileMenu links={navLinks} />
        </div>
      </div>
    </nav>
  );
}
