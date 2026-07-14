import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ForgeSection } from "@/components/ForgeSection";
import { Services } from "@/components/Services";
import { Builds } from "@/components/Builds";
import { RecentWork } from "@/components/RecentWork";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

// Section 順序（2026-07-14 About 退位，REBUILD-PLAN 06）：
// 先讓客戶認出「你能幫我」（服務→實戰），再認同「你是誰」（About）。
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ForgeSection />
        <Services />
        <Builds />
        <About />
        <RecentWork />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
