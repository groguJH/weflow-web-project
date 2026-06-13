import { notFound } from "next/navigation";
import CaseDetailSection from "@/features/cases_page/sections/CaseDetailSection";
import { createCaseDetail, getCaseSlug } from "@/data/casesText";
import { createPageMetadata } from "@/data/metadata";
import { getCaseItems } from "@/server/adminStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function getCaseBySlug(slug) {
  const cases = await getCaseItems();

  return cases.find((item) => item.slug === slug || getCaseSlug(item) === slug || item.id === slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getCaseBySlug(slug);

  if (!item) {
    return createPageMetadata({
      title: "성공사례",
      description: "WEFLOW 성공사례 상세 페이지입니다.",
      path: `/cases/${slug}`,
    });
  }

  const detail = createCaseDetail(item);

  return createPageMetadata({
    title: `${item.title} 성공사례`,
    description: detail.description,
    path: `/cases/${slug}`,
    images: [item.img],
  });
}

export default async function CaseDetailPage({ params }) {
  const { slug } = await params;
  const item = await getCaseBySlug(slug);

  if (!item) {
    notFound();
  }

  const detail = createCaseDetail(item);

  return (
    <div className="pt-[4.5rem]">
      <CaseDetailSection item={item} detail={detail} />
    </div>
  );
}
