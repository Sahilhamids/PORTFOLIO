import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import CodingProfiles from "./components/CodingProfiles";
import Experience from "./components/Experience";
import Resume from "./components/Resume";
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
        <Contact />
      </main>
      <Footer />
    </>
  );
}
