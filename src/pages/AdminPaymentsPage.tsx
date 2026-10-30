import React, { useState, useEffect } from 'react';
import { INITIAL_ESCROWS, DEFAULT_PLATFORM_SETTINGS, SPECIALISTS_DATA } from '../data/marketplaceData';
import { EscrowTransaction, PlatformSettings, Specialist } from '../types';
import { applySeo } from '../lib/seo';

interface AdminPaymentsPageProps {
  onAddToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

export function AdminPaymentsPage({ onAddToast }: AdminPaymentsPageProps) {
  const [escrows, setEscrows] = useState<EscrowTransaction[]>([]);
  const [settings, setSettings] = useState<PlatformSettings>(DEFAULT_PLATFORM_SETTINGS);
  const [specialists, setSpecialists] = useState<Specialist[]>(SPECIALISTS_DATA);
  const [activeEmailTab, setActiveEmailTab] = useState<'welcome' | 'verification' | 'order' | 'delivered' | 'revision' | 'completed' | 'digest' | 'reset'>('order');

  useEffect(() => {
    applySeo({
      title: 'Escrow Treasury, Platform Fees & Email System | KINETIQ Admin',
      description: 'Manage treasury multi-sig vaults, configure commission fees, and audit transactional email providers.',
      canonicalPath: '/admin/payments',
      noIndex: true,
    });

    try {
      const storedEscrows = localStorage.getItem('kinetiq_escrows');
      if (storedEscrows) setEscrows(JSON.parse(storedEscrows));
      else setEscrows(INITIAL_ESCROWS);

      const storedSettings = localStorage.getItem('kinetiq_platform_settings');
      if (storedSettings) setSettings(JSON.parse(storedSettings));
      else setSettings(DEFAULT_PLATFORM_SETTINGS);

      const storedSpecs = localStorage.getItem('kinetiq_specialists');
      if (storedSpecs) setSpecialists(JSON.parse(storedSpecs));
      else setSpecialists(SPECIALISTS_DATA);
    } catch {
      setEscrows(INITIAL_ESCROWS);
      setSettings(DEFAULT_PLATFORM_SETTINGS);
      setSpecialists(SPECIALISTS_DATA);
    }
  }, []);

  const saveSettings = (newSettings: PlatformSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem('kinetiq_platform_settings', JSON.stringify(newSettings));
    } catch {}
    onAddToast('success', 'Settings Updated', `Platform commission set to ${newSettings.commissionPercent}%.`);
  };

  const handleToggleVerification = (specId: string) => {
    const updated = specialists.map((s) => (s.id === specId ? { ...s, verified: !s.verified } : s));
    setSpecialists(updated);
    try {
      localStorage.setItem('kinetiq_specialists', JSON.stringify(updated));
    } catch {}
    const changed = updated.find((s) => s.id === specId);
    onAddToast(
      'success',
      'Artisan Badge Updated',
      `${changed?.name} verified badge status is now: ${changed?.verified ? 'VERIFIED (Active)' : 'UNVERIFIED'}`
    );
  };

  const handleReleaseMilestone = (escrowId: string) => {
    const updated = escrows.map((e) =>
      e.id === escrowId ? { ...e, status: 'Milestone 1 Released' as const } : e
    );
    setEscrows(updated);
    try {
      localStorage.setItem('kinetiq_escrows', JSON.stringify(updated));
    } catch {}
    onAddToast('success', 'Milestone Funds Released', `Released milestone tranche for contract #${escrowId}.`);
  };

  const totalVaultCustody = escrows.reduce((sum, e) => sum + e.amount, 0);
  const totalPlatformFeesCollected = escrows.reduce((sum, e) => sum + e.platformFee, 0);

