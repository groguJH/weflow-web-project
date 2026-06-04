'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NAV } from '@/data/commonText';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1e]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 xl:px-12">
        <div className="flex h-[4.5rem] items-center justify-between">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <Image src="/logo_icon.png" alt="WEFLOW" width={52} height={52} className="size-[3.25rem] object-contain" />
            <span className="whitespace-nowrap text-[1.625rem] font-black tracking-tight">
              <span className="text-white">WE</span>
              <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">FLOW</span>
            </span>
          </Link>

          <nav className="ml-auto mr-6 hidden items-center gap-5 lg:flex xl:gap-7" aria-label="주요 메뉴">
            {NAV.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-[0.9375rem] font-semibold text-slate-300 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 lg:flex">
              {NAV.authLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex whitespace-nowrap items-center justify-center rounded-lg px-3.5 py-2 text-[0.875rem] font-semibold text-slate-300 transition-colors hover:bg-slate-800/70 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <button
              onClick={() => window.dispatchEvent(new Event('open-diagnosis-modal'))}
              className="header-cta-button hidden cursor-pointer items-center justify-center whitespace-nowrap rounded-lg px-5 py-2.5 text-[0.9375rem] font-semibold text-white sm:flex"
            >
              <span>{NAV.cta}</span>
            </button>
            <button
              className="lg:hidden p-2 text-slate-300"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="메뉴 열기"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 flex flex-col gap-3"
          aria-label="모바일 주요 메뉴"
        >
          {NAV.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-keep py-2 text-base font-semibold text-slate-300 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {NAV.authLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-keep rounded-lg border border-white/[0.08] bg-slate-950/40 px-4 py-3 text-center text-base font-semibold text-slate-200 hover:bg-slate-800/70 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <button
            onClick={() => { setMenuOpen(false); window.dispatchEvent(new Event('open-diagnosis-modal')); }}
            className="header-cta-button mt-2 cursor-pointer rounded-lg px-5 py-2.5 text-center text-base font-semibold text-white"
          >
            <span>{NAV.cta}</span>
          </button>
        </nav>
      )}
    </header>
  );
}
