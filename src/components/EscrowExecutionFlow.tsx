import React, { useState } from 'react';

export const EscrowExecutionFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(2); // Default to Collaborate/Escrow
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [calcBudget, setCalcBudget] = useState<number>(4500);
  const [milestone1Pct, setMilestone1Pct] = useState<number>(30);
  const [milestone2Pct, setMilestone2Pct] = useState<number>(40);

  const milestone3Pct = Math.max(0, 100 - milestone1Pct - milestone2Pct);

  const steps = [
    {
      step: '01 // DISCOVER',
      title: 'Discover',
      description: 'Intelligent matching or direct directory exploration. Zero noise.',
      footerIcon: 'travel_explore',
      footerLabel: 'AI Search Index',
      detailSnippet: 'Search across 4,800+ vetted specialists with precise capability tokens, proven production repos, and verified portfolio artifacts.',
    },
    {
      step: '02 // COMPARE',
      title: 'Compare',
      description: 'Inspect real deliverables, past repo metrics, and transparent scope packages.',
      footerIcon: 'analytics',
      footerLabel: 'Milestone Cards',
      detailSnippet: 'Fixed prices and explicit deliverable definitions eliminate ambiguous billing scopes or unexpected hourly overruns.',
    },
    {
      step: '03 // COLLABORATE',
      title: 'Collaborate',
      description: 'Direct encrypted workspace. Lock funds safely into milestone vaults.',
      footerIcon: 'lock',
      footerLabel: 'Protected Escrow',
      detailSnippet: 'Funds are securely deposited in multi-signature escrow vaults before work starts, providing 100% solvency assurance.',
    },
    {
      step: '04 // DELIVER',
      title: 'Deliver',
      description: 'Inspect production artifacts, prototype staging, and revisions in real-time.',
      footerIcon: 'deployed_code',
      footerLabel: 'Versioned Releases',
      detailSnippet: 'Preview work on live staging environments or cryptographic PR reviews with immutable version stamps.',
    },
    {
      step: '05 // REVIEW',
      title: 'Review',
      description: 'Escrow disbursement triggers automatically upon milestone signoff.',
      footerIcon: 'verified',
      footerLabel: 'Instant Payout',
      detailSnippet: 'Client clicks "Approve Milestone Artifact" and payout releases immediately to the creator with zero deduction friction.',
    },
  ];

  return (
    <section id="escrow-section" className="w-full bg-white py-20 border-b border-[#bccabf]/20">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-code-badge text-code-badge text-[#006a42] uppercase tracking-wider font-semibold">
            [ ESCROW &amp; EXECUTION ]
          </span>
          <h2 className="font-headline-lg text-headline-lg tracking-tight text-[#141e19] mt-2">
            From first search to finished project.
          </h2>
          <p className="font-body-md text-body-md text-[#3d4a41] mt-2">
            Clear governance at every phase so both clients and talent build with high conviction.
          </p>

          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e5f1e8] hover:bg-[#dfebe3] text-xs font-mono text-[#006a42] transition-colors cursor-pointer border border-[#006a42]/20"
          >
            <span className="material-symbols-outlined text-[16px]">calculate</span>
            <span>{showCalculator ? 'Hide Escrow Simulator' : 'Simulate Escrow Milestone Allocation'}</span>
          </button>
        </div>

        {/* 5-Step Horizontal Grid with Lineage */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((st, i) => {
            const isSelected = activeStep === i;
            return (
              <div
                key={i}
                onClick={() => setActiveStep(i)}
                className={`p-6 rounded-xl flex flex-col justify-between h-full transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#ebf6ee] border-[#006a42] shadow-md -translate-y-1'
                    : 'bg-[#ebf6ee]/60 hover:bg-[#ebf6ee] border-[#bccabf]/30'
                }`}
              >
                <div>
                  <span
                    className={`font-code-badge text-code-badge font-bold ${
                      isSelected ? 'text-[#006a42]' : 'text-[#6d7a70]'
                    }`}
                  >
                    {st.step}
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-[#141e19] mt-4">
                    {st.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#3d4a41] mt-2">
                    {st.description}
                  </p>
                  {isSelected && (
                    <p className="mt-3 text-xs text-[#006a42] bg-white/70 p-2 rounded border border-[#006a42]/15 animate-fade-in font-medium">
                      {st.detailSnippet}
                    </p>
                  )}
                </div>
                <div className="mt-6 pt-4 border-t border-[#bccabf]/30 flex items-center gap-1.5 text-[#6d7a70]">
                  <span className="material-symbols-outlined text-[16px]">{st.footerIcon}</span>
                  <span className="font-code-badge text-[11px]">{st.footerLabel}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Escrow Simulator Box */}
        {showCalculator && (
          <div className="mt-10 p-6 md:p-8 rounded-2xl bg-[#ebf6ee]/80 border border-[#006a42]/30 shadow-lg animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#bccabf]/40">
              <div>
                <span className="font-code-badge text-[11px] text-[#006a42] uppercase font-bold tracking-wider">
                  INTERACTIVE VAULT CALCULATOR
                </span>
                <h4 className="font-headline-md text-xl font-bold text-[#141e19] mt-1">
                  Model Your Project Escrow Tranches
                </h4>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#3d4a41] font-mono">Commission Budget:</span>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-sm font-mono text-[#141e19] font-bold">$</span>
                  <input
                    type="number"
                    value={calcBudget}
                    onChange={(e) => setCalcBudget(Number(e.target.value))}
                    step="500"
                    min="500"
                    max="100000"
                    className="w-36 pl-7 pr-3 py-1.5 rounded-lg border border-[#bccabf] bg-white font-mono text-sm font-bold text-[#141e19] focus:outline-none focus:ring-1 focus:ring-[#006a42]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              {/* Tranche 1 */}
              <div className="bg-white p-5 rounded-xl border border-[#bccabf]/40">
                <div className="flex items-center justify-between text-xs font-mono text-[#6d7a70]">
                  <span>TRANCHE 1 (DISCOVERY)</span>
                  <span className="font-bold text-[#006a42]">{milestone1Pct}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={milestone1Pct}
                  onChange={(e) => setMilestone1Pct(Number(e.target.value))}
                  className="w-full accent-[#006a42] mt-3"
                />
                <div className="mt-4 pt-3 border-t border-[#bccabf]/20 flex items-center justify-between">
                  <span className="text-xs text-[#3d4a41]">Locked in Vault:</span>
                  <span className="font-mono font-bold text-[#141e19] text-base">
                    ${Math.round((calcBudget * milestone1Pct) / 100).toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-[#6d7a70] mt-1">Releases on wireframes &amp; system schema signoff.</p>
              </div>

              {/* Tranche 2 */}
              <div className="bg-white p-5 rounded-xl border border-[#bccabf]/40">
                <div className="flex items-center justify-between text-xs font-mono text-[#6d7a70]">
                  <span>TRANCHE 2 (CORE BUILD)</span>
                  <span className="font-bold text-[#006a42]">{milestone2Pct}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="70"
                  value={milestone2Pct}
                  onChange={(e) => setMilestone2Pct(Number(e.target.value))}
                  className="w-full accent-[#006a42] mt-3"
                />
                <div className="mt-4 pt-3 border-t border-[#bccabf]/20 flex items-center justify-between">
                  <span className="text-xs text-[#3d4a41]">Locked in Vault:</span>
                  <span className="font-mono font-bold text-[#141e19] text-base">
                    ${Math.round((calcBudget * milestone2Pct) / 100).toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-[#6d7a70] mt-1">Releases on interactive staging prototype review.</p>
              </div>

              {/* Tranche 3 */}
              <div className="bg-white p-5 rounded-xl border border-[#bccabf]/40">
                <div className="flex items-center justify-between text-xs font-mono text-[#6d7a70]">
                  <span>TRANCHE 3 (FINAL RELEASE)</span>
                  <span className="font-bold text-[#006a42]">{milestone3Pct}%</span>
                </div>
                <div className="h-4 mt-3 flex items-center">
                  <div className="w-full bg-[#e5f1e8] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#006a42] h-full"
                      style={{ width: `${milestone3Pct}%` }}
                    ></div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#bccabf]/20 flex items-center justify-between">
                  <span className="text-xs text-[#3d4a41]">Locked in Vault:</span>
                  <span className="font-mono font-bold text-[#141e19] text-base">
                    ${Math.round((calcBudget * milestone3Pct) / 100).toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-[#6d7a70] mt-1">Releases upon code repository handover &amp; audit.</p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-white border border-[#006a42]/20 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#3d4a41]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006a42]">shield</span>
                <span>
                  <strong>Escrow Security Guarantee:</strong> Zero upfront payment directly to freelancer. Funds release strictly upon milestone signoff.
                </span>
              </div>
              <span className="font-code-badge text-[#006a42] font-bold">
                KINETIQ FEE: 0% CLIENT SURCHARGE
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
