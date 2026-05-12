import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { getPublishedWritings } from "@/lib/writings";

// ISR — 每 60 秒重新抓一次 Supabase（在 Obsidian 校稿 → push 後最多 1 分鐘上線）
export const revalidate = 60;

export const metadata: Metadata = {
  title: "文章 — 人生鍛造所",
  description: "Josh 寫 AI 協作、閱讀、與一人公司的長文紀錄。日更短影片之外，把想得比較深的東西寫長一點。",
};

// published_at（ISO 字串）→ 2026.05.12
function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export default async function WritingsIndexPage() {
  const writings = await getPublishedWritings();

  return (
    <div className="min-h-screen flex flex-col">
      {/* 頁首 —— 沿用 /fonts 的「非首頁路由」pattern：自己的極簡 header，不掛 Nav（首頁錨點在這裡不存在） */}
      <header className="section !pb-12 border-b border-[color:var(--color-line)]">
        <div className="container-narrow">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="font-ui text-sm link-underline text-[color:var(--color-fg-muted)]"
            >
              ← 回首頁
            </Link>
            <span className="eyebrow">Writings</span>
          </div>

          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-tight text-[color:var(--color-ink)] mb-5">
            文章
          </h1>
          <p className="font-sans text-lg leading-[1.75] text-[color:var(--color-fg-muted)] max-w-2xl">
            日更短影片之外，把想得比較深的東西寫長一點。
            <br className="hidden sm:block" />
            AI 協作、閱讀、一人公司 —— 慢慢累積。
          </p>
        </div>
      </header>

      {/* 文章列表 OR 空狀態 */}
      <main className="section flex-1">
        <div className="container-narrow">
          {writings.length === 0 ? (
            <div className="border-t border-[color:var(--color-line-strong)] py-24 text-center">
              <p className="font-display text-2xl md:text-3xl text-[color:var(--color-ink)] mb-3">
                還在鍛造中
              </p>
              <p className="font-sans text-base text-[color:var(--color-fg-muted)]">
                第一篇文章很快會出現在這裡。
              </p>
            </div>
          ) : (
            <div className="border-t border-[color:var(--color-line-strong)]">
              {writings.map((w, idx) => {
                const date = formatDate(w.published_at);
                return (
                  <article
                    key={w.id}
                    className="grid lg:grid-cols-12 gap-8 py-12 border-b border-[color:var(--color-line-strong)] group"
                  >
                    {/* 編號 + 日期 + 閱讀時間 */}
                    <div className="lg:col-span-2">
                      <div className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)] mb-2">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="font-ui text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-fg-subtle)] flex flex-col gap-1">
                        {date && <time dateTime={w.published_at ?? undefined}>{date}</time>}
                        {w.reading_time != null && <span>{w.reading_time} 分鐘</span>}
                      </div>
                    </div>

                    {/* 封面預覽（可選 —— 沒有封面的文章直接讓標題/摘要佔滿） */}
                    {w.cover_image_url && (
                      <div className="lg:col-span-4">
                        <Link
                          href={`/writings/${w.slug}`}
                          aria-label={`讀「${w.title}」`}
                          className="block relative aspect-[4/3] overflow-hidden rounded-sm bg-[color:var(--color-bg-deep)]"
                        >
                          <Image
                            src={w.cover_image_url}
                            alt={w.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 30vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        </Link>
                      </div>
                    )}

                    {/* 標題 + 摘要 + 讀全文 */}
                    <div
                      className={`flex flex-col ${
                        w.cover_image_url ? "lg:col-span-6" : "lg:col-span-10"
                      }`}
                    >
                      <h2 className="font-display text-2xl md:text-3xl leading-tight text-[color:var(--color-ink)] mb-4 transition-colors duration-300 group-hover:text-[color:var(--color-accent)]">
                        <Link href={`/writings/${w.slug}`}>{w.title}</Link>
                      </h2>
                      {w.excerpt && (
                        <p className="font-sans text-base leading-[1.7] text-[color:var(--color-fg-muted)] mb-6">
                          {w.excerpt}
                        </p>
                      )}
                      <Link
                        href={`/writings/${w.slug}`}
                        className="link-underline font-sans text-sm font-medium mt-auto self-start"
                      >
                        讀全文 →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
