"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal, Home } from "lucide-react";
import Navbar from "./components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center grid-bg brutal-border-x border-white/10 max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center relative z-10"
        >
          {/* Glitch 404 Text */}
          <div className="relative inline-block mb-6">
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[var(--cyan)] to-[var(--purple)]">
              404
            </h1>
            <motion.h1 
              animate={{ x: [-2, 2, -1, 1, 0], opacity: [1, 0.8, 1, 0.5, 1] }}
              transition={{ duration: 0.3, repeat: Infinity, repeatType: "mirror" }}
              className="text-8xl md:text-9xl font-black tracking-tighter text-[var(--cyan)] absolute top-0 left-[2px] opacity-70 mix-blend-screen pointer-events-none"
            >
              404
            </motion.h1>
            <motion.h1 
              animate={{ x: [2, -2, 1, -1, 0], opacity: [1, 0.7, 1, 0.9, 1] }}
              transition={{ duration: 0.4, repeat: Infinity, repeatType: "mirror" }}
              className="text-8xl md:text-9xl font-black tracking-tighter text-[var(--purple)] absolute top-0 -left-[2px] opacity-70 mix-blend-screen pointer-events-none"
            >
              404
            </motion.h1>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4 text-[var(--muted)]">
            <Terminal className="w-5 h-5 text-[var(--cyan)]" />
            <p className="font-mono text-sm tracking-widest uppercase">System Error: Page Not Found</p>
          </div>

          <p className="text-lg md:text-xl text-[var(--text)] opacity-80 mb-10 max-w-md mx-auto leading-relaxed">
            The endpoint you are looking for has been moved, deleted, or never existed in the first place.
          </p>

          <Link 
            href="/"
            className="btn-primary inline-flex gap-2"
          >
            <Home className="w-4 h-4" /> Return to Base
          </Link>
        </motion.div>
        
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-[var(--cyan)]/5 rounded-full blur-[100px] pointer-events-none" />
      </main>
    </>
  );
}
