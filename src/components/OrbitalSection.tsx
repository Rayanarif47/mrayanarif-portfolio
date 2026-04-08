"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPython, FaDocker } from "react-icons/fa";
import { SiDjango, SiPostgresql, SiRedis, SiOpenai } from "react-icons/si";
import { Brain, Zap, Network, Database, Terminal, Shield, Cpu, Cloud } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Top floating badges: 2 rows ── */
interface Badge {
  icon: React.ReactNode;
  label: string;
  desc: string;
  /* SVG viewBox coords (1000 × 680): center of badge */
  cx: number;
  cy: number;
}

const ROW1: Badge[] = [
  { icon: <FaPython className="w-5 h-5" />,   label: "Python",    desc: "Primary language", cx: 148, cy: 72 },
  { icon: <SiDjango className="w-5 h-5" />,   label: "Django",    desc: "Backend framework", cx: 263, cy: 72 },
  { icon: <Zap className="w-5 h-5" />,         label: "FastAPI",   desc: "Async REST APIs", cx: 378, cy: 72 },
  { icon: <Brain className="w-5 h-5" />,       label: "LangChain", desc: "LLM orchestration", cx: 493, cy: 72 },
  { icon: <Network className="w-5 h-5" />,     label: "LangGraph", desc: "Multi-agent graphs", cx: 608, cy: 72 },
  { icon: <FaDocker className="w-5 h-5" />,    label: "Docker",    desc: "Containerisation", cx: 723, cy: 72 },
  { icon: <Cloud className="w-5 h-5" />,       label: "AWS",       desc: "S3 · RDS · Cloud", cx: 838, cy: 72 },
];

const ROW2: Badge[] = [
  { icon: <SiPostgresql className="w-5 h-5" />, label: "PostgreSQL", desc: "Primary database", cx: 205, cy: 165 },
  { icon: <SiRedis className="w-5 h-5" />,      label: "Redis",      desc: "Caching & queues", cx: 320, cy: 165 },
  { icon: <Cpu className="w-5 h-5" />,           label: "CrewAI",     desc: "Agent framework", cx: 435, cy: 165 },
  { icon: <Database className="w-5 h-5" />,      label: "Pinecone",   desc: "Vector database", cx: 550, cy: 165 },
  { icon: <SiOpenai className="w-5 h-5" />,      label: "GPT-4o",     desc: "LLM of choice", cx: 665, cy: 165 },
  { icon: <Terminal className="w-5 h-5" />,      label: "Playwright", desc: "Browser automation", cx: 780, cy: 165 },
];

/* All top badges flat */
const ALL_BADGES = [...ROW1, ...ROW2];

/* Orb center in viewBox coordinates */
const ORB_CX = 500;
const ORB_CY = 478;

/* ── Orbit ring icon labels ── */
interface OrbitIcon {
  label: string;
  angleDeg: number;
  ring: "outer" | "inner";
}

const ORBIT_ICONS: OrbitIcon[] = [
  /* outer ring (rx=330, ry=62) */
  { label: "Celery",       angleDeg: 160, ring: "outer" },
  { label: "WebSockets",   angleDeg: 195, ring: "outer" },
  { label: "Elasticsearch",angleDeg: 225, ring: "outer" },
  { label: "Supabase",     angleDeg: 255, ring: "outer" },
  { label: "Numpy",        angleDeg: 20,  ring: "outer" },
  { label: "Pandas",       angleDeg: 350, ring: "outer" },
  { label: "Twilio",       angleDeg: 320, ring: "outer" },
  { label: "Playwright",   angleDeg: 290, ring: "outer" },
  /* inner ring (rx=208, ry=40) */
  { label: "RAG",          angleDeg: 170, ring: "inner" },
  { label: "Embeddings",   angleDeg: 200, ring: "inner" },
  { label: "ReAct",        angleDeg: 10,  ring: "inner" },
  { label: "OAuth2",       angleDeg: 340, ring: "inner" },
];

const toRad = (deg: number) => (deg * Math.PI) / 180;

