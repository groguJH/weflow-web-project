import SectionHeader from '@/components/ui/SectionHeader';
import { LANDING_STRUCTURE } from '@/data/landingText';

export default function LandingStructureSection() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden" aria-labelledby="landing-structure-title">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />

      <SectionHeader
        titleId="landing-structure-title"
        title={LANDING_STRUCTURE.title}
        className="relative mb-10"
      />

      <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {LANDING_STRUCTURE.items.map((item, idx) => (
          <li
            key={item.title}
            className="relative bg-slate-900/60 backdrop-blur-sm border border-white/[0.07] rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300"
          >
            <div className="absolute top-4 right-4 text-xs font-black text-blue-500/30" aria-hidden="true">
              0{idx + 1}
            </div>
            <div className="text-3xl mb-4" aria-hidden="true">{item.icon}</div>
            <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
