'use client';

import { useEffect, useState } from 'react';

export default function useSessionOnce(key) {
  const [state, setState] = useState({
    isReady: false,
    shouldPlay: false,
  });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const hasPlayed = window.sessionStorage.getItem(key) === 'true';

      setState({
        isReady: true,
        shouldPlay: !hasPlayed,
      });

      if (!hasPlayed) {
        window.sessionStorage.setItem(key, 'true');
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [key]);

  return state;
}
