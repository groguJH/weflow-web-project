const WEFLOW_BLOG_URL = "https://m.blog.naver.com/weflowlab";

export const CASE_TITLE_SLUGS = {
  PT샵: "pt-shop",
  필라테스: "pilates",
  헬스장: "fitness-gym",
  "보험 설계": "insurance-planning",
  "법률 사무소": "law-office",
  "세무사 사무소": "tax-office",
  공인중개사: "real-estate",
  카페: "cafe",
  미용실: "hair-salon",
  네일샵: "nail-salon",
  피부관리샵: "skin-care",
  왁싱샵: "waxing-shop",
  반영구샵: "semi-permanent-shop",
  애견미용: "pet-grooming",
  "반려동물 용품점": "pet-supplies",
  키즈카페: "kids-cafe",
  스터디카페: "study-cafe",
  영어학원: "english-academy",
  수학학원: "math-academy",
  입시학원: "exam-academy",
  개인과외: "private-tutoring",
  청소업체: "cleaning-service",
  "인테리어 업체": "interior-company",
  "이사 업체": "moving-company",
  "자동차 디테일링": "car-detailing",
  "렌터카 업체": "rent-car",
  "웨딩/스냅 업체": "wedding-snap",
  "소상공인 기업형 홈페이지": "small-business-company",
};

const CASE_CATEGORY_FOCUS = {
  피트니스: "예약 상담 동선",
  금융: "신뢰 기반 상담 전환",
  전문직: "전문성 전달 구조",
  부동산: "매물 문의 동선",
  "외식 • 카페": "방문 예약 전환",
  뷰티: "시술 문의 동선",
  반려동물: "서비스 신뢰도",
  키즈: "보호자 문의 흐름",
  교육: "상담 신청 흐름",
  생활서비스: "견적 문의 구조",
  자동차: "지역 문의 전환",
  기타: "기업 신뢰도",
};

