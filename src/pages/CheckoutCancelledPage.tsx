import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '../lib/seo';

export function CheckoutCancelledPage() {
  const [selectedReason, setSelectedReason] = useState('Need internal stakeholder sign-off');

  useEffect(() => {
    applySeo({
      title: 'Checkout Suspended | KINETIQ Escrow',
      description: 'Your milestone checkout was suspended. No funds were debited.',
      canonicalPath: '/client/checkout/cancelled',
      noIndex: true,
    });
  }, []);

  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center py-14 px-margin-mobile">
      <div className="bg-white p-8 md:p-10 rounded-3xl border border-[#bccabf] shadow-lg max-w-lg w-full text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mx-auto mb-4 border border-[#ba1a1a]/30">
          <span className="material-symbols-outlined text-3xl">cancel</span>
        </div>

        <span className="text-[11px] font-code-badge text-[#6d7a70] uppercase tracking-widest bg-[#f1fcf4] px-3 py-1 rounded-full border border-[#bccabf]/50 inline-block mb-2">
          TRANSACTION SUSPENDED // NO CHARGES APPLIED
        </span>

        <h1 className="font-headline-md text-2xl font-bold text-[#141e19] mb-2">
          Escrow Checkout Cancelled
        </h1>
        <p className="text-xs text-[#535f59] mb-6 leading-relaxed font-body-sm">
          No funds were debited from your treasury vault. Your chosen deliverable and milestone specifications have been preserved.
        </p>

        <div className="text-left bg-[#f1fcf4] p-4 rounded-xl border border-[#bccabf]/40 mb-6 text-xs">
          <label className="block font-semibold text-[#141e19] mb-1.5">
            Help us calibrate (Optional feedback):
          </label>
          <select
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="w-full p-2 rounded-lg bg-white border border-[#bccabf] text-[#141e19]"
          >
            <option>Need internal stakeholder sign-off</option>
            <option>Questions regarding milestone scope or turnaround</option>
            <option>Exploring custom enterprise invoicing or wire transfer</option>
            <option>Decided on an alternate specialization</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/client/briefs"
            className="px-5 py-2.5 rounded-xl bg-[#006a42] hover:bg-[#008655] text-white text-xs font-semibold transition-colors"
          >
            Return to Briefs
          </Link>
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl border border-[#bccabf] hover:bg-[#f1fcf4] text-[#141e19] text-xs font-semibold transition-colors"
          >
            Browse Marketplace
          </Link>
        </div>
      </div>
    </div>
  );
}
