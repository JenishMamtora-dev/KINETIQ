import React, { useState, useMemo, useEffect } from 'react';
import { SPECIALISTS_DATA } from '../data/marketplaceData';
import { Specialist, FreelancerAvailability, ReportItem } from '../types';
import { Reveal } from '../components/motion/Reveal';
import { TiltCard } from '../components/cards/TiltCard';
import { ReportModal } from '../components/common/ReportModal';
import { applySeo } from '../lib/seo';

interface FreelancersPageProps {
  onOpenSpecialistModal: (spec: Specialist) => void;
  onOpenLightbox: (url: string, title: string) => void;
  onSpecialistInquiry: (name: string) => void;
  onAddToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

export function FreelancersPage({
  onOpenSpecialistModal,
  onOpenLightbox,
  onSpecialistInquiry,
  onAddToast,
}: FreelancersPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [maxHourlyRate, setMaxHourlyRate] = useState(250);
  const [sortBy, setSortBy] = useState<'rating' | 'escrows' | 'rate-asc' | 'rate-desc'>('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [reportTarget, setReportTarget] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    applySeo({
      title: 'Find Vetted Freelance Specialists & Digital Artisans',
      description: 'Discover world-class brand architects, AI systems engineers, and 3D visualists with verified multi-sig escrows.',
      canonicalPath: '/freelancers',
    });
  }, []);

  // Filter and search logic with debounced query simulation
  const filteredSpecialists = useMemo(() => {
    return SPECIALISTS_DATA.filter((spec) => {
      // Query match (name, role, bio, skills, past clients)
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        spec.name.toLowerCase().includes(q) ||
        spec.role.toLowerCase().includes(q) ||
        spec.bio.toLowerCase().includes(q) ||
        spec.skills.some((s) => s.toLowerCase().includes(q)) ||
        spec.pastClients.some((c) => c.toLowerCase().includes(q));

      // Skill match
      const matchesSkill = selectedSkill === 'All' || spec.skills.includes(selectedSkill);

      // Availability match
      const matchesAvailability =
        selectedAvailability === 'All' || spec.availability === selectedAvailability;

      // Verified match
      const matchesVerified = !verifiedOnly || spec.verified;

      // Rate match
      const matchesRate = spec.hourlyRate <= maxHourlyRate;

      return matchesQuery && matchesSkill && matchesAvailability && matchesVerified && matchesRate;
    }).sort((a, b) => {
      if (sortBy === 'escrows') return b.completedEscrows - a.completedEscrows;
      if (sortBy === 'rate-asc') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'rate-desc') return b.hourlyRate - a.hourlyRate;
      return 0; // default order
    });
  }, [searchQuery, selectedSkill, selectedAvailability, verifiedOnly, maxHourlyRate, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredSpecialists.length / itemsPerPage) || 1;
  const paginatedSpecialists = filteredSpecialists.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const allSkills = Array.from(new Set(SPECIALISTS_DATA.flatMap((s) => s.skills)));

  const handleReportSubmit = (report: ReportItem) => {
    onAddToast('info', 'Report Received', `Our safety team will review ${report.targetName}.`);
  };

  const handleBlockUser = (id: string, name: string) => {
    onAddToast('error', 'User Blocked', `${name} has been removed from your discovery view.`);
  };

  return (
    <div className="w-full min-h-screen py-10 px-margin-mobile md:px-margin max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <Reveal variant="fade-up">
          <span className="text-[11px] font-code-badge text-[#006a42] uppercase tracking-widest bg-[#ebf6ee] px-3 py-1 rounded-full border border-[#bccabf]/50 inline-block mb-3">
            VETTED TALENT ROSTER // TOP 1%
          </span>
          <h1 className="font-headline-lg text-3xl md:text-5xl font-bold tracking-tight text-[#141e19]">
            The Digital Artisans
          </h1>
          <p className="font-body-md text-[#3d4a41] mt-3">
            Filter through independently audited practitioners. Every contract is backed by automated milestone escrow protection.
          </p>
        </Reveal>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-[#bccabf]/70 shadow-sm mb-8 space-y-4">
        {/* Row 1: Search & Sort */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6d7a70]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by practitioner name, skill, client, or discipline..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#f1fcf4]/50 border border-[#bccabf] focus:outline-none focus:ring-2 focus:ring-[#006a42] text-sm text-[#141e19]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6d7a70] hover:text-[#141e19] text-xs"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-[#3d4a41] whitespace-nowrap">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="p-2.5 rounded-xl bg-[#f1fcf4]/50 border border-[#bccabf] text-xs font-semibold text-[#141e19] focus:outline-none focus:ring-2 focus:ring-[#006a42]"
            >
              <option value="rating">Top Recommended</option>
              <option value="escrows">Completed Escrows</option>
              <option value="rate-asc">Hourly Rate: Low to High</option>
              <option value="rate-desc">Hourly Rate: High to Low</option>
            </select>
          </div>
        </div>

        {/* Row 2: Secondary Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t border-[#bccabf]/30 text-xs">
          {/* Skill Filter */}
          <div>
            <label className="block font-semibold text-[#141e19] mb-1">Discipline Skill</label>
            <select
              value={selectedSkill}
              onChange={(e) => {
                setSelectedSkill(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 rounded-lg bg-[#f1fcf4]/50 border border-[#bccabf] text-[#141e19]"
            >
              <option value="All">All Disciplines</option>
              {allSkills.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="block font-semibold text-[#141e19] mb-1">Availability</label>
            <select
              value={selectedAvailability}
              onChange={(e) => {
                setSelectedAvailability(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 rounded-lg bg-[#f1fcf4]/50 border border-[#bccabf] text-[#141e19]"
            >
              <option value="All">All Schedules</option>
              <option value="Available Now">🟢 Available Now</option>
              <option value="Available Next Week">🟡 Available Next Week</option>
              <option value="Booked">🔴 Booked</option>
            </select>
          </div>

          {/* Rate Range */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-[#141e19]">Max Hourly Rate</span>
              <span className="font-code-badge text-[#006a42] font-semibold">${maxHourlyRate}/hr</span>
            </div>
            <input
              type="range"
              min={100}
              max={250}
              step={10}
              value={maxHourlyRate}
              onChange={(e) => {
                setMaxHourlyRate(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full accent-[#006a42] cursor-pointer"
            />
          </div>

          {/* Verified Only Switch */}
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#141e19]">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => {
                  setVerifiedOnly(e.target.checked);
                  setCurrentPage(1);
                }}
                className="w-4 h-4 accent-[#006a42] rounded"
              />
              <span>Verified Only Badge</span>
            </label>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center mb-6 text-xs text-[#535f59]">
        <span>
          Showing <strong className="text-[#141e19]">{paginatedSpecialists.length}</strong> of{' '}
          <strong className="text-[#141e19]">{filteredSpecialists.length}</strong> vetted specialists
        </span>
        {filteredSpecialists.length === 0 && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSkill('All');
              setSelectedAvailability('All');
              setVerifiedOnly(false);
              setMaxHourlyRate(250);
            }}
            className="text-[#006a42] hover:underline font-semibold"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Grid of Specialists */}
      {paginatedSpecialists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedSpecialists.map((spec) => (
            <TiltCard
              key={spec.id}
              isFeatured={spec.verified}
              className="bg-white rounded-2xl border border-[#bccabf]/60 p-6 flex flex-col justify-between"
            >
              <div>
                {/* Top card info */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={spec.avatarUrl}
                      alt={spec.avatarAlt}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#62dd9e]"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-headline-sm text-base font-bold text-[#141e19]">
                          {spec.name}
                        </h3>
                        {spec.verified && (
                          <span
                            className="material-symbols-outlined text-[#006a42] text-base"
                            title="Independently Vetted by KINETIQ"
                          >
                            verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-[#535f59]">{spec.role}</p>
                      {/* Availability status badge */}
                      <span className="inline-flex items-center gap-1 text-[10px] font-code-badge mt-1 px-2 py-0.5 rounded-full bg-[#f1fcf4] text-[#006a42] border border-[#62dd9e]/40">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            spec.availability === 'Available Now'
                              ? 'bg-[#008655]'
                              : spec.availability === 'Available Next Week'
                              ? 'bg-[#b8860b]'
                              : 'bg-[#ba1a1a]'
                          }`}
                        />
                        {spec.availability || 'Available Now'}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-headline-sm font-bold text-[#141e19] text-base">
                      ${spec.hourlyRate}
                    </span>
                    <span className="text-[11px] text-[#535f59]">/hr</span>
                    <p className="text-[10px] font-code-badge text-[#006a42]">
                      {spec.completedEscrows} escrows
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-[#3d4a41] line-clamp-2 mb-4 leading-relaxed">
                  {spec.bio}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {spec.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-code-badge px-2 py-0.5 rounded-md bg-[#ebf6ee] text-[#006a42] border border-[#bccabf]/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Portfolio preview thumbnails */}
                {spec.portfolio && spec.portfolio.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {spec.portfolio.slice(0, 3).map((item, pIdx) => (
                      <div
                        key={pIdx}
                        onClick={() => onOpenLightbox(item.url, item.title)}
                        className="group/img relative h-16 rounded-lg overflow-hidden cursor-pointer border border-[#bccabf]/40"
                      >
                        <img
                          src={item.url}
                          alt={item.alt}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-sm">
                            zoom_in
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[#bccabf]/30 text-xs">
                <button
                  onClick={() => setReportTarget({ id: spec.id, name: spec.name })}
                  className="text-[#6d7a70] hover:text-[#ba1a1a] flex items-center gap-1 font-body-sm transition-colors"
                  title="Report artisan profile"
                >
                  <span className="material-symbols-outlined text-sm">flag</span>
                  <span>Report</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenSpecialistModal(spec)}
                    className="px-3.5 py-1.5 border border-[#bccabf] hover:border-[#006a42] rounded-lg text-[#141e19] font-semibold transition-colors"
                  >
                    View Dossier
                  </button>
                  <button
                    onClick={() => {
                      onSpecialistInquiry(spec.name);
                    }}
                    className="px-4 py-1.5 bg-[#006a42] hover:bg-[#008655] text-white rounded-lg font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>Direct Brief</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#bccabf]/50 p-8">
          <span className="material-symbols-outlined text-4xl text-[#6d7a70] mb-2">
            person_search
          </span>
          <h3 className="font-headline-sm font-semibold text-[#141e19]">No specialists match your criteria</h3>
          <p className="text-xs text-[#535f59] mt-1 max-w-md mx-auto">
            Try broadening your maximum hourly rate or resetting discipline filters.
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1.5 rounded-lg border border-[#bccabf] text-xs font-semibold disabled:opacity-40 hover:bg-white"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold ${
                currentPage === page
                  ? 'bg-[#006a42] text-white'
                  : 'border border-[#bccabf] text-[#141e19] hover:bg-white'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 rounded-lg border border-[#bccabf] text-xs font-semibold disabled:opacity-40 hover:bg-white"
          >
            Next
          </button>
        </div>
      )}

      {/* Report Modal */}
      {reportTarget && (
        <ReportModal
          isOpen={Boolean(reportTarget)}
          targetType="specialist"
          targetId={reportTarget.id}
          targetName={reportTarget.name}
          onClose={() => setReportTarget(null)}
          onSubmitReport={handleReportSubmit}
          onBlockUser={handleBlockUser}
        />
      )}
    </div>
  );
}
