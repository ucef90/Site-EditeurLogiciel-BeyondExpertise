import Image from "next/image";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

/**
 * Beyond Expertise logo: the brand mark (fingerprint + "B") on a clean white
 * tile, paired with the wordmark. The mark image lives in /public.
 */
export function Logo({ className = "", showWordmark = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" />
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
    <span
      className={`inline-flex items-center justify-center overflow-hidden rounded-md bg-white ${className}`}
    >
      <Image
        src="/beyondexpertise_logo.jpg"
        alt="Beyond Expertise"
        width={72}
        height={72}
        priority
        className="h-full w-full object-contain"
      />
    </span>
  );
}
