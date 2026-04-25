import Image from "next/image";

export function About() {
  return (
    <section id="about" className="section bg-[color:var(--color-bg-muted)]">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left rail — number + label + photo */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs tabular-nums text-[color:var(--color-fg-subtle)]">
                02
              </span>
              <span className="h-px w-8 bg-[color:var(--color-line-strong)]" />
            </div>
            <h2 className="eyebrow">About</h2>
            <p className="font-display text-2xl md:text-3xl mt-4 leading-tight text-[color:var(--color-ink)] mb-8">
              關於人生鍛造所
            </p>
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm max-w-xs">
              <Image
                src="/photos/talk-ai-forum-solo.jpg"
                alt="Josh 在為未來而引導學會 AI 分享會講「80 字的魔法」"
                fill
                sizes="(max-width: 1024px) 80vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right — main copy */}
          <div className="lg:col-span-9 max-w-2xl">
            <p className="eyebrow mb-4">我是 Josh</p>
            <p className="font-display text-3xl md:text-4xl leading-[1.3] text-[color:var(--color-ink)] mb-10">
              我相信每個人都有自己{" "}
              <span className="text-[color:var(--color-accent)]">
                真心想做的事情
              </span>
              ，那個聲音總在身邊低語。
            </p>

            <div className="space-y-6 font-sans text-lg leading-[1.8] text-[color:var(--color-fg-muted)]">
              <p>
                而踏上旅途，把這件事找出來，然後把想做的、想分享的，跟世界做交換，是一生的追尋。
                幸運活在 AI 時代的我們，可以讓 AI 來幫我們分擔許多事、節省許多時間，讓我們即便只有一個人，也可以踏上這條路。
              </p>
              <p>
                在這條追尋的路上，有兩件事情格外重要。
              </p>
              <p>
                <span className="text-[color:var(--color-fg)] font-medium">第一是 AI 的使用。</span>
                我們必須要刻意去練習，不只是與他聊天，而是要讓他操控你的電腦、碰觸你的資料，使用並理解他，直到你能駕馭它，才能達到 10 倍甚至百倍的效果。
              </p>
              <p>
                <span className="text-[color:var(--color-fg)] font-medium">第二是閱讀。</span>
                在這個知識看似垂手可得的時代，我們必須了解真正的知識從來都不是速食，沒有沈澱的知識並不會留下來，只會不著痕跡的滑過大腦的間隙。而閱讀本身要求我們靜下來，去思索、去整理知識，跟自己的現狀碰撞出新的自己。
              </p>
              <p>
                一個向外，利用 AI 鍛造工具，一個向內，利用閱讀鍛造自己。最終讓自己進入更好的狀態，更接近真實的自己，也更富足、自由的狀態。
              </p>
              <p>
                學習需要時間，神經重塑需要時間，改變需要時間，成長需要時間。
                時間不可逆也無法加速，對每個人都公平。
                慢，並非拖延，只是一種必然的進展。
              </p>
              <p className="text-[color:var(--color-fg)] font-medium">
                『不急』，是相信時間，也相信自己。
              </p>
              <p>
                與其像是踏上社會賦予的倉鼠輪子不斷追逐快錢，
                不如放心去做想做的事，然後做對該做的事。
                一旦你有足夠的能力與世界做交換，財富自然會來。
              </p>
              <p>
                於是，你和你的 AI 員工專注在自己的領域，由它幫你處理庶務、搜集資料、剪輯影片。
                一台筆電在手，天下我有。可以在任何地方工作，享受不被綁住的自由。
              </p>
              <p className="text-[color:var(--color-fg)]">
                我會把走過的路寫下來，希望對你有用。如果你也想走這條路，歡迎讀我寫的東西，或來聊聊 AI 怎麼在你身上落地。
              </p>
            </div>

            {/* FORGE framework callout — TODO: Josh 親寫副標描述 */}
            <div className="mt-16 p-8 border-t border-b border-[color:var(--color-line-strong)]">
              <div className="eyebrow mb-4">AI 互動方法論</div>
              <p className="font-display text-2xl leading-tight text-[color:var(--color-ink)]">
                Context is King → 上下文工具箱 →{" "}
                <span className="text-[color:var(--color-accent)]">
                  FORGE 五步法
                </span>
              </p>
              <p className="mt-4 font-sans text-sm text-[color:var(--color-fg-muted)] italic">
                [副標待 Josh 親寫，原 AI 生版本已拋棄]
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
