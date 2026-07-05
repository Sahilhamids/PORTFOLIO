"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg)]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="text-4xl md:text-6xl font-bold tracking-tighter flex items-center gap-3">
              <span className="text-[var(--text)]">Sahil Hamid</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="w-3 h-10 md:h-14 bg-[var(--cyan)] inline-block"
              />
            </div>
            <p className="mt-6 text-[var(--muted)] tracking-widest text-xs uppercase font-medium">Initializing Portfolio Engine</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
