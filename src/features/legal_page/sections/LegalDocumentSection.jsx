import Link from 'next/link';

function getLinkProps(href) {
  if (!href?.startsWith('http')) return {};

  return {
    target: '_blank',
    rel: 'noopener noreferrer',
  };
}

export default function LegalDocumentSection({ document }) {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:px-8" aria-labelledby="legal-page-title">
      <div className="absolute -top-28 right-0 h-[30rem] w-[30rem] rounded-full bg-cyan-400/7 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-blue-600/8 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-4xl">
        <header className="mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
            {document.eyebrow}
          </p>
          <h1 id="legal-page-title" className="text-balance text-keep text-3xl font-black leading-tight text-white sm:text-5xl">
            {document.title}
          </h1>
          <p className="text-pretty text-keep mt-5 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
            {document.description}
          </p>
          <p className="mt-4 text-xs font-semibold text-slate-500">
            시행일: {document.effectiveDate}
          </p>
        </header>

        <article className="rounded-3xl border border-white/[0.08] bg-slate-900/70 p-5 shadow-2xl shadow-black/25 sm:p-8">
          {document.summary?.length > 0 && (
            <aside className="mb-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/8 p-5">
              <h2 className="text-keep mb-3 text-base font-black text-cyan-200">
                핵심 안내
              </h2>
              <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
                {document.summary.map((item) => (
                  <li key={item} className="text-pretty text-keep">
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          )}

          <div className="space-y-8">
            {document.sections.map((section, index) => {
              const titleId = `legal-section-${index + 1}`;

              return (
                <section key={section.title} aria-labelledby={titleId} className="border-t border-white/[0.06] pt-7 first:border-t-0 first:pt-0">
                  <h2 id={titleId} className="text-keep text-lg font-black text-white">
                    {index + 1}. {section.title}
                  </h2>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-400">
                    {section.items.map((item) => (
                      <li key={item} className="text-pretty text-keep">
                        {item}
                      </li>
                    ))}
                  </ul>

                  {section.links?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {section.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-white/[0.08] bg-slate-950/40 px-4 py-2 text-xs font-bold text-slate-200 transition-colors hover:bg-slate-800/80 hover:text-white"
                          {...getLinkProps(link.href)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
}
