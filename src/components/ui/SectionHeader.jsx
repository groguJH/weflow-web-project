export default function SectionHeader({
  eyebrow,
  title,
  description,
  titleId,
  as: Heading = 'h2',
  align = 'center',
  className = '',
  eyebrowClassName = '',
  titleClassName = '',
  descriptionClassName = '',
}) {
  const alignClass = align === 'left' ? 'text-left items-start' : 'text-center items-center';

  return (
    <header className={`flex min-w-0 flex-col ${alignClass} ${className}`}>
      {eyebrow && (
        <p
          className={`text-keep mb-4 inline-flex max-w-full rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-center text-[clamp(0.625rem,2.6vw,0.75rem)] font-bold uppercase leading-snug tracking-widest text-blue-400 sm:px-4 ${eyebrowClassName}`}
        >
          {eyebrow}
        </p>
      )}
      <Heading
        id={titleId}
        className={`text-balance text-keep max-w-full text-[clamp(1.5rem,6vw,1.875rem)] font-black leading-tight text-white sm:text-3xl ${titleClassName}`}
      >
        {title}
      </Heading>
      {description && (
        <p className={`text-pretty text-keep mt-3 max-w-full text-[clamp(0.8125rem,3.2vw,0.9375rem)] leading-relaxed text-slate-400 ${descriptionClassName}`}>
          {description}
        </p>
      )}
    </header>
  );
}
