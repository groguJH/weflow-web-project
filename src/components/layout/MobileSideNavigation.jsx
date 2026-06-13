"use client";

import Link from "next/link";

export default function MobileSideNavigation({
  isOpen,
  navLinks,
  pathname,
  ctaLabel,
  onClose,
  onOpenDiagnosis,
}) {
  const tabIndex = isOpen ? undefined : -1;

  return (
    <div
      className={`fixed inset-0 z-[60] md:hidden ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-slate-950/58 backdrop-blur-[1px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-label="모바일 메뉴 닫기"
        tabIndex={tabIndex}
      />

      <nav
        id="mobile-navigation"
        className={`absolute bottom-0 right-0 top-0 flex w-[min(16.5rem,68vw)] flex-col items-stretch overflow-y-auto border-l border-cyan-300/12 bg-[#10182a]/96 px-[clamp(1.45rem,6vw,2rem)] py-[clamp(3.25rem,11vw,4.25rem)] text-left shadow-2xl shadow-slate-950/40 backdrop-blur-xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="모바일 주요 메뉴"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.12),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0.05),rgba(15,23,42,0.42))]" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 cursor-pointer rounded-full p-1.5 text-slate-300 transition-colors duration-200 hover:text-white"
          aria-label="모바일 메뉴 닫기"
          tabIndex={tabIndex}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="relative z-10 flex flex-col gap-[clamp(1rem,4vw,1.35rem)]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-keep w-fit text-[clamp(0.9rem,3.7vw,1.05rem)] font-black leading-tight text-slate-100 transition-colors duration-200 hover:text-cyan-300 ${
                pathname === link.href ? "text-cyan-300" : ""
              }`}
              onClick={onClose}
              tabIndex={tabIndex}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={onOpenDiagnosis}
          className="mobile-side-cta relative z-10 mt-[clamp(1.8rem,7vw,2.5rem)] w-full cursor-pointer rounded-full px-4 py-2.5 text-center text-[clamp(0.8125rem,3.3vw,0.9375rem)] font-black text-white"
          tabIndex={tabIndex}
        >
          <span>{ctaLabel}</span>
        </button>
      </nav>
    </div>
  );
}
