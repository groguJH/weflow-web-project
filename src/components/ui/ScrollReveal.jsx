'use client';

import { useEffect, useRef, useState } from 'react';
import { Element } from 'react-scroll';

export default function ScrollReveal({
  as: Component = 'div',
  name,
  children,
  className = '',
  innerClassName = '',
  delay = 0,
  threshold = 0.14,
  rootMargin = '0px 0px -12% 0px',
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.unobserve(entry.target);
      },
      { rootMargin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <Component
      ref={ref}
      className={`scroll-reveal ${isVisible ? 'is-visible' : ''} ${className} ${innerClassName}`}
      style={{ '--scroll-reveal-delay': `${delay}ms` }}
    >
      {name && <Element name={name} className="scroll-reveal-anchor" />}
      {children}
    </Component>
  );
}
