'use client';

import { useState } from 'react';
import { AlignLeft } from 'lucide-react';
import FormField from '@/components/ui/FormField';
import { STICKY_FORM } from '@/data/commonText';

export default function StickyForm({ id = 'sticky-form' }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    type: STICKY_FORM.fields.type.defaultOption,
    industry: '',
    request: '',
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.agree) return alert('개인정보 수집 및 이용에 동의해 주세요.');
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section id={id} className="bg-[#080c18] border border-white/[0.08] rounded-2xl p-8 text-center" aria-live="polite">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-lg font-bold text-white mb-2">접수 완료!</h3>
        <p className="text-sm text-slate-400">빠른 시간 내에 연락드리겠습니다.</p>
      </section>
    );
  }

  const inputClass =
    'w-full bg-[#0d1220] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 transition-colors';

  return (
    <section id={id} className="bg-[#080c18] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-black/40" aria-labelledby={`${id}-title`}>
      <header className="px-6 pt-6 pb-5">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
            <AlignLeft size="1em" className="text-[1.125rem] text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 id={`${id}-title`} className="text-base font-bold text-white leading-tight">{STICKY_FORM.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{STICKY_FORM.subtitle}</p>
          </div>
        </div>
      </header>

      <div className="h-[0.0625rem] bg-white/[0.06]" />

      <form onSubmit={handleSubmit} className="px-6 pt-5 pb-6 space-y-4">
        <FormField id={`${id}-name`} label={STICKY_FORM.fields.name.label} required labelClassName="block text-sm text-slate-300">
          <input
            id={`${id}-name`}
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={STICKY_FORM.fields.name.placeholder}
            required
            className={inputClass}
          />
        </FormField>

        <FormField id={`${id}-phone`} label={STICKY_FORM.fields.phone.label} required labelClassName="block text-sm text-slate-300">
          <input
            id={`${id}-phone`}
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder={STICKY_FORM.fields.phone.placeholder}
            required
            className={inputClass}
          />
        </FormField>

        <FormField id={`${id}-type`} label={STICKY_FORM.fields.type.label} labelClassName="block text-sm text-slate-300">
          <select
            id={`${id}-type`}
            name="type"
            value={form.type}
            onChange={handleChange}
            className={inputClass}
          >
            {STICKY_FORM.fields.type.options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </FormField>

        <FormField id={`${id}-industry`} label={STICKY_FORM.fields.industry.label} labelClassName="block text-sm text-slate-300">
          <input
            id={`${id}-industry`}
            type="text"
            name="industry"
            value={form.industry}
            onChange={handleChange}
            placeholder={STICKY_FORM.fields.industry.placeholder}
            className={inputClass}
          />
        </FormField>

        <FormField id={`${id}-request`} label={STICKY_FORM.fields.request.label} labelClassName="block text-sm text-slate-300">
          <textarea
            id={`${id}-request`}
            name="request"
            value={form.request}
            onChange={handleChange}
            placeholder={STICKY_FORM.fields.request.placeholder}
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </FormField>

        <label htmlFor={`${id}-agree`} className="flex items-center gap-2.5 cursor-pointer pt-1">
          <input
            id={`${id}-agree`}
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            className="w-4 h-4 accent-blue-500 flex-shrink-0"
          />
          <span className="text-xs text-slate-400">{STICKY_FORM.fields.agree}</span>
        </label>

        <button
          type="submit"
          className="w-full gradient-blue text-white font-bold py-3.5 rounded-xl text-sm mt-2"
        >
          {STICKY_FORM.submit}
        </button>
      </form>
    </section>
  );
}
