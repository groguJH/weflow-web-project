import SectionHeader from '@/components/ui/SectionHeader';
import { MARKETING_PROOF } from '@/data/marketingLandingText';

export default function MarketingProofSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="marketing-proof-title">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/12 via-transparent to-cyan-950/12" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          titleId="marketing-proof-title"
          eyebrow={MARKETING_PROOF.eyebrow}
          title={MARKETING_PROOF.title}
          className="mb-10"
        />

        <ol className="grid gap-4 md:grid-cols-3">
          {MARKETING_PROOF.steps.map((step) => (
            <li key={step.number} className="rounded-2xl border border-white/[0.08] bg-slate-950/45 p-6">
              <p className="text-sm font-black tracking-widest text-cyan-300">{step.number}</p>
              <h3 className="mt-4 text-2xl font-black text-white">{step.title}</h3>
              <p className="text-pretty text-keep mt-3 text-sm leading-relaxed text-slate-400">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
