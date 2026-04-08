export const dynamic = "force-dynamic";
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const INPUT =
  "w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-300 " +
  "bg-white/[0.04] border border-white/[0.08] focus:border-[rgba(255,51,85,0.55)] focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(255,51,85,0.08)]";

export default function HirePage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    budget: "", projectType: "", details: "",
    referenceLinks: "", bookCall: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === "checkbox"
      ? (e.target as HTMLInputElement).checked
      : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitting(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen w-full" style={{ background: "#080808" }}>
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #FF3355, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #FF6680, transparent 70%)", filter: "blur(50px)" }} />
        <div className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16 md:py-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8" style={{ background: "#FF3355" }} />
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#FF3355" }}>Hire Me</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-3">
            Let&apos;s build{" "}
            <span style={{
              background: "linear-gradient(135deg, #fff 0%, #FF3355 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              something great.
            </span>
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "#6B6B6B" }}>
            Tell me about your project and I&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
          className="relative rounded-2xl p-8 md:p-10"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Top glow */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,51,85,0.07) 0%, transparent 60%)" }} />

          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 gap-4 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <CheckCircle className="w-16 h-16" style={{ color: "#FF3355", filter: "drop-shadow(0 0 20px rgba(255,51,85,0.6))" }} />
                </motion.div>
                <h2 className="text-2xl font-black text-white">Request sent!</h2>
                <p className="text-sm max-w-xs" style={{ color: "#6B6B6B" }}>
                  I&apos;ll review your request and reach out within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="relative z-10 space-y-5"
              >
                {/* Row 1 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#6B6B6B" }}>
                      Full Name <span style={{ color: "#FF3355" }}>*</span>
                    </label>
                    <input required name="name" type="text" value={form.name}
                      onChange={handleChange} placeholder="M. Rayan Arif" className={INPUT} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#6B6B6B" }}>
                      Email Address <span style={{ color: "#FF3355" }}>*</span>
                    </label>
                    <input required name="email" type="email" value={form.email}
                      onChange={handleChange} placeholder="you@company.com" className={INPUT} />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#6B6B6B" }}>Phone Number</label>
                    <input name="phone" type="tel" value={form.phone}
                      onChange={handleChange} placeholder="+92 300 0000000" className={INPUT} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#6B6B6B" }}>Estimated Budget</label>
                    <select name="budget" value={form.budget} onChange={handleChange}
                      className={INPUT} style={{ appearance: "none" }}>
                      <option value="" disabled style={{ background: "#0D0D0D" }}>Select a range</option>
                      <option value="< $1k" style={{ background: "#0D0D0D" }}>Less than $1,000</option>
                      <option value="$1k–$5k" style={{ background: "#0D0D0D" }}>$1,000 – $5,000</option>
                      <option value="$5k–$10k" style={{ background: "#0D0D0D" }}>$5,000 – $10,000</option>
                      <option value="$10k+" style={{ background: "#0D0D0D" }}>$10,000+</option>
                    </select>
                  </div>
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#6B6B6B" }}>
                    Engagement Type <span style={{ color: "#FF3355" }}>*</span>
                  </label>
                  <select required name="projectType" value={form.projectType} onChange={handleChange}
                    className={INPUT} style={{ appearance: "none" }}>
                    <option value="" disabled style={{ background: "#0D0D0D" }}>How would you like to work together?</option>
                    <option value="Project Wise" style={{ background: "#0D0D0D" }}>Project-based (Fixed Rate)</option>
                    <option value="Monthly Hire" style={{ background: "#0D0D0D" }}>Monthly Retainer</option>
                    <option value="Hourly Hire" style={{ background: "#0D0D0D" }}>Hourly Contract</option>
                    <option value="Full-time" style={{ background: "#0D0D0D" }}>Full-time Role</option>
                  </select>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#6B6B6B" }}>
                    Project Details <span style={{ color: "#FF3355" }}>*</span>
                  </label>
                  <textarea required name="details" rows={5} value={form.details}
                    onChange={handleChange}
                    placeholder="Describe your project, tech stack requirements, goals, and timeline..."
                    className={`${INPUT} resize-none`} />
                </div>

                {/* Reference links */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#6B6B6B" }}>Reference Links</label>
                  <input name="referenceLinks" type="url" value={form.referenceLinks}
                    onChange={handleChange} placeholder="https://example.com" className={INPUT} />
                </div>

                {/* Book call */}
                <label className="flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <input type="checkbox" name="bookCall" checked={form.bookCall} onChange={handleChange}
                    className="w-4 h-4 rounded accent-[#FF3355] cursor-pointer" />
                  <span className="text-sm font-semibold text-white/80">I&apos;d like to book an introductory call</span>
                </label>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="relative w-full group flex items-center justify-center gap-2.5 py-4 rounded-xl font-black text-sm text-white overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, #FF3355 0%, #CC1133 100%)",
                    boxShadow: "0 0 28px rgba(255,51,85,0.3)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                  />
                  <span className="relative z-10">{submitting ? "Sending..." : "Submit Request"}</span>
                  {!submitting && (
                    <Send className="relative z-10 w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
