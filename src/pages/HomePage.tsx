import React, { useState, useEffect } from 'react';
import { HeroSection } from '../components/HeroSection';
import { DarkStatementSection } from '../components/DarkStatementSection';
import { CategoryShowcase } from '../components/CategoryShowcase';
import { ProjectAccelerators } from '../components/ProjectAccelerators';
import { EscrowExecutionFlow } from '../components/EscrowExecutionFlow';
import { ServicesGrid } from '../components/ServicesGrid';
import { SpecialistsRoster } from '../components/SpecialistsRoster';
import { MarketplaceGateways } from '../components/MarketplaceGateways';
import { ClosingCta } from '../components/ClosingCta';
import { Preloader } from '../components/motion/Preloader';
import { SERVICE_DELIVERABLES } from '../data/marketplaceData';
import { ServiceDeliverable, Specialist } from '../types';
import { applySeo } from '../lib/seo';

interface HomePageProps {
  onOpenServiceModal: (service: ServiceDeliverable) => void;
  onOpenSpecialistModal: (specialist: Specialist) => void;
  onOpenArtisanModal: () => void;
  onOpenConciergeModal: () => void;
  onOpenLightbox: (url: string, title: string) => void;
  favorites: Record<string, boolean>;
  onToggleFavorite: (serviceId: string, title: string) => void;
  onAddToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

export function HomePage({
  onOpenServiceModal,
  onOpenSpecialistModal,
  onOpenArtisanModal,
  onOpenConciergeModal,
  onOpenLightbox,
  favorites,
  onToggleFavorite,
  onAddToast,
}: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All Services');
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    applySeo({
      title: 'Curated Freelance Talent & Multi-Sig Escrow',
      description: 'Discover vetted world-class digital artisans, compare milestone deliverables, and launch high-impact ventures with guaranteed escrow protection.',
      canonicalPath: '/',
    });
  }, []);

  const handleSearchSubmit = () => {
    if (selectedSpecialization !== 'All Specializations') {
      setSelectedCategoryFilter(selectedSpecialization);
    }
    const elem = document.getElementById('services-grid');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
    if (searchQuery.trim()) {
      onAddToast('info', `Filtering for "${searchQuery}"`, 'Showing verified deliverables matching your criteria.');
    }
  };

  const handleTrendingTagClick = (tag: string) => {
    setSearchQuery(tag);
    const elem = document.getElementById('services-grid');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
    onAddToast('info', `Applied Filter: ${tag}`);
  };

  const handleSelectAccelerator = (specialization: string) => {
    setSelectedSpecialization(specialization);
    setSelectedCategoryFilter(specialization);
    onAddToast('info', 'Project Accelerator Activated', `Filtered pipeline for ${specialization}`);
    const elem = document.getElementById('services-grid');
    elem?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* SECTION C: Page-load intro (first visit per session) */}
      <Preloader onComplete={() => setIntroComplete(true)} />

      <main className="w-full bg-[#f1fcf4] flex-1">
        {/* SECTION 1: CINEMATIC HERO WITH 3D CANVAS & MASK CHOREOGRAPHY */}
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedSpecialization={selectedSpecialization}
          onSpecializationChange={setSelectedSpecialization}
          onSearchSubmit={handleSearchSubmit}
          onOpenArtisanModal={onOpenArtisanModal}
          onTrendingTagClick={handleTrendingTagClick}
          introComplete={introComplete}
        />

        {/* SECTION 2: DARK CINEMATIC STATEMENT */}
        <DarkStatementSection />

        {/* SECTION 3: SIGNATURE PINNED CATEGORY SHOWCASE */}
        <CategoryShowcase
          onSelectCategoryFilter={(cat) => {
            setSelectedCategoryFilter(cat);
            onAddToast('info', `Browsing Category: ${cat}`);
            const el = document.getElementById('services-grid');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* SECTION 4 & 5: PROJECT ACCELERATORS */}
        <ProjectAccelerators onSelectAccelerator={handleSelectAccelerator} />

        {/* SECTION 6: HORIZONTAL STORY: HOW IT WORKS + ESCROW SIMULATOR */}
        <EscrowExecutionFlow />

        {/* SECTION 7: FEATURED VERIFIED DELIVERABLES */}
        <ServicesGrid
          services={SERVICE_DELIVERABLES}
          selectedCategory={selectedCategoryFilter}
          onSelectCategory={setSelectedCategoryFilter}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onOpenServiceModal={onOpenServiceModal}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />

        {/* SECTION 8: FEATURED VETTED FREELANCERS */}
        <SpecialistsRoster
          onOpenSpecialistModal={onOpenSpecialistModal}
          onOpenLightbox={onOpenLightbox}
        />

        {/* SECTION 9: THREE WAYS INTO THE MARKETPLACE */}
        <MarketplaceGateways
          onOpenArtisanModal={onOpenArtisanModal}
          onOpenConciergeModal={onOpenConciergeModal}
          onHireSpecialistClick={() => {
            const el = document.getElementById('services-grid');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* SECTION 10: CINEMATIC CLOSING CTA */}
        <ClosingCta
          onFindTalentClick={() => {
            const el = document.getElementById('services-grid');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onJoinSpecialistClick={onOpenArtisanModal}
        />
      </main>
    </>
  );
}
