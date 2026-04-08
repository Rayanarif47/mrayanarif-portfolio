"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
    }, 3000);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-theme-dark overflow-hidden"
        >
          {/* Background grid */}
          <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          {/* Ambient glow blobs */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ width: 420, height: 420, background: "radial-gradient(ellipse, rgba(255,51,85,0.10) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ width: 200, height: 200, background: "radial-gradient(ellipse, rgba(255,51,85,0.18) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />

          {/* ── Shield logo + rings ── */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative flex items-center justify-center z-10"
          >
            {/* Outermost slow ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute rounded-full"
              style={{
                width: 170, height: 170,
                border: "1.5px solid transparent",
                borderTopColor: "rgba(255,51,85,0.7)",
                borderRightColor: "rgba(255,51,85,0.15)",
                borderBottomColor: "rgba(255,51,85,0.5)",
                borderLeftColor: "rgba(255,51,85,0.1)",
              }}
            />
            {/* Middle ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
              className="absolute rounded-full"
              style={{
                width: 136, height: 136,
                border: "1px solid transparent",
                borderTopColor: "rgba(255,102,128,0.5)",
                borderRightColor: "transparent",
                borderBottomColor: "rgba(255,102,128,0.35)",
                borderLeftColor: "transparent",
              }}
            />
            {/* Inner pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute rounded-full"
              style={{
                width: 108, height: 108,
                border: "1px solid rgba(255,51,85,0.4)",
              }}
            />

            {/* Shield image */}
            <motion.img
              src="/ra-shield.png"
              alt="RA Shield"
              className="relative z-10 select-none"
              style={{ width: 86, height: 86, objectFit: "contain" }}
              animate={{
                filter: [
                  "drop-shadow(0 0 6px rgba(255,51,85,0.5)) drop-shadow(0 0 14px rgba(255,51,85,0.2))",
                  "drop-shadow(0 0 16px rgba(255,51,85,0.9)) drop-shadow(0 0 36px rgba(255,51,85,0.45))",
                  "drop-shadow(0 0 6px rgba(255,51,85,0.5)) drop-shadow(0 0 14px rgba(255,51,85,0.2))",
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* ── MRA logo ── */}
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
            className="mt-10 flex flex-col items-center gap-3 z-10"
          >
            <motion.img
              src="/mra-logo.png"
              alt="M. Rayan Arif"
              className="select-none"
              style={{ height: 56, objectFit: "contain" }}
              animate={{
                filter: [
                  "drop-shadow(0 0 4px rgba(255,51,85,0.4))",
                  "drop-shadow(0 0 14px rgba(255,51,85,0.75)) drop-shadow(0 0 28px rgba(255,51,85,0.3))",
                  "drop-shadow(0 0 4px rgba(255,51,85,0.4))",
                ],
              }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />

            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.38em" }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="text-text-muted text-[9px] uppercase"
            >
              AI Systems Architect
            </motion.p>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="absolute bottom-10 w-32 h-[2px] rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.06)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(to right, #FF3355, #FF6B80)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.0, delay: 0.9, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
