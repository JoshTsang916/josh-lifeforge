import Image from "next/image";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[color:var(--color-bg)]/80 border-b border-[color:var(--color-line)]">
      <div className="container-narrow flex items-center justify-between py-2 px-[clamp(1.25rem,4vw,3rem)]">
        <a
          href="#hero"
          className="flex items-center gap-3 group"
          aria-label="人生鍛造所 首頁"
        >
          <Image
            src="/logo.png"
            alt="人生鍛造所"
            width={64}
            height={64}
            priority
            className="transition-transform duration-300 group-hover:rotate-[3deg]"
          />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-lg font-normal text-[color:var(--color-ink)] tracking-wider">
              人生鍛造所
            </span>
            <span className="font-ui text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-fg-subtle)] mt-1">
              The Life Forge
            </span>
          </div>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm font-sans text-[color:var(--color-fg-muted)]">
          <li><a href="#about" className="link-underline">關於</a></li>
          <li><a href="#services" className="link-underline">服務</a></li>
          <li><a href="#work" className="link-underline">作品</a></li>
          <li><a href="#writings" className="link-underline">文章</a></li>
          <li><a href="#contact" className="link-underline">聯絡</a></li>
        </ul>

        <a href="#contact" className="btn btn-primary !py-2 !px-4 text-sm">
          預約諮詢
        </a>
      </div>
    </nav>
  );
}
