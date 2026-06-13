'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { FLOATING_CONTACT_CARD } from '@/data/commonText';

const ICONS = {
  check: CheckCircle2,
  message: MessageCircle,
  phone: Phone,
};

const ACTION_CLASSES = {
  primary: 'quick-contact-action-primary',
  outline: 'quick-contact-action-outline',
};

function getAnchorProps(href) {
  if (!href?.startsWith('http')) return {};

  return {
    target: '_blank',
    rel: 'noopener noreferrer',
  };
}

function FloatingAction({ action, onOpenDiagnosis, isPanelOpen }) {
  const Icon = ICONS[action.icon] ?? MessageCircle;
  const className = `quick-contact-action flex h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-[0.875rem] px-3.5 text-xs font-black ${ACTION_CLASSES[action.variant] ?? ACTION_CLASSES.outline}`;
  const content = (
    <>
      <Icon size={15} strokeWidth={2.4} aria-hidden="true" />
      <span>{action.label}</span>
    </>
  );

  if (action.modal) {
    return (
      <button
        type="button"
        onClick={onOpenDiagnosis}
        className={className}
        tabIndex={isPanelOpen ? undefined : -1}
      >
        {content}
      </button>
    );
  }

  return (
    <a
      href={action.href}
      className={className}
      tabIndex={isPanelOpen ? undefined : -1}
      {...getAnchorProps(action.href)}
    >
      {content}
    </a>
  );
}

export default function FloatingQuickMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    function closeOnOutsideClick(event) {
      if (menuRef.current?.contains(event.target)) {
        return;
      }

      setIsOpen(false);
    }

    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  function openDiagnosisModal() {
    window.dispatchEvent(new Event('open-diagnosis-modal'));
  }

  return (
    <aside
      ref={menuRef}
      aria-label="빠른 상담 연결"
      className="fixed right-4 bottom-4 z-[70] flex w-[15.25rem] max-w-[calc(100vw-2rem)] flex-col gap-2.5 sm:right-6 sm:bottom-6"
    >
      <section
        id="quick-contact-panel"
        data-open={isOpen}
        aria-hidden={!isOpen}
        className="quick-contact-panel quick-contact-glass rounded-[1.375rem] p-4 text-slate-950"
      >
        <h2 className="mb-3.5 px-1 text-sm font-black leading-none tracking-normal text-slate-950">
          {FLOATING_CONTACT_CARD.title}
        </h2>
        <div className="flex flex-col gap-2.5">
          {FLOATING_CONTACT_CARD.actions.map((action) => (
            <FloatingAction
              key={action.label}
              action={action}
              onOpenDiagnosis={openDiagnosisModal}
              isPanelOpen={isOpen}
            />
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="quick-contact-shortcut quick-contact-glass flex w-full cursor-pointer items-center justify-between rounded-[1.375rem] p-4 text-left text-slate-950"
        aria-expanded={isOpen}
        aria-controls="quick-contact-panel"
      >
        <div className="min-w-0">
          <p className="quick-contact-shortcut-title text-sm font-black leading-tight text-slate-950">
            {FLOATING_CONTACT_CARD.shortcut.title}
          </p>
          <p className="quick-contact-shortcut-subtitle mt-1 text-[0.6875rem] font-semibold leading-none text-slate-500">
            {FLOATING_CONTACT_CARD.shortcut.subtitle}
          </p>
        </div>
        <span className="quick-contact-shortcut-badge ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
          {FLOATING_CONTACT_CARD.shortcut.badge}
        </span>
      </button>
    </aside>
  );
}
