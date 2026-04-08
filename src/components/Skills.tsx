"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaPython, FaDocker } from "react-icons/fa";
import { SiDjango, SiPostgresql, SiRedis, SiOpenai } from "react-icons/si";
import { Brain, Zap, Network, Database, Terminal, Cpu, Cloud } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Constants ── */
const ORB_CX = 500, ORB_CY = 490;
const ORB_R   = 82;
const OUTER_RX = 340, OUTER_RY = 68;
const INNER_RX = 218, INNER_RY = 42;
const BADGE_HALF = 24; /* half of badge circle size in SVG units */

/* ── Orbit SVG path strings (for animateMotion) ── */
const outerPath = `M ${ORB_CX - OUTER_RX},${ORB_CY} a ${OUTER_RX},${OUTER_RY} 0 1,1 ${OUTER_RX * 2},0 a ${OUTER_RX},${OUTER_RY} 0 1,1 ${-OUTER_RX * 2},0`;
const innerPath = `M ${ORB_CX - INNER_RX},${ORB_CY} a ${INNER_RX},${INNER_RY} 0 1,0 ${INNER_RX * 2},0 a ${INNER_RX},${INNER_RY} 0 1,0 ${-INNER_RX * 2},0`;

/* ── Floating badges ── */
interface Badge { icon: React.ReactNode; label: string; desc: string; cx: number; cy: number; }

const ROW1: Badge[] = [
  { icon: <FaPython className="w-5 h-5" />,  label: "Python",    desc: "Primary language",    cx: 148, cy: 72 },
  { icon: <SiDjango className="w-5 h-5" />,  label: "Django",    desc: "Backend framework",   cx: 263, cy: 72 },
  { icon: <Zap className="w-5 h-5" />,        label: "FastAPI",   desc: "Async REST APIs",     cx: 378, cy: 72 },
  { icon: <Brain className="w-5 h-5" />,      label: "LangChain", desc: "LLM orchestration",   cx: 493, cy: 72 },
  { icon: <Network className="w-5 h-5" />,    label: "LangGraph", desc: "Multi-agent graphs",  cx: 608, cy: 72 },
  { icon: <FaDocker className="w-5 h-5" />,   label: "Docker",    desc: "Containerisation",    cx: 723, cy: 72 },
  { icon: <Cloud className="w-5 h-5" />,      label: "AWS",       desc: "S3 · RDS · Cloud",    cx: 838, cy: 72 },
];
const ROW2: Badge[] = [
  { icon: <SiPostgresql className="w-5 h-5" />, label: "PostgreSQL", desc: "Primary database",   cx: 205, cy: 170 },
  { icon: <SiRedis className="w-5 h-5" />,      label: "Redis",      desc: "Caching & queues",   cx: 320, cy: 170 },
  { icon: <Cpu className="w-5 h-5" />,           label: "CrewAI",     desc: "Agent framework",    cx: 435, cy: 170 },
  { icon: <Database className="w-5 h-5" />,      label: "Pinecone",   desc: "Vector database",    cx: 550, cy: 170 },
  { icon: <SiOpenai className="w-5 h-5" />,      label: "GPT-4o",     desc: "LLM of choice",      cx: 665, cy: 170 },
  { icon: <Terminal className="w-5 h-5" />,      label: "Playwright", desc: "Browser automation", cx: 780, cy: 170 },
];
const ALL_BADGES = [...ROW1, ...ROW2];

/* ── Orbit label strings (travel with dots) ── */
const OUTER_LABELS = ["Celery", "WebSockets", "Elasticsearch", "Supabase", "Playwright", "Twilio", "Pandas", "Numpy"];
const INNER_LABELS = ["RAG", "Embeddings", "OAuth2"];

/* label pill width in SVG units */
const pillW = (label: string) => Math.max(52, label.length * 6.6 + 18);

