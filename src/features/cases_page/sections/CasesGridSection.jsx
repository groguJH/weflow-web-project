import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import DiagnosisModalButton from "@/components/ui/DiagnosisModalButton";
import SectionHeader from "@/components/ui/SectionHeader";
import { CASES_PAGE, getCaseSlug } from "@/data/casesText";

function CaseCard({ item }) {
  return (
    <Link
      href={`/cases/${getCaseSlug(item)}`}
      className="group block w-full max-w-[17rem]"
      aria-label={`${item.title} 성공사례 상세 보기`}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-slate-900/50 backdrop-blur-sm card-glow transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/30">
        <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-900/80">
          {item.img ? (
            <Image
              src={item.img}
              alt={item.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <span className="text-slate-500 text-xs">이미지 준비 중</span>
            </div>
          )}

          <span className="absolute right-2 top-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-400 backdrop-blur-sm">
            {item.category}
          </span>
        </div>

        <footer className="flex flex-1 flex-col items-start gap-[clamp(0.65rem,1.2vw,0.9rem)] p-[clamp(0.9rem,1.6vw,1.15rem)]">
          <h3 className="text-keep text-sm font-bold text-white">
            {item.title}
          </h3>

          <span className="mt-auto inline-flex cursor-pointer whitespace-nowrap text-xs font-medium text-blue-400 transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:text-blue-300 active:translate-y-0">
            자세히보기
          </span>
        </footer>
      </article>
    </Link>
  );
}

export default function CasesGridSection({ cases = CASES_PAGE.cases }) {
  return (
    <section
      className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="cases-page-title"
    >
      <div className="absolute -top-20 right-0 w-[31.25rem] h-[31.25rem] bg-cyan-400/7 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />

      <SectionHeader
        titleId="cases-page-title"
        as="h1"
        title={CASES_PAGE.title}
        className="relative mb-12"
        titleClassName="text-3xl sm:text-4xl bg-gradient-to-br from-white via-blue-100 to-violet-300 bg-clip-text text-transparent"
      />

      <ul className="relative mx-auto grid max-w-[72rem] grid-cols-1 justify-evenly gap-x-[clamp(1.25rem,3.5vw,3.25rem)] gap-y-[clamp(1.4rem,3vw,2.25rem)] min-[520px]:grid-cols-2 lg:grid-cols-4">
        {cases.map((item) => (
          <li key={item.id || item.title} className="flex justify-center">
            <CaseCard item={item} />
          </li>
        ))}
      </ul>

      <div className="text-center mt-12">
        <DiagnosisModalButton className="fluid-section-button group inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/[0.08] bg-slate-900/70 font-bold text-white transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-slate-800/95 hover:text-white active:translate-y-0">
          {CASES_PAGE.moreButton.replace(" ->", "")}
          <ArrowRight
            size="1em"
            className="text-[1rem] transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </DiagnosisModalButton>
      </div>
    </section>
  );
}
