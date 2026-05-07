"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, MapPin, Cpu, Sparkles, Download } from "lucide-react";
import { profile } from "@/lib/data";
import { SystemStatus } from "./SystemStatus";

const easeOut = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } }
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="absolute inset-0 grid-overlay" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl container-px">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid gap-10 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-7">
            <motion.div variants={item} className="mb-6 flex flex-wrap items-center gap-2">
              <span className="chip-emerald">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-glow opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-glow" />
                </span>
                System Online
              </span>
              <span className="chip">
                <MapPin size={12} className="text-white/50" />
                {profile.location}
              </span>
              <span className="chip">
                <Sparkles size={12} className="text-cyan-glow" />
                {profile.status}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="font-sans text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Building{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-cyan-glow via-cyan-300 to-emerald-glow bg-clip-text text-transparent">
                  production-grade
                </span>
                <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-cyan-glow/0 via-cyan-glow/60 to-cyan-glow/0" />
              </span>{" "}
              web, mobile, and{" "}
              <span className="bg-gradient-to-r from-emerald-glow to-cyan-glow bg-clip-text text-transparent">
                autonomous AI
              </span>{" "}
              systems.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65"
            >
              I&apos;m <span className="text-white">Rami Kanawati</span> — CTO &amp; Co-founder of{" "}
              <a
                href="https://makkinni.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-cyan-glow/30 text-cyan-glow transition-colors hover:border-cyan-glow hover:text-cyan-300"
              >
                Makkinni LLC
              </a>
              , full-stack engineer at{" "}
              <span className="text-cyan-glow">Continental Food LLC</span> (Dunkin&apos;, GongCha,
              Wonder Bee &amp; Booth Cookies), and architect of autonomous agents on local &amp;
              frontier LLMs. I ship Next.js front ends, React Native apps, and ASP.NET Core APIs
              the kind that survive production.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#ai-lab" className="btn-primary">
                <Cpu size={16} />
                Enter AI Command Center
              </a>
              <a
                href="/Rami_Kanawati_CV.docx"
                download
                className="btn-ghost"
              >
                <Download size={14} />
                Download CV
              </a>
              <a href="#projects" className="btn-ghost">
                View Projects
                <ArrowDown size={14} className="-rotate-45" />
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/5 pt-6 text-sm">
              <div>
                <div className="label-mono">Role</div>
                <div className="mt-1 text-white/85">CTO · Full-Stack</div>
              </div>
              <div>
                <div className="label-mono">Stack</div>
                <div className="mt-1 text-white/85">Next.js · .NET · LLMs</div>
              </div>
              <div>
                <div className="label-mono">Available</div>
                <div className="mt-1 text-white/85">UK · Remote</div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={item} className="lg:col-span-5">
            <SystemStatus />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
