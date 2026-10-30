import React, { useEffect } from 'react';
import { applySeo } from '../lib/seo';

export function LegalTermsPage() {
  useEffect(() => {
    applySeo({
      title: 'Terms of Service & Escrow Governance | KINETIQ',
      description: 'Terms governing multi-sig milestone contracts, intellectual property conveyance, and platform commission architecture.',
      canonicalPath: '/legal/terms',
    });
  }, []);

  return (
    <div className="w-full min-h-screen py-12 px-margin-mobile md:px-margin max-w-4xl mx-auto font-body-sm text-[#141e19]">
      <div className="mb-8 border-b border-[#bccabf]/40 pb-6">
        <span className="text-[11px] font-code-badge text-[#006a42] uppercase tracking-widest bg-[#ebf6ee] px-3 py-1 rounded-full border border-[#bccabf]/50 inline-block mb-3">
          LEGAL SPECIFICATION // SECTION 14
        </span>
        <h1 className="font-headline-lg text-3xl md:text-4xl font-bold tracking-tight">
          Terms of Service & Escrow Protocol
        </h1>
        <p className="text-xs text-[#535f59] mt-2">
          Effective Date: October 2026 • Document Version 4.1 // Canonical Multi-Sig Standard
        </p>
      </div>

      <div className="space-y-8 leading-relaxed text-xs md:text-sm text-[#3d4a41]">
        <section className="space-y-2">
          <h2 className="font-headline-sm text-lg font-bold text-[#141e19]">
            1. Preamble and Escrow Mechanics
          </h2>
          <p>
            KINETIQ operates as a curated digital marketplace and multi-signature escrow protocol. By commissioning or accepting an order on this platform, both Client and Specialist agree that contract consideration is held in multi-sig vault custody until explicit milestone sign-off occurs.
          </p>
          <p>
            The platform executes transactions under strict non-custodial and programmatic release rules, preventing unilateral withdrawals while milestone reviews are pending.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-headline-sm text-lg font-bold text-[#141e19]">
            2. Platform Fee Structure & Commission
          </h2>
          <p>
            Platform commission rates are configured programmatically in platform governance. A baseline 5.0% platform fee is applied to the gross deliverable value upon milestone liquidation, alongside client multi-sig vault maintenance fees. All fees are rendered transparently at checkout prior to treasury lock.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-headline-sm text-lg font-bold text-[#141e19]">
            3. Intellectual Property Assignment
          </h2>
          <p>
            Upon release of final milestone funds from escrow to the Specialist, all worldwide right, title, and interest in and to the custom deliverables (including Figma vector variables, source code crates, 3D project files, and rendered assets) transfer irrevocably to the Client, free of encumbrances.
          </p>
          <p>
            Specialists retain the right to showcase non-confidential deliverables in their KINETIQ portfolio dossier unless a bilateral Non-Disclosure Agreement (NDA) was executed at brief initiation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-headline-sm text-lg font-bold text-[#141e19]">
            4. Vetting & Verification Integrity
          </h2>
          <p>
            The "Verified" badge is reserved solely for practitioners who have undergone independent portfolio audits and KYC verification administered by KINETIQ Trust & Safety officers. Soliciting transactions off-platform to circumvent escrow protections constitutes grounds for immediate suspension.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-headline-sm text-lg font-bold text-[#141e19]">
            5. Limitation of Liability
          </h2>
          <p>
            In no event shall KINETIQ or its multi-sig node operators be liable for indirect, incidental, special, consequential, or punitive damages arising from work product performance. Total aggregate liability is limited to the platform fee retained for the specific transaction in dispute.
          </p>
        </section>
      </div>
    </div>
  );
}
