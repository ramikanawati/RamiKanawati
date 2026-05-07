"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bot, Brain, Lock, Activity, Zap, Network } from "lucide-react";
import { Section } from "./Section";

type Line = { text: string; type: "info" | "ok" | "warn" | "agent" };

const jobhunterStream: Line[] = [
  { text: "$ jobhunter --watch --sources=reed,adzuna,greenhouse,lever,jsearch", type: "info" },
  { text: "[boot] Loading Ollama runtime · model=qwen2.5:14b", type: "info" },
  { text: "[boot] Telegram bot online · listening for /scan", type: "ok" },
  { text: "[scan] Pulled 312 listings across 5 boards", type: "info" },
  { text: "[score] Local LLM scoring fit (0-100)... 312/312", type: "info" },
  { text: "[match] 14 listings ≥ 78 score · top: Senior Full-Stack @ FinOps Co.", type: "ok" },
  { text: "[gen] Tailored CV + cover letter → ./out/finops-co.pdf", type: "ok" },
  { text: "[push] Telegram digest sent · awaiting /apply", type: "agent" }
];

const jarvisStream: Line[] = [
  { text: "$ jarvis attach --mode=hybrid", type: "info" },
  { text: "[ctx] Loading personal memory store · 4,182 entries", type: "info" },
  { text: "[mcp] Connected: filesystem, calendar, github, browser", type: "ok" },
  { text: "[route] frontier=claude-opus · local=qwen2.5", type: "info" },
  { text: "[task] Triaging inbox · 12 actionable", type: "agent" },
  { text: "[task] Drafted 4 replies · 3 archived · 1 escalated", type: "ok" },
  { text: "[task] Standby for voice command", type: "agent" }
];

function Terminal({
  title,
  badge,
  lines,
  accent
}: {
  title: string;
  badge: string;
  lines: Line[];
  accent: "cyan" | "emerald";
}) {
  const [shown, setShown] = useState(0);
  const accentClass = accent === "cyan" ? "text-cyan-glow" : "text-emerald-glow";
  const dotClass = accent === "cyan" ? "bg-cyan-glow" : "bg-emerald-glow";

  useEffect(() => {
    if (shown >= lines.length) return;
    const id = setTimeout(() => setShown((s) => s + 1), 700);
    return () => clearTimeout(id);
  }, [shown, lines.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="panel-glow relative"
    >
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className={`h-2.5 w-2.5 rounded-full ${dotClass}/70`} />
          </div>
          <span className="ml-2 font-mono text-xs text-white/55">~/{title}</span>
        </div>
        <span className={`font-mono text-[10px] uppercase tracking-widest ${accentClass}`}>
          {badge}
        </span>
      </div>

      <div className="px-4 py-4 font-mono text-[12.5px] leading-relaxed">
        {lines.slice(0, shown).map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={
              l.type === "ok"
                ? "text-emerald-glow"
                : l.type === "warn"
                ? "text-yellow-400"
                : l.type === "agent"
                ? "text-cyan-glow"
                : "text-white/65"
            }
          >
            {l.text}
          </motion.div>
        ))}
        {shown < lines.length && (
          <span className="font-mono text-white/70 caret">
            {""}
          </span>
        )}
      </div>
    </motion.div>
  );
}

const capabilities = [
  {
    icon: Lock,
    title: "Privacy-First",
    body: "Local LLMs on dedicated hardware. Sensitive data never leaves the box."
  },
  {
    icon: Network,
    title: "MCP Native",
    body: "Agents speak Model Context Protocol — composable tools, swappable models."
  },
  {
    icon: Zap,
    title: "Hybrid Routing",
    body: "Frontier models (Claude) for reasoning · local models (Qwen, Llama) for throughput."
  },
  {
    icon: Activity,
    title: "Always-On",
    body: "Telegram-driven control loop · async pipelines · observable by default."
  }
];

export function AICommandCenter() {
  return (
    <Section
      id="ai-lab"
      eyebrow="// AI POWERHOUSE"
      title={
        <>
          AI Command Center —{" "}
          <span className="bg-gradient-to-r from-cyan-glow to-emerald-glow bg-clip-text text-transparent">
            autonomous agents
          </span>
          , under my control.
        </>
      }
      subtitle="I build autonomous agents on local and frontier LLMs for privacy-focused automation. These two are running right now."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="panel p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-cyan-glow/30 bg-cyan-glow/10 text-cyan-glow shadow-glow-cyan">
                <Bot size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-white">JobHunter AI Agent</h3>
                  <span className="chip-cyan">In Development</span>
                </div>
                <p className="mt-1 text-sm text-white/65">
                  Autonomous Telegram-driven agent that aggregates Reed, Adzuna, Greenhouse, Lever
                  &amp; JSearch, scores fit using local LLMs (Ollama · Qwen2.5 / Llama 3.3), and
                  generates a tailored CV + cover letter per application.
                </p>
              </div>
            </div>
          </div>
          <Terminal
            title="jobhunter"
            badge="agent · running"
            lines={jobhunterStream}
            accent="cyan"
          />
        </div>

        <div className="space-y-4">
          <div className="panel p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-emerald-glow/30 bg-emerald-glow/10 text-emerald-glow shadow-glow-emerald">
                <Brain size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-white">Jarvis AI Assistant</h3>
                  <span className="chip-emerald">Private</span>
                </div>
                <p className="mt-1 text-sm text-white/65">
                  My custom-built personal AI assistant for automation and workflow management.
                  Hybrid routing across Claude and local Ollama models · MCP-native tool surface.
                </p>
              </div>
            </div>
          </div>
          <Terminal
            title="jarvis"
            badge="assistant · standby"
            lines={jarvisStream}
            accent="emerald"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="panel p-5"
          >
            <c.icon size={18} className="text-cyan-glow" />
            <h4 className="mt-3 text-sm font-semibold text-white">{c.title}</h4>
            <p className="mt-1 text-xs leading-relaxed text-white/55">{c.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
