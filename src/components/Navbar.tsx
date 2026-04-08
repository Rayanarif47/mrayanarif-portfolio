"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Briefcase } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const EASE = [0.22, 1, 0.36, 1] as const;

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Experience", href: "/#experience" },
  { name: "Projects", href: "/#projects" },
  { name: "Skills", href: "/#skills" },
  { name: "Contact", href: "/#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Track active section via IntersectionObserver */
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("/#", ""));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/") {
      const hash = href.replace("/", "");
      const element = document.querySelector(hash);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
      }
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Navbar entrance animation */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "pt-3 px-4 md:px-6" : "pt-0 px-0"}`}
      >
        <nav
          className={`mx-auto max-w-7xl transition-all duration-500 flex items-center justify-between ${
            isScrolled
              ? "bg-[#080808]/85 backdrop-blur-2xl py-3 px-6 md:px-8 rounded-full border border-white/[0.07] shadow-[0_0_0_1px_rgba(255,51,85,0.08),0_8px_40px_rgba(0,0,0,0.6)]"
              : "bg-transparent py-5 px-6 md:px-12"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2.5 group relative z-50"
          >
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 flex items-center justify-center relative"
            >
              <motion.img
                src="/ra-shield.png"
                alt="RA"
                className="w-full h-full object-contain select-none"
                animate={{
                  filter: [
                    "drop-shadow(0 0 3px rgba(255,51,85,0.4))",
                    "drop-shadow(0 0 8px rgba(255,51,85,0.8))",
                    "drop-shadow(0 0 3px rgba(255,51,85,0.4))",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <span className="text-white font-black text-sm tracking-wide hidden sm:block group-hover:text-accent-mint transition-colors duration-300">
              Rayan Arif
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => {
              const sectionId = link.href.replace("/#", "");
              const isActive = activeSection === sectionId;

              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.4, ease: EASE }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`relative px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer group ${
                      isActive ? "text-accent-mint" : "text-text-muted hover:text-white"
                    }`}
                  >
                    {link.name}
                    {/* Active/hover underline */}
                    <span
                      className={`absolute bottom-0.5 left-3 right-3 h-[1.5px] rounded-full bg-accent-mint transition-all duration-300 origin-left ${
                        isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60"
                      }`}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Hire Me CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4, ease: EASE }}
            className="hidden md:flex"
          >
            <Link
              href="/#contact"
              className="relative group flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs tracking-wide text-white overflow-hidden transition-all"
              style={{
                background: "linear-gradient(135deg, #FF3355 0%, #CC1133 100%)",
                boxShadow: "0 0 20px rgba(255,51,85,0.35)",
              }}
            >
              {/* Hover shimmer */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none"
              />
              <Briefcase className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">Hire Me</span>
            </Link>
          </motion.div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="md:hidden mx-4 mt-2 bg-[#0D0D0D]/95 backdrop-blur-2xl border border-white/[0.07] rounded-2xl py-5 px-6 flex flex-col gap-1 shadow-2xl"
              style={{ boxShadow: "0 0 0 1px rgba(255,51,85,0.08), 0 24px 60px rgba(0,0,0,0.7)" }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25, ease: EASE }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="block py-2.5 text-sm font-semibold text-text-muted hover:text-accent-mint transition-colors uppercase tracking-wider border-b border-white/[0.04] last:border-0"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.25, ease: EASE }}
                className="pt-3"
              >
                <Link
                  href="/#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white w-fit"
                  style={{ background: "linear-gradient(135deg, #FF3355 0%, #CC1133 100%)" }}
                >
                  <Briefcase className="w-4 h-4" />
                  Hire Me
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};
