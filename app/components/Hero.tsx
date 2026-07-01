"use client";
import { useEffect, useState } from "react";

const roles = ["Backend Engineer", "Python Developer", "API Builder", "AI-Augmented Developer"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center grid-bg overflow-hidden">
      {/* Ambient glow blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
          top: "10%", left: "-10%",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)",
          bottom: "15%", right: "5%",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="max-w-3xl">
          <p className="section-label mb-4 animate-fade-in-up">Based in India —</p>

          <h1
            className="font-black leading-none mb-4 animate-fade-in-up delay-100"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
              color: "#fff",
              opacity: 0,
            }}
          >
            SAHIL HAMID<br />
            <span style={{ color: "var(--cyan)" }} className="glow-text">SHAIKH</span>
          </h1>

          <div
            className="flex items-center gap-2 mb-6 animate-fade-in-up delay-200"
            style={{ opacity: 0 }}
          >
            <span style={{ color: "var(--muted)", fontSize: "1.1rem" }}>I build</span>
            <span
              className="font-mono font-semibold"
              style={{ color: "var(--cyan)", fontSize: "1.1rem", minWidth: "16ch" }}
            >
              {displayed}
              <span className="animate-pulse" style={{ color: "var(--cyan)" }}>|</span>
            </span>
          </div>

          <p
            className="mb-10 max-w-xl animate-fade-in-up delay-300"
            style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: "1rem", opacity: 0 }}
          >
            I&apos;m a software engineer focused on AI-powered applications and backend systems.
            I love turning complex problems into clean, fast, and useful products —
            from intelligent resume tools to full-stack web apps.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in-up delay-400" style={{ opacity: 0 }}>
            <a href="#projects" className="btn-primary">View My Work</a>
            <a href="#contact" className="btn-ghost">Get In Touch</a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-16 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
            {[
              { value: "140+", label: "LeetCode Problems" },
              { value: "6+", label: "Projects Built" },
              { value: "1st", label: "Capstone Rank" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-bold text-2xl" style={{ color: "var(--cyan)" }}>{s.value}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="text-xs tracking-widest" style={{ color: "var(--muted)" }}>SCROLL</p>
        <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, var(--cyan), transparent)" }} />
      </div>
    </section>
  );
}
