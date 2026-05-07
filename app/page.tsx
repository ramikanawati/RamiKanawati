import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { AICommandCenter } from "@/components/AICommandCenter";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { CreativeLab } from "@/components/CreativeLab";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Nav />
      <Hero />
      <About />
      <AICommandCenter />
      <Experience />
      <Projects />
      <CreativeLab />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
