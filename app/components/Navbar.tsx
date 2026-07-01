"use client";
import { useState, useEffect } from "react";

const links = ["about", "projects", "skills", "experience", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,15,0.95)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#hero" className="text-white font-bold tracking-widest text-sm" style={{ letterSpacing: "0.2em" }}>
          SHS<span style={{ color: "var(--cyan)" }}>.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href={`#${l}`} className="nav-link capitalize">
              {l}
            </a>
          ))}
          <a
            href="https://github.com/Sahilhamids"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs"
          >
            GitHub ↗
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-white transition-all" style={{ transform: menuOpen ? "rotate(45deg) translate(2px, 5px)" : "" }} />
          <span className="block w-5 h-0.5 bg-white transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="block w-5 h-0.5 bg-white transition-all" style={{ transform: menuOpen ? "rotate(-45deg) translate(2px, -5px)" : "" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ background: "rgba(10,10,15,0.98)", borderTop: "1px solid var(--border)" }}>
          {links.map((l) => (
            <a key={l} href={`#${l}`} className="nav-link capitalize text-base" onClick={() => setMenuOpen(false)}>
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
