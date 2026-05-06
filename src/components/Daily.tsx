import Image from "next/image";

type IgVideo = {
  day: string;
  title: string;
  lede: string;
  date: string;
  thumbnail: string;
  permalink: string;
};

// 精選日更短影片（手選自 Supabase ig_posts 中 likes 較高、主題分散的幾則）
const videos: IgVideo[] = [
  {
    day: "Day 33",
    title: "寫給人生的提示詞",
    lede:
      "大家很會寫給 AI 的提示詞，那寫給自己人生的呢？閱讀是樸素的解藥——每一頁、每一行咀嚼過的文字，都是你寫給未來自己的提示詞。",
    date: "2026.05.03",
    thumbnail: "/photos/writings/day33.jpg",
    permalink: "https://www.instagram.com/reel/DX4IsVaJqV7/",
  },
  {
    day: "Day 31",
    title: "我以前肯定不會錄這個影片",
    lede:
      "分享是初衷，但以前大腦會用盡全力阻擋我。現在它還在阻擋，只是我變強了。如果你也站在「要不要做」的邊緣，歡迎留言或私訊。",
    date: "2026.05.01",
    thumbnail: "/photos/writings/day31.jpg",
    permalink: "https://www.instagram.com/reel/DXzGaTZJles/",
  },
  {
    day: "Day 25",
    title: "CLI——AI 的母語",
    lede:
      "CLI 從工程師專屬詞彙，變成 AI 的共同語言。Claude Code 能幫你剪片、整理檔案、開瀏覽器，因為它住進你的電腦，用 CLI 一行行下指令幫你做事。",
    date: "2026.04.25",
    thumbnail: "/photos/writings/day25.jpg",
    permalink: "https://www.instagram.com/reel/DXjCzLRCZaV/",
  },
  {
    day: "Day 24",
    title: "幫 AI 裝備一支遙控器",
    lede:
      "MCP 就是給 AI 的遙控器——它本身不做事，只是橋樑，讓 AI 直接抓你的資料、操控你的工具。新手與高手的差距，可能就在這支遙控器。",
    date: "2026.04.24",
    thumbnail: "/photos/writings/day24.jpg",
    permalink: "https://www.instagram.com/reel/DXgr7wmiVTj/",
  },
];

export function Daily() {
  return (
    <section id="daily" className="section">
      <div className="container-narrow">
        {/* Section header */}
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)]">
                06
              </span>
              <span className="h-px w-8 bg-[color:var(--color-line-strong)]" />
            </div>
            <h2 className="eyebrow">Daily</h2>
            <p className="font-display text-2xl md:text-3xl mt-4 leading-tight text-[color:var(--color-ink)]">
              日更短影片
            </p>
          </div>
          <div className="lg:col-span-9 max-w-2xl">
            <p className="font-display text-2xl md:text-3xl leading-[1.4] text-[color:var(--color-ink)]">
              每天一支短影片，不為什麼，只為經歷與累積。
            </p>
            <p className="mt-6 font-sans text-base text-[color:var(--color-fg-muted)]">
              在 AI 與閱讀的交界處，一天一錘，鑄下屬於自己的紋路。
            </p>
            <a
              href="https://www.instagram.com/josh_lifeforge/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-6 inline-block font-sans text-sm font-medium"
            >
              看完整日更 →
            </a>
          </div>
        </div>

        {/* Video list — editorial stack */}
        <div className="border-t border-[color:var(--color-line-strong)]">
          {videos.map((v) => (
            <article
              key={v.day}
              className="grid lg:grid-cols-12 gap-8 py-12 border-b border-[color:var(--color-line-strong)] group"
            >
              <div className="lg:col-span-2">
                <div className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)] mb-2">
                  {v.day}
                </div>
                <time className="font-ui text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-fg-subtle)]">
                  {v.date}
                </time>
              </div>

              <div className="lg:col-span-4">
                <a
                  href={v.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`在 Instagram 看「${v.title}」`}
                  className="block relative aspect-[3/4] overflow-hidden rounded-sm bg-[color:var(--color-bg-deep)]"
                >
                  <Image
                    src={v.thumbnail}
                    alt={`${v.day} — ${v.title}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </a>
              </div>

              <div className="lg:col-span-6 flex flex-col">
                <h3 className="font-display text-2xl md:text-3xl leading-tight text-[color:var(--color-ink)] mb-4 group-hover:text-[color:var(--color-accent)] transition-colors duration-300">
                  {v.title}
                </h3>
                <p className="font-sans text-base leading-[1.7] text-[color:var(--color-fg-muted)] mb-6">
                  {v.lede}
                </p>
                <a
                  href={v.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline font-sans text-sm font-medium mt-auto self-start"
                >
                  在 Instagram 看完整 →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