const OUTER_RX = 330, OUTER_RY = 62;
const INNER_RX = 208, INNER_RY = 40;

function orbitPoint(angleDeg: number, rx: number, ry: number) {
  return {
    x: ORB_CX + rx * Math.cos(toRad(angleDeg)),
    y: ORB_CY + ry * Math.sin(toRad(angleDeg)),
  };
}

/* Badge size in SVG units */
const BADGE_HALF = 22;

export const OrbitalSection = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="w-full py-16 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Section text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-10"
        >
          <p className="text-text-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            I&apos;m currently looking to join{" "}
            <span className="text-white font-semibold">cross-functional teams</span>{" "}
            building AI-powered products that solve{" "}
            <span className="text-accent-mint font-semibold">real-world problems</span>{" "}
            at scale.
          </p>
        </motion.div>

        {/* ── Orbital graphic ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="relative w-full"
          style={{ paddingBottom: "68%" }} /* 680/1000 aspect ratio */
        >
          {/* SVG layer — lines + rings */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 680"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Red gradient for lines */}
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF3355" stopOpacity="0" />
                <stop offset="40%" stopColor="#FF3355" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#FF3355" stopOpacity="0.08" />
              </linearGradient>

              {/* Glow filter for orb */}
              <filter id="orbGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="18" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Radial gradient for orb */}
              <radialGradient id="orbGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF3355" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#8B0020" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#2D0010" stopOpacity="0.95" />
              </radialGradient>

              {/* Ring gradient */}
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF3355" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#FF3355" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#FF3355" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {/* ── Connecting lines from badges to orb ── */}
            {ALL_BADGES.map((b) => (
              <motion.line
                key={`line-${b.label}`}
                x1={b.cx}
                y1={b.cy + BADGE_HALF + 2}
                x2={ORB_CX}
                y2={ORB_CY - 68}
                stroke={hovered === b.label ? "#FF3355" : "url(#lineGrad)"}
                strokeWidth={hovered === b.label ? 1.5 : 0.8}
                strokeDasharray="4 6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: hovered === b.label ? 1 : 0.6 }}
                transition={{ duration: 1.2, delay: 0.3 }}
              />
            ))}

            {/* ── Orb glow halo ── */}
            <circle
              cx={ORB_CX}
              cy={ORB_CY}
              r={120}
              fill="rgba(255,51,85,0.06)"
            />
            <circle
              cx={ORB_CX}
              cy={ORB_CY}
              r={88}
              fill="rgba(255,51,85,0.1)"
            />

            {/* ── Outer orbit ellipse ── */}
            <ellipse
              cx={ORB_CX}
              cy={ORB_CY}
              rx={OUTER_RX}
              ry={OUTER_RY}
              fill="none"
              stroke="rgba(255,51,85,0.18)"
              strokeWidth="1"
            />
            {/* Outer ring glowing arc (top half brighter) */}
            <ellipse
              cx={ORB_CX}
              cy={ORB_CY}
              rx={OUTER_RX}
              ry={OUTER_RY}
              fill="none"
              stroke="rgba(255,51,85,0.4)"
              strokeWidth="1"
              strokeDasharray={`${Math.PI * OUTER_RX} ${Math.PI * OUTER_RX}`}
              strokeDashoffset={Math.PI * OUTER_RX * 0.5}
            />

            {/* ── Inner orbit ellipse ── */}
            <ellipse
              cx={ORB_CX}
              cy={ORB_CY}
              rx={INNER_RX}
              ry={INNER_RY}
              fill="none"
              stroke="rgba(255,51,85,0.15)"
              strokeWidth="1"
            />

            {/* ── Main orb circle ── */}
            <circle
              cx={ORB_CX}
              cy={ORB_CY}
              r={68}
              fill="url(#orbGrad)"
              filter="url(#orbGlow)"
            />
            <circle
              cx={ORB_CX}
              cy={ORB_CY}
              r={68}
              fill="none"
              stroke="rgba(255,51,85,0.5)"
              strokeWidth="1.5"
            />

            {/* ── Orbit icon labels ── */}
            {ORBIT_ICONS.map((item) => {
              const rx = item.ring === "outer" ? OUTER_RX : INNER_RX;
              const ry = item.ring === "outer" ? OUTER_RY : INNER_RY;
              const pt = orbitPoint(item.angleDeg, rx, ry);
              const isBelowOrb = Math.sin(toRad(item.angleDeg)) > 0;

              return (
                <g key={item.label}>
                  {/* Dot on ring */}
                  <circle cx={pt.x} cy={pt.y} r={3} fill="#FF3355" opacity={0.7} />
                  {/* Label pill */}
                  <foreignObject
                    x={pt.x - 38}
                    y={isBelowOrb ? pt.y + 6 : pt.y - 24}
                    width={76}
                    height={20}
                  >
                    <div
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        color: "rgba(212,212,212,0.75)",
                        background: "rgba(13,13,13,0.85)",
                        border: "1px solid rgba(255,51,85,0.2)",
                        borderRadius: "999px",
                        padding: "2px 7px",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      {item.label}
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>

          {/* ── Floating badge divs (positioned over SVG) ── */}
          {ALL_BADGES.map((b, i) => {
            /* Convert SVG coords to % of container */
            const leftPct = ((b.cx - BADGE_HALF) / 1000) * 100;
            const topPct = ((b.cy - BADGE_HALF) / 680) * 100;
            const isHov = hovered === b.label;

            return (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: -20, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: EASE }}
                style={{
                  position: "absolute",
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  width: `${(BADGE_HALF * 2 / 1000) * 100}%`,
                  aspectRatio: "1",
                }}
                className="group cursor-default"
                onMouseEnter={() => setHovered(b.label)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Badge circle */}
                <motion.div
                  animate={{
                    boxShadow: isHov
                      ? "0 0 20px rgba(255,51,85,0.5), 0 0 40px rgba(255,51,85,0.2)"
                      : "0 0 8px rgba(255,51,85,0.15)",
                    borderColor: isHov ? "rgba(255,51,85,0.6)" : "rgba(255,255,255,0.1)",
                    backgroundColor: isHov ? "rgba(255,51,85,0.15)" : "rgba(13,13,13,0.9)",
                  }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full rounded-full flex items-center justify-center text-accent-mint transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(13,13,13,0.9)" }}
                >
                  {b.icon}
                </motion.div>

                {/* Tooltip */}
                <AnimatePresence>
                  {isHov && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                      style={{ bottom: "110%", marginBottom: "4px" }}
                    >
                      <div
                        className="text-center whitespace-nowrap rounded-xl px-3 py-2"
                        style={{
                          background: "rgba(13,13,13,0.97)",
                          border: "1px solid rgba(255,51,85,0.35)",
                          boxShadow: "0 0 20px rgba(255,51,85,0.2)",
                        }}
                      >
                        <p className="text-white font-black text-xs">{b.label}</p>
                        <p className="text-text-muted text-[10px]">{b.desc}</p>
                      </div>
                      {/* Arrow */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 top-full"
                        style={{
                          width: 0, height: 0,
                          borderLeft: "5px solid transparent",
                          borderRight: "5px solid transparent",
                          borderTop: "5px solid rgba(255,51,85,0.35)",
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* ── Center orb icon overlay ── */}
          <div
            className="absolute z-10 flex items-center justify-center"
            style={{
              left: `${((ORB_CX - 36) / 1000) * 100}%`,
              top: `${((ORB_CY - 36) / 680) * 100}%`,
              width: `${(72 / 1000) * 100}%`,
              aspectRatio: "1",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.06, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Brain className="text-white w-8 h-8 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            </motion.div>
          </div>

          {/* Mobile fallback — simple icon grid (hidden on lg) */}
          <div className="lg:hidden absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-4 gap-3">
              {ALL_BADGES.slice(0, 8).map((b) => (
                <div
                  key={b.label}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-accent-mint"
                  style={{ background: "rgba(255,51,85,0.1)", border: "1px solid rgba(255,51,85,0.3)" }}
                >
                  {b.icon}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
