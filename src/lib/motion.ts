/**
 * Motion Architecture Tokens & Hooks
 * Duration & Easing Tokens, Reduced Motion Hook, and Motion Utility Helpers
 */

import { useState, useEffect } from 'react';

export const MOTION_TOKENS = {
  duration: {
    fast: 0.15,    // 150ms
    base: 0.25,    // 250ms
    slow: 0.6,     // 600ms
    reveal: 0.8,   // 800ms
    transition: 0.45, // 450ms
  },
  ease: {
    // ease out expo for reveals
    easeOutExpo: [0.16, 1, 0.3, 1] as const,
    // ease in-out for transitions & curtain wipes
    easeInOut: [0.65, 0, 0.35, 1] as const,
    // standard smooth ease out
    easeOut: [0.25, 1, 0.5, 1] as const,
  },
  // CSS cubic-bezier strings
  cssEase: {
    easeOutExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
    easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
    easeOut: 'cubic-bezier(0.25, 1, 0.5, 1)',
  },
};

/**
 * Single hook to detect user preference for reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Live announcer helper for screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  if (typeof document === 'undefined') return;
  let announcer = document.getElementById('a11y-announcer');
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'a11y-announcer';
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
    document.body.appendChild(announcer);
  }
  announcer.textContent = message;
}
