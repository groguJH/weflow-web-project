'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];
const MONTH_NAMES = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월',
];

export default function CalendarPicker({ selectedDate, onSelect }) {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const isCurrentMonth =
    year === today.getFullYear() && month === today.getMonth();

  function goToPrev(e) {
    e.preventDefault();
    if (isCurrentMonth) return;
    setCurrentDate(new Date(year, month - 1, 1));
  }

  function goToNext(e) {
    e.preventDefault();
    setCurrentDate(new Date(year, month + 1, 1));
  }

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  function isSelected(day) {
    if (!day || !selectedDate) return false;
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  }

  function isPast(day) {
    if (!day) return false;
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    return d < today;
  }

  function isToday(day) {
    if (!day) return false;
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={goToPrev}
          disabled={isCurrentMonth}
          className={`p-2 rounded-lg transition-colors ${
            isCurrentMonth
              ? 'text-slate-700 cursor-not-allowed'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
          }`}
        >
          <ChevronLeft size="1em" className="text-[1.125rem]" />
        </button>
        <span className="text-base font-bold text-white">
          {year}년 {MONTH_NAMES[month]}
        </span>
        <button
          type="button"
          onClick={goToNext}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <ChevronRight size="1em" className="text-[1.125rem]" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {DAY_NAMES.map((d, i) => (
          <div
            key={d}
            className={`text-center text-xs font-medium py-1 ${
              i === 0 ? 'text-red-400/60' : i === 6 ? 'text-blue-400/60' : 'text-slate-500'
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          const colIndex = idx % 7;
          const isSun = colIndex === 0;
          const isSat = colIndex === 6;
          const past = isPast(day);
          const selected = isSelected(day);
          const todayFlag = isToday(day);

          let cls =
            'relative aspect-square flex items-center justify-center rounded-full text-xs font-medium transition-all duration-150 ';

          if (!day) {
            cls += 'invisible';
          } else if (past) {
            cls += 'text-slate-700 cursor-not-allowed';
          } else if (selected) {
            cls += 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 scale-105';
          } else {
            cls += `cursor-pointer hover:bg-white/[0.08] ${
              isSun ? 'text-red-400' : isSat ? 'text-blue-400' : 'text-slate-200'
            }`;
            if (todayFlag) cls += ' ring-1 ring-cyan-500/50';
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={!day || past}
              onClick={() => day && !past && onSelect(new Date(year, month, day))}
              className={cls}
            >
              {day}
              {todayFlag && !selected && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
