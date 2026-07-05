"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const links = ["about", "projects", "skills", "experience", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#hero" className="text-[var(--text)] font-bold tracking-widest text-sm hover:text-[var(--cyan)] transition-colors hidden sm:block flex-shrink-0" style={{ letterSpacing: "0.2em" }}>
          SHS<span className="text-cyan-500">.</span>
        </a>

        {/* Unified Nav (Scrollable on mobile) */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
          <a href="#hero" className="text-[var(--text)] font-bold tracking-widest text-sm hover:text-[var(--cyan)] transition-colors sm:hidden flex-shrink-0 mr-4" style={{ letterSpacing: "0.2em" }}>
            SHS<span className="text-cyan-500">.</span>
          </a>
          
          <div className="flex items-center gap-1 sm:gap-2">
            {links.map((l) => (
              <a 
                key={l} 
                href={`#${l}`} 
                className={`relative px-3 sm:px-4 py-2 capitalize text-sm font-medium transition-colors whitespace-nowrap ${activeLink === l ? 'text-[var(--cyan)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
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
          </div>
          
          <div className="ml-2 sm:ml-4 flex items-center gap-2 sm:gap-4 border-l border-[var(--border)] pl-2 sm:pl-4 flex-shrink-0">
            <ThemeToggle />
            <a
              href="https://github.com/Sahilhamids"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-1.5 px-3 sm:px-4 bg-[var(--cyan)]/10 hover:bg-[var(--cyan)]/20 border border-[var(--cyan)]/30 text-[var(--cyan)] rounded-md transition-all whitespace-nowrap"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
