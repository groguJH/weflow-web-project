import DiagnosisModalButton from '@/components/ui/DiagnosisModalButton';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { MARKETING_CONTACT } from '@/data/marketingLandingText';

export default function MarketingContactSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="marketing-contact-title">
      <div className="absolute left-1/2 top-1/2 h-[28rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      <article className="relative mx-auto max-w-3xl rounded-2xl border border-blue-500/20 bg-slate-900/70 p-8 text-center shadow-2xl shadow-black/30 sm:p-10">
        <ScrollReveal>
          <SectionHeader
            titleId="marketing-contact-title"
            eyebrow={MARKETING_CONTACT.eyebrow}
            title={MARKETING_CONTACT.title}
            description={MARKETING_CONTACT.description}
            descriptionClassName="max-w-xl"
            className="mb-8"
          />
        </ScrollReveal>

        <ul className="mb-8 grid gap-3 text-left sm:grid-cols-2">
          {MARKETING_CONTACT.items.map((item, index) => (
            <ScrollReveal
              as="li"
              key={item}
              delay={index * 90}
              className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-slate-800/50 px-4 py-3"
            >
              <span className="text-lg font-black text-blue-400" aria-hidden="true">✓</span>
              <span className="text-sm font-semibold text-slate-300">{item}</span>
            </ScrollReveal>
          ))}
        </ul>

        <ScrollReveal delay={320}>
          <DiagnosisModalButton className="gradient-blue inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-xl px-8 py-3.5 text-sm font-bold text-white">
            {MARKETING_CONTACT.primaryCta}
          </DiagnosisModalButton>
        </ScrollReveal>
      </article>
    </section>
  );
}
