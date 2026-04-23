import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { RecentWork } from "@/components/RecentWork";
import { Writings } from "@/components/Writings";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const revalidate = 3600; // ISR: refresh Writings from Supabase hourly

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <RecentWork />
        <Writings />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
