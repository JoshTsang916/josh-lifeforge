import Image from "next/image";

type Work = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
};

const works: Work[] = [
  {
    id: "workshop-n8n",
    title: "n8n Automation Workshop",
    subtitle: "From Learner to Builder",
    description:
      "帶學員從 AI 的使用者，走到能自己 build 自動化系統的位置。結業時每個人都有一份自己做出來、真的在跑的 workflow——不是 demo 而已。",
    image: "/photos/workshop-n8n-3.jpg",
    imageAlt: "n8n workshop 結業合照，學員手持 Automation Builder 結業證書",
  },
  {
    id: "talk-ai-forum",
    title: "80 字的魔法",
    subtitle: "為未來而引導學會 × AI 分享會",
    description:
      "談上下文脈絡怎麼決定你跟 AI 對話的品質。不是 prompt 技巧，是更上游的「脈絡建立」——這是我看到大部分人卡住的地方。",
    image: "/photos/talk-ai-forum-moment.jpg",
    imageAlt: "為未來而引導學會 AI 分享會現場",
  },
  {
    id: "talk-neuroplasticity",
    title: "騎象人學會了與大象共處",
    subtitle: "HPX × Wee 讀書會 — 神經可塑性",
    description:
      "用 50 分鐘講 The Brain That Changes Itself 這本書，配上我自己 7 次公開演講緊張程度的真實變化軌跡，說明大腦是怎麼被重塑的。",
    image: "/photos/talk-neuroplasticity-solo.jpg",
    imageAlt: "Josh 在 HPX 神經可塑性說書會講「騎象人學會了與大象共處」",
  },
];

export function RecentWork() {
  return (
    <section id="work" className="section bg-[color:var(--color-bg-muted)]">
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
            <h2 className="eyebrow">Recent Work</h2>
            <p className="font-display text-2xl md:text-3xl mt-4 leading-tight text-[color:var(--color-ink)]">
              近期作品
            </p>
          </div>
          <div className="lg:col-span-9 max-w-2xl">
            <p className="font-display text-2xl md:text-3xl leading-[1.4] text-[color:var(--color-ink)]">
              教過的場、講過的主題，留下一點痕跡。
            </p>
            <p className="mt-6 font-sans text-base text-[color:var(--color-fg-muted)]">
              想在你的團隊、讀書會、學會內部辦一場？寫信跟我聊。
            </p>
          </div>
        </div>

        {/* Work cards — editorial stack */}
        <div className="border-t border-[color:var(--color-line-strong)]">
          {works.map((work, idx) => (
            <article
              key={work.id}
              className="grid lg:grid-cols-12 gap-8 py-12 border-b border-[color:var(--color-line-strong)]"
            >
              <div className="lg:col-span-2">
                <div className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)] mb-2">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="eyebrow">{work.subtitle}</div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  <Image
                    src={work.image}
                    alt={work.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-5">
                <h3 className="font-display text-2xl md:text-3xl leading-tight text-[color:var(--color-ink)] mb-4">
                  {work.title}
                </h3>
                <p className="font-sans text-base leading-[1.7] text-[color:var(--color-fg-muted)]">
                  {work.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
