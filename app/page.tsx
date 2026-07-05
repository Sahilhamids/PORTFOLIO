import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LinkPreview from "./components/LinkPreview";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import CodingProfiles from "./components/CodingProfiles";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="brutal-border-x border-white/10 max-w-7xl mx-auto">
        <Hero />
        
        {/* Link Preview Demo Section */}
        <section className="py-20 border-b brutal-border-b px-6 grid-bg relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
             <p className="text-cyan-400 font-mono text-sm uppercase tracking-widest mb-6 border border-cyan-500/30 px-3 py-1 bg-cyan-500/10">Dynamic Link Preview</p>
             <LinkPreview url="https://github.com/Sahilhamids" />
          </div>
        </section>

        <About />
        <Projects />
        <Skills />
        <CodingProfiles />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
