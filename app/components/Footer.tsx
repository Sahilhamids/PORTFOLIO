export default function Footer() {
  return (
    <footer className="py-8 text-center flex flex-col items-center justify-center gap-3" style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
      <p className="text-xs" style={{ color: "var(--muted)" }}>
        Designed &amp; built by{" "}
        <span style={{ color: "var(--cyan)" }}>Sahil Hamid Shaikh</span>
        {" "}· {new Date().getFullYear()}
      </p>
      <div className="hidden md:flex items-center gap-1.5 text-[10px] uppercase tracking-widest px-2 py-1 rounded" style={{ color: "var(--muted)", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}>
        <span>Press</span>
        <kbd className="px-1.5 py-0.5 rounded-sm bg-white/10 border border-white/10 font-sans">⌘K</kbd>
        <span>or</span>
        <kbd className="px-1.5 py-0.5 rounded-sm bg-white/10 border border-white/10 font-sans">Ctrl+K</kbd>
        <span>to navigate</span>
      </div>
    </footer>
  );
}
