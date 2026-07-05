import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import CodingProfiles from "./components/CodingProfiles";
import Experience from "./components/Experience";
import Resume from "./components/Resume";
import ComingSoon from "./components/ComingSoon";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main className="brutal-border-x border-white/10 max-w-7xl mx-auto">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <CodingProfiles />
        <Experience />
        <Resume />
        <ComingSoon
          id="blog"
          label="Thoughts & Writing"
          title="Technical Blog"
          accent="var(--purple)"
          description="Deep dives on backend architecture, DSA patterns, and AI tooling. Writing in progress — check back soon."
          eta="Q3 2025"
        />
        <ComingSoon
          id="testimonials"
          label="What Others Say"
          title="Recommendations"
          accent="var(--cyan)"
          description="Collecting recommendations from teammates, professors, and collaborators. Coming shortly."
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
