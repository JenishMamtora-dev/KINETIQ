import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion, MOTION_TOKENS } from '../../lib/motion';

export type RevealVariant = 'fade-up' | 'mask-lines' | 'image-wipe' | 'stagger' | 'counter';

interface RevealProps {
  children?: React.ReactNode;
  variant?: RevealVariant;
  delayMs?: number;
  className?: string;
  threshold?: number;
  // For counter variant
  targetNumber?: number;
  prefix?: string;
  suffix?: string;
  formatCommas?: boolean;
}

export function Reveal({
  children,
  variant = 'fade-up',
  delayMs = 0,
  className = '',
  threshold = 0.15,
  targetNumber = 0,
  prefix = '',
  suffix = '',
  formatCommas = false,
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentCount, setCurrentCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      if (variant === 'counter') setCurrentCount(targetNumber);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion, threshold, targetNumber, variant]);

  // Real counter count-up using requestAnimationFrame
  useEffect(() => {
    if (variant !== 'counter' || !isVisible || prefersReducedMotion) {
      if (variant === 'counter' && isVisible) {
        setCurrentCount(targetNumber);
      }
      return;
    }

    let startTimestamp: number | null = null;
    const durationMs = 1200;
    let animId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease out expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = Math.floor(easeProgress * targetNumber);
      setCurrentCount(val);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setCurrentCount(targetNumber);
      }
    };

    const timer = setTimeout(() => {
      animId = requestAnimationFrame(step);
    }, delayMs);

    return () => {
      clearTimeout(timer);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isVisible, targetNumber, variant, prefersReducedMotion, delayMs]);

  if (variant === 'counter') {
    const formatted = formatCommas ? currentCount.toLocaleString() : currentCount;
    return (
      <span
        ref={containerRef}
        data-reveal="counter"
        className={`inline-block tabular-nums transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      >
        {prefix}{formatted}{suffix}
      </span>
    );
  }

  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className={className}>
        {children}
      </div>
    );
  }

  if (variant === 'mask-lines') {
    return (
      <div
        ref={containerRef}
        data-reveal="mask-lines"
        className={`overflow-hidden ${className}`}
      >
        <div
          style={{
            transform: isVisible ? 'translateY(0%)' : 'translateY(105%)',
            opacity: isVisible ? 1 : 0.01,
            transition: `transform ${MOTION_TOKENS.duration.slow}s ${MOTION_TOKENS.cssEase.easeOutExpo} ${delayMs}ms, opacity ${MOTION_TOKENS.duration.base}s ease-out ${delayMs}ms`,
            willChange: 'transform, opacity',
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  if (variant === 'image-wipe') {
    return (
      <div
        ref={containerRef}
        data-reveal="image-wipe"
        className={`overflow-hidden ${className}`}
        style={{
          clipPath: isVisible ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
          transition: `clip-path ${MOTION_TOKENS.duration.slow}s ${MOTION_TOKENS.cssEase.easeInOut} ${delayMs}ms`,
          willChange: 'clip-path',
        }}
      >
        <div
          style={{
            transform: isVisible ? 'scale(1)' : 'scale(1.15)',
            transition: `transform ${MOTION_TOKENS.duration.slow * 1.2}s ${MOTION_TOKENS.cssEase.easeOutExpo} ${delayMs}ms`,
            willChange: 'transform',
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  if (variant === 'stagger') {
    return (
      <div
        ref={containerRef}
        data-reveal="stagger"
        className={className}
      >
        {React.Children.map(children, (child, idx) => {
          if (!React.isValidElement(child)) return child;
          const childDelay = delayMs + idx * 60; // 60ms apart
          return (
            <div
              key={idx}
              style={{
                transform: isVisible ? 'translateY(0px)' : 'translateY(24px)',
                opacity: isVisible ? 1 : 0,
                transition: `transform ${MOTION_TOKENS.duration.slow}s ${MOTION_TOKENS.cssEase.easeOutExpo} ${childDelay}ms, opacity ${MOTION_TOKENS.duration.slow}s ${MOTION_TOKENS.cssEase.easeOutExpo} ${childDelay}ms`,
                willChange: 'transform, opacity',
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    );
  }

  // Default: fade-up (24px)
  return (
    <div
      ref={containerRef}
      data-reveal="fade-up"
      className={className}
      style={{
        transform: isVisible ? 'translateY(0px)' : 'translateY(24px)',
        opacity: isVisible ? 1 : 0,
        transition: `transform ${MOTION_TOKENS.duration.slow}s ${MOTION_TOKENS.cssEase.easeOutExpo} ${delayMs}ms, opacity ${MOTION_TOKENS.duration.slow}s ${MOTION_TOKENS.cssEase.easeOutExpo} ${delayMs}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}
