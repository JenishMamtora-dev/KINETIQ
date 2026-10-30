import React, { useEffect, useState } from 'react';
import { AccountPrivacyModal } from '../components/common/AccountPrivacyModal';
import { applySeo } from '../lib/seo';

export function LegalPrivacyPage() {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  useEffect(() => {
    applySeo({
      title: 'Privacy Policy & Data Rights | KINETIQ',
      description: 'Transparent disclosure of data processing, GDPR/CCPA portability rights, and account deletion retention schedules.',
      canonicalPath: '/legal/privacy',
    });
  }, []);

  return (
    <div className="w-full min-h-screen py-12 px-margin-mobile md:px-margin max-w-4xl mx-auto font-body-sm text-[#141e19]">
      <div className="mb-8 border-b border-[#bccabf]/40 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] font-code-badge text-[#006a42] uppercase tracking-widest bg-[#ebf6ee] px-3 py-1 rounded-full border border-[#bccabf]/50 inline-block mb-3">
            DATA GOVERNANCE // GDPR & CCPA
          </span>
          <h1 className="font-headline-lg text-3xl md:text-4xl font-bold tracking-tight">
            Privacy Policy & Data Architecture
          </h1>
          <p className="text-xs text-[#535f59] mt-2">
            Compliance Standard: EU GDPR / California CCPA • Zero-Knowledge Encryption
          </p>
        </div>

        <button
          onClick={() => setIsPrivacyModalOpen(true)}
          className="px-4 py-2 bg-[#006a42] hover:bg-[#008655] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-sm">shield</span>
          <span>Access Privacy Tools & Export</span>
        </button>
      </div>

      <div className="space-y-8 leading-relaxed text-xs md:text-sm text-[#3d4a41]">
        <section className="space-y-2">
          <h2 className="font-headline-sm text-lg font-bold text-[#141e19]">
            1. Data Minimization Principles
          </h2>
          <p>
            KINETIQ adheres to strict data minimization. We only collect telemetry, email credentials, and financial metadata necessary to maintain multi-sig escrow contracts, issue invoices, and prevent programmatic marketplace fraud.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-headline-sm text-lg font-bold text-[#141e19]">
            2. Analytics Consent & Telemetry
          </h2>
          <p>
            No performance or tracking cookies are initialized without your affirmative consent via our Cookie Banner. Essential authentication cookies are strictly limited to session security and multi-sig cryptographic authorization tokens.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-headline-sm text-lg font-bold text-[#141e19]">
            3. Account Data Portability (Export)
          </h2>
          <p>
            Under GDPR Article 20, you hold an absolute right to export your profile dossiers, escrow records, and project briefs in a structured JSON machine-readable format. You may trigger this export on-demand directly via our privacy tools.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-headline-sm text-lg font-bold text-[#141e19]">
            4. Account Deletion & Defined Retention Behavior
          </h2>
          <p>
            When you request account termination:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs">
            <li>A <strong>30-day grace period</strong> is initiated to prevent accidental loss and resolve outstanding escrow tranches.</li>
            <li>All personal identifiers, messaging threads, and uploaded draft attachments are permanently deleted from primary storage buckets.</li>
            <li>Cryptographic escrow transaction hashes are permanently anonymized to comply with anti-money laundering (AML) and statutory taxation retention laws.</li>
          </ul>
        </section>
      </div>

      <AccountPrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
}
