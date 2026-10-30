import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion, announceToScreenReader } from '../../lib/motion';

interface PageTransitionProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export function PageTransition({ children, pageTitle }: PageTransitionProps) {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    // Scroll to top on route change unless hash navigation
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion ? 'auto' : 'instant' });
    }

    // Move focus to page h1 for accessibility
    const timer = setTimeout(() => {
      const h1 = document.querySelector('h1');
      if (h1) {
        h1.setAttribute('tabIndex', '-1');
        h1.focus({ preventScroll: true });
      }
      // Announce route change
      const title = pageTitle || document.title || 'Page loaded';
      announceToScreenReader(`${title}`);
    }, prefersReducedMotion ? 50 : 200);

    prevPathRef.current = location.pathname;

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash, pageTitle, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div ref={pageContainerRef} className="w-full">
        {children}
      </div>
    );
  }

  return (
    <div
      ref={pageContainerRef}
      key={location.pathname}
      className="w-full transition-all duration-[450ms] ease-out animate-page-enter"
      style={{
        animation: 'pageEnter 450ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      {children}
    </div>
  );
}
