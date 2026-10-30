import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SERVICE_DELIVERABLES } from '../data/marketplaceData';
import { ServiceDeliverable, ReportItem } from '../types';
import { getRecentlyViewed, clearRecentlyViewed, addRecentlyViewed, RecentlyViewedItem } from '../lib/recentlyViewed';
import { TiltCard } from '../components/cards/TiltCard';
import { ReportModal } from '../components/common/ReportModal';
import { applySeo } from '../lib/seo';

interface ExplorePageProps {
  onOpenServiceModal: (service: ServiceDeliverable) => void;
  favorites: Record<string, boolean>;
  onToggleFavorite: (serviceId: string, title: string) => void;
  onAddToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

export function ExplorePage({
  onOpenServiceModal,
  favorites,
  onToggleFavorite,
  onAddToast,
}: ExplorePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [priceMax, setPriceMax] = useState(5000);
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>([]);
  const [reportTarget, setReportTarget] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    applySeo({
      title: 'Explore Verified Digital Deliverables | KINETIQ Catalog',
      description: 'Discover curated digital deliverables with verified milestone escrow protections, transparent pricing, and 48h turnaround.',
      canonicalPath: '/explore',
    });

    setRecentlyViewed(getRecentlyViewed());
  }, []);

  const handleClearHistory = () => {
    clearRecentlyViewed();
    setRecentlyViewed([]);
    onAddToast('info', 'Browsing History Cleared', 'Recently viewed deliverable cache was purged.');
  };

  const handleServiceClick = (service: ServiceDeliverable) => {
    addRecentlyViewed({
      id: service.id,
      title: service.title,
      startingPrice: service.startingPrice,
      imageUrl: service.imageUrl,
      category: service.category,
      authorName: service.author.name,
    });
    setRecentlyViewed(getRecentlyViewed());
    onOpenServiceModal(service);
  };

  const filteredServices = useMemo(() => {
    return SERVICE_DELIVERABLES.filter((service) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        service.title.toLowerCase().includes(q) ||
        service.overview.toLowerCase().includes(q) ||
        service.specialization.toLowerCase().includes(q) ||
        service.author.name.toLowerCase().includes(q) ||
        service.includedItems.some((item) => item.toLowerCase().includes(q));

      const matchesCategory =
        selectedCategory === 'All Services' ||
        service.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        service.specialization.toLowerCase().includes(selectedCategory.toLowerCase());

      const matchesPrice = service.startingPrice <= priceMax;

      return matchesQuery && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, priceMax]);

  const categories = [
    'All Services',
    'Web Design',
    'AI Workflows',
    'Brand Architecture',
    'Video & 3D',
    'Engineering',
    'Editorial',
  ];

  return (
    <div className="w-full min-h-screen py-10 px-margin-mobile md:px-margin max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-code-badge text-[#006a42] uppercase tracking-widest bg-[#ebf6ee] px-3 py-1 rounded-full border border-[#bccabf]/50 inline-block mb-3">
          VERIFIED MARKETPLACE // 100% ESCROW PROTECTED
        </span>
        <h1 className="font-headline-lg text-3xl md:text-5xl font-bold tracking-tight text-[#141e19]">
          Explore Deliverables
        </h1>
        <p className="font-body-md text-[#3d4a41] mt-3 text-xs md:text-sm">
          Every deliverable has fixed milestone scopes, audited turnaround windows, and guaranteed IP assignment.
        </p>
      </div>

      {/* Recently Viewed Banner (Privacy-conscious with visible Clear control) */}
      {recentlyViewed.length > 0 && (
        <div className="bg-white p-5 rounded-2xl border border-[#bccabf]/70 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006a42] text-sm">history</span>
              <h3 className="font-headline-sm text-xs font-bold uppercase tracking-wider text-[#141e19]">
                Recently Viewed by You
              </h3>
            </div>
            <button
              onClick={handleClearHistory}
              className="text-xs text-[#ba1a1a] hover:underline font-code-badge flex items-center gap-1"
            >
              <span>Clear History</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {recentlyViewed.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  const s = SERVICE_DELIVERABLES.find((serv) => serv.id === item.id);
                  if (s) onOpenServiceModal(s);
                }}
                className="group cursor-pointer p-2 rounded-xl bg-[#f1fcf4] hover:bg-[#ebf6ee] border border-[#bccabf]/40 transition-colors"
              >
                <img
                  src={item.imageUrl}
                  alt=""
                  className="w-full h-16 rounded-lg object-cover mb-1.5"
                />
                <p className="font-semibold text-[11px] text-[#141e19] truncate">{item.title}</p>
                <p className="text-[10px] text-[#006a42] font-code-badge font-bold">
                  ${item.startingPrice}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-6 rounded-2xl border border-[#bccabf] shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6d7a70]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search deliverables, milestone terms, tags, or lead artisans..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#f1fcf4] border border-[#bccabf] text-xs text-[#141e19] focus:outline-none focus:ring-2 focus:ring-[#006a42]"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-[#141e19]">Max Price:</span>
              <span className="font-code-badge font-bold text-[#006a42]">${priceMax}</span>
              <input
                type="range"
                min={1000}
                max={5000}
                step={250}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-24 accent-[#006a42] cursor-pointer"
              />
            </div>
            <Link
              to="/compare"
              className="px-3.5 py-2 border border-[#006a42] text-[#006a42] hover:bg-[#ebf6ee] rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">compare_arrows</span>
              <span>Compare (3 max)</span>
            </Link>
          </div>
        </div>

        {/* Categories Chips */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#bccabf]/30">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#006a42] text-white shadow-sm'
                  : 'bg-[#f1fcf4] text-[#3d4a41] hover:bg-[#ebf6ee]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, index) => {
          const isFav = !!favorites[service.id];
          return (
            <TiltCard
              key={service.id}
              isFeatured={index === 0 || service.rating >= 4.98}
              className="bg-white rounded-2xl border border-[#bccabf]/60 overflow-hidden flex flex-col justify-between"
            >
              {/* Thumbnail Container with 1.04 Zoom & Favorite Pop */}
              <div
                className="relative h-48 overflow-hidden cursor-pointer"
                onClick={() => handleServiceClick(service)}
              >
                <img
                  src={service.imageUrl}
                  alt={service.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                <span className="absolute top-3 left-3 text-[10px] font-code-badge bg-black/60 backdrop-blur-md text-[#96f3bf] px-2.5 py-1 rounded-md border border-white/10 uppercase">
                  {service.turnaroundText}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(service.id, service.title);
                  }}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-transform duration-200 active:scale-125 ${
                    isFav
                      ? 'bg-[#006a42] text-white'
                      : 'bg-black/40 text-white hover:bg-black/60'
                  }`}
                  aria-label={isFav ? 'Remove from saved' : 'Save deliverable'}
                >
                  <span className={`material-symbols-outlined text-sm ${isFav ? 'font-bold' : ''}`}>
                    {isFav ? 'bookmark_added' : 'bookmark_add'}
                  </span>
                </button>

                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-white text-xs">
                  <span className="font-code-badge font-bold bg-[#006a42]/80 px-2 py-0.5 rounded">
                    ${service.startingPrice.toLocaleString()} USD
                  </span>
                  <span className="font-bold flex items-center gap-1">
                    ★ {service.rating} ({service.reviewCount})
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-code-badge text-[#006a42] uppercase font-semibold">
                    {service.specialization}
                  </span>
                  <h3
                    onClick={() => handleServiceClick(service)}
                    className="font-headline-sm text-sm font-bold text-[#141e19] mt-1 line-clamp-2 hover:text-[#006a42] cursor-pointer transition-colors"
                  >
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#535f59] line-clamp-2 mt-2 leading-relaxed">
                    {service.overview}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#bccabf]/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={service.author.avatarUrl}
                      alt=""
                      className="w-6 h-6 rounded-full object-cover border border-[#62dd9e]"
                    />
                    <span className="text-[#3d4a41] font-semibold truncate max-w-[120px]">
                      {service.author.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setReportTarget({ id: service.id, name: service.title })}
                      className="text-[#6d7a70] hover:text-[#ba1a1a] p-1"
                      title="Report deliverable"
                    >
                      <span className="material-symbols-outlined text-sm">flag</span>
                    </button>
                    <button
                      onClick={() => handleServiceClick(service)}
                      className="px-3 py-1.5 bg-[#006a42] hover:bg-[#008655] text-white rounded-lg font-semibold transition-colors shadow-sm"
                    >
                      Inspect Scope
                    </button>
                  </div>
                </div>
              </div>
            </TiltCard>
          );
        })}
      </div>

      {reportTarget && (
        <ReportModal
          isOpen={Boolean(reportTarget)}
          targetType="service"
          targetId={reportTarget.id}
          targetName={reportTarget.name}
          onClose={() => setReportTarget(null)}
          onSubmitReport={(rep) =>
            onAddToast('info', 'Report Submitted', `Moderators will review "${rep.targetName}".`)
          }
        />
      )}
    </div>
  );
}
