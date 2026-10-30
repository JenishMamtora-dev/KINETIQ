import React from 'react';

interface ClosingCtaProps {
  onFindTalentClick: () => void;
  onJoinSpecialistClick: () => void;
}

export const ClosingCta: React.FC<ClosingCtaProps> = ({
  onFindTalentClick,
  onJoinSpecialistClick,
}) => {
  return (
    <section className="relative w-full bg-[#28332d] text-[#e8f4eb] py-28 overflow-hidden">
      {/* Ambient particle mesh background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="48" height="48" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#80fab9" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin relative z-10 text-center flex flex-col items-center">
        {/* Glowing brand mark */}
        <div className="w-16 h-16 rounded-2xl bg-[#dae5dd]/20 flex items-center justify-center p-3 mb-6 shadow-2xl border border-[#80fab9]/30">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <polygon
              fill="none"
              points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
              stroke="#62dd9e"
              strokeWidth="6"
            />
            <polygon
              fill="#006a42"
              fillOpacity="0.6"
              points="50,15 80,32 80,68 50,85 20,68 20,32"
              stroke="#80fab9"
              strokeWidth="2"
            />
            <circle cx="50" cy="50" r="8" fill="#80fab9" />
          </svg>
        </div>

        <span className="font-code-badge text-code-badge tracking-widest text-[#80fab9] uppercase font-semibold">
          [ BEGIN COLLABORATION ]
        </span>

        <h2 className="font-display-hero text-display-hero tracking-tight text-[#f1fcf4] max-w-3xl mt-4">
          Your next great project starts{' '}
          <span className="font-editorial-accent text-editorial-accent italic text-[#80fab9]">
            here
          </span>
          .
        </h2>

        <p className="font-body-lg text-body-lg text-[#bccabf] max-w-xl mt-4">
          Join leading product teams, seed-stage founders, and iconic brands commissioning work across the KINETIQ network.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button
            onClick={onFindTalentClick}
            className="bg-[#006a42] text-white font-label-md text-label-md px-8 py-4 rounded-lg hover:bg-[#008655] transition-transform duration-150 ease-out hover:-translate-y-0.5 shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <span>Find High-Impact Talent</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
          <button
            onClick={onJoinSpecialistClick}
            className="bg-[#dae5dd]/20 text-[#f1fcf4] font-label-md text-label-md px-8 py-4 rounded-lg hover:bg-[#dae5dd]/35 transition-colors cursor-pointer border border-white/10"
          >
            Join as a Specialist
          </button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-[#dae5dd]/20 w-full max-w-4xl text-left">
          <div>
            <span className="font-code-badge text-code-badge text-[#80fab9]">ESCROW SECURE</span>
            <p className="font-body-sm text-body-sm text-[#bccabf] mt-1">Multi-signature vault release</p>
          </div>
          <div>
            <span className="font-code-badge text-code-badge text-[#80fab9]">IP OWNERSHIP</span>
            <p className="font-body-sm text-body-sm text-[#bccabf] mt-1">Full commercial rights transfer</p>
          </div>
          <div>
            <span className="font-code-badge text-code-badge text-[#80fab9]">TRANSPARENT FEES</span>
            <p className="font-body-sm text-body-sm text-[#bccabf] mt-1">Zero hidden client surcharges</p>
          </div>
          <div>
            <span className="font-code-badge text-code-badge text-[#80fab9]">ENTERPRISE SLA</span>
            <p className="font-body-sm text-body-sm text-[#bccabf] mt-1">Guaranteed milestone delivery</p>
          </div>
        </div>
      </div>
    </section>
  );
};
