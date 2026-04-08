"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const PROJECTS = [
  {
    id: "lemur",
    number: "01",
    label: "Healthcare AI",
    title: "Lemur",
    subtitle: "AI-Powered Healthcare Automation",
    description:
      "Production-grade AI workflow automating communication and appointment management for US-based medical institutions — fully hands-free, from inbox to booked slot.",
    bullets: [
      "AI email pipeline using GPT-4o-turbo to collect missing patient & hospital information",
      "Automated parsing and structuring of incoming replies via AI agents",
      "Fully hands-free appointment booking agent using Browser-use / Playwright",
      "Orchestrated at scale with Celery & CronJobs for fault-tolerant reliability",
    ],
    tech: ["GPT-4o", "Python", "FastAPI", "Celery", "Playwright", "Browser-use", "Django"],
    gradient: "from-[#1A0008] via-[#0D0005] to-transparent",
  },
  {
    id: "viclinic",
    number: "02",
    label: "EMR · Clinical AI",
    title: "Viclinic",
    subtitle: "EMR Agentic System Architecture",
    description:
      "Designed and implemented the AI agentic system powering a full EMR portal — modular, observable, and built to safely automate clinical operations at scale.",
    bullets: [
      "Multi-agent workflows handling clinical operations, patient data flows, and EMR interactions",
      "LLM-based reasoning layered with rule-based logic for safe, auditable automation",
      "Modular architecture designed for extensibility across future healthcare workflows",
      "End-to-end ownership: system design, LLM integration, infrastructure, and delivery",
    ],
    tech: ["LangChain", "LangGraph", "GPT-4", "Django", "PostgreSQL", "Python", "Docker"],
    gradient: "from-[#0A0010] via-[#08000D] to-transparent",
  },
  {
    id: "coreimmersive",
    number: "03",
    label: "Workflow Automation",
    title: "Coreimmersive",
    subtitle: "Email & Google Drive Workflow Automation",
    description:
      "End-to-end automation pipeline that captures client emails, extracts production assets, applies intelligent naming logic, and routes files into the correct Google Drive folders.",
    bullets: [
      "Ingests incoming client emails from Gmail, identifies context and extracts attachments",
      "Intelligent AI-powered file naming and folder routing logic",
      "Reduced manual sorting effort and significantly improved operational efficiency",
      "Fully hands-free pipeline built on Django + Google Workspace APIs",
    ],
    tech: ["Python", "Django", "Gmail API", "Google Drive API", "FastAPI", "Celery"],
    gradient: "from-[#0A0A00] via-[#080808] to-transparent",
  },
];

const ProjectCard = ({ proj, idx }: { proj: typeof PROJECTS[number]; idx: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE }}
      className="group relative rounded-2xl overflow-hidden"
      style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Animated left accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-2xl origin-top"
        style={{ background: "linear-gradient(to bottom, #FF3355, rgba(255,51,85,0.2))" }}
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
      />

      {/* Gradient bg */}
      <div className={`absolute inset-0 bg-gradient-to-r ${proj.gradient} opacity-60 pointer-events-none`} />

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(255,51,85,0.06) 0%, transparent 65%)" }} />

      {/* Watermark number */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[130px] font-black leading-none select-none pointer-events-none"
        style={{ color: "rgba(255,51,85,0.04)" }}>
        {proj.number}
      </div>

      <div className="relative z-10 p-8 md:p-10">

        {/* ── Top bar: number + line + label ── */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-accent-mint font-black text-xs tracking-[0.3em]">{proj.number}</span>
          <motion.div
            className="flex-1 h-px origin-left"
            style={{ background: "linear-gradient(to right, rgba(255,51,85,0.5), transparent)" }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          />
          <span className="text-[10px] font-black uppercase tracking-widest text-accent-mint/80">{proj.label}</span>
        </div>

        {/* ── Title ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
          className="mb-6"
        >
          <h3 className="text-3xl md:text-4xl font-black text-white leading-tight group-hover:text-accent-mint transition-colors duration-300 mb-1">
            {proj.title}
          </h3>
          <p className="text-text-muted text-[11px] font-semibold uppercase tracking-widest">
            {proj.subtitle}
          </p>
        </motion.div>

        {/* ── Divider ── */}
        <motion.div
          className="h-px mb-6 origin-left"
          style={{ background: "linear-gradient(to right, rgba(255,51,85,0.25), rgba(255,255,255,0.04), transparent)" }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
        />

        {/* ── Body: description left | bullets right ── */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">

          {/* Left — description */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.38, ease: EASE }}
          >
            <p className="text-text-muted text-sm leading-relaxed">{proj.description}</p>
          </motion.div>

          {/* Right — bullets */}
          <ul className="space-y-3">
            {proj.bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.42, delay: 0.42 + i * 0.07, ease: EASE }}
                className="flex items-start gap-3 text-sm text-text-secondary leading-snug"
              >
                <motion.span
                  className="mt-[7px] shrink-0 w-1 h-1 rounded-full bg-accent-mint"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                />
                {b}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* ── Tech tags ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.65, ease: EASE }}
          className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.04]"
        >
          {proj.tech.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.68 + i * 0.05, ease: EASE }}
              className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-white/[0.04] border border-white/[0.07] text-text-muted hover:border-accent-mint/30 hover:text-accent-mint/80 transition-all duration-300 cursor-default"
            >
              {t}
            </motion.span>
          ))}
        </motion.div>

      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section id="projects" className="w-full py-20 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">

      <div ref={headerRef} className="mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="h-px w-8 bg-accent-mint" />
          <span className="text-accent-mint text-xs font-bold uppercase tracking-widest">Projects</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.06, ease: EASE }}
          className="text-4xl md:text-5xl font-black tracking-tight"
        >
          Featured <span className="text-gradient-red">Work.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
          className="mt-3 text-text-muted text-sm max-w-lg"
        >
          Production-grade AI systems and backend platforms — shipped, scaled, and battle-tested.
        </motion.p>
      </div>

      <div className="space-y-5">
        {PROJECTS.map((proj, idx) => (
          <ProjectCard key={proj.id} proj={proj} idx={idx} />
        ))}
      </div>
    </section>
  );
};
