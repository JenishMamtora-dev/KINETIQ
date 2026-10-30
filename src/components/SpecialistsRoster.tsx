import React from 'react';
import { SPECIALISTS_DATA } from '../data/marketplaceData';
import { Specialist } from '../types';

interface SpecialistsRosterProps {
  onOpenSpecialistModal: (specialist: Specialist) => void;
  onOpenLightbox: (imageUrl: string, title: string) => void;
}

export const SpecialistsRoster: React.FC<SpecialistsRosterProps> = ({
  onOpenSpecialistModal,
  onOpenLightbox,
}) => {
  return (
    <section id="freelancers-section" className="w-full bg-white py-20 border-b border-[#bccabf]/20">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-code-badge text-code-badge text-[#006a42] uppercase font-semibold">
              [ PRACTITIONER ROSTER ]
            </span>
            <h2 className="font-headline-lg text-headline-lg tracking-tight text-[#141e19] mt-2">
              Vetted specialists ready for deployment.
            </h2>
          </div>
          <button
            onClick={() => onOpenSpecialistModal(SPECIALISTS_DATA[0])}
            className="inline-flex items-center gap-1 font-label-md text-label-md text-[#006a42] hover:text-[#008655] transition-colors cursor-pointer group"
          >
            <span>Explore All 4,800+ Creators</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Practitioner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPECIALISTS_DATA.map((specialist) => (
            <div
              key={specialist.id}
              className="bg-[#f1fcf4] p-6 rounded-xl flex flex-col justify-between hover:bg-[#ebf6ee] transition-all border border-[#bccabf]/30"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-sm"
                        alt={specialist.avatarAlt}
                        src={specialist.avatarUrl}
                      />
                      <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#006c45] ring-2 ring-[#f1fcf4]"></span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-headline-sm text-headline-sm text-[#141e19]">
                          {specialist.name}
                        </h3>
                        <span
                          className="material-symbols-outlined text-[#006a42] text-[18px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-[#3d4a41]">
                        {specialist.role}
                      </p>
                    </div>
                  </div>
                  <span className="font-code-badge text-code-badge text-[#006a42] px-2.5 py-1 rounded bg-[#96f3bf]/30 border border-[#006a42]/20 font-bold">
                    {specialist.badge}
                  </span>
                </div>

                <p className="font-body-sm text-body-sm text-[#3d4a41] mt-4 leading-relaxed">
                  {specialist.bio}
                </p>

                {/* Mini Portfolio Chips with clickable preview */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {specialist.portfolio.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => onOpenLightbox(item.url, `${specialist.name}: ${item.title}`)}
                      className="group/thumb relative h-16 rounded overflow-hidden cursor-pointer bg-black/10"
                      title={item.title}
                    >
                      <img
                        className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-110"
                        alt={item.alt}
                        src={item.url}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/30 transition-colors flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-sm opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                          zoom_in
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-[#bccabf]/30 flex items-center justify-between">
                <div>
                  <span className="font-body-sm text-[11px] text-[#6d7a70] block">
                    Retainer &amp; Rates
                  </span>
                  <span className="font-code-badge text-code-badge text-[#141e19] font-bold">
                    ${specialist.hourlyRate} / hr
                  </span>
                </div>
                <button
                  onClick={() => onOpenSpecialistModal(specialist)}
                  className="bg-[#e5f1e8] hover:bg-[#dfebe3] text-[#141e19] font-label-md text-label-md px-4 py-2 rounded-lg transition-colors cursor-pointer border border-[#bccabf]/40"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
