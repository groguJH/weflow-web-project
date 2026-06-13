"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MobileSideNavigation from "@/components/layout/MobileSideNavigation";
import { NAV } from "@/data/commonText";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = NAV.links;
  const logoHref = "/";

  function openDiagnosisModal() {
    setMenuOpen(false);
    window.dispatchEvent(new Event("open-diagnosis-modal"));
  }

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-800 bg-[#0a0f1e]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="relative flex h-[clamp(3.875rem,8.5vw,4.5rem)] items-center justify-between gap-3">
            <Link
              href={logoHref}
              className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5"
              onClick={() => setMenuOpen(false)}
            >
              <Image
                src="/logo_icon.png"
                alt="WEFLOW"
                width={52}
                height={52}
                className="size-[clamp(2.25rem,7vw,3.25rem)] object-contain"
              />

              <span className="whitespace-nowrap text-[clamp(1.25rem,4.7vw,1.625rem)] font-black tracking-tight">
                <span className="text-white">WE</span>
                <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
                  FLOW
                </span>
              </span>
            </Link>

            <nav
              className="absolute left-1/2 top-1/2 hidden min-w-0 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-[clamp(1rem,2.1vw,2rem)] md:flex"
              aria-label="주요 메뉴"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap text-[clamp(0.8125rem,1.4vw,0.9375rem)] font-semibold tracking-normal transition-colors hover:text-white ${
                    pathname === link.href ? "text-white" : "text-slate-300"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <button
                type="button"
                className="cursor-pointer p-2 text-slate-300 md:hidden"
                onClick={() => setMenuOpen((current) => !current)}
                aria-label="메뉴 열기"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>

              <button
                type="button"
                onClick={openDiagnosisModal}
                className="header-cta-button hidden cursor-pointer items-center justify-center whitespace-nowrap rounded-lg px-[clamp(0.875rem,1.6vw,1.25rem)] py-[clamp(0.55rem,1.1vw,0.625rem)] text-[clamp(0.8125rem,1.4vw,0.9375rem)] font-semibold text-white md:flex"
              >
                <span>{NAV.cta}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileSideNavigation
        isOpen={menuOpen}
        navLinks={navLinks}
        pathname={pathname}
        ctaLabel={NAV.cta}
        onClose={() => setMenuOpen(false)}
        onOpenDiagnosis={openDiagnosisModal}
      />
    </>
  );
}
