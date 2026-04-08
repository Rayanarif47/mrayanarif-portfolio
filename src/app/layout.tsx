import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

import NextTopLoader from "nextjs-toploader";
import { ClientLayoutWrapper } from "@/components/ClientLayoutWrapper";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "M. Rayan Arif | Senior Backend Engineer & AI Systems Architect",
  description: "Senior Backend Engineer and AI Systems Architect with 5 years of experience. Specializing in Python, Django, FastAPI, multi-agent AI systems, and LLM integrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={clsx(nunitoSans.variable, "antialiased bg-theme-dark overflow-x-hidden w-full min-h-screen text-white selection:bg-accent-mint/20")}>
        <NextTopLoader
          color="#FF3355"
          initialPosition={0.08}
          crawlSpeed={200}
          height={2}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #FF3355,0 0 5px #FF3355"
        />
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
