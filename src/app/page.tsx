import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { RecentWork } from "@/components/RecentWork";
import { Writings } from "@/components/Writings";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const revalidate = 3600; // ISR：Writings 區塊每小時從 Supabase ig_posts 重抓

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
        <Writings />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
