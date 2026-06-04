import Link from 'next/link';
import { LANDING_HERO } from '@/data/landingText';

export default function LandingHeroSection() {
  return (
    <section className="relative pt-12 pb-16 overflow-hidden" aria-labelledby="landing-hero-title">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[43.75rem] h-[31.25rem] bg-blue-700/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative flex flex-col items-center text-center">
        {/* 배지 */}
        <span className="mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-900/20 text-blue-300 text-xs font-semibold tracking-wide">
          {LANDING_HERO.badge}
        </span>

        {/* 헤드라인 */}
        <h1 id="landing-hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-5 text-white">
          {LANDING_HERO.headline[0]}
          <br />
          {LANDING_HERO.headline[1]}
        </h1>

        {/* 서브 */}
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-10 max-w-lg">
          {LANDING_HERO.sub}
        </p>

        {/* 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3">
          {LANDING_HERO.buttons.map((btn) => (
            <Link
              key={btn.label}
              href={btn.href}
              className={
                btn.primary
                  ? 'inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-bold text-white text-sm gradient-blue'
                  : 'inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-slate-300 text-sm bg-slate-900/60 backdrop-blur-sm border border-white/[0.10] hover:border-blue-500/40 hover:text-white transition-all duration-300'
              }
            >
              {btn.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
