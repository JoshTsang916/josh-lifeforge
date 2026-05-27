"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

type NavLink = { href: string; label: string };

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const prevOpenRef = useRef(false);

  // Portal mount 確認；用 rAF 包避免 react-hooks/set-state-in-effect lint rule
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
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

  // Dialog 開啟時：(1) 把 main / footer 設 inert，背景 SR / focus 都不能遊走
  //   ── 不 inert <nav>，因為 trigger button 在 nav 內，使用者要能點它關閉 dialog；
  //   ── 也不 inert Vercel Toolbar / Analytics 等注入到 body 直系的元素
  // (2) focus trap：Tab 在最後一個跳回第一個，Shift+Tab 在第一個跳到最後
  // (3) 開啟瞬間 focus 第一個選單項
  useEffect(() => {
    if (!open || !mounted) return;

    const dialog = document.getElementById("mobile-menu");
    if (!dialog) return;

    // 只 inert 我們自己加的 — 過濾掉原本就有 inert 的元素，cleanup 時才不會誤移除
    const inertTargets = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer")
    ).filter((el) => !el.hasAttribute("inert"));
    inertTargets.forEach((el) => el.setAttribute("inert", ""));

    const focusables = dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      inertTargets.forEach((el) => el.removeAttribute("inert"));
    };
  }, [open, mounted]);

  // 關閉後把 focus 還原到 trigger（只在 true → false 觸發，不在 initial mount 搶 focus）
  useEffect(() => {
    if (prevOpenRef.current && !open) {
      triggerRef.current?.focus();
    }
    prevOpenRef.current = open;
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
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
                {links.map((l, idx) => {
                  const inner = (
                    <>
                      <span className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-3xl text-[color:var(--color-ink)]">
                        {l.label}
                      </span>
                    </>
                  );
                  const className =
                    "flex items-baseline gap-4 py-5 border-b border-[color:var(--color-line)] hover:text-[color:var(--color-accent)] transition-colors";
                  return (
                    <li key={l.href}>
                      {l.href.startsWith("/") ? (
                        <Link href={l.href} onClick={() => setOpen(false)} className={className}>
                          {inner}
                        </Link>
                      ) : (
                        <a href={l.href} onClick={() => setOpen(false)} className={className}>
                          {inner}
                        </a>
                      )}
                    </li>
                  );
                })}
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
