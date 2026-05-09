"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "@/app/actions/contact";

const SERVICES = [
  { value: "workshop", title: "工作坊", subtitle: "Workshops" },
  { value: "consulting", title: "1 對 1 諮詢", subtitle: "Consulting" },
  { value: "speaking", title: "演講邀約", subtitle: "Speaking" },
  { value: "build", title: "一起把它蓋出來", subtitle: "Build With Me" },
] as const;

const initialState: ContactState = { ok: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? "寄送中…" : "送出 →"}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);

  if (state.ok) {
    // 成功狀態：原地替換為寧靜訊息，不跳轉
    return (
      <div className="border border-[color:var(--color-line-strong)] p-8 md:p-10">
        <div className="eyebrow mb-4">已收到</div>
        <p className="font-display text-2xl md:text-3xl leading-[1.4] text-[color:var(--color-ink)] mb-4">
          我會在一週內回信給你。
        </p>
        <p className="font-sans text-base leading-[1.7] text-[color:var(--color-fg-muted)]">
          在那之前，歡迎到{" "}
          <a href="#daily" className="link-underline text-[color:var(--color-accent)]">
            Daily
          </a>{" "}
          看我每日記錄的片段，或讀{" "}
          <a href="#about" className="link-underline text-[color:var(--color-accent)]">
            About
          </a>{" "}
          了解更多我在做的事。
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-10" noValidate>
      {/* Honeypot — 視覺隱藏；真人看不到不會填，bot 自動填 form 會踩到 */}
      <div aria-hidden="true" className="absolute opacity-0 pointer-events-none -z-10 h-0 overflow-hidden">
        <label>
          公司（請勿填寫）
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* 想討論的服務 */}
      <fieldset>
        <legend className="eyebrow mb-4">想討論的服務</legend>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SERVICES.map((s) => (
            <label
              key={s.value}
              className="group relative flex flex-col gap-1 p-4 border border-[color:var(--color-line-strong)] cursor-pointer transition-colors hover:border-[color:var(--color-accent)] has-[:checked]:border-[color:var(--color-accent)] has-[:checked]:bg-[color:var(--color-bg-muted)]"
            >
              <input
                type="radio"
                name="service"
                value={s.value}
                required
                className="sr-only peer"
                defaultChecked={s.value === "workshop"}
              />
              <span className="font-display text-base text-[color:var(--color-ink)] peer-checked:text-[color:var(--color-accent)]">
                {s.title}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-subtle)]">
                {s.subtitle}
              </span>
            </label>
          ))}
        </div>
        {state.fieldErrors?.service && (
          <p className="font-sans text-sm text-[color:var(--color-accent)] mt-3">
            {state.fieldErrors.service}
          </p>
        )}
      </fieldset>

      {/* 你怎麼稱呼 */}
      <div>
        <label htmlFor="contact-name" className="eyebrow mb-3 block">
          你怎麼稱呼
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          required
          maxLength={50}
          autoComplete="name"
          placeholder="Tom、張小姐、小楊...都行"
          className="w-full font-display text-lg bg-transparent border-0 border-b-[1.5px] border-[color:var(--color-line-strong)] py-2 text-[color:var(--color-ink)] placeholder:text-[color:var(--color-fg-subtle)] focus:border-[color:var(--color-accent)] focus:outline-none transition-colors"
        />
        {state.fieldErrors?.name && (
          <p className="font-sans text-sm text-[color:var(--color-accent)] mt-2">
            {state.fieldErrors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="eyebrow mb-3 block">
          你的 Email
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="your@email.com"
          className="w-full font-display text-lg bg-transparent border-0 border-b-[1.5px] border-[color:var(--color-line-strong)] py-2 text-[color:var(--color-ink)] placeholder:text-[color:var(--color-fg-subtle)] focus:border-[color:var(--color-accent)] focus:outline-none transition-colors"
        />
        {state.fieldErrors?.email && (
          <p className="font-sans text-sm text-[color:var(--color-accent)] mt-2">
            {state.fieldErrors.email}
          </p>
        )}
      </div>

      {/* 想聊的內容 */}
      <div>
        <label htmlFor="contact-message" className="eyebrow mb-3 block">
          想聊的內容
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          placeholder={"告訴我：\n・你目前在做什麼（工作 / 學習 / 創作）\n・卡在哪個環節\n・30 分鐘後想帶走什麼"}
          className="w-full font-sans text-base leading-[1.7] bg-transparent border border-[color:var(--color-line-strong)] p-4 text-[color:var(--color-ink)] placeholder:text-[color:var(--color-fg-subtle)] focus:border-[color:var(--color-accent)] focus:outline-none transition-colors resize-y"
        />
        {state.fieldErrors?.message && (
          <p className="font-sans text-sm text-[color:var(--color-accent)] mt-2">
            {state.fieldErrors.message}
          </p>
        )}
      </div>

      {state.error && !state.fieldErrors && (
        <p className="font-sans text-sm text-[color:var(--color-accent)]">{state.error}</p>
      )}

      <div className="pt-2">
        <SubmitButton />
      </div>
    </form>
  );
}
