export const CONTACT_LINKS = {
  phone: "tel:01029717280",
  email: "mailto:contact@weflowlab.kr",
  kakao: "http://pf.kakao.com/_xntCbX",
  blog: "https://m.blog.naver.com/weflowlab",
  instagram: "https://www.instagram.com/weflowlab.kr",
  facebook:
    "https://www.facebook.com/profile.php?fb_profile_edit_entry_point=%7B%22click_point%22%3A%22edit_profile_button%22%2C%22feature%22%3A%22profile_header%22%7D&id=61590187124682&sk=about",
};

export const NAV = {
  logo: "WEFLOW",
  links: [
    { label: "홈", href: "/" },
    { label: "서비스", href: "/services" },
    { label: "제작플랜&가격안내", href: "/pricing" },
    { label: "성공사례", href: "/cases" },
    { label: "예약", href: "/reservation" },
  ],
  adminLinks: [
    { label: "관리자 대시보드", href: "/admin/dashboard" },
    { label: "Case 페이지 수정", href: "/admin/cases" },
  ],
  cta: "무료진단받기",
};

export const FOOTER = {
  tagline: "제작부터 관리까지\n비즈니스 성장을 함께합니다.",
  info: {
    ceo: "대표 : 신서준",
    bizNo: "사업자등록번호 : 884-07-03480",
    email: "이메일 : contact @ weflowlab.kr",
    hours: "운영시간 : 연중무휴 24시간 상담가능",
  },
  legal: [
    { label: "개인정보처리방침", href: "/privacy" },
    { label: "이용약관", href: "/terms" },
  ],
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
        { label: "전화문의", href: CONTACT_LINKS.phone, icon: "phone" },
        { label: "이메일 문의", href: CONTACT_LINKS.email, icon: "email" },
        { label: "카카오 채널 문의", href: CONTACT_LINKS.kakao, icon: "kakao" },
        {
          label: "인스타 문의",
          href: CONTACT_LINKS.instagram,
          icon: "instagram",
        },
        { label: "네이버 블로그", href: CONTACT_LINKS.blog, icon: "naver" },
        {
          label: "페이스북 문의",
          href: CONTACT_LINKS.facebook,
          icon: "facebook",
        },
      ],
    },
  },
};

export const BOTTOM_BAR = [
  { label: "24시간 상담 가능", href: CONTACT_LINKS.phone, icon: "🕐" },
  { label: "카카오톡상담", href: CONTACT_LINKS.kakao, icon: "💬" },
  { label: "블로그", href: CONTACT_LINKS.blog, icon: "📝" },
  { label: "무료진단 상담", href: "#", icon: "✅", modal: true },
];

export const FLOATING_CONTACT_CARD = {
  title: "24시간 상담 가능",
  actions: [
    {
      label: "무료 진단 신청",
      icon: "check",
      modal: true,
      variant: "primary",
    },
    {
      label: "카카오톡 문의",
      href: CONTACT_LINKS.kakao,
      icon: "message",
      variant: "outline",
    },
    {
      label: "블로그 상담",
      href: CONTACT_LINKS.blog,
      icon: "blog",
      variant: "outline",
    },
    {
      label: "전화 문의",
      href: CONTACT_LINKS.phone,
      icon: "phone",
      variant: "outline",
    },
  ],
  shortcut: {
    title: "문의 바로가기",
    subtitle: "진단 · 카카오 · 블로그 · 전화",
    badge: "W",
  },
};

export const STICKY_FORM = {
  title: "무료 진단받기",
  subtitle: "지금 신청하면 24시간 내 연락드려요",
  fields: {
    name: { label: "이름", required: true, placeholder: "홍길동" },
    phone: { label: "연락처", required: true, placeholder: "010-0000-0000" },
    type: {
      label: "제작 종류",
      defaultOption: "랜딩페이지 제작",
      options: [
        "랜딩페이지 제작",
        "홈페이지 제작",
        "랜딩&홈페이지 제작",
        "기타(WEFLOW케어플랜)",
      ],
    },
    industry: { label: "업종", placeholder: "예: 피트니스, 카페, 미용..." },
    request: {
      label: "추가 요청사항",
      placeholder: "특이사항을 자유롭게 적어 주세요",
    },
    agree: "개인정보 수집 및 이용에 동의합니다",
  },
  submit: "무료진단 후 견적받기",
};

