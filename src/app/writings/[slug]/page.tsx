import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Footer } from "@/components/Footer";
import { getPublishedWritings, getWritingBySlug } from "@/lib/writings";

// ISR — 每 60 秒重新抓一次（校稿 → push 後最多 1 分鐘上線）
export const revalidate = 60;

// build 時把已發佈文章預先 render（Supabase 連不上時回空陣列 → 全部改 on-demand，
// dynamicParams 預設 true 所以新文章不必重 build 也能讀到）
export async function generateStaticParams() {
  const writings = await getPublishedWritings();
  return writings.map((w) => ({ slug: w.slug }));
}

type Props = { params: Promise<{ slug: string }> };

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const writing = await getWritingBySlug(slug);
  if (!writing) return { title: "找不到文章 — 人生鍛造所" };

  const description = writing.excerpt ?? undefined;
  const images = writing.cover_image_url ? [writing.cover_image_url] : undefined;
  return {
    title: `${writing.title} — 人生鍛造所`,
    description,
    openGraph: {
      title: writing.title,
      description,
      type: "article",
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: writing.title,
      description,
      ...(images ? { images } : {}),
    },
  };
}

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;
  const writing = await getWritingBySlug(slug);
  if (!writing) notFound();

  const date = formatDate(writing.published_at);

  return (
    <article>
      {/* 頂部導覽列 —— 沿用 /fonts 的「非首頁路由」pattern：自己的極簡 header，不掛 Nav（首頁錨點在這裡不存在） */}
      <div className="section !py-8 border-b border-[color:var(--color-line)]">
        <div className="container-narrow">
          <Link
            href="/writings"
            className="font-ui text-sm link-underline text-[color:var(--color-fg-muted)]"
          >
            ← 回文章列表
          </Link>
        </div>
      </div>

      {/* 文章主體 —— header / body / 文末導覽 共用一個 .section、置中閱讀欄寬度一致 */}
      <div className="section">
        <div className="container-narrow">
          <div className="mx-auto max-w-2xl">
            {/* 標題區 */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-6 font-ui text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-fg-subtle)]">
              <span>Writings</span>
              {date && (
                <>
                  <span className="h-px w-6 bg-[color:var(--color-line-strong)]" />
                  <time dateTime={writing.published_at ?? undefined}>{date}</time>
                </>
              )}
              {writing.reading_time != null && (
                <>
                  <span className="h-px w-6 bg-[color:var(--color-line-strong)]" />
                  <span>{writing.reading_time} 分鐘</span>
                </>
              )}
            </div>

            <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.2] text-[color:var(--color-ink)] text-balance">
              {writing.title}
            </h1>

            {writing.excerpt && (
              <p className="mt-6 font-sans text-lg leading-[1.75] text-[color:var(--color-fg-muted)]">
                {writing.excerpt}
              </p>
            )}

            {writing.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 font-ui text-xs text-[color:var(--color-fg-subtle)]">
                {writing.tags.map((t) => (
                  <span key={t}>#{t}</span>
                ))}
              </div>
            )}

            {/* 內文 ——
               body_md 只來自 Supabase（Josh / Claude 經 RLS-protected MCP 寫入，無公開寫入路徑），
               屬可信內容，故用 rehype-raw 允許內嵌 HTML（Phase 2 的 <audio> / <iframe> 投影片要用）。 */}
            <div className="article-prose mt-12 md:mt-16">
              <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  // 外部連結（http/https）開新分頁，對齊全站慣例（Footer / Daily 等）
                  a: ({ href, children, ...props }) => {
                    const external = !!href && /^https?:\/\//.test(href);
                    return (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        {...props}
                      >
                        {children}
                      </a>
                    );
                  },
                }}
              >
                {writing.body_md}
              </Markdown>
            </div>

            {/* 文末導覽 */}
            <div className="mt-16 border-t border-[color:var(--color-line-strong)] pt-10 flex flex-wrap gap-x-8 gap-y-3">
              <Link
                href="/writings"
                className="font-ui text-sm link-underline text-[color:var(--color-fg-muted)]"
              >
                ← 回文章列表
              </Link>
              <Link
                href="/"
                className="font-ui text-sm link-underline text-[color:var(--color-fg-muted)]"
              >
                回首頁
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </article>
  );
}
