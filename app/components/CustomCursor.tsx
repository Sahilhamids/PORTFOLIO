"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let glowX  = 0, glowY  = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const loop = () => {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowX}px, ${glowY}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* small sharp dot — snaps instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 6, height: 6,
          borderRadius: "50%",
          background: "var(--cursor-color, #00d4ff)",
          marginLeft: -3, marginTop: -3,
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
      {/* large soft glow — lags behind */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: 300, height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--cursor-glow, rgba(0,212,255,0.06)) 0%, transparent 70%)",
          marginLeft: -150, marginTop: -150,
          willChange: "transform",
        }}
      />
    </>
  );
}
