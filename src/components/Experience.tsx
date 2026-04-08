"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ExperienceData {
  id: string;
  title: string;
  company: string;
  date: string;
  description: string;
  order: number;
}

/* Fallback data so the section always renders even without Firestore */
const FALLBACK: ExperienceData[] = [
  {
    id: "1",
    title: "Tech Lead – AI Engineers",
    company: "Artilence",
    date: "Jan 2025 – Jan 2026",
    description:
      "Led a team of AI and backend engineers building production-grade AI solutions. Architected multi-agent and RAG-based systems using LLMs, vector databases, and external tools. Owned technical decisions including model selection, infrastructure, and scalability.",
    order: 1,
  },
  {
    id: "2",
    title: "Senior Software Engineer",
    company: "Artilence",
    date: "Jan 2024 – Dec 2024",
    description:
      "Developed backend services and REST APIs using Python, Django, and FastAPI for international client projects. Implemented data-processing and automation pipelines supporting high-volume, business-critical workloads.",
    order: 2,
  },
  {
    id: "3",
    title: "Software Engineer",
    company: "Devsinc",
    date: "Jan 2022 – Dec 2023",
    description:
      "Contributed to backend modules and RESTful API endpoints. Took ownership of bug resolution, feature implementation, and third-party integrations. Participated in code reviews, sprint planning, and agile ceremonies.",
    order: 3,
  },
  {
    id: "4",
    title: "Associate Software Engineer",
    company: "Devsinc",
    date: "Jan 2021 – Dec 2021",
    description:
      "Gained foundational hands-on experience with Django and Python in a production environment. Built core backend skills through collaborative team development and client requirement analysis.",
    order: 4,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* Accent color per company */
const COMPANY_COLORS: Record<string, string> = {
  Artilence: "#FF3355",
  Devsinc: "#FF6B80",
};

export const Experience = () => {
  const experiences = FALLBACK;

  return (
    <section id="experience" className="w-full py-20 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex items-center gap-3 mb-4"
      >
        <span className="h-px w-8 bg-accent-mint" />
        <span className="text-accent-mint text-xs font-bold uppercase tracking-widest">Experience</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, delay: 0.05, ease: EASE }}
        className="text-4xl md:text-5xl font-black tracking-tight mb-14"
      >
        Work <span className="text-gradient-red">Experience.</span>
      </motion.h2>

      {/* Bento grid */}
      <div className="grid sm:grid-cols-2 gap-5">
        {experiences.map((exp, idx) => {
          const accent = COMPANY_COLORS[exp.company] ?? "#FF3355";

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: EASE }}
              whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
              className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-7 hover:border-accent-mint/25 transition-all duration-300 overflow-hidden cursor-default"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top left, ${accent}0D 0%, transparent 70%)` }}
              />

              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-bl-full"
                style={{ background: `radial-gradient(ellipse at top right, ${accent}15 0%, transparent 70%)` }}
              />

              <div className="relative z-10 h-full flex flex-col">
                {/* Company + date row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    {/* Company initial circle */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white shrink-0"
                      style={{ background: `${accent}22`, border: `1px solid ${accent}40` }}
                    >
                      {exp.company[0]}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{exp.company}</p>
                      <p className="text-text-muted text-[11px]">{exp.date}</p>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-3.5 h-3.5 text-accent-mint" />
                  </div>
                </div>

                {/* Role title */}
                <h3 className="text-white font-black text-xl mb-4 leading-tight group-hover:text-accent-mint transition-colors">
                  {exp.title}
                </h3>

                {/* Description */}
                <p className="text-text-muted text-sm leading-relaxed flex-1">
                  {exp.description}
                </p>

                {/* Bottom border flare */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                  style={{ background: `linear-gradient(to right, ${accent}60, transparent)` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
