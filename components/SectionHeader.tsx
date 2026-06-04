import { Reveal } from "./Reveal";

export function SectionHeader({
  tag,
  title,
  subtitle,
  align = "center",
}: {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {tag && <span className="tag-pill mb-4">{tag}</span>}
      <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-pretty text-lg leading-relaxed text-white/55">{subtitle}</p>
      )}
    </Reveal>
  );
}
