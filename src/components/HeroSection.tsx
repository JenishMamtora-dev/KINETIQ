import React, { useState } from 'react';
import { Hero3DScene } from './three/Hero3DScene';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSpecialization: string;
  onSpecializationChange: (specialization: string) => void;
  onSearchSubmit: () => void;
  onOpenArtisanModal: () => void;
  onTrendingTagClick: (tag: string) => void;
  introComplete?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  selectedSpecialization,
  onSpecializationChange,
  onSearchSubmit,
  onOpenArtisanModal,
  onTrendingTagClick,
  introComplete = true,
}) => {

  return (
    <section id="hero-top" className="relative w-full bg-white overflow-hidden py-16 lg:py-24 border-b border-[#bccabf]/20">
      {/* Persistent WebGL 3D Scene (Behind Content, Pointer Events None) */}
      <Hero3DScene />

      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Full-width Left Column: Search & Value Proposition (3D scene is the background) */}
          <div className="lg:col-span-7 flex flex-col gap-6 z-10">
            {/* Vetted Directory Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e5f1e8] w-fit animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#006a42] animate-pulse"></span>
              <span className="font-code-badge text-code-badge text-[#006a42] uppercase tracking-wider font-semibold">
                Vetted Directory • Q1 2026 Roster
              </span>
            </div>

            {/* Display Hero Title with Mask Lines Reveal */}
            <div className="overflow-hidden">
              <h1 className="font-display-hero text-display-hero tracking-tight text-[#141e19]">
                <span className="block overflow-hidden">
                  <span
                    className="inline-block transition-transform duration-[900ms]"
                    style={{
                      transform: introComplete ? 'translateY(0%)' : 'translateY(105%)',
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    Great work starts with the
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span
                    className="inline-block transition-transform duration-[900ms]"
                    style={{
                      transform: introComplete ? 'translateY(0%)' : 'translateY(105%)',
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                      transitionDelay: '80ms',
                    }}
                  >
                    <span className="font-editorial-accent text-editorial-accent italic text-[#006a42]">
                      right people
                    </span>
                    .
                  </span>
                </span>
              </h1>
            </div>

            {/* Subheading (fades up with 120ms stagger) */}
            <p
              className="font-body-lg text-body-lg text-[#3d4a41] max-w-xl transition-all duration-[600ms]"
              style={{
                opacity: introComplete ? 1 : 0,
                transform: introComplete ? 'translateY(0px)' : 'translateY(16px)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '200ms',
              }}
            >
              Discover top-tier vetted talent, compare transparent deliverables, and launch high-impact projects with verified escrow protection.
            </p>

            {/* Luxury Search Bar Shell (scales from 0.96 and fades in) */}
            <div
              className="mt-2 bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-xl border border-[#bccabf]/40 flex flex-col md:flex-row items-stretch md:items-center gap-2 transition-all duration-[600ms]"
              style={{
                opacity: introComplete ? 1 : 0,
                transform: introComplete ? 'scale(1)' : 'scale(0.96)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '300ms',
              }}
            >
              <div className="flex items-center gap-2 px-3 py-2 border-b md:border-b-0 md:border-r border-[#bccabf]/30 flex-1">
                <span className="material-symbols-outlined text-[#6d7a70]">search</span>
                <input
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
                  className="w-full bg-transparent font-body-md text-body-md text-[#141e19] placeholder:text-[#6d7a70] focus:outline-none"
                  placeholder="What service are you looking for?"
                  type="text"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="text-[#6d7a70] hover:text-[#141e19] text-xs font-mono"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 px-3 py-2">
                <span className="material-symbols-outlined text-[#6d7a70]">tune</span>
                <select
                  value={selectedSpecialization}
                  onChange={(e) => onSpecializationChange(e.target.value)}
                  className="bg-transparent font-body-sm text-body-sm text-[#3d4a41] focus:outline-none cursor-pointer pr-4 font-medium"
                >
                  <option value="All Specializations">All Specializations</option>
                  <option value="Interface & Product">Interface &amp; Product</option>
                  <option value="AI Automation & ML">AI Automation &amp; ML</option>
                  <option value="Identity & Brand Craft">Identity &amp; Brand Craft</option>
                  <option value="Cinema & 3D Motion">Cinema &amp; 3D Motion</option>
                </select>
              </div>

              <button
                onClick={onSearchSubmit}
                className="bg-[#006a42] text-white font-label-md text-label-md px-6 py-3.5 rounded-lg hover:bg-[#008655] transition-transform duration-150 ease-out hover:-translate-y-0.5 flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-sm"
              >
                <span>Find Talent</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

            {/* Popular Search Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="font-code-badge text-code-badge text-[#6d7a70] uppercase tracking-wider mr-1">
                Trending:
              </span>
              <button
                onClick={() => onTrendingTagClick('Website development')}
                className="px-3 py-1 rounded-full bg-[#e5f1e8] font-label-sm text-label-sm text-[#3d4a41] hover:text-[#006a42] hover:bg-[#dfebe3] transition-colors cursor-pointer"
              >
                Website development
              </button>
              <button
                onClick={() => onTrendingTagClick('Brand identity & logo')}
                className="px-3 py-1 rounded-full bg-[#e5f1e8] font-label-sm text-label-sm text-[#3d4a41] hover:text-[#006a42] hover:bg-[#dfebe3] transition-colors cursor-pointer"
              >
                Brand identity &amp; logo
              </button>
              <button
                onClick={() => onTrendingTagClick('AI & automation workflows')}
                className="px-3 py-1 rounded-full bg-[#e5f1e8] font-label-sm text-label-sm text-[#3d4a41] hover:text-[#006a42] hover:bg-[#dfebe3] transition-colors cursor-pointer"
              >
                AI &amp; automation workflows
              </button>
              <button
                onClick={() => onTrendingTagClick('Cinematic video editing')}
                className="px-3 py-1 rounded-full bg-[#e5f1e8] font-label-sm text-label-sm text-[#3d4a41] hover:text-[#006a42] hover:bg-[#dfebe3] transition-colors cursor-pointer"
              >
                Cinematic video editing
              </button>
            </div>

            {/* Dual CTAs & Micro-Proof */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                className="bg-[#006a42] text-white font-label-md text-label-md px-6 py-3 rounded-full hover:bg-[#008655] transition-all shadow-sm cursor-pointer"
                href="#services-grid"
              >
                Explore Services
              </a>
              <button
                onClick={onOpenArtisanModal}
                className="bg-[#e5f1e8] text-[#141e19] font-label-md text-label-md px-6 py-3 rounded-full hover:bg-[#dfebe3] transition-all cursor-pointer"
              >
                Offer Your Skills
              </button>

              <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-[#bccabf]/40">
                <div className="flex -space-x-2">
                  <img
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                    alt="Senior creative director"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDot-j5-imd4_enza1oQ3SGdcpSQLUbsAbtPH4ZR6egB1pmVD39Zpizzru4B1iPPn-39v2CC4uJC8i66W7zUsi-nty0u0oxt4uGWu4ydeO2epm5WJgwEiI-nU5JeYqLQbVruiq3WEa4nUrX6vnP_oiWSXL9of8UdU6BFYBZXrxHdinzAJAP2XXk72txpD7-XduK0mQ5CsclFowrrGnvivW4QFndMusJ8Hj5XV7mzJJTKOAeCk6uTks-pQ"
                  />
                  <img
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                    alt="Lead ML engineer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK-1r-IQQzJpfyXeQ1BwecosrMhvYt-3_aNjVXOc_r3hIAdq_o_zxMcj_4Q02ZA857gZkOmxwZqcqfzjTTVR_QacKPG12dqy82x_hJ14llDv6aoMLc-gRzu6yf1uEMSzBqcRGGOxrJ0HgKvsyhZA9bun4ZAO6Qg_6OcqpSkLNfGEvjN3myYiX-6dgC-moK6IHQzhWD35fXdievo0AE-7p3YxiBd2d5BbNoWGu9qVqAbMJA-WPVn1YAfQ"
                  />
                  <img
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                    alt="Senior 3D motion designer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK1DKOSqBulgdN9vphfxRbLOLk6u9AO_NQ27GgbhwFoXp34Wz8JXp1PxcCDniDTYO-6Tr99D2ifa9oooOkEQefkPhQ0F9zB0Q7XBO9LlB4HszAav3mYbGTPTTDn_OIXyXkQnL3ixGPCerkQZZfN_o6YR9BWn-a7RJ1LBCYS_LtoMcnYR8AwSciYfKaBpxLcMu2M3_zbcyqGwmUJYFfmiRsXTbxM0Z4TzX2tYJl2Hxk6L0w_lG7ZQhI9g"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-[#141e19]">Top 3% Vetted</span>
                  <span className="font-code-badge text-[10px] text-[#6d7a70]">Verified escrows</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
