'use client';

export default function DiagnosisModalButton({
  children,
  className = '',
}) {
  function openDiagnosisModal() {
    window.dispatchEvent(new Event('open-diagnosis-modal'));
  }

  return (
    <button
      type="button"
      onClick={openDiagnosisModal}
      className={className}
    >
      {children}
    </button>
  );
}
