"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import DiagnosisModalButton from "@/components/ui/DiagnosisModalButton";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { MARKETING_HERO } from "@/data/marketingLandingText";

export default function MarketingHeroSection() {
  const sectionRef = useRef(null);
  const [isDeviceActivated, setIsDeviceActivated] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const top = sectionRef.current?.getBoundingClientRect().top ?? 0;

      setIsDeviceActivated(window.scrollY > 48 || top < -24);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-24"
      aria-labelledby="marketing-hero-title"
    >
      <div className="absolute -top-32 right-0 h-[38rem] w-[38rem] rounded-full bg-cyan-400/8 blur-3xl" />
      <div className="absolute left-0 top-28 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 via-transparent to-slate-950/20" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
        <ScrollReveal className="w-full" threshold={0.01}>
          <p className="mb-5 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-300">
            {MARKETING_HERO.eyebrow}
          </p>
        </ScrollReveal>

        <ScrollReveal className="w-full" delay={70} threshold={0.01}>
          <h1
            id="marketing-hero-title"
            className="text-balance text-keep text-[clamp(2.2rem,6vw,4.4rem)] font-black leading-[1.06] text-white"
          >
            {MARKETING_HERO.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
        </ScrollReveal>

        <ScrollReveal className="w-full" delay={140} threshold={0.01}>
          <p className="text-pretty text-keep mx-auto mt-6 max-w-2xl text-center text-[clamp(0.95rem,1.8vw,1.15rem)] leading-relaxed text-slate-400">
            {MARKETING_HERO.description}
          </p>
        </ScrollReveal>

        <ScrollReveal className="w-full" delay={210} threshold={0.01}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <DiagnosisModalButton className="gradient-blue inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-xl px-5 py-3 text-sm font-bold text-white sm:px-7 sm:py-3.5">
              {MARKETING_HERO.primaryCta}
            </DiagnosisModalButton>

            <DiagnosisModalButton className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-xl border border-white/[0.08] bg-slate-900/70 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800 sm:px-7 sm:py-3.5">
              {MARKETING_HERO.secondaryCta}
            </DiagnosisModalButton>
          </div>
        </ScrollReveal>

        <ul className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-3 min-[420px]:grid-cols-3">
          {MARKETING_HERO.metrics.map((item, index) => (
            <ScrollReveal
              as="li"
              key={item.label}
              delay={300 + index * 90}
              className="rounded-xl border border-white/[0.08] bg-slate-900/55 px-4 py-4 text-left"
            >
              <strong className="block text-keep text-lg font-black text-cyan-300">
                {item.value}
              </strong>
              <span className="mt-1 block text-xs font-semibold text-slate-500">
                {item.label}
              </span>
            </ScrollReveal>
          ))}
        </ul>

        <ScrollReveal className="mt-8 w-full" delay={420}>
          <div className="relative mx-auto flex w-full max-w-[26rem] flex-col items-center">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/8 blur-3xl" />

            <div className="relative w-full">
              <Image
                src="/device-mockup_empty.png"
                alt="WEFLOW 모바일 목업 프레임"
                width={920}
                height={1440}
                priority
                className={`h-auto w-full object-contain transition-[opacity,transform] duration-700 ${
                  isDeviceActivated
                    ? "opacity-0 scale-[0.985]"
                    : "opacity-100 scale-100"
                }`}
              />

              <Image
                src="/device-mockup_weflow_up.png"
                alt="WEFLOW 로고가 보이는 모바일 목업"
                width={920}
                height={1440}
                priority
                className={`absolute inset-0 h-auto w-full object-contain transition-[opacity,transform] duration-700 ${
                  isDeviceActivated
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-[1.015]"
                }`}
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
