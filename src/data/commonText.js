export const NAV = {
  logo: "WEFLOW",
  links: [
    { label: "홈", href: "/" },
    { label: "가격안내", href: "/pricing" },
    { label: "성공사례", href: "/cases" },
    { label: "예약", href: "/reservation" },
  ],
  authLinks: [
    { label: "로그인", href: "/login" },
    { label: "회원가입", href: "/signup" },
  ],
  cta: "무료진단받기",
};

export const FOOTER = {
  tagline: "제작부터 관리까지\n비즈니스 성장을 함께합니다.",
  info: {
    ceo: "대표 : 신서준",
    bizNo: "사업자등록번호 : 884-07-03480",
    email: "이메일 : contact@weflowlab.kr",
    hours: "운영시간 : 연중무휴 24시간 상담가능",
  },
  legal: ["개인정보처리방침", "이용약관"],
  copyright: "© 2026 WEFLOW. All rights reserved.",
  links: {
    service: {
      title: "서비스",
      items: [
        { label: "홈페이지 제작 과정", href: "/services" },
        { label: "랜딩페이지 제작 과정", href: "/services" },
        { label: "광고 운영 · 관리 안내", href: "/services" },
      ],
    },
    carePlan: {
      title: "WEFLOW 케어플랜",
      items: [
        { label: "WE 케어", href: "/pricing" },
        { label: "FLOW 케어", href: "/pricing" },
        { label: "WEFLOW 케어", href: "/pricing" },
      ],
    },
    contact: {
      title: "상담문의",
      items: [
        { label: "전화문의", href: "tel:" },
        { label: "이메일 문의", href: "mailto:contact@weflowlab.kr" },
        { label: "카카오 채널 문의", href: "#" },
        { label: "인스타 문의", href: "#" },
        { label: "블로그", href: "#" },
      ],
    },
  },
};

export const BOTTOM_BAR = [
  { label: "24시간 상담 가능", href: "#", icon: "🕐" },
  { label: "카카오톡상담", href: "#", icon: "💬" },
  { label: "블로그", href: "#", icon: "📝" },
  { label: "무료진단 상담", href: "#", icon: "✅", modal: true },
];

export const FLOATING_QUICK_MENU = [
  {
    label: "페이지 사례",
    href: "/cases",
    icon: "pages",
  },
  {
    label: "무료상담신청",
    icon: "check",
    modal: true,
    variant: "primary",
  },
  {
    label: "카톡상담",
    href: "#",
    icon: "message",
    variant: "kakao",
  },
  {
    label: "전화상담",
    href: "tel:01029717280",
    icon: "phone",
  },
  {
    label: "마이페이지",
    href: "#",
    icon: "user",
  },
  {
    label: "Top",
    icon: "top",
    action: "scrollTop",
    variant: "muted",
    compactIcon: true,
  },
];

export const STICKY_FORM = {
  title: "무료 진단받기",
  subtitle: "지금 신청하면 24시간 내 연락드려요",
  fields: {
    name: { label: "이름", required: true, placeholder: "홍길동" },
    phone: { label: "연락처", required: true, placeholder: "010-0000-0000" },
    type: {
      label: "제작 종류",
      defaultOption: "랜딩 페이지 제작",
      options: [
        "랜딩 페이지 제작",
        "홈페이지 제작",
        "랜딩 & 홈페이지 제작",
        "기타(weflow케어플랜)",
      ],
    },
    industry: { label: "업종", placeholder: "예: 피트니스, 카페, 병원..." },
    request: {
      label: "추가 요청사항",
      placeholder: "특이사항을 자유롭게 적어 주세요",
    },
    agree: "개인정보 수집 및 이용에 동의합니다",
  },
  submit: "무료 진단 신청하기",
};

export const REVIEWS = [
  { text: "문의 버튼 위치 바꾸고 상담 문의가 확실히 늘었어요.", stars: 5 },
  {
    text: "처음엔 반신반의했는데 랜딩 페이지 만들고 나서 일주일 만에 상담 전화 3건이 왔어요.",
    stars: 5,
  },
  {
    text: "디자인이 너무 예뻐서 주변 원장님들한테 소개해드렸어요. 진짜 퀄리티 대박.",
    stars: 5,
  },
  {
    text: "3일 만에 완성됐는데 퀄리티가 이 가격에 이 정도면 진짜 가성비 최고입니다.",
    stars: 5,
  },
  {
    text: "광고 연동까지 해주셔서 따로 신경 쓸 게 없어요. 운영 관리도 너무 편해졌어요.",
    stars: 5,
  },
  {
    text: "모바일에서 문의하기 버튼 바로 보이게 해주셔서 스마트폰 고객 문의가 늘었어요.",
    stars: 5,
  },
  {
    text: "검색 상위에 올라오니까 따로 광고 안 해도 전화가 오더라고요. 신기했어요.",
    stars: 5,
  },
  {
    text: "제가 요청한 내용을 정말 꼼꼼히 반영해 주셔서 감동받았어요. 소통이 정말 잘 돼요.",
    stars: 5,
  },
  {
    text: "홈페이지 없을 땐 전화로만 받았는데, 지금은 문의 폼으로도 많이 들어와요.",
    stars: 5,
  },
  {
    text: "가격 대비 퀄리티가 압도적이에요. 비싼 업체랑 비교해도 전혀 뒤지지 않아요.",
    stars: 5,
  },
  {
    text: "카카오톡 상담 연동까지 해주셔서 고객 응대가 훨씬 편해졌어요.",
    stars: 5,
  },
  {
    text: "처음 홈페이지 제작인데 초보자도 이해하기 쉽게 설명해 주셔서 좋았어요.",
    stars: 5,
  },
  {
    text: "인스타 연동이랑 블로그 포스팅까지 해주시니 통합 관리가 너무 편해요.",
    stars: 5,
  },
  {
    text: "세무사 사무소인데 업종에 맞게 전문적으로 디자인해 주셨어요. 고객 반응 좋아요.",
    stars: 5,
  },
  {
    text: "수정 요청을 빠르게 반영해 주셔서 정말 만족스러워요. 24시간 대응 진짜예요.",
    stars: 5,
  },
  {
    text: "당근마켓 광고랑 연동하니 동네 손님이 눈에 띄게 늘었어요. 강력 추천합니다.",
    stars: 5,
  },
  {
    text: "인테리어 업체 운영하는데 시공 사례 갤러리 구성을 너무 예쁘게 해주셨어요.",
    stars: 5,
  },
  {
    text: "스터디카페 오픈하면서 만들었는데 예약 문의가 오픈 첫날부터 들어왔어요.",
    stars: 5,
  },
  {
    text: "네이버 상단에 올라오고 나서 자연 유입 고객이 확실히 늘었어요. 효과 만점!",
    stars: 5,
  },
  {
    text: "케어플랜으로 관리받으니 제가 따로 마케팅 신경 안 써도 돼서 너무 편해요.",
    stars: 5,
  },
  {
    text: "공인중개사 사무소인데 매물 문의가 홈페이지 통해서 많이 들어와요.",
    stars: 5,
  },
  {
    text: "미용실 예약 시스템도 연결해 주셔서 예약 관리가 훨씬 수월해졌어요.",
    stars: 5,
  },
  {
    text: "영어학원 원장인데 학부모님들이 홈페이지 보고 신뢰도가 생긴다고 하세요.",
    stars: 5,
  },
  {
    text: "법률사무소 홈페이지 만들고 나서 온라인 상담 문의가 2배로 늘었어요.",
    stars: 5,
  },
];