export const REVIEWS = [
  {
    author: "OO PT샵 대표",
    text: "문의 버튼 위치 바꾸고 상담 문의가 확실히 늘었어요.",
    stars: 5,
  },
  {
    author: "OO 필라테스 대표",
    text: "수정 요청도 빠르게 처리해주셔서 만족합니다.",
    stars: 5,
  },
  {
    author: "OO 헬스장 대표",
    text: "디자인보다 문의 구조를 신경 써주는 게 좋았습니다.",
    stars: 5,
  },
  {
    author: "OO 보험설계 대표",
    text: "랜딩페이지 제작 후 상담 문의가 늘었어요.",
    stars: 5,
  },
  {
    author: "OO 법률 사무소 대표",
    text: "설명도 쉽게 해주셔서 진행하기 편했습니다.",
    stars: 5,
  },
  {
    author: "OO 세무사 사무소 대표",
    text: "광고 연결까지 한 번에 진행돼서 편했어요.",
    stars: 5,
  },
  {
    author: "OO 공인중개사 대표",
    text: "피드백 속도가 진짜 빨랐습니다.",
    stars: 5,
  },
  {
    author: "OO 카페 대표",
    text: "모바일 화면이 훨씬 보기 좋아졌어요.",
    stars: 5,
  },
  {
    author: "OO 미용실 대표",
    text: "생각보다 제작 기간이 빨라 놀랐습니다.",
    stars: 5,
  },
  {
    author: "OO 네일샵 대표",
    text: "업종 특성에 맞게 잘 만들어주셨어요.",
    stars: 5,
  },
  {
    author: "OO 피부관리샵 대표",
    text: "기획부터 같이 잡아줘서 부담이 없었습니다.",
    stars: 5,
  },
  {
    author: "OO 왁싱샵 대표",
    text: "광고 세팅 방향도 알려줘서 도움됐어요.",
    stars: 5,
  },
  {
    author: "OO 반영구샵 대표",
    text: "예약 문의가 전보다 더 잘 들어옵니다.",
    stars: 5,
  },
  {
    author: "OO 피부관리샵 대표",
    text: "PT샵 구조를 잘 이해하고 계시더라고요.",
    stars: 5,
  },
  {
    author: "OO 애견미용 대표",
    text: "필라테스 문의 동선이 훨씬 좋아졌어요.",
    stars: 5,
  },
  {
    author: "OO 반려동물 용품점 대표",
    text: "보험 상담 페이지가 깔끔하게 정리됐어요.",
    stars: 5,
  },
  {
    author: "OO 키즈카페 대표",
    text: "수정 요청해도 응답이 빨라 좋았습니다.",
    stars: 5,
  },
  {
    author: "OO 스터디카페 대표",
    text: "홈페이지 만들고 끝이 아니라 관리도 해줘요.",
    stars: 5,
  },
  {
    author: "OO 영어학원 대표",
    text: "SEO 부분까지 신경 써줘서 만족합니다.",
    stars: 5,
  },
  {
    author: "OO 입시학원 대표",
    text: "카카오 문의 연결이 편하게 바뀌었어요.",
    stars: 5,
  },
  {
    author: "OO 개인과외 대표",
    text: "문의하기 버튼 위치가 확실히 효과 있네요.",
    stars: 5,
  },
  {
    author: "OO 청소업체 대표",
    text: "초보라 아무것도 몰랐는데 쉽게 설명해줬어요.",
    stars: 5,
  },
  {
    author: "OO 인테리어 업체 대표",
    text: "비용 부담이 생각보다 적었습니다.",
    stars: 5,
  },
  {
    author: "OO 이사 업체 대표",
    text: "랜딩페이지 하나로 상담률이 올라갔어요.",
    stars: 5,
  },
  {
    author: "OO 자동차 디테일링 대표",
    text: "다음 프로젝트도 위플로우랑 진행할 예정입니다.",
    stars: 5,
  },
];
