'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import DiagnosisModalButton from '@/components/ui/DiagnosisModalButton';
import OrbitingBadges from '@/components/ui/OrbitingBadges';
import { HERO, HERO_ORBIT_BADGES } from '@/data/homeText';
import { SITE_DESCRIPTION, SITE_SMALL_TITLE, SITE_TITLE } from '@/data/metadata';
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
  const heroTitle = SITE_TITLE.replace(/^WEFLOW\s*[—-]\s*/, '');
  const descriptionLines = SITE_DESCRIPTION.split('\n').map((line) => line.trim());

  return (
    <section className="relative flex min-h-[clamp(34rem,78svh,48rem)] items-center overflow-hidden px-4 py-14 pt-20 transition-[min-height,padding] duration-300 ease-out sm:px-6 sm:py-16 sm:pt-24 lg:px-8 lg:py-20" aria-labelledby="home-hero-title">
      {/* 앰비언트 글로우 블롭 */}
      <div className="absolute -top-40 right-0 w-[50rem] h-[50rem] bg-cyan-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-600/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[37.5rem] h-64 bg-blue-700/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/10 via-transparent to-blue-950/15 pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-[clamp(2.25rem,8vw,3.75rem)] transition-[gap] duration-300 ease-out md:flex-row md:items-center md:gap-6 lg:gap-10 xl:gap-16">
          <RevealOnce
            isReady={isReady}
            playIntro={playIntro}
            delay={0.12}
            className="relative z-10 flex w-full justify-start pl-[clamp(0rem,4vw,1.5rem)] transition-[padding] duration-300 ease-out md:hidden"
          >
            <OrbitingBadges
              items={HERO_ORBIT_BADGES}
              className="h-[clamp(16rem,70vw,20rem)] w-[clamp(16rem,70vw,20rem)] transition-[width,height,transform] duration-300 ease-out"
              orbitRadius="clamp(7rem,31vw,8.75rem)"
              duration={38}
            >
              <Image
                src="/main_icon.png"
                alt="WEFLOW"
                width={620}
                height={620}
                priority
                className="h-auto w-[clamp(12rem,54vw,16rem)] max-w-full object-contain drop-shadow-2xl"
              />
            </OrbitingBadges>
          </RevealOnce>

          {/* ── 좌측: 텍스트 콘텐츠 ── */}
          <div className="relative z-20 min-w-0 flex-1 md:flex-[1.55] md:py-8 lg:flex-[1.25] lg:py-12 xl:flex-1">
            <RevealOnce isReady={isReady} playIntro={playIntro} delay={0.18}>
              <p className="fluid-scale-hero-copy text-keep mb-[clamp(1.1rem,2.5vw,1.8rem)] max-w-none font-bold text-slate-400">
                {SITE_SMALL_TITLE}
              </p>
            </RevealOnce>

            <RevealOnce isReady={isReady} playIntro={playIntro} delay={0.35}>
              <h1 id="home-hero-title" className="fluid-scale-hero-title text-keep mb-[clamp(1.25rem,3vw,2.1rem)] font-black text-white">
                {heroTitle}
              </h1>
            </RevealOnce>

            <RevealOnce isReady={isReady} playIntro={playIntro} delay={1.55}>
              <p className="fluid-scale-hero-description text-keep mb-[clamp(2.75rem,5.5vw,4.25rem)] max-w-none font-bold text-slate-400">
                {descriptionLines.map((line) => (
                  <span key={line} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </p>

              <div className="mb-10 flex flex-row flex-nowrap items-center gap-[clamp(0.75rem,2.2vw,1.45rem)] transition-[gap] duration-300 ease-out">
                <DiagnosisModalButton
                  className="hero-cta-button hero-primary-cta-pulse inline-flex min-w-0 flex-1 cursor-pointer items-center justify-center whitespace-nowrap rounded-xl bg-blue-600 font-bold text-white transition-[background-color,color,padding,font-size,box-shadow] duration-300 ease-out hover:bg-blue-500 sm:flex-none"
                >
                  {HERO.buttons[0].label}
                </DiagnosisModalButton>

                {HERO.buttons.slice(1).map((btn, index) => (
                  <Link
                    key={btn.label}
                    href={btn.href}
                    className={
                      index === 1
                        ? 'hero-cta-button inline-flex min-w-0 flex-1 cursor-pointer items-center justify-center whitespace-nowrap rounded-xl border border-white/70 bg-white font-black text-[#0a0f1e] shadow-lg shadow-white/10 transition-[background-color,color,border-color,padding,font-size] duration-300 ease-out hover:bg-slate-200 sm:flex-none'
                        : 'hero-cta-button inline-flex min-w-0 flex-1 cursor-pointer items-center justify-center whitespace-nowrap rounded-xl border border-white/[0.14] bg-slate-900/60 font-semibold text-slate-200 backdrop-blur-sm transition-[background-color,color,border-color,padding,font-size] duration-300 ease-out hover:bg-slate-800/85 hover:text-white sm:flex-none'
                    }
                  >
                    {btn.label}
                  </Link>
                ))}
              </div>
            </RevealOnce>

          </div>

          {/* ── 우측: 글로우 비주얼 (md 이상) ── */}
          <div className="relative z-0 hidden min-h-[clamp(18rem,32vw,30rem)] min-w-0 flex-1 items-center justify-center md:flex md:flex-[0.95] lg:flex-[1] xl:flex-1">
            {/* 배경 글로우 오브 */}
            <div className="absolute w-80 h-80 bg-blue-600/18 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute w-56 h-72 bg-violet-600/12 rounded-full blur-3xl translate-x-20 pointer-events-none" />

            <RevealOnce isReady={isReady} playIntro={playIntro} delay={2.35}>
              <OrbitingBadges
                items={HERO_ORBIT_BADGES}
                className="h-[clamp(17rem,31vw,30rem)] w-[clamp(17rem,31vw,30rem)]"
                orbitRadius="clamp(7.25rem, 12vw, 13.75rem)"
                duration={34}
              >
                <Image
                  src="/main_icon.png"
                  alt="WEFLOW"
                  width={880}
                  height={880}
                  priority
                  className="h-auto w-[clamp(15rem,28vw,28rem)] max-w-full object-contain drop-shadow-2xl"
                />
              </OrbitingBadges>
            </RevealOnce>
          </div>

        </div>
      </div>
    </section>
  );
}

