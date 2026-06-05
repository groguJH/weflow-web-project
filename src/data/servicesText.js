export const SERVICE_PROCESS = {
  sectionTitle: '제작 진행 과정',
  steps: [
    {
      number: '01',
      title: '상담·진단',
      desc: '업종 특성과 현재 온라인 상황을 분석하고 최적의 방향을 제안합니다.',
    },
    {
      number: '02',
      title: '기획·설계',
      desc: '문의가 들어오는 구조를 기반으로 페이지 구성과 콘텐츠 흐름을 기획합니다.',
    },
    {
      number: '03',
      title: '디자인',
      desc: '업종에 맞는 브랜드 감성과 신뢰감을 주는 UI/UX 디자인을 완성합니다.',
    },
    {
      number: '04',
      title: '개발·테스트',
      desc: '모바일·PC 반응형으로 개발하고, 문의 버튼·폼 동작을 꼼꼼히 테스트합니다.',
    },
    {
      number: '05',
      title: 'SEO 상단등록',
      desc: '네이버·구글 검색 상위 노출을 위한 SEO 최적화 작업을 진행합니다.',
    },
    {
      number: '06',
      title: '광고운영·사후관리',
      desc: '오픈 이후 광고 운영, 콘텐츠 업로드, 업데이트까지 지속적으로 관리합니다.',
    },
  ],
};

export const MANAGEMENT_SYSTEM = {
  sectionTitle: '광고 운영 · 사후관리 시스템',
  sub: '트래픽 확보부터 매출 전환, 상단 점유까지 — 운영의 모든 것을 책임집니다',
  groups: [
    {
      icon: '📢',
      title: '콘텐츠 마케팅',
      badge: '트래픽 확보',
      theme: 'orange',
      items: [
        { icon: '📝', title: '블로그 업로드', desc: '포스팅 발행을 통한 브랜드 지수 관리' },
        { icon: '📸', title: '인스타 업로드', desc: '트렌디한 피드/릴스 운영 및 유저 소통' },
        { icon: '🧵', title: '스레드 업로드', desc: '실시간 텍스트 기반 바이럴 확산' },
      ],
    },
    {
      icon: '🎯',
      title: '로컬 & 키워드 타겟팅',
      badge: '매출 전환',
      theme: 'blue',
      items: [
        { icon: '🔑', title: '네이버 키워드', desc: '잠재 고객을 타겟팅한 효율적 키워드 세팅' },
        { icon: '🥕', title: '당근플레이스', desc: '지역 기반 타겟 노출 및 동네 주민 인증 광고' },
      ],
    },
    {
      icon: '🚀',
      title: '포털 SEO 최적화',
      badge: '상단 점유',
      theme: 'green',
      items: [
        { icon: '🔍', title: '네이버 서치어드바이저', desc: '네이버 검색 로봇 최적화 및 상단 노출' },
        { icon: '📊', title: '구글 콘솔', desc: '구글 검색 엔진 최적화 및 색인 생성' },
        { icon: '🗺️', title: '사이트맵 등록', desc: '전 채널 검색 누락 방지 및 상단 노출 고정' },
      ],
    },
  ],
};
