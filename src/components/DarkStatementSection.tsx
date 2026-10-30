import React, { useState } from 'react';

export const DarkStatementSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const perks = [
    {
      index: '01 // CURATION',
      title: 'Curated Vetting',
      description:
        'Only the top 3% of global specialists across product design, distributed systems, and generative AI pipelines make it past portfolio review.',
      metricLabel: 'ACCEPTANCE RATE',
      metricValue: '2.8%',
      details: 'Strict peer-reviewed evaluation covering technical architecture, design maturity, and past venture track records.',
    },
    {
      index: '02 // PROTECTION',
      title: 'Scope & Milestone Escrow',
      description:
        'Capital releases only upon approval of designated version artifacts. Clients pay for completed outcomes; creators hold guaranteed payment safety.',
      metricLabel: 'DISPUTE OCCURRENCE',
      metricValue: '< 0.05%',
      details: 'Funds are securely locked in multi-signature escrow vaults before work starts, eliminating payment default risk.',
    },
    {
      index: '03 // DIRECT SYNC',
      title: 'Direct Collaboration',
      description:
        'Zero intermediary agencies or account manager overhead. Direct video huddles, async Figma inspections, and direct branch PR code reviews.',
      metricLabel: 'AVG RESPONSE TIME',
      metricValue: '14 MINS',
      details: 'Communicate directly with the artisan building your product via dedicated encrypted workspace channels.',
    },
  ];

  return (
    <section className="relative w-full bg-[#28332d] text-[#e8f4eb] py-24 overflow-hidden border-b border-[#3d4a41]/40">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin flex flex-col items-center text-center">
        {/* Monospace Badge */}
        <span className="font-code-badge text-code-badge tracking-widest text-[#80fab9] px-3 py-1 rounded bg-[#e5f1e8]/10 uppercase font-semibold">
          [ WHY KINETIQ ]
        </span>

        {/* Massive Centered Statement */}
        <h2 className="font-headline-lg text-headline-lg md:text-[52px] md:leading-[60px] tracking-tight text-[#f1fcf4] max-w-4xl mt-6">
          Not a template. A marketplace built on{' '}
          <span className="font-editorial-accent text-editorial-accent md:text-[56px] italic text-[#80fab9]">
            real talent
          </span>
          .
        </h2>

        <p className="font-body-lg text-body-lg text-[#bccabf] max-w-2xl mt-4">
          We replaced volume bidding with artisanal precision. Every commission moves through strict milestones, verified repositories, and clear proof-of-work checkpoints.
        </p>

        {/* 3-Column Scannable Benefit Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-16 text-left">
          {perks.map((perk, i) => (
            <div
              key={i}
              onMouseEnter={() => setActiveCard(i)}
              onMouseLeave={() => setActiveCard(null)}
              className="bg-[#dae5dd]/10 p-8 rounded-xl flex flex-col justify-between group hover:bg-[#dae5dd]/20 transition-all border border-[#dae5dd]/15 cursor-pointer relative"
            >
              <div>
                <span className="font-code-badge text-code-badge text-[#80fab9]">
                  {perk.index}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-[#f1fcf4] mt-4">
                  {perk.title}
                </h3>
                <p className="font-body-md text-body-md text-[#bccabf] mt-2">
                  {perk.description}
                </p>

                {activeCard === i && (
                  <p className="font-body-sm text-[12px] text-[#80fab9] mt-3 animate-fade-in bg-[#006a42]/30 p-2.5 rounded border border-[#80fab9]/20">
                    {perk.details}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#dae5dd]/20 flex items-center justify-between text-[#bccabf] font-code-badge text-code-badge">
                <span>{perk.metricLabel}</span>
                <span className="text-[#80fab9] font-bold text-sm">{perk.metricValue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
