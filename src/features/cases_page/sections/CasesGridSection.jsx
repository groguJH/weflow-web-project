import Link from "next/link";
import Image from "next/image";
import DiagnosisModalButton from "@/components/ui/DiagnosisModalButton";
import SectionHeader from "@/components/ui/SectionHeader";
import { CASES_PAGE } from "@/data/casesText";

function CaseCard({ item }) {
  return (
    <Link
      href={item.blogHref}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
      aria-label={`${item.title} 성공사례 블로그로 이동`}
    >
      <article className="bg-slate-900/50 backdrop-blur-sm border border-white/[0.06] rounded-xl overflow-hidden card-glow transition-all duration-300 hover:border-blue-500/30 hover:-translate-y-0.5">
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

          <span className="absolute top-2 left-2 text-xs text-blue-400 font-semibold px-2 py-0.5 bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
            {item.category}
          </span>
        </div>

        <footer className="flex flex-col items-start gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-keep text-sm font-bold text-white">
            {item.title}
          </h3>

          <span className="ml-2 inline-flex cursor-pointer whitespace-nowrap text-xs font-medium text-blue-400 transition-[color,transform] duration-200 group-hover:-translate-y-0.5 hover:text-blue-300 active:translate-y-0">
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
        eyebrow="SUCCESS"
        title={CASES_PAGE.title}
        className="relative mb-12"
        titleClassName="text-3xl sm:text-4xl bg-gradient-to-br from-white via-blue-100 to-violet-300 bg-clip-text text-transparent"
      />

      <ul className="relative mx-auto grid max-w-7xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {cases.map((item) => (
          <li key={item.id || item.title}>
            <CaseCard item={item} />
          </li>
        ))}
      </ul>

      <div className="text-center mt-12">
        <DiagnosisModalButton className="gradient-blue inline-flex cursor-pointer items-center whitespace-nowrap rounded-xl px-8 py-3.5 font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0">
          {CASES_PAGE.moreButton}
        </DiagnosisModalButton>
      </div>
    </section>
  );
}
