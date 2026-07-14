import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";

// 錨點（#）= 首頁同頁滾動；絕對路由（/）= 跨頁。render 時依開頭字元決定用 <a> 還是 <Link>。
// 「工具」(/skills) 是 navLinks 裡第一個跨頁目的地，放在 proof 區（作品／見證）之後、聯絡之前。
const navLinks = [
  { href: "#services", label: "服務" },
  { href: "#builds", label: "實戰" },
  { href: "#about", label: "關於" },
  { href: "#work", label: "作品" },
  { href: "#testimonials", label: "見證" },
  { href: "/skills", label: "工具" },
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
              {l.href.startsWith("/") ? (
                <Link href={l.href} className="link-underline">
                  {l.label}
                </Link>
              ) : (
                <a href={l.href} className="link-underline">
                  {l.label}
                </a>
              )}
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
