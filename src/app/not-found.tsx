import Link from "next/link";

export const metadata = {
  title: "找不到這頁 — 人生鍛造所",
};

export default function NotFound() {
  return (
    <main className="section min-h-[80svh] flex items-center">
      <div className="container-narrow text-center max-w-xl mx-auto">
        <p className="eyebrow mb-4">404</p>
        <h1 className="font-display text-4xl md:text-6xl leading-tight text-[color:var(--color-ink)] mb-6">
          找不到這頁
        </h1>
        <p className="font-sans text-lg leading-[1.7] text-[color:var(--color-fg-muted)] mb-10">
          你點的連結可能已經移除，或是網址打錯了。
        </p>
        <Link href="/" className="btn btn-primary">
          回首頁
        </Link>
      </div>
    </main>
  );
}
