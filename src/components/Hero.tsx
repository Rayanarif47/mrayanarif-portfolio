"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";
import { ResumeDownloadButton } from "./ResumeDownloadButton";

const ROLES = [
  "Senior Backend Engineer",
  "AI Systems Architect",
  "Tech Lead",
  "Python Developer",
];

const CODE_LINES = [
  { type: "keyword", text: "class" },
  { type: "space", text: " " },
  { type: "class", text: "RayanArif" },
  { type: "punct", text: ":" },
  { type: "newline", text: "\n" },
  { type: "indent", text: "  " },
  { type: "attr", text: "role" },
  { type: "punct", text: " = " },
  { type: "string", text: '"AI Systems Architect"' },
  { type: "newline", text: "\n" },
  { type: "indent", text: "  " },
  { type: "attr", text: "stack" },
  { type: "punct", text: " = " },
  { type: "string", text: '["Python", "FastAPI", "LangChain"]' },
  { type: "newline", text: "\n\n" },
  { type: "indent", text: "  " },
  { type: "keyword", text: "def " },
  { type: "fn", text: "build_agent" },
  { type: "punct", text: "(self, problem):" },
  { type: "newline", text: "\n" },
  { type: "indent", text: "    " },
  { type: "comment", text: "# Multi-agent RAG pipeline" },
  { type: "newline", text: "\n" },
  { type: "indent", text: "    " },
  { type: "attr", text: "agent" },
  { type: "punct", text: " = " },
  { type: "class", text: "MultiAgent" },
  { type: "punct", text: "(llm=" },
  { type: "string", text: '"gpt-4o"' },
  { type: "punct", text: ")" },
  { type: "newline", text: "\n" },
  { type: "indent", text: "    " },
  { type: "keyword", text: "return " },
  { type: "attr", text: "agent" },
  { type: "punct", text: ".solve(problem)" },
];

const colorMap: Record<string, string> = {
  keyword: "#FF3355",
  class: "#FFC857",
  attr: "#79B8FF",
  fn: "#B3F0A4",
  string: "#9ECE6A",
  comment: "#5C6773",
  punct: "#D4D4D4",
  space: "transparent",
  indent: "transparent",
  newline: "transparent",
};

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayed.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayed(currentRole.slice(0, displayed.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 35);
      } else {
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  const EASE = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="relative w-full min-h-screen flex items-center pt-28 pb-16 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">

      {/* Red glow behind hero content */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(255,51,85,0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">

        {/* ── Left: Text Content ── */}
        <div className="space-y-8">

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            className="text-text-muted text-lg font-medium"
          >
            Hello! I&apos;m,
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none whitespace-nowrap"
          >
            <span className="text-gradient-red">M. Rayan </span>
            <span className="text-white">Arif.</span>
          </motion.h1>

          {/* Typing role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="text-xl md:text-2xl font-semibold text-white/80 min-h-[2rem] flex items-center gap-1"
          >
            <span className="text-accent-mint">I&apos;m a</span>&nbsp;
            <span>{displayed}</span>
            <span className="w-[2px] h-6 bg-accent-mint ml-0.5 animate-pulse inline-block" />
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
            className="text-text-secondary leading-relaxed max-w-xl"
          >
            5 years building production-grade backend systems and AI solutions.
            I architect multi-agent AI pipelines, design scalable APIs, and lead
            engineering teams that ship reliable software across healthcare, automation,
            and data-intensive domains.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42, ease: EASE }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link
              href="/hire"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent-mint text-white font-bold transition-all hover:bg-soft-mint shadow-[0_0_24px_rgba(255,51,85,0.4)] hover:shadow-[0_0_36px_rgba(255,51,85,0.6)] text-sm tracking-wide"
            >
              <Briefcase className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              Hire Me
            </Link>

            <a
              href="#projects"
              className="group flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.04] text-white font-medium border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all text-sm"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <ResumeDownloadButton />
          </motion.div>

        </div>

        {/* ── Right: Terminal Code Card ── */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute -inset-4 rounded-3xl pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(255,51,85,0.12) 0%, transparent 70%)" }} />

              {/* Terminal window */}
              <div className="relative bg-[#0D0D0D] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#111111]">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  <span className="ml-3 text-[11px] text-white/20 font-mono">rayan_arif.py</span>
                </div>

                {/* Code content */}
                <div className="p-6 font-mono text-sm leading-[1.8] overflow-x-auto">
                  <pre className="whitespace-pre-wrap">
                    {CODE_LINES.map((token, i) => (
                      token.type === "newline" ? (
                        <span key={i}>{"\n"}</span>
                      ) : token.type === "indent" ? (
                        <span key={i}>&nbsp;&nbsp;</span>
                      ) : (
                        <span key={i} style={{ color: colorMap[token.type] || "#D4D4D4" }}>
                          {token.text}
                        </span>
                      )
                    ))}
                  </pre>

                  {/* Blinking cursor */}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-block w-2 h-[14px] bg-accent-mint ml-0.5 align-middle"
                  />
                </div>

                {/* Status bar */}
                <div className="px-6 py-2 border-t border-white/[0.06] bg-[#111111] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-mint animate-pulse" />
                    <span className="text-[10px] text-white/30 font-mono">Python 3.11 · LangGraph</span>
                  </div>
                  <span className="text-[10px] text-white/20 font-mono">UTF-8</span>
                </div>
              </div>

              {/* Floating badge — experience */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: [0, -6, 0] }}
                transition={{
                  opacity: { delay: 1.1, duration: 0.5 },
                  y: { delay: 1.6, duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute -bottom-5 -left-5 bg-[#0D0D0D] border border-white/10 rounded-xl px-4 py-3 shadow-xl flex items-center gap-3"
                style={{ boxShadow: "0 0 20px rgba(255,51,85,0.1)" }}
              >
                <div className="w-9 h-9 rounded-lg bg-accent-mint/10 flex items-center justify-center" style={{ border: "1px solid rgba(255,51,85,0.25)" }}>
                  <span className="text-accent-mint font-black text-sm">5+</span>
                </div>
                <div>
                  <p className="text-white font-bold text-xs">Years Experience</p>
                  <p className="text-text-muted text-[10px]">Backend & AI Systems</p>
                </div>
              </motion.div>

              {/* Floating badge — ships to prod */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: [0, 6, 0] }}
                transition={{
                  opacity: { delay: 1.3, duration: 0.5 },
                  y: { delay: 1.8, duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute -top-4 -right-4 bg-[#0D0D0D] rounded-xl px-4 py-2 shadow-xl"
                style={{
                  border: "1px solid rgba(255,51,85,0.3)",
                  boxShadow: "0 0 20px rgba(255,51,85,0.15)",
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-mint opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-mint" />
                  </span>
                  <span className="text-white text-xs font-bold tracking-wide">Ships to Prod</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-text-muted uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-accent-mint/60 to-transparent"
        />
      </motion.div>
    </section>
  );
};
