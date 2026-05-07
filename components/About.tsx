"use client";

import { motion } from "framer-motion";
import { GraduationCap, Building2 } from "lucide-react";
import { Section } from "./Section";
import { summary } from "@/lib/data";

const stats = [
  { label: "Years shipping production", value: "4+" },
  { label: "Platforms architected", value: "6" },
  { label: "Countries deployed in", value: "2" },
  { label: "AI agents built", value: "5+" }
];

const facts = [
  {
    icon: GraduationCap,
    label: "Education",
    value: "BSc Computer Science · University of Wollongong, 2022"
  },
  {
    icon: Building2,
    label: "Current Roles",
    value: "Co-founder & CTO @ Makkinni LLC · App Developer @ Continental Food LLC (Dunkin', GongCha, Wonder Bee, Booth Cookies)"
  }
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="// IDENTITY"
      title={
        <>
          A founder who still ships{" "}
          <span className="bg-gradient-to-r from-cyan-glow to-emerald-glow bg-clip-text text-transparent">
            the code
          </span>
          .
        </>
      }
      subtitle="From loyalty platforms in the Gulf to autonomous agents on local LLMs — here&apos;s the operating context."
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="panel lg:col-span-7 p-6 sm:p-8"
        >
          <p className="text-base leading-relaxed text-white/75 sm:text-lg">{summary}</p>

          <div className="mt-8 space-y-4">
            {facts.map((f) => (
              <div key={f.label} className="flex items-start gap-4">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-ink-800/70 text-cyan-glow">
                  <f.icon size={16} />
                </div>
                <div>
                  <div className="label-mono">{f.label}</div>
                  <div className="mt-0.5 text-sm text-white/85">{f.value}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 lg:col-span-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="panel relative overflow-hidden p-5"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/40 to-transparent" />
              <div className="font-mono text-3xl font-semibold text-white sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-2 text-xs text-white/55">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
