import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EscrowExecutionFlow } from '../components/EscrowExecutionFlow';
import { Reveal } from '../components/motion/Reveal';
import { applySeo } from '../lib/seo';

export function HowItWorksPage() {
  useEffect(() => {
    applySeo({
      title: 'How Multi-Sig Escrow Works | KINETIQ Protocol',
      description: 'Understand how KINETIQ secures capital, enforces milestone reviews, and guarantees intellectual property transfer.',
      canonicalPath: '/how-it-works',
    });
  }, []);

  return (
    <div className="w-full min-h-screen py-10 px-margin-mobile md:px-margin max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <Reveal variant="fade-up">
          <span className="text-[11px] font-code-badge text-[#006a42] uppercase tracking-widest bg-[#ebf6ee] px-3 py-1 rounded-full border border-[#bccabf]/50 inline-block mb-3">
            PROTOCOL ARCHITECTURE // ZERO COUNTERPARTY RISK
          </span>
          <h1 className="font-headline-lg text-3xl md:text-5xl font-bold tracking-tight text-[#141e19]">
            The Escrow Execution Protocol
          </h1>
          <p className="font-body-md text-[#3d4a41] mt-3 text-xs md:text-sm leading-relaxed">
            Eliminating traditional freelance friction through multi-signature vaults, transparent milestone gates, and automated intellectual property conveyance.
          </p>
        </Reveal>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#bccabf] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#ebf6ee] text-[#006a42] flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-xl">lock_clock</span>
          </div>
          <h3 className="font-headline-sm text-base font-bold text-[#141e19] mb-2">
            1. Vault Lock at Inception
          </h3>
          <p className="text-xs text-[#535f59] leading-relaxed">
            Funds for agreed milestone tranches are deposited into a cryptographic vault. The artisan begins work knowing 100% of payment is secured.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#bccabf] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#ebf6ee] text-[#006a42] flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-xl">fact_check</span>
          </div>
          <h3 className="font-headline-sm text-base font-bold text-[#141e19] mb-2">
            2. Milestone Review Gates
          </h3>
          <p className="text-xs text-[#535f59] leading-relaxed">
            Artifacts (Figma tokens, code crates, 3D renders) are handed over in tranches. Payment releases only upon client sign-off.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#bccabf] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#ebf6ee] text-[#006a42] flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-xl">assignment_turned_in</span>
          </div>
          <h3 className="font-headline-sm text-base font-bold text-[#141e19] mb-2">
            3. Instant IP Assignment
          </h3>
          <p className="text-xs text-[#535f59] leading-relaxed">
            Final milestone liquidation triggers an immediate legal conveyance of all commercial rights and raw asset dependencies directly to the client.
          </p>
        </div>
      </div>

      {/* Interactive Escrow Simulator Section */}
      <EscrowExecutionFlow />

      {/* Bottom CTA */}
      <div className="bg-[#002111] text-[#f1fcf4] p-8 md:p-12 rounded-3xl text-center relative overflow-hidden border border-[#62dd9e]/30">
        <h2 className="font-headline-lg text-2xl md:text-3xl font-bold mb-3">
          Ready to Commission With Uncompromising Certainty?
        </h2>
        <p className="text-xs text-[#dae5dd] max-w-xl mx-auto mb-6">
          Explore our vetted roster or build a custom project brief with deterministic deliverable matching.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/client/briefs/new"
            className="px-6 py-2.5 rounded-xl bg-[#006a42] hover:bg-[#008655] text-white text-xs font-semibold shadow-sm transition-colors"
          >
            Scope a Project Brief
          </Link>
          <Link
            to="/freelancers"
            className="px-6 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-white text-xs font-semibold transition-colors"
          >
            Find Digital Artisans
          </Link>
        </div>
      </div>
    </div>
  );
}
