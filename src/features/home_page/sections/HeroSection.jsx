'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import OrbitingBadges from '@/components/ui/OrbitingBadges';
import { HERO, HERO_ORBIT_BADGES } from '@/data/homeText';
import useSessionOnce from '@/hooks/useSessionOnce';

const INTRO_KEY = 'weflow-home-hero-intro';

const introVariants = {
  hidden: {
    opacity: 0,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      delay,
      duration: 1.15,
      ease: 'easeOut',
    },
  }),
};

function RevealOnce({ children, delay, className = '', playIntro, isReady }) {
  if (!isReady) {
    return <div className={`${className} opacity-0`}>{children}</div>;
  }

  return (
    <motion.div
      custom={playIntro ? delay : 0}
      initial={playIntro ? 'hidden' : false}
      animate="visible"
      variants={introVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HeroSection() {
  const { isReady, shouldPlay } = useSessionOnce(INTRO_KEY);
  const reduceMotion = useReducedMotion();
  const playIntro = shouldPlay && !reduceMotion;

  function openModal() {
    window.dispatchEvent(new Event('open-diagnosis-modal'));
  }

  return (
    <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden" aria-labelledby="home-hero-title">
      {/* 앰비언트 글로우 블롭 */}
      <div className="absolute -top-40 right-0 w-[50rem] h-[50rem] bg-cyan-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-600/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[37.5rem] h-64 bg-blue-700/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/10 via-transparent to-blue-950/15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 xl:gap-24">

          {/* ── 좌측: 텍스트 콘텐츠 ── */}
          <div className="flex-1 py-8 lg:py-16">
            <RevealOnce isReady={isReady} playIntro={playIntro} delay={0.35}>
              <h1 id="home-hero-title" className="text-keep mb-6 bg-gradient-to-br from-white via-blue-100 to-violet-300 bg-clip-text text-5xl font-black leading-tight tracking-tight text-transparent sm:text-6xl lg:text-6xl xl:text-7xl">
                {HERO.headline[0]}
                <br />
                {HERO.headline[1]}
                <br />
                {HERO.headline[2]}
              </h1>
            </RevealOnce>

            <RevealOnce isReady={isReady} playIntro={playIntro} delay={1.55}>
              <p className="text-keep text-pretty mb-8 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg">
                {HERO.sub[0]}
                <br />
                {HERO.sub[1]}
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <button
                  onClick={openModal}
                  className="inline-flex cursor-pointer items-center whitespace-nowrap rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-blue-500"
                >
                  {HERO.buttons[0].label}
                </button>

                {HERO.buttons.slice(1, 2).map((btn) => (
                  <Link
                    key={btn.label}
                    href={btn.href}
                    className="inline-flex cursor-pointer items-center whitespace-nowrap rounded-xl border border-white/[0.08] bg-slate-900/60 px-6 py-3.5 text-sm font-semibold text-slate-300 backdrop-blur-sm transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-slate-800/85 hover:text-white active:translate-y-0"
                  >
                    {btn.label}
                  </Link>
                ))}
              </div>
            </RevealOnce>

          </div>

          {/* ── 우측: 글로우 비주얼 (lg 이상) ── */}
          <div className="hidden lg:flex flex-1 items-center justify-center relative min-h-[30rem]">
            {/* 배경 글로우 오브 */}
            <div className="absolute w-80 h-80 bg-blue-600/18 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute w-56 h-72 bg-violet-600/12 rounded-full blur-3xl translate-x-20 pointer-events-none" />

            <RevealOnce isReady={isReady} playIntro={playIntro} delay={2.35}>
              <OrbitingBadges
                items={HERO_ORBIT_BADGES}
                className="h-[30rem] w-[30rem]"
                orbitRadius="13.75rem"
                duration={34}
              >
                <Image
                  src="/main_icon.png"
                  alt="WEFLOW"
                  width={880}
                  height={880}
                  priority
                  className="w-[28rem] max-w-full h-auto object-contain drop-shadow-2xl"
                />
              </OrbitingBadges>
            </RevealOnce>
          </div>

        </div>
      </div>
    </section>
  );
}

