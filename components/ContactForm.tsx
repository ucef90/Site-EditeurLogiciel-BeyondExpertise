"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { Dictionary } from "@/i18n/types";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const f = dict.pages.contact.form;
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient">
          <Check size={26} className="text-white" />
        </span>
        <p className="mt-5 max-w-sm text-pretty text-white/80">{f.success}</p>
      </div>
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={f.name} name="name" autoComplete="name" required />
        <Field label={f.email} name="email" type="email" autoComplete="email" required />
      </div>
      <Field label={f.company} name="company" autoComplete="organization" />
      <div>
        <label className="mb-2 block text-sm font-medium text-white/70" htmlFor="message">
          {f.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-violet-glow/60 focus:bg-white/[0.05]"
        />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        {f.submit}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white/70" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-violet-glow/60 focus:bg-white/[0.05]"
      />
    </div>
  );
}
