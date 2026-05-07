"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

type Props = {
  id: string;
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, eyebrow, title, subtitle, className, children }: Props) {
  return (
    <section id={id} className={clsx("relative py-24 sm:py-32", className)}>
      <div className="mx-auto max-w-7xl container-px">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-12"
        >
          {eyebrow && (
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-cyan-glow to-transparent" />
              <span className="label-mono text-cyan-glow">{eyebrow}</span>
            </div>
          )}
          <h2 className="heading-display max-w-3xl">{title}</h2>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-lg text-white/60">{subtitle}</p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
