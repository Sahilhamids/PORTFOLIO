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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 w-full gap-2 sm:gap-4">
        {/* Fixed Left Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a href="#hero" className="text-[var(--text)] font-bold tracking-widest text-sm hover:text-[var(--cyan)] transition-colors" style={{ letterSpacing: "0.2em" }}>
            SHS<span className="text-cyan-500">.</span>
          </a>
          <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.25)", color: "#00ff88" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            Open to Work
          </span>
        </div>

        {/* Scrollable Center Links */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar flex-1 pl-2">
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
        
        {/* Fixed Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4 border-l border-[var(--border)] pl-2 sm:pl-4 flex-shrink-0">
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
    </motion.nav>
  );
}
