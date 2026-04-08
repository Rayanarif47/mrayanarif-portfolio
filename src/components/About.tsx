"use client";

import { motion } from "framer-motion";
import { Brain, Server, Zap, Users, Code2, Database } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const highlights = [
  { title: "AI & Multi-Agent Systems", icon: <Brain className="w-5 h-5" />, desc: "LangChain, LangGraph, CrewAI" },
  { title: "Backend Architecture", icon: <Server className="w-5 h-5" />, desc: "Django, FastAPI, REST APIs" },
  { title: "LLM Integrations", icon: <Zap className="w-5 h-5" />, desc: "GPT-4, Claude, Azure OpenAI" },
  { title: "Engineering Leadership", icon: <Users className="w-5 h-5" />, desc: "Tech Lead, Team Management" },
  { title: "RAG Pipelines", icon: <Code2 className="w-5 h-5" />, desc: "Pinecone, Embeddings, Hybrid Search" },
  { title: "Data & Infrastructure", icon: <Database className="w-5 h-5" />, desc: "PostgreSQL, Redis, AWS, Docker" },
];

export const About = () => {
  return (
    <section id="about" className="w-full py-20 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* Left — bio */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: EASE }}
          className="space-y-8"
        >
          {/* Section label */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent-mint" />
            <span className="text-accent-mint text-xs font-bold uppercase tracking-widest">About Me</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight max-w-md">
            Building systems that{" "}
            <span className="text-gradient-red">think and scale.</span>
          </h2>

          <div className="space-y-5 text-text-secondary text-sm leading-[1.85] max-w-lg">
            <p>
              Hi, I&apos;m <strong className="text-white font-bold">M. Rayan Arif</strong> — a Senior Backend Engineer and AI Systems Architect with{" "}
              <strong className="text-accent-mint">5 years</strong> of experience delivering production-grade backend and AI solutions.
            </p>
            <p>
              I specialize in building multi-agent AI systems, designing scalable APIs, and architecting
              event-driven workflows that handle real business complexity — from healthcare automation to
              document intelligence. I&apos;ve led AI engineering teams at{" "}
              <strong className="text-white">Artilence</strong> and shipped projects for international clients
              across the US and Europe.
            </p>
            <p>
              My stack revolves around <strong className="text-white">Python, Django, FastAPI</strong> on the backend,
              and <strong className="text-white">LangChain, LangGraph, CrewAI</strong> for orchestrating LLM-powered agents.
              I bridge the gap between cutting-edge AI and production engineering.
            </p>
          </div>

          {/* Open to badge */}
          <div className="inline-flex flex-wrap gap-2 pt-2">
            {["Senior Backend Eng", "AI Architect", "Engineering Manager", "Contract / Freelance"].map((role) => (
              <span
                key={role}
                className="px-3 py-1.5 text-xs font-semibold rounded-full border border-accent-mint/25 bg-accent-mint/5 text-accent-mint"
              >
                {role}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right — skills grid */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
        >
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.07, ease: EASE }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 hover:border-accent-mint/25 hover:bg-white/[0.04] transition-all duration-300 cursor-default overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at top left, rgba(255,51,85,0.06) 0%, transparent 70%)" }} />

                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-accent-mint/10 flex items-center justify-center mb-4 text-accent-mint group-hover:bg-accent-mint/15 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-white font-bold text-sm mb-1 leading-snug">{item.title}</h3>
                  <p className="text-text-muted text-xs leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
            className="mt-6 pl-4 border-l-2 border-accent-mint/40 text-text-muted text-sm italic leading-relaxed"
          >
            "Great engineering means making AI-powered systems reliable enough
            that humans can trust them completely."
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  );
};
