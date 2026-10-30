import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '../lib/seo';

export function ForbiddenPage() {
  useEffect(() => {
    applySeo({
      title: '403 Forbidden Access | KINETIQ',
      description: 'You do not have the required clearance to access this restricted escrow ledger or admin partition.',
      canonicalPath: '/403',
      noIndex: true,
    });
  }, []);

  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center py-16 px-margin-mobile">
      <div className="bg-[#002111] text-[#f1fcf4] p-10 rounded-3xl border border-[#62dd9e]/30 shadow-2xl max-w-lg w-full text-center relative overflow-hidden">
        {/* Background glow accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#006a42]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-[#62dd9e] flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-4xl">lock</span>
        </div>

        <span className="text-[11px] font-code-badge text-[#96f3bf] uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/10 inline-block mb-3">
          ERROR CODE // 403 RESTRICTED
        </span>

        <h1 className="font-headline-lg text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Access Clearance Denied
        </h1>

        <p className="font-body-md text-[#dae5dd] text-sm leading-relaxed mb-8">
          The requested ledger partition or administrative node requires elevated multi-sig administrative credentials or explicit milestone contract assignment.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-[#006a42] hover:bg-[#008655] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">home</span>
            <span>Return to Marketplace</span>
          </Link>
          <Link
            to="/onboarding"
            className="px-5 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-[#f1fcf4] text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">switch_account</span>
            <span>Switch Role</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
