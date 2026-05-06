"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type NavLink = { href: string; label: string };

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 確認 client 端 mount 完成才能用 Portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // 開啟時鎖住背景滾動
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Esc 關閉
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="md:hidden p-2 -mr-2 relative z-50 text-[color:var(--color-ink)]"
        aria-label={open ? "關閉選單" : "開啟選單"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </>
          ) : (
            <>
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </>
          )}
        </svg>
      </button>

      {mounted && open &&
        createPortal(
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="主選單"
            className="fixed inset-0 z-40 bg-[color:var(--color-bg)] md:hidden overflow-y-auto"
          >
            <div className="container-narrow px-[clamp(1.25rem,4vw,3rem)] pt-28 pb-16">
              <ul className="flex flex-col">
                {links.map((l, idx) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-5 border-b border-[color:var(--color-line)] hover:text-[color:var(--color-accent)] transition-colors"
                    >
                      <span className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-3xl text-[color:var(--color-ink)]">
                        {l.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn btn-primary mt-10 w-full justify-center"
              >
                預約諮詢
              </a>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
