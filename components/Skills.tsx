"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";
import { skills } from "@/lib/data";

export function Skills() {
  const groups = Object.entries(skills);

  return (
    <Section
      id="skills"
      eyebrow="// CAPABILITIES"
      title={
        <>
          The full{" "}
          <span className="bg-gradient-to-r from-cyan-glow to-emerald-glow bg-clip-text text-transparent">
            arsenal
          </span>
          .
        </>
      }
      subtitle="Languages, frameworks, runtimes, and operating modes I use to ship."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(([group, items], i) => (
          <motion.div
            key={group}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="panel p-5"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-glow-cyan" />
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
                {group}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {items.map((s) => (
                <span key={s} className="chip text-[11px]">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
