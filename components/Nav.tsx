"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import clsx from "clsx";

const links = [
  { href: "#about", label: "About" },
  { href: "#ai-lab", label: "AI Lab" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#creative", label: "Creative" },
  { href: "#contact", label: "Contact" }
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/5 bg-ink-950/70 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between container-px py-4">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-md border border-cyan-glow/40 bg-cyan-glow/5 font-mono text-sm font-bold text-cyan-glow shadow-glow-cyan">
            RK
            <span className="absolute -inset-px rounded-md border border-cyan-glow/20 opacity-0 transition-opacity group-hover:opacity-100" />
          </span>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-semibold text-white">Rami Kanawati</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Tech Lead · Engineer
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/Rami_Kanawati_CV.docx"
            download
            className="ml-2 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition-all hover:border-white/20 hover:text-white"
          >
            <Download size={14} />
            CV
          </a>
          <a
            href="#contact"
            className="ml-1 inline-flex items-center gap-2 rounded-md border border-cyan-glow/40 bg-cyan-glow/10 px-4 py-2 text-sm font-medium text-cyan-glow transition-all hover:bg-cyan-glow/20 hover:shadow-glow-cyan"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-glow opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-glow" />
            </span>
            Initiate
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-white/5 bg-ink-950/90 backdrop-blur-xl"
          >
            <div className="mx-auto flex max-w-7xl flex-col container-px py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm text-white/80 transition-colors hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