/* ── Marquee ── */
const MARQUEE = [
  "Python","Django","FastAPI","LangChain","LangGraph","CrewAI","GPT-4","Claude API",
  "Azure OpenAI","Prompt Engineering","Multi-agent","RAG Pipelines","PostgreSQL","Redis",
  "Pinecone","Elasticsearch","Supabase","Pandas","Numpy","Docker","AWS","GCP","Azure",
  "Celery","WebSockets","GitHub Actions","Playwright","Browser-use","Twilio","Eleven Labs",
  "JWT","OAuth2","OpenAPI","Swagger","REST API",

];

export const Skills = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} id="skills" className="w-full py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-4">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-accent-mint" />
            <span className="text-accent-mint text-xs font-bold uppercase tracking-widest">Skills</span>
            <span className="h-px w-8 bg-accent-mint" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Technical <span className="text-gradient-red">Arsenal.</span>
          </h2>
          <p className="mt-3 text-text-muted text-sm max-w-lg mx-auto">
            Hover any icon to learn more. Every tool below ships to production.
          </p>
        </motion.div>

        {/* ── Orbital graphic ── */}
        <div className="relative w-full" style={{ paddingBottom: "70%" }}>

          {/* SVG layer */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 680"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Path definitions for animateMotion */}
              <path id="outerOrbitPath" d={outerPath} fill="none" />
              <path id="innerOrbitPath" d={innerPath} fill="none" />

              {/* Line gradient */}
              <linearGradient id="lineG" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#FF3355" stopOpacity="0"    />
                <stop offset="30%"  stopColor="#FF3355" stopOpacity="0.5"  />
                <stop offset="100%" stopColor="#FF3355" stopOpacity="0.08" />
              </linearGradient>

              {/* Orb radial gradient */}
              <radialGradient id="orbG" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#FF6680" stopOpacity="1"    />
                <stop offset="35%"  stopColor="#FF3355" stopOpacity="0.95" />
                <stop offset="70%"  stopColor="#8B0020" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#1A0008" stopOpacity="0.98" />
              </radialGradient>

              {/* Pulsing halo gradient */}
              <radialGradient id="haloG" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#FF3355" stopOpacity="0.2"  />
                <stop offset="100%" stopColor="#FF3355" stopOpacity="0"    />
              </radialGradient>

              {/* Glow filter */}
              <filter id="orbGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="25" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Dot glow */}
              <filter id="dotGlow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ── Pulsing ambient halo (always animates) ── */}
            {[200, 155, 115].map((r, i) => (
              <motion.circle
                key={r}
                cx={ORB_CX} cy={ORB_CY} r={r}
                fill="url(#haloG)"
                animate={{ r: [r, r + 25, r], opacity: [0.6, 0.1, 0.6] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
              />
            ))}

            {/* ── Connecting lines (draw in on scroll) ── */}
            {ALL_BADGES.map((b, i) => (
              <motion.path
                key={`line-${b.label}`}
                d={`M ${b.cx},${b.cy + BADGE_HALF + 2} L ${ORB_CX},${ORB_CY - ORB_R - 4}`}
                stroke={hovered === b.label ? "#FF3355" : "url(#lineG)"}
                strokeWidth={hovered === b.label ? 1.8 : 1}
                strokeDasharray={hovered === b.label ? "none" : "5 8"}
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView
                  ? { pathLength: 1, opacity: hovered === b.label ? 1 : 0.7 }
                  : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 1.4, delay: 0.4 + i * 0.07, ease: "easeOut" }}
              />
            ))}

            {/* ── Outer orbit ring (reveal on scroll) ── */}
            <motion.ellipse
              cx={ORB_CX} cy={ORB_CY} rx={OUTER_RX} ry={OUTER_RY}
              fill="none" stroke="rgba(255,51,85,0.22)" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 2.2, delay: 1.0, ease: "easeInOut" }}
            />
            {/* Brighter top arc */}
            <motion.ellipse
              cx={ORB_CX} cy={ORB_CY} rx={OUTER_RX} ry={OUTER_RY}
              fill="none" stroke="rgba(255,51,85,0.5)" strokeWidth="1.2"
              strokeDasharray={`${Math.PI * OUTER_RX * 0.55} ${Math.PI * OUTER_RX}`}
              strokeDashoffset={Math.PI * OUTER_RX * 0.5}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 2.0 }}
            />

            {/* ── Inner orbit ring ── */}
            <motion.ellipse
              cx={ORB_CX} cy={ORB_CY} rx={INNER_RX} ry={INNER_RY}
              fill="none" stroke="rgba(255,51,85,0.18)" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 2, delay: 1.3, ease: "easeInOut" }}
            />

            {/* ── Outer orbit: dots + labels travel together ── */}
            {OUTER_LABELS.map((label, i) => {
              const begin = `${((22 * i) / OUTER_LABELS.length).toFixed(2)}s`;
              const w = pillW(label);
              return (
                <g key={`outer-${label}`}>
                  <animateMotion dur="22s" begin={begin} repeatCount="indefinite" calcMode="linear">
                    <mpath href="#outerOrbitPath" />
                  </animateMotion>
                  {/* glow halo */}
                  <circle r="10" fill="#FF3355" opacity="0.13" />
                  {/* dot */}
                  <circle r="4.5" fill="#FF3355" opacity="0.92" filter="url(#dotGlow)" />
                  {/* label pill */}
                  <rect
                    x={-w / 2} y="-27" width={w} height="16" rx="8"
                    fill="rgba(8,8,8,0.93)" stroke="rgba(255,51,85,0.32)" strokeWidth="0.8"
                  />
                  <text
                    x="0" y="-15" textAnchor="middle"
                    fill="rgba(212,212,212,0.9)" fontSize="9" fontWeight="700"
                    fontFamily="system-ui,sans-serif" letterSpacing="0.3"
                  >
                    {label}
                  </text>
                </g>
              );
            })}

            {/* ── Inner orbit: dots + labels travel together (reversed) ── */}
            {INNER_LABELS.map((label, i) => {
              const begin = `${((14 * i) / INNER_LABELS.length).toFixed(2)}s`;
              const w = pillW(label);
              return (
                <g key={`inner-${label}`}>
                  <animateMotion
                    dur="14s" begin={begin} repeatCount="indefinite"
                    calcMode="linear" keyPoints="1;0" keyTimes="0;1"
                  >
                    <mpath href="#innerOrbitPath" />
                  </animateMotion>
                  {/* glow halo */}
                  <circle r="8" fill="#FF6680" opacity="0.14" />
                  {/* dot */}
                  <circle r="3.5" fill="#FF6680" opacity="0.9" filter="url(#dotGlow)" />
                  {/* label pill */}
                  <rect
                    x={-w / 2} y="-23" width={w} height="14" rx="7"
                    fill="rgba(8,8,8,0.93)" stroke="rgba(255,51,85,0.25)" strokeWidth="0.7"
                  />
                  <text
                    x="0" y="-12" textAnchor="middle"
                    fill="rgba(200,200,200,0.88)" fontSize="8.5" fontWeight="700"
                    fontFamily="system-ui,sans-serif" letterSpacing="0.3"
                  >
                    {label}
                  </text>
                </g>
              );
            })}

            {/* ── Main orb (scale in on scroll) ── */}
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ transformOrigin: `${ORB_CX}px ${ORB_CY}px` }}
            >
              {/* Deep glow ring */}
              <circle cx={ORB_CX} cy={ORB_CY} r={ORB_R + 40} fill="rgba(255,51,85,0.07)" />
              {/* Main orb */}
              <circle
                cx={ORB_CX} cy={ORB_CY} r={ORB_R}
                fill="url(#orbG)"
                filter="url(#orbGlow)"
              />
              {/* Orb border */}
              <circle
                cx={ORB_CX} cy={ORB_CY} r={ORB_R}
                fill="none"
                stroke="rgba(255,102,128,0.6)"
                strokeWidth="1.5"
              />
              {/* Inner highlight */}
              <circle
                cx={ORB_CX - 20} cy={ORB_CY - 22} r={22}
                fill="rgba(255,255,255,0.07)"
              />
            </motion.g>
          </svg>

          {/* ── Badge divs (drop in from above on scroll) ── */}
          {ALL_BADGES.map((b, i) => {
            const leftPct = ((b.cx - BADGE_HALF) / 1000) * 100;
            const topPct  = ((b.cy - BADGE_HALF) / 680)  * 100;
            const isHov   = hovered === b.label;

            return (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: -32, scale: 0.5 }}
                animate={isInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: -32, scale: 0.5 }
                }
                transition={{ duration: 0.55, delay: 0.15 + i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
                style={{
                  position: "absolute",
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  width: `${(BADGE_HALF * 2 / 1000) * 100}%`,
                  aspectRatio: "1",
                }}
                className="cursor-default"
                onMouseEnter={() => setHovered(b.label)}
                onMouseLeave={() => setHovered(null)}
              >
                <motion.div
                  animate={{
                    boxShadow: isHov
                      ? "0 0 28px rgba(255,51,85,0.65), 0 0 56px rgba(255,51,85,0.25)"
                      : "0 0 10px rgba(255,51,85,0.15)",
                    borderColor: isHov ? "rgba(255,51,85,0.75)" : "rgba(255,255,255,0.09)",
                    backgroundColor: isHov ? "rgba(255,51,85,0.2)" : "rgba(10,10,10,0.94)",
                    scale: isHov ? 1.15 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full rounded-full flex items-center justify-center text-accent-mint"
                  style={{ border: "1px solid rgba(255,255,255,0.09)", background: "rgba(10,10,10,0.94)" }}
                >
                  {b.icon}
                </motion.div>

                {/* Tooltip */}
                <AnimatePresence>
                  {isHov && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.85 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.85 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                      style={{ bottom: "115%", marginBottom: "4px" }}
                    >
                      <div style={{
                        background: "rgba(8,8,8,0.98)",
                        border: "1px solid rgba(255,51,85,0.45)",
                        boxShadow: "0 0 28px rgba(255,51,85,0.3)",
                        borderRadius: "12px", padding: "6px 12px",
                        whiteSpace: "nowrap", textAlign: "center",
                      }}>
                        <p className="text-white font-black text-xs">{b.label}</p>
                        <p className="text-text-muted text-[10px]">{b.desc}</p>
                      </div>
                      <div className="absolute left-1/2 -translate-x-1/2 top-full" style={{
                        width: 0, height: 0,
                        borderLeft: "5px solid transparent",
                        borderRight: "5px solid transparent",
                        borderTop: "5px solid rgba(255,51,85,0.45)",
                      }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* ── Brain icon (centered on orb) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute z-10 flex items-center justify-center"
            style={{
              left:   `${((ORB_CX - 44) / 1000) * 100}%`,
              top:    `${((ORB_CY - 44) / 680)  * 100}%`,
              width:  `${(88 / 1000) * 100}%`,
              aspectRatio: "1",
            }}
          >
            <motion.div
              animate={{
                scale:  [1, 1.1, 1],
                filter: [
                  "drop-shadow(0 0 8px rgba(255,255,255,0.8))",
                  "drop-shadow(0 0 20px rgba(255,255,255,1)) drop-shadow(0 0 40px rgba(255,51,85,0.6))",
                  "drop-shadow(0 0 8px rgba(255,255,255,0.8))",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full flex items-center justify-center"
            >
              <Brain className="text-white w-3/4 h-3/4" />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Scrolling marquee ticker ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 2.5 }}
          className="relative overflow-hidden py-4"
        >
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #080808, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #080808, transparent)" }} />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-mint/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-mint/20 to-transparent" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
            className="flex gap-3 w-max"
          >
            {[...MARQUEE, ...MARQUEE].map((skill, i) => (
              <span key={i}
                className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-text-muted text-xs font-semibold whitespace-nowrap hover:text-accent-mint hover:border-accent-mint/25 transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
