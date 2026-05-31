import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ForgeSection } from "@/components/ForgeSection";
import { Services } from "@/components/Services";
import { RecentWork } from "@/components/RecentWork";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <ForgeSection />
        <Services />
        <RecentWork />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
