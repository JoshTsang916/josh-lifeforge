import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { RecentWork } from "@/components/RecentWork";
import { Daily } from "@/components/Daily";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <RecentWork />
        <Daily />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
