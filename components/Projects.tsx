"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Bot, Brain, Building2, Smartphone, Boxes, Compass } from "lucide-react";
import clsx from "clsx";
import { Section } from "./Section";
import { projects, type Project } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  jobhunter: Bot,
  jarvis: Brain,
  makkinni: Building2,
  tradewhiz: Smartphone,
  dunkin: Boxes,
  marjn: Compass
};

const statusMap: Record<Project["status"], { label: string; cls: string }> = {
  shipped: { label: "Shipped", cls: "border-emerald-glow/30 bg-emerald-glow/5 text-emerald-glow" },
  "in-development": {
    label: "In Development",
    cls: "border-cyan-glow/30 bg-cyan-glow/5 text-cyan-glow"
  },
  private: { label: "Private", cls: "border-white/10 bg-white/5 text-white/70" }
};

function Card({ p, index }: { p: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const Icon = iconMap[p.slug] ?? Boxes;
  const status = statusMap[p.status];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className="group relative"
    >
      <motion.div style={{ y }} className="panel-glow flex h-full flex-col p-6 sm:p-7">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="flex items-start justify-between">
          <div
            className={clsx(
              "flex h-11 w-11 items-center justify-center rounded-md border",
              p.accent === "cyan"
                ? "border-cyan-glow/30 bg-cyan-glow/5 text-cyan-glow"
                : "border-emerald-glow/30 bg-emerald-glow/5 text-emerald-glow"
            )}
          >
            <Icon size={18} />
          </div>
          <span className={clsx("rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest", status.cls)}>
            {status.label}
          </span>
        </div>

        <div className="mt-5">
          <span className="label-mono">{p.category}</span>
          <h3 className="mt-2 text-xl font-semibold text-white">{p.name}</h3>
          <p className="mt-1 text-sm text-white/55">{p.tagline}</p>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-white/65">{p.description}</p>

        {p.metrics && (
          <div className="mt-5 grid grid-cols-3 gap-2">
            {p.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-md border border-white/5 bg-ink-800/60 px-3 py-2"
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  {m.label}
                </div>
                <div className="mt-0.5 font-mono text-sm text-white">{m.value}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span key={s} className="chip text-[11px]">
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="// FIELD MANUAL"
      title={
        <>
          Projects in production &amp;{" "}
          <span className="bg-gradient-to-r from-cyan-glow to-emerald-glow bg-clip-text text-transparent">
            in motion
          </span>
          .
        </>
      }
      subtitle="A cross-section of what I build — agents, mobile apps, and full-stack platforms."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Card key={p.slug} p={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
