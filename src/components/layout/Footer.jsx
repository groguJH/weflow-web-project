import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { FOOTER } from '@/data/commonText';

function getLinkProps(href) {
  if (!href?.startsWith('http')) return {};

  return {
    target: '_blank',
    rel: 'noopener noreferrer',
  };
}

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0f1e] border-t border-slate-800 pt-12 pb-6 mt-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[0.0625rem] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="w-full px-8 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          <section className="flex flex-col" aria-labelledby="footer-brand">
            <Link href="/" aria-label="WEFLOW 홈으로 이동">
              <Image src="/logo_icon.png" alt="WEFLOW" width={40} height={40} className="size-10 object-contain" />
            </Link>
            <h2 id="footer-brand" className="sr-only">WEFLOW 회사 정보</h2>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed whitespace-pre-line">
              {FOOTER.tagline}
            </p>
            <address className="mt-5 space-y-1.5 text-xs text-slate-500 not-italic">
              <p>{FOOTER.info.ceo}</p>
              <p>{FOOTER.info.bizNo}</p>
              <p>{FOOTER.info.email}</p>
              <p>{FOOTER.info.hours}</p>
            </address>
            <div className="mt-6 pt-5 border-t border-white/[0.06]">
              <nav className="flex items-center gap-3 mb-2" aria-label="약관 메뉴">
                {FOOTER.legal.map((item, i) => (
                  <span key={item.href} className="flex items-center gap-3">
                    <Link href={item.href} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">{item.label}</Link>
                    {i < FOOTER.legal.length - 1 && <span className="text-slate-700" aria-hidden="true">|</span>}
                  </span>
                ))}
              </nav>
              <p className="text-xs text-slate-600">{FOOTER.copyright}</p>
            </div>
          </section>

          <div className="md:col-span-3 flex gap-10 md:pt-16 md:pl-32">
            <nav className="flex-1" aria-label={FOOTER.links.service.title}>
              <h2 className="text-sm font-semibold text-white mb-4">{FOOTER.links.service.title}</h2>
              <ul className="space-y-2.5">
                {FOOTER.links.service.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="flex-1" aria-label={FOOTER.links.carePlan.title}>
              <h2 className="text-sm font-semibold text-white mb-4">{FOOTER.links.carePlan.title}</h2>
              <ul className="space-y-2.5">
                {FOOTER.links.carePlan.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="flex-1" aria-label={FOOTER.links.contact.title}>
              <h2 className="text-sm font-semibold text-white mb-4">{FOOTER.links.contact.title}</h2>
              <ul className="space-y-2.5">
                {FOOTER.links.contact.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
                      {...getLinkProps(item.href)}
                    >
                      {item.label}
                      <ExternalLink size="1em" className="text-[0.6875rem] text-slate-600" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

          </div>

        </div>
      </div>
    </footer>
  );
}
