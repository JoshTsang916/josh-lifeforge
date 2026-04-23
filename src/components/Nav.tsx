export function Nav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[color:var(--color-bg)]/80 border-b border-[color:var(--color-line)]">
      <div className="container-narrow flex items-center justify-between py-4 px-[clamp(1.25rem,4vw,3rem)]">
        <a href="#hero" className="font-display text-lg font-medium tracking-tight">
          人生鍛造所
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
