"use client";

import { ArrowUp, Github, Linkedin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  const expertise = [
    "AI & Multi-Agent Systems",
    "Backend Architecture",
    "LLM Integration",
    "RAG Pipelines",
    "DevOps & Cloud",
  ];

  const socials = [
    { icon: <Github className="w-4 h-4" />, href: "https://github.com", name: "GitHub" },
    { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com/in/m-rayan-arif-174063312", name: "LinkedIn" },
  ];

  return (
    <footer className="w-full border-t border-white/[0.05] bg-theme-dark relative z-10 pt-16 pb-8 overflow-hidden text-white">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 pointer-events-none -z-10"
        style={{ background: "radial-gradient(ellipse, rgba(255,51,85,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-14">

          {/* Brand */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accent-mint/10 border border-accent-mint/25 flex items-center justify-center">
                <span className="text-accent-mint font-black text-sm">RA</span>
              </div>
              <span className="font-black text-white text-sm tracking-wide">M. Rayan Arif</span>
            </div>

            <p className="text-text-muted text-xs leading-relaxed max-w-[220px]">
              Senior Backend Engineer & AI Systems Architect. Building production-grade AI
              solutions that solve real problems.
            </p>

            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.07] text-text-muted hover:text-accent-mint hover:border-accent-mint/30 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-5">
            <h3 className="text-white font-bold text-xs uppercase tracking-widest">Navigation</h3>
            <ul className="grid grid-cols-2 gap-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-text-muted hover:text-accent-mint transition-colors text-xs flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent-mint/30 group-hover:bg-accent-mint transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise */}
          <div className="flex flex-col gap-5">
            <h3 className="text-white font-bold text-xs uppercase tracking-widest">Expertise</h3>
            <ul className="flex flex-col gap-2.5">
              {expertise.map((e) => (
                <li key={e} className="text-text-muted text-xs flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  {e}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <h3 className="text-white font-bold text-xs uppercase tracking-widest">Get in Touch</h3>
            <div className="space-y-3">
              <a href="mailto:rayanarif390@gmail.com" className="flex items-center gap-2.5 text-text-muted hover:text-white transition-colors group text-xs">
                <div className="p-1.5 rounded-md bg-white/[0.04] border border-white/[0.07] group-hover:border-accent-mint/20 transition-all">
                  <Mail className="w-3.5 h-3.5 text-accent-mint" />
                </div>
                rayanarif390@gmail.com
              </a>
              <a href="tel:+923256618478" className="flex items-center gap-2.5 text-text-muted hover:text-white transition-colors group text-xs">
                <div className="p-1.5 rounded-md bg-white/[0.04] border border-white/[0.07] group-hover:border-accent-mint/20 transition-all">
                  <Phone className="w-3.5 h-3.5 text-accent-mint" />
                </div>
                +92 325 618478
              </a>
            </div>

            <Link href="/hire">
              <button className="px-5 py-2.5 rounded-xl bg-accent-mint text-white font-bold text-xs transition-all hover:bg-soft-mint shadow-[0_0_16px_rgba(255,51,85,0.2)] hover:shadow-[0_0_24px_rgba(255,51,85,0.35)] hover:-translate-y-0.5 w-fit">
                Hire Me
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-[11px]">
            © {year} M. Rayan Arif. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <Link href="/privacy" className="text-[10px] uppercase tracking-widest text-text-muted hover:text-accent-mint transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[10px] uppercase tracking-widest text-text-muted hover:text-accent-mint transition-colors">Terms</Link>
            <Link href="/delete-account" className="text-[10px] uppercase tracking-widest text-text-muted hover:text-red-400 transition-colors">Delete Account</Link>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-text-muted hover:text-accent-mint transition-colors text-[11px] font-bold uppercase tracking-widest group"
          >
            Top
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
