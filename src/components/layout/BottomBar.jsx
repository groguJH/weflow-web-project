'use client';

import Link from 'next/link';
import { BOTTOM_BAR } from '@/data/commonText';

function getLinkProps(href) {
  if (!href?.startsWith('http')) return {};

  return {
    target: '_blank',
    rel: 'noopener noreferrer',
  };
}

export default function BottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0f1e] border-t border-slate-800 pb-safe">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4">
          {BOTTOM_BAR.map((item) =>
            item.modal ? (
              <button
                key={item.label}
                onClick={() => window.dispatchEvent(new Event('open-diagnosis-modal'))}
                className="flex flex-col items-center justify-center py-3 gap-1 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors w-full"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs font-medium text-center leading-tight">{item.label}</span>
              </button>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center py-3 gap-1 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                {...getLinkProps(item.href)}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs font-medium text-center leading-tight">{item.label}</span>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
