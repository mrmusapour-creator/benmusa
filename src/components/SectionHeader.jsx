export function SectionHeader({ eyebrow, title, subtitle, centered = true, inverse = false }) {
  return (
    <div className={centered ? 'mx-auto mb-10 max-w-3xl text-center' : 'mb-10 max-w-3xl'}>
      {eyebrow && <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-gold-brand">{eyebrow}</p>}
      <h2 className={`font-serif text-3xl font-bold sm:text-4xl ${inverse ? 'text-white' : 'text-teal-ink'}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-base leading-8 ${inverse ? 'text-white/72' : 'text-ink/70'}`}>{subtitle}</p>}
    </div>
  );
}
