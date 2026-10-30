import React, { useState } from 'react';
import { CATEGORIES_DATA } from '../data/marketplaceData';

interface CategoryShowcaseProps {
  onSelectCategoryFilter: (categoryTitle: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onSelectCategoryFilter }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

  const activeCategory = CATEGORIES_DATA.find((c) => c.id === selectedCategoryId) || CATEGORIES_DATA[0];

  const handleBrowseRoster = () => {
    onSelectCategoryFilter(activeCategory.title);
    const elem = document.getElementById('services-grid');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="category-section" className="w-full bg-[#28332d] text-[#e8f4eb] py-20 border-b border-[#3d4a41]/40">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 40%: Category Navigation */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="font-code-badge text-code-badge tracking-widest text-[#80fab9] uppercase font-semibold">
              [ CATEGORIES ]
            </span>
            <h2 className="font-headline-lg text-headline-lg tracking-tight text-[#f1fcf4] mt-3">
              Ten ways to bring your project to{' '}
              <span className="font-editorial-accent text-editorial-accent italic text-[#80fab9]">
                life
              </span>
              .
            </h2>

            <div className="flex flex-col gap-1.5 mt-8" id="category-nav-list">
              {CATEGORIES_DATA.map((cat) => {
                const isActive = cat.id === selectedCategoryId;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`category-tab text-left px-4 py-3 rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#dae5dd]/25 text-[#f1fcf4] font-headline-sm text-headline-sm shadow-sm'
                        : 'hover:bg-[#dae5dd]/15 text-[#bccabf] font-headline-sm text-headline-sm'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`w-1.5 h-6 rounded-full transition-colors ${
                          isActive ? 'bg-[#006a42]' : 'bg-transparent'
                        }`}
                      ></span>
                      <span
                        className={`font-code-badge text-code-badge ${
                          isActive ? 'text-[#80fab9] font-bold' : 'text-[#6d7a70]'
                        }`}
                      >
                        {cat.code}
                      </span>
                      <span>{cat.title}</span>
                    </span>
                    <span
                      className={`material-symbols-outlined text-lg ${
                        isActive ? 'text-[#80fab9]' : 'text-[#6d7a70]'
                      }`}
                    >
                      {isActive ? 'arrow_forward' : 'chevron_right'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right 60%: Interactive Preview Card */}
          <div className="lg:col-span-7 sticky top-28">
            <div className="bg-[#dae5dd]/15 p-8 rounded-2xl flex flex-col gap-6 shadow-2xl relative overflow-hidden border border-[#dae5dd]/15 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="font-code-badge text-code-badge text-[#80fab9] uppercase tracking-wider font-semibold">
                  SPOTLIGHT ARCHIVE // {activeCategory.code}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#006a42]/30 text-[#80fab9] font-code-badge text-code-badge border border-[#80fab9]/30">
                  {activeCategory.practitionersCount}
                </span>
              </div>

              {/* Visual Representation */}
              <div className="relative w-full h-80 rounded-xl overflow-hidden group bg-black/40">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt={activeCategory.imageAlt}
                  src={activeCategory.imageUrl}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#28332d] via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="font-headline-sm text-headline-sm text-[#f1fcf4] drop-shadow-md">
                    {activeCategory.tagline}
                  </span>
                  <span className="font-code-badge text-code-badge px-2.5 py-1 rounded bg-[#28332d]/90 text-[#80fab9] border border-[#80fab9]/20 backdrop-blur-md">
                    {activeCategory.deliveryFrom}
                  </span>
                </div>
              </div>

              {/* Tags & Detailed Scope */}
              <div>
                <p className="font-body-md text-body-md text-[#bccabf] leading-relaxed">
                  {activeCategory.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {activeCategory.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-md bg-[#dae5dd]/25 font-code-badge text-code-badge text-[#f1fcf4] border border-white/5"
                    >
                      [ {tag} ]
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="flex items-center justify-between pt-4 border-t border-[#dae5dd]/20">
                <div className="flex items-center gap-2">
                  <span className="font-body-sm text-body-sm text-[#bccabf]">Avg. Engagement:</span>
                  <span className="font-code-badge text-code-badge text-[#f1fcf4] font-bold">
                    {activeCategory.avgEngagement}
                  </span>
                </div>
                <button
                  onClick={handleBrowseRoster}
                  className="inline-flex items-center gap-1.5 font-label-md text-label-md text-[#80fab9] hover:text-[#62dd9e] transition-colors cursor-pointer group"
                >
                  <span>Browse {activeCategory.title} Roster</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
