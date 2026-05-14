"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setError(null);

    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
      company: String(fd.get("company") ?? "")
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error ?? `Request failed (${res.status})`);
        return;
      }

      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Network error.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* honeypot — hidden from real users, attractive to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={120}
          autoComplete="name"
          placeholder="Jane Doe"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          placeholder="jane@company.com"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Phone (optional)"
          name="phone"
          type="tel"
          maxLength={32}
          autoComplete="tel"
          placeholder="+44 · +971 · +966 · +1 …"
          pattern="^\+[0-9 ().-]{6,30}$"
          help="Any country — start with the international code (e.g. +44 UK, +971 UAE, +966 KSA, +974 QA, +1 US)."
        />
        <Field
          label="Subject"
          name="subject"
          type="text"
          maxLength={200}
          placeholder="Tech lead, AI agent build, etc."
        />
      </div>

      <div>
        <label htmlFor="message" className="label-mono mb-1.5 block">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          placeholder="Tell me about the project, timeline, and what you're trying to achieve."
          className="w-full resize-y rounded-md border border-white/10 bg-ink-900/80 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-cyan-glow/50 focus:outline-none focus:ring-2 focus:ring-cyan-glow/15"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <p className="text-xs text-white/40">
          Replies usually within 24h. Sent over a private channel — your details
          are never published.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send size={14} />
              Send Message
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {status === "ok" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-md border border-emerald-glow/30 bg-emerald-glow/5 px-3.5 py-2.5 text-sm text-emerald-glow"
          >
            <CheckCircle2 size={15} />
            Message delivered. I&apos;ll be in touch shortly.
          </motion.div>
        )}
        {status === "error" && error && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-2 rounded-md border border-red-500/30 bg-red-500/5 px-3.5 py-2.5 text-sm text-red-300"
          >
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type: "text" | "email" | "tel";
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  autoComplete?: string;
  placeholder?: string;
  pattern?: string;
  help?: string;
};

function Field({ label, name, help, ...rest }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="label-mono mb-1.5 block">
        {label}
      </label>
      <input
        id={name}
        name={name}
        {...rest}
        className="w-full rounded-md border border-white/10 bg-ink-900/80 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-cyan-glow/50 focus:outline-none focus:ring-2 focus:ring-cyan-glow/15"
      />
      {help && <p className="mt-1.5 text-[11px] text-white/35">{help}</p>}
    </div>
  );
}
