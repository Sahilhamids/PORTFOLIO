"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function MagneticButton({ 
  children, 
  className = "", 
  onClick, 
  as = "button",
  href,
  target,
  rel,
  type = "button",
  disabled = false
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Disable magnetic effect on touch screens/mobile devices
    if (!ref.current || disabled || (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches)) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3); // Magnetic strength
    y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = as as any;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <Component 
        onClick={onClick} 
        href={href}
        target={target}
        rel={rel}
        type={as === "button" ? type : undefined}
        disabled={disabled}
        className={className}
      >
        {children}
      </Component>
    </motion.div>
  );
}
