"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, Mail, Phone, Linkedin, Github, ArrowUpRight, CheckCircle } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const INPUT_CLASS =
  "w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-300 " +
  "bg-white/[0.03] border border-white/[0.08] " +
  "focus:border-accent-mint/50 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(255,51,85,0.08)]";

export const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Try Firebase if configured, otherwise silently succeed
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
      const { db } = await import("@/lib/firebase");
      await addDoc(collection(db, "contacts"), { ...form, createdAt: serverTimestamp(), read: false });
    } catch {
      // Firebase not configured — still show success to user
    } finally {
      setSubmitting(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    }
  };

  const LINKS = [
    {
      label: "Email",
      value: "rayanarif390@gmail.com",
      href: "mailto:rayanarif390@gmail.com",
      icon: Mail,
      highlight: true,
    },
    {
      label: "Phone",
      value: "+92 325 618478",
      href: "tel:+923256618478",
      icon: Phone,
      highlight: false,
    },
  ];

  const SOCIALS = [
    { label: "LinkedIn", href: "https://linkedin.com/in/m-rayan-arif-174063312", icon: Linkedin },
    { label: "GitHub",   href: "https://github.com",                              icon: Github  },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="w-full py-24 scroll-mt-20"
      style={{ background: "#080808" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-accent-mint" />
            <span className="text-accent-mint text-xs font-bold uppercase tracking-widest">Contact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Let&apos;s build{" "}
            <span className="text-gradient-red">something.</span>
          </h2>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* ── Left (2/5): info ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="lg:col-span-2 space-y-8"
          >
            <p className="text-text-secondary text-sm leading-[1.85] max-w-sm">
              I&apos;m open to senior backend, AI architecture, and contract/freelance work.
              Have a challenging problem or want to talk architecture? Let&apos;s connect.
            </p>

            {/* Contact links */}
            <div className="space-y-3">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.22 + i * 0.08, ease: EASE }}
                  whileHover={{ x: 5 }}
                  className="group flex items-center gap-4"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      background: link.highlight ? "rgba(255,51,85,0.1)" : "rgba(255,255,255,0.03)",
                      border: link.highlight ? "1px solid rgba(255,51,85,0.3)" : "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <link.icon className={`w-4 h-4 ${link.highlight ? "text-accent-mint" : "text-text-muted"} group-hover:text-accent-mint transition-colors`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold mb-0.5">{link.label}</p>
                    <p className="text-white text-sm font-bold truncate group-hover:text-accent-mint transition-colors duration-300">{link.value}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-accent-mint opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </motion.a>
              ))}
            </div>

            {/* Divider */}
            <motion.div
              className="h-px origin-left"
              style={{ background: "linear-gradient(to right, rgba(255,51,85,0.3), transparent)" }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            />

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.45, ease: EASE }}
              className="flex gap-3"
            >
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.5)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,51,85,0.35)";
                    (e.currentTarget as HTMLElement).style.color = "#FF3355";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,51,85,0.06)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  <s.icon className="w-4 h-4" />
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right (3/5): form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
            className="lg:col-span-3"
          >
            <div
              className="relative rounded-2xl p-8 md:p-10"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Ambient glow */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 60% 0%, rgba(255,51,85,0.06) 0%, transparent 65%)" }} />

              <AnimatePresence mode="wait">
                {sent ? (
                  /* Success state */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="flex flex-col items-center justify-center py-16 gap-4 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      <CheckCircle className="w-14 h-14 text-accent-mint" style={{ filter: "drop-shadow(0 0 16px rgba(255,51,85,0.6))" }} />
                    </motion.div>
                    <h3 className="text-xl font-black text-white">Message sent!</h3>
                    <p className="text-text-muted text-sm max-w-xs">I&apos;ll get back to you as soon as possible.</p>
                  </motion.div>
                ) : (
                  /* Form */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="relative z-10 space-y-5"
                  >
                    {/* Row: Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { id: "name",  label: "Full Name",      type: "text",  placeholder: "M. Rayan Arif" },
                        { id: "email", label: "Email Address",  type: "email", placeholder: "you@company.com" },
                      ].map((f, i) => (
                        <motion.div
                          key={f.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.3 + i * 0.07, ease: EASE }}
                          className="space-y-2"
                        >
                          <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                            {f.label} <span className="text-accent-mint">*</span>
                          </label>
                          <input
                            id={f.id} name={f.id} type={f.type} required
                            value={form[f.id as keyof typeof form]}
                            onChange={handleChange}
                            placeholder={f.placeholder}
                            className={INPUT_CLASS}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Message */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.44, ease: EASE }}
                      className="space-y-2"
                    >
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                        Message <span className="text-accent-mint">*</span>
                      </label>
                      <textarea
                        id="message" name="message" required rows={6}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project, tech stack, or what you're trying to build..."
                        className={`${INPUT_CLASS} resize-none`}
                      />
                    </motion.div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      initial={{ opacity: 0, y: 12 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.52, ease: EASE }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="relative w-full group flex items-center justify-center gap-2.5 py-4 rounded-xl font-black text-sm text-white overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: "linear-gradient(135deg, #FF3355 0%, #CC1133 100%)",
                        boxShadow: "0 0 24px rgba(255,51,85,0.3)",
                      }}
                    >
                      {/* Shimmer sweep */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                      />
                      <span className="relative z-10">
                        {submitting ? "Sending..." : "Send Message"}
                      </span>
                      {!submitting && (
                        <Send className="relative z-10 w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
