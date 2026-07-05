"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Motion values for the dot (snappy)
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  // Springs for the glow (laggy/smooth)
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const glowX = useSpring(dotX, springConfig);
  const glowY = useSpring(dotY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        dotX.set(e.touches[0].clientX);
        dotY.set(e.touches[0].clientY);
        if (!isVisible) setIsVisible(true);
      }
    };

    const handleTouchEnd = () => setIsVisible(false);
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        dotX.set(e.touches[0].clientX);
        dotY.set(e.touches[0].clientY);
        setIsVisible(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [dotX, dotY, isVisible]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--cursor-color, #00d4ff)",
          marginLeft: -3,
          marginTop: -3,
          mixBlendMode: "difference",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: glowX,
          y: glowY,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--cursor-glow, rgba(0,212,255,0.06)) 0%, transparent 70%)",
          marginLeft: -200,
          marginTop: -200,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
      />
    </>
  );
}
