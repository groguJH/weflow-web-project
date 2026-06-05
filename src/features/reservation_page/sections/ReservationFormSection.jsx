'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  CalendarDays,
  Clock,
  User,
  Phone,
  Briefcase,
  FileText,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Star,
} from 'lucide-react';
import FormField from '@/components/ui/FormField';
import { RESERVATION_PAGE } from '@/data/reservationText';

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];
const CUSTOM_HOURS = Array.from({ length: 24 }, (_, hour) => String(hour).padStart(2, '0'));
const CUSTOM_MINUTES = Array.from({ length: 60 }, (_, minute) => String(minute).padStart(2, '0'));

const Calendar = dynamic(() => import('./CalendarPicker'), {
  ssr: false,
  loading: () => <div className="min-h-[21.25rem]" />,
});

function formatDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatCustomTime(hour, minute) {
  if (!hour || !minute) return '';
  return `${hour}:${minute}`;
}

function StepBadge({ number }) {
  return (
    <div className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
      <span className="text-xs font-black text-cyan-400">{number}</span>
    </div>
  );
}

export default function ReservationFormSection() {
  "use no memo";
  const { form, timeSlots } = RESERVATION_PAGE;

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [customHour, setCustomHour] = useState('');
  const [customMinute, setCustomMinute] = useState('');
  const [formData, setFormData] = useState({
    name: '', phone: '', type: '', industry: '', request: '', agree: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleDateSelect(date) {
    setSelectedDate(date);
    setSelectedTime('');
    setCustomHour('');
    setCustomMinute('');
  }

  function handleTimeSelect(time) {
    setSelectedTime(time);
    setCustomHour('');
    setCustomMinute('');
  }

  function handleCustomTimeSelect(e) {
    const { name, value } = e.target;
    const nextHour = name === 'customHour' ? value : customHour;
    const nextMinute = name === 'customMinute' ? value : customMinute;

    setCustomHour(nextHour);
    setCustomMinute(nextMinute);
    setSelectedTime(formatCustomTime(nextHour, nextMinute));
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return alert('날짜와 시간대를 선택하거나 입력해 주세요.');
    if (!formData.agree) return alert('개인정보 수집 및 상담 동의에 체크해 주세요.');

    setSubmitting(true);
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          preferredDate: formatDateValue(selectedDate),
          preferredTime: selectedTime,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data.message || '예약 접수 중 문제가 발생했습니다.');
        return;
      }

      setSubmitted(true);
    } catch {
      alert('예약 요청 중 문제가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  }

  const scheduleLabel = selectedDate
    ? `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 (${DAY_NAMES[selectedDate.getDay()]})${selectedTime ? ' ' + selectedTime : ''}`
    : null;

  if (submitted) {
    return (
      <section className="min-h-screen pt-28 flex items-center justify-center px-4 relative overflow-hidden" aria-live="polite">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/6 rounded-full blur-3xl pointer-events-none" />
        <article className="relative text-center max-w-md bg-slate-900/70 backdrop-blur-sm border border-white/[0.07] rounded-3xl p-12">
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size="1em" className="text-[2rem] text-cyan-400" aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-black text-white mb-3">예약이 완료되었습니다!</h2>
          <p className="text-slate-400 text-sm mb-4">빠른 시간 내에 연락드리겠습니다.</p>
          {scheduleLabel && (
            <div className="px-4 py-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-sm text-cyan-300">
              {scheduleLabel}
            </div>
          )}
          <Link
            href="/"
            className="mt-6 inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-xl border border-white/[0.08] bg-slate-900/70 px-6 py-3 text-sm font-bold text-white transition-[background-color,color] duration-200 hover:bg-slate-800/95 hover:text-white"
          >
            홈으로 가기
          </Link>
        </article>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden" aria-labelledby="reservation-page-title">
      <div className="absolute -top-20 right-0 w-[37.5rem] h-[37.5rem] bg-cyan-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[31.25rem] h-48 bg-blue-700/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto">

        <div className="mb-10 flex flex-col items-center text-center">
          <span className="px-4 py-1.5 rounded-full border border-cyan-800/50 bg-cyan-900/20 text-cyan-400 text-xs font-semibold mb-5">
            무료 상담 예약 &nbsp;·&nbsp; 24시간 내 연락 &nbsp;·&nbsp; 맞춤 견적 제공
          </span>
          <h1 id="reservation-page-title" className="text-3xl sm:text-5xl font-black mb-4 text-white">
            {RESERVATION_PAGE.title}
          </h1>
          <p className="text-slate-400 text-xs mb-3">{RESERVATION_PAGE.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Zap size="1em" className="text-[0.875rem] text-yellow-400" aria-hidden="true" />
              평균 24시간 내 연락
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size="1em" className="text-[0.875rem] text-cyan-400" aria-hidden="true" />
              무료 진단 포함
            </span>
            <span className="flex items-center gap-1.5">
              <Star size="1em" className="text-[0.875rem] text-amber-400" aria-hidden="true" />
              케어 플랜 상담 가능
            </span>
          </div>
        </div>

        <div className="space-y-5">

          {/* Step 1: 날짜 선택 */}
          <section className="bg-slate-900/70 backdrop-blur-sm border border-white/[0.07] rounded-2xl p-6" aria-labelledby="reservation-date-title">
            <div className="flex items-center gap-3 mb-6">
              <StepBadge number="1" />
              <CalendarDays size="1em" className="text-[1.125rem] text-cyan-400" aria-hidden="true" />
              <h2 id="reservation-date-title" className="text-base font-bold text-white">날짜 선택</h2>
            </div>
            <Calendar selectedDate={selectedDate} onSelect={handleDateSelect} />
          </section>

          {/* Step 2: 시간 선택 */}
          <section className={`bg-slate-900/70 backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 ${
            selectedDate ? 'border-white/[0.07]' : 'border-white/[0.04] opacity-50'
          }`} aria-labelledby="reservation-time-title">
            <div className="flex items-center gap-3 mb-6">
              <StepBadge number="2" />
              <Clock size="1em" className={`text-[1.125rem] ${selectedDate ? 'text-cyan-400' : 'text-slate-600'}`} aria-hidden="true" />
              <h2 id="reservation-time-title" className={`text-base font-bold ${selectedDate ? 'text-white' : 'text-slate-600'}`}>
                시간 선택
              </h2>
            </div>

            {!selectedDate ? (
              <div className="py-8 text-center">
                <CalendarDays size="1em" className="text-[1.75rem] text-slate-700 mx-auto mb-3" aria-hidden="true" />
                <p className="text-sm text-slate-600">먼저 날짜를 선택해 주세요</p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {timeSlots.map((time) => {
                    const isSelectedSlot = selectedTime === time && !customHour && !customMinute;

                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => handleTimeSelect(time)}
                        aria-pressed={isSelectedSlot}
                        className={`py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                          isSelectedSlot
                            ? 'bg-cyan-500/20 border border-cyan-500/60 text-cyan-300 shadow-sm shadow-cyan-500/20'
                            : 'bg-slate-800/60 border border-white/[0.06] text-slate-300 hover:border-cyan-500/30 hover:text-cyan-300 hover:bg-cyan-500/5'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>

                <div>
                  <label
                    htmlFor="reservation-custom-hour"
                    className="mb-2 block text-xs font-bold text-slate-300"
                  >
                    {form.timePrefer.label} 직접 선택
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      id="reservation-custom-hour"
                      name="customHour"
                      value={customHour}
                      onChange={handleCustomTimeSelect}
                      className="w-full rounded-xl border border-white/[0.08] bg-slate-800/60 px-4 py-3 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"
                    >
                      <option value="">{form.timePrefer.hourPlaceholder}</option>
                      {CUSTOM_HOURS.map((hour) => (
                        <option key={hour} value={hour}>{hour}시</option>
                      ))}
                    </select>
                    <select
                      id="reservation-custom-minute"
                      name="customMinute"
                      value={customMinute}
                      onChange={handleCustomTimeSelect}
                      className="w-full rounded-xl border border-white/[0.08] bg-slate-800/60 px-4 py-3 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"
                    >
                      <option value="">{form.timePrefer.minutePlaceholder}</option>
                      {CUSTOM_MINUTES.map((minute) => (
                        <option key={minute} value={minute}>{minute}분</option>
                      ))}
                    </select>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    시간 슬롯이 맞지 않으면 원하는 시와 분을 각각 선택해 주세요.
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* 선택된 일정 요약 */}
          {selectedDate && (
            <aside className={`flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-300 ${
              selectedTime
                ? 'bg-cyan-500/10 border-cyan-500/30'
                : 'bg-slate-900/50 border-white/[0.06]'
            }`} aria-live="polite">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                selectedTime ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'
              }`} />
              <div>
                <p className="text-xs text-slate-500 mb-0.5">선택된 일정</p>
                <p className={`text-sm font-semibold ${selectedTime ? 'text-cyan-300' : 'text-slate-400'}`}>
                  {scheduleLabel}
                  {!selectedTime && <span className="text-slate-600"> — 시간을 선택해 주세요</span>}
                </p>
              </div>
            </aside>
          )}

          {/* Step 3: 상담 신청 폼 */}
          <section className="bg-slate-900/70 backdrop-blur-sm border border-white/[0.07] rounded-2xl p-6" aria-labelledby="reservation-info-title">
            <div className="flex items-center gap-3 mb-6">
              <StepBadge number="3" />
              <FileText size="1em" className="text-[1.125rem] text-cyan-400" aria-hidden="true" />
              <h2 id="reservation-info-title" className="text-base font-bold text-white">상담 신청 정보</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <FormField id="reservation-name" label={form.name.label} icon={User}>
                <input
                  id="reservation-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={form.name.placeholder}
                  required
                  className="w-full bg-slate-800/60 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 transition-colors"
                />
              </FormField>

              <FormField id="reservation-phone" label={form.phone.label} icon={Phone}>
                <input
                  id="reservation-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={form.phone.placeholder}
                  required
                  className="w-full bg-slate-800/60 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 transition-colors"
                />
              </FormField>

              <FormField id="reservation-type" label={form.type.label} icon={Briefcase}>
                <select
                  id="reservation-type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800/60 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white transition-colors"
                >
                  <option value="">선택해주세요</option>
                  {form.type.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </FormField>

              <FormField id="reservation-industry" label={form.industry.label} icon={Briefcase}>
                <input
                  id="reservation-industry"
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder={form.industry.placeholder}
                  required
                  className="w-full bg-slate-800/60 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 transition-colors"
                />
              </FormField>

              <FormField id="reservation-request" label={form.request.label} icon={FileText}>
                <textarea
                  id="reservation-request"
                  name="request"
                  value={formData.request}
                  onChange={handleChange}
                  placeholder={form.request.placeholder}
                  rows={4}
                  className="w-full bg-slate-800/60 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 transition-colors resize-none"
                />
              </FormField>

              <label htmlFor="reservation-agree" className="flex items-start gap-3 cursor-pointer group">
                <input
                  id="reservation-agree"
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="mt-0.5 accent-cyan-500 w-4 h-4 flex-shrink-0"
                />
                <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                  {form.agree}
                </span>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="w-full gradient-blue text-white font-black py-4 rounded-xl text-sm tracking-wide mt-2"
              >
                {submitting ? '예약 접수 중...' : form.submit}
              </button>
            </form>
          </section>

        </div>
      </div>
    </section>
  );
}

