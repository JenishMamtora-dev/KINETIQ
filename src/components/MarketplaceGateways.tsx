import React from 'react';

interface MarketplaceGatewaysProps {
  onOpenArtisanModal: () => void;
  onOpenConciergeModal: () => void;
  onHireSpecialistClick: () => void;
}

export const MarketplaceGateways: React.FC<MarketplaceGatewaysProps> = ({
  onOpenArtisanModal,
  onOpenConciergeModal,
  onHireSpecialistClick,
}) => {
  return (
    <section id="specialist-onboarding" className="w-full bg-[#ebf6ee] py-20 border-b border-[#bccabf]/20">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="font-code-badge text-code-badge text-[#006a42] uppercase font-semibold">
            [ FLEXIBLE PARTICIPATION ]
          </span>
          <h2 className="font-headline-lg text-headline-lg tracking-tight text-[#141e19] mt-2">
            Three ways into the marketplace.
          </h2>
          <p className="font-body-md text-body-md text-[#3d4a41] mt-2">
            Engineered to support single specialized projects through to dedicated enterprise squads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col justify-between h-full border border-[#bccabf]/30 hover:border-[#006a42] transition-colors">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#e5f1e8] flex items-center justify-center text-[#006a42] mb-6">
                <span className="material-symbols-outlined">person_search</span>
              </div>
              <span className="font-code-badge text-code-badge text-[#6d7a70]">
                FOR INDIVIDUAL COMMISSION
              </span>
              <h3 className="font-headline-sm text-headline-sm text-[#141e19] mt-2">
                Hire a Specialist
              </h3>
              <p className="font-body-md text-body-md text-[#3d4a41] mt-3 leading-relaxed">
                Find the exact skills for your immediate project milestone. Review curated portfolios, agree on fixed escrow scopes, and launch within 24 hours.
              </p>
            </div>
            <div className="pt-6 mt-8 border-t border-[#bccabf]/30">
              <button
                onClick={onHireSpecialistClick}
                className="inline-flex items-center gap-2 font-label-md text-label-md text-[#006a42] hover:text-[#008655] cursor-pointer group"
              >
                <span>Commission an Artisan</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col justify-between h-full border border-[#bccabf]/30 hover:border-[#006a42] transition-colors">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#e5f1e8] flex items-center justify-center text-[#006a42] mb-6">
                <span className="material-symbols-outlined">badge</span>
              </div>
              <span className="font-code-badge text-code-badge text-[#6d7a70]">
                FOR MASTER CREATORS
              </span>
              <h3 className="font-headline-sm text-headline-sm text-[#141e19] mt-2">
                Offer Your Services
              </h3>
              <p className="font-body-md text-body-md text-[#3d4a41] mt-3 leading-relaxed">
                Showcase your craft to international brands, set your bespoke deliverables, and work without bidding wars or bottom-feeding fee structures.
              </p>
            </div>
            <div className="pt-6 mt-8 border-t border-[#bccabf]/30">
              <button
                onClick={onOpenArtisanModal}
                className="inline-flex items-center gap-2 font-label-md text-label-md text-[#006a42] hover:text-[#008655] cursor-pointer group"
              >
                <span>Apply for Roster Admission</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col justify-between h-full border border-[#bccabf]/30 hover:border-[#006a42] transition-colors">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#e5f1e8] flex items-center justify-center text-[#006a42] mb-6">
                <span className="material-symbols-outlined">groups</span>
              </div>
              <span className="font-code-badge text-code-badge text-[#6d7a70]">
                FOR ENTERPRISE &amp; LABS
              </span>
              <h3 className="font-headline-sm text-headline-sm text-[#141e19] mt-2">
                Build a Dedicated Team
              </h3>
              <p className="font-body-md text-body-md text-[#3d4a41] mt-3 leading-relaxed">
                Assemble a multi-disciplinary squad managed under a single Master Services Agreement (MSA) with unified milestone escrow billing.
              </p>
            </div>
            <div className="pt-6 mt-8 border-t border-[#bccabf]/30">
              <button
                onClick={onOpenConciergeModal}
                className="inline-flex items-center gap-2 font-label-md text-label-md text-[#006a42] hover:text-[#008655] cursor-pointer group"
              >
                <span>Talk with Concierge</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