  return (
    <div className="w-full min-h-screen py-10 px-margin-mobile md:px-margin max-w-6xl mx-auto space-y-10">
      {/* Page Header */}
      <div>
        <span className="text-[11px] font-code-badge text-[#006a42] uppercase tracking-widest bg-[#ebf6ee] px-3 py-1 rounded-full border border-[#bccabf]/50 inline-block mb-2">
          FINANCIAL OPERATIONS // MULTI-SIG TREASURY
        </span>
        <h1 className="font-headline-lg text-3xl font-bold text-[#141e19]">
          Platform Fees & Escrow Administration
        </h1>
        <p className="font-body-md text-xs text-[#535f59] mt-1">
          Configure server-side commission rates, oversee multi-sig settlement tranches, and test transactional email dispatches.
        </p>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-[#bccabf] shadow-sm">
          <span className="text-xs font-semibold text-[#6d7a70] uppercase font-code-badge">
            Total Vault In Custody
          </span>
          <p className="font-headline-lg text-2xl font-bold text-[#006a42] mt-1">
            ${totalVaultCustody.toLocaleString()} USD
          </p>
          <span className="text-[11px] text-[#535f59] mt-1 block">
            Cryptographically locked across {escrows.length} active orders
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#bccabf] shadow-sm">
          <span className="text-xs font-semibold text-[#6d7a70] uppercase font-code-badge">
            Platform Protocol Earnings
          </span>
          <p className="font-headline-lg text-2xl font-bold text-[#141e19] mt-1">
            ${totalPlatformFeesCollected.toLocaleString()} USD
          </p>
          <span className="text-[11px] text-[#006a42] font-semibold mt-1 block">
            Standard {settings.commissionPercent}% platform commission
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#bccabf] shadow-sm">
          <span className="text-xs font-semibold text-[#6d7a70] uppercase font-code-badge">
            Transactional Email Status
          </span>
          <p className="font-headline-lg text-base font-bold text-[#b8860b] mt-1 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b8860b]" />
            <span>Setup Required</span>
          </p>
          <span className="text-[11px] text-[#535f59] mt-1 block">
            Template simulator active (Resend / Postmark ready)
          </span>
        </div>
      </div>

      {/* Section 1: Configurable Commission Model */}
      <div className="bg-white p-6 rounded-2xl border border-[#bccabf] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-[#006a42]">tune</span>
          <h2 className="font-headline-sm text-base font-bold text-[#141e19]">
            Configurable Platform Fee Parameters
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div>
            <label className="block font-semibold text-[#141e19] mb-1">
              Platform Commission (%)
            </label>
            <input
              type="number"
              step="0.5"
              min="1"
              max="20"
              value={settings.commissionPercent}
              onChange={(e) =>
                saveSettings({ ...settings, commissionPercent: parseFloat(e.target.value) || 0 })
              }
              className="w-full p-2.5 rounded-xl bg-[#f1fcf4] border border-[#bccabf] font-code-badge font-bold text-[#006a42]"
            />
            <p className="text-[10px] text-[#6d7a70] mt-1">Deducted automatically from artisan payout upon milestone release.</p>
          </div>

          <div>
            <label className="block font-semibold text-[#141e19] mb-1">
              Client Escrow Multi-Sig Fee (%)
            </label>
            <input
              type="number"
              step="0.5"
              min="0"
              max="10"
              value={settings.clientEscrowFeePercent}
              onChange={(e) =>
                saveSettings({ ...settings, clientEscrowFeePercent: parseFloat(e.target.value) || 0 })
              }
              className="w-full p-2.5 rounded-xl bg-[#f1fcf4] border border-[#bccabf] font-code-badge font-bold text-[#141e19]"
            />
            <p className="text-[10px] text-[#6d7a70] mt-1">Displayed transparently on client invoice breakdown.</p>
          </div>

          <div>
            <label className="block font-semibold text-[#141e19] mb-1">
              Minimum Dispute Hold Window (Days)
            </label>
            <input
              type="number"
              min="1"
              max="14"
              value={settings.minEscrowHoldDays}
              onChange={(e) =>
                saveSettings({ ...settings, minEscrowHoldDays: parseInt(e.target.value) || 3 })
              }
              className="w-full p-2.5 rounded-xl bg-[#f1fcf4] border border-[#bccabf] font-code-badge font-bold text-[#141e19]"
            />
            <p className="text-[10px] text-[#6d7a70] mt-1">Statutory arbitration window before funds are finalized.</p>
          </div>
        </div>
      </div>

      {/* Section 2: Artisan Verification Administration Flow (Requirement 7) */}
      <div className="bg-white p-6 rounded-2xl border border-[#bccabf] shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006a42]">verified</span>
            <h2 className="font-headline-sm text-base font-bold text-[#141e19]">
              Artisan Profile Verification Admin Flow
            </h2>
          </div>
          <span className="text-[11px] font-code-badge text-[#535f59]">
            Requirement: Verified badge appears ONLY when admin sets verified=true
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-body-sm">
            <thead className="bg-[#ebf6ee] text-[#3d4a41] uppercase tracking-wider font-code-badge text-[10px]">
              <tr>
                <th className="p-3">Artisan Name</th>
                <th className="p-3">Role & Discipline</th>
                <th className="p-3">Completed Escrows</th>
                <th className="p-3">Hourly Rate</th>
                <th className="p-3">Current Status</th>
                <th className="p-3 text-right">Admin Verification Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#bccabf]/30">
              {specialists.map((spec) => (
                <tr key={spec.id} className="hover:bg-[#f1fcf4]/50">
                  <td className="p-3 font-semibold text-[#141e19] flex items-center gap-2">
                    <img
                      src={spec.avatarUrl}
                      alt=""
                      className="w-7 h-7 rounded-full object-cover border border-[#62dd9e]"
                    />
                    <span>{spec.name}</span>
                  </td>
                  <td className="p-3 text-[#535f59]">{spec.role}</td>
                  <td className="p-3 font-code-badge">{spec.completedEscrows}</td>
                  <td className="p-3 font-code-badge font-semibold">${spec.hourlyRate}/hr</td>
                  <td className="p-3">
                    {spec.verified ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-code-badge text-[#006a42] bg-[#f1fcf4] px-2 py-0.5 rounded-full border border-[#62dd9e]">
                        <span className="material-symbols-outlined text-[12px]">verified</span>
                        VERIFIED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-code-badge text-[#6d7a70] bg-[#dae5dd] px-2 py-0.5 rounded-full">
                        PENDING REVIEW
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleToggleVerification(spec.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        spec.verified
                          ? 'border border-[#ba1a1a] text-[#ba1a1a] hover:bg-[#ffdad6]'
                          : 'bg-[#006a42] text-white hover:bg-[#008655]'
                      }`}
                    >
                      {spec.verified ? 'Revoke Verified Badge' : 'Grant Verified Badge'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 3: Escrow Orders & Milestone Releases */}
      <div className="bg-white p-6 rounded-2xl border border-[#bccabf] shadow-sm">
        <h2 className="font-headline-sm text-base font-bold text-[#141e19] mb-4">
          Active Multi-Sig Escrow Settlements
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-body-sm">
            <thead className="bg-[#ebf6ee] text-[#3d4a41] uppercase tracking-wider font-code-badge text-[10px]">
              <tr>
                <th className="p-3">Order #</th>
                <th className="p-3">Client & Artisan</th>
                <th className="p-3">Service Scope</th>
                <th className="p-3">Escrow Value</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Settlement Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#bccabf]/30">
              {escrows.map((esc) => (
                <tr key={esc.id} className="hover:bg-[#f1fcf4]/50">
                  <td className="p-3 font-code-badge font-bold text-[#006a42]">{esc.orderNumber}</td>
                  <td className="p-3">
                    <span className="font-semibold text-[#141e19] block">{esc.clientName}</span>
                    <span className="text-[10px] text-[#6d7a70]">Artisan: {esc.specialistName}</span>
                  </td>
                  <td className="p-3 text-[#3d4a41] max-w-xs truncate">{esc.serviceTitle}</td>
                  <td className="p-3 font-code-badge font-bold text-[#141e19]">
                    ${esc.amount.toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span className="text-[10px] font-code-badge px-2 py-0.5 rounded-full bg-[#f1fcf4] text-[#006a42] border border-[#62dd9e]">
                      {esc.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {esc.status === 'Funded in Multi-Sig' ? (
                      <button
                        onClick={() => handleReleaseMilestone(esc.id)}
                        className="px-3 py-1 bg-[#006a42] hover:bg-[#008655] text-white text-[11px] font-semibold rounded-lg shadow-sm"
                      >
                        Release Tranche 1
                      </button>
                    ) : (
                      <span className="text-[10px] font-code-badge text-[#6d7a70]">Tranche Settled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 4: Transactional Email Templates Preview (Requirement 6) */}
      <div className="bg-white p-6 rounded-2xl border border-[#bccabf] shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          <div>
            <h2 className="font-headline-sm text-base font-bold text-[#141e19]">
              Transactional Email Suite (8 Templates)
            </h2>
            <p className="text-xs text-[#535f59]">
              Provider configuration: <span className="font-mono text-[#b8860b]">Setup Required (Resend/Postmark API key not detected in env)</span>
            </p>
          </div>
          <span className="text-[10px] font-code-badge bg-[#ebf6ee] text-[#006a42] px-3 py-1 rounded-full border border-[#62dd9e]">
            Zero Sensitive Data Logged
          </span>
        </div>

        {/* Tabs for all 8 templates */}
        <div className="flex flex-wrap gap-1.5 mb-4 border-b border-[#bccabf]/30 pb-3 text-xs">
          {[
            { id: 'welcome', label: '1. Welcome' },
            { id: 'verification', label: '2. Email Verification' },
            { id: 'order', label: '3. Order Placed' },
            { id: 'delivered', label: '4. Milestone Delivered' },
            { id: 'revision', label: '5. Revision Requested' },
            { id: 'completed', label: '6. Escrow Completed' },
            { id: 'digest', label: '7. Message Digest' },
            { id: 'reset', label: '8. Password Reset' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveEmailTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold text-[11px] transition-colors ${
                activeEmailTab === tab.id
                  ? 'bg-[#002111] text-[#62dd9e]'
                  : 'bg-[#f1fcf4] text-[#3d4a41] hover:bg-[#ebf6ee]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Template Preview Box */}
        <div className="bg-[#002111] text-[#f1fcf4] p-6 rounded-xl font-mono text-xs border border-[#62dd9e]/30">
          <div className="text-[11px] text-[#96f3bf] mb-3 pb-2 border-b border-white/10 flex justify-between">
            <span>Subject: {
              activeEmailTab === 'welcome' ? 'Welcome to KINETIQ — Multi-Sig Security Protocol' :
              activeEmailTab === 'verification' ? 'Your KINETIQ 6-Digit Authentication Token' :
              activeEmailTab === 'order' ? 'Vault Lock Initialized: Order KQ-ESC-2026-901' :
              activeEmailTab === 'delivered' ? 'Milestone Tranche 01 Ready for Client Review' :
              activeEmailTab === 'revision' ? 'Deliverable Revision Requested on Milestone 02' :
              activeEmailTab === 'completed' ? 'Contract Completed & Multi-Sig Vault Discharged' :
              activeEmailTab === 'digest' ? 'Daily Artisan Workspace Digest: 3 Unread Briefs' :
              'Cryptographic Password Reset Token Request'
            }</span>
            <span>From: concierge@kinetiq.design</span>
          </div>

          <div className="space-y-3 font-sans text-xs text-[#dae5dd] leading-relaxed">
            <p>Dear Partner,</p>
            <p>
              {activeEmailTab === 'welcome' &&
                'Your enterprise profile on KINETIQ is confirmed. You now hold access to the Top 1% curated artisan roster backed by multi-sig vault contracts.'}
              {activeEmailTab === 'verification' &&
                'Your single-use 6-digit confirmation token is: 849-210. Valid for 15 minutes.'}
              {activeEmailTab === 'order' &&
                'Funds totaling $1,250.00 have been confirmed in multi-sig custody for "Enterprise Design System & Web App UX Audit". Work begins immediately.'}
              {activeEmailTab === 'delivered' &&
                'Specialist Elena Rostova has uploaded Milestone 01 artifacts. Please review deliverables in your client dashboard before releasing payment.'}
              {activeEmailTab === 'revision' &&
                'A precision revision request was submitted regarding Milestone 02 deliverables. Resolution target is within 48 hours.'}
              {activeEmailTab === 'completed' &&
                'All milestones have been signed off. Multi-sig funds have successfully been discharged to the artisan. Thank you for commissioning via KINETIQ.'}
              {activeEmailTab === 'digest' &&
                'You have 2 pending inquiry requests from enterprise teams regarding Brand Identity and AI System deployment.'}
              {activeEmailTab === 'reset' &&
                'We received a password reset request. Click the secure link to update your cryptographic login credentials.'}
            </p>
            <p className="pt-2 text-[10px] text-[#96f3bf] font-mono">
              // KINETIQ Autonomous Escrow Notification Service
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
