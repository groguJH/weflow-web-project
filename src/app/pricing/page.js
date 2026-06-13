import ProductionPlansSection from "@/features/pricing_page/sections/ProductionPlansSection";
import CarePlansSection from "@/features/pricing_page/sections/CarePlansSection";
import AdPlansSection from "@/features/pricing_page/sections/AdPlansSection";
import { createPageMetadata } from "@/data/metadata";

export const metadata = createPageMetadata({
  title: "제작플랜 및 가격안내",
  description:
    "START 랜딩페이지, GROW 홈페이지, MASTER 프리미엄 제작 플랜과 WEFLOW 케어 플랜 가격을 확인하세요.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <div className="pt-[4.5rem]">
      <div className="relative px-4 sm:px-6 lg:px-8 py-12 overflow-hidden">
        <div className="absolute -top-20 right-0 w-[31.25rem] h-[31.25rem] bg-cyan-400/7 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex flex-col items-center justify-center text-center gap-4">
          <span className="px-5 py-1.5 rounded-full border border-blue-800/50 bg-blue-900/30 text-blue-400 text-xs tracking-[0.3em] font-semibold uppercase">
            P R I C I N G
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            제작 플랜 &amp; 가격 안내
          </h1>
          <p className="text-slate-400 text-sm">
            비즈니스 목적에 맞는 플랜을 선택하세요
          </p>
        </div>
      </div>
      <ProductionPlansSection />
      <CarePlansSection />
      <AdPlansSection />
    </div>
  );
}
