export const RESERVATION_PAGE = {
  title: "예약",
  subtitle:
    "원하시는 날짜와 시간대를 선택해 무료 상담을 예약하면 맞춤 견적을 제공합니다.",
  timeSlots: [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
  ],
  form: {
    name: { label: "이름", placeholder: "이름을 입력해주세요" },
    phone: { label: "연락처", placeholder: "연락처를 입력해주세요" },
    type: {
      label: "제작종류",
      options: [
        "랜딩 페이지 제작",
        "홈페이지 제작",
        "랜딩 & 홈페이지 제작",
        "기타 (WEFLOW 케어플랜)",
      ],
    },
    timePrefer: {
      label: "원하시는 시간대",
      placeholder: " 예) 오전 10시 30분 이후, 오후 2시 이후 ...",
    },
    industry: {
      label: "업종",
      placeholder: "예: 피트니스, 카페, 학원, 부동산...",
    },
    request: {
      label: "추가요청사항",
      placeholder: "추가 요청사항을 입력해주세요",
    },
    agree: "개인정보 수집 및 상담 동의",
    submit: "무료 진단 후 견적 받기",
  },
};
