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
    <header className={`flex flex-col ${alignClass} ${className}`}>
      {eyebrow && (
        <p
          className={`text-keep mb-4 inline-flex whitespace-nowrap rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400 ${eyebrowClassName}`}
        >
          {eyebrow}
        </p>
      )}
      <Heading
        id={titleId}
        className={`text-balance text-keep text-2xl font-black text-white sm:text-3xl ${titleClassName}`}
      >
        {title}
      </Heading>
      {description && (
        <p className={`text-pretty text-keep mt-3 text-sm leading-relaxed text-slate-400 ${descriptionClassName}`}>
          {description}
        </p>
      )}
    </header>
  );
}
