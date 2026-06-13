import Image from 'next/image';
import Link from 'next/link';
import DiagnosisModalButton from '@/components/ui/DiagnosisModalButton';
import { MARKETING_HERO } from '@/data/marketingLandingText';

export default function MarketingHeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-24" aria-labelledby="marketing-hero-title">
      <div className="absolute -top-32 right-0 h-[38rem] w-[38rem] rounded-full bg-cyan-400/8 blur-3xl" />
      <div className="absolute left-0 top-28 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 via-transparent to-slate-950/20" />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-16">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-300">
            {MARKETING_HERO.eyebrow}
          </p>
          <h1 id="marketing-hero-title" className="text-balance text-keep text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            {MARKETING_HERO.title.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </h1>
          <p className="text-pretty text-keep mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {MARKETING_HERO.description}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <DiagnosisModalButton className="gradient-blue inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-xl px-5 py-3 text-sm font-bold text-white sm:px-7 sm:py-3.5">
              {MARKETING_HERO.primaryCta}
            </DiagnosisModalButton>
            <Link
              href="/pricing"
              className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-xl border border-white/[0.08] bg-slate-900/70 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800 sm:px-7 sm:py-3.5"
            >
              {MARKETING_HERO.secondaryCta}
            </Link>
          </div>

          <ul className="mt-10 grid max-w-xl grid-cols-1 gap-3 min-[420px]:grid-cols-3">
            {MARKETING_HERO.metrics.map((item) => (
              <li key={item.label} className="rounded-xl border border-white/[0.08] bg-slate-900/55 px-4 py-4">
                <strong className="block text-keep text-lg font-black text-cyan-300">{item.value}</strong>
                <span className="mt-1 block text-xs font-semibold text-slate-500">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-[24rem] overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/60 shadow-2xl shadow-black/30">
          <Image
            src="/main_icon.png"
            alt="WEFLOW 회사 홍보 랜딩페이지 비주얼"
            width={760}
            height={760}
            priority
            className="absolute left-1/2 top-1/2 w-[32rem] max-w-[92%] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-2xl"
          />
          <div className="absolute inset-x-6 bottom-6 rounded-xl border border-white/[0.08] bg-slate-950/75 p-5 backdrop-blur-md">
            <p className="text-sm font-bold text-white">홍보, 신뢰, 문의 전환을 한 페이지에</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              WEFLOW의 기존 제작·광고·관리 흐름을 회사 홍보용 랜딩페이지에 맞게 재구성합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
