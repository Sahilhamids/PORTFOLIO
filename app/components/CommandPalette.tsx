"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const commands = [
    { id: "about", name: "Go to About", action: () => window.location.hash = "#about" },
    { id: "projects", name: "Go to Projects", action: () => window.location.hash = "#projects" },
    { id: "skills", name: "Go to Skills", action: () => window.location.hash = "#skills" },
    { id: "experience", name: "Go to Experience", action: () => window.location.hash = "#experience" },
    { id: "contact", name: "Go to Contact", action: () => window.location.hash = "#contact" },
    { id: "resume", name: "Download Resume", action: () => window.open("/resume/Sahil_Hamid_Shaikh_Resume.pdf", "_blank") },
    { id: "github", name: "View GitHub Profile", action: () => window.open("https://github.com/Sahilhamids", "_blank") },
    { id: "linkedin", name: "View LinkedIn Profile", action: () => window.open("https://linkedin.com/in/sahilhamid", "_blank") },
  ];

  const filtered = commands.filter((cmd) => cmd.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="w-full max-w-lg rounded-xl overflow-hidden shadow-2xl relative"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-center px-4 py-3 border-b border-[var(--border)]">
              <span className="text-[var(--muted)] mr-3">🔍</span>
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent border-none outline-none text-[var(--text)] placeholder-[var(--muted)] text-sm"
              />
              <button onClick={() => setOpen(false)} className="text-xs px-2 py-1 rounded bg-[var(--border)] text-[var(--muted)] hover:text-white transition-colors">
                ESC
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto p-2 no-scrollbar">
              {filtered.length === 0 ? (
                <p className="p-4 text-sm text-center text-[var(--muted)]">No results found.</p>
              ) : (
                filtered.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => {
                      cmd.action();
                      setOpen(false);
                      setSearch("");
                    }}
                    className="w-full text-left flex items-center px-4 py-3 text-sm text-[var(--text)] hover:bg-[var(--cyan)] hover:bg-opacity-10 hover:text-[var(--cyan)] transition-colors rounded-md"
                  >
                    {cmd.name}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
