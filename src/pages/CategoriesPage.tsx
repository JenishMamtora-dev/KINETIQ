import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES_DATA } from '../data/marketplaceData';
import { applySeo } from '../lib/seo';

export function CategoriesPage() {
  useEffect(() => {
    applySeo({
      title: 'Discipline Categories & Craft Directory | KINETIQ',
      description: 'Explore verified disciplines across Brand Systems, AI Engineering, Full-Stack Microservices, and 3D Motion.',
      canonicalPath: '/categories',
    });
  }, []);

  return (
    <div className="w-full min-h-screen py-10 px-margin-mobile md:px-margin max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-code-badge text-[#006a42] uppercase tracking-widest bg-[#ebf6ee] px-3 py-1 rounded-full border border-[#bccabf]/50 inline-block mb-3">
          TAXONOMY // CRAFT DISCIPLINES
        </span>
        <h1 className="font-headline-lg text-3xl md:text-5xl font-bold tracking-tight text-[#141e19]">
          Marketplace Categories
        </h1>
        <p className="font-body-md text-[#3d4a41] mt-3 text-xs md:text-sm">
          Deep specialties led by practitioners with proven records at top studios, engineering labs, and high-growth ventures.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATEGORIES_DATA.map((cat) => (
          <div
            key={cat.id}
            className="group bg-white rounded-2xl border border-[#bccabf] overflow-hidden shadow-sm hover:border-[#006a42] transition-colors flex flex-col justify-between"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={cat.imageUrl}
                alt={cat.imageAlt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3 text-[11px] font-code-badge bg-black/60 text-[#62dd9e] px-2.5 py-1 rounded border border-white/10">
                DISCIPLINE // {cat.code}
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-code-badge text-[#96f3bf] block">{cat.practitionersCount}</span>
                  <h3 className="font-headline-sm text-lg font-bold">{cat.title}</h3>
                </div>
                <span className="text-xs font-code-badge text-[#f1fcf4]">
                  Avg {cat.avgEngagement}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4 text-xs font-body-sm flex-1 flex flex-col justify-between">
              <div>
                <p className="text-[#3d4a41] leading-relaxed mb-4">{cat.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-code-badge px-2 py-0.5 rounded bg-[#ebf6ee] text-[#006a42] border border-[#62dd9e]/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#bccabf]/30 flex justify-between items-center">
                <span className="text-[11px] font-code-badge text-[#6d7a70]">{cat.deliveryFrom}</span>
                <Link
                  to={`/explore?category=${encodeURIComponent(cat.title)}`}
                  className="px-3.5 py-1.5 bg-[#006a42] hover:bg-[#008655] text-white rounded-lg font-semibold transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span>Browse Deliverables</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
