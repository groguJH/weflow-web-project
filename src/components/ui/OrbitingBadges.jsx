'use client';

import { motion, useReducedMotion } from 'framer-motion';

function OrbitBadge({ item }) {
  const isLive = item.variant === 'live';

  return (
    <div
      className={`group rounded-xl border bg-slate-950/85 shadow-lg shadow-black/25 transition-[padding,border-color,background-color,box-shadow] duration-200 ease-out ${
        isLive
          ? 'border-emerald-500/25 px-3.5 py-2.5 hover:border-transparent hover:px-5 hover:py-3 hover:shadow-emerald-500/15'
          : 'border-white/[0.08] px-3.5 py-2.5 hover:border-transparent hover:px-5 hover:py-3 hover:shadow-cyan-500/15'
      } ${item.className ?? ''}`}
    >
      {isLive ? (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_0.75rem_rgba(52,211,153,0.55)] transition-[width,height,box-shadow] duration-200 group-hover:size-2 group-hover:shadow-[0_0_1rem_rgba(52,211,153,0.7)]" />
          <span className="text-xs font-semibold text-emerald-400 transition-[font-size,line-height,color] duration-200 group-hover:text-sm">{item.title}</span>
        </div>
      ) : (
        <>
          <div className="text-sm font-bold leading-tight text-white transition-[font-size,line-height,color] duration-200 group-hover:text-base">{item.title}</div>
          {item.description && (
            <div className="mt-0.5 text-xs leading-tight text-slate-400 transition-[font-size,line-height,color] duration-200 group-hover:text-sm">{item.description}</div>
          )}
        </>
      )}
    </div>
  );
}

export default function OrbitingBadges({
  items,
  children,
  className = '',
  orbitRadius = '13rem',
  duration = 32,
  reverse = false,
  hoverLift = '-0.35rem',
  interactive = true,
}) {
  "use no memo";

  const reduceMotion = useReducedMotion();
  const spin = reverse ? -360 : 360;
  const counterSpin = -spin;
  const transition = { duration, repeat: Infinity, ease: 'linear' };

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ '--orbit-radius': orbitRadius }}
    >
      <div className="absolute inset-0 rounded-full border border-blue-500/[0.08]" />
      <div className="absolute inset-[12%] rounded-full border border-violet-500/[0.08]" />
      <div className="absolute inset-[24%] rounded-full border border-blue-400/[0.06]" />

      <div className="relative z-10 flex items-center justify-center">
        {children}
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-20"
        animate={reduceMotion ? undefined : { rotate: spin }}
        transition={transition}
      >
        {items.map((item) => (
          <div
            key={item.title}
            className={`${interactive ? 'pointer-events-auto' : 'pointer-events-none'} absolute left-1/2 top-1/2`}
            style={{
              transform: `translate(-50%, -50%) rotate(${item.angle}deg) translateX(var(--orbit-radius)) rotate(${-item.angle}deg)`,
            }}
          >
            <motion.div
              className="relative"
              animate={reduceMotion ? undefined : { rotate: counterSpin }}
              whileHover={reduceMotion || !interactive ? undefined : { y: hoverLift, zIndex: 30 }}
              transition={reduceMotion ? undefined : { rotate: transition }}
            >
              <OrbitBadge item={item} />
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
