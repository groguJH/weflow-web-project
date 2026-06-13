"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BENEFITS } from "@/data/homeText";

const CAROUSEL_SETTINGS = {
  autoplaySpeed: 2400,
  dots: false,
  draggable: true,
  infinite: true,
  pauseOnHover: false,
  slidesToScroll: 1,
  slidesToShow: 3,
  speed: 850,
  swipeToSlide: true,
  waitForAnimate: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

function BenefitCard({ card, index }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="fluid-benefit-card group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-900/55 transition-colors duration-300 hover:bg-slate-900/80">
      <div className="fluid-benefit-media relative overflow-hidden border-b border-slate-800/70 bg-slate-900">
        <Image
          src={card.image}
          alt={`${card.title} 혜택 이미지`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />
        <span className="absolute right-5 top-5 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-sm font-black tracking-widest text-blue-300">
          {num}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-start p-[clamp(1rem,2.4vw,1.75rem)]">
        <h3 className="fluid-card-title text-balance text-keep font-black text-white">
          {card.title}
        </h3>
        <p className="fluid-card-copy text-pretty text-keep mt-[clamp(0.75rem,1.6vw,1rem)] text-slate-400">
          {card.desc}
        </p>
      </div>
    </article>
  );
}

function BenefitHighlight({ item }) {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-white/[0.035] px-[clamp(1rem,2.5vw,1.75rem)] py-[clamp(0.75rem,1.8vw,1rem)] text-center backdrop-blur-sm">
      <p className="text-[clamp(0.75rem,1.4vw,0.875rem)] font-black leading-tight text-slate-100">
        {item.title}
      </p>
      <p className="mt-1 text-[clamp(0.625rem,1.15vw,0.75rem)] font-semibold leading-tight text-slate-400">
        {item.desc}
      </p>
    </div>
  );
}

export default function BenefitsSection() {
  const carouselRef = useRef(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  function goToPrevious() {
    setIsAutoPlaying(false);
    carouselRef.current?.prev();
  }

  function goToNext() {
    setIsAutoPlaying(false);
    carouselRef.current?.next();
  }

  function toggleAutoPlay() {
    setIsAutoPlaying((current) => !current);
  }

  return (
    <section
      className="relative flex min-h-[calc(100vh-4.5rem)] flex-col justify-center overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="home-benefits-title"
    >
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-400/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />

      <ScrollReveal
        name="home-benefits-highlights"
        className="mb-[clamp(4rem,7.8vw,6.25rem)] -translate-y-[clamp(0.75rem,2vw,1.5rem)]"
      >
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-5">
          {BENEFITS.highlights.map((item) => (
            <BenefitHighlight key={item.title} item={item} />
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal
        name="home-benefits-heading"
        className="mb-[clamp(2.25rem,4.5vw,3.25rem)]"
      >
        <SectionHeader
          titleId="home-benefits-title"
          title={BENEFITS.sectionTitle}
          titleClassName="fluid-section-title"
        />
      </ScrollReveal>

      <ScrollReveal
        name="home-benefits-carousel"
        delay={120}
        className="relative"
      >
        <Carousel
          ref={carouselRef}
          rootClassName="benefits-carousel"
          {...CAROUSEL_SETTINGS}
          autoplay={isAutoPlaying}
        >
          {BENEFITS.cards.map((card, idx) => (
            <div key={card.title} className="h-full">
              <BenefitCard card={card} index={idx} />
            </div>
          ))}
        </Carousel>

        <div className="mt-[clamp(1rem,2.8vw,1.75rem)] flex items-center justify-center gap-[clamp(0.5rem,1.6vw,0.875rem)]">
          <button
            type="button"
            onClick={goToPrevious}
            className="inline-flex h-[clamp(2.25rem,5vw,2.75rem)] w-[clamp(2.25rem,5vw,2.75rem)] cursor-pointer items-center justify-center rounded-full border border-white/[0.1] bg-slate-900/70 text-slate-200 transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:text-white active:translate-y-0"
            aria-label="이전 혜택 보기"
            title="이전"
          >
            <ChevronLeft size="1.05em" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={toggleAutoPlay}
            className="inline-flex h-[clamp(2.25rem,5vw,2.75rem)] w-[clamp(2.25rem,5vw,2.75rem)] cursor-pointer items-center justify-center rounded-full border border-blue-400/20 bg-blue-600/18 text-blue-100 transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-blue-600/28 hover:text-white active:translate-y-0"
            aria-label={
              isAutoPlaying
                ? "혜택 자동 스크롤 멈추기"
                : "혜택 자동 스크롤 재생하기"
            }
            title={isAutoPlaying ? "정지" : "재생"}
          >
            {isAutoPlaying ? (
              <Pause size="1em" aria-hidden="true" />
            ) : (
              <Play size="1em" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="inline-flex h-[clamp(2.25rem,5vw,2.75rem)] w-[clamp(2.25rem,5vw,2.75rem)] cursor-pointer items-center justify-center rounded-full border border-white/[0.1] bg-slate-900/70 text-slate-200 transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:text-white active:translate-y-0"
            aria-label="다음 혜택 보기"
            title="다음"
          >
            <ChevronRight size="1.05em" aria-hidden="true" />
          </button>
        </div>
      </ScrollReveal>

    </section>
  );
}
