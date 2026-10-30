import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { applySeo } from '../lib/seo';

export function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'KQ-ESC-2026-901';
  const amount = searchParams.get('amount') || '1,250';
  const serviceTitle = searchParams.get('title') || 'Enterprise Design System & Web App UX Audit';

  useEffect(() => {
    applySeo({
      title: 'Escrow Vault Locked | Checkout Confirmed',
      description: 'Your milestone payment has been securely locked in the KINETIQ multi-sig vault.',
      canonicalPath: '/client/checkout/success',
      noIndex: true,
    });
  }, []);

  return (
    <div className="w-full min-h-[85vh] py-14 px-margin-mobile md:px-margin max-w-3xl mx-auto">
      <div className="bg-white p-8 md:p-10 rounded-3xl border border-[#bccabf] shadow-lg">
        {/* Top Header Badge */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#ebf6ee] text-[#006a42] flex items-center justify-center mx-auto mb-4 border border-[#62dd9e]">
            <span className="material-symbols-outlined text-4xl">verified_user</span>
          </div>
          <span className="text-[11px] font-code-badge text-[#006a42] uppercase tracking-widest bg-[#f1fcf4] px-3 py-1 rounded-full border border-[#62dd9e]/40 inline-block mb-2">
            ESCROW VAULT SECURED // MULTI-SIG CONFIRMED
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-[#141e19]">
            Milestone Contract Activated
          </h1>
          <p className="text-xs text-[#535f59] mt-2 font-body-sm">
            Funds are locked in multi-signature escrow. Payment will release to the artisan only after you review and approve each deliverable.
          </p>
        </div>

        {/* Certificate Breakdown Box */}
        <div className="bg-[#f1fcf4] p-6 rounded-2xl border border-[#bccabf]/60 mb-8 space-y-4 text-xs font-body-sm">
          <div className="flex justify-between items-center pb-3 border-b border-[#bccabf]/40">
            <span className="text-[#6d7a70]">Contract ID</span>
            <span className="font-code-badge font-bold text-[#141e19]">{orderId}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-[#bccabf]/40">
            <span className="text-[#6d7a70]">Deliverable Specification</span>
            <span className="font-semibold text-[#141e19] text-right truncate max-w-xs">{serviceTitle}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-[#bccabf]/40">
            <span className="text-[#6d7a70]">Multi-Sig Custody Amount</span>
            <span className="font-headline-sm font-bold text-[#006a42] text-sm">${amount} USD</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-[#bccabf]/40">
            <span className="text-[#6d7a70]">Platform Escrow Protection Fee</span>
            <span className="font-code-badge text-[#3d4a41]">Included (Platform settings: 5%)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#6d7a70]">Target Milestone 01 Delivery</span>
            <span className="font-semibold text-[#141e19]">Within 48 hours</span>
          </div>
        </div>

        {/* Milestone Phasing Steps */}
        <div className="mb-8">
          <h3 className="font-headline-sm text-sm font-bold text-[#141e19] mb-3">
            Execution Roadmap
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#ebf6ee] rounded-xl border-l-4 border-[#006a42] flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#141e19]">Phase 1: Heuristic Diagnostic & Token Audit</p>
                <p className="text-[11px] text-[#535f59]">30% allocation ($375.00) in escrow</p>
              </div>
              <span className="text-[10px] font-code-badge bg-[#006a42] text-white px-2 py-0.5 rounded">In Progress</span>
            </div>
            <div className="p-3 bg-[#f1fcf4] rounded-xl border-l-4 border-[#bccabf] flex items-center justify-between opacity-80">
              <div>
                <p className="font-semibold text-[#141e19]">Phase 2: Primitives & Component Variables</p>
                <p className="text-[11px] text-[#535f59]">40% allocation ($500.00) in escrow</p>
              </div>
              <span className="text-[10px] font-code-badge bg-[#dae5dd] text-[#3d4a41] px-2 py-0.5 rounded">Queued</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 border-t border-[#bccabf]/30">
          <Link
            to="/client/briefs"
            className="px-6 py-2.5 rounded-xl bg-[#006a42] hover:bg-[#008655] text-white text-xs font-semibold text-center transition-colors shadow-sm"
          >
            Go to Client Workspace
          </Link>
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-xl border border-[#bccabf] hover:bg-[#f1fcf4] text-[#141e19] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            <span>Download Escrow Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
}
