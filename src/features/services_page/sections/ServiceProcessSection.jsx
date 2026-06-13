import {
  CheckCircle2,
  Code2,
  LayoutTemplate,
  Megaphone,
  MessageSquare,
  Palette,
  Search,
} from "lucide-react";
import { SERVICE_PROCESS } from "@/data/servicesText";

const ICONS = [
  MessageSquare,
  LayoutTemplate,
  Palette,
  Code2,
  Search,
  Megaphone,
];

function StepCard({ step, icon: Icon }) {
  const hasMultipleSubItems = Array.isArray(step.desc);

  return (
    <article className="relative min-h-[clamp(15rem,34vh,21rem)] overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-950/92 p-[clamp(1.25rem,3vw,2.35rem)] shadow-[0_1.5rem_4rem_rgba(2,6,23,0.34)] backdrop-blur-xl transition-[border-color,background-color,box-shadow] duration-300 hover:border-cyan-400/30 hover:bg-slate-900/95 hover:shadow-[0_1.75rem_4.5rem_rgba(14,165,233,0.12)]">
      <span className="pointer-events-none absolute right-[clamp(1rem,3vw,2rem)] top-[clamp(0.75rem,2vw,1.25rem)] select-none text-[clamp(4.5rem,12vw,8rem)] font-black leading-none text-white/[0.035]">
        {step.number}
      </span>

      <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-between">
        <div>
          <div className="mb-[clamp(1.25rem,3vw,2rem)] flex items-center gap-3">
            <span className="flex size-[clamp(2.65rem,5vw,3.5rem)] items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-[clamp(1rem,2vw,1.25rem)] text-cyan-300 shadow-[0_0_1.5rem_rgba(37,99,235,0.14)]">
              <Icon size="1em" aria-hidden="true" />
            </span>
            <span className="text-[clamp(0.72rem,1.25vw,0.85rem)] font-black tracking-[0.22em] text-cyan-400">
              STEP {step.number}
            </span>
          </div>

          <h3 className="text-keep text-[clamp(1.35rem,3.4vw,2.25rem)] font-black leading-tight text-white">
            {step.title}
          </h3>
          {hasMultipleSubItems ? (
            <ul className="mt-[clamp(0.75rem,1.6vw,1.1rem)] flex flex-col gap-2">
              {step.desc.map((item) => (
                <li
                  key={item}
                  className="text-keep w-fit max-w-full rounded-2xl border border-cyan-300/20 bg-cyan-300/8 px-3 py-1.5 text-[clamp(0.72rem,1.1vw,0.84rem)] font-bold leading-relaxed text-cyan-100"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-keep mt-[clamp(0.65rem,1.4vw,0.95rem)] text-[clamp(0.88rem,1.45vw,1.05rem)] font-bold leading-relaxed text-cyan-200">
              {step.desc}
            </p>
          )}
        </div>

        <div className="mt-[clamp(1.5rem,3vw,2.25rem)]">
          <p className="text-keep max-w-2xl text-[clamp(0.88rem,1.45vw,1rem)] font-medium leading-[1.8] text-slate-300">
            {step.body}
          </p>

          <ul className="mt-[clamp(1.25rem,2.5vw,1.75rem)] grid gap-[clamp(0.55rem,1.2vw,0.8rem)] sm:grid-cols-3">
            {step.points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.035] px-[clamp(0.75rem,1.6vw,1rem)] py-[clamp(0.65rem,1.3vw,0.8rem)] text-[clamp(0.74rem,1.15vw,0.86rem)] font-bold text-slate-200"
              >
                <CheckCircle2
                  size="1em"
                  className="shrink-0 text-cyan-300"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function ServiceProcessSection() {
  const { sectionTitle, sectionDescription, steps } = SERVICE_PROCESS;

  return (
    <section
      className="relative px-4 py-[clamp(5rem,10vw,8rem)] sm:px-6 lg:px-8"
      aria-labelledby="service-process-title"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        <h2
          id="service-process-title"
          className="text-keep text-center text-3xl font-black leading-tight text-white sm:text-4xl"
        >
          {sectionTitle}
        </h2>
        <p className="text-keep mx-auto mt-[clamp(1.4rem,3vw,2rem)] flex max-w-3xl flex-col gap-[clamp(0.4rem,0.9vw,0.65rem)] text-center text-[clamp(0.95rem,1.8vw,1.15rem)] font-bold leading-relaxed text-slate-300">
          {sectionDescription.map((line, idx) => (
            <span
              key={line}
              className={idx === 1 ? "text-cyan-100" : undefined}
            >
              {line}
            </span>
          ))}
        </p>

        <ol className="relative mx-auto mt-[clamp(3.5rem,8vw,6rem)] flex max-w-4xl flex-col gap-[clamp(3rem,9vh,5.5rem)] pb-[clamp(7rem,18vh,12rem)]">
          {steps.map((step, idx) => (
            <li
              key={step.number}
              className="sticky"
              style={{
                top: `calc(var(--sticky-sidebar-top, 5rem) + ${idx * 0.45}rem)`,
                zIndex: idx + 1,
              }}
            >
              <StepCard step={step} icon={ICONS[idx]} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
