export const HERO = {
  badge: '랜딩&홈페이지 제작 · 광고 운영 · 검색 상단 노출 · 맞춤형 웹 솔루션',
  headline: ['문의로 이어지는', '홈페이지를', '만듭니다'],
  sub: ['홈페이지 제작부터 광고 연동·운영 관리까지', '단순 제작이 아닌 문의 구조까지 설계합니다'],
  buttons: [
    { label: '무료 진단 신청', href: '#form', primary: true },
    { label: '성공 사례 보기', href: '/cases', primary: false },
    { label: '랜딩페이지', href: '/landing', primary: false },
  ],
  tags: [
    { title: '케어 플랜', desc: '제작·광고·운영' },
    { title: '빠른제작', desc: '3일~7일' },
    { title: '합리적 비용', desc: '가성비+퀄리티' },
    { title: '24시간 상담', desc: '신속한 피드백' },
  ],
};

export const HERO_ORBIT_BADGES = [
  {
    title: '3~7일',
    description: '빠른 납품',
    angle: -36,
  },
  {
    title: '24시간',
    description: '상담 가능',
    angle: 158,
  },
  {
    title: '실시간 상담중',
    variant: 'live',
    angle: 58,
  },
];

export const BENEFITS = {
  sectionTitle: 'WEFLOW만의 케어 플랜 혜택',
  ctaButton: '문의를 늘리는 무료진단',
  cards: [
    {
      title: 'weflow 케어플랜',
      desc: '제작+운영+광고+관리 원터치',
      icon: '🔗',
      image: '/benefit_sponsor.jpg',
    },
    {
      title: '빠른 제작',
      desc: '3~7일 로켓배송',
      icon: '🚀',
      image: '/benefit_make.jpg',
    },
    {
      title: '합리적인 가성비',
      desc: '퀄리티는 높게, 비용은 합리적으로',
      icon: '💰',
      image: '/benefit_price.jpg',
    },
    {
      title: '24시간 상담대기',
      desc: '빠른 상담 및 피드백',
      icon: '📞',
      image: '/benefit_counsel.jpg',
    },
    {
      title: '운영 · 광고 지원',
      desc: '사후관리서비스',
      icon: '📈',
      image: '/benefit_sponsor.jpg',
    },
    {
      title: '문의 구조 설계',
      desc: '업종별 맞춤 문의 동선 구성',
      icon: '🎯',
      image: '/benefit_design.jpg',
    },
  ],
};

export const PROCESS = {
  timeline: {
    title: '제작진행과정',
    sub: '배포 전 제작부터 모든 과정을 WEFLOW가 함께해 드립니다.',
    steps: [
      { label: '고객 상담', icon: 'user' },
      { label: '협의 후 제작', icon: 'tag' },
      { label: '3~7일 완료', icon: 'check' },
      { label: '광고 및 운영 사후 관리', icon: 'trending' },
    ],
  },
  sixSteps: {
    title: '6단계 제작 프로세스',
    sub: '기준에 입각한 완성 후 배포, WEFLOW만의 체계적인 프로세스',
    steps: [
      { number: '01', label: '상담·기획', icon: 'message' },
      { number: '02', label: '기획·설계', icon: 'layout' },
      { number: '03', label: '디자인', icon: 'palette' },
      { number: '04', label: '개발·제작', icon: 'code' },
      { number: '05', label: 'SEO 최적화', icon: 'search' },
      { number: '06', label: '광고운영·사후관리', icon: 'megaphone' },
    ],
  },
};

export const CASES_SECTION = {
  heading: ['다양한 업종이', '성공 사례를 확인하세요.'],
  sub: '어디서도 볼 수 없는 업종별 전환 최적화 사례를 직접 확인하세요.',
  moreButton: '살펴보기 →',
  items: [
    { title: 'PT 트레이닝센터', category: 'PT헬스' },
    { title: '필라테스 스튜디오', category: '필라테스' },
    { title: '보험설계사 사무소', category: '보험설계' },
    { title: '카센터', category: '자동차 수리용 가게' },
    { title: '법률 사무소', category: '전문직' },
    { title: '인테리어 업체', category: '생활서비스' },
  ],
};

export const DIAGNOSIS = {
  title: '무료진단 후 나의 개선점 확인해보기',
  subtitle: '지금 바로 무료로 진단받고, 사이트의 숨겨진 잠재력을 발견하세요',
  items: [
    { main: '문의 구조 진단', detail: '잠재 고객의 문의 이탈 최소화 전략 설계' },
    { main: '콘텐츠 및 레이아웃', detail: '브랜드와 서비스를 강조하는 화면 구성 제안' },
    { main: 'SEO 및 속도 개선', detail: '네이버/구글 검색 최적화 및 로딩 속도 향상 가이드' },
    { main: '사용자 경험(UX) 개선', detail: '고객이 정보를 얻고 결제까지 원활하게 이어지는 흐름 설계' },
  ],
  ctaButton: '무료진단 후 견적 받기',
};
