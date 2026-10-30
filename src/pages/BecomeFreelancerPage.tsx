import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileUploadWidget } from '../components/common/FileUploadWidget';
import { Reveal } from '../components/motion/Reveal';
import { applySeo } from '../lib/seo';

interface BecomeFreelancerPageProps {
  onOpenArtisanModal: () => void;
  onAddToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

export function BecomeFreelancerPage({
  onOpenArtisanModal,
  onAddToast,
}: BecomeFreelancerPageProps) {
  useEffect(() => {
    applySeo({
      title: 'Join the Artisan Roster | KINETIQ Admissions',
      description: 'Apply to join the Top 1% curated roster of brand architects, AI systems engineers, and 3D visualists with guaranteed escrow protection.',
      canonicalPath: '/become-a-freelancer',
    });
  }, []);

  return (
    <div className="w-full min-h-screen py-10 px-margin-mobile md:px-margin max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <Reveal variant="fade-up">
          <span className="text-[11px] font-code-badge text-[#006a42] uppercase tracking-widest bg-[#ebf6ee] px-3 py-1 rounded-full border border-[#bccabf]/50 inline-block mb-3">
            ADMISSIONS // TOP 1% CURATION
          </span>
          <h1 className="font-headline-lg text-3xl md:text-5xl font-bold tracking-tight text-[#141e19]">
            The Artisan Invitation
          </h1>
          <p className="font-body-md text-[#3d4a41] mt-3 text-xs md:text-sm leading-relaxed">
            We reject the race-to-the-bottom freelancing paradigm. KINETIQ is built for seasoned craftspeople seeking serious enterprise commissions, guaranteed escrow deposits, and zero scope creep.
          </p>
        </Reveal>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#bccabf] shadow-sm">
          <span className="text-xs font-code-badge text-[#006a42] font-bold block mb-2">01 // ADMISSION</span>
          <h3 className="font-headline-sm text-base font-bold text-[#141e19] mb-1">
            Audited Portfolio Review
          </h3>
          <p className="text-xs text-[#535f59] leading-relaxed">
            Every applicant dossier is examined by practicing studio heads. We evaluate Figma component hygiene, Rust code architecture, and 3D shader formulation.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#bccabf] shadow-sm">
          <span className="text-xs font-code-badge text-[#006a42] font-bold block mb-2">02 // PROTECTION</span>
          <h3 className="font-headline-sm text-base font-bold text-[#141e19] mb-1">
            Zero Unfunded Starts
          </h3>
          <p className="text-xs text-[#535f59] leading-relaxed">
            You never open an editor or launch an instance until funds are locked in the multi-sig vault. Your time is protected by cryptographic escrow.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#bccabf] shadow-sm">
          <span className="text-xs font-code-badge text-[#006a42] font-bold block mb-2">03 // PRICING</span>
          <h3 className="font-headline-sm text-base font-bold text-[#141e19] mb-1">
            No Bidding Wars
          </h3>
          <p className="text-xs text-[#535f59] leading-relaxed">
            Deliverables are published with transparent starting prices ($1,200 - $5,000+). Clients commission your verified deliverables at full value.
          </p>
        </div>
      </div>

      {/* Portfolio Artifact Upload Test Box */}
      <div className="bg-white p-8 rounded-2xl border border-[#bccabf] shadow-sm space-y-4">
        <div>
          <h2 className="font-headline-sm text-base font-bold text-[#141e19]">
            Test Portfolio Artifact Upload & Optimization
          </h2>
          <p className="text-xs text-[#535f59] mt-0.5">
            Preview our client-side WebP conversion engine, size validation (max 15MB), and multi-sig signed URL generator.
          </p>
        </div>

        <FileUploadWidget
          label="Attach Sample Case Study or Portfolio Deliverable"
          isPrivateDeliverable={true}
          onFileProcessed={(info) => {
            onAddToast(
              'success',
              'Artifact Processed',
              `${info.name} optimized to ${info.sizeKb}KB WebP with signed URL token.`
            );
          }}
        />
      </div>

      {/* Bottom CTA */}
      <div className="text-center py-6">
        <button
          onClick={onOpenArtisanModal}
          className="px-8 py-3 bg-[#006a42] hover:bg-[#008655] text-white text-sm font-semibold rounded-xl shadow-md transition-all hover:scale-[1.02] inline-flex items-center gap-2"
        >
          <span>Submit Artisan Application</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </button>
        <p className="text-[11px] text-[#6d7a70] mt-3 font-code-badge">
          Average evaluation turnaround: 48 business hours // Strict NDA adherence
        </p>
      </div>
    </div>
  );
}
