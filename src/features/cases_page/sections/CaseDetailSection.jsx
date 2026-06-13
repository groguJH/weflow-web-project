"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Armchair,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bath,
  Bell,
  Bone,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  Check,
  ChevronUp,
  Clock3,
  Coffee,
  Droplets,
  FileText,
  Heart,
  HeartPulse,
  MapPin,
  PawPrint,
  Percent,
  Phone,
  Printer,
  Scale,
  Search,
  ShieldCheck,
  Scissors,
  Shirt,
  ShoppingCart,
  Sparkles,
  Target,
  Tag,
  Utensils,
  User,
  Users,
  Volume2,
  Wifi,
  X,
} from "lucide-react";
import DiagnosisModalButton from "@/components/ui/DiagnosisModalButton";

const RESERVATION_DATES = ["오늘", "내일", "모레", "주말"];
const RESERVATION_TIMES = [
  "오전 10:00",
  "오후 1:00",
  "오후 4:00",
  "오후 7:00",
  "오후 9:00",
];
const PROFESSIONAL_TIMES = [
  "오전 10:00",
  "오전 11:00",
  "오후 2:00",
  "오후 4:00",
  "오후 6:00",
];
const CAFE_TIMES = ["오전 11:00", "오후 1:00", "오후 3:00", "오후 5:00", "오후 7:00"];
const BEAUTY_TIMES = ["오전 11:00", "오후 1:00", "오후 3:00", "오후 5:00", "오후 7:00"];

const SAMPLE_BY_CATEGORY = {
  피트니스: {
    heroTitle: "1:1 맞춤 트레이닝\n지금 시작하세요",
    heroDescription:
      "전문 트레이너와 함께 목표까지, 맞춤 프로그램으로 시작하세요.",
    programLabel: "PROGRAM",
    programTitle: "프로그램 안내",
    priceLabel: "요금 안내",
    priceTitle: "합리적인 이용 요금",
    reservationTitle: "무료 체험 예약",
    programs: [
      ["1:1 퍼스널", "체형·목표 분석 후 맞춤 설계", Target],
      ["그룹 트레이닝", "소규모 그룹으로 함께 운동", Users],
      ["바디 케어", "체형 교정·재활 프로그램", HeartPulse],
      ["회원권 자유이용", "원하는 시간에 자유롭게", CalendarDays],
    ],
    prices: [
      ["1회 체험", "부담 없이 먼저 경험", "무료"],
      ["PT 10회", "전담 트레이너 1:1", "450,000원", true],
      ["월 회원권", "시설 자유 이용", "69,000원~"],
    ],
    reviews: [
      "문의 버튼 위치 바꾸고 상담 문의가 확실히 늘었어요.",
      "처음엔 반신반의했는데 랜딩 페이지 만들고 나서 상담 전화가 늘었어요.",
      "디자인이 너무 예뻐서 주변 원장님들한테 소개해드렸어요.",
    ],
  },
  뷰티: {
    heroTitle: "첫 방문 상담부터 예약까지, 한 번에 연결하세요",
    heroDescription:
      "시술 장점과 가격, 예약 동선을 보기 쉽게 정리한 뷰티 업종 맞춤 페이지입니다.",
    programLabel: "SERVICE",
    programTitle: "시술 안내",
    priceLabel: "PRICE",
    priceTitle: "대표 시술 요금",
    reservationTitle: "무료 상담 예약",
    programs: [
      ["맞춤 상담", "고객 고민에 맞춘 첫 상담", Target],
      ["대표 시술", "가장 잘 팔리는 메뉴 강조", BadgeCheck],
      ["예약제 운영", "시간대별 예약 흐름 정리", CalendarDays],
      ["사후 케어", "재방문을 만드는 관리 안내", HeartPulse],
    ],
    prices: [
      ["첫 상담", "부담 없이 먼저 상담", "무료"],
      ["대표 시술", "인기 메뉴 패키지", "상담 후 안내", true],
      ["정기 관리", "재방문 고객 관리", "월 관리"],
    ],
    reviews: [
      "모바일 화면이 훨씬 보기 좋아졌어요.",
      "업종 특성에 맞게 잘 만들어주셨어요.",
      "예약 문의가 전보다 더 잘 들어옵니다.",
    ],
  },
  교육: {
    heroTitle: "학부모 상담으로 이어지는 교육 페이지를 만듭니다",
    heroDescription:
      "커리큘럼, 수업 방식, 상담 신청까지 한눈에 보이도록 구성합니다.",
    programLabel: "CURRICULUM",
    programTitle: "수업 안내",
    priceLabel: "CLASS",
    priceTitle: "상담 후 수업 안내",
    reservationTitle: "무료 상담 예약",
    programs: [
      ["레벨 진단", "현재 학습 상태 확인", Target],
      ["맞춤 수업", "학생별 커리큘럼 구성", BadgeCheck],
      ["학습 관리", "진도와 피드백 관리", CalendarDays],
      ["상담 연결", "학부모 문의 동선 정리", Users],
    ],
    prices: [
      ["학습 진단", "먼저 부담 없이 확인", "무료"],
      ["정규 수업", "학생별 수업 구성", "상담 후 안내", true],
      ["집중 관리", "시험·입시 대비", "별도 안내"],
    ],
    reviews: [
      "SEO 부분까지 신경 써줘서 만족합니다.",
      "카카오 문의 연결이 편하게 바뀌었어요.",
      "문의하기 버튼 위치가 확실히 효과 있네요.",
    ],
  },
};

const DEFAULT_SAMPLE = {
  heroTitle: "고객 문의로 이어지는 페이지를 만듭니다",
  heroDescription:
    "서비스 장점과 상담 동선을 보기 쉽게 정리한 업종 맞춤 홈페이지 예시입니다.",
  programLabel: "SERVICE",
  programTitle: "서비스 안내",
  priceLabel: "PRICE",
  priceTitle: "상담 후 맞춤 견적",
  reservationTitle: "무료 상담 예약",
  programs: [
    ["1:1 상담", "고객 상황에 맞춘 상담", Target],
    ["서비스 안내", "핵심 상품을 보기 쉽게 정리", BadgeCheck],
    ["예약·문의", "바로 연결되는 문의 동선", CalendarDays],
    ["사후 관리", "운영 이후까지 이어지는 관리", HeartPulse],
  ],
  prices: [
    ["첫 상담", "부담 없이 먼저 상담", "무료"],
    ["대표 상품", "업종별 핵심 패키지", "상담 후 안내", true],
    ["운영 관리", "수정·관리·광고 연결", "월 관리"],
  ],
  reviews: [
    "설명도 쉽게 해주셔서 진행하기 편했습니다.",
    "피드백 속도가 진짜 빨랐습니다.",
    "비용 부담이 생각보다 적었습니다.",
  ],
};

const PROFESSIONAL_PRACTICES = [
  [
    "기업·법인 자문",
    "계약 검토, 지배구조, 분쟁 대응까지 기업 업무 전반을 자문합니다.",
    Building2,
  ],
  [
    "민사·손해배상",
    "대여금·계약 분쟁부터 손해배상까지 권리 회복을 위해 다룹니다.",
    FileText,
  ],
  [
    "형사 사건",
    "수사 초기부터 재판까지, 사건 단계별로 방어 전략을 설계합니다.",
    Scale,
  ],
  [
    "부동산·건설",
    "매매·임대차, 명도, 하자·공사대금 분쟁을 신속하게 정리합니다.",
    Briefcase,
  ],
  [
    "가사·상속",
    "이혼·양육, 상속 분할과 유류분까지 민감한 사안을 세심하게 다룹니다.",
    ShieldCheck,
  ],
  [
    "노동·행정",
    "부당해고, 임금, 행정처분 대응 등 일상의 권리를 지켜 드립니다.",
    FileText,
  ],
];

const PROFESSIONAL_REASONS = [
  [
    "철저한 비밀 보장",
    "상담 내용과 의뢰인 정보는 외부에 공개되지 않으며, 법적 보호를 받습니다.",
    ShieldCheck,
  ],
  [
    "담당 전문가 직접 수임",
    "사건은 분야별 담당 전문가가 처음부터 끝까지 직접 검토하고 진행합니다.",
    Scale,
  ],
  [
    "풍부한 실무 경력",
    "분야별 다수의 사건 경험을 바탕으로 현실적인 전략을 제시합니다.",
    Briefcase,
  ],
  [
    "신속한 초기 대응",
    "사건 초기 골든타임을 놓치지 않도록 빠른 상담과 대응을 약속합니다.",
    Phone,
  ],
];

const PROFESSIONAL_VISIT_INFO = [
  [
    "오시는 길",
    "서울 중심가 도보 5분 거리, 지하철역 인접. 방문 상담 시 사전 예약을 권장드립니다.",
    MapPin,
  ],
  [
    "상담 시간",
    "평일 오전 9시 ~ 오후 6시 / 야간·주말 상담은 사전 예약제로 운영합니다.",
    Clock3,
  ],
];

const CAFE_MENUS = [
  ["AMERICANO", "온도 아메리카노", "3,500원", "SIGNATURE", "dark"],
  ["VANILLA LATTE", "바닐라 크림 라떼", "4,800원", "BEST", "brown"],
  ["BLACK SESAME", "흑임자 라떼", "5,200원", "", "cream"],
  ["MATCHA LATTE", "말차 라떼", "5,000원", "", "brown"],
  ["BASQUE", "바스크 치즈케이크", "6,500원", "NEW", "cream"],
  ["COOKIE", "브라운 버터 쿠키", "3,800원", "", "dark"],
  ["TIRAMISU", "티라미수", "6,800원", "", "brown"],
  ["FINANCIER", "소금 휘낭시에", "3,200원", "", "cream"],
];

const CAFE_SPACES = [
  ["로스팅 바", "매일 직접 로스팅한 원두로 내리는 핸드드립", Coffee],
  ["넓은 주차 공간", "매장 앞 전용 주차 10대 · 발렛 안내", MapPin],
  ["단체석 · 룸", "모임 · 스터디를 위한 6~12인 프라이빗 룸", Briefcase],
  ["콘센트 전 좌석", "노트북 작업 좋은 통유리 창가 + 전 좌석 콘센트", Clock3],
];

const CAFE_REVIEWS = [
  "문의 버튼 위치 바꾸고 상담 문의가 확실히 늘었어요.",
  "처음엔 반신반의했는데 랜딩 페이지 만들고 나서 일주일 만에 상담 전화가 왔어요.",
  "디자인이 너무 예뻐서 주변 원장님들한테 소개해드렸어요.",
];

const KIDS_CAFE_MENUS = [
  ["KIDS MEAL", "아이 한입 플레이트", "8,500원", "SIGNATURE", "cream"],
  ["BRUNCH", "부모 브런치 세트", "12,000원", "BEST", "brown"],
  ["DRINK", "유기농 과일 주스", "5,800원", "NEW", "cream"],
  ["DESSERT", "동물 쿠키 세트", "4,500원", "", "brown"],
  ["PARTY", "생일파티 패키지", "상담", "POPULAR", "dark"],
  ["PLAY", "2시간 놀이권", "12,000원", "", "cream"],
  ["ROOM", "프라이빗 룸 예약", "30,000원~", "", "brown"],
  ["COFFEE", "보호자 커피", "4,500원", "", "dark"],
];

const KIDS_CAFE_SPACES = [
  ["안전 놀이존", "충격 완화 매트와 시야가 열린 놀이 동선", ShieldCheck],
  ["부모 휴식석", "아이를 보면서 쉴 수 있는 카페형 좌석", Coffee],
  ["생일파티 룸", "소규모 생일파티와 단체 모임을 위한 프라이빗 룸", Briefcase],
  ["위생 관리", "입장 전후 소독과 장난감 정리 루틴 안내", Droplets],
];

const KIDS_CAFE_REVIEWS = [
  "아이 놀이 공간과 보호자 좌석이 한눈에 보여 예약 문의가 편해졌어요.",
  "생일파티 패키지 설명이 정리되니 단체 예약 상담이 늘었습니다.",
  "모바일에서 이용 시간과 메뉴가 바로 보여서 안내가 훨씬 쉬워졌어요.",
];

const BEAUTY_SERVICES = [
  {
    label: "CUT",
    title: "커트",
    icon: Scissors,
    items: [
      ["디자인 커트", "38,000원~"],
      ["스타일 클리닉 커트", "45,000원~"],
    ],
  },
  {
    label: "PERM",
    title: "펌",
    icon: Sparkles,
    featured: true,
    items: [
      ["시그니처 컬펌", "120,000원~"],
      ["볼륨 셋팅펌", "150,000원~"],
    ],
  },
  {
    label: "COLOR",
    title: "염색",
    icon: Droplets,
    items: [
      ["톤업 전체 염색", "90,000원~"],
      ["뿌리 새치 커버", "55,000원~"],
    ],
  },
  {
    label: "CLINIC",
    title: "클리닉",
    icon: HeartPulse,
    items: [
      ["단백질 모발 클리닉", "60,000원~"],
      ["두피 스케일링 케어", "40,000원~"],
    ],
  },
];

const BEAUTY_GALLERY = [
  ["/cases_미용실.jpg", "스타일링"],
  ["/cases_피부관리샵.jpg", "컬러"],
  ["/cases_네일샵.jpg", "펌·세팅"],
];

const PET_GALLERY = [
  ["/cases_애견미용_시술1.jpg", "스타일링"],
  ["/cases_애견미용_시술2.jpg", "컬러"],
  ["/cases_애견미용_시술1.jpg", "펌·세팅"],
];

const BEAUTY_PROMISES = [
  ["경력 10년+ 디자이너", "검증된 실력의 1:1 전담 디자인", BadgeCheck],
  ["프리미엄 모발 케어", "시술 후 손상 최소화 트리트먼트", Sparkles],
  ["1:1 맞춤 스타일링", "얼굴형·모질에 맞춘 디자인 제안", Heart],
  ["간편 온라인 예약", "원하는 시간을 미리 선택", CalendarDays],
];

const BEAUTY_REVIEWS = [
  "문의 버튼 위치 바꾸고 상담 문의가 확실히 늘었어요.",
  "처음엔 반신반의했는데 랜딩 페이지 만들고 나서 일주일 만에 상담 전화가 왔어요.",
  "디자인이 너무 예뻐서 주변 원장님들한테 소개해드렸어요. 진짜 퀄리티 대박.",
];

const PET_SUPPLIES_MENU = [
  "선착순세일",
  "할인중정",
  "베스트",
  "신상품",
  "이벤트",
  "쿠폰존",
];

const PET_SUPPLIES_CATEGORY_NAV = [
  "사료",
  "간식",
  "배변/위생",
  "산책/이동장",
  "건강관리",
  "식기",
  "의류/액세서리",
  "장난감",
  "목욕/미용",
  "하우스",
];

const PET_SUPPLIES_ICONS = [
  ["선착순세일", Tag],
  ["100원샵", Percent],
  ["사료", Bone],
  ["간식", Coffee],
  ["배변/위생", Droplets],
  ["산책/이동장", MapPin],
  ["건강관리", HeartPulse],
  ["식기", Utensils],
  ["목욕/미용", Bath],
  ["의류", Shirt],
];

const PET_SUPPLIES_PRODUCTS = [
  {
    name: "프리미엄 사료 1.5kg",
    price: "23,800원",
    original: "28,000원",
    badge: "BEST",
    image: "/cases_반려동물용품점.jpg",
  },
  {
    name: "뼈모양 수제 비스킷",
    price: "9,900원",
    badge: "NEW",
    tone: "pink",
    visual: "bone",
  },
  {
    name: "유기농 수제 간식",
    price: "12,000원",
    image: "/cases_반려동물용품점.jpg",
  },
  {
    name: "뼈모양 터그 장난감",
    price: "14,000원",
    badge: "BEST",
    tone: "blue",
    visual: "toy",
  },
  {
    name: "저자극 배변패드 100매",
    price: "15,900원",
    original: "19,000원",
    tone: "gray",
  },
  {
    name: "스테인리스 식기 세트",
    price: "18,000원",
    tone: "cream",
  },
  {
    name: "폭신 방석 하우스",
    price: "39,000원",
    badge: "NEW",
    tone: "sky",
  },
  {
    name: "산책 하네스 + 리드줄",
    price: "24,000원",
    tone: "gray",
    active: true,
  },
];

const PET_SUPPLIES_REVIEWS = [
  "문의 버튼 위치 바꾸고 상담 문의가 확실히 늘었어요.",
  "처음엔 반신반의했는데 랜딩 페이지 만들고 나서 일주일 만에 상담 전화가 왔어요.",
  "디자인이 너무 예뻐서 주변 원장님들한테 소개해드렸어요. 진짜 퀄리티 대박.",
];

const STUDY_CAFE_FEATURES = [
  ["완벽 방음 1인 좌석", "독립 칸막이로 몰입도 높은 집중 환경", Volume2],
  ["초고속 와이파이", "전 좌석 빠르고 안정적인 인터넷", Wifi],
  ["무제한 카페 음료", "카페테리아 라운지 자유 이용", Coffee],
  ["24시간 운영", "언제든 원하는 시간에 이용 가능", Clock3],
];

const STUDY_CAFE_SPACES = [
  ["집중 1인실", "독립 칸막이 프리미엄 좌석", "FOCUS", Armchair],
  ["오픈 열람실", "넓은 책상의 개방형 좌석", "OPEN", BookOpen],
  ["스터디룸", "4~6인 그룹 학습 공간", "GROUP", Users],
  ["카페 라운지", "무제한 음료 휴식 공간", "LOUNGE", Coffee],
  ["프린트존", "인쇄·스캔 비즈니스 코너", "PRINT", Printer],
  ["마사지 체어", "집중 사이 잠깐의 회복", "RELAX", Armchair],
];

const STUDY_CAFE_PRICES = [
  ["시간권", "2,000원", "시간당", "필요할 때만 부담 없이"],
  ["10시간 정액권", "18,000원", "충전", "자주 오는 분께 추천", true],
  ["1개월 정기권", "139,000원", "월", "매일 공부하는 분께"],
];

const STUDY_CAFE_REVIEWS = [
  "처음엔 반신반의했는데 랜딩 페이지 만들고 나서 일주일 만에 상담 전화 3건이 왔어요.",
  "디자인이 너무 예뻐서 주변 원장님들한테 소개해드렸어요. 진짜 퀄리티 대박.",
  "3일 만에 완성됐는데 퀄리티가 이 가격에 이 정도면 진짜 가성비 최고입니다.",
];

const STUDY_CAFE_TIMES = ["2시간", "4시간", "6시간", "종일권", "심야권"];

const EDUCATION_TIMES = ["오후 2:00", "오후 3:00", "오후 4:00", "오후 5:00", "오후 7:00"];
const LIFE_SERVICE_TIMES = ["오전", "오후 12~3", "오후 3~6", "저녁", "협의"];
const AUTOMOTIVE_TIMES = ["오전", "오후 12~3", "오후 3~6", "저녁", "협의"];
const OTHER_CASE_TIMES = ["평일 오전", "평일 오후", "주말 오전", "주말 오후", "협의"];

