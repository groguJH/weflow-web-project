import { MessageSquare, LayoutTemplate, Palette, Code2, Rocket, TrendingUp, ChevronRight, ChevronDown } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { SERVICE_PROCESS } from '@/data/servicesText';

const ICONS = [MessageSquare, LayoutTemplate, Palette, Code2, Rocket, TrendingUp];

function StepCard({ step, icon: Icon }) {
  return (
    <article className="relative bg-slate-900/60 backdrop-blur-sm border border-white/[0.07] rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 overflow-hidden h-full">
      <span className="absolute right-4 top-2 text-8xl font-black text-white/[0.035] select-none leading-none pointer-events-none">
        {step.number}
      </span>
      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-5 shadow-lg shadow-blue-500/10">
        <Icon size="1em" className="text-[1.125rem] text-cyan-400" aria-hidden="true" />
      </div>
      <p className="text-xs text-cyan-500 font-bold mb-1.5">{step.number}</p>
      <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
    </article>
  );
}

function Arrow() {
  return (
    <li className="flex items-center justify-center py-2 md:py-0 md:px-3" aria-hidden="true">
      <ChevronDown size="1em" className="text-[1.125rem] md:hidden text-blue-500/50" aria-hidden="true" />
      <ChevronRight size="1em" className="text-[1.125rem] hidden md:inline text-blue-500/50" aria-hidden="true" />
    </li>
  );
}

function buildRow(steps, iconOffset) {
  const items = [];
  steps.forEach((step, idx) => {
    items.push(
      <li key={step.number}>
        <StepCard step={step} icon={ICONS[iconOffset + idx]} />
      </li>
    );
    if (idx < 2) items.push(<Arrow key={`arrow-${iconOffset}-${idx}`} />);
  });
  return items;
}

export default function ServiceProcessSection() {
  const { steps } = SERVICE_PROCESS;

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden" aria-labelledby="service-process-title">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <SectionHeader
          titleId="service-process-title"
          eyebrow="Process"
          title="6단계 제작 프로세스"
          description="체계적인 프로세스로 완성도 높은 결과를 만들어 드립니다"
          className="mb-12"
          titleClassName="text-3xl sm:text-4xl"
        />

        <ol className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
          {buildRow(steps.slice(0, 3), 0)}
        </ol>

        <div className="flex justify-center my-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-slate-900/70 text-slate-400 text-xs font-medium">
            <span className="text-blue-400" aria-hidden="true">※</span> 다음 단계로 진행
          </span>
        </div>

        <ol start={4} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
          {buildRow(steps.slice(3, 6), 3)}
        </ol>
      </div>
    </section>
  );
}
