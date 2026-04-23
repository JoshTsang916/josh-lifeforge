export function About() {
  return (
    <section id="about" className="section bg-[color:var(--color-bg-muted)]">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left rail — number + label */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)]">
                02
              </span>
              <span className="h-px w-8 bg-[color:var(--color-line-strong)]" />
            </div>
            <h2 className="eyebrow">About</h2>
            <p className="font-display text-2xl md:text-3xl mt-4 leading-tight text-[color:var(--color-ink)]">
              關於人生鍛造所
            </p>
          </div>

          {/* Right — main copy */}
          <div className="lg:col-span-9 max-w-2xl">
            <p className="font-display text-3xl md:text-4xl leading-[1.3] text-[color:var(--color-ink)] mb-10">
              <span className="text-[color:var(--color-accent)]">
                我相信
              </span>
              ，下一個十年的職涯，
              不是會不會用 AI 的問題，
              是能不能{" "}
              <span className="text-[color:var(--color-accent)]">
                跟 AI 對話建出系統
              </span>{" "}
              的問題。
            </p>

            <div className="space-y-6 font-sans text-lg leading-[1.7] text-[color:var(--color-fg-muted)]">
              <p>
                我是 Josh。原本是高中數學老師，2024 年離開教職，
                把全部精力投入「AI × 教育」的第二曲線。
              </p>
              <p>
                這幾年我發現，大部分人對 AI 的想像，
                還停留在「叫 ChatGPT 寫一段文字」。
                但真正的可能性，是跟 AI 對話，建出一整套屬於自己的工作流。
              </p>
              <p>
                不需要會寫程式。
                需要的是把你的工作方式、決策過程、品味判斷，
                用清楚的語言講給 AI 聽。
                這個「講清楚」的能力，就是我教的東西。
              </p>
              <p className="text-[color:var(--color-fg)]">
                <span className="font-display text-[color:var(--color-accent)]">人生鍛造所</span>
                {" "}是我整理這套方法、累積案例、跟你一起打磨工作流的地方。
              </p>
            </div>

            {/* FORGE framework callout */}
            <div className="mt-16 p-8 border-t border-b border-[color:var(--color-line-strong)]">
              <div className="eyebrow mb-4">My framework</div>
              <p className="font-display text-2xl leading-tight text-[color:var(--color-ink)]">
                Context is King → 上下文工具箱 →{" "}
                <span className="text-[color:var(--color-accent)]">
                  FORGE 五步法
                </span>
              </p>
              <p className="mt-4 font-sans text-sm text-[color:var(--color-fg-muted)]">
                從脈絡建立、工具選用，到實際把 AI 接進你的日常。
                這是我教學、諮詢、寫作的核心骨架。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
