import React, { useEffect, useState } from 'react';
import { CookiePreferences } from '../types';
import { applySeo } from '../lib/seo';

export function LegalCookiesPage() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    strictlyNecessary: true,
    analytics: false,
    marketing: false,
    hasConsented: true,
  });

  useEffect(() => {
    applySeo({
      title: 'Cookie Policy & Consent Management | KINETIQ',
      description: 'Review and update your cookie preferences for authentication, performance, and marketing.',
      canonicalPath: '/legal/cookies',
    });

    try {
      const stored = localStorage.getItem('kinetiq_cookie_consent');
      if (stored) setPreferences(JSON.parse(stored));
    } catch {}
  }, []);

  const saveToggle = (key: 'analytics' | 'marketing') => {
    const updated = { ...preferences, [key]: !preferences[key], hasConsented: true };
    setPreferences(updated);
    try {
      localStorage.setItem('kinetiq_cookie_consent', JSON.stringify(updated));
    } catch {}
  };

  return (
    <div className="w-full min-h-screen py-12 px-margin-mobile md:px-margin max-w-4xl mx-auto font-body-sm text-[#141e19]">
      <div className="mb-8 border-b border-[#bccabf]/40 pb-6">
        <span className="text-[11px] font-code-badge text-[#006a42] uppercase tracking-widest bg-[#ebf6ee] px-3 py-1 rounded-full border border-[#bccabf]/50 inline-block mb-3">
          LEGAL & TELEMETRY // COOKIE AUDIT
        </span>
        <h1 className="font-headline-lg text-3xl md:text-4xl font-bold tracking-tight">
          Cookie Policy & Controls
        </h1>
        <p className="text-xs text-[#535f59] mt-2">
          Strictly necessary authentication cookies are enabled by default. Performance telemetry requires explicit consent.
        </p>
      </div>

      <div className="space-y-6 text-xs md:text-sm text-[#3d4a41] leading-relaxed">
        <p>
          Cookies are compact text files stored on your device that facilitate stateful sessions, preserve your deliverable filter preferences, and protect multi-sig vaults from automated attacks.
        </p>

        {/* Interactive Cookie Preference Matrix */}
        <div className="bg-white p-6 rounded-2xl border border-[#bccabf] shadow-sm space-y-4 my-6">
          <h2 className="font-headline-sm text-base font-bold text-[#141e19]">
            Active Cookie Consent Configuration
          </h2>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-[#ebf6ee] border border-[#62dd9e]/40 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#141e19] block text-xs">1. Strictly Necessary Cookies</span>
                <p className="text-[11px] text-[#535f59] mt-0.5">
                  Multi-sig session validation, CSRF tokens, and Turnstile anti-bot proof verification.
                </p>
              </div>
              <span className="text-[10px] font-code-badge bg-[#006a42] text-white px-2.5 py-1 rounded-md">
                Always Active
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#bccabf] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#141e19] block text-xs">2. Telemetry & Analytics Cookies</span>
                <p className="text-[11px] text-[#535f59] mt-0.5">
                  Anonymized page load timings, WebGL canvas fps monitoring, and crash reporting.
                </p>
              </div>
              <button
                type="button"
                onClick={() => saveToggle('analytics')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  preferences.analytics
                    ? 'bg-[#006a42] text-white'
                    : 'bg-[#dae5dd] text-[#3d4a41]'
                }`}
              >
                {preferences.analytics ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#bccabf] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#141e19] block text-xs">3. Recommendation & Discovery Cookies</span>
                <p className="text-[11px] text-[#535f59] mt-0.5">
                  Recently viewed deliverable caching and specialized artisan suggestions.
                </p>
              </div>
              <button
                type="button"
                onClick={() => saveToggle('marketing')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  preferences.marketing
                    ? 'bg-[#006a42] text-white'
                    : 'bg-[#dae5dd] text-[#3d4a41]'
                }`}
              >
                {preferences.marketing ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
