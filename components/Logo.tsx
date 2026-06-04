import { Locale } from "@/i18n/config";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  locale?: Locale;
};

/**
 * Beyond Expertise logo.
 * Mark = a double chevron breaking past a threshold line — "going beyond".
 * Gradient: brand violet (#7B5CFF) → cyan (#21D4FD).
 */
export function Logo({ className = "", showWordmark = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-8 w-8 shrink-0" />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-semibold tracking-tight text-white">
            Beyond<span className="text-white/60"> Expertise</span>
          </span>
        </span>
      )}
    </span>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bx-grad" x1="4" y1="6" x2="36" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7B5CFF" />
          <stop offset="1" stopColor="#21D4FD" />
        </linearGradient>
        <linearGradient id="bx-grad-soft" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7B5CFF" stopOpacity="0.22" />
          <stop offset="1" stopColor="#21D4FD" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {/* tile */}
      <rect x="1" y="1" width="38" height="38" rx="11" fill="url(#bx-grad-soft)" />
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="11"
        stroke="url(#bx-grad)"
        strokeOpacity="0.5"
        strokeWidth="1.2"
      />
      {/* double chevron going "beyond" */}
      <path
        d="M11 12 L20 20 L11 28"
        stroke="url(#bx-grad)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 12 L29 20 L20 28"
        stroke="#FFFFFF"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
