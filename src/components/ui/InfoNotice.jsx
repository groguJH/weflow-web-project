import { Info } from 'lucide-react';

export default function InfoNotice({ children, className = '' }) {
  return (
    <aside
      className={`inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/40 px-4 py-2 text-xs text-slate-400 ${className}`}
    >
      <Info size="1em" className="text-[0.8125rem] flex-shrink-0 text-slate-500" aria-hidden="true" />
      <span>{children}</span>
    </aside>
  );
}
