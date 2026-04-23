import { getSupabase, type ContentRow } from "@/lib/supabase";

function excerpt(body: string | null, len = 120): string {
  if (!body) return "";
  const clean = body.replace(/\s+/g, " ").trim();
  return clean.length > len ? clean.slice(0, len) + "…" : clean;
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

async function fetchArticles(): Promise<ContentRow[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("contents")
    .select("id, title, body, tags, published_at")
    .eq("type", "article")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false });
  if (error) {
    console.error("[Writings] fetch failed:", error.message);
    return [];
  }
  return (data ?? []) as ContentRow[];
}

export async function Writings() {
  const articles = await fetchArticles();

  return (
    <section id="writings" className="section">
      <div className="container-narrow">
        {/* Section header */}
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)]">
                05
              </span>
              <span className="h-px w-8 bg-[color:var(--color-line-strong)]" />
            </div>
            <h2 className="eyebrow">Writings</h2>
            <p className="font-display text-2xl md:text-3xl mt-4 leading-tight text-[color:var(--color-ink)]">
              寫下來的思考
            </p>
          </div>
          <div className="lg:col-span-9 max-w-2xl">
            <p className="font-display text-2xl md:text-3xl leading-[1.4] text-[color:var(--color-ink)]">
              我想清楚了，才會寫下來。
            </p>
            <p className="mt-6 font-sans text-base text-[color:var(--color-fg-muted)]">
              關於 AI、教育、自我鍛造的文章。不追熱點，
              只寫我真的有把握、願意為之負責的內容。
            </p>
          </div>
        </div>

        {/* Article list */}
        {articles.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="border-t border-[color:var(--color-line-strong)]">
            {articles.map((article, idx) => (
              <article
                key={article.id}
                className="grid lg:grid-cols-12 gap-6 py-10 border-b border-[color:var(--color-line-strong)] group"
              >
                <div className="lg:col-span-2 flex flex-col gap-1">
                  <span className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <time className="font-ui text-xs tracking-wide text-[color:var(--color-fg-subtle)]">
                    {formatDate(article.published_at)}
                  </time>
                </div>

                <div className="lg:col-span-10">
                  <h3 className="font-display text-2xl md:text-3xl leading-tight text-[color:var(--color-ink)] mb-3 group-hover:text-[color:var(--color-accent)] transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="font-sans text-base leading-[1.7] text-[color:var(--color-fg-muted)] mb-4">
                    {excerpt(article.body, 140)}
                  </p>
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {article.tags
                        .filter(
                          (t) =>
                            !t.startsWith("workflow_dir:") &&
                            !t.startsWith("platform:") &&
                            !t.startsWith("supersedes:") &&
                            !t.startsWith("forge:"),
                        )
                        .slice(0, 4)
                        .map((tag) => (
                          <span
                            key={tag}
                            className="font-ui text-[11px] tracking-wide text-[color:var(--color-fg-subtle)] px-2 py-0.5 border border-[color:var(--color-line)]"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="border-t border-b border-[color:var(--color-line-strong)] py-20 text-center">
      <p className="font-display text-2xl text-[color:var(--color-ink)] mb-3">
        文章累積中
      </p>
      <p className="font-sans text-sm text-[color:var(--color-fg-muted)] max-w-md mx-auto">
        [Supabase 連線未設定或暫無已發布文章]
      </p>
    </div>
  );
}

export const revalidate = 3600;
