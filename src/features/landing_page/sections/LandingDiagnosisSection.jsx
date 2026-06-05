import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import { LANDING_DIAGNOSIS } from '@/data/landingText';

export default function LandingDiagnosisSection() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden" aria-labelledby="landing-diagnosis-title">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/10 via-transparent to-blue-950/10 pointer-events-none" />

      <article className="relative max-w-2xl mx-auto bg-slate-900/50 backdrop-blur-md border border-blue-500/20 rounded-2xl p-8 text-center shadow-xl shadow-blue-500/5">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-20 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

        <SectionHeader
          titleId="landing-diagnosis-title"
          title={LANDING_DIAGNOSIS.title}
          className="relative mb-8"
        />

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
          {LANDING_DIAGNOSIS.items.map((item) => (
            <li key={item} className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border border-white/[0.06] rounded-xl px-4 py-3">
              <span className="text-blue-400 font-bold text-lg flex-shrink-0" aria-hidden="true">✓</span>
              <span className="text-sm text-slate-300 font-medium">{item}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/#form"
          className="inline-flex items-center px-8 py-3.5 rounded-xl font-bold text-white gradient-blue"
        >
          {LANDING_DIAGNOSIS.ctaButton}
        </Link>
      </article>
    </section>
  );
}
