"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const VARIANTS = {
  up:    { hidden: { opacity: 0, y: 60 },    visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -60 },   visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: 60 },    visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -60 },   visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1 } },
  fade:  { hidden: { opacity: 0 },           visible: { opacity: 1 } },
  none:  { hidden: { opacity: 0 },           visible: { opacity: 1 } },
};

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: keyof typeof VARIANTS;
  duration?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.75,
  once = true,
}: ScrollRevealProps) {
  const variant = VARIANTS[direction];

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variant}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* Staggered children reveal — wrap a list of items */
export function StaggerReveal({
  children,
  className,
  staggerDelay = 0.08,
  direction = "up",
}: {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  direction?: keyof typeof VARIANTS;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <ScrollReveal key={i} delay={i * staggerDelay} direction={direction}>
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}
