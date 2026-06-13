export const PRODUCTION_PLANS = {
  sectionTitle: "제작 플랜",
  notice: "필수 선택형 3중 택1",
  plans: [
    {
      tier: "START",
      name: "START 랜딩페이지",
      originalPrice: "498,000원",
      price: "249,000원",
      unit: "/ 1회",
      checklist: [
        { ok: true, item: "랜딩페이지 1페이지" },
        { ok: true, item: "3~4일 빠른 제작기간" },
        { ok: true, item: "반응형 제작 (PC/모바일)" },
        { ok: true, item: "문의폼 연동" },
        { ok: true, item: "기본 SEO 설정" },
      ],
    },
    {
      tier: "GROW",
      name: "GROW 홈페이지",
      originalPrice: "1,980,000원",
      price: "990,000원",
      unit: "/ 1회",
      checklist: [
        { ok: true, item: "홈페이지 5페이지" },
        { ok: true, item: "1주 빠른 제작기간" },
        { ok: true, item: "반응형 제작 (PC/모바일)" },
        { ok: true, item: "문의폼 연동" },
        { ok: true, item: "카카오톡 상담연동" },
        { ok: true, item: "기본 SEO 설정" },
      ],
    },
    {
      tier: "MASTER",
      name: "MASTER 프리미엄",
      originalPrice: "2,980,000원",
      price: "1,490,000원",
      unit: "/ 1회",
      popular: true,
      checklist: [
        { ok: true, item: "홈페이지 + 랜딩페이지" },
        { ok: true, item: "1~2주 빠른 제작기간" },
        { ok: true, item: "반응형 제작 (PC/모바일)" },
        { ok: true, item: "프리미엄 디자인" },
        { ok: true, item: "예약·문의 시스템" },
        { ok: true, item: "SEO 최적화" },
        { ok: true, item: "광고 전환 구조 설계" },
      ],
    },
  ],
};

export const CARE_PLANS = {
  sectionTitle: "WEFLOW 케어 플랜",
  sub: "만든 후가 진짜 시작입니다. 지속 성장을 위한 케어 플랜을 선택하세요.",
  notice: "필수 선택형 3중 택1",
  plans: [
    {
      tier: "BASIC",
      name: "WE CARE",
      subtitle: "기본 관리 플랜",
      originalPrice: "월 170,000원",
      price: "월 89,000원~",
      checklist: [
        { ok: true, item: "유지보수(월 수정) 월 1회" },
        { ok: true, item: "블로그 : 월 1개" },
        { ok: true, item: "인스타 : 월 4회 (주 1회)" },
        { ok: true, item: "스레드 : 월 4회 (주 1회)" },
        { ok: true, item: "SEO 상단등록" },
      ],
    },
    {
      tier: "STANDARD",
      name: "FLOW CARE",
      subtitle: "성장 관리 플랜",
      originalPrice: "월 378,000원~",
      price: "월 189,000원~",
      popular: true,
      checklist: [
        { ok: true, item: "유지보수 : 월 3회" },
        { ok: true, item: "인스타 : 월 8회 (주 2회)" },
        { ok: true, item: "스레드 : 월 8회 (주 2회)" },
        { ok: true, item: "블로그 : 월 2회" },
        { ok: true, item: "네이버 키워드 세팅 할인 (149,000원 → 79,000원)" },
        {
          ok: true,
          item: "당근 키워드 광고 세팅 50% 할인 (79,000원 → 39,000원)",
        },
        { ok: true, item: "문의 개선" },
        { ok: true, item: "SEO 상단등록" },
      ],
    },
    {
      tier: "ALL-IN-ONE",
      name: "WEFLOW CARE",
      subtitle: "올인원 관리 플랜",
      originalPrice: "월 678,000원~",
      price: "월 339,000원~",
      isTop: true,
      checklist: [
        { ok: true, item: "유지보수 : 무제한" },
        { ok: true, item: "블로그 : 월 4회 (주 1회)" },
        { ok: true, item: "인스타 : 월 12회 (주 3회)" },
        { ok: true, item: "스레드 : 월 12회 (주 3회)" },
        { ok: true, item: "네이버 키워드/당근 플레이스 광고 세팅 무료" },
        { ok: true, item: "월 성과 체크" },
        { ok: true, item: "랜딩 개선" },
        { ok: true, item: "광고관리" },
        { ok: true, item: "SEO 최적화" },
      ],
    },
  ],
};

export const AD_PLANS = {
  sectionTitle: "광고 플랜",
  plans: [
    {
      name: "네이버 광고",
      subtitle: "키워드 세팅",
      originalPrice: "298,000원",
      price: "149,000원~",
      theme: "green",
      checklist: [
        { ok: true, item: "키워드 분석" },
        { ok: true, item: "광고 세팅 지원" },
        { ok: true, item: "광고 문구 제작" },
        { ok: true, item: "문의 구조 연결" },
        { ok: true, item: "채널 연동 지원" },
        { ok: true, item: "성과 최적화" },
      ],
    },
    {
      name: "당근 플레이스 광고",
      subtitle: "키워드 세팅",
      originalPrice: "158,000원",
      price: "79,000원~",
      theme: "orange",
      checklist: [
        { ok: true, item: "지역 키워드 분석" },
        { ok: true, item: "광고 세팅 지원" },
        { ok: true, item: "광고 문구 제작" },
        { ok: true, item: "지역 타겟 설정" },
        { ok: true, item: "랜딩 연결 지원" },
        { ok: true, item: "성과 최적화" },
      ],
    },
  ],
};

export const PRICING_NOTICE = "모든 가격은 부가세(VAT) 포함입니다";

export const PRICING_DETAIL_NOTICE = [
  "도메인은 고객님 명의로 등록되며 비용은 별도입니다.",
  "위플로우에서 등록 및 연결 세팅은 무료 지원해 드립니다.",
  "도메인 연결 지원",
  "도메인 등록 대행 가능",
  "도메인 비용 별도",
  "광고비는 고객 계정에서 고객 결제수단으로 직접 결제되며, 위플로우는 운영 및 세팅만 합니다.",
  "유지보수는 텍스트, 이미지, 링크 등 경미한 수정 기준입니다.",
  "페이지 추가 및 기능 개발은 별도 비용이 발생할 수 있습니다.",
];
