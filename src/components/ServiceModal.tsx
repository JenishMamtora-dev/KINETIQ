import React, { useState } from 'react';
import { ServiceDeliverable } from '../types';

interface ServiceModalProps {
  service: ServiceDeliverable | null;
  onClose: () => void;
  onLockEscrow: (serviceTitle: string, amount: number) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onLockEscrow,
}) => {
  const [selectedMilestoneIdx, setSelectedMilestoneIdx] = useState<number>(0);
  const [escrowLocked, setEscrowLocked] = useState<boolean>(false);
  const [activePackage, setActivePackage] = useState<'Standard' | 'Extended' | 'Enterprise'>('Standard');

  if (!service) return null;

  const packageMultiplier = activePackage === 'Standard' ? 1 : activePackage === 'Extended' ? 1.6 : 2.5;
  const currentPrice = Math.round(service.startingPrice * packageMultiplier);

  const handleCommitEscrow = () => {
    setEscrowLocked(true);
    onLockEscrow(service.title, currentPrice);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl overflow-y-auto border border-[#bccabf]/40 flex flex-col">
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-[#bccabf]/30">
          <div className="flex items-center gap-2">
            <span className="font-code-badge text-xs text-[#006a42] uppercase font-bold">
              [ VERIFIED DELIVERABLE SPECIFICATION ]
            </span>
            <span className="text-[#6d7a70] text-xs font-mono">• {service.category}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f1fcf4] hover:bg-[#ebf6ee] flex items-center justify-center text-[#141e19] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Top Banner Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7 relative aspect-[16/10] rounded-xl overflow-hidden bg-black/10">
              <img
                src={service.imageUrl}
                alt={service.imageAlt}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-3 left-3 px-3 py-1 rounded bg-[#28332d]/90 text-[#80fab9] font-code-badge text-xs">
                {service.turnaroundText}
              </span>
            </div>

            <div className="md:col-span-5 flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <img
                    src={service.author.avatarUrl}
                    alt={service.author.avatarAlt}
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-[#006a42]"
                  />
                  <div>
                    <h4 className="font-label-md text-sm text-[#141e19]">
                      {service.author.name}
                    </h4>
                    <span className="font-code-badge text-[11px] text-[#006a42]">
                      {service.author.acceptanceRate} Verified
                    </span>
                  </div>
                </div>

                <h2 className="font-headline-md text-xl md:text-2xl text-[#141e19] mt-3">
                  {service.title}
                </h2>

                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-500 text-xs font-semibold">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span>{service.rating}</span>
                  </div>
                  <span className="text-xs text-[#6d7a70]">({service.reviewCount} verified client reviews)</span>
                </div>
              </div>

              {/* Package selector */}
              <div className="p-3 bg-[#f1fcf4] rounded-xl border border-[#bccabf]/30">
                <span className="text-[11px] font-mono text-[#6d7a70] uppercase block mb-1.5">
                  Package Tier
                </span>
                <div className="grid grid-cols-3 gap-1 p-1 bg-[#e5f1e8] rounded-lg">
                  {(['Standard', 'Extended', 'Enterprise'] as const).map((pkg) => (
                    <button
                      key={pkg}
                      onClick={() => setActivePackage(pkg)}
                      className={`py-1 text-xs font-medium rounded-md transition-colors ${
                        activePackage === pkg
                          ? 'bg-white text-[#141e19] shadow-sm font-semibold'
                          : 'text-[#3d4a41] hover:text-[#141e19]'
                      }`}
                    >
                      {pkg}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#bccabf]/30">
                  <span className="text-xs text-[#3d4a41]">Escrow Amount:</span>
                  <span className="font-mono text-xl font-bold text-[#006a42]">
                    ${currentPrice.toLocaleString()} USD
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Overview & Included Items */}
          <div>
            <h3 className="font-headline-sm text-base text-[#141e19] mb-2">Scope Specification</h3>
            <p className="text-sm text-[#3d4a41] leading-relaxed">
              {service.overview}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
              {service.includedItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#f1fcf4] border border-[#bccabf]/20 text-xs text-[#141e19]">
                  <span className="material-symbols-outlined text-[#006a42] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones Breakdown */}
          <div className="p-5 rounded-xl bg-[#ebf6ee] border border-[#006a42]/20">
            <div className="flex items-center justify-between mb-4">
              <span className="font-code-badge text-xs text-[#006a42] uppercase font-bold">
                ESCROW RELEASE SCHEDULE ({service.milestones.length} STAGES)
              </span>
              <span className="text-[11px] font-mono text-[#6d7a70]">Multi-Sig Governed</span>
            </div>

            <div className="space-y-3">
              {service.milestones.map((m, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedMilestoneIdx(idx)}
                  className={`p-4 rounded-xl transition-all cursor-pointer border ${
                    selectedMilestoneIdx === idx
                      ? 'bg-white border-[#006a42] shadow-sm'
                      : 'bg-white/60 hover:bg-white border-[#bccabf]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#141e19]">
                      {m.phase}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#006a42] px-2 py-0.5 rounded bg-[#e5f1e8]">
                      {m.percentage}% (${Math.round((currentPrice * m.percentage) / 100).toLocaleString()})
                    </span>
                  </div>
                  <p className="text-xs text-[#3d4a41] mt-1.5">{m.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {m.deliverables.map((deliv, dIdx) => (
                      <span key={dIdx} className="font-mono text-[10px] text-[#6d7a70] bg-[#f1fcf4] px-2 py-0.5 rounded border border-[#bccabf]/20">
                        Artifact: {deliv}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#bccabf]/30">
            <div className="flex items-center gap-2 text-xs text-[#6d7a70]">
              <span className="material-symbols-outlined text-[#006a42] text-[18px]">lock</span>
              <span>100% Escrow Protected • Instant Refund if milestones unmet</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg border border-[#bccabf] text-xs font-mono text-[#3d4a41] hover:bg-[#ebf6ee] w-full sm:w-auto"
              >
                Close
              </button>
              <button
                onClick={handleCommitEscrow}
                disabled={escrowLocked}
                className={`px-6 py-2.5 rounded-lg font-label-md text-sm text-white flex items-center justify-center gap-2 w-full sm:w-auto transition-all ${
                  escrowLocked
                    ? 'bg-[#008655] cursor-default'
                    : 'bg-[#006a42] hover:bg-[#008655] shadow-md hover:-translate-y-0.5'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {escrowLocked ? 'check_circle' : 'lock_open'}
                </span>
                <span>
                  {escrowLocked ? 'Escrow Vault Locked!' : `Commission & Lock $${currentPrice.toLocaleString()}`}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
