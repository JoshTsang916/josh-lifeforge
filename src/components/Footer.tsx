export function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-line-strong)] section !py-16">
      <div className="container-narrow">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <p className="font-display text-2xl text-[color:var(--color-ink)] mb-2">
              人生鍛造所
            </p>
            <p className="font-sans text-sm text-[color:var(--color-fg-muted)]">
              Lifeforge Studio
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3">Connect</p>
            <ul className="space-y-2 font-sans text-sm">
              <li><a href="#" className="link-underline">Threads</a></li>
              <li><a href="#" className="link-underline">Instagram</a></li>
              <li><a href="#" className="link-underline">YouTube</a></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3">Reach out</p>
            <ul className="space-y-2 font-sans text-sm">
              <li><a href="mailto:hi@example.com" className="link-underline">hi@example.com</a></li>
              <li className="text-[color:var(--color-fg-subtle)]">[email placeholder — need real address]</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[color:var(--color-line)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-sans text-xs text-[color:var(--color-fg-subtle)]">
            © {new Date().getFullYear()} 人生鍛造所. All rights reserved.
          </p>
          <p className="font-sans text-xs text-[color:var(--color-fg-subtle)]">
            Built with intention. Designed in Taiwan.
          </p>
        </div>
      </div>
    </footer>
  );
}
