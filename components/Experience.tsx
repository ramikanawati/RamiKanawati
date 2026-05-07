"use client";

import { motion } from "framer-motion";
import { Briefcase, ChevronRight, ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { Section } from "./Section";
import { experiences } from "@/lib/data";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="// TIMELINE"
      title={
        <>
          Roles that{" "}
          <span className="bg-gradient-to-r from-cyan-glow to-emerald-glow bg-clip-text text-transparent">
            shipped
          </span>
          .
        </>
      }
      subtitle="From CTO of a marketplace startup to architecting Dunkin's loyalty stack across two countries."
    >
      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-0 bottom-0 hidden w-px bg-gradient-to-b from-cyan-glow/30 via-white/10 to-transparent sm:block" />

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.article
              key={exp.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative sm:pl-12"
            >
              <div
                className={clsx(
                  "absolute left-0 top-6 hidden h-8 w-8 items-center justify-center rounded-full border bg-ink-900 sm:flex",
                  exp.accent === "cyan"
                    ? "border-cyan-glow/40 text-cyan-glow shadow-glow-cyan"
                    : "border-emerald-glow/40 text-emerald-glow shadow-glow-emerald"
                )}
              >
                <Briefcase size={14} />
              </div>

              <div className="panel-glow p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                      <span className="text-white/30">·</span>
                      {exp.website ? (
                        <a
                          href={exp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={clsx(
                            "group/link inline-flex items-center gap-1 text-base font-medium transition-opacity hover:opacity-80",
                            exp.accent === "cyan" ? "text-cyan-glow" : "text-emerald-glow"
                          )}
                        >
                          {exp.company}
                          <ArrowUpRight
                            size={14}
                            className="opacity-60 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:opacity-100"
                          />
                        </a>
                      ) : (
                        <span
                          className={clsx(
                            "text-base font-medium",
                            exp.accent === "cyan" ? "text-cyan-glow" : "text-emerald-glow"
                          )}
                        >
                          {exp.company}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-xs text-white/45">{exp.type}</div>
                  </div>
                  <span className="font-mono text-xs text-white/55">{exp.period}</span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-white/70">{exp.description}</p>

                <ul className="mt-4 space-y-2">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 text-sm text-white/65">
                      <ChevronRight
                        size={14}
                        className={clsx(
                          "mt-1 shrink-0",
                          exp.accent === "cyan" ? "text-cyan-glow" : "text-emerald-glow"
                        )}
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {exp.tags.map((t) => (
                    <span key={t} className="chip text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}
