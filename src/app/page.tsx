"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Stats } from "@/components/Stats";
import { Contact } from "@/components/Contact";

/* Stagger-reveal wrapper for each section */
const SectionReveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1],
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Home() {
  /* Lenis smooth scroll */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => { lenis.destroy(); };
  }, []);

  /* Parallax background blobs */
  const { scrollYProgress } = useScroll();
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="relative w-full text-white font-sans bg-theme-dark overflow-hidden">

      {/* ── Static dot grid ── */}
      <div className="fixed inset-0 z-0 bg-grid-pattern pointer-events-none opacity-30" />

      {/* ── Parallax ambient blobs ── */}
      <motion.div
        style={{ y: blob1Y }}
        className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        transition={{ type: "tween" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(255,51,85,0.07) 0%, transparent 70%)" }}
        />
      </motion.div>

      <motion.div
        style={{ y: blob2Y }}
        className="fixed bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none z-0"
        transition={{ type: "tween" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(77,0,24,0.18) 0%, transparent 70%)" }}
        />
      </motion.div>

      <motion.div
        style={{ y: blob3Y }}
        className="fixed top-[40%] right-[5%] w-[300px] h-[300px] rounded-full pointer-events-none z-0"
        transition={{ type: "tween" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(255,51,85,0.04) 0%, transparent 70%)" }}
        />
      </motion.div>

      {/* ── Main content ── */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full">
        {/* Hero: no extra wrapper — has its own entrance animations */}
        <Hero />

        <SectionReveal className="w-full">
          <About />
        </SectionReveal>

        <SectionReveal className="w-full" delay={0.05}>
          <Stats />
        </SectionReveal>

        <SectionReveal className="w-full" delay={0.05}>
          <Skills />
        </SectionReveal>

        <SectionReveal className="w-full" delay={0.05}>
          <Experience />
        </SectionReveal>

        <SectionReveal className="w-full" delay={0.05}>
          <Projects />
        </SectionReveal>

        <SectionReveal className="w-full" delay={0.05}>
          <Contact />
        </SectionReveal>
      </main>
    </div>
  );
}