const CASE_TITLE_DETAIL_OVERRIDES = {
  PT샵: {
    focus: "상담 버튼 위치 최적화",
    scope: "프로그램 소개 · 트레이너 신뢰 · 상담 CTA",
    start:
      "운동 프로그램은 다양했지만, 방문자가 어떤 수업을 선택해야 하는지 빠르게 판단하기 어려웠습니다.",
    solution:
      "대표 프로그램과 상담 버튼을 가까이 배치하고, 모바일에서 바로 문의할 수 있는 흐름을 먼저 정리했습니다.",
    outputs: ["PT 프로그램 소개", "트레이너 신뢰 섹션", "상담 신청 동선"],
  },
  필라테스: {
    focus: "체험 예약 흐름",
    scope: "수업 안내 · 공간 이미지 · 예약 CTA",
    start:
      "시설과 수업 분위기는 좋았지만, 첫 방문자가 체험 예약까지 이동하는 흐름이 약했습니다.",
    solution:
      "공간 이미지와 수업 장점을 먼저 보여주고, 체험 상담 버튼을 반복 배치해 예약 흐름을 짧게 만들었습니다.",
    outputs: ["수업 소개 카드", "공간 이미지 구성", "체험 예약 CTA"],
  },
  헬스장: {
    focus: "시설 강점 노출",
    scope: "시설 이미지 · 이용권 안내 · 상담 CTA",
    start:
      "시설 규모와 장점이 충분히 드러나지 않아 방문자가 비교 단계에서 이탈할 수 있었습니다.",
    solution:
      "대표 시설 이미지를 크게 보여주고, 이용권과 상담 흐름을 한 화면 안에서 확인할 수 있게 정리했습니다.",
    outputs: ["시설 중심 홈페이지", "이용권 요약", "상담 연결 버튼"],
  },
  "보험 설계": {
    focus: "신뢰 자료 강조",
    scope: "상담 분야 · 전문성 근거 · 문의 폼",
    start:
      "보험 상담은 신뢰가 중요한데, 상담자의 전문성과 상담 분야가 한눈에 전달되지 않았습니다.",
    solution:
      "상담 분야를 명확히 나누고, 고객이 부담 없이 문의할 수 있도록 폼과 연락 버튼을 정리했습니다.",
    outputs: ["상담 분야 정리", "신뢰 요소 섹션", "문의 폼 연결"],
  },
  "자동차 디테일링": {
    focus: "지역 문의 전환",
    scope: "작업 사진 · 서비스 가격 · 전화 CTA",
    start:
      "작업 품질을 보여줄 이미지는 있었지만, 지역 고객이 바로 견적 문의로 이어지는 구조가 부족했습니다.",
    solution:
      "작업 전후 이미지와 서비스 항목을 가까이 배치하고, 전화·카카오 문의 버튼을 반복 노출했습니다.",
    outputs: ["작업 사진 갤러리", "서비스 항목 요약", "전화 문의 CTA"],
  },
  "웨딩/스냅 업체": {
    focus: "포트폴리오 중심 문의",
    scope: "작업 갤러리 · 촬영 서비스 · 상담 예약 CTA",
    start:
      "사진과 작업 결과물은 있었지만, 방문자가 촬영 스타일과 상담 가능 여부를 빠르게 확인하기 어려웠습니다.",
    solution:
      "대표 작업 갤러리를 먼저 보여주고, 촬영 서비스와 상담 예약 버튼을 이어 배치해 포트폴리오 확인 후 바로 문의하도록 구성했습니다.",
    outputs: ["작업 갤러리", "촬영 서비스 요약", "상담 예약 CTA"],
  },
  "소상공인 기업형 홈페이지": {
    focus: "기업 신뢰도",
    scope: "회사 소개 · 서비스 구조 · 문의 CTA",
    start:
      "사업의 핵심 정보는 있었지만, 회사 소개와 서비스 강점이 신뢰 흐름으로 정리되지 않아 문의 전환이 약했습니다.",
    solution:
      "브랜드 소개, 서비스, 실적, 문의 동선을 한 화면 흐름으로 재구성해 처음 방문한 고객도 빠르게 판단할 수 있게 했습니다.",
    outputs: ["기업 소개 구조", "서비스 안내 섹션", "문의 전환 CTA"],
  },
};

export function getCaseSlug(item = {}) {
  if (item.slug) return item.slug;
  if (CASE_TITLE_SLUGS[item.title]) return CASE_TITLE_SLUGS[item.title];
  if (item.id) return item.id;

  return encodeURIComponent(
    String(item.title || "case")
      .trim()
      .replace(/\s+/g, "-"),
  );
}

export function createCaseDetail(item = {}) {
  const title = item.title || "성공 사례";
  const category = item.category || "비즈니스";
  const focus = CASE_CATEGORY_FOCUS[category] || "문의 전환 구조";
  const override = CASE_TITLE_DETAIL_OVERRIDES[title] || {};
  const finalFocus = override.focus || focus;
  const scope = override.scope || "대표 이미지 · 서비스 요약 · 상담 CTA";

  return {
    eyebrow: category,
    meta: `${title} · 2026 · ${category} 홈페이지 제작 · 문의 구조 최적화`,
    headline: `${title} 홈페이지`,
    description: `${title}의 실제 서비스 장점이 화면에서 바로 보이고, 방문자가 상담 문의까지 자연스럽게 이동하도록 구성한 ${category} 맞춤형 홈페이지 사례입니다.`,
    project: title,
    focus: finalFocus,
    scope,
    about: {
      start:
        override.start ||
        `${title}의 장점은 있었지만 방문자가 핵심 정보를 빠르게 비교하고 문의하기에는 화면 흐름이 분산되어 있었습니다.`,
      solution:
        override.solution ||
        `대표 이미지와 서비스 요약을 먼저 보여주고, 상담 버튼과 문의 폼을 반복 배치해 ${category} 고객이 쉽게 문의할 수 있도록 정리했습니다.`,
    },
    tags: ["대표 이미지 구성", "상담 CTA", "반응형 웹", "문의 폼"],
    process: [
      {
        title: "대표 화면 선정",
        desc: `${title}의 강점이 가장 잘 드러나는 이미지와 첫 화면 문구를 먼저 정했습니다.`,
      },
      {
        title: "서비스 묶음 정리",
        desc: "방문자가 비교하기 쉽도록 서비스와 혜택을 짧은 정보 단위로 줄였습니다.",
      },
      {
        title: "신뢰 요소 배치",
        desc: "업종 특성에 맞는 근거와 이미지를 문의 버튼 주변에 함께 배치했습니다.",
      },
      {
        title: "상담 흐름 연결",
        desc: "내용 확인 후 바로 상담으로 이어지도록 CTA 위치와 모바일 동선을 조정했습니다.",
      },
    ],
    outputs: override.outputs || [
      `${title} 맞춤 홈페이지`,
      "서비스 요약 카드",
      "상담 신청 동선",
    ],
  };
}

