'use client';

import { useState, useEffect } from 'react';
import FormField from '@/components/ui/FormField';
import { STICKY_FORM } from '@/data/commonText';

export default function FormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', type: '', industry: '', request: '', agree: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const openModal = () => setIsOpen(true);

    // custom event (버튼 onClick에서 dispatch)
    window.addEventListener('open-diagnosis-modal', openModal);

    // /#form 또는 #form 링크 클릭 전역 인터셉트
    const interceptFormLinks = (e) => {
      const link = e.target.closest('a[href="#form"], a[href="/#form"]');
      if (link) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    document.addEventListener('click', interceptFormLinks);

    return () => {
      window.removeEventListener('open-diagnosis-modal', openModal);
      document.removeEventListener('click', interceptFormLinks);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  function close() {
    setIsOpen(false);
    setSubmitted(false);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.agree) return alert('개인정보 수집 및 상담 동의에 체크해 주세요.');

    setSubmitting(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: '무료진단 모달',
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data.message || '접수 중 문제가 발생했습니다.');
        return;
      }

      setSubmitted(true);
    } catch {
      alert('접수 요청 중 문제가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={close}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-md bg-slate-900/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 shadow-2xl shadow-black/50 animate-modal-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="diagnosis-modal-title"
      >
        {/* 상단 글로우 */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-16 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* X 아이콘 버튼 — 클릭 가능 (z-20) */}
        <button
          onClick={close}
          className="absolute top-2.5 right-2.5 z-20 text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors p-2.5 rounded-lg"
          aria-label="닫기"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="text-center py-10" aria-live="polite">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-lg font-bold text-white mb-2">접수 완료!</h3>
            <p className="text-sm text-slate-400">빠른 시간 내에 연락드리겠습니다.</p>
          </div>
        ) : (
          <>
            <div className="relative z-10 mb-5">
              <p className="text-xs text-blue-400 font-semibold tracking-wider uppercase mb-1">{STICKY_FORM.title}</p>
              <h3 id="diagnosis-modal-title" className="text-lg font-bold text-white">{STICKY_FORM.subtitle}</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
              <FormField id="diagnosis-name" label={STICKY_FORM.fields.name.label}>
                <input
                  id="diagnosis-name"
                  type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder={STICKY_FORM.fields.name.placeholder} required
                  className="w-full bg-slate-800/60 border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500"
                />
              </FormField>

              <FormField id="diagnosis-phone" label={STICKY_FORM.fields.phone.label}>
                <input
                  id="diagnosis-phone"
                  type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder={STICKY_FORM.fields.phone.placeholder} required
                  className="w-full bg-slate-800/60 border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500"
                />
              </FormField>

              <FormField id="diagnosis-type" label={STICKY_FORM.fields.type.label}>
                <select
                  id="diagnosis-type"
                  name="type" value={form.type} onChange={handleChange} required
                  className="w-full bg-slate-800/60 border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white"
                >
                  <option value="">선택해주세요</option>
                  {STICKY_FORM.fields.type.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </FormField>

              <FormField id="diagnosis-industry" label={STICKY_FORM.fields.industry.label}>
                <input
                  id="diagnosis-industry"
                  type="text" name="industry" value={form.industry} onChange={handleChange}
                  placeholder={STICKY_FORM.fields.industry.placeholder} required
                  className="w-full bg-slate-800/60 border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500"
                />
              </FormField>

              <FormField id="diagnosis-request" label={STICKY_FORM.fields.request.label}>
                <textarea
                  id="diagnosis-request"
                  name="request" value={form.request} onChange={handleChange}
                  placeholder={STICKY_FORM.fields.request.placeholder} rows={3}
                  className="w-full bg-slate-800/60 border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 resize-none"
                />
              </FormField>

              <label htmlFor="diagnosis-agree" className="flex items-start gap-2 cursor-pointer">
                <input
                  id="diagnosis-agree"
                  type="checkbox" name="agree" checked={form.agree} onChange={handleChange}
                  className="mt-0.5 accent-blue-500"
                />
                <span className="text-xs text-slate-400">{STICKY_FORM.fields.agree}</span>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="w-full gradient-blue text-white font-bold py-3 rounded-xl text-sm mt-2"
              >
                {submitting ? '접수 중...' : STICKY_FORM.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
