import React, { useState } from 'react';
import { ServiceDeliverable } from '../types';

interface ServicesGridProps {
  services: ServiceDeliverable[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onOpenServiceModal: (service: ServiceDeliverable) => void;
  favorites: Record<string, boolean>;
  onToggleFavorite: (serviceId: string, title: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  services,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  onOpenServiceModal,
  favorites,
  onToggleFavorite,
}) => {
  const categories = ['All Services', 'Web Design', 'AI Workflows', 'Brand Architecture', 'Video & 3D'];

  const filteredServices = services.filter((serv) => {
    const matchesCategory =
      selectedCategory === 'All Services' ||
      serv.category.toLowerCase() === selectedCategory.toLowerCase() ||
      serv.specialization.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      !searchQuery.trim() ||
      serv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      serv.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      serv.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      serv.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      serv.specialization.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full bg-[#f1fcf4] py-20 border-b border-[#bccabf]/20" id="services-grid">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        {/* Grid Header & Category Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <span className="font-code-badge text-code-badge text-[#006a42] uppercase font-semibold">
              [ VERIFIED DELIVERABLES ]
            </span>
            <h2 className="font-headline-lg text-headline-lg tracking-tight text-[#141e19] mt-2">
              Discover work worth investing in.
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#006a42] text-white shadow-sm'
                      : 'bg-white text-[#3d4a41] hover:bg-[#e5f1e8] border border-[#bccabf]/30'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filter Indicators */}
        {(searchQuery || selectedCategory !== 'All Services') && (
          <div className="mb-6 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-[#6d7a70]">Active filters:</span>
            {selectedCategory !== 'All Services' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e5f1e8] text-xs font-mono text-[#006a42] border border-[#006a42]/20">
                <span>Category: {selectedCategory}</span>
                <button
                  onClick={() => onSelectCategory('All Services')}
                  className="hover:text-red-600 font-bold"
                >
                  ×
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e5f1e8] text-xs font-mono text-[#006a42] border border-[#006a42]/20">
                <span>Query: "{searchQuery}"</span>
                <button
                  onClick={onClearSearch}
                  className="hover:text-red-600 font-bold"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}

        {/* 4 Rich Marketplace Service Cards Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((service) => {
              const isFav = !!favorites[service.id];
              return (
                <div
                  key={service.id}
                  onClick={() => onOpenServiceModal(service)}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-[#bccabf]/30 cursor-pointer"
                >
                  {/* Media Cover */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/10">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={service.imageAlt}
                      src={service.imageUrl}
                      referrerPolicy="no-referrer"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(service.id, service.title);
                      }}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center transition-colors shadow-sm ${
                        isFav ? 'text-[#ba1a1a]' : 'text-[#6d7a70] hover:text-[#ba1a1a]'
                      }`}
                      title={isFav ? 'Remove from saved' : 'Save deliverable'}
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        favorite
                      </span>
                    </button>
                    <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded bg-[#28332d]/85 backdrop-blur-md text-[#e8f4eb] font-code-badge text-[11px] border border-white/10">
                      {service.turnaroundText}
                    </span>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-code-badge text-code-badge text-[#006a42] uppercase font-bold">
                          {service.category.toUpperCase()}
                        </span>
                        <span className="flex items-center gap-1 font-label-sm text-label-sm text-[#141e19]">
                          <span
                            className="material-symbols-outlined text-[14px] text-amber-500"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                          {service.rating.toFixed(2)}{' '}
                          <span className="text-[#6d7a70] font-normal">
                            ({service.reviewCount})
                          </span>
                        </span>
                      </div>

                      <h3 className="font-headline-sm text-headline-sm text-[#141e19] mt-2 group-hover:text-[#006a42] transition-colors line-clamp-2">
                        {service.title}
                      </h3>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#bccabf]/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          className="w-7 h-7 rounded-full object-cover ring-1 ring-[#bccabf]/40"
                          alt={service.author.avatarAlt}
                          src={service.author.avatarUrl}
                        />
                        <span className="font-label-sm text-label-sm text-[#141e19]">
                          {service.author.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-body-sm text-[11px] text-[#6d7a70] block">
                          Starting from
                        </span>
                        <span className="font-code-badge text-code-badge text-[#141e19] font-bold">
                          ${service.startingPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center border border-[#bccabf]/30">
            <span className="material-symbols-outlined text-4xl text-[#6d7a70]">
              content_paste_search
            </span>
            <h4 className="font-headline-sm text-lg text-[#141e19] mt-2">
              No deliverables matching your filter
            </h4>
            <p className="text-sm text-[#3d4a41] mt-1">
              Try adjusting your search query or reset the category filter.
            </p>
            <button
              onClick={() => {
                onSelectCategory('All Services');
                onClearSearch();
              }}
              className="mt-4 px-4 py-2 bg-[#006a42] text-white text-xs font-mono rounded-lg hover:bg-[#008655]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