export const CASES_PAGE = {
  title: "성공 사례",
  moreButton: "더보기 ->",
  cases: [
    {
      title: "PT샵",
      category: "피트니스",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_PT샵.jpg",
    },
    {
      title: "필라테스",
      category: "피트니스",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_필라테스.jpg",
    },
    {
      title: "헬스장",
      category: "피트니스",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_헬스장.jpg",
    },
    {
      title: "보험 설계",
      category: "전문직",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_보험설계.jpg",
    },
    {
      title: "법률 사무소",
      category: "전문직",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_법률사무소.jpg",
    },
    {
      title: "세무사 사무소",
      category: "전문직",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_세무사사무소.jpg",
    },
    {
      title: "공인중개사",
      category: "부동산",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_공인중개사.jpg",
    },
    {
      title: "카페",
      category: "외식 • 카페",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_카페.jpg",
    },
    {
      title: "미용실",
      category: "뷰티",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_미용실.jpg",
    },
    {
      title: "네일샵",
      category: "뷰티",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_네일샵.jpg",
    },
    {
      title: "피부관리샵",
      category: "뷰티",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_피부관리샵.jpg",
    },
    {
      title: "왁싱샵",
      category: "뷰티",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_왁싱샵.jpg",
    },
    {
      title: "반영구샵",
      category: "뷰티",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_반영구샵.jpg",
    },
    {
      title: "애견미용",
      category: "반려동물",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_애견미용.jpg",
    },
    {
      title: "반려동물 용품점",
      category: "반려동물",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_반려동물용품점.jpg",
    },
    {
      title: "키즈카페",
      category: "외식 • 카페",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_키즈카페.jpg",
    },
    {
      title: "스터디카페",
      category: "교육",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_스터디카페.jpg",
    },
    {
      title: "영어학원",
      category: "교육",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_영어학원.jpg",
    },
    {
      title: "수학학원",
      category: "교육",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_수학학원.jpg",
    },
    {
      title: "입시학원",
      category: "교육",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_입시학원.jpg",
    },
    {
      title: "개인과외",
      category: "교육",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_개인과외.jpg",
    },
    {
      title: "청소업체",
      category: "생활서비스",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_청소업체.jpg",
    },
    {
      title: "인테리어 업체",
      category: "생활서비스",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_인테리어업체.jpg",
    },
    {
      title: "이사 업체",
      category: "생활서비스",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_이사업체.jpg",
    },
    {
      title: "자동차 디테일링",
      category: "자동차",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_자동차디테일링.jpg",
    },
    {
      title: "렌터카 업체",
      category: "자동차",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_렌터카업체.jpg",
    },
    {
      title: "웨딩/스냅 업체",
      category: "기타",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_웨딩스냅업체.jpg",
    },
    {
      title: "소상공인 기업형 홈페이지",
      category: "기타",
      blogHref: WEFLOW_BLOG_URL,
      img: "/cases_소상공인기업형홈페이지.jpg",
    },
  ],
};
