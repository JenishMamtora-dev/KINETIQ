import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion, announceToScreenReader } from '../../lib/motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isWiping, setIsWiping] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  const startTimeRef = useRef<number>(Date.now());
  const completedRef = useRef(false);

  // Check if session has already seen the intro
  useEffect(() => {
    // Remove static HTML fallback overlay if present in DOM
    const staticOverlay = document.getElementById('critical-intro-overlay');
    if (staticOverlay) {
      staticOverlay.remove();
    }

    const seen = typeof window !== 'undefined' && sessionStorage.getItem('kinetiq_intro_seen');
    if (seen) {
      // Returning visit in session: quick 400ms fade or skip
      setIsMounted(false);
      onComplete?.();
      return;
    }

    if (prefersReducedMotion) {
      // Reduced motion: 200ms opacity fade only
      const timer = setTimeout(() => {
        setIsMounted(false);
        sessionStorage.setItem('kinetiq_intro_seen', 'true');
        onComplete?.();
      }, 200);
      return () => clearTimeout(timer);
    }

    setHasStarted(true);

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    announceToScreenReader('Loading marketplace environment, please wait.');

    // Show skip after 800ms
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 800);

    // Failsafe hard cap at 3.5s
    const failsafeTimer = setTimeout(() => {
      finishIntro();
    }, 3500);

    // Keyboard Escape listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Track REAL asset readiness
    let resourcesLoaded = 0;
    const totalResources = 3;

    const checkResource = () => {
      resourcesLoaded++;
      const currentPct = Math.round((resourcesLoaded / totalResources) * 90);
      setProgress((prev) => Math.max(prev, currentPct));
    };

    // 1. Fonts readiness
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => checkResource());
    } else {
      checkResource();
    }

    // 2. Preload hero image / logo asset
    const img = new Image();
    img.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQGwMlrvq_aDrew9qDL8GtrQJvEv5xjCMao5OL5OzqERi54V-KKTgzb_1FngMyV4Kx5FXryqluTbKyLKPFFpj3xSF5BMLZl0pVlkNPJDlUe2tkSMQzrAX788EK32Gs5vKbj23Bgu-ZXtjaipKMHd8Wq7CU-30yZ7__RFGrRrkPt_jdsAxy7rzD26QMPOuGSOuW92j6j-QwYtpadiqv9VE9R0N8C0poPO4YokH_O4G1ByvPs1niSnPBog';
    if (img.complete) {
      checkResource();
    } else {
      img.onload = () => checkResource();
      img.onerror = () => checkResource();
    }

    // 3. WebGL readiness check
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) checkResource();
      else checkResource();
    } catch {
      checkResource();
    }

    // Interval to smoothly increment progress toward 100% once min 1.2s has passed
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      if (elapsed >= 1200 && resourcesLoaded >= totalResources) {
        setProgress(100);
        clearInterval(progressInterval);
        setTimeout(() => {
          finishIntro();
        }, 300);
      } else {
        setProgress((prev) => {
          const cap = elapsed < 1200 ? 85 : 98;
          return prev < cap ? prev + 4 : prev;
        });
      }
    }, 60);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(failsafeTimer);
      clearInterval(progressInterval);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [prefersReducedMotion]);

  const finishIntro = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsDone(true);
    setIsWiping(true);

    try {
      sessionStorage.setItem('kinetiq_intro_seen', 'true');
    } catch {}

    // Unlock body scroll
    document.body.style.overflow = '';
    announceToScreenReader('Marketplace ready');

    // Wipe duration is 800ms
    setTimeout(() => {
      setIsMounted(false);
      onComplete?.();
    }, 800);
  };

  if (!isMounted) return null;

  return (
    <div
      id="kinetiq-preloader"
      role="dialog"
      aria-modal="true"
      aria-label="KINETIQ Cinematic Loading Screen"
      aria-busy={!isDone}
      className={`fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden transition-opacity duration-300 ${
        isDone && prefersReducedMotion ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Left Curtain Panel */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full bg-[#002111] z-10 transition-transform duration-[800ms]"
        style={{
          transform: isWiping ? 'translateX(-100%)' : 'translateX(0%)',
          transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
          willChange: 'transform',
        }}
      />

      {/* Right Curtain Panel */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full bg-[#002111] z-10 transition-transform duration-[800ms]"
        style={{
          transform: isWiping ? 'translateX(100%)' : 'translateX(0%)',
          transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
          willChange: 'transform',
        }}
      />

      {/* Center Intro Content (fades before curtain wipe) */}
      <div
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-6 transition-all duration-400 ${
          isDone ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        {/* Animated Brand Logo Mark */}
        <div className="relative mb-8 w-24 h-24 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-[0_0_25px_rgba(98,221,158,0.25)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Geometric K Diamond Mark with Stroke Dashoffset Animation */}
            <path
              d="M 50 8 L 88 50 L 50 92 L 12 50 Z"
              stroke="#62dd9e"
              strokeWidth="2.5"
              strokeDasharray="320"
              strokeDashoffset={hasStarted ? '0' : '320'}
              style={{
                transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1), fill 0.6s ease-in 0.5s',
                fill: progress >= 60 ? 'rgba(0, 106, 66, 0.35)' : 'transparent',
              }}
            />
            {/* Inner Kinetic Symbol */}
            <path
              d="M 38 32 L 38 68 M 38 50 L 62 32 M 48 42 L 64 68"
              stroke="#f1fcf4"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="160"
              strokeDashoffset={hasStarted ? '0' : '160'}
              style={{
                transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            />
          </svg>
        </div>

        {/* Brand Typographic Title */}
        <div className="text-center mb-6">
          <h2 className="font-headline-md tracking-[0.25em] text-[#f1fcf4] uppercase text-xl font-bold mb-1">
            K I N E T I Q
          </h2>
          <p className="text-[11px] font-code-badge text-[#96f3bf] tracking-widest uppercase">
            Curated Artisans // Multi-Sig Escrow
          </p>
        </div>

        {/* Real Progress Bar */}
        <div className="w-64 max-w-full">
          <div className="flex justify-between items-center text-[11px] font-code-badge text-[#bccabf] mb-2">
            <span>CALIBRATING ENVIRONMENT</span>
            <span className="tabular-nums text-[#62dd9e] font-semibold">{progress}%</span>
          </div>
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#006a42] via-[#62dd9e] to-[#99f6c2] transition-all duration-150 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Skip Button (visible after 800ms) */}
        {showSkip && (
          <button
            onClick={finishIntro}
            className="mt-8 px-4 py-1.5 rounded-full border border-white/20 text-[#dae5dd] hover:text-white hover:border-[#62dd9e] text-xs font-code-badge transition-all bg-white/5 hover:bg-white/10 flex items-center gap-1.5"
            aria-label="Skip introductory loading animation"
          >
            <span>Skip intro</span>
            <span className="text-[10px] text-white/50 px-1 py-0.5 rounded bg-white/10 border border-white/10">ESC</span>
          </button>
        )}
      </div>
    </div>
  );
}
