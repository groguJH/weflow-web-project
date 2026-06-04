"use client";

import Link from "next/link";
import Image from "next/image";
import { Carousel } from "antd";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BENEFITS } from "@/data/homeText";

const CAROUSEL_SETTINGS = {
  autoplay: true,
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
    <article className="group flex h-full min-h-[30rem] flex-col overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-900/55 transition-colors duration-300 hover:bg-slate-900/80 sm:min-h-[31rem] lg:min-h-[33rem] xl:min-h-[35rem]">
      <div className="relative h-[16rem] overflow-hidden border-b border-slate-800/70 bg-slate-900 sm:h-[17rem] lg:h-[19rem] xl:h-[20rem]">
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

      <div className="flex flex-1 flex-col justify-end p-7 lg:p-8">
        <h3 className="text-balance text-keep text-2xl font-black leading-tight text-white lg:text-3xl">
          {card.title}
        </h3>
        <p className="text-pretty text-keep mt-4 text-base leading-relaxed text-slate-400 lg:text-lg">
          {card.desc}
        </p>
      </div>
    </article>
  );
}

export default function BenefitsSection() {
  return (
    <section
      className="relative flex min-h-[calc(100vh-4.5rem)] flex-col justify-center overflow-hidden py-20"
      aria-labelledby="home-benefits-title"
    >
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-400/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />

      <ScrollReveal name="home-benefits-heading" className="mb-10 px-4">
        <SectionHeader
          titleId="home-benefits-title"
          title={BENEFITS.sectionTitle}
        />
      </ScrollReveal>

      <ScrollReveal
        name="home-benefits-carousel"
        delay={120}
        className="relative px-4 sm:px-6 lg:px-8"
      >
        <Carousel rootClassName="benefits-carousel" {...CAROUSEL_SETTINGS}>
          {BENEFITS.cards.map((card, idx) => (
            <div key={card.title} className="h-full">
              <BenefitCard card={card} index={idx} />
            </div>
          ))}
        </Carousel>
      </ScrollReveal>

      <ScrollReveal
        name="home-benefits-pricing-link"
        delay={180}
        className="mt-14 flex justify-center px-4 lg:mt-16"
      >
        <Link
          href="/pricing"
          className="group inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/[0.08] bg-slate-900/70 px-5 py-3 text-sm font-bold text-white transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-slate-800/95 hover:text-white active:translate-y-0 sm:px-6"
        >
          가격 자세히 알아보기
          <ArrowRight size="1em" className="text-[1rem] transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </ScrollReveal>
    </section>
  );
}