const EDUCATION_CASE_CONTENT = {
  영어학원: {
    brand: "더브릿지 어학원",
    nav: ["학원소개", "커리큘럼", "강사진", "입학상담"],
    eyebrow: "THE BRIDGE · ENGLISH ACADEMY",
    heroTitle: "영어가 즐거워지는\n수업",
    heroDescription: "레벨별 맞춤 수업으로 영어가 즐거워집니다.",
    stats: [
      ["소수정예", "반당 정원 관리", Users],
      ["데이터 기반", "레벨별 성장 설계", Target],
      ["1:1", "담임 학습 코칭", BadgeCheck],
      ["주 5일", "클리닉 보충 운영", Clock3],
    ],
    curriculumSubtitle: "초등부터 고등까지, 레벨에 맞춰 설계한 3단계 과정",
    curriculum: [
      ["STARTER", "초등 부스터", "초3 - 초6", "읽기·듣기 기초 체력을 다지고 영어를 학습 습관으로 만드는 입문 과정.", ["파닉스 · 어휘 기초", "원어민 회화 클래스", "리딩 다독 프로그램"]],
      ["CORE", "중등 코어", "예비중 - 중3", "내신과 수능 기초를 동시에 잡는 핵심 과정. 문법·독해·서술형을 단계별로 관리.", ["내신 1등급 대비", "서술형 첨삭 클리닉", "단어 · 구문 데일리 테스트"], true],
      ["SUMMIT", "고등 써밋", "예비고 - 고3", "수능·모의고사 실전 감각과 등급 관리를 함께. 약점 데이터를 기반으로 보충 설계.", ["수능 유형별 집중", "오답 데이터 분석", "월간 모의 · 등급 리포트"]],
    ],
    campusSubtitle: "집중할 수 있는 강의실과 1:1 코칭 공간",
    campus: [["/cases_영어학원.jpg", "강의실"], ["/cases_수학학원.jpg", "학습·코칭 공간"]],
    whyTitle: "더브릿지가 관리하는 방식",
    why: [
      ["소수정예 분반", "레벨테스트로 정밀하게 나눈 소수 정원 클래스. 한 명도 놓치지 않는 밀착 수업.", Users],
      ["1:1 담임 관리", "담임 선생님이 출결·과제·테스트를 직접 챙기고 학부모님께 정기 리포트로 공유.", BadgeCheck],
      ["데이터 성과 관리", "시험 결과를 데이터로 누적해 약점을 시각화하고, 다음 학습 방향을 함께 설계합니다.", Target],
      ["맞춤 보충 클리닉", "부족한 단원은 방과 후 클리닉에서 다시. 진도에 끌려가지 않고 채워서 올라갑니다.", BookOpen],
    ],
    teachers: [["L", "이OO 원장", "대형 어학원 출신 · 입시 컨설팅", "리딩 · 내신"], ["K", "김OO 강사", "고등 수능 영어 전담", "수능 독해"], ["P", "Paul T.", "원어민 · 에세이 첨삭", "회화 · 라이팅"]],
    reservationTitle: "입학 상담 예약",
    reservationSubtitle: "원하는 날짜와 상담 시간을 선택해 보세요",
    bottomTitle: "이런 학원 홈페이지, 만들고 싶다면",
    bottomDesc: "상담 신청·커리큘럼 안내까지. 무료 진단으로 견적과 제작 방향을 안내해 드립니다.",
  },
  수학학원: {
    brand: "매쓰브릿지 수학학원",
    nav: ["학원소개", "커리큘럼", "강사진", "입학상담"],
    eyebrow: "MATH BRIDGE · MATH ACADEMY",
    heroTitle: "수학이 논리로 이어지는\n수업",
    heroDescription: "개념 이해부터 문제 해결력까지, 단계별로 빈틈을 채웁니다.",
    stats: [["개념 중심", "원리 이해 수업", BookOpen], ["오답 관리", "취약 유형 추적", Target], ["1:1 코칭", "풀이 습관 교정", BadgeCheck], ["주간 테스트", "성취도 확인", Clock3]],
    curriculumSubtitle: "초등 사고력부터 고등 실전까지 이어지는 수학 로드맵",
    curriculum: [
      ["BASIC", "초등 사고력", "초4 - 초6", "연산보다 개념의 이유를 먼저 익히고, 문장제와 도형 감각을 함께 키웁니다.", ["개념 원리 정리", "문장제 풀이 훈련", "사고력 심화 문제"]],
      ["CORE", "중등 내신", "중1 - 중3", "학교별 시험 범위와 기출 유형을 분석해 내신 성적을 안정적으로 관리합니다.", ["학교별 기출 분석", "오답노트 클리닉", "단원별 레벨 테스트"], true],
      ["SUMMIT", "고등 실전", "고1 - 고3", "수능형 사고와 내신 서술형을 함께 대비해 상위권 문제 해결력을 만듭니다.", ["수능 유형 집중", "킬러 문항 접근법", "월간 성취도 리포트"]],
    ],
    campusSubtitle: "풀이 과정을 집중해서 잡아주는 강의실과 클리닉 공간",
    campus: [["/cases_수학학원.jpg", "강의실"], ["/cases_입시학원.jpg", "오답 클리닉 공간"]],
    whyTitle: "수학 성적을 관리하는 방식",
    why: [
      ["개념 빈틈 진단", "첫 상담에서 단원별 이해도를 확인하고 학습 순서를 다시 잡습니다.", Target],
      ["풀이 습관 교정", "답보다 풀이 과정과 노트 정리 습관을 함께 점검합니다.", BadgeCheck],
      ["오답 데이터 관리", "반복되는 실수를 유형별로 분류해 주간 보충에 반영합니다.", BookOpen],
      ["내신·수능 병행", "학교 시험과 장기 수능 준비가 따로 놀지 않도록 흐름을 연결합니다.", Users],
    ],
    teachers: [["M", "박OO 원장", "대치권 내신·수능 지도", "고등 수학"], ["A", "최OO 강사", "중등 심화 전문", "내신 관리"], ["T", "정OO 강사", "초등 사고력 지도", "문장제 · 도형"]],
    reservationTitle: "수학 상담 예약",
    reservationSubtitle: "원하는 날짜와 진단 시간을 선택해 보세요",
    bottomTitle: "이런 수학학원 홈페이지, 만들고 싶다면",
    bottomDesc: "레벨 진단·커리큘럼 안내까지. 무료 진단으로 견적과 제작 방향을 안내해 드립니다.",
  },
  입시학원: {
    brand: "넥스트입시 전략학원",
    nav: ["학원소개", "입시전략", "강사진", "상담예약"],
    eyebrow: "NEXT ADMISSION · EXAM ACADEMY",
    heroTitle: "입시 전략이 결과로 이어지는\n관리",
    heroDescription: "학생별 목표 대학과 현재 위치를 기준으로 입시 로드맵을 설계합니다.",
    stats: [["입시 로드맵", "목표별 전략 설계", Target], ["데이터 분석", "성적 추이 관리", BadgeCheck], ["과목 코칭", "약점 보완 수업", BookOpen], ["정기 상담", "학부모 리포트", Clock3]],
    curriculumSubtitle: "진단부터 실전 지원까지 이어지는 입시 관리 과정",
    curriculum: [
      ["DIAGNOSIS", "입시 진단", "중3 - 고1", "현재 성적과 학습 습관을 분석해 목표 설정과 준비 순서를 정합니다.", ["성적표 분석", "목표 대학 설정", "학습 플랜 수립"]],
      ["STRATEGY", "전략 관리", "고1 - 고2", "내신·모의고사·비교과를 함께 관리하며 학생에게 맞는 전형 방향을 잡습니다.", ["전형별 가능성 분석", "월간 성적 리포트", "과목별 약점 보충"], true],
      ["FINAL", "실전 지원", "고3", "지원 전략부터 면접·자소서·최종 상담까지 입시 마무리를 세밀하게 돕습니다.", ["지원 대학 전략", "면접 대비", "최종 원서 상담"]],
    ],
    campusSubtitle: "상담실과 전략 코칭룸을 분리해 집중 상담을 진행합니다",
    campus: [["/cases_입시학원.jpg", "입시 상담실"], ["/cases_영어학원.jpg", "전략 코칭 공간"]],
    whyTitle: "입시 결과를 관리하는 방식",
    why: [
      ["목표 역산 설계", "목표 대학에서 필요한 성적과 활동을 거꾸로 계산해 로드맵을 만듭니다.", Target],
      ["전형별 전략", "학생 강점에 맞는 전형을 고르고 준비 우선순위를 정리합니다.", BadgeCheck],
      ["성적 추이 관리", "모의고사와 내신 데이터를 누적해 지원 가능성을 주기적으로 점검합니다.", BookOpen],
      ["학부모 상담", "변화가 생길 때마다 학부모님과 함께 방향을 조정합니다.", Users],
    ],
    teachers: [["N", "한OO 원장", "입시 컨설팅 12년", "전형 전략"], ["S", "오OO 컨설턴트", "학생부·면접 지도", "수시 관리"], ["R", "문OO 강사", "정시 데이터 분석", "수능 전략"]],
    reservationTitle: "입시 상담 예약",
    reservationSubtitle: "원하는 날짜와 상담 시간을 선택해 보세요",
    bottomTitle: "이런 입시학원 홈페이지, 만들고 싶다면",
    bottomDesc: "입시 상담·전략 안내까지. 무료 진단으로 견적과 제작 방향을 안내해 드립니다.",
  },
  개인과외: {
    brand: "원포인트 개인과외",
    nav: ["수업소개", "맞춤진단", "선생님", "상담예약"],
    eyebrow: "ONE POINT · PRIVATE TUTORING",
    heroTitle: "우리 아이에게 딱 맞춘\n1:1 수업",
    heroDescription: "학생의 속도와 성향에 맞춰 부족한 부분부터 차근차근 채웁니다.",
    stats: [["1:1 맞춤", "학생별 수업 설계", Users], ["약점 보완", "취약 단원 집중", Target], ["학습 루틴", "주간 과제 관리", CalendarDays], ["상담 리포트", "학부모 공유", BadgeCheck]],
    curriculumSubtitle: "학생 상태에 따라 유연하게 조정되는 1:1 과외 과정",
    curriculum: [
      ["CHECK", "첫 진단", "상담 · 레벨 확인", "현재 교재와 시험지를 함께 보며 학생에게 필요한 수업 방향을 정합니다.", ["학습 성향 파악", "취약 단원 체크", "목표 점수 설정"]],
      ["CUSTOM", "맞춤 수업", "주 1~3회", "학교 진도와 학생 이해도에 맞춰 설명, 문제풀이, 숙제를 개별 설계합니다.", ["교재 맞춤 진도", "오답 풀이 코칭", "주간 과제 피드백"], true],
      ["RESULT", "시험 대비", "내신 · 모의고사", "시험 전에는 빈출 유형과 약점 단원을 중심으로 단기간 점수를 끌어올립니다.", ["학교별 시험 대비", "실전 문제 훈련", "학부모 결과 공유"]],
    ],
    campusSubtitle: "온라인과 오프라인을 오가는 유연한 1:1 학습 공간",
    campus: [["/cases_개인과외.jpg", "1:1 수업 공간"], ["/cases_수학학원.jpg", "학습 자료 정리"]],
    whyTitle: "개인과외를 관리하는 방식",
    why: [
      ["학생별 진도", "정해진 커리큘럼보다 학생 이해도에 맞춰 속도를 조절합니다.", Users],
      ["약점 집중", "틀리는 이유를 찾아 같은 실수가 반복되지 않도록 훈련합니다.", Target],
      ["학습 루틴 형성", "수업 밖에서도 공부가 이어지도록 과제와 복습 루틴을 만듭니다.", CalendarDays],
      ["학부모 소통", "수업 내용과 다음 계획을 간단한 리포트로 공유합니다.", BadgeCheck],
    ],
    teachers: [["O", "오OO 선생님", "중·고등 1:1 지도", "수학 · 영어"], ["Y", "윤OO 선생님", "초중등 기초 관리", "기초 보완"], ["H", "한OO 선생님", "내신 대비 전문", "시험 관리"]],
    reservationTitle: "과외 상담 예약",
    reservationSubtitle: "원하는 날짜와 상담 시간을 선택해 보세요",
    bottomTitle: "이런 개인과외 홈페이지, 만들고 싶다면",
    bottomDesc: "상담 신청·수업 안내까지. 무료 진단으로 견적과 제작 방향을 안내해 드립니다.",
  },
};

const LIFE_SERVICE_CASE_CONTENT = {
  청소업체: {
    eyebrow: "HOME CLEANING SERVICE",
    heroTitle: "구석구석 믿고 맡기는 청소",
    heroDescription: "입주·이사·사무실 청소까지 믿고 맡기실 수 있습니다.",
    ctaLabel: "무료 견적 받기",
    stats: [
      ["무료 방문 견적", BadgeCheck],
      ["파손 보험 가입", ShieldCheck],
      ["재이용률 98%", Sparkles],
    ],
    services: [
      ["입주·이사 청소", "이사 전후 구석구석 전문 청소", "평당 9,000원~", "인기", Sparkles],
      ["가사 정기 청소", "주 1회 정기 방문, 생활 공간 관리", "회당 35,000원~", "", CalendarDays],
      ["사무실 청소", "면적·주기 맞춤 정기 계약 청소", "견적 협의", "", Building2],
      ["에어컨·특수 청소", "에어컨 분해·새집증후군 제거", "60,000원~", "", Droplets],
    ],
    gallery: [
      ["/cases_청소업체.jpg", "작업 전·후"],
      ["/cases_인테리어업체.jpg", "디테일 시공"],
    ],
    reasons: [
      ["무료 견적 우선", "방문 전 평수만 알려주시면 예상 견적을 먼저 안내합니다.", BadgeCheck],
      ["보험 가입 완료", "작업 중 파손에 대비한 영업배상책임보험에 가입되어 있습니다.", ShieldCheck],
      ["전문 장비·약품", "공간별 전용 세제와 스팀 장비로 안전하게 시공합니다.", Sparkles],
      ["교육 수료 매니저", "5단계 교육을 마친 검증된 매니저가 직접 방문합니다.", User],
    ],
    bottomTitle: "이런 청소·생활서비스 홈페이지,\n만들고 싶다면",
    bottomDesc: "견적·예약 구조까지. 무료 진단으로 견적과 제작 방향을 안내해 드립니다.",
  },
  "인테리어 업체": {
    eyebrow: "INTERIOR REMODELING SERVICE",
    heroTitle: "공간의 분위기를 바꾸는 인테리어",
    heroDescription: "상담부터 실측·시공·마감 관리까지 믿고 맡길 수 있습니다.",
    ctaLabel: "무료 실측 받기",
    stats: [
      ["무료 현장 실측", BadgeCheck],
      ["공정 일정 공유", Clock3],
      ["만족도 98%", Sparkles],
    ],
    services: [
      ["주거 인테리어", "아파트·빌라 공간 맞춤 시공", "평당 견적", "인기", Building2],
      ["상가 인테리어", "브랜드 콘셉트 공간 설계", "견적 협의", "", Briefcase],
      ["부분 리모델링", "주방·욕실·도배·장판", "공사별 견적", "", Bath],
      ["마감·보수 시공", "누수·타일·필름 보수", "80,000원~", "", ShieldCheck],
    ],
    gallery: [
      ["/cases_인테리어업체.jpg", "시공 전·후"],
      ["/cases_청소업체.jpg", "마감 디테일"],
    ],
    reasons: [
      ["무료 현장 실측", "방문 실측 후 공간에 맞는 범위와 예산을 먼저 정리합니다.", BadgeCheck],
      ["공정별 일정 공유", "철거부터 마감까지 진행 상황을 단계별로 안내합니다.", Clock3],
      ["전문 시공팀", "전기·목공·도장 등 공정별 담당자가 안전하게 시공합니다.", Briefcase],
      ["A/S 상담 지원", "시공 후 작은 보수와 관리 문의까지 빠르게 대응합니다.", ShieldCheck],
    ],
    bottomTitle: "이런 인테리어 홈페이지,\n만들고 싶다면",
    bottomDesc: "상담·실측·시공 문의 구조까지. 무료 진단으로 견적과 제작 방향을 안내해 드립니다.",
  },
  "이사 업체": {
    eyebrow: "MOVING SERVICE",
    heroTitle: "짐은 안전하게, 이사는 편하게",
    heroDescription: "가정이사부터 사무실 이전까지 일정에 맞춰 꼼꼼히 진행합니다.",
    ctaLabel: "무료 견적 받기",
    stats: [
      ["무료 방문 견적", BadgeCheck],
      ["파손 보험 가입", ShieldCheck],
      ["정시 도착률 98%", Clock3],
    ],
    services: [
      ["가정 이사", "포장부터 운송·정리까지 한 번에", "견적 협의", "인기", Briefcase],
      ["원룸·소형 이사", "혼자 사는 공간도 빠르고 안전하게", "120,000원~", "", Users],
      ["사무실 이전", "집기·서류·장비 이전 동선 관리", "견적 협의", "", Building2],
      ["포장·정리 서비스", "이사 전후 짐 정리와 폐기물 정돈", "80,000원~", "", BadgeCheck],
    ],
    gallery: [
      ["/cases_이사업체.jpg", "포장·운송 현장"],
      ["/cases_청소업체.jpg", "정리 마감"],
    ],
    reasons: [
      ["방문 견적", "짐의 양과 동선을 확인한 뒤 추가 비용을 줄일 수 있게 안내합니다.", BadgeCheck],
      ["보험 가입", "이동 중 파손에 대비한 보상 기준을 사전에 안내합니다.", ShieldCheck],
      ["전문 포장재", "가구·가전·유리 제품별 포장재로 안전하게 운반합니다.", Sparkles],
      ["일정 전담 매니저", "예약부터 도착 시간, 마무리 확인까지 한 명이 관리합니다.", User],
    ],
    bottomTitle: "이런 이사업체 홈페이지,\n만들고 싶다면",
    bottomDesc: "견적·예약·전화 문의 구조까지. 무료 진단으로 견적과 제작 방향을 안내해 드립니다.",
  },
};

const AUTOMOTIVE_CASE_CONTENT = {
  "자동차 디테일링": {
    brand: "DETAIL LAB",
    nav: ["서비스", "요금", "예약", "후기"],
    eyebrow: "CAR DETAILING STUDIO",
    heroTitle: "새 차 같은 광택, 디테일의\n차이",
    heroDescription: "외장·내장 디테일링으로 새 차 같은 컨디션을 유지하세요.",
    ctaLabel: "무료 견적 받기",
    stats: [
      ["무료 차량 진단", BadgeCheck],
      ["시공 보증서 발급", ShieldCheck],
      ["구글 평점 4.9", Sparkles],
    ],
    services: [
      ["신차 유리막 코팅", "광택 + 유리막 코팅 풀패키지", "180,000원~", "인기", Sparkles],
      ["폴리싱 (광택)", "스월·기스 제거 단계별 광택", "120,000원~", "", Search],
      ["실내 클리닝", "가죽·시트·천장 무광 클리닝", "90,000원~", "", Droplets],
      ["PPF 부분 시공", "전면 보호 필름 맞춤 시공", "견적 협의", "", ShieldCheck],
    ],
    gallery: [
      ["/cases_자동차디테일링.jpg", "작업 전·후"],
      ["/cases_렌터카업체.jpg", "디테일 시공"],
    ],
    reasons: [
      ["무료 사전 진단", "차량 도장 상태를 먼저 진단하고 필요한 시공만 제안합니다.", BadgeCheck],
      ["시공 보증", "작업 후 보증서를 발급하고 사후 점검까지 책임집니다.", ShieldCheck],
      ["전문 장비·실내", "항온항습 작업실과 전용 폴리셔로 균일한 퀄리티를 냅니다.", Sparkles],
      ["1:1 책임 시공", "담당 디테일러가 입고부터 출고까지 직접 시공합니다.", User],
    ],
    reservationTitle: "입고 · 견적 예약",
    bottomTitle: "이런 디테일링·렌터카 홈페이지,\n만들고 싶다면",
    bottomDesc: "견적·예약 구조까지. 무료 진단으로 견적과 제작 방향을 안내해 드립니다.",
  },
  "렌터카 업체": {
    brand: "RENTAL DRIVE",
    nav: ["차량", "요금", "예약", "후기"],
    eyebrow: "RENT A CAR SERVICE",
    heroTitle: "필요한 순간 바로 연결되는\n렌터카",
    heroDescription: "단기·장기 렌트부터 보험 안내와 예약 상담까지 한 번에 확인하세요.",
    ctaLabel: "차량 견적 받기",
    stats: [
      ["실시간 차량 상담", BadgeCheck],
      ["보험 옵션 안내", ShieldCheck],
      ["재예약률 98%", Clock3],
    ],
    services: [
      ["단기 렌트", "하루부터 필요한 기간만 간편 대여", "일 49,000원~", "인기", CalendarDays],
      ["장기 렌트", "월 단위 차량 이용과 유지비 관리", "월 견적 협의", "", Briefcase],
      ["공항·역 픽업", "도착 시간에 맞춘 차량 인도 상담", "견적 협의", "", MapPin],
      ["법인 차량", "업무용 차량 배차와 계약 관리", "맞춤 견적", "", Building2],
    ],
    gallery: [
      ["/cases_렌터카업체.jpg", "차량 라인업"],
      ["/cases_자동차디테일링.jpg", "출고 전 점검"],
    ],
    reasons: [
      ["차량 상태 안내", "예약 전 차량 연식, 옵션, 보험 조건을 보기 쉽게 안내합니다.", BadgeCheck],
      ["보험 옵션 정리", "자차·대인·대물 조건을 고객이 이해하기 쉽게 정리합니다.", ShieldCheck],
      ["빠른 예약 연결", "전화와 문의 버튼을 핵심 위치에 배치해 상담 전환을 높입니다.", Phone],
      ["반납 일정 관리", "대여 기간과 반납 시간을 확인하기 쉬운 예약 구조로 설계합니다.", Clock3],
    ],
    reservationTitle: "차량 · 견적 예약",
    bottomTitle: "이런 렌터카 홈페이지,\n만들고 싶다면",
    bottomDesc: "차량 안내·견적·예약 구조까지. 무료 진단으로 견적과 제작 방향을 안내해 드립니다.",
  },
};

const OTHER_CASE_CONTENT = {
  "웨딩/스냅 업체": {
    eyebrow: "INTERIOR · WEDDING SNAP",
    heroTitle: "평생 간직할 그날의 순간",
    heroDescription: "자연스럽고 감각적인 화보로 그날의 순간을 남깁니다.",
    ctaLabel: "작업 상담 예약",
    worksSubtitle: "인테리어 시공과 스냅 촬영, 완성된 공간과 순간을 모아 보여 줍니다.",
    works: [
      ["/cases_웨딩스냅업체.jpg", "거실", "커스텀 웨딩 스냅", "WEDDING · 자연광", "row-span-2"],
      ["/cases_웨딩스냅업체.jpg", "WEDDING", "제주 야외 웨딩 스냅", "WEDDING · 자연광", "md:col-span-2"],
      ["/cases_소상공인기업형홈페이지.jpg", "미니멀", "한남동 18평 신혼집", "미니멀 · 와이드컷", ""],
      ["/cases_웨딩스냅업체.jpg", "WEDDING", "하우스 스냅", "WEDDING · 도심", ""],
      ["/cases_소상공인기업형홈페이지.jpg", "주방", "판교 45평 단독 시공", "주방 · 월넛톤", "row-span-2"],
      ["/cases_웨딩스냅업체.jpg", "라이프스타일", "라이프스타일 반지컷", "라이프스타일 · 반지", ""],
      ["/cases_웨딩스냅업체.jpg", "WEDDING", "제주 하우스 스냅", "WEDDING · 골목", ""],
      ["/cases_웨딩스냅업체.jpg", "BATH", "스튜디오 촬영", "BATH · 테라조", "md:col-span-2"],
    ],
    services: [
      ["공간 리모델링", "실측 · 3D 도면부터 시공까지 전 과정 책임 진행", Building2],
      ["웨딩 · 화보 스냅", "본식 · 야외 · 한복까지 자연광 베이스 감성 촬영", Briefcase],
      ["맞춤 설계 · 컨설팅", "예산과 동선에 맞춘 도면 · 자재 큐레이션", FileText],
      ["스타일링 · 보정", "촬영 후 톤 보정과 공간 스타일링 디테일까지", Sparkles],
    ],
    reviewBadges: ["전국 출장 촬영 · 시공 가능", "연중무휴 상담"],
    reservationTitle: "상담 · 촬영 예약",
    reservationSubtitle: "원하는 날짜와 희망 일정을 선택해 보세요",
    bottomTitle: "이런 웨딩·스냅 홈페이지,\n만들고 싶다면",
    bottomDesc: "작업 갤러리·상담 예약 구조까지. 무료 진단으로 견적과 제작 방향을 안내해 드립니다.",
  },
  "소상공인 기업형 홈페이지": {
    eyebrow: "INTERIOR · WEDDING SNAP",
    heroTitle: "작은 가게도 기업처럼 보이게",
    heroDescription: "작은 브랜드도 신뢰감 있는 기업형 홈페이지로 완성합니다.",
    heroImage: "/cases_building_picture.jpg",
    ctaLabel: "작업 상담 예약",
    worksSubtitle: "인테리어 시공과 스냅 촬영, 완성된 공간과 순간을 모아 보여 줍니다.",
    works: [
      ["/cases_소상공인기업형홈페이지.jpg", "거실", "기업형 메인 화면", "거실 · 주방 · 우드톤", "row-span-2"],
      ["/cases_소상공인기업형홈페이지.jpg", "WEDDING", "회사 소개 섹션", "WEDDING · 자연광", "md:col-span-2"],
      ["/cases_소상공인기업형홈페이지.jpg", "미니멀", "서비스 안내 화면", "미니멀 · 와이드오픈", ""],
      ["/cases_소상공인기업형홈페이지.jpg", "WEDDING", "브랜드 스토리", "WEDDING · 도심", ""],
      ["/cases_소상공인기업형홈페이지.jpg", "주방", "문의 전환 섹션", "주방 · 욕실모듈", "row-span-2"],
      ["/cases_소상공인기업형홈페이지.jpg", "라이프스타일", "포트폴리오 구성", "라이프스타일 · 반지", ""],
      ["/cases_소상공인기업형홈페이지.jpg", "WEDDING", "기업 소개 상세", "WEDDING · 골목", ""],
      ["/cases_소상공인기업형홈페이지.jpg", "BATH", "관리형 페이지", "BATH · 테라조", "md:col-span-2"],
    ],
    services: [
      ["공간 리모델링", "실측 · 3D 도면부터 시공까지 전 과정 책임 진행", Building2],
      ["웨딩 · 화보 스냅", "본식 · 야외 · 한복까지 자연광 베이스 감성 촬영", Briefcase],
      ["맞춤 설계 · 컨설팅", "예산과 동선에 맞춘 도면 · 자재 큐레이션", FileText],
      ["스타일링 · 보정", "촬영 후 톤 보정과 공간 스타일링 디테일까지", Sparkles],
    ],
    reviewBadges: ["B2B 문의 구조 설계", "운영 · 유지보수 상담"],
    reservationTitle: "상담 · 제작 예약",
    reservationSubtitle: "원하는 날짜와 희망 일정을 선택해 보세요",
    bottomTitle: "이런 기업형 홈페이지,\n만들고 싶다면",
    bottomDesc: "회사 소개·서비스 안내·문의 전환 구조까지. 무료 진단으로 견적과 제작 방향을 안내해 드립니다.",
  },
};

function getSample(item) {
  return SAMPLE_BY_CATEGORY[item.category] || DEFAULT_SAMPLE;
}

function ArrowButtonContent({ children }) {
  return (
    <>
      <span>{children}</span>
      <ArrowRight
        size="1em"
        className="text-[1rem] transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </>
  );
}

function ReservationCompleteModal({ selectedReservation, onClose, onConsult }) {
  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-neutral-950/58 px-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-label="예약 요청 완료"
    >
      <div className="relative w-full max-w-[24rem] rounded-[2rem] bg-white px-[clamp(1.4rem,4vw,2rem)] py-[clamp(1.75rem,5vw,2.25rem)] text-center text-neutral-950 shadow-[0_2rem_5rem_rgba(15,23,42,0.25)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-neutral-500 transition-[background-color,color,transform] duration-200 hover:translate-y-[1px] hover:bg-neutral-100 hover:text-neutral-950 active:translate-y-[2px]"
          aria-label="예약 완료 창 닫기"
        >
          <X size="1.15rem" aria-hidden="true" />
        </button>

        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <Check size="1.8rem" strokeWidth={3} aria-hidden="true" />
        </span>

        <h3 className="mt-6 text-[clamp(1.1rem,2.5vw,1.3rem)] font-black">
          예약 요청 완료
        </h3>
        <p className="mt-4 text-[clamp(0.88rem,1.6vw,1rem)] font-bold leading-relaxed text-neutral-700">
          {selectedReservation} 예약이 접수되었습니다.
        </p>
        <p className="mt-4 text-xs font-semibold text-neutral-500">
          ※ 제작 예시 데모입니다. 실제 예약은 진행되지 않습니다.
        </p>

        <button
          type="button"
          onClick={onConsult}
          className="mt-7 inline-flex w-full cursor-pointer items-center justify-center rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black text-white transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-blue-800 hover:shadow-[0_0.55rem_1.25rem_rgba(37,99,235,0.16)] active:translate-y-[2px]"
        >
          실제 상담 신청하기
        </button>
      </div>
    </div>
  );
}

