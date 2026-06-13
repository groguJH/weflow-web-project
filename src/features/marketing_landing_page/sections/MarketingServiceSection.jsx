import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { MARKETING_SERVICES } from "@/data/marketingLandingText";

export default function MarketingServiceSection() {
  return (
    <section
      className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="marketing-service-title"
    >
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/7 blur-3xl" />
      <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-blue-600/7 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto mb-10 w-full max-w-3xl">
          <SectionHeader
            titleId="marketing-service-title"
            eyebrow={MARKETING_SERVICES.eyebrow}
            title={MARKETING_SERVICES.title}
            description={MARKETING_SERVICES.description}
            descriptionClassName="max-w-2xl"
            className="text-center"
            titleClassName="text-3xl sm:text-4xl"
          />
        </ScrollReveal>

        <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
          {MARKETING_SERVICES.items.map((item, index) => (
            <ScrollReveal
              as="li"
              key={item.title}
              delay={index * 90}
              className="rounded-2xl border border-white/[0.08] bg-slate-900/55 p-5 transition-colors hover:border-cyan-400/30 hover:bg-white/[0.04]"
            >
              <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 text-xs font-black text-cyan-300">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="text-keep text-base font-black leading-snug text-white sm:text-lg">
                {item.title}
              </h3>

              <p className="text-keep text-pretty mt-3 text-sm font-medium leading-relaxed text-slate-400">
                {item.description}
              </p>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
