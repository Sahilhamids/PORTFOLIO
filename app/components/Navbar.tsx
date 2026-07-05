"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const links = ["about", "projects", "skills", "experience", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      
      const sections = links.map(l => document.getElementById(l));
      const scrollY = window.scrollY;
      
      let current = "";
      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollY >= sectionTop - 100) {
            current = section.id;
          }
        }
      });
      setActiveLink(current);
    };
    
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md brutal-border-b shadow-lg' : 'border-b border-transparent'}`}
      style={{ background: scrolled ? "color-mix(in srgb, var(--bg) 85%, transparent)" : "transparent" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#hero" className="text-[var(--text)] font-bold tracking-widest text-sm hover:text-[var(--cyan)] transition-colors" style={{ letterSpacing: "0.2em" }}>
          SHS<span className="text-cyan-500">.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a 
              key={l} 
              href={`#${l}`} 
              className={`relative px-4 py-2 capitalize text-sm font-medium transition-colors ${activeLink === l ? 'text-[var(--cyan)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
              onClick={() => setActiveLink(l)}
            >
              {l}
              {activeLink === l && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--cyan)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
          <div className="ml-4 flex items-center gap-4 border-l border-[var(--border)] pl-4">
            <ThemeToggle />
            <a
              href="https://github.com/Sahilhamids"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-1.5 px-4 bg-[var(--cyan)]/10 hover:bg-[var(--cyan)]/20 border border-[var(--cyan)]/30 text-[var(--cyan)] rounded-md transition-all"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-[var(--text)] transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[var(--text)] transition-all ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block w-5 h-0.5 bg-[var(--text)] transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-[var(--border)]"
            style={{ background: "color-mix(in srgb, var(--bg) 95%, transparent)" }}
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((l) => (
                <a 
                  key={l} 
                  href={`#${l}`} 
                  className={`capitalize text-lg font-medium ${activeLink === l ? 'text-[var(--cyan)]' : 'text-[var(--text)]'}`} 
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    setActiveLink(l);
                    const el = document.getElementById(l);
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.scrollY - 80;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                >
                  {l}
                </a>
              ))}
              <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <ThemeToggle />
                <a
                  href="https://github.com/Sahilhamids"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--cyan)] text-sm font-medium"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
