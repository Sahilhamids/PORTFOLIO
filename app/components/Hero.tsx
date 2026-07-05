"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";

const roles = ["Backend Engineer", "Python Developer", "API Builder", "AI-Augmented Developer"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center grid-bg overflow-hidden brutal-border-b">
      {/* Ambient glow blobs */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute pointer-events-none"
        style={{
          width: "50vw", height: "50vw", minWidth: 400, minHeight: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
          top: "5%", left: "-10%",
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute pointer-events-none"
        style={{
          width: "40vw", height: "40vw", minWidth: 300, minHeight: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)",
          bottom: "10%", right: "-5%",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 w-full relative z-10">
        <motion.div 
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="section-label mb-4">
            Based in India —
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-black leading-none mb-6 tracking-tight"
            style={{ fontSize: "clamp(2.75rem, 8vw, 5.5rem)", color: "var(--text)" }}
          >
            SAHIL HAMID<br />
            <span style={{ color: "var(--cyan)" }} className="glow-text block mt-1">SHAIKH</span>
          </motion.h1>

          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8 h-8">
            <span style={{ color: "var(--muted)", fontSize: "1.2rem" }}>I build</span>
            <div className="relative overflow-hidden h-10 w-64 flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="font-mono font-semibold absolute"
                  style={{ color: "var(--cyan)", fontSize: "1.1rem" }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mb-10 max-w-xl text-lg leading-relaxed text-[var(--text)] opacity-80"
          >
            I&apos;m a software engineer focused on AI-powered applications and backend systems.
            I love turning complex problems into clean, fast, and useful products —
            from intelligent resume tools to full-stack web apps.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 mt-4">
            <a href="#projects" className="group flex items-center gap-3 bg-[var(--surface)] hover:bg-[var(--border)] text-[var(--text)] border brutal-border px-8 py-4 transition-all">
              <span className="font-bold tracking-wide uppercase text-sm">View My Work</span>
              <div className="overflow-hidden relative w-4 h-4 text-[var(--cyan)]">
                 <ArrowUpRight className="w-4 h-4 absolute group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-300 ease-in-out" />
                 <ArrowUpRight className="w-4 h-4 absolute -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </div>
            </a>
            <a href="#contact" className="group flex items-center gap-3 px-8 py-4 border border-transparent hover:border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] transition-all">
              <span className="font-bold tracking-wide uppercase text-sm">Get In Touch</span>
              <div className="overflow-hidden relative w-4 h-4 text-[var(--purple)]">
                 <ArrowUpRight className="w-4 h-4 absolute group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-300 ease-in-out" />
                 <ArrowUpRight className="w-4 h-4 absolute -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </div>
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-10 mt-16 pt-8 border-t border-[var(--border)]"
          >
            {[
              { value: "140+", label: "LeetCode Problems" },
              { value: "6+", label: "Projects Built" },
              { value: "1st", label: "Capstone Rank" },
            ].map((s) => (
              <motion.div 
                key={s.label}
                whileHover={{ y: -2 }}
                className="group cursor-default"
              >
                <p className="font-bold text-2xl text-[var(--cyan)] group-hover:text-[var(--cyan)] transition-colors">{s.value}</p>
                <p className="text-xs mt-1 text-[var(--muted)] group-hover:text-[var(--text)] transition-colors">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="text-[10px] tracking-widest text-[var(--muted)] font-medium">SCROLL</p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[var(--cyan)] opacity-50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
