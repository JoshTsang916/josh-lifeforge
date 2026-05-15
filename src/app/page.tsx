import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { RecentWork } from "@/components/RecentWork";
import { Testimonials } from "@/components/Testimonials";
import { Daily } from "@/components/Daily";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

// 每小時重 render 一次 — Daily 區塊的「日更幾天」是 server-side 從 2026-04-01 算
// 沒 ISR 的話 build time 就釘住，永遠不會跨日跳動
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <RecentWork />
        <Testimonials />
        <Daily />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
