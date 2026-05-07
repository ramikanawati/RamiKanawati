"use client";

import { Github, Linkedin, Youtube } from "lucide-react";
import { profile } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/40 to-transparent" />

      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 container-px py-10 sm:flex-row sm:items-center">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
            // SIGNED OFF
          </div>
          <div className="mt-1 text-sm text-white/70">
            Built &amp; maintained by{" "}
            <span className="text-white">{profile.name}</span> · Next.js · Tailwind · Framer Motion
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70 transition-all hover:border-cyan-glow/30 hover:text-cyan-glow"
          >
            <Github size={15} />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70 transition-all hover:border-cyan-glow/30 hover:text-cyan-glow"
          >
            <Linkedin size={15} />
          </a>
          <a
            href={profile.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70 transition-all hover:border-red-500/30 hover:text-red-400"
          >
            <Youtube size={15} />
          </a>
          <span className="ml-2 font-mono text-xs text-white/40">© {year}</span>
        </div>
      </div>
    </footer>
  );
}