function ProfessionalCasePage({
  item,
  blogHref,
  selectedDate,
  selectedTime,
  selectedReservation,
  setSelectedDate,
  setSelectedTime,
  isReservationOpen,
  setIsReservationOpen,
  openDiagnosisModal,
}) {
  const officeName = item.title.includes("법률")
    ? "정도 법률사무소"
    : `정도 ${item.title}`;
  const spaceImage = item.title.includes("세무사")
    ? "/cases_법률사무소.jpg"
    : "/cases_세무사사무소.jpg";

  return (
    <article className="overflow-hidden bg-white text-neutral-950">
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid min-h-[4.25rem] max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            href="/cases"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.78rem,1.4vw,0.95rem)] font-bold text-neutral-600 transition-colors duration-200 hover:text-neutral-950"
          >
            <ArrowLeft
              size="1em"
              className="transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            제작 사례
          </Link>

          <p className="text-keep hidden text-center text-[clamp(0.78rem,1.3vw,0.9rem)] font-bold text-neutral-500 sm:block">
            {item.title} · 랜딩페이지 제작 예시(샘플)
          </p>

          <DiagnosisModalButton className="inline-flex cursor-pointer items-center justify-center justify-self-end rounded-xl bg-blue-600 px-4 py-2.5 text-[clamp(0.78rem,1.3vw,0.92rem)] font-black text-white shadow-[0_0.75rem_1.75rem_rgba(37,99,235,0.22)] transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-blue-800 hover:shadow-[0_0.45rem_1.1rem_rgba(37,99,235,0.18)] active:translate-y-[2px]">
            이 디자인으로 상담
          </DiagnosisModalButton>
        </div>
      </div>

      <section className="relative min-h-[clamp(42rem,64vw,51rem)] overflow-hidden px-4 py-[clamp(1.4rem,3vw,2rem)] text-white sm:px-6 lg:px-8">
        <Image
          src={item.img}
          alt={`${item.title} 전문직 랜딩페이지 예시`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#142d4f]/78" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#10243f]/72 via-[#10243f]/44 to-[#10243f]/86" />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[clamp(1rem,2vw,1.35rem)] font-black">
            <Scale size="1.2em" className="text-[#d6a716]" aria-hidden="true" />
            {officeName}
          </div>
          <nav className="hidden items-center gap-[clamp(1.5rem,3vw,3rem)] text-[clamp(0.78rem,1.2vw,0.92rem)] font-bold text-white/86 lg:flex">
            {[
              "사무소 소개",
              "업무 분야",
              "구성원",
              "오시는 길",
              "상담 예약",
            ].map((navItem) => (
              <span key={navItem}>{navItem}</span>
            ))}
          </nav>
          <DiagnosisModalButton className="hidden cursor-pointer rounded-xl bg-[#d6a716] px-5 py-2.5 text-sm font-black text-[#10243f] transition-[background-color,transform] duration-200 hover:translate-y-[1px] hover:bg-[#b88b0f] active:translate-y-[2px] sm:inline-flex">
            상담 문의
          </DiagnosisModalButton>
        </div>

        <div className="relative mx-auto flex min-h-[clamp(34rem,56vw,43rem)] max-w-7xl flex-col items-center justify-center text-center">
          <p className="mb-[clamp(1rem,2vw,1.5rem)] text-[clamp(0.75rem,1.2vw,0.9rem)] font-black uppercase tracking-[0.45em] text-[#d6a716]">
            JUNGDO LAW · TRUST PARTNERS
          </p>
          <h1 className="text-keep max-w-4xl text-[clamp(2.35rem,4.2vw,3.85rem)] font-black leading-[1.18] tracking-[-0.01em]">
            꼭 맞는 보장, 전문가와 설계하세요
          </h1>
          <p className="text-keep mt-[clamp(1.25rem,2.7vw,2rem)] max-w-3xl text-[clamp(1rem,1.9vw,1.25rem)] font-bold leading-relaxed text-white/78">
            라이프스타일에 맞춘 보장 분석부터 설계까지 무료로 상담해 드립니다.
          </p>

          <div className="mt-[clamp(1.6rem,3.5vw,2.4rem)] flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsReservationOpen(true)}
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#d6a716] px-[clamp(1.35rem,2.7vw,2rem)] py-[clamp(0.9rem,1.7vw,1.15rem)] text-[clamp(0.9rem,1.45vw,1rem)] font-black text-[#10243f] shadow-[0_1rem_2rem_rgba(0,0,0,0.14)] transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-[#b88b0f] hover:shadow-[0_0.55rem_1.25rem_rgba(0,0,0,0.12)] active:translate-y-[2px]"
            >
              <ArrowButtonContent>무료 상담 예약</ArrowButtonContent>
            </button>
            <a
              href="tel:01029717280"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/8 px-[clamp(1.15rem,2.4vw,1.7rem)] py-[clamp(0.9rem,1.7vw,1.15rem)] text-[clamp(0.9rem,1.45vw,1rem)] font-black text-white backdrop-blur transition-[background-color,transform,border-color] duration-200 hover:translate-y-[1px] hover:border-white/35 hover:bg-black/20 active:translate-y-[2px]"
            >
              <Phone size="1em" aria-hidden="true" />
              010-2971-7280
            </a>
          </div>

          <span className="mt-[clamp(1.25rem,2.5vw,1.75rem)] inline-flex rounded-full bg-white/16 px-3 py-1 text-xs font-black text-white/82 backdrop-blur">
            제작 예시 · 샘플 디자인
          </span>
        </div>
      </section>

      <section className="bg-white px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.78rem,1.3vw,0.9rem)] font-black uppercase tracking-[0.45em] text-[#d6a716]">
              PRACTICE AREAS
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              업무 분야
            </h2>
            <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-500">
              분야별 담당 전문가가 직접 사건을 검토하고 진행합니다
            </p>
            <span className="mt-5 inline-flex rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-bold text-neutral-500">
              제작 예시 · 샘플 구성
            </span>
          </div>

          <ul className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2 xl:grid-cols-3">
            {PROFESSIONAL_PRACTICES.map(([title, desc, Icon]) => (
              <li
                key={title}
                className="rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.55rem,3vw,2rem)] shadow-[0_1.5rem_3rem_rgba(15,23,42,0.05)] transition-[border-color,background-color,transform] duration-200 hover:translate-y-[1px] hover:border-neutral-300 hover:bg-neutral-50"
              >
                <span className="mb-[clamp(1.1rem,2vw,1.5rem)] flex size-12 items-center justify-center rounded-full bg-[#102b51] text-[#d6a716]">
                  <Icon size="1.1rem" aria-hidden="true" />
                </span>
                <h3 className="text-[clamp(1.05rem,1.8vw,1.25rem)] font-black">
                  {title}
                </h3>
                <p className="mt-4 text-[clamp(0.88rem,1.45vw,1rem)] font-bold leading-relaxed text-neutral-500">
                  {desc}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#102b51]">
                  자세히 보기
                  <ArrowRight size="1em" aria-hidden="true" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.78rem,1.3vw,0.9rem)] font-black uppercase tracking-[0.45em] text-[#d6a716]">
              OUR SPACE
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              신뢰가 시작되는 공간
            </h2>
            <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-500">
              의뢰인을 위한 독립 상담실과 안정감 있는 사무 공간을 갖췄습니다
            </p>
          </div>

          <div className="mt-[clamp(2.4rem,5vw,3.75rem)] grid gap-[clamp(1rem,2.4vw,1.6rem)] lg:grid-cols-2">
            {[
              [item.img, "사무소 전경"],
              [spaceImage, "독립 상담실"],
            ].map(([src, label]) => (
              <div
                key={label}
                className="relative min-h-[clamp(18rem,35vw,28rem)] overflow-hidden rounded-[2rem] bg-neutral-300 shadow-[0_1.7rem_3.5rem_rgba(15,23,42,0.08)]"
              >
                <Image
                  src={src}
                  alt={`${item.title} ${label}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/46 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 text-lg font-black text-white">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
              WHY US
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              믿고 맡길 수 있는 이유
            </h2>
          </div>

          <ul className="mt-[clamp(2.25rem,5vw,3.5rem)] grid gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2 xl:grid-cols-4">
            {PROFESSIONAL_REASONS.map(([title, desc, Icon]) => (
              <li
                key={title}
                className="rounded-[1.75rem] bg-[#102b51] p-[clamp(1.45rem,2.8vw,2rem)] text-white shadow-[0_1.5rem_3rem_rgba(15,43,81,0.12)]"
              >
                <span className="mb-[clamp(1.2rem,2.3vw,1.6rem)] flex size-12 items-center justify-center rounded-full bg-blue-600/30 text-[#d6a716]">
                  <Icon size="1.1rem" aria-hidden="true" />
                </span>
                <h3 className="text-[clamp(1rem,1.7vw,1.15rem)] font-black">
                  {title}
                </h3>
                <p className="mt-4 text-[clamp(0.84rem,1.35vw,0.96rem)] font-bold leading-relaxed text-white/68">
                  {desc}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-7 text-center text-xs font-semibold text-neutral-500">
            ※ 표기된 사무소명 · 정보는 제작 예시용 샘플이며 실제와 다릅니다.
          </p>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
              CLIENT VOICE
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              의뢰인 후기
            </h2>
          </div>

          <ul className="mt-[clamp(2rem,4.5vw,3rem)] grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-3">
            {[
              "문의 버튼 위치 바꾸고 상담 문의가 확실히 늘었어요.",
              "처음엔 반신반의했는데 랜딩 페이지 만들고 나서 일주일 만에 상담 전화가 왔어요.",
              "디자인이 너무 예뻐서 주변 원장님들한테 소개해드렸어요. 진짜 퀄리티 대박.",
            ].map((review) => (
              <li
                key={review}
                className="rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.25rem,2.5vw,1.75rem)] shadow-[0_1.4rem_3rem_rgba(15,23,42,0.05)]"
              >
                <p className="text-amber-400" aria-label="별점 5점">
                  ★★★★★
                </p>
                <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold leading-relaxed text-neutral-700">
                  “{review}”
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 pb-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <ul className="grid gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2">
            {PROFESSIONAL_VISIT_INFO.map(([title, desc, Icon]) => (
              <li
                key={title}
                className="flex gap-4 rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.35rem,2.6vw,1.8rem)] shadow-[0_1.5rem_3rem_rgba(15,23,42,0.05)]"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#102b51] text-[#d6a716]">
                  <Icon size="1.1rem" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-[clamp(1rem,1.7vw,1.15rem)] font-black">
                    {title}
                  </h3>
                  <p className="mt-2 text-[clamp(0.86rem,1.35vw,0.98rem)] font-bold leading-relaxed text-neutral-600">
                    {desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-[clamp(5rem,10vw,7rem)] text-center">
            <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-[#102b51]">
              RESERVATION
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              상담 예약
            </h2>
            <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-600">
              원하는 날짜와 상담 시간을 선택해 보세요
            </p>
          </div>

          <div className="mx-auto mt-[clamp(2rem,4.5vw,3rem)] max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-[clamp(1.4rem,3vw,2rem)] text-left shadow-[0_2rem_4rem_rgba(15,23,42,0.08)]">
            <div className="mb-5 flex items-center gap-2 text-sm font-black text-[#102b51]">
              <CalendarDays size="1em" aria-hidden="true" />
              날짜
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {RESERVATION_DATES.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-black transition-[background-color,border-color,color,transform] duration-200 hover:translate-y-[1px] active:translate-y-[2px] ${
                    date === selectedDate
                      ? "border-[#102b51] bg-[#102b51] text-white hover:bg-[#0a1d39]"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>

            <div className="mb-5 mt-7 flex items-center gap-2 text-sm font-black text-[#102b51]">
              <Clock3 size="1em" aria-hidden="true" />
              상담 시간
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {PROFESSIONAL_TIMES.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-black transition-[background-color,border-color,color,transform] duration-200 hover:translate-y-[1px] active:translate-y-[2px] ${
                    time === selectedTime
                      ? "border-[#102b51] bg-[#102b51] text-white hover:bg-[#0a1d39]"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsReservationOpen(true)}
              className="group mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#102b51] px-5 py-4 text-sm font-black text-white transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-[#0a1d39] hover:shadow-[0_0.55rem_1.25rem_rgba(16,43,81,0.16)] active:translate-y-[2px]"
            >
              <ArrowButtonContent>
                {selectedReservation} 예약하기
              </ArrowButtonContent>
            </button>
          </div>
        </div>
      </section>

      {isReservationOpen && (
        <ReservationCompleteModal
          selectedReservation={selectedReservation}
          onClose={() => setIsReservationOpen(false)}
          onConsult={openDiagnosisModal}
        />
      )}

      <section className="bg-neutral-950 px-4 py-[clamp(5rem,10vw,8rem)] text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-keep max-w-3xl text-[clamp(1.95rem,4.2vw,3.55rem)] font-black leading-[1.18]">
            이런 전문사무소 홈페이지, 만들고 싶다면
          </h2>
          <p className="text-keep mt-[clamp(1.3rem,2.8vw,2rem)] max-w-3xl text-[clamp(0.95rem,1.7vw,1.2rem)] font-bold leading-relaxed text-white/62">
            상담 예약·신뢰 구조까지. 무료 진단으로 견적과 제작 방향을 안내해
            드립니다.
          </p>

          <div className="mt-[clamp(1.7rem,3.5vw,2.5rem)] flex flex-wrap gap-3">
            <DiagnosisModalButton className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-[clamp(1.25rem,2.5vw,1.75rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-neutral-950 transition-[background-color,transform] duration-200 hover:translate-y-[1px] hover:bg-neutral-200 active:translate-y-[2px]">
              <ArrowButtonContent>무료 진단 신청</ArrowButtonContent>
            </DiagnosisModalButton>
            <a
              href="tel:01029717280"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/16 bg-white/5 px-[clamp(1.1rem,2.3vw,1.55rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-white transition-[background-color,transform,border-color] duration-200 hover:translate-y-[1px] hover:border-white/24 hover:bg-black/25 active:translate-y-[2px]"
            >
              <Phone size="1em" aria-hidden="true" />
              010-2971-7280
            </a>
          </div>
        </div>
      </section>

      <div className="bg-white px-4 py-[clamp(1.8rem,4vw,2.5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/cases"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.85rem,1.4vw,0.95rem)] font-bold text-neutral-700 transition-colors duration-200 hover:text-blue-600"
          >
            <ArrowLeft
              size="1em"
              className="transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            다른 업종 사례 보기
          </Link>

          <a
            href={blogHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.85rem,1.4vw,0.95rem)] font-bold text-blue-600 transition-colors duration-200 hover:text-blue-800"
          >
            블로그에서 실제 제작기 보기
            <ArrowRight
              size="1em"
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </article>
  );
}

function CafeCasePage({
  item,
  blogHref,
  selectedDate,
  selectedTime,
  selectedReservation,
  setSelectedDate,
  setSelectedTime,
  isReservationOpen,
  setIsReservationOpen,
  openDiagnosisModal,
}) {
  const isKidsCafe = item.title === "키즈카페";
  const placeImage = "/cases_카페.jpg";
  const cafeContent = isKidsCafe
    ? {
        brand: "KIDS ONDO",
        brandSub: "키즈 카페",
        heroEyebrow: "SAFE PLAY · FAMILY PLACE",
        heroTitle: "아이도 부모도 행복한 공간",
        heroDescription:
          "안전한 놀이 공간과 편안한 부모 휴식 공간을 함께 마련했습니다.",
        ctaLabel: "단체 · 룸 예약하기",
        menuLabel: "KIDS MENU",
        menuTitle: "키즈 메뉴",
        menuSubtitle: "아이 간식과 보호자 음료, 생일파티 구성을 한눈에 안내합니다",
        menus: KIDS_CAFE_MENUS,
        placeLabel: "PLAY ZONE",
        placeTitle: "놀이 공간",
        placeSubtitle: "아이들이 뛰어놀고 부모가 편히 쉬는 분리형 공간",
        placeItems: [
          [item.img, "놀이존 전경"],
          [placeImage, "보호자 카페석"],
        ],
        introLabel: "공간 소개",
        introTitle: "아이와 부모를 위한 공간",
        spaces: KIDS_CAFE_SPACES,
        locationTitle: "오시는 길",
        locationAddress:
          "서울특별시 마포구 어딘가로 24, 2층\n주차 가능 · 유모차 입장 가능",
        hours: [
          ["평일", "10:00 - 20:00"],
          ["주말 · 공휴일", "10:00 - 21:00"],
          ["정비 시간", "매일 14:00 - 14:30"],
        ],
        socialHandle: "@kids.ondo",
        socialHandleDesc: "운영 소식 · 예약 가능 시간",
        socialName: "KIDS ONDO",
        socialDesc: "이벤트 · 생일파티 예약 안내",
        reviewLabel: "방문 후기",
        reviewTitle: "보호자 후기",
        reviews: KIDS_CAFE_REVIEWS,
        reservationTitle: "단체 · 생일파티 예약",
        reservationSubtitle: "원하는 날짜와 방문 시간을 선택해 보세요",
        timeLabel: "방문 시간",
        bottomTitle: "이런 키즈카페 홈페이지, 만들고 싶다면",
        bottomDesc:
          "입장 안내 · 메뉴 · 생일파티 예약까지. 무료 진단으로 견적과 제작 방향을 안내해 드립니다.",
      }
    : {
        brand: "CAFE ONDO",
        brandSub: "온도 커피",
        heroEyebrow: "SLOW COFFEE · WARM PLACE",
        heroTitle: "하루의 쉼표가 되는 공간",
        heroDescription: "분위기 좋은 공간과 시그니처 메뉴를 한눈에 소개합니다.",
        ctaLabel: "단체 · 룸 예약하기",
        menuLabel: "SIGNATURE MENU",
        menuTitle: "시그니처 메뉴",
        menuSubtitle: "바리스타가 직접 내리는 커피와 매일 굽는 디저트",
        menus: CAFE_MENUS,
        placeLabel: "OUR PLACE",
        placeTitle: "매장 분위기",
        placeSubtitle: "통유리 창과 우드 톤으로 채운 따뜻한 공간",
        placeItems: [
          [item.img, "바 · 좌석 공간"],
          [placeImage, "디저트 · 테이블"],
        ],
        introLabel: "공간 소개",
        introTitle: "이런 공간을 제공합니다",
        spaces: CAFE_SPACES,
        locationTitle: "오시는 길",
        locationAddress:
          "서울특별시 마포구 어딘가로 24, 1층\n2호선 합정역 3번 출구 도보 5분",
        hours: [
          ["평일", "08:00 - 22:00"],
          ["주말 · 공휴일", "10:00 - 23:00"],
          ["브레이크 타임", "없음 (연중무휴)"],
        ],
        socialHandle: "@cafe.ondo",
        socialHandleDesc: "오늘의 메뉴 · 신메뉴 소식",
        socialName: "CAFE ONDO",
        socialDesc: "이벤트 · 단체 예약 안내",
        reviewLabel: "방문 후기",
        reviewTitle: "손님들의 이야기",
        reviews: CAFE_REVIEWS,
        reservationTitle: "단체 · 룸 예약",
        reservationSubtitle: "원하는 날짜와 방문 시간을 선택해 보세요",
        timeLabel: "방문 시간",
        bottomTitle: "이런 카페 홈페이지, 만들고 싶다면",
        bottomDesc:
          "메뉴 · 예약 · 오시는 길까지. 무료 진단으로 견적과 제작 방향을 안내해 드립니다.",
      };

  return (
    <article className="overflow-hidden bg-[#f7f5f2] text-neutral-950">
      <section className="relative flex min-h-[clamp(34rem,60vw,43rem)] items-center justify-center overflow-hidden px-4 py-[clamp(4rem,9vw,7rem)] text-center text-white sm:px-6 lg:px-8">
        <Image
          src={item.img}
          alt={`${item.title} 카페 랜딩페이지 예시`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#4a2914]/62" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2b160c]/42 via-[#4a2914]/30 to-[#2b160c]/76" />

        {isKidsCafe && (
          <div className="absolute left-0 right-0 top-0 z-10 px-4 py-[clamp(1.2rem,2.6vw,1.8rem)] sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl items-start justify-between gap-4 text-left">
              <div>
                <div className="inline-flex items-center gap-2 text-[clamp(1rem,1.8vw,1.25rem)] font-black uppercase tracking-[0.24em] text-white">
                  <Coffee size="1em" aria-hidden="true" />
                  {cafeContent.brand}
                </div>
                <p className="mt-2 text-xs font-bold text-white/72">
                  {cafeContent.brandSub}
                </p>
              </div>

              <nav className="hidden items-center gap-[clamp(1.4rem,3vw,2.6rem)] text-[clamp(0.82rem,1.25vw,0.95rem)] font-bold text-white/86 md:flex">
                {["메뉴", "공간", "오시는 길", "예약"].map((navItem) => (
                  <span key={navItem}>{navItem}</span>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => setIsReservationOpen(true)}
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#f8efe5] px-5 py-2.5 text-sm font-black text-[#4b2a15] transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-[#dfc4a5] hover:shadow-[0_0.55rem_1.25rem_rgba(0,0,0,0.12)] active:translate-y-[2px]"
              >
                주문 · 예약
              </button>
            </div>
          </div>
        )}

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-[clamp(1rem,2vw,1.5rem)] text-[clamp(0.72rem,1.15vw,0.88rem)] font-black uppercase tracking-[0.45em] text-[#eadac4]">
            {cafeContent.heroEyebrow}
          </p>
          <h1 className="text-keep mx-auto max-w-5xl text-[clamp(2.65rem,6vw,5.2rem)] font-black leading-[1.08] tracking-[-0.02em]">
            {cafeContent.heroTitle}
          </h1>
          <p className="mx-auto mt-[clamp(1rem,2.3vw,1.55rem)] max-w-3xl text-[clamp(0.95rem,1.7vw,1.15rem)] font-bold leading-relaxed text-white/82">
            {cafeContent.heroDescription}
          </p>

          <div className="mt-[clamp(1.5rem,3vw,2.25rem)] flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsReservationOpen(true)}
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#f8efe5] px-[clamp(1.35rem,2.7vw,2rem)] py-[clamp(0.9rem,1.7vw,1.15rem)] text-[clamp(0.9rem,1.45vw,1rem)] font-black text-[#4b2a15] shadow-[0_1rem_2rem_rgba(0,0,0,0.14)] transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-[#dfc4a5] hover:shadow-[0_0.55rem_1.25rem_rgba(0,0,0,0.12)] active:translate-y-[2px]"
            >
              <ArrowButtonContent>{cafeContent.ctaLabel}</ArrowButtonContent>
            </button>
            <a
              href="tel:01029717280"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/28 bg-white/8 px-[clamp(1.15rem,2.4vw,1.7rem)] py-[clamp(0.9rem,1.7vw,1.15rem)] text-[clamp(0.9rem,1.45vw,1rem)] font-black text-white backdrop-blur transition-[background-color,transform,border-color] duration-200 hover:translate-y-[1px] hover:border-white/38 hover:bg-black/20 active:translate-y-[2px]"
            >
              <Phone size="1em" aria-hidden="true" />
              010-2971-7280
            </a>
          </div>

          <span className="mt-[clamp(1.25rem,2.5vw,1.75rem)] inline-flex rounded-full bg-white/16 px-3 py-1 text-xs font-black text-white/84 backdrop-blur">
            제작 예시 · 샘플 디자인
          </span>
        </div>
      </section>

      <section className="bg-white px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.78rem,1.3vw,0.9rem)] font-black uppercase tracking-[0.45em] text-[#87511f]">
              {cafeContent.menuLabel}
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              {cafeContent.menuTitle}
            </h2>
            <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-500">
              {cafeContent.menuSubtitle}
            </p>
          </div>

          <ul className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2 xl:grid-cols-4">
            {cafeContent.menus.map(([eyebrow, name, price, badge, tone]) => {
              const dark = tone === "dark";
              const brown = tone === "brown";
              return (
                <li
                  key={name}
                  className={`relative min-h-[11.5rem] rounded-[1.75rem] p-[clamp(1.25rem,2.6vw,1.75rem)] shadow-[0_1.5rem_3rem_rgba(83,47,23,0.08)] ${
                    dark
                      ? "bg-[#4a2914] text-white"
                      : brown
                        ? "bg-[#87511f] text-white"
                        : "bg-[#f3eadc] text-[#2f1a0d]"
                  }`}
                >
                  <span className={`mb-6 flex size-10 items-center justify-center rounded-full ${dark || brown ? "bg-white/14" : "bg-white/55"}`}>
                    <Coffee size="1rem" aria-hidden="true" />
                  </span>
                  {badge && (
                    <span className={`absolute right-6 top-7 rounded-full px-3 py-1 text-[0.62rem] font-black ${dark || brown ? "bg-white/20 text-white" : "bg-white/70 text-[#5b371d]"}`}>
                      {badge}
                    </span>
                  )}
                  <p className={`text-[0.7rem] font-black uppercase tracking-[0.28em] ${dark || brown ? "text-white/55" : "text-[#8a6748]"}`}>
                    {eyebrow}
                  </p>
                  <h3 className="mt-2 text-[clamp(1rem,1.7vw,1.12rem)] font-black">
                    {name}
                  </h3>
                  <p className="mt-5 text-[clamp(1.05rem,2vw,1.35rem)] font-black">
                    {price}
                  </p>
                </li>
              );
            })}
          </ul>
          <p className="mt-7 text-center text-xs font-semibold text-neutral-500">
            ※ 표기된 메뉴 · 가격은 제작 예시용 샘플이며 실제와 다릅니다.
          </p>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.78rem,1.3vw,0.9rem)] font-black uppercase tracking-[0.45em] text-[#87511f]">
              {cafeContent.placeLabel}
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              {cafeContent.placeTitle}
            </h2>
            <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-500">
              {cafeContent.placeSubtitle}
            </p>
          </div>

          <div className="mt-[clamp(2.4rem,5vw,3.75rem)] grid gap-[clamp(1rem,2.4vw,1.6rem)] lg:grid-cols-2">
            {cafeContent.placeItems.map(([src, label]) => (
              <div
                key={label}
                className="relative min-h-[clamp(18rem,35vw,28rem)] overflow-hidden rounded-[2rem] bg-neutral-300 shadow-[0_1.7rem_3.5rem_rgba(83,47,23,0.08)]"
              >
                <Image src={src} alt={`${item.title} ${label}`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/46 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 text-lg font-black text-white">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
              {cafeContent.introLabel}
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              {cafeContent.introTitle}
            </h2>
          </div>

          <ul className="mt-[clamp(2.25rem,5vw,3.5rem)] grid gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2 xl:grid-cols-4">
            {cafeContent.spaces.map(([title, desc, Icon]) => (
              <li key={title} className="rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.45rem,2.8vw,2rem)] shadow-[0_1.5rem_3rem_rgba(15,23,42,0.06)]">
                <span className="mb-[clamp(1.2rem,2.3vw,1.6rem)] flex size-12 items-center justify-center rounded-full bg-[#f3eadc] text-[#87511f]">
                  <Icon size="1.1rem" aria-hidden="true" />
                </span>
                <h3 className="text-[clamp(1rem,1.7vw,1.15rem)] font-black">{title}</h3>
                <p className="mt-4 text-[clamp(0.84rem,1.35vw,0.96rem)] font-bold leading-relaxed text-neutral-600">
                  {desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.78rem,1.3vw,0.9rem)] font-black uppercase tracking-[0.45em] text-[#87511f]">
              LOCATION
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              {cafeContent.locationTitle}
            </h2>
          </div>

          <ul className="mt-[clamp(2.4rem,5vw,3.75rem)] grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-3">
            <li className="rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.45rem,2.8vw,2rem)] shadow-[0_1.5rem_3rem_rgba(15,23,42,0.05)]">
              <span className="mb-5 flex size-12 items-center justify-center rounded-full bg-[#f3eadc] text-[#87511f]">
                <MapPin size="1.1rem" aria-hidden="true" />
              </span>
              <h3 className="font-black">매장 위치</h3>
              <p className="mt-4 whitespace-pre-line text-sm font-bold leading-relaxed text-neutral-500">
                {cafeContent.locationAddress}
              </p>
              <button
                type="button"
                className="group mt-5 inline-flex cursor-pointer items-center gap-2 text-sm font-black text-[#87511f] transition-[color,transform] duration-200 hover:translate-y-[1px] hover:text-[#603816] active:translate-y-[2px]"
                aria-label="지도 길찾기 예시 버튼"
              >
                지도 길찾기
                <ArrowRight
                  size="1em"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </li>
            <li className="rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.45rem,2.8vw,2rem)] shadow-[0_1.5rem_3rem_rgba(15,23,42,0.05)]">
              <span className="mb-5 flex size-12 items-center justify-center rounded-full bg-[#f3eadc] text-[#87511f]">
                <Clock3 size="1.1rem" aria-hidden="true" />
              </span>
              <h3 className="font-black">영업시간</h3>
              <dl className="mt-4 grid gap-3 text-sm font-bold text-neutral-600">
                {cafeContent.hours.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <dt>{label}</dt>
                    <dd className="text-neutral-950">{value}</dd>
                  </div>
                ))}
              </dl>
            </li>
            <li className="rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.45rem,2.8vw,2rem)] shadow-[0_1.5rem_3rem_rgba(15,23,42,0.05)]">
              <span className="mb-5 flex size-12 items-center justify-center rounded-full bg-[#f3eadc] text-[#87511f]">
                <Coffee size="1.1rem" aria-hidden="true" />
              </span>
              <h3 className="font-black">소식 받기</h3>
              <div className="mt-4 space-y-4 text-sm font-bold text-neutral-600">
                <p>
                  <button
                    type="button"
                    className="block cursor-pointer text-left font-black text-neutral-950 transition-[color,transform] duration-200 hover:translate-y-[1px] hover:text-[#87511f] active:translate-y-[2px]"
                    aria-label="@cafe.ondo 소식 예시 버튼"
                  >
                    {cafeContent.socialHandle}
                  </button>
                  {cafeContent.socialHandleDesc}
                </p>
                <p>
                  <button
                    type="button"
                    className="block cursor-pointer text-left font-black text-neutral-950 transition-[color,transform] duration-200 hover:translate-y-[1px] hover:text-[#87511f] active:translate-y-[2px]"
                    aria-label="CAFE ONDO 소식 예시 버튼"
                  >
                    {cafeContent.socialName}
                  </button>
                  {cafeContent.socialDesc}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
              {cafeContent.reviewLabel}
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              {cafeContent.reviewTitle}
            </h2>
          </div>

          <ul className="mt-[clamp(2rem,4.5vw,3rem)] grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-3">
            {cafeContent.reviews.map((review) => (
              <li key={review} className="rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.25rem,2.5vw,1.75rem)] shadow-[0_1.4rem_3rem_rgba(15,23,42,0.05)]">
                <p className="text-amber-400" aria-label="별점 5점">★★★★★</p>
                <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold leading-relaxed text-neutral-700">
                  “{review}”
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 pb-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black uppercase text-[#87511f]">
            RESERVATION
          </p>
          <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
            {cafeContent.reservationTitle}
          </h2>
          <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-600">
            {cafeContent.reservationSubtitle}
          </p>

          <div className="mx-auto mt-[clamp(2rem,4.5vw,3rem)] max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-[clamp(1.4rem,3vw,2rem)] text-left shadow-[0_2rem_4rem_rgba(15,23,42,0.08)]">
            <div className="mb-5 flex items-center gap-2 text-sm font-black text-[#87511f]">
              <CalendarDays size="1em" aria-hidden="true" />
              날짜
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {RESERVATION_DATES.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-black transition-[background-color,border-color,color,transform] duration-200 hover:translate-y-[1px] active:translate-y-[2px] ${
                    date === selectedDate
                      ? "border-[#87511f] bg-[#87511f] text-white hover:bg-[#603816]"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>

            <div className="mb-5 mt-7 flex items-center gap-2 text-sm font-black text-[#87511f]">
              <Clock3 size="1em" aria-hidden="true" />
              {cafeContent.timeLabel}
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {CAFE_TIMES.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-black transition-[background-color,border-color,color,transform] duration-200 hover:translate-y-[1px] active:translate-y-[2px] ${
                    time === selectedTime
                      ? "border-[#87511f] bg-[#87511f] text-white hover:bg-[#603816]"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsReservationOpen(true)}
              className="group mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#87511f] px-5 py-4 text-sm font-black text-white transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-[#603816] hover:shadow-[0_0.55rem_1.25rem_rgba(96,56,22,0.16)] active:translate-y-[2px]"
            >
              <ArrowButtonContent>{selectedReservation} 예약하기</ArrowButtonContent>
            </button>
          </div>
        </div>
      </section>

      {isReservationOpen && (
        <ReservationCompleteModal
          selectedReservation={selectedReservation}
          onClose={() => setIsReservationOpen(false)}
          onConsult={openDiagnosisModal}
        />
      )}

      <section className="bg-neutral-950 px-4 py-[clamp(5rem,10vw,8rem)] text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-keep max-w-4xl text-[clamp(1.95rem,4.2vw,3.55rem)] font-black leading-[1.18]">
            {cafeContent.bottomTitle}
          </h2>
          <p className="text-keep mt-[clamp(1.3rem,2.8vw,2rem)] max-w-3xl text-[clamp(0.95rem,1.7vw,1.2rem)] font-bold leading-relaxed text-white/62">
            {cafeContent.bottomDesc}
          </p>

          <div className="mt-[clamp(1.7rem,3.5vw,2.5rem)] flex flex-wrap gap-3">
            <DiagnosisModalButton className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-[clamp(1.25rem,2.5vw,1.75rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-neutral-950 transition-[background-color,transform] duration-200 hover:translate-y-[1px] hover:bg-neutral-200 active:translate-y-[2px]">
              <ArrowButtonContent>무료 진단 신청</ArrowButtonContent>
            </DiagnosisModalButton>
            <a
              href="tel:01029717280"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/16 bg-white/5 px-[clamp(1.1rem,2.3vw,1.55rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-white transition-[background-color,transform,border-color] duration-200 hover:translate-y-[1px] hover:border-white/24 hover:bg-black/25 active:translate-y-[2px]"
            >
              <Phone size="1em" aria-hidden="true" />
              010-2971-7280
            </a>
          </div>
        </div>
      </section>

      <div className="bg-white px-4 py-[clamp(1.8rem,4vw,2.5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/cases"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.85rem,1.4vw,0.95rem)] font-bold text-neutral-700 transition-colors duration-200 hover:text-[#87511f]"
          >
            <ArrowLeft
              size="1em"
              className="transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            다른 업종 사례 보기
          </Link>

          <a
            href={blogHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.85rem,1.4vw,0.95rem)] font-bold text-[#87511f] transition-colors duration-200 hover:text-[#603816]"
          >
            블로그에서 실제 제작기 보기
            <ArrowRight
              size="1em"
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </article>
  );
}

function BeautyCasePage({
  item,
  blogHref,
  selectedDate,
  selectedTime,
  selectedReservation,
  setSelectedDate,
  setSelectedTime,
  isReservationOpen,
  setIsReservationOpen,
  openDiagnosisModal,
}) {
  const isPetCase = item.category === "반려동물";
  const galleryItems = isPetCase ? PET_GALLERY : BEAUTY_GALLERY;
  const sampleType = isPetCase ? "랜딩페이지" : "홈페이지";
  const heroTitle = isPetCase
    ? "우리 아이를 위한 섬세한 케어"
    : "당신에게 어울리는 스타일을 찾다";
  const heroDescription = isPetCase
    ? "우리 아이 성향에 맞춘 스트레스 없는 미용을 약속합니다."
    : "얼굴형과 취향에 맞는 스타일을 전문 디자이너가 제안합니다.";

  return (
    <article className="overflow-hidden bg-[#f5f5f6] text-neutral-950">
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid min-h-[4.25rem] max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            href="/cases"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.78rem,1.4vw,0.95rem)] font-bold text-neutral-600 transition-colors duration-200 hover:text-neutral-950"
          >
            <ArrowLeft
              size="1em"
              className="transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            제작 사례
          </Link>

          <p className="text-keep hidden text-center text-[clamp(0.78rem,1.3vw,0.9rem)] font-bold text-neutral-500 sm:block">
            {item.title} · {sampleType} 제작 예시(샘플)
          </p>

          <DiagnosisModalButton className="inline-flex cursor-pointer items-center justify-center justify-self-end rounded-xl bg-blue-600 px-4 py-2.5 text-[clamp(0.78rem,1.3vw,0.92rem)] font-black text-white shadow-[0_0.75rem_1.75rem_rgba(37,99,235,0.22)] transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-blue-800 hover:shadow-[0_0.45rem_1.1rem_rgba(37,99,235,0.18)] active:translate-y-[2px]">
            이 디자인으로 상담
          </DiagnosisModalButton>
        </div>
      </div>

      {isPetCase && (
        <div className="border-b border-neutral-200 bg-white">
          <div className="mx-auto flex min-h-[4.6rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-3 text-[clamp(1rem,2vw,1.35rem)] font-black uppercase tracking-[0.28em] text-[#bd6f7f]">
              <Scissors size="1em" aria-hidden="true" />
              LUMIERE
            </div>

            <nav className="hidden items-center gap-[clamp(1.6rem,3.2vw,3rem)] text-[clamp(0.82rem,1.25vw,0.95rem)] font-bold text-neutral-950 md:flex">
              {["시술안내", "디자이너", "예약", "오시는길"].map((navItem) => (
                <span key={navItem}>{navItem}</span>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => setIsReservationOpen(true)}
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#bd6f7f] px-5 py-2.5 text-sm font-black text-white transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-[#a95d6e] hover:shadow-[0_0.55rem_1.25rem_rgba(189,111,127,0.18)] active:translate-y-[2px]"
            >
              예약하기
            </button>
          </div>
        </div>
      )}

      <section className="relative flex min-h-[clamp(37rem,58vw,43rem)] items-center overflow-hidden px-4 py-[clamp(4.5rem,9vw,7rem)] text-white sm:px-6 lg:px-8">
        <Image
          src={item.img}
          alt={`${item.title} ${sampleType} 제작 예시`}
          fill
          priority
          sizes="100vw"
          className={`object-cover ${isPetCase ? "" : "grayscale"}`}
        />
        <div className={`absolute inset-0 ${isPetCase ? "bg-[#39261f]/20" : "bg-[#1f171b]/64"}`} />
        <div className={`absolute inset-0 ${isPetCase ? "bg-gradient-to-r from-[#321f18]/44 via-[#6c422b]/16 to-transparent" : "bg-gradient-to-r from-[#211419]/78 via-[#322026]/42 to-[#1f171b]/20"}`} />

        <div className="relative mx-auto w-full max-w-7xl">
          <p className="mb-[clamp(1rem,2vw,1.5rem)] inline-flex items-center gap-2 text-[clamp(0.75rem,1.2vw,0.9rem)] font-black uppercase tracking-[0.38em] text-[#f2d5dc]">
            <Scissors size="1em" aria-hidden="true" />
            HAIR & BEAUTY SALON
          </p>

          <h1 className="text-keep max-w-5xl text-[clamp(2.35rem,5.2vw,4.6rem)] font-black leading-[1.12] tracking-[-0.02em]">
            {heroTitle}
          </h1>

          <p className="text-keep mt-[clamp(1.15rem,2.4vw,1.7rem)] max-w-3xl text-[clamp(0.95rem,1.75vw,1.2rem)] font-bold leading-relaxed text-white/78">
            {heroDescription}
          </p>

          <div className="mt-[clamp(1.6rem,3.4vw,2.4rem)] flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setIsReservationOpen(true)}
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#cf7b8b] px-[clamp(1.35rem,2.7vw,2rem)] py-[clamp(0.9rem,1.7vw,1.15rem)] text-[clamp(0.9rem,1.45vw,1rem)] font-black text-white shadow-[0_1rem_2rem_rgba(60,24,34,0.2)] transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-[#b86677] hover:shadow-[0_0.55rem_1.25rem_rgba(60,24,34,0.16)] active:translate-y-[2px]"
            >
              <ArrowButtonContent>지금 예약하기</ArrowButtonContent>
            </button>
            <a
              href="tel:01029717280"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/28 bg-white/8 px-[clamp(1.15rem,2.4vw,1.7rem)] py-[clamp(0.9rem,1.7vw,1.15rem)] text-[clamp(0.9rem,1.45vw,1rem)] font-black text-white backdrop-blur transition-[background-color,transform,border-color] duration-200 hover:translate-y-[1px] hover:border-white/38 hover:bg-black/20 active:translate-y-[2px]"
            >
              <Phone size="1em" aria-hidden="true" />
              010-2971-7280
            </a>
          </div>

          <span className="mt-[clamp(1.25rem,2.5vw,1.75rem)] inline-flex rounded-full bg-white px-3 py-1 text-xs font-black text-neutral-700 shadow-[0_0.7rem_1.5rem_rgba(0,0,0,0.1)]">
            제작 예시 · 샘플 디자인
          </span>
        </div>
      </section>

      <section className="bg-white px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.78rem,1.3vw,0.9rem)] font-black uppercase tracking-[0.45em] text-[#c77786]">
              MENU & PRICE
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              시술 메뉴
            </h2>
            <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-500">
              커트부터 펌·염색·클리닉까지, 모질에 맞춘 시술
            </p>
          </div>

          <ul className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-2">
            {BEAUTY_SERVICES.map(({ label, title, icon: Icon, items, featured }) => (
              <li
                key={title}
                className={`relative rounded-[1.75rem] border bg-white p-[clamp(1.5rem,3vw,2rem)] shadow-[0_1.5rem_3rem_rgba(15,23,42,0.05)] transition-[border-color,background-color,transform] duration-200 hover:translate-y-[1px] hover:bg-neutral-50 ${
                  featured ? "border-blue-500" : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                {featured && (
                  <span className="absolute right-6 top-7 rounded-full bg-blue-600 px-3 py-1 text-[0.68rem] font-black text-white">
                    인기
                  </span>
                )}
                <div className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f7e4e8] text-[#c77786]">
                    <Icon size="1.1rem" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[0.72rem] font-black uppercase tracking-[0.35em] text-[#c77786]">
                      {label}
                    </p>
                    <h3 className="mt-1 text-[clamp(1.05rem,1.8vw,1.25rem)] font-black">
                      {title}
                    </h3>
                  </div>
                </div>

                <dl className="mt-[clamp(1.35rem,2.8vw,2rem)] grid gap-4">
                  {items.map(([name, price]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between gap-4 border-b border-neutral-200 pb-3 last:border-b-0 last:pb-0"
                    >
                      <dt className="text-[clamp(0.88rem,1.45vw,1rem)] font-bold text-neutral-600">
                        {name}
                      </dt>
                      <dd className="text-[clamp(0.92rem,1.55vw,1.05rem)] font-black text-neutral-950">
                        {price}
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>

          <p className="mt-7 text-center text-xs font-semibold text-neutral-500">
            ※ 표기된 메뉴 · 가격은 제작 예시용 샘플이며 실제와 다릅니다.
          </p>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.78rem,1.3vw,0.9rem)] font-black uppercase tracking-[0.45em] text-[#c77786]">
              GALLERY
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              시술 갤러리
            </h2>
          </div>

          <div className="mt-[clamp(2.4rem,5vw,3.75rem)] grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-3">
            {galleryItems.map(([src, label]) => (
              <div
                key={label}
                className="relative min-h-[clamp(18rem,33vw,28rem)] overflow-hidden rounded-[1.75rem] bg-neutral-300 shadow-[0_1.7rem_3.5rem_rgba(15,23,42,0.08)]"
              >
                <Image
                  src={src}
                  alt={`${item.title} ${label} 갤러리`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className={`object-cover ${isPetCase ? "" : "grayscale"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 text-lg font-black text-white">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.78rem,1.3vw,0.9rem)] font-black uppercase tracking-[0.45em] text-[#c77786]">
              WHY LUMIERE
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              디자이너의 약속
            </h2>
            <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-500">
              한 분 한 분께 가장 잘 어울리는 스타일을 찾아드립니다
            </p>
          </div>

          <ul className="mt-[clamp(2.25rem,5vw,3.5rem)] grid gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2 xl:grid-cols-4">
            {BEAUTY_PROMISES.map(([title, desc, Icon]) => (
              <li
                key={title}
                className="rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.45rem,2.8vw,2rem)] shadow-[0_1.5rem_3rem_rgba(15,23,42,0.06)] transition-[border-color,background-color,transform] duration-200 hover:translate-y-[1px] hover:border-neutral-300 hover:bg-neutral-50"
              >
                <span className="mb-[clamp(1.2rem,2.3vw,1.6rem)] flex size-12 items-center justify-center rounded-full bg-[#f7e4e8] text-[#c77786]">
                  <Icon size="1.1rem" aria-hidden="true" />
                </span>
                <h3 className="text-[clamp(1rem,1.7vw,1.15rem)] font-black">
                  {title}
                </h3>
                <p className="mt-4 text-[clamp(0.84rem,1.35vw,0.96rem)] font-bold leading-relaxed text-neutral-600">
                  {desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.78rem,1.3vw,0.9rem)] font-black uppercase tracking-[0.45em] text-[#c77786]">
              REVIEW
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              고객 후기
            </h2>
          </div>

          <ul className="mt-[clamp(2rem,4.5vw,3rem)] grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-3">
            {BEAUTY_REVIEWS.map((review) => (
              <li
                key={review}
                className="rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.25rem,2.5vw,1.75rem)] shadow-[0_1.4rem_3rem_rgba(15,23,42,0.05)]"
              >
                <p className="text-orange-400" aria-label="별점 5점">
                  ★★★★★
                </p>
                <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold leading-relaxed text-neutral-700">
                  “{review}”
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 pb-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black uppercase text-[#c77786]">
            RESERVATION
          </p>
          <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
            시술 예약
          </h2>
          <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-600">
            원하는 날짜와 시간대를 선택해 보세요
          </p>

          <div className="mx-auto mt-[clamp(2rem,4.5vw,3rem)] max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-[clamp(1.4rem,3vw,2rem)] text-left shadow-[0_2rem_4rem_rgba(15,23,42,0.08)]">
            <div className="mb-5 flex items-center gap-2 text-sm font-black text-[#c77786]">
              <CalendarDays size="1em" aria-hidden="true" />
              날짜
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {RESERVATION_DATES.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-black transition-[background-color,border-color,color,transform] duration-200 hover:translate-y-[1px] active:translate-y-[2px] ${
                    date === selectedDate
                      ? "border-[#cf7b8b] bg-[#cf7b8b] text-white hover:bg-[#b86677]"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>

            <div className="mb-5 mt-7 flex items-center gap-2 text-sm font-black text-[#c77786]">
              <Clock3 size="1em" aria-hidden="true" />
              시간대
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {BEAUTY_TIMES.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-black transition-[background-color,border-color,color,transform] duration-200 hover:translate-y-[1px] active:translate-y-[2px] ${
                    time === selectedTime
                      ? "border-[#cf7b8b] bg-[#cf7b8b] text-white hover:bg-[#b86677]"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsReservationOpen(true)}
              className="group mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#dfbdc5] px-5 py-4 text-sm font-black text-white transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-[#cf7b8b] hover:shadow-[0_0.55rem_1.25rem_rgba(207,123,139,0.18)] active:translate-y-[2px]"
            >
              <ArrowButtonContent>{selectedReservation} 예약하기</ArrowButtonContent>
            </button>
          </div>
        </div>
      </section>

      {isReservationOpen && (
        <ReservationCompleteModal
          selectedReservation={selectedReservation}
          onClose={() => setIsReservationOpen(false)}
          onConsult={openDiagnosisModal}
        />
      )}

      <section className="bg-neutral-950 px-4 py-[clamp(5rem,10vw,8rem)] text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-keep max-w-4xl text-[clamp(1.95rem,4.2vw,3.55rem)] font-black leading-[1.18]">
            이런 살롱 홈페이지, 만들고 싶다면
          </h2>
          <p className="text-keep mt-[clamp(1.3rem,2.8vw,2rem)] max-w-3xl text-[clamp(0.95rem,1.7vw,1.2rem)] font-bold leading-relaxed text-white/62">
            예약·시술 안내까지. 무료 진단으로 견적과 제작 방향을 안내해 드립니다.
          </p>

          <div className="mt-[clamp(1.7rem,3.5vw,2.5rem)] flex flex-wrap gap-3">
            <DiagnosisModalButton className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-[clamp(1.25rem,2.5vw,1.75rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-neutral-950 transition-[background-color,transform] duration-200 hover:translate-y-[1px] hover:bg-neutral-200 active:translate-y-[2px]">
              <ArrowButtonContent>무료 진단 신청</ArrowButtonContent>
            </DiagnosisModalButton>
            <a
              href="tel:01029717280"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/16 bg-white/5 px-[clamp(1.1rem,2.3vw,1.55rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-white transition-[background-color,transform,border-color] duration-200 hover:translate-y-[1px] hover:border-white/24 hover:bg-black/25 active:translate-y-[2px]"
            >
              <Phone size="1em" aria-hidden="true" />
              010-2971-7280
            </a>
          </div>
        </div>
      </section>

      <div className="bg-white px-4 py-[clamp(1.8rem,4vw,2.5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/cases"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.85rem,1.4vw,0.95rem)] font-bold text-neutral-700 transition-colors duration-200 hover:text-[#c77786]"
          >
            <ArrowLeft
              size="1em"
              className="transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            다른 업종 사례 보기
          </Link>

          <a
            href={blogHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.85rem,1.4vw,0.95rem)] font-bold text-[#c77786] transition-colors duration-200 hover:text-[#9d5361]"
          >
            블로그에서 실제 제작기 보기
            <ArrowRight
              size="1em"
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </article>
  );
}

function PetSuppliesCasePage({ item, blogHref }) {
  return (
    <article className="overflow-hidden bg-[#f7f7f8] text-neutral-950">
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid min-h-[4.25rem] max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            href="/cases"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.78rem,1.4vw,0.95rem)] font-bold text-neutral-600 transition-colors duration-200 hover:text-neutral-950"
          >
            <ArrowLeft
              size="1em"
              className="transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            제작 사례
          </Link>

          <p className="text-keep hidden text-center text-[clamp(0.78rem,1.3vw,0.9rem)] font-bold text-neutral-500 sm:block">
            반려동물 용품점 · 쇼핑몰 제작 예시(샘플)
          </p>

          <DiagnosisModalButton className="inline-flex cursor-pointer items-center justify-center justify-self-end rounded-xl bg-blue-600 px-4 py-2.5 text-[clamp(0.78rem,1.3vw,0.92rem)] font-black text-white shadow-[0_0.75rem_1.75rem_rgba(37,99,235,0.22)] transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-blue-800 hover:shadow-[0_0.45rem_1.1rem_rgba(37,99,235,0.18)] active:translate-y-[2px]">
            이 디자인으로 상담
          </DiagnosisModalButton>
        </div>
      </div>

      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex min-h-[2.75rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <nav className="flex min-w-0 gap-[clamp(0.85rem,2vw,1.6rem)] overflow-x-auto text-[clamp(0.72rem,1.2vw,0.85rem)] font-bold text-neutral-700">
            {PET_SUPPLIES_MENU.map((menu) => (
              <button
                key={menu}
                type="button"
                className="shrink-0 cursor-pointer transition-[color,transform] duration-200 hover:translate-y-[1px] hover:text-blue-600 active:translate-y-[2px]"
              >
                {menu}
              </button>
            ))}
          </nav>
          <span className="hidden shrink-0 rounded-full bg-orange-400 px-4 py-1.5 text-xs font-black text-neutral-950 sm:inline-flex">
            제작 예시 · 샘플 디자인
          </span>
        </div>
      </div>

      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-[clamp(1rem,2.4vw,1.45rem)] sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:px-8">
          <button
            type="button"
            className="flex w-fit cursor-pointer items-center gap-2 text-[clamp(1.35rem,2.5vw,1.75rem)] font-black text-blue-600 transition-[color,transform] duration-200 hover:translate-y-[1px] hover:text-blue-800 active:translate-y-[2px]"
          >
            <PawPrint size="1.15em" aria-hidden="true" />
            DOGGOPANG
          </button>

          <label className="group relative block cursor-pointer">
            <span className="sr-only">상품 검색</span>
            <input
              type="text"
              readOnly
              value=""
              placeholder="찾고 싶은 상품을 검색해보세요!"
              className="h-[clamp(3rem,5vw,3.6rem)] w-full cursor-pointer rounded-full border-2 border-neutral-950 bg-white px-6 pr-14 text-[clamp(0.86rem,1.45vw,1rem)] font-bold text-neutral-700 outline-none transition-[border-color,box-shadow] duration-200 group-hover:border-blue-600 group-hover:shadow-[0_0.75rem_1.8rem_rgba(37,99,235,0.1)]"
            />
            <Search
              size="1.45rem"
              className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-950 transition-colors duration-200 group-hover:text-blue-600"
              aria-hidden="true"
            />
          </label>

          <div className="flex items-center justify-end gap-4 text-neutral-950">
            <button
              type="button"
              className="cursor-pointer transition-[color,transform] duration-200 hover:translate-y-[1px] hover:text-blue-600 active:translate-y-[2px]"
              aria-label="알림"
            >
              <Bell size="1.25rem" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="relative cursor-pointer transition-[color,transform] duration-200 hover:translate-y-[1px] hover:text-blue-600 active:translate-y-[2px]"
              aria-label="장바구니"
            >
              <ShoppingCart size="1.3rem" aria-hidden="true" />
              <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-blue-600 text-[0.6rem] font-black text-white">
                0
              </span>
            </button>
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-1 text-sm font-bold text-neutral-700 transition-[color,transform] duration-200 hover:translate-y-[1px] hover:text-blue-600 active:translate-y-[2px]"
            >
              <User size="1.2rem" aria-hidden="true" />
              로그인
            </button>
          </div>
        </div>
      </header>

      <nav className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[3.4rem] min-w-0 gap-[clamp(1rem,2vw,1.8rem)] overflow-x-auto text-[clamp(0.8rem,1.25vw,0.95rem)] font-black text-neutral-950">
            {PET_SUPPLIES_CATEGORY_NAV.map((category) => (
              <button
                key={category}
                type="button"
                className="flex shrink-0 cursor-pointer items-center transition-[color,transform] duration-200 hover:translate-y-[1px] hover:text-blue-600 active:translate-y-[2px]"
              >
                {category}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="hidden shrink-0 cursor-pointer text-sm font-black text-blue-600 transition-[color,transform] duration-200 hover:translate-y-[1px] hover:text-blue-800 active:translate-y-[2px] sm:inline-flex"
          >
            포인트샵
          </button>
        </div>
      </nav>

      <section className="border-b border-neutral-200 bg-white px-4 py-[clamp(1.5rem,3.2vw,2.25rem)] sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-[1.9fr_0.9fr]">
          <button
            type="button"
            className="group relative min-h-[clamp(20rem,36vw,27rem)] cursor-pointer overflow-hidden rounded-[2rem] bg-[#005a7b] p-[clamp(1.6rem,3vw,2.3rem)] text-left text-white transition-[box-shadow,transform] duration-300 hover:translate-y-[1px] hover:shadow-[0_1.4rem_3rem_rgba(0,91,123,0.18)] active:translate-y-[2px]"
          >
            <Image
              src={item.img}
              alt={`${item.title} 쇼핑몰 메인 프로모션`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#004b69]/88 via-[#006b92]/46 to-transparent" />
            <div className="relative flex h-full min-h-[clamp(17rem,30vw,22rem)] flex-col justify-center">
              <span className="mb-4 inline-flex w-fit rounded-full bg-orange-400 px-4 py-1.5 text-xs font-black text-neutral-950">
                오늘의 할인
              </span>
              <h1 className="text-keep text-[clamp(2rem,4vw,3.2rem)] font-black leading-[1.12]">
                힐링 발효사료
                <br />
                <span className="text-orange-400">최대 70% 할인</span>
              </h1>
              <p className="mt-5 text-[clamp(0.95rem,1.6vw,1.1rem)] font-black text-white/90">
                고농축 영양 사료 기획전
              </p>
            </div>
          </button>

          <div className="grid gap-[clamp(1rem,2vw,1.5rem)]">
            {[
              ["버박 치약", "사은품 증정", "bg-neutral-100"],
              ["올바디 펫티슈 펫둥이", "저자극 반려동물 전용 티슈", "bg-blue-100"],
            ].map(([title, desc, bg]) => (
              <button
                type="button"
                key={title}
                className={`group ${bg} flex min-h-[clamp(9rem,17vw,12.5rem)] cursor-pointer flex-col justify-center rounded-[2rem] border border-neutral-200 p-[clamp(1.4rem,2.6vw,2rem)] text-left transition-[border-color,box-shadow,transform] duration-200 hover:translate-y-[1px] hover:border-blue-200 hover:shadow-[0_1.2rem_2.5rem_rgba(37,99,235,0.09)] active:translate-y-[2px]`}
              >
                <h2 className="text-[clamp(1.1rem,2vw,1.35rem)] font-black">
                  {title}
                </h2>
                <p className="mt-3 text-[clamp(0.84rem,1.35vw,0.95rem)] font-bold text-neutral-600">
                  {desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-black text-blue-600">
                  자세히 보기
                  <ArrowRight
                    size="1em"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-white px-4 py-[clamp(1.4rem,3vw,2rem)] sm:px-6 lg:px-8">
        <ul className="mx-auto grid max-w-7xl grid-cols-5 gap-4 lg:grid-cols-10">
          {PET_SUPPLIES_ICONS.map(([label, Icon]) => (
            <li key={label} className="flex flex-col items-center gap-3 text-center">
              <button
                type="button"
                className="group flex cursor-pointer flex-col items-center gap-3 text-center transition-transform duration-200 hover:translate-y-[1px] active:translate-y-[2px]"
              >
                <span className="flex size-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-blue-600 shadow-[0_0.6rem_1.4rem_rgba(15,23,42,0.04)] transition-[background-color,border-color,box-shadow] duration-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:shadow-[0_0.9rem_1.7rem_rgba(37,99,235,0.1)]">
                  <Icon size="1.1rem" aria-hidden="true" />
                </span>
                <span className="text-[clamp(0.68rem,1.1vw,0.78rem)] font-bold text-neutral-700 transition-colors duration-200 group-hover:text-blue-600">
                  {label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white px-4 py-[clamp(4rem,8vw,6.5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-[clamp(1.25rem,2.4vw,1.7rem)] font-black">
              베스트 상품
            </h2>
            <button
              type="button"
              className="cursor-pointer text-sm font-bold text-neutral-500 transition-[color,transform] duration-200 hover:translate-y-[1px] hover:text-blue-600 active:translate-y-[2px]"
            >
              더보기 +
            </button>
          </div>

          <ul className="mt-[clamp(2rem,4vw,3rem)] grid gap-x-[clamp(1rem,2vw,1.5rem)] gap-y-[clamp(2rem,4vw,3rem)] sm:grid-cols-2 xl:grid-cols-4">
            {PET_SUPPLIES_PRODUCTS.map((product) => (
              <li key={product.name} className="group">
                <div
                  className={`relative flex aspect-square cursor-pointer overflow-hidden rounded-[1.35rem] transition-[box-shadow,transform] duration-300 hover:translate-y-[1px] hover:shadow-[0_1.1rem_2.4rem_rgba(15,23,42,0.1)] active:translate-y-[2px] ${
                    product.tone === "pink"
                      ? "bg-[#ffdfe7]"
                      : product.tone === "blue"
                        ? "bg-[#82dce8]"
                        : product.tone === "cream"
                          ? "bg-[#f8ead1]"
                          : product.tone === "sky"
                            ? "bg-[#ddecfb]"
                            : "bg-neutral-100"
                  }`}
                >
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center px-5 text-center text-[clamp(0.95rem,1.7vw,1.1rem)] font-black text-neutral-700">
                      {product.visual === "bone" ? (
                        <div className="grid grid-cols-3 gap-5 text-[#b06d45]">
                          {Array.from({ length: 9 }).map((_, index) => (
                            <Bone key={index} size="1.4rem" aria-hidden="true" />
                          ))}
                        </div>
                      ) : product.visual === "toy" ? (
                        <Bone size="5rem" className="text-red-500" aria-hidden="true" />
                      ) : (
                        product.name
                      )}
                    </div>
                  )}
                  {product.badge && (
                    <span
                      className={`absolute left-3 top-3 rounded px-2.5 py-1 text-[0.65rem] font-black ${
                        product.badge === "BEST"
                          ? "bg-blue-600 text-white"
                          : "bg-orange-400 text-neutral-950"
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 cursor-pointer text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-700 transition-colors duration-200 hover:text-blue-600">
                  {product.name}
                </h3>
                <p className="mt-2 text-[clamp(1rem,1.8vw,1.18rem)] font-black text-neutral-950">
                  <span className={product.original ? "text-blue-600" : ""}>
                    {product.price}
                  </span>
                  {product.original && (
                    <span className="ml-2 text-sm font-bold text-neutral-400 line-through">
                      {product.original}
                    </span>
                  )}
                </p>

                <button
                  type="button"
                  className={`mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-black transition-[background-color,border-color,color,transform] duration-200 hover:translate-y-[1px] active:translate-y-[2px] ${
                    product.active
                      ? "border-blue-600 bg-blue-50 text-blue-600 hover:bg-blue-100"
                      : "border-neutral-200 bg-white text-neutral-950 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <ShoppingCart size="1em" aria-hidden="true" />
                  담기
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-[clamp(1.45rem,3vw,2rem)] font-black">
            구매 후기
          </h2>

          <ul className="mt-[clamp(2rem,4.5vw,3rem)] grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-3">
            {PET_SUPPLIES_REVIEWS.map((review) => (
              <li
                key={review}
                className="rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.25rem,2.5vw,1.75rem)] shadow-[0_1.4rem_3rem_rgba(15,23,42,0.05)]"
              >
                <p className="text-orange-400" aria-label="별점 5점">
                  ★★★★★
                </p>
                <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold leading-relaxed text-neutral-700">
                  “{review}”
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-7 text-center text-xs font-semibold text-neutral-500">
            ※ 표기된 브랜드 · 상품 · 가격은 제작 예시용 샘플이며 실제와 다릅니다.
          </p>
        </div>
      </section>

      <section className="bg-neutral-950 px-4 py-[clamp(5rem,10vw,8rem)] text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-keep max-w-4xl text-[clamp(2.1rem,4.5vw,3.8rem)] font-black leading-[1.15]">
            이런 쇼핑몰, 우리 브랜드로
            <br />
            만들고 싶다면
          </h2>
          <p className="text-keep mt-[clamp(1.3rem,2.8vw,2rem)] max-w-3xl text-[clamp(0.95rem,1.7vw,1.2rem)] font-bold leading-relaxed text-white/62">
            상품 등록부터 결제 · 배송 연동까지. 무료 진단으로 견적과 제작 방향을 안내해 드립니다.
          </p>

          <div className="mt-[clamp(1.7rem,3.5vw,2.5rem)] flex flex-wrap gap-3">
            <DiagnosisModalButton className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-[clamp(1.25rem,2.5vw,1.75rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-neutral-950 transition-[background-color,transform] duration-200 hover:translate-y-[1px] hover:bg-neutral-200 active:translate-y-[2px]">
              <ArrowButtonContent>무료 진단 신청</ArrowButtonContent>
            </DiagnosisModalButton>
            <a
              href="tel:01029717280"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/16 bg-white/5 px-[clamp(1.1rem,2.3vw,1.55rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-white transition-[background-color,transform,border-color] duration-200 hover:translate-y-[1px] hover:border-white/24 hover:bg-black/25 active:translate-y-[2px]"
            >
              <Phone size="1em" aria-hidden="true" />
              010-2971-7280
            </a>
          </div>
        </div>
      </section>

      <div className="bg-white px-4 py-[clamp(1.8rem,4vw,2.5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/cases"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.85rem,1.4vw,0.95rem)] font-bold text-neutral-700 transition-colors duration-200 hover:text-blue-600"
          >
            <ArrowLeft
              size="1em"
              className="transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            다른 업종 사례 보기
          </Link>

          <a
            href={blogHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.85rem,1.4vw,0.95rem)] font-bold text-blue-600 transition-colors duration-200 hover:text-blue-800"
          >
            블로그에서 실제 제작기 보기
            <ArrowRight
              size="1em"
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </article>
  );
}

function StudyCafeCasePage({
  item,
  blogHref,
  selectedDate,
  selectedTime,
  selectedReservation,
  setSelectedDate,
  setSelectedTime,
  isReservationOpen,
  setIsReservationOpen,
  openDiagnosisModal,
}) {
  return (
    <article className="overflow-hidden bg-[#f3f3f4] text-neutral-950">
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid min-h-[4.25rem] max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            href="/cases"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.78rem,1.4vw,0.95rem)] font-bold text-neutral-600 transition-colors duration-200 hover:text-neutral-950"
          >
            <ArrowLeft
              size="1em"
              className="transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            제작 사례
          </Link>

          <p className="text-keep hidden text-center text-[clamp(0.78rem,1.3vw,0.9rem)] font-bold text-neutral-500 sm:block">
            스터디카페 · 홈페이지 제작 예시(샘플)
          </p>

          <DiagnosisModalButton className="inline-flex cursor-pointer items-center justify-center justify-self-end rounded-xl bg-blue-600 px-4 py-2.5 text-[clamp(0.78rem,1.3vw,0.92rem)] font-black text-white shadow-[0_0.75rem_1.75rem_rgba(37,99,235,0.22)] transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-blue-800 hover:shadow-[0_0.45rem_1.1rem_rgba(37,99,235,0.18)] active:translate-y-[2px]">
            이 디자인으로 상담
          </DiagnosisModalButton>
        </div>
      </div>

      <section className="relative min-h-[clamp(42rem,63vw,52rem)] overflow-hidden bg-[#142c4c] px-4 py-[clamp(2rem,4vw,2.75rem)] text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.08),transparent_34%),linear-gradient(120deg,#152f52_0%,#142b4a_50%,#263745_100%)]" />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="text-[clamp(1.1rem,2vw,1.45rem)] font-black uppercase tracking-[0.24em]">
            JIPJUNG
          </div>

          <nav className="hidden items-center gap-[clamp(1.5rem,3vw,2.8rem)] text-[clamp(0.8rem,1.25vw,0.95rem)] font-bold text-white/78 lg:flex">
            {["브랜드 소개", "시그니처 공간", "이용 안내", "요금제", "예약"].map((navItem) => (
              <span key={navItem}>{navItem}</span>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsReservationOpen(true)}
            className="hidden cursor-pointer rounded-xl bg-[#d8ad18] px-5 py-2.5 text-sm font-black text-[#142c4c] transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-[#c09812] hover:shadow-[0_0.55rem_1.25rem_rgba(216,173,24,0.18)] active:translate-y-[2px] sm:inline-flex"
          >
            예약 문의
          </button>
        </div>

        <div className="relative mx-auto flex min-h-[clamp(34rem,54vw,43rem)] max-w-7xl flex-col items-center justify-center text-center">
          <p className="mb-[clamp(1.2rem,2.4vw,1.8rem)] text-[clamp(0.72rem,1.15vw,0.9rem)] font-black uppercase tracking-[0.48em] text-[#d8ad18]">
            THE PREMIUM STUDY CAFE
          </p>
          <h1 className="text-keep text-[clamp(3.5rem,8vw,7rem)] font-black leading-none tracking-[-0.03em]">
            스터디카페
          </h1>
          <p className="text-keep mt-[clamp(1.4rem,2.8vw,2rem)] max-w-3xl text-[clamp(1rem,1.8vw,1.25rem)] font-bold leading-relaxed text-white/74">
            마음먹은 것을 실천하는 공간. 완벽한 방음과 프리미엄 좌석에서
            <br className="hidden sm:block" />
            가장 깊이 몰입하는 시간을 경험하세요.
          </p>

          <div className="mt-[clamp(1.8rem,3.6vw,2.6rem)] flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsReservationOpen(true)}
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#d8ad18] px-[clamp(1.4rem,2.8vw,2.2rem)] py-[clamp(0.95rem,1.8vw,1.2rem)] text-[clamp(0.9rem,1.45vw,1rem)] font-black text-[#142c4c] transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-[#c09812] hover:shadow-[0_0.55rem_1.25rem_rgba(216,173,24,0.18)] active:translate-y-[2px]"
            >
              <ArrowButtonContent>좌석 예약하기</ArrowButtonContent>
            </button>
            <a
              href="tel:01029717280"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/22 bg-white/5 px-[clamp(1.15rem,2.4vw,1.7rem)] py-[clamp(0.95rem,1.8vw,1.2rem)] text-[clamp(0.9rem,1.45vw,1rem)] font-black text-white transition-[background-color,transform,border-color] duration-200 hover:translate-y-[1px] hover:border-white/32 hover:bg-black/16 active:translate-y-[2px]"
            >
              <Phone size="1em" aria-hidden="true" />
              010-2971-7280
            </a>
          </div>

          <span className="mt-[clamp(1.3rem,2.6vw,1.9rem)] inline-flex rounded-full bg-white/12 px-3 py-1.5 text-xs font-black text-white/78 backdrop-blur">
            제작 예시 · 샘플 디자인
          </span>
        </div>

        <div className="absolute bottom-6 right-5 flex flex-col items-center gap-3 sm:right-8">
          <Link
            href="/reservation"
            className="flex size-16 cursor-pointer items-center justify-center rounded-full bg-[#d8ad18] text-center text-xs font-black leading-tight text-[#142c4c] shadow-[0_0.9rem_1.8rem_rgba(0,0,0,0.18)] transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-[#c09812] hover:shadow-[0_0.55rem_1.25rem_rgba(0,0,0,0.16)] active:translate-y-[2px]"
          >
            무료
            <br />
            체험
          </Link>
          <button
            type="button"
            className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-blue-900/65 text-white transition-[background-color,transform] duration-200 hover:translate-y-[1px] hover:bg-blue-800 active:translate-y-[2px]"
            aria-label="상단으로 이동 예시 버튼"
          >
            <ChevronUp size="1.1rem" aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className="bg-white px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
              공간 소개
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              이런 공간을 제공합니다
            </h2>
          </div>

          <ul className="mt-[clamp(2.25rem,5vw,3.5rem)] grid gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2 xl:grid-cols-4">
            {STUDY_CAFE_FEATURES.map(([title, desc, Icon]) => (
              <li
                key={title}
                className="rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.45rem,2.8vw,2rem)] shadow-[0_1.5rem_3rem_rgba(15,23,42,0.06)] transition-[border-color,background-color,transform] duration-200 hover:translate-y-[1px] hover:border-blue-100 hover:bg-blue-50/30"
              >
                <span className="mb-[clamp(1.2rem,2.3vw,1.6rem)] flex size-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Icon size="1.1rem" aria-hidden="true" />
                </span>
                <h3 className="text-[clamp(1rem,1.7vw,1.15rem)] font-black">
                  {title}
                </h3>
                <p className="mt-4 text-[clamp(0.84rem,1.35vw,0.96rem)] font-bold leading-relaxed text-neutral-600">
                  {desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.78rem,1.3vw,0.9rem)] font-black uppercase tracking-[0.45em] text-[#d8ad18]">
              SIGNATURE SPACE
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              시그니처 공간
            </h2>
            <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-500">
              목적에 맞게 분리된 6가지 프리미엄 공간
            </p>
          </div>

          <ul className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-3">
            {STUDY_CAFE_SPACES.map(([title, desc, label, Icon]) => (
              <li
                key={title}
                className="relative rounded-[1.75rem] bg-[#142c4c] p-[clamp(1.5rem,3vw,2rem)] text-white shadow-[0_1.6rem_3rem_rgba(20,44,76,0.1)] transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-[#18375f] hover:shadow-[0_1.1rem_2.2rem_rgba(20,44,76,0.14)]"
              >
                <span className="mb-[clamp(1.8rem,3.5vw,2.5rem)] flex size-12 items-center justify-center rounded-full bg-blue-900/55 text-[#d8ad18]">
                  <Icon size="1.1rem" aria-hidden="true" />
                </span>
                <span className="absolute right-8 top-9 text-[0.72rem] font-black uppercase tracking-[0.45em] text-[#d8ad18]">
                  {label}
                </span>
                <h3 className="text-[clamp(1.1rem,1.9vw,1.35rem)] font-black">
                  {title}
                </h3>
                <p className="mt-3 text-[clamp(0.88rem,1.4vw,1rem)] font-bold text-white/66">
                  {desc}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-7 text-center text-xs font-semibold text-neutral-500">
            ※ 공간 구성은 제작 예시이며 실제 매장과 다릅니다.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
              요금 안내
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              합리적인 이용 요금
            </h2>
          </div>

          <ul className="mt-[clamp(2.4rem,5vw,3.75rem)] grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-3">
            {STUDY_CAFE_PRICES.map(([title, price, unit, desc, featured]) => (
              <li
                key={title}
                className={`relative rounded-[1.75rem] border p-[clamp(1.6rem,3vw,2rem)] shadow-[0_1.5rem_3rem_rgba(15,23,42,0.05)] ${
                  featured
                    ? "border-blue-500 bg-blue-100"
                    : "border-neutral-200 bg-white"
                }`}
              >
                {featured && (
                  <span className="mb-5 inline-flex rounded-full bg-blue-600 px-3 py-1 text-xs font-black text-white">
                    ★ 인기
                  </span>
                )}
                <h3 className="text-[clamp(1rem,1.7vw,1.15rem)] font-black">
                  {title}
                </h3>
                <p className="mt-5 text-[clamp(1.5rem,3vw,2rem)] font-black text-blue-600">
                  {price}
                  <span className="ml-1 text-sm font-bold text-neutral-500">
                    / {unit}
                  </span>
                </p>
                <p className="mt-5 text-[clamp(0.86rem,1.35vw,0.96rem)] font-bold text-neutral-600">
                  {desc}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-7 text-center text-xs font-semibold text-neutral-500">
            ※ 표기된 공간명 · 요금은 제작 예시용 샘플이며 실제와 다릅니다.
          </p>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
              이용 후기
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              이용자 후기
            </h2>
          </div>

          <ul className="mt-[clamp(2rem,4.5vw,3rem)] grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-3">
            {STUDY_CAFE_REVIEWS.map((review) => (
              <li
                key={review}
                className="rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.25rem,2.5vw,1.75rem)] shadow-[0_1.4rem_3rem_rgba(15,23,42,0.05)]"
              >
                <p className="text-orange-400" aria-label="별점 5점">
                  ★★★★★
                </p>
                <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold leading-relaxed text-neutral-700">
                  “{review}”
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 pb-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black uppercase text-[#d8ad18]">
            RESERVATION
          </p>
          <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
            좌석 예약
          </h2>
          <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-600">
            원하는 날짜와 이용 시간을 선택해 보세요
          </p>

          <div className="mx-auto mt-[clamp(2rem,4.5vw,3rem)] max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-[clamp(1.4rem,3vw,2rem)] text-left shadow-[0_2rem_4rem_rgba(15,23,42,0.08)]">
            <div className="mb-5 flex items-center gap-2 text-sm font-black text-[#d8ad18]">
              <CalendarDays size="1em" aria-hidden="true" />
              날짜
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {RESERVATION_DATES.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-black transition-[background-color,border-color,color,transform] duration-200 hover:translate-y-[1px] active:translate-y-[2px] ${
                    date === selectedDate
                      ? "border-[#d8ad18] bg-[#d8ad18] text-[#142c4c] hover:bg-[#c09812]"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>

            <div className="mb-5 mt-7 flex items-center gap-2 text-sm font-black text-[#d8ad18]">
              <Clock3 size="1em" aria-hidden="true" />
              이용 시간
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {STUDY_CAFE_TIMES.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-black transition-[background-color,border-color,color,transform] duration-200 hover:translate-y-[1px] active:translate-y-[2px] ${
                    time === selectedTime
                      ? "border-[#d8ad18] bg-[#d8ad18] text-[#142c4c] hover:bg-[#c09812]"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsReservationOpen(true)}
              className="group mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#e4d396] px-5 py-4 text-sm font-black text-white transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-[#d8ad18] hover:shadow-[0_0.55rem_1.25rem_rgba(216,173,24,0.18)] active:translate-y-[2px]"
            >
              <ArrowButtonContent>{selectedReservation} 예약하기</ArrowButtonContent>
            </button>
          </div>
        </div>
      </section>

      {isReservationOpen && (
        <ReservationCompleteModal
          selectedReservation={selectedReservation}
          onClose={() => setIsReservationOpen(false)}
          onConsult={openDiagnosisModal}
        />
      )}

      <section className="bg-neutral-950 px-4 py-[clamp(5rem,10vw,8rem)] text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-keep max-w-4xl text-[clamp(1.95rem,4.2vw,3.55rem)] font-black leading-[1.18]">
            이런 스터디카페 홈페이지, 만들고 싶다면
          </h2>
          <p className="text-keep mt-[clamp(1.3rem,2.8vw,2rem)] max-w-3xl text-[clamp(0.95rem,1.7vw,1.2rem)] font-bold leading-relaxed text-white/62">
            좌석 예약 · 요금제 안내까지. 무료 진단으로 견적과 제작 방향을 안내해 드립니다.
          </p>

          <div className="mt-[clamp(1.7rem,3.5vw,2.5rem)] flex flex-wrap gap-3">
            <DiagnosisModalButton className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-[clamp(1.25rem,2.5vw,1.75rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-neutral-950 transition-[background-color,transform] duration-200 hover:translate-y-[1px] hover:bg-neutral-200 active:translate-y-[2px]">
              <ArrowButtonContent>무료 진단 신청</ArrowButtonContent>
            </DiagnosisModalButton>
            <a
              href="tel:01029717280"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/16 bg-white/5 px-[clamp(1.1rem,2.3vw,1.55rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-white transition-[background-color,transform,border-color] duration-200 hover:translate-y-[1px] hover:border-white/24 hover:bg-black/25 active:translate-y-[2px]"
            >
              <Phone size="1em" aria-hidden="true" />
              010-2971-7280
            </a>
          </div>
        </div>
      </section>

      <div className="bg-white px-4 py-[clamp(1.8rem,4vw,2.5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/cases"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.85rem,1.4vw,0.95rem)] font-bold text-neutral-700 transition-colors duration-200 hover:text-blue-600"
          >
            <ArrowLeft
              size="1em"
              className="transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            다른 업종 사례 보기
          </Link>

          <a
            href={blogHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.85rem,1.4vw,0.95rem)] font-bold text-blue-600 transition-colors duration-200 hover:text-blue-800"
          >
            블로그에서 실제 제작기 보기
            <ArrowRight
              size="1em"
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </article>
  );
}

function EducationCasePage({
  item,
  blogHref,
  selectedDate,
  selectedTime,
  selectedReservation,
  setSelectedDate,
  setSelectedTime,
  isReservationOpen,
  setIsReservationOpen,
  openDiagnosisModal,
}) {
  const content = EDUCATION_CASE_CONTENT[item.title] || EDUCATION_CASE_CONTENT.영어학원;
  const reviews = [
    "문의 버튼 위치 바꾸고 상담 문의가 확실히 늘었어요.",
    "처음엔 반신반의했는데 랜딩 페이지 만들고 나서 일주일 만에 상담 전화 3건이 왔어요.",
    "디자인이 너무 예뻐서 주변 원장님들한테 소개해드렸어요. 진짜 퀄리티 대박.",
  ];

  return (
    <article className="overflow-hidden bg-[#f3f3f4] text-neutral-950">
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid min-h-[4.25rem] max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            href="/cases"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.78rem,1.4vw,0.95rem)] font-bold text-neutral-600 transition-colors duration-200 hover:text-neutral-950"
          >
            <ArrowLeft
              size="1em"
              className="transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            제작 사례
          </Link>

          <p className="text-keep hidden text-center text-[clamp(0.78rem,1.3vw,0.9rem)] font-bold text-neutral-500 sm:block">
            {item.title} · 홈페이지 제작 예시(샘플)
          </p>

          <DiagnosisModalButton className="inline-flex cursor-pointer items-center justify-center justify-self-end rounded-xl bg-blue-600 px-4 py-2.5 text-[clamp(0.78rem,1.3vw,0.92rem)] font-black text-white shadow-[0_0.75rem_1.75rem_rgba(37,99,235,0.22)] transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-blue-800 hover:shadow-[0_0.45rem_1.1rem_rgba(37,99,235,0.18)] active:translate-y-[2px]">
            이 디자인으로 상담
          </DiagnosisModalButton>
        </div>
      </div>

      <section className="relative overflow-hidden bg-[#155f58] text-white">
        <Image
          src={item.img}
          alt={`${item.title} 교육 홈페이지 예시`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#155f58]/82" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#155f58]/92 via-[#155f58]/78 to-[#244a36]/68" />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-[clamp(1.2rem,2.6vw,1.8rem)] sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-[clamp(1rem,1.8vw,1.2rem)] font-black">
            <BookOpen size="1em" className="text-[#e0ad2e]" aria-hidden="true" />
            {content.brand}
          </div>

          <nav className="hidden items-center gap-[clamp(1.4rem,3vw,2.8rem)] text-[clamp(0.8rem,1.25vw,0.95rem)] font-bold text-white/86 md:flex">
            {content.nav.map((navItem) => (
              <span key={navItem}>{navItem}</span>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsReservationOpen(true)}
            className="hidden cursor-pointer rounded-full bg-[#e0ad2e] px-5 py-2.5 text-sm font-black text-[#153f3b] transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-[#c99725] hover:shadow-[0_0.55rem_1.25rem_rgba(224,173,46,0.16)] active:translate-y-[2px] sm:inline-flex"
          >
            상담 신청
          </button>
        </div>

        <div className="relative mx-auto flex min-h-[clamp(36rem,58vw,46rem)] max-w-7xl flex-col justify-center px-4 pb-[clamp(6rem,10vw,8rem)] pt-[clamp(4rem,8vw,7rem)] sm:px-6 lg:px-8">
          <p className="mb-[clamp(1.2rem,2.4vw,1.8rem)] text-[clamp(0.72rem,1.15vw,0.9rem)] font-black uppercase tracking-[0.45em] text-[#e0ad2e]">
            {content.eyebrow}
          </p>
          <h1 className="text-keep max-w-4xl whitespace-pre-line text-[clamp(3.1rem,7vw,6.7rem)] font-black leading-[1.02] tracking-[-0.04em]">
            {content.heroTitle}
          </h1>
          <p className="mt-[clamp(1.4rem,2.8vw,2rem)] max-w-3xl text-[clamp(1rem,1.85vw,1.25rem)] font-bold leading-relaxed text-white/78">
            {content.heroDescription}
          </p>

          <div className="mt-[clamp(1.8rem,3.6vw,2.6rem)] flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setIsReservationOpen(true)}
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#e0ad2e] px-[clamp(1.4rem,2.8vw,2.2rem)] py-[clamp(0.95rem,1.8vw,1.2rem)] text-[clamp(0.9rem,1.45vw,1rem)] font-black text-[#153f3b] transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-[#c99725] hover:shadow-[0_0.55rem_1.25rem_rgba(224,173,46,0.16)] active:translate-y-[2px]"
            >
              <ArrowButtonContent>입학 상담 신청</ArrowButtonContent>
            </button>
            <a
              href="tel:01029717280"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/24 bg-white/7 px-[clamp(1.15rem,2.4vw,1.7rem)] py-[clamp(0.95rem,1.8vw,1.2rem)] text-[clamp(0.9rem,1.45vw,1rem)] font-black text-white transition-[background-color,transform,border-color] duration-200 hover:translate-y-[1px] hover:border-white/34 hover:bg-black/16 active:translate-y-[2px]"
            >
              <Phone size="1em" aria-hidden="true" />
              010-2971-7280
            </a>
          </div>

          <span className="mt-[clamp(1.3rem,2.6vw,1.9rem)] inline-flex w-fit rounded-full bg-white/12 px-3 py-1.5 text-xs font-black text-white/78 backdrop-blur">
            제작 예시 · 샘플 디자인
          </span>
        </div>

        <ul className="relative grid border-t border-white/12 bg-[#0f3f3a]/80 sm:grid-cols-2 lg:grid-cols-4">
          {content.stats.map(([title, desc, Icon]) => (
            <li
              key={title}
              className="flex min-h-[7.25rem] flex-col items-center justify-center border-b border-white/10 px-4 py-5 text-center last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0"
            >
              <Icon size="1.15rem" className="mb-3 text-[#e0ad2e]" aria-hidden="true" />
              <h3 className="text-[clamp(1rem,1.7vw,1.2rem)] font-black">{title}</h3>
              <p className="mt-2 text-xs font-bold text-white/62">{desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.78rem,1.3vw,0.9rem)] font-black uppercase text-[#1f6f67]">
              CURRICULUM
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              단계별 커리큘럼
            </h2>
            <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-500">
              {content.curriculumSubtitle}
            </p>
          </div>

          <ul className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-3">
            {content.curriculum.map(([label, title, level, desc, items, featured]) => (
              <li
                key={title}
                className={`relative rounded-[1.75rem] border p-[clamp(1.6rem,3vw,2rem)] shadow-[0_1.5rem_3rem_rgba(15,23,42,0.05)] ${
                  featured
                    ? "border-[#1f6f67] bg-[#1f6f67] text-white"
                    : "border-neutral-200 bg-white text-neutral-950"
                }`}
              >
                {featured && (
                  <span className="absolute right-7 top-7 rounded-full bg-[#e0ad2e] px-3 py-1 text-xs font-black text-[#153f3b]">
                    ★ 인기 과정
                  </span>
                )}
                <p className={`text-[0.75rem] font-black uppercase tracking-[0.45em] ${featured ? "text-[#e0ad2e]" : "text-[#1f6f67]"}`}>
                  {label}
                </p>
                <h3 className="mt-6 text-[clamp(1.2rem,2.1vw,1.45rem)] font-black">
                  {title}
                </h3>
                <p className={`mt-2 text-sm font-bold ${featured ? "text-white/72" : "text-neutral-500"}`}>
                  {level}
                </p>
                <p className={`mt-6 text-[clamp(0.9rem,1.45vw,1rem)] font-bold leading-relaxed ${featured ? "text-white/78" : "text-neutral-600"}`}>
                  {desc}
                </p>
                <ul className="mt-7 grid gap-3">
                  {items.map((itemText) => (
                    <li key={itemText} className="flex items-center gap-3 text-sm font-black">
                      <ArrowRight size="1em" className={featured ? "text-[#e0ad2e]" : "text-[#1f6f67]"} aria-hidden="true" />
                      {itemText}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="mt-7 text-center text-xs font-semibold text-neutral-500">
            ※ 표기된 과정명 · 구성은 제작 예시용 샘플이며 실제와 다릅니다.
          </p>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.78rem,1.3vw,0.9rem)] font-black uppercase text-[#1f6f67]">
              CAMPUS
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              학습 공간 둘러보기
            </h2>
            <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-500">
              {content.campusSubtitle}
            </p>
          </div>

          <div className="mt-[clamp(2.4rem,5vw,3.75rem)] grid gap-[clamp(1rem,2.4vw,1.6rem)] lg:grid-cols-2">
            {content.campus.map(([src, label]) => (
              <div
                key={label}
                className="relative min-h-[clamp(18rem,35vw,28rem)] overflow-hidden rounded-[2rem] bg-neutral-300 shadow-[0_1.7rem_3.5rem_rgba(15,23,42,0.08)]"
              >
                <Image src={src} alt={`${item.title} ${label}`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 text-lg font-black text-white">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.78rem,1.3vw,0.9rem)] font-black uppercase text-[#1f6f67]">
              WHY THE BRIDGE
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              {content.whyTitle}
            </h2>
          </div>

          <ul className="mt-[clamp(2.25rem,5vw,3.5rem)] grid gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2 xl:grid-cols-4">
            {content.why.map(([title, desc, Icon]) => (
              <li
                key={title}
                className="rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.45rem,2.8vw,2rem)] shadow-[0_1.5rem_3rem_rgba(15,23,42,0.06)] transition-[border-color,background-color,transform] duration-200 hover:translate-y-[1px] hover:border-[#1f6f67]/20 hover:bg-white"
              >
                <span className="mb-[clamp(1.2rem,2.3vw,1.6rem)] flex size-12 items-center justify-center rounded-full bg-[#1f6f67] text-white">
                  <Icon size="1.1rem" aria-hidden="true" />
                </span>
                <h3 className="text-[clamp(1rem,1.7vw,1.15rem)] font-black">{title}</h3>
                <p className="mt-4 text-[clamp(0.84rem,1.35vw,0.96rem)] font-bold leading-relaxed text-neutral-600">
                  {desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-[clamp(0.78rem,1.3vw,0.9rem)] font-black uppercase text-[#1f6f67]">
              TEACHERS
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              강사진 소개
            </h2>
            <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-500">
              담임제로 한 명의 학생을 끝까지 책임집니다
            </p>
          </div>

          <ul className="mt-[clamp(2.4rem,5vw,3.75rem)] grid gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-3">
            {content.teachers.map(([initial, name, desc, tag]) => (
              <li key={name} className="rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.45rem,2.8vw,2rem)] text-center shadow-[0_1.5rem_3rem_rgba(15,23,42,0.05)]">
                <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#1f6f67] text-[1.5rem] font-black text-white">
                  {initial}
                </span>
                <span className="mt-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-[#1f6f67]">
                  {tag}
                </span>
                <h3 className="mt-4 text-[clamp(1rem,1.7vw,1.15rem)] font-black">{name}</h3>
                <p className="mt-4 text-sm font-bold text-neutral-500">{desc}</p>
              </li>
            ))}
          </ul>
          <p className="mt-7 text-center text-xs font-semibold text-neutral-500">
            ※ 강사 정보는 제작 예시용 샘플이며 실제와 다릅니다.
          </p>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.78rem,1.3vw,0.9rem)] font-black uppercase text-[#1f6f67]">
              REVIEWS
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              학부모 후기
            </h2>
          </div>

          <ul className="mt-[clamp(2rem,4.5vw,3rem)] grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-3">
            {reviews.map((review) => (
              <li key={review} className="rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.25rem,2.5vw,1.75rem)] shadow-[0_1.4rem_3rem_rgba(15,23,42,0.05)]">
                <p className="text-orange-400" aria-label="별점 5점">★★★★★</p>
                <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold leading-relaxed text-neutral-700">
                  “{review}”
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 pb-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black uppercase text-[#1f6f67]">
            RESERVATION
          </p>
          <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
            {content.reservationTitle}
          </h2>
          <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-600">
            {content.reservationSubtitle}
          </p>

          <div className="mx-auto mt-[clamp(2rem,4.5vw,3rem)] max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-[clamp(1.4rem,3vw,2rem)] text-left shadow-[0_2rem_4rem_rgba(15,23,42,0.08)]">
            <div className="mb-5 flex items-center gap-2 text-sm font-black text-[#1f6f67]">
              <CalendarDays size="1em" aria-hidden="true" />
              날짜
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {RESERVATION_DATES.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-black transition-[background-color,border-color,color,transform] duration-200 hover:translate-y-[1px] active:translate-y-[2px] ${
                    date === selectedDate
                      ? "border-[#1f6f67] bg-[#1f6f67] text-white hover:bg-[#185951]"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>

            <div className="mb-5 mt-7 flex items-center gap-2 text-sm font-black text-[#1f6f67]">
              <Clock3 size="1em" aria-hidden="true" />
              상담 시간
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {EDUCATION_TIMES.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-black transition-[background-color,border-color,color,transform] duration-200 hover:translate-y-[1px] active:translate-y-[2px] ${
                    time === selectedTime
                      ? "border-[#1f6f67] bg-[#1f6f67] text-white hover:bg-[#185951]"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsReservationOpen(true)}
              className="group mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#1f6f67] px-5 py-4 text-sm font-black text-white transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-[#185951] hover:shadow-[0_0.55rem_1.25rem_rgba(31,111,103,0.18)] active:translate-y-[2px]"
            >
              <ArrowButtonContent>{selectedReservation} 예약하기</ArrowButtonContent>
            </button>
          </div>
        </div>
      </section>

      {isReservationOpen && (
        <ReservationCompleteModal
          selectedReservation={selectedReservation}
          onClose={() => setIsReservationOpen(false)}
          onConsult={openDiagnosisModal}
        />
      )}

      <section className="bg-neutral-950 px-4 py-[clamp(5rem,10vw,8rem)] text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-keep max-w-4xl text-[clamp(1.95rem,4.2vw,3.55rem)] font-black leading-[1.18]">
            {content.bottomTitle}
          </h2>
          <p className="text-keep mt-[clamp(1.3rem,2.8vw,2rem)] max-w-3xl text-[clamp(0.95rem,1.7vw,1.2rem)] font-bold leading-relaxed text-white/62">
            {content.bottomDesc}
          </p>

          <div className="mt-[clamp(1.7rem,3.5vw,2.5rem)] flex flex-wrap gap-3">
            <DiagnosisModalButton className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-[clamp(1.25rem,2.5vw,1.75rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-neutral-950 transition-[background-color,transform] duration-200 hover:translate-y-[1px] hover:bg-neutral-200 active:translate-y-[2px]">
              <ArrowButtonContent>무료 진단 신청</ArrowButtonContent>
            </DiagnosisModalButton>
            <a
              href="tel:01029717280"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/16 bg-white/5 px-[clamp(1.1rem,2.3vw,1.55rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-white transition-[background-color,transform,border-color] duration-200 hover:translate-y-[1px] hover:border-white/24 hover:bg-black/25 active:translate-y-[2px]"
            >
              <Phone size="1em" aria-hidden="true" />
              010-2971-7280
            </a>
          </div>
        </div>
      </section>

      <div className="bg-white px-4 py-[clamp(1.8rem,4vw,2.5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/cases"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.85rem,1.4vw,0.95rem)] font-bold text-neutral-700 transition-colors duration-200 hover:text-[#1f6f67]"
          >
            <ArrowLeft
              size="1em"
              className="transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            다른 업종 사례 보기
          </Link>

          <a
            href={blogHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.85rem,1.4vw,0.95rem)] font-bold text-[#1f6f67] transition-colors duration-200 hover:text-[#185951]"
          >
            블로그에서 실제 제작기 보기
            <ArrowRight
              size="1em"
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </article>
  );
}

function LifeServiceCasePage({
  item,
  blogHref,
  selectedDate,
  selectedTime,
  selectedReservation,
  setSelectedDate,
  setSelectedTime,
  isReservationOpen,
  setIsReservationOpen,
  openDiagnosisModal,
}) {
  const content =
    LIFE_SERVICE_CASE_CONTENT[item.title] || LIFE_SERVICE_CASE_CONTENT.청소업체;
  const reviews = [
    "문의 버튼 위치 바꾸고 상담 문의가 확실히 늘었어요.",
    "처음엔 반신반의했는데 랜딩 페이지 만들고 나서 일주일 만에 상담 전화 3건이 왔어요.",
    "디자인이 너무 예뻐서 주변 원장님들한테 소개해드렸어요. 진짜 퀄리티 대박.",
  ];

  return (
    <article className="overflow-hidden bg-[#f4f5f7] text-neutral-950">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <Image
          src={item.img}
          alt={`${item.title} 생활서비스 홈페이지 예시`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/58" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/78 via-slate-950/48 to-blue-950/26" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/10" />

        <div className="relative mx-auto flex min-h-[clamp(35rem,58vw,44rem)] max-w-7xl flex-col justify-center px-4 py-[clamp(4.5rem,9vw,7rem)] sm:px-6 lg:px-8">
          <p className="mb-[clamp(1rem,2vw,1.4rem)] text-[clamp(0.72rem,1.15vw,0.9rem)] font-black uppercase tracking-[0.42em] text-blue-500">
            {content.eyebrow}
          </p>
          <h1 className="text-keep max-w-5xl whitespace-pre-line text-[clamp(2.35rem,5.2vw,4.8rem)] font-black leading-[1.08] tracking-[-0.025em]">
            {content.heroTitle}
          </h1>
          <p className="mt-[clamp(1.1rem,2.4vw,1.7rem)] max-w-3xl text-[clamp(0.95rem,1.75vw,1.2rem)] font-bold leading-relaxed text-white/84">
            {content.heroDescription}
          </p>

          <div className="mt-[clamp(1.5rem,3.3vw,2.4rem)] flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setIsReservationOpen(true)}
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-600 px-[clamp(1.25rem,2.6vw,1.85rem)] py-[clamp(0.9rem,1.75vw,1.15rem)] text-[clamp(0.88rem,1.45vw,1rem)] font-black text-white shadow-[0_1rem_2rem_rgba(37,99,235,0.2)] transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-blue-800 hover:shadow-[0_0.55rem_1.25rem_rgba(37,99,235,0.16)] active:translate-y-[2px]"
            >
              <ArrowButtonContent>{content.ctaLabel}</ArrowButtonContent>
            </button>
            <a
              href="tel:01029717280"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/24 bg-white/8 px-[clamp(1.15rem,2.4vw,1.7rem)] py-[clamp(0.9rem,1.75vw,1.15rem)] text-[clamp(0.88rem,1.45vw,1rem)] font-black text-white backdrop-blur transition-[background-color,transform,border-color] duration-200 hover:translate-y-[1px] hover:border-white/36 hover:bg-black/20 active:translate-y-[2px]"
            >
              <Phone size="1em" aria-hidden="true" />
              010-2971-7280
            </a>
          </div>

          <span className="mt-[clamp(1.3rem,2.8vw,2rem)] inline-flex w-fit rounded-full bg-white px-3 py-1.5 text-xs font-black text-neutral-800 shadow-[0_0.8rem_1.7rem_rgba(0,0,0,0.16)]">
            제작 예시 · 샘플 디자인
          </span>

          <ul className="mt-[clamp(3rem,6vw,5rem)] grid gap-3 md:grid-cols-3">
            {content.stats.map(([label, Icon]) => (
              <li
                key={label}
                className="flex min-h-[3.4rem] items-center justify-center gap-3 rounded-full border border-white/18 bg-white/12 px-5 py-3 text-[clamp(0.85rem,1.35vw,0.96rem)] font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-md"
              >
                <Icon size="1em" className="text-blue-500" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
              서비스 메뉴
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.85rem)] font-black leading-tight">
              서비스별 견적 안내
            </h2>
            <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-500">
              원하는 서비스를 선택하면 맞춤 견적을 안내해 드립니다
            </p>
          </div>

          <ul className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2 xl:grid-cols-4">
            {content.services.map(([title, desc, price, badge, Icon]) => (
              <li
                key={title}
                className="relative rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.45rem,2.8vw,2rem)] shadow-[0_1.5rem_3rem_rgba(15,23,42,0.06)]"
              >
                {badge && (
                  <span className="absolute right-6 top-7 rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-600">
                    {badge}
                  </span>
                )}
                <span className="mb-[clamp(1.2rem,2.3vw,1.6rem)] flex size-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Icon size="1.1rem" aria-hidden="true" />
                </span>
                <h3 className="text-[clamp(1rem,1.7vw,1.14rem)] font-black">
                  {title}
                </h3>
                <p className="mt-4 min-h-[3rem] text-[clamp(0.84rem,1.35vw,0.96rem)] font-bold leading-relaxed text-neutral-600">
                  {desc}
                </p>
                <p className="mt-6 text-[clamp(1.15rem,2.1vw,1.45rem)] font-black text-blue-600">
                  {price}
                </p>
                <DiagnosisModalButton className="group mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-black text-neutral-950 transition-[background-color,border-color,transform] duration-200 hover:translate-y-[1px] hover:border-blue-200 hover:bg-blue-50 active:translate-y-[2px]">
                  <ArrowButtonContent>견적 받기</ArrowButtonContent>
                </DiagnosisModalButton>
              </li>
            ))}
          </ul>
          <p className="mt-7 text-center text-xs font-semibold text-neutral-500">
            ※ 표기된 서비스 · 요금은 제작 예시용 샘플이며 실제와 다릅니다.
          </p>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
              작업 사례
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.85rem)] font-black leading-tight">
              실제 작업 현장
            </h2>
            <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-500">
              꼼꼼한 작업 과정과 결과를 직접 확인하세요
            </p>
          </div>

          <div className="mt-[clamp(2.4rem,5vw,3.75rem)] grid gap-[clamp(1rem,2.4vw,1.6rem)] lg:grid-cols-2">
            {content.gallery.map(([src, label]) => (
              <div
                key={label}
                className="relative min-h-[clamp(18rem,35vw,28rem)] overflow-hidden rounded-[2rem] bg-neutral-300 shadow-[0_1.7rem_3.5rem_rgba(15,23,42,0.08)]"
              >
                <Image
                  src={src}
                  alt={`${item.title} ${label}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 text-lg font-black text-white">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
              믿을 수 있는 이유
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.85rem)] font-black leading-tight">
              이래서 다릅니다
            </h2>
          </div>

          <ul className="mt-[clamp(2.25rem,5vw,3.5rem)] grid gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2 xl:grid-cols-4">
            {content.reasons.map(([title, desc, Icon]) => (
              <li
                key={title}
                className="rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.45rem,2.8vw,2rem)] shadow-[0_1.5rem_3rem_rgba(15,23,42,0.05)]"
              >
                <span className="mb-[clamp(1.2rem,2.3vw,1.6rem)] flex size-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Icon size="1.1rem" aria-hidden="true" />
                </span>
                <h3 className="text-[clamp(1rem,1.7vw,1.15rem)] font-black">
                  {title}
                </h3>
                <p className="mt-4 text-[clamp(0.84rem,1.35vw,0.96rem)] font-bold leading-relaxed text-neutral-600">
                  {desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
              고객 후기
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.85rem)] font-black leading-tight">
              이용 후기
            </h2>
          </div>

          <ul className="mt-[clamp(2rem,4.5vw,3rem)] grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-3">
            {reviews.map((review) => (
              <li
                key={review}
                className="rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.25rem,2.5vw,1.75rem)] shadow-[0_1.4rem_3rem_rgba(15,23,42,0.05)]"
              >
                <p className="text-orange-400" aria-label="별점 5점">
                  ★★★★★
                </p>
                <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold leading-relaxed text-neutral-700">
                  “{review}”
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
            RESERVATION
          </p>
          <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.85rem)] font-black leading-tight">
            방문 · 견적 예약
          </h2>
          <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-600">
            원하는 날짜와 희망 시간을 선택해 보세요
          </p>

          <div className="mx-auto mt-[clamp(2rem,4.5vw,3rem)] max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-[clamp(1.4rem,3vw,2rem)] text-left shadow-[0_2rem_4rem_rgba(15,23,42,0.08)]">
            <div className="mb-5 flex items-center gap-2 text-sm font-black text-blue-600">
              <CalendarDays size="1em" aria-hidden="true" />
              날짜
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {RESERVATION_DATES.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-black transition-[background-color,border-color,color,transform] duration-200 hover:translate-y-[1px] active:translate-y-[2px] ${
                    date === selectedDate
                      ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-800"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>

            <div className="mb-5 mt-7 flex items-center gap-2 text-sm font-black text-blue-600">
              <Clock3 size="1em" aria-hidden="true" />
              희망 시간
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {LIFE_SERVICE_TIMES.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-black transition-[background-color,border-color,color,transform] duration-200 hover:translate-y-[1px] active:translate-y-[2px] ${
                    time === selectedTime
                      ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-800"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsReservationOpen(true)}
              className="group mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black text-white transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-blue-800 hover:shadow-[0_0.55rem_1.25rem_rgba(37,99,235,0.16)] active:translate-y-[2px]"
            >
              <ArrowButtonContent>{selectedReservation} 예약하기</ArrowButtonContent>
            </button>
          </div>
        </div>
      </section>

      {isReservationOpen && (
        <ReservationCompleteModal
          selectedReservation={selectedReservation}
          onClose={() => setIsReservationOpen(false)}
          onConsult={openDiagnosisModal}
        />
      )}

      <section className="bg-neutral-950 px-4 py-[clamp(5rem,10vw,8rem)] text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-keep max-w-4xl whitespace-pre-line text-[clamp(1.95rem,4.2vw,3.55rem)] font-black leading-[1.18]">
            {content.bottomTitle}
          </h2>
          <p className="text-keep mt-[clamp(1.3rem,2.8vw,2rem)] max-w-3xl text-[clamp(0.95rem,1.7vw,1.2rem)] font-bold leading-relaxed text-white/62">
            {content.bottomDesc}
          </p>

          <div className="mt-[clamp(1.7rem,3.5vw,2.5rem)] flex flex-wrap gap-3">
            <DiagnosisModalButton className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-[clamp(1.25rem,2.5vw,1.75rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-neutral-950 transition-[background-color,transform] duration-200 hover:translate-y-[1px] hover:bg-neutral-200 active:translate-y-[2px]">
              <ArrowButtonContent>무료 진단 신청</ArrowButtonContent>
            </DiagnosisModalButton>
            <a
              href="tel:01029717280"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/16 bg-white/5 px-[clamp(1.1rem,2.3vw,1.55rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-white transition-[background-color,transform,border-color] duration-200 hover:translate-y-[1px] hover:border-white/24 hover:bg-black/25 active:translate-y-[2px]"
            >
              <Phone size="1em" aria-hidden="true" />
              010-2971-7280
            </a>
          </div>
        </div>
      </section>

      <div className="bg-white px-4 py-[clamp(1.8rem,4vw,2.5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/cases"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.85rem,1.4vw,0.95rem)] font-bold text-neutral-700 transition-colors duration-200 hover:text-blue-600"
          >
            <ArrowLeft
              size="1em"
              className="transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            다른 업종 사례 보기
          </Link>

          <a
            href={blogHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.85rem,1.4vw,0.95rem)] font-bold text-blue-600 transition-colors duration-200 hover:text-blue-800"
          >
            블로그에서 실제 제작기 보기
            <ArrowRight
              size="1em"
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </article>
  );
}

function AutomotiveCasePage({
  item,
  blogHref,
  selectedDate,
  selectedTime,
  selectedReservation,
  setSelectedDate,
  setSelectedTime,
  isReservationOpen,
  setIsReservationOpen,
  openDiagnosisModal,
}) {
  const content =
    AUTOMOTIVE_CASE_CONTENT[item.title] ||
    AUTOMOTIVE_CASE_CONTENT["자동차 디테일링"];
  const reviews = [
    "문의 버튼 위치 바꾸고 상담 문의가 확실히 늘었어요.",
    "처음엔 반신반의했는데 랜딩 페이지 만들고 나서 일주일 만에 상담 전화 3건이 왔어요.",
    "디자인이 너무 예뻐서 주변 원장님들한테 소개해드렸어요. 진짜 퀄리티 대박.",
  ];

  return (
    <article className="overflow-hidden bg-[#f4f4f5] text-neutral-950">
      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <Image
          src={item.img}
          alt={`${item.title} 자동차 홈페이지 예시`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-neutral-950/58" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/84 via-neutral-950/42 to-orange-950/34" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/72 via-transparent to-neutral-950/12" />

        <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-[clamp(1.3rem,2.6vw,1.9rem)] sm:px-6 lg:px-8">
          <p className="text-[clamp(1rem,1.8vw,1.15rem)] font-black uppercase tracking-[-0.02em] text-white">
            {content.brand}
          </p>
          <nav className="hidden items-center gap-[clamp(1.4rem,3vw,2.5rem)] text-[clamp(0.82rem,1.25vw,0.95rem)] font-bold text-white/86 md:flex">
            {content.nav.map((navItem) => (
              <span key={navItem}>{navItem}</span>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setIsReservationOpen(true)}
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-black text-neutral-950 transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-orange-400 hover:shadow-[0_0.55rem_1.25rem_rgba(249,115,22,0.18)] active:translate-y-[2px]"
          >
            견적 문의
          </button>
        </div>

        <div className="relative mx-auto flex min-h-[clamp(35rem,58vw,44rem)] max-w-7xl flex-col justify-center px-4 pb-[clamp(4.5rem,9vw,6.5rem)] pt-[clamp(3rem,7vw,5.5rem)] sm:px-6 lg:px-8">
          <p className="mb-[clamp(1rem,2vw,1.4rem)] text-[clamp(0.72rem,1.15vw,0.9rem)] font-black uppercase tracking-[0.42em] text-orange-500">
            {content.eyebrow}
          </p>
          <h1 className="text-keep max-w-4xl whitespace-pre-line text-[clamp(2.35rem,5.2vw,4.8rem)] font-black leading-[1.08] tracking-[-0.025em]">
            {content.heroTitle}
          </h1>
          <p className="mt-[clamp(1.1rem,2.4vw,1.7rem)] max-w-3xl text-[clamp(0.95rem,1.75vw,1.2rem)] font-bold leading-relaxed text-white/84">
            {content.heroDescription}
          </p>

          <div className="mt-[clamp(1.5rem,3.3vw,2.4rem)] flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setIsReservationOpen(true)}
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-orange-500 px-[clamp(1.25rem,2.6vw,1.85rem)] py-[clamp(0.9rem,1.75vw,1.15rem)] text-[clamp(0.88rem,1.45vw,1rem)] font-black text-neutral-950 shadow-[0_1rem_2rem_rgba(249,115,22,0.2)] transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-orange-400 hover:shadow-[0_0.55rem_1.25rem_rgba(249,115,22,0.16)] active:translate-y-[2px]"
            >
              <ArrowButtonContent>{content.ctaLabel}</ArrowButtonContent>
            </button>
            <a
              href="tel:01029717280"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/24 bg-white/8 px-[clamp(1.15rem,2.4vw,1.7rem)] py-[clamp(0.9rem,1.75vw,1.15rem)] text-[clamp(0.88rem,1.45vw,1rem)] font-black text-white backdrop-blur transition-[background-color,transform,border-color] duration-200 hover:translate-y-[1px] hover:border-white/36 hover:bg-black/20 active:translate-y-[2px]"
            >
              <Phone size="1em" aria-hidden="true" />
              010-2971-7280
            </a>
          </div>

          <span className="mt-[clamp(1.3rem,2.8vw,2rem)] inline-flex w-fit rounded-full bg-white px-3 py-1.5 text-xs font-black text-neutral-800 shadow-[0_0.8rem_1.7rem_rgba(0,0,0,0.16)]">
            제작 예시 · 샘플 디자인
          </span>

          <ul className="mt-[clamp(3rem,6vw,5rem)] grid gap-3 md:grid-cols-3">
            {content.stats.map(([label, Icon]) => (
              <li
                key={label}
                className="flex min-h-[3.4rem] items-center justify-center gap-3 rounded-full border border-white/18 bg-white/12 px-5 py-3 text-[clamp(0.85rem,1.35vw,0.96rem)] font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-md"
              >
                <Icon size="1em" className="text-orange-500" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
              서비스 메뉴
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.85rem)] font-black leading-tight">
              서비스별 견적 안내
            </h2>
            <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-500">
              원하는 서비스를 선택하면 맞춤 견적을 안내해 드립니다
            </p>
          </div>

          <ul className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2 xl:grid-cols-4">
            {content.services.map(([title, desc, price, badge, Icon]) => (
              <li
                key={title}
                className="relative rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.45rem,2.8vw,2rem)] shadow-[0_1.5rem_3rem_rgba(15,23,42,0.06)]"
              >
                {badge && (
                  <span className="absolute right-6 top-7 rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-600">
                    {badge}
                  </span>
                )}
                <span className="mb-[clamp(1.2rem,2.3vw,1.6rem)] flex size-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Icon size="1.1rem" aria-hidden="true" />
                </span>
                <h3 className="text-[clamp(1rem,1.7vw,1.14rem)] font-black">
                  {title}
                </h3>
                <p className="mt-4 min-h-[3rem] text-[clamp(0.84rem,1.35vw,0.96rem)] font-bold leading-relaxed text-neutral-600">
                  {desc}
                </p>
                <p className="mt-6 text-[clamp(1.15rem,2.1vw,1.45rem)] font-black text-blue-600">
                  {price}
                </p>
                <DiagnosisModalButton className="group mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-black text-neutral-950 transition-[background-color,border-color,transform] duration-200 hover:translate-y-[1px] hover:border-blue-200 hover:bg-blue-50 active:translate-y-[2px]">
                  <ArrowButtonContent>견적 받기</ArrowButtonContent>
                </DiagnosisModalButton>
              </li>
            ))}
          </ul>
          <p className="mt-7 text-center text-xs font-semibold text-neutral-500">
            ※ 표기된 서비스 · 요금은 제작 예시용 샘플이며 실제와 다릅니다.
          </p>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
              작업 사례
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.85rem)] font-black leading-tight">
              실제 작업 현장
            </h2>
            <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-500">
              꼼꼼한 작업 과정과 결과를 직접 확인하세요
            </p>
          </div>

          <div className="mt-[clamp(2.4rem,5vw,3.75rem)] grid gap-[clamp(1rem,2.4vw,1.6rem)] lg:grid-cols-2">
            {content.gallery.map(([src, label]) => (
              <div
                key={label}
                className="relative min-h-[clamp(18rem,35vw,28rem)] overflow-hidden rounded-[2rem] bg-neutral-300 shadow-[0_1.7rem_3.5rem_rgba(15,23,42,0.08)]"
              >
                <Image
                  src={src}
                  alt={`${item.title} ${label}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 text-lg font-black text-white">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
              믿을 수 있는 이유
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.85rem)] font-black leading-tight">
              이래서 다릅니다
            </h2>
          </div>

          <ul className="mt-[clamp(2.25rem,5vw,3.5rem)] grid gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2 xl:grid-cols-4">
            {content.reasons.map(([title, desc, Icon]) => (
              <li
                key={title}
                className="rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.45rem,2.8vw,2rem)] shadow-[0_1.5rem_3rem_rgba(15,23,42,0.05)]"
              >
                <span className="mb-[clamp(1.2rem,2.3vw,1.6rem)] flex size-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Icon size="1.1rem" aria-hidden="true" />
                </span>
                <h3 className="text-[clamp(1rem,1.7vw,1.15rem)] font-black">
                  {title}
                </h3>
                <p className="mt-4 text-[clamp(0.84rem,1.35vw,0.96rem)] font-bold leading-relaxed text-neutral-600">
                  {desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
              고객 후기
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.85rem)] font-black leading-tight">
              이용 후기
            </h2>
          </div>

          <ul className="mt-[clamp(2rem,4.5vw,3rem)] grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-3">
            {reviews.map((review) => (
              <li
                key={review}
                className="rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.25rem,2.5vw,1.75rem)] shadow-[0_1.4rem_3rem_rgba(15,23,42,0.05)]"
              >
                <p className="text-orange-400" aria-label="별점 5점">
                  ★★★★★
                </p>
                <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold leading-relaxed text-neutral-700">
                  “{review}”
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
            RESERVATION
          </p>
          <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.85rem)] font-black leading-tight">
            {content.reservationTitle}
          </h2>
          <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-600">
            원하는 날짜와 희망 시간을 선택해 보세요
          </p>

          <div className="mx-auto mt-[clamp(2rem,4.5vw,3rem)] max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-[clamp(1.4rem,3vw,2rem)] text-left shadow-[0_2rem_4rem_rgba(15,23,42,0.08)]">
            <div className="mb-5 flex items-center gap-2 text-sm font-black text-blue-600">
              <CalendarDays size="1em" aria-hidden="true" />
              날짜
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {RESERVATION_DATES.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-black transition-[background-color,border-color,color,transform] duration-200 hover:translate-y-[1px] active:translate-y-[2px] ${
                    date === selectedDate
                      ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-800"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>

            <div className="mb-5 mt-7 flex items-center gap-2 text-sm font-black text-blue-600">
              <Clock3 size="1em" aria-hidden="true" />
              희망 시간
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {AUTOMOTIVE_TIMES.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-black transition-[background-color,border-color,color,transform] duration-200 hover:translate-y-[1px] active:translate-y-[2px] ${
                    time === selectedTime
                      ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-800"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsReservationOpen(true)}
              className="group mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black text-white transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-blue-800 hover:shadow-[0_0.55rem_1.25rem_rgba(37,99,235,0.16)] active:translate-y-[2px]"
            >
              <ArrowButtonContent>{selectedReservation} 예약하기</ArrowButtonContent>
            </button>
          </div>
        </div>
      </section>

      {isReservationOpen && (
        <ReservationCompleteModal
          selectedReservation={selectedReservation}
          onClose={() => setIsReservationOpen(false)}
          onConsult={openDiagnosisModal}
        />
      )}

      <section className="bg-neutral-950 px-4 py-[clamp(5rem,10vw,8rem)] text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-keep max-w-4xl whitespace-pre-line text-[clamp(1.95rem,4.2vw,3.55rem)] font-black leading-[1.18]">
            {content.bottomTitle}
          </h2>
          <p className="text-keep mt-[clamp(1.3rem,2.8vw,2rem)] max-w-3xl text-[clamp(0.95rem,1.7vw,1.2rem)] font-bold leading-relaxed text-white/62">
            {content.bottomDesc}
          </p>

          <div className="mt-[clamp(1.7rem,3.5vw,2.5rem)] flex flex-wrap gap-3">
            <DiagnosisModalButton className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-[clamp(1.25rem,2.5vw,1.75rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-neutral-950 transition-[background-color,transform] duration-200 hover:translate-y-[1px] hover:bg-neutral-200 active:translate-y-[2px]">
              <ArrowButtonContent>무료 진단 신청</ArrowButtonContent>
            </DiagnosisModalButton>
            <a
              href="tel:01029717280"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/16 bg-white/5 px-[clamp(1.1rem,2.3vw,1.55rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-white transition-[background-color,transform,border-color] duration-200 hover:translate-y-[1px] hover:border-white/24 hover:bg-black/25 active:translate-y-[2px]"
            >
              <Phone size="1em" aria-hidden="true" />
              010-2971-7280
            </a>
          </div>
        </div>
      </section>

      <div className="bg-white px-4 py-[clamp(1.8rem,4vw,2.5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/cases"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.85rem,1.4vw,0.95rem)] font-bold text-neutral-700 transition-colors duration-200 hover:text-blue-600"
          >
            <ArrowLeft
              size="1em"
              className="transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            다른 업종 사례 보기
          </Link>

          <a
            href={blogHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.85rem,1.4vw,0.95rem)] font-bold text-blue-600 transition-colors duration-200 hover:text-blue-800"
          >
            블로그에서 실제 제작기 보기
            <ArrowRight
              size="1em"
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </article>
  );
}

function OtherCasePage({
  item,
  blogHref,
  selectedDate,
  selectedTime,
  selectedReservation,
  setSelectedDate,
  setSelectedTime,
  isReservationOpen,
  setIsReservationOpen,
  openDiagnosisModal,
}) {
  const content =
    OTHER_CASE_CONTENT[item.title] || OTHER_CASE_CONTENT["웨딩/스냅 업체"];
  const heroImage = content.heroImage || item.img;
  const reviews = [
    "문의 버튼 위치 바꾸고 상담 문의가 확실히 늘었어요.",
    "처음엔 반신반의했는데 랜딩 페이지 만들고 나서 일주일 만에 상담 전화 3건이 왔어요.",
    "디자인이 너무 예뻐서 주변 원장님들한테 소개해드렸어요. 진짜 퀄리티 대박.",
  ];

  return (
    <article className="overflow-hidden bg-[#f3f3f4] text-neutral-950">
      <section className="relative flex min-h-[clamp(34rem,58vw,43rem)] items-center overflow-hidden bg-[#171411] px-4 py-[clamp(4rem,9vw,7rem)] text-white sm:px-6 lg:px-8">
        <Image
          src={heroImage}
          alt={`${item.title} 기타 업종 홈페이지 예시`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#171411]/62" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171411]/92 via-[#171411]/56 to-[#5d422a]/32" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171411]/78 via-transparent to-[#7a5639]/18" />

        <div className="relative mx-auto w-full max-w-7xl">
          <p className="mb-[clamp(1rem,2vw,1.5rem)] flex items-center gap-2 text-[clamp(0.72rem,1.15vw,0.9rem)] font-black uppercase tracking-[0.45em] text-[#c5b5a5]">
            <Briefcase size="1em" aria-hidden="true" />
            {content.eyebrow}
          </p>
          <h1 className="text-keep max-w-4xl whitespace-pre-line text-[clamp(2.35rem,5.2vw,4.8rem)] font-black leading-[1.1] tracking-[-0.025em]">
            {content.heroTitle}
          </h1>
          <p className="mt-[clamp(1.1rem,2.4vw,1.7rem)] max-w-3xl text-[clamp(0.95rem,1.75vw,1.2rem)] font-bold leading-relaxed text-white/82">
            {content.heroDescription}
          </p>

          <div className="mt-[clamp(1.5rem,3.3vw,2.4rem)] flex flex-wrap items-start gap-3">
            <div className="flex w-fit flex-col gap-[clamp(0.55rem,1vw,0.7rem)]">
              <button
                type="button"
                onClick={() => setIsReservationOpen(true)}
                className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#f5efe7] px-[clamp(1.25rem,2.6vw,1.85rem)] py-[clamp(0.9rem,1.75vw,1.15rem)] text-[clamp(0.88rem,1.45vw,1rem)] font-black text-[#171411] shadow-[0_1rem_2rem_rgba(0,0,0,0.16)] transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-[#d8c8b7] hover:shadow-[0_0.55rem_1.25rem_rgba(0,0,0,0.14)] active:translate-y-[2px]"
              >
                <ArrowButtonContent>{content.ctaLabel}</ArrowButtonContent>
              </button>
              <span className="inline-flex w-full justify-center rounded-full bg-[#f5efe7] px-3 py-1.5 text-xs font-black text-[#171411]">
                제작 예시 · 샘플 디자인
              </span>
            </div>

            <a
              href="tel:01029717280"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/26 bg-white/7 px-[clamp(1.15rem,2.4vw,1.7rem)] py-[clamp(0.9rem,1.75vw,1.15rem)] text-[clamp(0.88rem,1.45vw,1rem)] font-black text-white backdrop-blur transition-[background-color,transform,border-color] duration-200 hover:translate-y-[1px] hover:border-white/36 hover:bg-black/20 active:translate-y-[2px]"
            >
              <Phone size="1em" aria-hidden="true" />
              010-2971-7280
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#171411] px-4 py-[clamp(5rem,10vw,8rem)] text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[clamp(0.72rem,1.15vw,0.86rem)] font-black uppercase tracking-[0.45em] text-[#a99580]">
            SELECTED WORKS
          </p>
          <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
            작업 갤러리
          </h2>
          <p className="mt-4 max-w-3xl text-[clamp(0.88rem,1.4vw,1rem)] font-bold leading-relaxed text-white/58">
            {content.worksSubtitle}
          </p>

          <div className="mt-[clamp(2rem,4.5vw,3.5rem)] grid auto-rows-[clamp(11rem,22vw,18rem)] grid-cols-1 gap-[clamp(0.85rem,1.7vw,1.25rem)] md:grid-cols-4">
            {content.works.map(([src, tag, title, desc, span]) => (
              <article
                key={`${tag}-${title}`}
                className={`group relative overflow-hidden rounded-[1.5rem] bg-[#2a241e] ${span}`}
              >
                <Image
                  src={src}
                  alt={`${item.title} ${title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/18 to-[#6b4b31]/18" />
                <p className="absolute right-5 top-5 text-[0.68rem] font-black uppercase tracking-[0.34em] text-[#d8c8b7]">
                  {tag}
                </p>
                <div className="absolute bottom-5 left-5 right-5">
                  <Briefcase size="0.95rem" className="mb-4 text-white/58" aria-hidden="true" />
                  <h3 className="text-[clamp(0.92rem,1.5vw,1.05rem)] font-black text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-xs font-black uppercase text-white/72">
                    {desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-7 text-center text-xs font-semibold text-white/42">
            ※ 표기된 작업명·정보는 제작 예시용 샘플이며 실제와 다릅니다.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
              SERVICE
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              우리가 하는 일
            </h2>
            <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-500">
              상담부터 완성까지, 공간과 순간을 다루는 네 가지 작업입니다.
            </p>
          </div>

          <ul className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2 xl:grid-cols-4">
            {content.services.map(([title, desc, Icon], index) => (
              <li
                key={title}
                className="relative rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.45rem,2.8vw,2rem)] shadow-[0_1.5rem_3rem_rgba(15,23,42,0.06)]"
              >
                <span className="mb-[clamp(1.2rem,2.3vw,1.6rem)] flex size-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Icon size="1.1rem" aria-hidden="true" />
                </span>
                <span className="absolute right-7 top-8 text-sm font-black text-neutral-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[clamp(1rem,1.7vw,1.14rem)] font-black">
                  {title}
                </h3>
                <p className="mt-5 text-[clamp(0.84rem,1.35vw,0.96rem)] font-bold leading-relaxed text-neutral-600">
                  {desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
              CLIENT VOICE
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.9rem)] font-black leading-tight">
              고객 후기
            </h2>
          </div>

          <ul className="mt-[clamp(2rem,4.5vw,3rem)] grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-3">
            {reviews.map((review) => (
              <li
                key={review}
                className="relative rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.25rem,2.5vw,1.75rem)] shadow-[0_1.4rem_3rem_rgba(15,23,42,0.05)]"
              >
                <p className="text-orange-400" aria-label="별점 5점">
                  ★★★★★
                </p>
                <Heart
                  size="1rem"
                  className="absolute right-6 top-7 text-blue-500"
                  aria-hidden="true"
                />
                <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold leading-relaxed text-neutral-700">
                  “{review}”
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-bold text-neutral-500">
            {content.reviewBadges.map((badge) => (
              <span key={badge} className="inline-flex items-center gap-2">
                <MapPin size="1em" className="text-blue-500" aria-hidden="true" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
            RESERVATION
          </p>
          <h2 className="mt-3 text-[clamp(1.8rem,3.7vw,2.85rem)] font-black leading-tight">
            {content.reservationTitle}
          </h2>
          <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-600">
            {content.reservationSubtitle}
          </p>

          <div className="mx-auto mt-[clamp(2rem,4.5vw,3rem)] max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-[clamp(1.4rem,3vw,2rem)] text-left shadow-[0_2rem_4rem_rgba(15,23,42,0.08)]">
            <div className="mb-5 flex items-center gap-2 text-sm font-black text-blue-600">
              <CalendarDays size="1em" aria-hidden="true" />
              날짜
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {RESERVATION_DATES.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-black transition-[background-color,border-color,color,transform] duration-200 hover:translate-y-[1px] active:translate-y-[2px] ${
                    date === selectedDate
                      ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-800"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>

            <div className="mb-5 mt-7 flex items-center gap-2 text-sm font-black text-blue-600">
              <Clock3 size="1em" aria-hidden="true" />
              희망 일정
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {OTHER_CASE_TIMES.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-black transition-[background-color,border-color,color,transform] duration-200 hover:translate-y-[1px] active:translate-y-[2px] ${
                    time === selectedTime
                      ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-800"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsReservationOpen(true)}
              className="group mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black text-white transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-blue-800 hover:shadow-[0_0.55rem_1.25rem_rgba(37,99,235,0.16)] active:translate-y-[2px]"
            >
              <ArrowButtonContent>{selectedReservation} 예약하기</ArrowButtonContent>
            </button>
          </div>
        </div>
      </section>

      {isReservationOpen && (
        <ReservationCompleteModal
          selectedReservation={selectedReservation}
          onClose={() => setIsReservationOpen(false)}
          onConsult={openDiagnosisModal}
        />
      )}

      <section className="bg-neutral-950 px-4 py-[clamp(5rem,10vw,8rem)] text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-keep max-w-4xl whitespace-pre-line text-[clamp(1.95rem,4.2vw,3.55rem)] font-black leading-[1.18]">
            {content.bottomTitle}
          </h2>
          <p className="text-keep mt-[clamp(1.3rem,2.8vw,2rem)] max-w-3xl text-[clamp(0.95rem,1.7vw,1.2rem)] font-bold leading-relaxed text-white/62">
            {content.bottomDesc}
          </p>

          <div className="mt-[clamp(1.7rem,3.5vw,2.5rem)] flex flex-wrap gap-3">
            <DiagnosisModalButton className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-[clamp(1.25rem,2.5vw,1.75rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-neutral-950 transition-[background-color,transform] duration-200 hover:translate-y-[1px] hover:bg-neutral-200 active:translate-y-[2px]">
              <ArrowButtonContent>무료 진단 신청</ArrowButtonContent>
            </DiagnosisModalButton>
            <a
              href="tel:01029717280"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/16 bg-white/5 px-[clamp(1.1rem,2.3vw,1.55rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-white transition-[background-color,transform,border-color] duration-200 hover:translate-y-[1px] hover:border-white/24 hover:bg-black/25 active:translate-y-[2px]"
            >
              <Phone size="1em" aria-hidden="true" />
              010-2971-7280
            </a>
          </div>
        </div>
      </section>

      <div className="bg-white px-4 py-[clamp(1.8rem,4vw,2.5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/cases"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.85rem,1.4vw,0.95rem)] font-bold text-neutral-700 transition-colors duration-200 hover:text-blue-600"
          >
            <ArrowLeft
              size="1em"
              className="transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            다른 업종 사례 보기
          </Link>

          <a
            href={blogHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.85rem,1.4vw,0.95rem)] font-bold text-blue-600 transition-colors duration-200 hover:text-blue-800"
          >
            블로그에서 실제 제작기 보기
            <ArrowRight
              size="1em"
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function CaseDetailSection({ item }) {
  const sample = getSample(item);
  const blogHref = item.blogHref || "https://m.blog.naver.com/weflowlab";
  const isProfessionalCase = item.category === "전문직";
  const isCafeCase = item.category === "외식 • 카페";
  const isBeautyCase = item.category === "뷰티";
  const isPetCase = item.category === "반려동물";
  const isAutomotiveCase =
    item.category === "자동차" && Boolean(AUTOMOTIVE_CASE_CONTENT[item.title]);
  const isOtherCase =
    item.category === "기타" && Boolean(OTHER_CASE_CONTENT[item.title]);
  const isPetSuppliesCase = item.title === "반려동물 용품점";
  const isStudyCafeCase = item.title === "스터디카페";
  const isEducationCase =
    item.category === "교육" && Boolean(EDUCATION_CASE_CONTENT[item.title]);
  const isLifeServiceCase =
    item.category === "생활서비스" &&
    Boolean(LIFE_SERVICE_CASE_CONTENT[item.title]);
  const initialSelectedDate =
    isLifeServiceCase || isAutomotiveCase
      ? "주말"
      : isOtherCase || isProfessionalCase || isEducationCase
        ? "모레"
        : isPetCase
          ? "내일"
          : "오늘";
  const initialSelectedTime =
    isLifeServiceCase || isAutomotiveCase
      ? "오후 3~6"
      : isOtherCase
        ? "평일 오후"
        : isProfessionalCase
          ? "오후 2:00"
          : isStudyCafeCase
            ? "6시간"
            : isEducationCase
              ? "오후 4:00"
              : isCafeCase || isBeautyCase || isPetCase
                ? "오후 3:00"
                : "오후 9:00";
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);
  const [selectedTime, setSelectedTime] = useState(initialSelectedTime);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const selectedReservation = `${selectedDate} ${selectedTime}`;

  function openDiagnosisModal() {
    setIsReservationOpen(false);
    window.dispatchEvent(new Event("open-diagnosis-modal"));
  }

  if (isProfessionalCase) {
    return (
      <ProfessionalCasePage
        item={item}
        blogHref={blogHref}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedReservation={selectedReservation}
        setSelectedDate={setSelectedDate}
        setSelectedTime={setSelectedTime}
        isReservationOpen={isReservationOpen}
        setIsReservationOpen={setIsReservationOpen}
        openDiagnosisModal={openDiagnosisModal}
      />
    );
  }

  if (isCafeCase) {
    return (
      <CafeCasePage
        item={item}
        blogHref={blogHref}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedReservation={selectedReservation}
        setSelectedDate={setSelectedDate}
        setSelectedTime={setSelectedTime}
        isReservationOpen={isReservationOpen}
        setIsReservationOpen={setIsReservationOpen}
        openDiagnosisModal={openDiagnosisModal}
      />
    );
  }

  if (isPetSuppliesCase) {
    return (
      <PetSuppliesCasePage
        item={item}
        blogHref={blogHref}
      />
    );
  }

  if (isStudyCafeCase) {
    return (
      <StudyCafeCasePage
        item={item}
        blogHref={blogHref}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedReservation={selectedReservation}
        setSelectedDate={setSelectedDate}
        setSelectedTime={setSelectedTime}
        isReservationOpen={isReservationOpen}
        setIsReservationOpen={setIsReservationOpen}
        openDiagnosisModal={openDiagnosisModal}
      />
    );
  }

  if (isEducationCase) {
    return (
      <EducationCasePage
        item={item}
        blogHref={blogHref}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedReservation={selectedReservation}
        setSelectedDate={setSelectedDate}
        setSelectedTime={setSelectedTime}
        isReservationOpen={isReservationOpen}
        setIsReservationOpen={setIsReservationOpen}
        openDiagnosisModal={openDiagnosisModal}
      />
    );
  }

  if (isLifeServiceCase) {
    return (
      <LifeServiceCasePage
        item={item}
        blogHref={blogHref}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedReservation={selectedReservation}
        setSelectedDate={setSelectedDate}
        setSelectedTime={setSelectedTime}
        isReservationOpen={isReservationOpen}
        setIsReservationOpen={setIsReservationOpen}
        openDiagnosisModal={openDiagnosisModal}
      />
    );
  }

  if (isAutomotiveCase) {
    return (
      <AutomotiveCasePage
        item={item}
        blogHref={blogHref}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedReservation={selectedReservation}
        setSelectedDate={setSelectedDate}
        setSelectedTime={setSelectedTime}
        isReservationOpen={isReservationOpen}
        setIsReservationOpen={setIsReservationOpen}
        openDiagnosisModal={openDiagnosisModal}
      />
    );
  }

  if (isOtherCase) {
    return (
      <OtherCasePage
        item={item}
        blogHref={blogHref}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedReservation={selectedReservation}
        setSelectedDate={setSelectedDate}
        setSelectedTime={setSelectedTime}
        isReservationOpen={isReservationOpen}
        setIsReservationOpen={setIsReservationOpen}
        openDiagnosisModal={openDiagnosisModal}
      />
    );
  }

  if (isBeautyCase || isPetCase) {
    return (
      <BeautyCasePage
        item={item}
        blogHref={blogHref}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedReservation={selectedReservation}
        setSelectedDate={setSelectedDate}
        setSelectedTime={setSelectedTime}
        isReservationOpen={isReservationOpen}
        setIsReservationOpen={setIsReservationOpen}
        openDiagnosisModal={openDiagnosisModal}
      />
    );
  }

  return (
    <article className="overflow-hidden bg-white text-neutral-950">
      <div className="border-b border-neutral-200 bg-neutral-100">
        <div className="mx-auto grid min-h-[4.25rem] max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            href="/cases"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.78rem,1.4vw,0.95rem)] font-bold text-neutral-600 transition-colors duration-200 hover:text-neutral-950"
          >
            <ArrowLeft
              size="1em"
              className="transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            제작 사례
          </Link>

          <p className="text-keep hidden text-center text-[clamp(0.78rem,1.3vw,0.9rem)] font-bold text-neutral-500 sm:block">
            {item.title} · 랜딩페이지 제작 예시(샘플)
          </p>

          <DiagnosisModalButton className="group inline-flex cursor-pointer items-center justify-center gap-2 justify-self-end rounded-xl bg-blue-600 px-4 py-2.5 text-[clamp(0.78rem,1.3vw,0.92rem)] font-black text-white shadow-[0_0.75rem_1.75rem_rgba(37,99,235,0.22)] transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-blue-800 hover:shadow-[0_0.45rem_1.1rem_rgba(37,99,235,0.18)] active:translate-y-[2px]">
            이 디자인으로 상담
          </DiagnosisModalButton>
        </div>
      </div>

      <section className="relative flex min-h-[clamp(36rem,62vw,44rem)] items-center overflow-hidden px-4 py-[clamp(4rem,9vw,7rem)] text-white sm:px-6 lg:px-8">
        <Image
          src={item.img}
          alt={`${item.title} 랜딩페이지 예시 배경`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/62" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/38 to-black/10" />

        <div className="relative mx-auto w-full max-w-7xl">
          <p className="mb-[clamp(1rem,2vw,1.4rem)] inline-flex items-center gap-2 text-[clamp(0.82rem,1.45vw,0.95rem)] font-black text-amber-400">
            <BadgeCheck size="1em" aria-hidden="true" />
            {item.title}
          </p>
          <h1 className="text-keep max-w-3xl whitespace-pre-line text-[clamp(2rem,4.6vw,3.85rem)] font-black leading-[1.16] tracking-[-0.01em]">
            {sample.heroTitle}
          </h1>
          <p className="text-keep mt-[clamp(1.2rem,2.6vw,1.8rem)] max-w-3xl text-[clamp(1rem,2vw,1.3rem)] font-bold leading-relaxed text-white/78">
            {sample.heroDescription}
          </p>

          <div className="mt-[clamp(1.6rem,3.5vw,2.4rem)] flex flex-wrap gap-3">
            <DiagnosisModalButton className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-600 px-[clamp(1.25rem,2.5vw,1.75rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-white shadow-[0_1rem_2rem_rgba(37,99,235,0.28)] transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-blue-800 hover:shadow-[0_0.55rem_1.25rem_rgba(37,99,235,0.2)] active:translate-y-[2px]">
              <ArrowButtonContent>무료 체험 신청</ArrowButtonContent>
            </DiagnosisModalButton>
            <a
              href="tel:01029717280"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/8 px-[clamp(1.1rem,2.3vw,1.55rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-white backdrop-blur transition-[background-color,transform,border-color] duration-200 hover:translate-y-[1px] hover:border-white/35 hover:bg-black/20 active:translate-y-[2px]"
            >
              <Phone size="1em" aria-hidden="true" />
              010-2971-7280
            </a>
          </div>

          <span className="mt-[clamp(1.4rem,3vw,2rem)] inline-flex rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-neutral-950">
            제작 예시 · 샘플 디자인
          </span>
        </div>
      </section>

      <section className="bg-white px-4 py-[clamp(4.5rem,9vw,7rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
              {sample.programLabel}
            </p>
            <h2 className="mt-2 text-[clamp(1.8rem,3.6vw,2.75rem)] font-black leading-tight">
              {sample.programTitle}
            </h2>
          </div>

          <ul className="mt-[clamp(2.25rem,5vw,3.5rem)] grid gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2 xl:grid-cols-4">
            {sample.programs.map(([title, desc, Icon]) => (
              <li
                key={title}
                className="rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.35rem,2.5vw,1.8rem)] shadow-[0_1.5rem_3rem_rgba(15,23,42,0.06)] transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_1.8rem_3.5rem_rgba(37,99,235,0.1)]"
              >
                <span className="mb-[clamp(1rem,2vw,1.25rem)] flex size-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Icon size="1.15rem" aria-hidden="true" />
                </span>
                <h3 className="text-[clamp(1rem,1.7vw,1.12rem)] font-black">
                  {title}
                </h3>
                <p className="mt-4 text-[clamp(0.82rem,1.35vw,0.95rem)] font-bold leading-relaxed text-neutral-500">
                  {desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(4.5rem,9vw,7rem)] sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[0.9fr_1fr] lg:items-center">
          <div className="relative min-h-[clamp(18rem,38vw,31rem)] overflow-hidden rounded-[2rem] bg-neutral-200 shadow-[0_2rem_4rem_rgba(15,23,42,0.1)]">
            <Image
              src={item.img}
              alt={`${item.title} 요금 안내 이미지`}
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
              {sample.priceLabel}
            </p>
            <h2 className="mt-2 text-[clamp(1.8rem,3.6vw,2.75rem)] font-black leading-tight">
              {sample.priceTitle}
            </h2>

            <ul className="mt-[clamp(1.5rem,3vw,2rem)] space-y-3">
              {sample.prices.map(([title, desc, price, featured]) => (
                <li
                  key={title}
                  className={`flex items-center justify-between gap-4 rounded-3xl border px-[clamp(1rem,2vw,1.35rem)] py-[clamp(0.9rem,1.8vw,1.15rem)] font-bold ${
                    featured
                      ? "border-blue-500 bg-blue-100 text-blue-700"
                      : "border-neutral-200 bg-white text-neutral-950"
                  }`}
                >
                  <span>
                    <span className="block text-[clamp(0.9rem,1.5vw,1rem)] font-black">
                      {title}
                      {featured && (
                        <span className="ml-2 rounded-full bg-blue-600 px-2 py-0.5 text-[0.68rem] font-black text-white">
                          인기
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block text-[clamp(0.74rem,1.2vw,0.86rem)] text-neutral-500">
                      {desc}
                    </span>
                  </span>
                  <strong className="whitespace-nowrap text-[clamp(1rem,2vw,1.3rem)] font-black text-blue-600">
                    {price}
                  </strong>
                </li>
              ))}
            </ul>

            <DiagnosisModalButton className="group mt-[clamp(1.4rem,3vw,2rem)] inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-600 px-[clamp(1.35rem,2.6vw,1.9rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-white shadow-[0_1rem_2rem_rgba(37,99,235,0.18)] transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-blue-800 hover:shadow-[0_0.55rem_1.25rem_rgba(37,99,235,0.16)] active:translate-y-[2px]">
              <ArrowButtonContent>무료 체험 신청</ArrowButtonContent>
            </DiagnosisModalButton>
            <p className="mt-5 text-xs font-semibold text-neutral-500">
              ※ 표기된 프로그램·요금은 제작 예시용 샘플이며 실제와 다릅니다.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-[clamp(4.5rem,9vw,7rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
              REVIEW
            </p>
            <h2 className="mt-2 text-[clamp(1.8rem,3.6vw,2.75rem)] font-black leading-tight">
              회원 후기
            </h2>
          </div>

          <ul className="mt-[clamp(2rem,4.5vw,3rem)] grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-3">
            {sample.reviews.map((review) => (
              <li
                key={review}
                className="rounded-[1.75rem] border border-neutral-200 bg-white p-[clamp(1.25rem,2.5vw,1.75rem)] shadow-[0_1.4rem_3rem_rgba(15,23,42,0.06)]"
              >
                <p className="text-amber-400" aria-label="별점 5점">
                  ★★★★★
                </p>
                <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold leading-relaxed text-neutral-700">
                  “{review}”
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-neutral-100 px-4 py-[clamp(4.5rem,9vw,7rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[clamp(0.8rem,1.35vw,0.92rem)] font-black text-blue-600">
            RESERVATION
          </p>
          <h2 className="mt-2 text-[clamp(1.8rem,3.6vw,2.75rem)] font-black leading-tight">
            {sample.reservationTitle}
          </h2>
          <p className="mt-4 text-[clamp(0.9rem,1.45vw,1rem)] font-bold text-neutral-600">
            원하는 날짜와 시간대를 선택해 보세요
          </p>

          <div className="mx-auto mt-[clamp(2rem,4.5vw,3rem)] max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-[clamp(1.4rem,3vw,2rem)] text-left shadow-[0_2rem_4rem_rgba(15,23,42,0.08)]">
            <div className="mb-5 flex items-center gap-2 text-sm font-black text-neutral-800">
              <CalendarDays
                size="1em"
                className="text-blue-600"
                aria-hidden="true"
              />
              날짜
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {RESERVATION_DATES.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-black transition-[background-color,border-color,color,transform] duration-200 hover:translate-y-[1px] active:translate-y-[2px] ${
                    date === selectedDate
                      ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-800"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>

            <div className="mb-5 mt-7 flex items-center gap-2 text-sm font-black text-neutral-800">
              <Clock3 size="1em" className="text-blue-600" aria-hidden="true" />
              시간대
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {RESERVATION_TIMES.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-black transition-[background-color,border-color,color,transform] duration-200 hover:translate-y-[1px] active:translate-y-[2px] ${
                    time === selectedTime
                      ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-800"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsReservationOpen(true)}
              className="group mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black text-white transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-blue-800 hover:shadow-[0_0.55rem_1.25rem_rgba(37,99,235,0.16)] active:translate-y-[2px]"
            >
              <ArrowButtonContent>
                {selectedReservation} 예약하기
              </ArrowButtonContent>
            </button>
          </div>
        </div>
      </section>

      {isReservationOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-neutral-950/58 px-4 backdrop-blur-[1px]"
          role="dialog"
          aria-modal="true"
          aria-label="예약 요청 완료"
        >
          <div className="relative w-full max-w-[24rem] rounded-[2rem] bg-white px-[clamp(1.4rem,4vw,2rem)] py-[clamp(1.75rem,5vw,2.25rem)] text-center text-neutral-950 shadow-[0_2rem_5rem_rgba(15,23,42,0.25)]">
            <button
              type="button"
              onClick={() => setIsReservationOpen(false)}
              className="absolute right-5 top-5 inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-neutral-500 transition-[background-color,color,transform] duration-200 hover:translate-y-[1px] hover:bg-neutral-100 hover:text-neutral-950 active:translate-y-[2px]"
              aria-label="예약 완료 창 닫기"
            >
              <X size="1.15rem" aria-hidden="true" />
            </button>

            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Check size="1.8rem" strokeWidth={3} aria-hidden="true" />
            </span>

            <h3 className="mt-6 text-[clamp(1.1rem,2.5vw,1.3rem)] font-black">
              예약 요청 완료
            </h3>
            <p className="mt-4 text-[clamp(0.88rem,1.6vw,1rem)] font-bold leading-relaxed text-neutral-700">
              {selectedReservation} 예약이 접수되었습니다.
            </p>
            <p className="mt-4 text-xs font-semibold text-neutral-500">
              ※ 제작 예시 데모입니다. 실제 예약은 진행되지 않습니다.
            </p>

            <button
              type="button"
              onClick={openDiagnosisModal}
              className="mt-7 inline-flex w-full cursor-pointer items-center justify-center rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black text-white transition-[background-color,transform,box-shadow] duration-200 hover:translate-y-[1px] hover:bg-blue-800 hover:shadow-[0_0.55rem_1.25rem_rgba(37,99,235,0.16)] active:translate-y-[2px]"
            >
              실제 상담 신청하기
            </button>
          </div>
        </div>
      )}

      <section className="bg-neutral-950 px-4 py-[clamp(5rem,10vw,8rem)] text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-keep max-w-3xl text-[clamp(1.95rem,4.2vw,3.55rem)] font-black leading-[1.18]">
            {item.title} 홈페이지, 지금 무료로 진단받으세요
          </h2>
          <p className="text-keep mt-[clamp(1.3rem,2.8vw,2rem)] max-w-3xl text-[clamp(0.95rem,1.7vw,1.2rem)] font-bold leading-relaxed text-white/62">
            회원 문의·예약 구조까지, 무료 진단으로 견적과 제작 방향을 안내해
            드립니다.
          </p>

          <div className="mt-[clamp(1.7rem,3.5vw,2.5rem)] flex flex-wrap gap-3">
            <DiagnosisModalButton className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-[clamp(1.25rem,2.5vw,1.75rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-neutral-950 transition-[background-color,transform] duration-200 hover:translate-y-[1px] hover:bg-neutral-200 active:translate-y-[2px]">
              <ArrowButtonContent>무료 진단 신청</ArrowButtonContent>
            </DiagnosisModalButton>
            <a
              href="tel:01029717280"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/16 bg-white/5 px-[clamp(1.1rem,2.3vw,1.55rem)] py-[clamp(0.9rem,1.7vw,1.1rem)] text-[clamp(0.9rem,1.55vw,1rem)] font-black text-white transition-[background-color,transform,border-color] duration-200 hover:translate-y-[1px] hover:border-white/24 hover:bg-black/25 active:translate-y-[2px]"
            >
              <Phone size="1em" aria-hidden="true" />
              010-2971-7280
            </a>
          </div>
        </div>
      </section>

      <div className="bg-white px-4 py-[clamp(1.8rem,4vw,2.5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/cases"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.85rem,1.4vw,0.95rem)] font-bold text-neutral-700 transition-colors duration-200 hover:text-blue-600"
          >
            <ArrowLeft
              size="1em"
              className="transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            다른 업종 사례 보기
          </Link>

          <a
            href={blogHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 text-[clamp(0.85rem,1.4vw,0.95rem)] font-bold text-blue-600 transition-colors duration-200 hover:text-blue-800"
          >
            블로그에서 실제 제작기 보기
            <ArrowRight
              size="1em"
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </article>
  );
}
