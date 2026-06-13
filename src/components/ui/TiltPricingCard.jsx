"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function TiltPricingCard({
  children,
  name,
  delay = 0,
  direction = "left",
  className = "",
}) {
  const cardRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const pointerRotateX = useTransform(pointerY, [-0.5, 0.5], [5, -5]);
  const pointerRotateY = useTransform(pointerX, [-0.5, 0.5], [-5, 5]);

  const scrollRotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    direction === "left" ? [-1.8, 0, 1.8] : [1.8, 0, -1.8],
  );

  const scrollRotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    direction === "left" ? [1.8, 0, -1.8] : [-1.8, 0, 1.8],
  );

  const rotateXCombined = useTransform(
    [pointerRotateX, scrollRotateX],
    ([pointer, scroll]) => (reduceMotion ? 0 : pointer + scroll),
  );

  const rotateYCombined = useTransform(
    [pointerRotateY, scrollRotateY],
    ([pointer, scroll]) => (reduceMotion ? 0 : pointer + scroll),
  );

  const rotateX = useSpring(rotateXCombined, {
    stiffness: 180,
    damping: 24,
    mass: 0.7,
  });

  const rotateY = useSpring(rotateYCombined, {
    stiffness: 180,
    damping: 24,
    mass: 0.7,
  });

  function handlePointerMove(event) {
    if (reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    pointerX.set(x - 0.5);
    pointerY.set(y - 0.5);

    event.currentTarget.style.setProperty("--tilt-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--tilt-y", `${y * 100}%`);
  }

  function resetPointerTilt(event) {
    pointerX.set(0);
    pointerY.set(0);

    event.currentTarget.style.setProperty("--tilt-x", "50%");
    event.currentTarget.style.setProperty("--tilt-y", "50%");
  }

  return (
    <ScrollReveal name={name} delay={delay} className="w-full">
      <motion.article
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointerTilt}
        className={`group relative overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-slate-950/35 shadow-[0_1.25rem_3rem_rgba(2,6,23,0.26)] transition-[background-color,border-color,box-shadow,transform] duration-300 [transform-style:preserve-3d] hover:border-white/25 hover:bg-white/[0.075] hover:shadow-[0_1.5rem_4rem_rgba(255,255,255,0.08)] ${className}`}
      >
        <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_var(--tilt-x,50%)_var(--tilt-y,50%),rgba(255,255,255,0.24),rgba(125,211,252,0.10)_34%,transparent_62%)]" />

        <span className="pointer-events-none absolute inset-y-[-20%] -left-1/2 w-1/2 translate-x-[-120%] rotate-[12deg] bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.22),rgba(125,211,252,0.12),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-[320%]" />

        <span className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-white/0 transition duration-300 group-hover:ring-white/10" />

        <div className="relative z-10 [transform:translateZ(1.25rem)]">
          {children}
        </div>
      </motion.article>
    </ScrollReveal>
  );
}
