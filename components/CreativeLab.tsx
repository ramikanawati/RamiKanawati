"use client";

import { motion } from "framer-motion";
import { Youtube, Gamepad2, Box, Sparkles } from "lucide-react";
import clsx from "clsx";
import { Section } from "./Section";
import { creativeLab, profile } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  "Unreal Engine · Game": Gamepad2,
  "Unity · Game": Gamepad2,
  "Autodesk Maya · Render": Box
};

export function CreativeLab() {
  return (
    <Section
      id="creative"
      eyebrow="// CREATIVE LAB"
      title={
        <>
          Web Developer by day,{" "}
          <span className="bg-gradient-to-r from-cyan-glow to-emerald-glow bg-clip-text text-transparent">
            game developer
          </span>{" "}
          by night.
        </>
      }
      subtitle="Before production engineering, I shipped 3D renders in Maya and game prototypes in Unity & Unreal. Some of it lives on YouTube."
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <motion.a
          href={profile.social.youtube}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="panel-glow group relative flex flex-col justify-between overflow-hidden p-6 sm:p-8 lg:col-span-5"
        >
          <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-red-500/10 blur-3xl transition-all group-hover:bg-red-500/20" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-red-500/5 to-transparent" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-md border border-red-500/30 bg-red-500/10 text-red-400">
                <Youtube size={20} />
              </div>
              <div>
                <div className="label-mono">Channel</div>
                <div className="text-sm font-medium text-white">YouTube · Rami Kanawati</div>
              </div>
            </div>
            <h3 className="mt-6 text-2xl font-semibold leading-tight text-white sm:text-3xl">
              University-era games &amp; 3D renders.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              An archive of my early work — Unreal Engine and Unity gameplay captures, plus
              Autodesk Maya animation and rendering reels. The roots of how I think about systems
              today.
            </p>
          </div>

          <div className="relative mt-8 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-white/55">
              Visit channel →
            </span>
            <Sparkles size={16} className="text-cyan-glow opacity-70 transition-transform group-hover:scale-110" />
          </div>
        </motion.a>

        <div className="grid gap-4 lg:col-span-7">
          {creativeLab.map((work, i) => {
            const Icon = iconMap[work.type] ?? Gamepad2;
            return (
              <motion.div
                key={work.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="panel-glow flex items-start gap-4 p-5 sm:p-6"
              >
                <div
                  className={clsx(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-md border",
                    i % 2 === 0
                      ? "border-cyan-glow/30 bg-cyan-glow/5 text-cyan-glow"
                      : "border-emerald-glow/30 bg-emerald-glow/5 text-emerald-glow"
                  )}
                >
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h4 className="text-base font-semibold text-white">{work.title}</h4>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-white/45">
                      {work.type}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-white/60">{work.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {work.tags.map((t) => (
                      <span key={t} className="chip text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
