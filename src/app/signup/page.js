import Link from 'next/link';

export const metadata = {
  title: 'WEFLOW 회원가입 준비 중',
  description: 'WEFLOW 회원가입 기능은 현재 준비 중입니다.',
};

export default function SignupPage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-28 sm:px-6 lg:px-8">
      <div className="absolute -top-32 right-0 h-[30rem] w-[30rem] rounded-full bg-cyan-400/8 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />

      <article className="relative w-full max-w-lg rounded-3xl border border-white/[0.08] bg-slate-900/70 p-8 text-center shadow-2xl shadow-black/40">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
          Coming Soon
        </p>
        <h1 className="text-keep text-3xl font-black text-white">
          회원가입 준비 중입니다
        </h1>
        <p className="text-pretty text-keep mt-4 text-sm leading-relaxed text-slate-400">
          현재 과제 범위에서는 관리자 로그인과 예약·문의 관리 기능을 우선 제공합니다.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/admin"
            className="inline-flex cursor-pointer items-center whitespace-nowrap rounded-xl border border-white/[0.08] bg-slate-900/70 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800"
          >
            관리자 로그인
          </Link>
          <Link
            href="/reservation"
            className="inline-flex cursor-pointer items-center whitespace-nowrap rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-500"
          >
            상담 예약하기
          </Link>
        </div>
      </article>
    </section>
  );
}
