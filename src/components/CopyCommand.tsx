"use client";

import { useEffect, useRef, useState } from "react";

// 一鍵複製安裝指令。
// 三態：預設「複製」→ hover（磚紅）→ 已複製（抹茶綠，2 秒後復原）。
// 按壓 scale 0.97 呼應全站 .btn 的觸覺回饋；複製失敗時靜默（指令本身可見、使用者仍可手動選取）。
export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  // 存復原 timer：避免 2 秒內快速連點時，舊 timer 提前把「已複製」清掉（race）
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API 不可用（非 secure context / 權限被拒）—— 指令仍顯示在畫面上，可手動選取複製
    }
  };

  // unmount 時清掉未完成的 timer，避免對已卸載元件 setState
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-sm border border-[color:var(--color-line-strong)] bg-[color:var(--color-bg)] shadow-[0_2px_10px_rgba(92,64,51,0.06)] sm:w-auto sm:flex-row sm:items-stretch">
      <code className="flex flex-1 items-center gap-2 overflow-x-auto px-4 py-3.5 font-mono text-xs text-[color:var(--color-ink)] sm:text-sm">
        <span className="select-none text-[color:var(--color-fg-subtle)]">$</span>
        <span className="whitespace-nowrap">{command}</span>
      </code>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="複製安裝指令到剪貼簿"
        className={[
          "flex shrink-0 items-center justify-center border-t border-[color:var(--color-line-strong)] px-5 py-3 font-ui text-sm font-medium transition-[background-color,color,transform] duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--color-accent)] sm:border-l sm:border-t-0",
          copied
            ? "bg-[color:var(--color-reading)] text-[color:var(--color-bg)]"
            : "bg-[color:var(--color-bg-muted)] text-[color:var(--color-fg-muted)] hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-bg)]",
        ].join(" ")}
      >
        <span aria-live="polite">{copied ? "已複製" : "複製"}</span>
      </button>
    </div>
  );
}
