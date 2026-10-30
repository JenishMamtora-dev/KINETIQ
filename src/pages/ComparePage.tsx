import React, { useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SERVICE_DELIVERABLES } from '../data/marketplaceData';
import { ServiceDeliverable } from '../types';
import { applySeo } from '../lib/seo';

interface ComparePageProps {
  onOpenServiceModal: (service: ServiceDeliverable) => void;
  onLockEscrow: (title: string, amount: number) => void;
}

export function ComparePage({ onOpenServiceModal, onLockEscrow }: ComparePageProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract service IDs from URL query params (e.g. ?services=serv-1,serv-2)
  const serviceIds = useMemo(() => {
    const raw = searchParams.get('services');
    if (!raw) return ['serv-1', 'serv-2'];
    return raw.split(',').filter(Boolean).slice(0, 3);
  }, [searchParams]);

  useEffect(() => {
    applySeo({
      title: 'Compare Deliverables Side by Side | KINETIQ',
      description: 'Side-by-side comparison of scope, milestone delivery, revisions, and escrow pricing for digital deliverables.',
      canonicalPath: '/compare',
    });
  }, []);

  const selectedServices = useMemo(() => {
    return serviceIds
      .map((id) => SERVICE_DELIVERABLES.find((s) => s.id === id))
      .filter(Boolean) as ServiceDeliverable[];
  }, [serviceIds]);

  const removeService = (idToRemove: string) => {
    const updated = serviceIds.filter((id) => id !== idToRemove);
    setSearchParams(updated.length > 0 ? { services: updated.join(',') } : {});
  };

  const addService = (idToAdd: string) => {
    if (serviceIds.includes(idToAdd) || serviceIds.length >= 3) return;
    const updated = [...serviceIds, idToAdd];
    setSearchParams({ services: updated.join(',') });
  };

  const remainingServices = SERVICE_DELIVERABLES.filter((s) => !serviceIds.includes(s.id));

  return (
    <div className="w-full min-h-screen py-10 px-margin-mobile md:px-margin max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] font-code-badge text-[#006a42] uppercase tracking-widest bg-[#ebf6ee] px-3 py-1 rounded-full border border-[#bccabf]/50 inline-block mb-2">
            DELIVERABLE BENCHMARK // SIDE BY SIDE
          </span>
          <h1 className="font-headline-lg text-3xl font-bold text-[#141e19]">
            Compare Deliverable Specifications
          </h1>
          <p className="font-body-md text-xs text-[#535f59] mt-1">
            Compare scope, milestone architecture, revisions, and escrow terms across up to 3 deliverables. State is synchronized in URL parameters.
          </p>
        </div>

        {/* Add Service Selector */}
        {serviceIds.length < 3 && remainingServices.length > 0 && (
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-[#141e19]">Add Deliverable:</span>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  addService(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="p-2 rounded-xl bg-white border border-[#bccabf] text-xs font-semibold text-[#006a42]"
            >
              <option value="" disabled>Select a service to add...</option>
              {remainingServices.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title.slice(0, 36)}... (${s.startingPrice})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {selectedServices.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#bccabf] p-8">
          <p className="font-semibold text-[#141e19] mb-2">No Deliverables Selected For Comparison</p>
          <Link
            to="/explore"
            className="px-4 py-2 bg-[#006a42] text-white text-xs font-semibold rounded-xl inline-block"
          >
            Browse Deliverable Catalog
          </Link>
        </div>
      ) : (
        /* Comparison Table Grid */
        <div className="bg-white rounded-2xl border border-[#bccabf] overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#bccabf]/40 text-xs font-body-sm">
            {/* Feature Label Column (desktop) */}
            <div className="hidden md:block p-6 bg-[#ebf6ee]/60 space-y-8 font-semibold text-[#3d4a41]">
              <div className="h-32 flex items-end pb-2">
                <span className="text-[11px] font-code-badge text-[#006a42] uppercase tracking-wider">
                  Parameters
                </span>
              </div>
              <div className="py-2 border-t border-[#bccabf]/30">Starting Escrow Price</div>
              <div className="py-2 border-t border-[#bccabf]/30">Turnaround Schedule</div>
              <div className="py-2 border-t border-[#bccabf]/30">Included Revisions</div>
              <div className="py-2 border-t border-[#bccabf]/30">Vetted Rating</div>
              <div className="py-2 border-t border-[#bccabf]/30">Specialization & Discipline</div>
              <div className="py-2 border-t border-[#bccabf]/30">Scope Inclusions</div>
              <div className="py-2 border-t border-[#bccabf]/30">Milestone Phasing</div>
              <div className="py-2 border-t border-[#bccabf]/30">Lead Artisan</div>
              <div className="py-2 border-t border-[#bccabf]/30">Escrow Action</div>
            </div>

            {/* Service Columns */}
            {selectedServices.map((serv) => (
              <div key={serv.id} className="p-6 space-y-8 flex flex-col justify-between">
                {/* Header / Hero Angle */}
                <div className="h-32 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] font-code-badge text-[#006a42] uppercase bg-[#ebf6ee] px-2 py-0.5 rounded">
                      {serv.category}
                    </span>
                    {selectedServices.length > 1 && (
                      <button
                        onClick={() => removeService(serv.id)}
                        className="text-[#ba1a1a] hover:bg-[#ffdad6] p-1 rounded-full"
                        title="Remove from comparison"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    )}
                  </div>
                  <h3 className="font-headline-sm text-sm font-bold text-[#141e19] line-clamp-2 mt-1">
                    {serv.title}
                  </h3>
                </div>

                {/* Price */}
                <div className="py-2 border-t border-[#bccabf]/30">
                  <span className="md:hidden text-[#6d7a70] block text-[10px] uppercase">Starting Price</span>
                  <span className="font-headline-sm text-xl font-bold text-[#006a42]">
                    ${serv.startingPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#6d7a70] ml-1">USD</span>
                </div>

                {/* Turnaround */}
                <div className="py-2 border-t border-[#bccabf]/30">
                  <span className="md:hidden text-[#6d7a70] block text-[10px] uppercase">Turnaround</span>
                  <span className="font-semibold text-[#141e19]">{serv.turnaroundText}</span>
                  <p className="text-[10px] text-[#535f59]">({serv.turnaroundDays} calendar days)</p>
                </div>

                {/* Revisions */}
                <div className="py-2 border-t border-[#bccabf]/30">
                  <span className="md:hidden text-[#6d7a70] block text-[10px] uppercase">Revisions</span>
                  <span className="font-semibold text-[#141e19]">
                    {serv.revisions ? `${serv.revisions} Formal Revisions` : '2 Formal Revisions'}
                  </span>
                </div>

                {/* Rating */}
                <div className="py-2 border-t border-[#bccabf]/30">
                  <span className="md:hidden text-[#6d7a70] block text-[10px] uppercase">Rating</span>
                  <div className="flex items-center gap-1.5 font-bold text-[#006a42]">
                    <span>★ {serv.rating}</span>
                    <span className="text-[#6d7a70] font-normal text-[11px]">
                      ({serv.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Specialization */}
                <div className="py-2 border-t border-[#bccabf]/30">
                  <span className="md:hidden text-[#6d7a70] block text-[10px] uppercase">Specialization</span>
                  <span className="font-semibold text-[#141e19]">{serv.specialization}</span>
                </div>

                {/* Scope Inclusions */}
                <div className="py-2 border-t border-[#bccabf]/30 space-y-1.5">
                  <span className="md:hidden text-[#6d7a70] block text-[10px] uppercase">Scope Inclusions</span>
                  {serv.includedItems.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-[#3d4a41]">
                      <span className="material-symbols-outlined text-[13px] text-[#006a42] mt-0.5 shrink-0">
                        check
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Milestone Phasing */}
                <div className="py-2 border-t border-[#bccabf]/30">
                  <span className="md:hidden text-[#6d7a70] block text-[10px] uppercase">Milestones</span>
                  <p className="font-semibold text-[#141e19]">
                    {serv.milestones.length} Escrow Tranches
                  </p>
                  <span className="text-[10px] text-[#535f59]">
                    {serv.milestones.map((m) => `${m.percentage}%`).join(' + ')}
                  </span>
                </div>

                {/* Author */}
                <div className="py-2 border-t border-[#bccabf]/30 flex items-center gap-2">
                  <img
                    src={serv.author.avatarUrl}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover border border-[#62dd9e]"
                  />
                  <div>
                    <span className="font-semibold text-[#141e19] block">{serv.author.name}</span>
                    <span className="text-[10px] text-[#006a42] font-code-badge">{serv.author.role}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#bccabf]/30 space-y-2">
                  <button
                    onClick={() => onOpenServiceModal(serv)}
                    className="w-full py-2 bg-[#006a42] hover:bg-[#008655] text-white rounded-xl font-semibold transition-colors shadow-sm"
                  >
                    Inspect Full Dossier
                  </button>
                  <button
                    onClick={() => onLockEscrow(serv.title, serv.startingPrice)}
                    className="w-full py-2 border border-[#006a42] text-[#006a42] hover:bg-[#ebf6ee] rounded-xl font-semibold transition-colors"
                  >
                    Lock Vault Escrow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
