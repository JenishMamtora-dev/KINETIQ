import React from 'react';
import { PROJECT_ACCELERATORS } from '../data/marketplaceData';

interface ProjectAcceleratorsProps {
  onSelectAccelerator: (specialization: string) => void;
}

export const ProjectAccelerators: React.FC<ProjectAcceleratorsProps> = ({ onSelectAccelerator }) => {
  const handleAcceleratorClick = (specializationKey: string) => {
    onSelectAccelerator(specializationKey);
    const elem = document.getElementById('services-grid');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* SECTION 4: EDITORIAL TRANSITION STATEMENT */}
      <section className="w-full bg-[#ebf6ee] py-16 border-b border-[#bccabf]/20">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin text-center">
          <p className="font-headline-md text-headline-md md:text-[32px] md:leading-[40px] tracking-tight text-[#141e19] max-w-3xl mx-auto">
            Every project moves differently. We help you find the{' '}
            <span className="font-editorial-accent text-editorial-accent italic text-[#006a42]">
              one that fits
            </span>
            .
          </p>
        </div>
      </section>

      {/* SECTION 5: BROWSE BY PROJECT GOAL */}
      <section className="w-full bg-[#f1fcf4] py-20 border-b border-[#bccabf]/20">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="font-code-badge text-code-badge text-[#006a42] uppercase font-semibold">
                [ PROJECT ACCELERATORS ]
              </span>
              <h2 className="font-headline-lg text-headline-lg tracking-tight text-[#141e19] mt-2">
                Start with what you want to achieve.
              </h2>
            </div>
            <p className="font-body-sm text-body-sm text-[#3d4a41] max-w-sm">
              Curated pipelines organized around outcomes, not fragmented freelance task lists.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {PROJECT_ACCELERATORS.map((accel) => (
              <div
                key={accel.id}
                onClick={() => handleAcceleratorClick(accel.specializationKey)}
                className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#bccabf]/30 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#e5f1e8] flex items-center justify-center text-[#006a42] group-hover:bg-[#006a42] group-hover:text-white transition-colors shrink-0">
                    <span className="material-symbols-outlined">{accel.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-[#141e19] group-hover:text-[#006a42] transition-colors">
                      {accel.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-[#3d4a41]">
                      {accel.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 shrink-0">
                  <span className="font-code-badge text-code-badge text-[#006a42] px-3 py-1 rounded bg-[#96f3bf]/40 border border-[#006a42]/15">
                    [ {accel.specialistsCount} SPECIALISTS AVAILABLE ]
                  </span>
                  <span className="material-symbols-outlined text-[#6d7a70] group-hover:text-[#006a42] group-hover:translate-x-1 transition-all">
                    arrow_forward
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
