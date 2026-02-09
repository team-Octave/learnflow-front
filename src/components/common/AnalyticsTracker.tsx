'use client';

import { useEffect, useRef } from 'react';

export default function AnalyticsTracker() {
  // 최초 진입 시점 고정
  const enteredAtRef = useRef<number>(Date.now());

  useEffect(() => {
    // 1. 진입 시
    if (!sessionStorage.getItem('__landing_sent__')) {
      const landingPayload = {
        event: 'landing',
        referrer: document.referrer || null,
        landingUrl: location.href,
        path: location.pathname,
        ts: Date.now(),
      };

      navigator.sendBeacon('/api/track', JSON.stringify(landingPayload));

      sessionStorage.setItem('__landing_sent__', '1');
      sessionStorage.setItem('__entered_at__', String(enteredAtRef.current));
    } else {
      // SPA 리마운트 대비
      const saved = sessionStorage.getItem('__entered_at__');
      if (saved) enteredAtRef.current = Number(saved);
    }

    // 2. 이탈 시
    const sendExitOnce = () => {
      if (sessionStorage.getItem('__exit_sent__')) return;
      sessionStorage.setItem('__exit_sent__', '1');

      const enteredAt =
        Number(sessionStorage.getItem('__entered_at__')) ||
        enteredAtRef.current;

      const exitPayload = {
        event: 'exit',
        exitUrl: location.href,
        path: location.pathname,
        durationMs: Date.now() - enteredAt,
        ts: Date.now(),
      };

      navigator.sendBeacon('/api/track', JSON.stringify(exitPayload));
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendExitOnce();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return null;
}
