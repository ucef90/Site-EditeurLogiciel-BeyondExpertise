export function PageHero({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute left-1/2 top-[-20%] h-[440px] w-[760px] -translate-x-1/2 rounded-full bg-violet-glow/15 blur-[130px]" />
      </div>
      <div className="container-bx">
        <div className="mx-auto max-w-3xl text-center">
          <span className="tag-pill mb-5">{tag}</span>
          <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/60">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
