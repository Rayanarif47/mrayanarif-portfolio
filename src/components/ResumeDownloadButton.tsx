"use client";

import { FileText } from "lucide-react";
import clsx from "clsx";

interface ResumeDownloadButtonProps {
  className?: string;
  variant?: "outline" | "filled";
}

const RESUME_URL =
  "https://drive.google.com/uc?export=download&id=1NwoXr4XIrsg5AMKeEeKBC7zLKlo87-xs";

export const ResumeDownloadButton = ({ className, variant = "outline" }: ResumeDownloadButtonProps) => {
  const baseStyles =
    "flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium transition-all";
  const variantStyles =
    variant === "outline"
      ? "bg-white/[0.04] text-white border border-white/10 hover:bg-white/[0.08] hover:border-white/20"
      : "bg-accent-mint text-white font-bold hover:bg-soft-mint shadow-[0_0_20px_rgba(255,51,85,0.25)]";

  return (
    <a
      href={RESUME_URL}
      download="Rayan_Arif_Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(baseStyles, variantStyles, className)}
    >
      <FileText className="w-4 h-4" />
      Resume
    </a>
  );
};
