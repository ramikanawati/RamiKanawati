"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Cpu } from "lucide-react";
import { techStack } from "@/lib/data";

function useUptime() {
  const [time, setTime] = useState("00:00:00");
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const ms = Date.now() - start;
      const h = String(Math.floor(ms / 3600000)).padStart(2, "0");
      const m = String(Math.floor((ms / 60000) % 60)).padStart(2, "0");
      const s = String(Math.floor((ms / 1000) % 60)).padStart(2, "0");
      setTime(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function SystemStatus() {
  const uptime = useUptime();

  return (
    <div className="panel-glow relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute inset-x-0 h-32 scanline animate-scan opacity-40" />
      </div>

      <div className="relative flex items-center justify-between border-b border-white/5 px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-glow/70" />
          </div>
          <span className="ml-2 font-mono text-xs text-white/50">~/system_status</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
          <Activity size={11} className="text-emerald-glow" />
          <span className="text-emerald-glow">live</span>
        </div>
      </div>

      <div className="relative px-5 py-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu size={14} className="text-cyan-glow" />
            <span className="label-mono">Active Stack</span>
          </div>
          <span className="font-mono text-xs text-white/50">uptime {uptime}</span>
        </div>

        <ul className="space-y-1.5">
          {techStack.map((t, i) => (
            <motion.li
              key={t.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
              className="group flex items-center justify-between rounded-md border border-transparent px-2 py-1.5 transition-colors hover:border-white/5 hover:bg-white/[0.02]"
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-glow/60 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-glow" />
                </span>
                <span className="font-mono text-sm text-white/85">{t.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  {t.category}
                </span>
                <span className="rounded-sm border border-emerald-glow/20 bg-emerald-glow/5 px-1.5 py-0.5 font-mono text-[10px] uppercase text-emerald-glow">
                  {t.status}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/5 pt-4">
          <Stat label="Uptime" value="100%" />
          <Stat label="Latency" value="<50ms" />
          <Stat label="Threat" value="None" />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/5 bg-ink-800/50 px-3 py-2">
      <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">{label}</div>
      <div className="mt-0.5 font-mono text-sm text-white">{value}</div>
    </div>
  );
}
