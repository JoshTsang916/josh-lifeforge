type Service = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  forWho: string;
  cta: string;
};

const services: Service[] = [
  {
    number: "01",
    title: "工作坊",
    subtitle: "Workshops",
    description:
      "半天到一天的實作型工作坊。從你的真實工作場景出發，現場跟 AI 對話，把一套屬於你的工作流建出來。離開教室時帶走的不是筆記，是能繼續用的系統。",
    forWho: "團隊、學校、企業內訓",
    cta: "邀約工作坊",
  },
  {
    number: "02",
    title: "1 對 1 諮詢",
    subtitle: "1-on-1 Consulting",
    description:
      "60 分鐘對話，針對你的內容工作流、學習方法、職涯轉型給出可執行建議。不是泛泛的勵志談話，是看著你的實際素材，跟你一起拆解、重組、找出下一步。",
    forWho: "個人創作者、教育工作者、轉型中的專業人士",
    cta: "預約 1:1",
  },
  {
    number: "03",
    title: "演講邀約",
    subtitle: "Speaking",
    description:
      "30 到 90 分鐘的主題演講。聚焦在「AI 不是工具，是新的對話夥伴」、「如何不寫程式也能用對話建系統」、「教育者如何看見 AI 帶來的真機會」這些主題。",
    forWho: "教育機構、產業活動、讀書會",
    cta: "邀約演講",
  },
];

export function Services() {
  return (
    <section id="services" className="section">
      <div className="container-narrow">
        {/* Section header */}
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)]">
                03
              </span>
              <span className="h-px w-8 bg-[color:var(--color-line-strong)]" />
            </div>
            <h2 className="eyebrow">Services</h2>
            <p className="font-display text-2xl md:text-3xl mt-4 leading-tight text-[color:var(--color-ink)]">
              我提供什麼
            </p>
          </div>
          <div className="lg:col-span-9 max-w-2xl">
            <p className="font-display text-2xl md:text-3xl leading-[1.4] text-[color:var(--color-ink)]">
              三種協作形式，
              對應三種你可能正在面對的處境。
            </p>
            <p className="mt-6 font-sans text-base text-[color:var(--color-fg-muted)]">
              如果你還在猶豫哪一種適合你，
              直接寫信跟我聊，我會誠實告訴你哪個有用、哪個不必。
            </p>
          </div>
        </div>

        {/* Service list — editorial table-like layout */}
        <div className="border-t border-[color:var(--color-line-strong)]">
          {services.map((service) => (
            <article
              key={service.number}
              className="grid lg:grid-cols-12 gap-8 py-12 border-b border-[color:var(--color-line-strong)] group"
            >
              <div className="lg:col-span-2">
                <div className="font-mono text-sm tabular-nums text-[color:var(--color-fg-subtle)] mb-2">
                  {service.number}
                </div>
                <div className="eyebrow">{service.subtitle}</div>
              </div>

              <div className="lg:col-span-7">
                <h3 className="font-display text-3xl md:text-4xl leading-tight text-[color:var(--color-ink)] mb-4 group-hover:text-[color:var(--color-accent)] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="font-sans text-base leading-[1.7] text-[color:var(--color-fg-muted)] mb-4">
                  {service.description}
                </p>
                <p className="font-sans text-sm text-[color:var(--color-fg-subtle)]">
                  <span className="text-[color:var(--color-fg)]">適合 </span>
                  {service.forWho}
                </p>
              </div>

              <div className="lg:col-span-3 flex lg:justify-end items-start">
                <a
                  href="#contact"
                  className="link-underline font-sans text-sm font-medium"
                >
                  {service.cta} →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
