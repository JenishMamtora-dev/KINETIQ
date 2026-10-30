import React, { useState, useEffect } from 'react';
import { CookiePreferences } from '../../types';

const STORAGE_KEY = 'kinetiq_cookie_consent';

export function CookieConsentBanner() {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPreferences(JSON.parse(stored));
      } else {
        setPreferences({
          strictlyNecessary: true,
          analytics: false,
          marketing: false,
          hasConsented: false,
        });
      }
    } catch {
      setPreferences({
        strictlyNecessary: true,
        analytics: false,
        marketing: false,
        hasConsented: true,
      });
    }
  }, []);

  const saveConsent = (acceptedAnalytics: boolean, acceptedMarketing: boolean) => {
    const pref: CookiePreferences = {
      strictlyNecessary: true,
      analytics: acceptedAnalytics,
      marketing: acceptedMarketing,
      hasConsented: true,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pref));
    } catch {}
    setPreferences(pref);
    setShowCustomize(false);
  };

  if (!preferences || preferences.hasConsented) return null;

  return (
    <div
      role="region"
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 md:left-8 md:max-w-xl z-50 bg-[#002111] text-[#f1fcf4] p-5 rounded-2xl border border-[#62dd9e]/30 shadow-2xl backdrop-blur-md animate-fade-in"
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="material-symbols-outlined text-[#62dd9e] text-2xl shrink-0 mt-0.5">
          cookie
        </span>
        <div>
          <h3 className="font-headline-sm text-sm font-semibold tracking-wide text-white">
            Privacy & Cookie Preferences
          </h3>
          <p className="text-xs text-[#dae5dd] mt-1 leading-relaxed">
            We use strictly necessary cookies to ensure secure multi-sig escrow authentication. Analytics cookies run only with your explicit consent.
          </p>
        </div>
      </div>

      {showCustomize && (
        <div className="my-3 p-3 bg-black/30 rounded-xl space-y-2 text-xs border border-white/10">
          <label className="flex items-center justify-between text-white/90">
            <span>Essential / Escrow Authentication</span>
            <input type="checkbox" checked disabled className="accent-[#006a42] cursor-not-allowed" />
          </label>
          <label className="flex items-center justify-between text-white/90 cursor-pointer">
            <span>Telemetry & UX Performance</span>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="accent-[#006a42]"
            />
          </label>
          <label className="flex items-center justify-between text-white/90 cursor-pointer">
            <span>Marketplace Recommendations</span>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="accent-[#006a42]"
            />
          </label>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
        <button
          onClick={() => setShowCustomize(!showCustomize)}
          className="text-xs text-[#96f3bf] hover:underline font-code-badge"
        >
          {showCustomize ? 'Hide options' : 'Customize preferences'}
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => saveConsent(false, false)}
            className="px-3 py-1.5 text-xs text-[#dae5dd] hover:text-white border border-white/20 rounded-lg hover:bg-white/5 transition-colors font-body-sm"
          >
            Reject Non-Essential
          </button>
          <button
            onClick={() => (showCustomize ? saveConsent(analytics, marketing) : saveConsent(true, true))}
            className="px-4 py-1.5 text-xs bg-[#006a42] text-white hover:bg-[#008655] font-semibold rounded-lg transition-colors font-body-sm"
          >
            {showCustomize ? 'Save Choices' : 'Accept All'}
          </button>
        </div>
      </div>
    </div>
  );
}
