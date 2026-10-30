import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { INITIAL_PROJECT_BRIEFS, SERVICE_DELIVERABLES } from '../data/marketplaceData';
import { ProjectBrief, ServiceDeliverable } from '../types';
import { applySeo } from '../lib/seo';

interface ClientBriefsPageProps {
  onOpenServiceModal: (service: ServiceDeliverable) => void;
  onAddToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

export function ClientBriefsPage({ onOpenServiceModal, onAddToast }: ClientBriefsPageProps) {
  const [briefs, setBriefs] = useState<ProjectBrief[]>([]);
  const [selectedBrief, setSelectedBrief] = useState<ProjectBrief | null>(null);

  useEffect(() => {
    applySeo({
      title: 'Project Briefs Management | KINETIQ Client Workspace',
      description: 'Review active briefs, track milestone proposals, and inspect matched deliverables.',
      canonicalPath: '/client/briefs',
      noIndex: true,
    });

    try {
      const stored = localStorage.getItem('project_briefs');
      if (stored) {
        setBriefs(JSON.parse(stored));
      } else {
        setBriefs(INITIAL_PROJECT_BRIEFS);
      }
    } catch {
      setBriefs(INITIAL_PROJECT_BRIEFS);
    }
  }, []);

  const handleDeleteBrief = (id: string) => {
    const updated = briefs.filter((b) => b.id !== id);
    setBriefs(updated);
    try {
      localStorage.setItem('project_briefs', JSON.stringify(updated));
    } catch {}
    onAddToast('info', 'Brief Archived', 'Project brief moved to archive.');
  };

  // Find matching services for a brief
  const getMatchesForBrief = (brief: ProjectBrief) => {
    return SERVICE_DELIVERABLES.filter(
      (s) =>
        s.startingPrice <= brief.budgetMax &&
        (s.category.toLowerCase().includes(brief.category.toLowerCase().slice(0, 4)) ||
          brief.requiredSkills.some((sk) => s.overview.toLowerCase().includes(sk.toLowerCase())))
    );
  };

  return (
    <div className="w-full min-h-screen py-10 px-margin-mobile md:px-margin max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <span className="text-[11px] font-code-badge text-[#006a42] uppercase tracking-widest bg-[#ebf6ee] px-3 py-1 rounded-full border border-[#bccabf]/50 inline-block mb-2">
            CLIENT BRIEF DASHBOARD // TREASURY CONTROL
          </span>
          <h1 className="font-headline-lg text-3xl font-bold text-[#141e19]">
            Active Project Briefs
          </h1>
          <p className="font-body-md text-xs text-[#535f59] mt-1">
            Manage your project requisitions, matched deliverables, and escrow commitments.
          </p>
        </div>

        <Link
          to="/client/briefs/new"
          className="px-5 py-2.5 bg-[#006a42] hover:bg-[#008655] text-white text-xs font-semibold rounded-xl shadow-sm transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-base">add_circle</span>
          <span>Scope New Brief</span>
        </Link>
      </div>

      {/* Briefs List */}
      <div className="space-y-4">
        {briefs.map((brief) => {
          const matches = getMatchesForBrief(brief);
          return (
            <div
              key={brief.id}
              className="bg-white p-6 rounded-2xl border border-[#bccabf] shadow-sm hover:border-[#006a42] transition-colors"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-[#bccabf]/30">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-code-badge px-2.5 py-0.5 rounded-full font-semibold ${
                        brief.status === 'Contract Active'
                          ? 'bg-[#ebf6ee] text-[#006a42] border border-[#62dd9e]'
                          : brief.status === 'Reviewing Proposals'
                          ? 'bg-[#fef9c3] text-[#854d0e] border border-[#fde047]'
                          : 'bg-[#f1fcf4] text-[#006a42] border border-[#bccabf]'
                      }`}
                    >
                      {brief.status.toUpperCase()}
                    </span>
                    <span className="text-xs text-[#6d7a70] font-code-badge">
                      {brief.id} • Created {new Date(brief.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-lg font-bold text-[#141e19]">
                    {brief.title}
                  </h3>
                </div>

                <div className="flex items-center gap-6 text-xs">
                  <div>
                    <span className="text-[#6d7a70] block text-[10px] uppercase font-code-badge">Budget Allocation</span>
                    <span className="font-bold text-[#006a42] font-code-badge text-sm">
                      ${brief.budgetMin.toLocaleString()} - ${brief.budgetMax.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#6d7a70] block text-[10px] uppercase font-code-badge">Target Turnaround</span>
                    <span className="font-semibold text-[#141e19]">{brief.deadlineDays} Days</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#3d4a41] my-4 leading-relaxed font-body-sm">
                {brief.description}
              </p>

              {/* Skills and Matching Deliverables */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {brief.requiredSkills.map((sk) => (
                    <span
                      key={sk}
                      className="text-[10px] font-code-badge px-2 py-0.5 bg-[#f1fcf4] text-[#006a42] rounded border border-[#bccabf]/40"
                    >
                      {sk}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => setSelectedBrief(selectedBrief?.id === brief.id ? null : brief)}
                    className="px-3 py-1.5 bg-[#ebf6ee] text-[#006a42] hover:bg-[#006a42] hover:text-white rounded-lg font-semibold transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                    <span>
                      {selectedBrief?.id === brief.id ? 'Hide Matches' : `View ${matches.length} Matched Deliverables`}
                    </span>
                  </button>

                  <button
                    onClick={() => handleDeleteBrief(brief.id)}
                    className="text-[#6d7a70] hover:text-[#ba1a1a] p-1.5"
                    title="Archive Brief"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>

              {/* Expanded matching services preview */}
              {selectedBrief?.id === brief.id && (
                <div className="mt-5 p-4 rounded-xl bg-[#f1fcf4] border border-[#62dd9e]/40 space-y-3">
                  <p className="text-xs font-semibold text-[#006a42] flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Direct Deliverable Matches (Under ${brief.budgetMax} & Within Scope)</span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matches.map((serv) => (
                      <div
                        key={serv.id}
                        className="bg-white p-3 rounded-lg border border-[#bccabf] flex items-center justify-between gap-2"
                      >
                        <div className="truncate">
                          <p className="font-semibold text-xs text-[#141e19] truncate">{serv.title}</p>
                          <p className="text-[10px] text-[#6d7a70]">
                            ${serv.startingPrice} • By {serv.author.name}
                          </p>
                        </div>
                        <button
                          onClick={() => onOpenServiceModal(serv)}
                          className="px-2.5 py-1 text-[11px] bg-[#006a42] text-white rounded font-semibold hover:bg-[#008655] shrink-0"
                        >
                          Inspect
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {briefs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#bccabf] p-8">
            <span className="material-symbols-outlined text-4xl text-[#6d7a70] mb-2">
              assignment_add
            </span>
            <h3 className="font-headline-sm font-semibold text-[#141e19]">No Project Briefs Active</h3>
            <p className="text-xs text-[#535f59] mt-1 max-w-sm mx-auto mb-4">
              Scope your first milestone project to unlock verified deliverable matches.
            </p>
            <Link
              to="/client/briefs/new"
              className="px-5 py-2 bg-[#006a42] text-white text-xs font-semibold rounded-xl inline-block"
            >
              Create Brief
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
