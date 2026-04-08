"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1600;
      const stepTime = Math.max(Math.floor(duration / value), 1);

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [value, isInView]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const STATS = [
  { value: 5, suffix: "+", label: "Years Experience", sub: "Backend & AI" },
  { value: 10, suffix: "+", label: "Production Projects", sub: "Shipped globally" },
  { value: 4, suffix: "", label: "AI Frameworks", sub: "LangChain, LangGraph, CrewAI, IBM" },
  { value: 15, suffix: "+", label: "Technologies", sub: "Across full stack" },
];

export const Stats = () => {
  return (
    <section className="w-full py-10 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group relative flex flex-col items-center justify-center p-7 bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden hover:border-accent-mint/25 transition-all duration-300 cursor-default"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, rgba(255,51,85,0.06) 0%, transparent 70%)" }} />

            <h4 className="text-4xl md:text-5xl font-black text-white mb-1 relative z-10">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </h4>

            <p className="text-sm font-bold text-text-secondary text-center relative z-10 mb-1">
              {stat.label}
            </p>
            <p className="text-[10px] text-text-muted text-center relative z-10">
              {stat.sub}
            </p>

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-accent-mint/0 group-hover:bg-accent-mint/60 transition-all duration-500 rounded-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
