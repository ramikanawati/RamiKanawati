"use client";

import { motion } from "framer-motion";
import { MapPin, Github, Linkedin, Youtube, Lock } from "lucide-react";
import { Section } from "./Section";
import { profile } from "@/lib/data";
import { ContactForm } from "./ContactForm";

const socials = [
  { icon: Github, label: "GitHub", href: profile.social.github },
  { icon: Linkedin, label: "LinkedIn", href: profile.social.linkedin },
  { icon: Youtube, label: "YouTube", href: profile.social.youtube }
];

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="// HANDSHAKE"
      title={
        <>
          Let&apos;s build something{" "}
          <span className="bg-gradient-to-r from-cyan-glow to-emerald-glow bg-clip-text text-transparent">
            worth shipping
          </span>
          .
        </>
      }
      subtitle="Open to tech lead, lead engineer, and AI-agent build engagements. UK-based · remote-friendly · happy to relocate."
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="panel-glow relative overflow-hidden p-6 sm:p-8 lg:col-span-7"
        >
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-glow/10 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-emerald-glow/10 blur-3xl" />

          <div className="relative">
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="chip-emerald">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-glow opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-glow" />
                </span>
                Channel open
              </span>
              <span className="chip text-[11px]">
                <Lock size={11} className="text-cyan-glow" />
                Private inbox
              </span>
            </div>

            <h3 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
              Send a message.
            </h3>
            <p className="mt-2 max-w-xl text-sm text-white/60">
              The form below routes straight to my inbox. I keep my email and number
              off the public site to stay out of the scraping / spam loop.
            </p>

            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="space-y-4 lg:col-span-5"
        >
          <div className="panel relative overflow-hidden p-6 sm:p-7">
            <div className="font-mono text-[12px] leading-relaxed">
              <div className="mb-3 flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-white/45">~/handshake.sh</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-glow">
                  ready
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="text-white/45">$ status --availability</div>
                <div className="text-cyan-glow">→ {profile.status}</div>
                <div className="text-white/45">$ region --list</div>
                <div className="text-white/80">→ UK (Ely) · UAE</div>
                <div className="text-white/80">→ remote · open to relocation</div>
                <div className="text-white/45">$ engagements --types</div>
                <div className="text-white/80">→ tech lead</div>
                <div className="text-white/80">→ lead engineer (full-stack / mobile)</div>
                <div className="text-white/80">→ AI agent build / consult</div>
                <div className="text-white/45">$ response_time</div>
                <div className="text-white/80">→ ~24h</div>
                <div className="mt-3 text-white/70">
                  $ <span className="text-cyan-glow">awaiting message</span>
                  <span className="caret"></span>
                </div>
              </div>
            </div>
          </div>

          <div className="panel p-5">
            <div className="mb-3 flex items-center gap-2">
              <MapPin size={14} className="text-cyan-glow" />
              <span className="label-mono">Based in</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-white/85">
                <span className="font-mono text-xs text-cyan-glow">UK</span>
                <span className="text-white/40">·</span>
                <span>Ely, United Kingdom</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/85">
                <span className="font-mono text-xs text-emerald-glow">UAE</span>
                <span className="text-white/40">·</span>
                <span>United Arab Emirates</span>
              </div>
            </div>
            <div className="mt-3 text-xs text-white/45">
              Splitting time across both · remote-friendly · open to relocation
            </div>
          </div>

          <div className="panel p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-glow-cyan" />
              <span className="label-mono">Find me elsewhere</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-xs"
                >
                  <s.icon size={14} />
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
