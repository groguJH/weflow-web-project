'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  CheckCircle2,
  Code2,
  LayoutTemplate,
  Megaphone,
  MessageSquare,
  Palette,
  Search,
  Tag,
  TrendingUp,
  User,
} from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { PROCESS } from '@/data/homeText';

const STEP_ICONS = {
  message: MessageSquare,
  layout: LayoutTemplate,
  palette: Palette,
  code: Code2,
  search: Search,
  megaphone: Megaphone,
  user: User,
  tag: Tag,
  check: CheckCircle2,
  trending: TrendingUp,
};

function ProcessListPanel({ titleId, title, sub, steps, numbered = false }) {
  return (
    <div className="flex min-w-0 flex-col">
      <div className="mb-[clamp(1.25rem,3vw,2rem)] text-center">
        <h2
          id={titleId}
          className="text-keep text-[clamp(1.55rem,3.8vw,2.5rem)] font-black leading-tight text-white"
        >
          {title}
        </h2>
        <p className="text-keep mt-2 text-[clamp(0.78rem,1.4vw,0.95rem)] font-semibold leading-[1.55] text-slate-400">
          {sub}
        </p>
      </div>

      <ol className="grid gap-[clamp(0.75rem,1.8vw,1.125rem)]">
        {steps.map((step, idx) => {
          const Icon = STEP_ICONS[step.icon] ?? MessageSquare;
          const marker = numbered ? step.number : null;

          return (
            <li
              key={marker || step.label}
              className="grid grid-cols-[clamp(3rem,6.5vw,3.75rem)_1fr] items-center gap-[clamp(0.75rem,1.8vw,1rem)]"
            >
              <div className="relative flex justify-center self-stretch">
                {idx < steps.length - 1 && (
                  <span className="absolute top-[clamp(3rem,6.5vw,3.75rem)] bottom-[-0.75rem] w-px bg-blue-400/16" />
                )}
                <span className="relative z-10 flex size-[clamp(3rem,6.5vw,3.75rem)] items-center justify-center rounded-xl border border-blue-500/35 bg-blue-500/10 text-[clamp(0.78rem,1.5vw,0.95rem)] font-black text-blue-300 shadow-[0_0_1.25rem_rgba(37,99,235,0.12)]">
                  {marker || <Icon size="1.1em" className="text-cyan-400" aria-hidden="true" />}
                </span>
              </div>

              <div className="flex min-h-[clamp(3.35rem,7vw,4.25rem)] items-center justify-center rounded-xl border border-white/[0.07] bg-slate-900/55 px-[clamp(1rem,2.3vw,1.5rem)] py-[clamp(0.85rem,1.8vw,1.05rem)] text-center">
                <h3 className="text-keep text-[clamp(0.85rem,1.55vw,1rem)] font-black leading-snug text-white">
                  {step.label}
                </h3>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function TiltProcessCard({ children, name, delay = 0, direction = 'left' }) {
  const cardRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const pointerRotateX = useTransform(pointerY, [-0.5, 0.5], [7, -7]);
  const pointerRotateY = useTransform(pointerX, [-0.5, 0.5], [-7, 7]);
  const scrollRotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    direction === 'left' ? [-2.5, 0, 2.5] : [2.5, 0, -2.5]
  );
  const scrollRotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    direction === 'left' ? [2.5, 0, -2.5] : [-2.5, 0, 2.5]
  );
  const rotateXCombined = useTransform(
    [pointerRotateX, scrollRotateX],
    ([pointer, scroll]) => (reduceMotion ? 0 : pointer + scroll)
  );
  const rotateYCombined = useTransform(
    [pointerRotateY, scrollRotateY],
    ([pointer, scroll]) => (reduceMotion ? 0 : pointer + scroll)
  );
  const rotateX = useSpring(rotateXCombined, { stiffness: 180, damping: 22, mass: 0.7 });
  const rotateY = useSpring(rotateYCombined, { stiffness: 180, damping: 22, mass: 0.7 });

  function handlePointerMove(event) {
    if (reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    pointerX.set(x - 0.5);
    pointerY.set(y - 0.5);
    event.currentTarget.style.setProperty('--tilt-x', `${x * 100}%`);
    event.currentTarget.style.setProperty('--tilt-y', `${y * 100}%`);
  }

  function resetPointerTilt(event) {
    pointerX.set(0);
    pointerY.set(0);
    event.currentTarget.style.setProperty('--tilt-x', '50%');
    event.currentTarget.style.setProperty('--tilt-y', '50%');
  }

  return (
    <ScrollReveal name={name} delay={delay} className="min-w-0 flex-1">
      <motion.article
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointerTilt}
        className="process-tilt-card group relative h-full overflow-hidden rounded-3xl border border-white/[0.07] bg-slate-950/30 p-[clamp(1rem,2.8vw,2rem)] shadow-[0_1.5rem_4rem_rgba(2,6,23,0.24)] transition-[background-color,border-color,box-shadow] duration-300 [transform-style:preserve-3d] hover:border-white/25 hover:bg-white/[0.08] hover:shadow-[0_1.5rem_4.5rem_rgba(59,130,246,0.16)]"
      >
        <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_var(--tilt-x,50%)_var(--tilt-y,50%),rgba(255,255,255,0.30),rgba(125,211,252,0.12)_34%,transparent_62%)]" />
        <span className="process-water-sweep pointer-events-none absolute inset-y-[-18%] -left-1/3 w-1/3 bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.22),rgba(125,211,252,0.14),transparent)]" />
        <div className="relative z-10 [transform:translateZ(1.5rem)]">
          {children}
        </div>
      </motion.article>
    </ScrollReveal>
  );
}

export default function ProcessSection() {
  const { sixSteps, timeline } = PROCESS;

  return (
    <section className="relative flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24" aria-labelledby="home-process-title">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-[clamp(2rem,5vw,3.5rem)] md:gap-[clamp(2.5rem,6vw,4rem)] lg:flex-row lg:items-stretch">
          <TiltProcessCard name="home-process-card" direction="left">
            <ProcessListPanel
              titleId="home-process-title"
              title={sixSteps.title}
              sub={sixSteps.sub}
              steps={sixSteps.steps}
              numbered
            />
          </TiltProcessCard>

          <TiltProcessCard name="home-production-timeline-card" delay={120} direction="right">
            <ProcessListPanel
              titleId="home-production-timeline-title"
              title={timeline.title}
              sub={timeline.sub}
              steps={timeline.steps}
            />
          </TiltProcessCard>
        </div>
      </div>
    </section>
  );
}
