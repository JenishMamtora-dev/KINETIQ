import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '../lib/seo';

export function LegalRefundsPage() {
  useEffect(() => {
    applySeo({
      title: 'Cancellation, Refunds & Escrow Dispute Policy | KINETIQ',
      description: 'Defined rules governing milestone cancellations, multi-sig refunds, and tripartite arbitration procedures.',
      canonicalPath: '/legal/refunds',
    });
  }, []);

  return (
    <div className="w-full min-h-screen py-12 px-margin-mobile md:px-margin max-w-4xl mx-auto font-body-sm text-[#141e19]">
      <div className="mb-8 border-b border-[#bccabf]/40 pb-6">
        <span className="text-[11px] font-code-badge text-[#006a42] uppercase tracking-widest bg-[#ebf6ee] px-3 py-1 rounded-full border border-[#bccabf]/50 inline-block mb-3">
          DISPUTE PROTOCOL // ESCROW ARBITRATION
        </span>
        <h1 className="font-headline-lg text-3xl md:text-4xl font-bold tracking-tight">
          Cancellation, Refunds & Dispute Rules
        </h1>
        <p className="text-xs text-[#535f59] mt-2">
          Enforceable order transitions, milestone release gates, and tripartite arbitration.
        </p>
      </div>

      <div className="space-y-8 leading-relaxed text-xs md:text-sm text-[#3d4a41]">
        {/* Order Lifecycle State Transitions */}
        <section className="space-y-3">
          <h2 className="font-headline-sm text-lg font-bold text-[#141e19]">
            1. Enforced Order State Transitions
          </h2>
          <p>
            To prevent arbitrary fund locking, every KINETIQ milestone contract follows deterministic state transitions:
          </p>

          <div className="p-4 rounded-xl bg-white border border-[#bccabf] space-y-2 font-mono text-[11px]">
            <p className="text-[#006a42] font-bold">
              [DRAFT] → [FUNDED_IN_MULTISIG] → [MILESTONE_DELIVERED] → [REVIEW_WINDOW] → [RELEASED_TO_ARTISAN]
            </p>
            <p className="text-[#ba1a1a]">
              Branch: [REVIEW_WINDOW] → [REVISION_REQUESTED] (Max defined revisions)
            </p>
            <p className="text-[#854d0e]">
              Branch: [REVISION_EXHAUSTED] → [DISPUTE_ARBITRATION] → [PARTIAL_REFUND | FULL_REFUND]
            </p>
          </div>
        </section>

        {/* Cancellation Windows */}
        <section className="space-y-2">
          <h2 className="font-headline-sm text-lg font-bold text-[#141e19]">
            2. Client Cancellation Windows
          </h2>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs">
            <li>
              <strong>Prior to Work Commencement:</strong> Full 100% refund of deposited escrow tranches minus third-party network gas or processing costs (within 24 hours of funding).
            </li>
            <li>
              <strong>Active Milestone 01 in Progress:</strong> If an artisan fails to deliver by the agreed turnaround deadline, the client may invoke automatic cancellation and full escrow reclamation.
            </li>
            <li>
              <strong>Approved Milestones:</strong> Once a client signs off on a milestone deliverable and funds are released from the multi-sig vault to the artisan, that tranche is final and non-refundable.
            </li>
          </ul>
        </section>

        {/* Revision Limits */}
        <section className="space-y-2">
          <h2 className="font-headline-sm text-lg font-bold text-[#141e19]">
            3. Revision Thresholds & Scope Governance
          </h2>
          <p>
            Every deliverable specifies included formal revisions (typically 2 to 4 rounds). Revisions must align with the initial project brief specifications. Requests introducing entirely new features, tech stacks, or branding vectors require a supplemental milestone brief.
          </p>
        </section>

        {/* Tripartite Arbitration */}
        <section className="space-y-2">
          <h2 className="font-headline-sm text-lg font-bold text-[#141e19]">
            4. Tripartite Dispute Arbitration
          </h2>
          <p>
            In the event of an irreconcilable scope impasse, either party may elevate the order to the KINETIQ Arbitration Board. A third-party technical auditor inspects the brief, deliverable artifacts, and message telemetry to execute a binding split of remaining escrow funds.
          </p>
        </section>

        <div className="pt-4 border-t border-[#bccabf]/40 flex justify-between items-center text-xs">
          <span>Need to open a milestone dispute?</span>
          <Link
            to="/client/briefs"
            className="px-4 py-2 bg-[#006a42] text-white rounded-lg font-semibold hover:bg-[#008655] transition-colors"
          >
            Manage Active Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
