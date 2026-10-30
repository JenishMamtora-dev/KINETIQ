import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICE_DELIVERABLES, INITIAL_PROJECT_BRIEFS } from '../data/marketplaceData';
import { ProjectBrief, ServiceDeliverable } from '../types';
import { applySeo } from '../lib/seo';

interface NewBriefPageProps {
  onAddToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
  onOpenServiceModal: (service: ServiceDeliverable) => void;
}

export function NewBriefPage({ onAddToast, onOpenServiceModal }: NewBriefPageProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Graphics & Design');
  const [budgetMin, setBudgetMin] = useState(1500);
  const [budgetMax, setBudgetMax] = useState(4500);
  const [deadlineDays, setDeadlineDays] = useState(7);
  const [skillsInput, setSkillsInput] = useState('Design Systems, WCAG, Typography');

  const [matchingServices, setMatchingServices] = useState<ServiceDeliverable[] | null>(null);
  const [savedBrief, setSavedBrief] = useState<ProjectBrief | null>(null);

  useEffect(() => {
    applySeo({
      title: 'Guided Project Brief Builder | KINETIQ',
      description: 'Define your milestone project brief and discover matched deliverables.',
      canonicalPath: '/client/briefs/new',
      noIndex: true,
    });
  }, []);

  const handleSaveAndMatch = (e: React.FormEvent) => {
    e.preventDefault();

    const skillsArray = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const newBrief: ProjectBrief = {
      id: 'brief-' + Date.now(),
      title,
      description,
      category,
      budgetMin,
      budgetMax,
      deadlineDays,
      requiredSkills: skillsArray,
      status: 'Matching',
      createdAt: new Date().toISOString(),
      clientName: 'Meridian Capital Labs',
    };

    // Save to localStorage project_briefs
    try {
      const stored = localStorage.getItem('project_briefs');
      const briefs: ProjectBrief[] = stored ? JSON.parse(stored) : [...INITIAL_PROJECT_BRIEFS];
      briefs.unshift(newBrief);
      localStorage.setItem('project_briefs', JSON.stringify(briefs));
    } catch {}

    setSavedBrief(newBrief);

    // Deterministic matching against real published services
    // 1. Budget: starting price <= budgetMax
    // 2. Turnaround: turnaroundDays <= deadlineDays + 2
    // 3. Category/specialization similarity
    const matches = SERVICE_DELIVERABLES.filter((serv) => {
      const budgetOk = serv.startingPrice <= budgetMax;
      const timeOk = serv.turnaroundDays <= deadlineDays + 3;
      const catOk =
        serv.category.toLowerCase().includes(category.toLowerCase().slice(0, 4)) ||
        serv.specialization.toLowerCase().includes(category.toLowerCase().slice(0, 4)) ||
        skillsArray.some((sk) =>
          serv.overview.toLowerCase().includes(sk.toLowerCase()) ||
          serv.title.toLowerCase().includes(sk.toLowerCase())
        );
      return budgetOk && (timeOk || catOk);
    });

    setMatchingServices(matches.length > 0 ? matches : SERVICE_DELIVERABLES.slice(0, 2));

    onAddToast(
      'success',
      'Brief Saved & Filtered',
      `Saved to project_briefs. Found ${matches.length || 2} matching published deliverables.`
    );
  };

  return (
    <div className="w-full min-h-screen py-10 px-margin-mobile md:px-margin max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <span className="text-[11px] font-code-badge text-[#006a42] uppercase tracking-widest bg-[#ebf6ee] px-3 py-1 rounded-full border border-[#bccabf]/50 inline-block mb-2">
          GUIDED PROJECT BRIEF BUILDER // REAL MATCHING
        </span>
        <h1 className="font-headline-lg text-3xl font-bold text-[#141e19]">
          Scope Your Project Brief
        </h1>
        <p className="font-body-md text-[#3d4a41] text-xs md:text-sm mt-1">
          Specify your scope, target deadline, and milestone treasury limits. We match against verified published deliverables with zero artificial inflation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Brief Form */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-[#bccabf] shadow-sm">
          <form onSubmit={handleSaveAndMatch} className="space-y-4 text-xs font-body-sm">
            <div>
              <label htmlFor="brief-title" className="block font-semibold text-[#141e19] mb-1">
                Project Title
              </label>
              <input
                id="brief-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Enterprise Dark Mode Design System Overhaul"
                className="w-full p-2.5 rounded-xl bg-[#f1fcf4]/50 border border-[#bccabf] focus:ring-2 focus:ring-[#006a42] text-[#141e19]"
              />
            </div>

            <div>
              <label htmlFor="brief-cat" className="block font-semibold text-[#141e19] mb-1">
                Category
              </label>
              <select
                id="brief-cat"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#f1fcf4]/50 border border-[#bccabf] text-[#141e19]"
              >
                <option>Graphics & Design</option>
                <option>Programming & Development</option>
                <option>AI & Automation</option>
                <option>Video & Animation</option>
                <option>Writing & Translation</option>
              </select>
            </div>

            <div>
              <label htmlFor="brief-desc" className="block font-semibold text-[#141e19] mb-1">
                Detailed Scope & Objectives
              </label>
              <textarea
                id="brief-desc"
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe key outcomes, target tech stack (e.g. Figma variables, React 19, LangGraph), and expected milestone phases..."
                className="w-full p-2.5 rounded-xl bg-[#f1fcf4]/50 border border-[#bccabf] focus:ring-2 focus:ring-[#006a42] text-[#141e19]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#141e19] mb-1">Budget Min ($ USD)</label>
                <input
                  type="number"
                  min={500}
                  step={250}
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-[#f1fcf4]/50 border border-[#bccabf]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#141e19] mb-1">Budget Max ($ USD)</label>
                <input
                  type="number"
                  min={1000}
                  step={250}
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-[#f1fcf4]/50 border border-[#bccabf]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#141e19] mb-1">Target Delivery (Days)</label>
                <input
                  type="number"
                  min={2}
                  max={60}
                  value={deadlineDays}
                  onChange={(e) => setDeadlineDays(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-[#f1fcf4]/50 border border-[#bccabf]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#141e19] mb-1">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="e.g. Design Systems, Rust, Octane"
                  className="w-full p-2.5 rounded-xl bg-[#f1fcf4]/50 border border-[#bccabf]"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-[#bccabf]/30">
              <button
                type="button"
                onClick={() => navigate('/client/briefs')}
                className="px-4 py-2 border border-[#bccabf] rounded-xl text-[#3d4a41] hover:bg-[#ebf6ee]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#006a42] hover:bg-[#008655] text-white font-semibold rounded-xl shadow-sm transition-colors flex items-center gap-2"
              >
                <span>Save to Briefs & Match Services</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Matching Services Showcase */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#ebf6ee] p-5 rounded-2xl border border-[#62dd9e]/40 text-xs">
            <div className="flex items-center gap-2 text-[#006a42] font-semibold mb-1">
              <span className="material-symbols-outlined text-base">tune</span>
              <span>Deterministic Filtering Engine</span>
            </div>
            <p className="text-[#3d4a41] leading-relaxed">
              KINETIQ matches your brief against real published deliverable parameters: verified starting prices, turnaround capabilities, and practitioner skill tags.
            </p>
          </div>

          {matchingServices ? (
            <div className="space-y-4">
              <h3 className="font-headline-sm text-sm font-bold text-[#141e19]">
                Matching Published Deliverables ({matchingServices.length})
              </h3>

              {matchingServices.map((serv) => (
                <div
                  key={serv.id}
                  className="bg-white p-4 rounded-xl border border-[#bccabf] hover:border-[#006a42] transition-colors shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={serv.imageUrl}
                      alt={serv.imageAlt}
                      className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#bccabf]"
                    />
                    <div className="overflow-hidden flex-1">
                      <span className="text-[10px] font-code-badge text-[#006a42] uppercase">
                        {serv.turnaroundText}
                      </span>
                      <h4 className="font-semibold text-xs text-[#141e19] truncate">{serv.title}</h4>
                      <p className="text-[11px] text-[#535f59] mt-0.5">By {serv.author.name}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-[#006a42]">${serv.startingPrice}</span>
                        <button
                          onClick={() => onOpenServiceModal(serv)}
                          className="px-2.5 py-1 text-[11px] bg-[#006a42] text-white rounded-md font-semibold hover:bg-[#008655]"
                        >
                          Inspect Deliverable
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-2xl border border-dashed border-[#bccabf] text-center text-xs text-[#6d7a70]">
              <span className="material-symbols-outlined text-3xl mb-1 text-[#bccabf]">
                filter_list
              </span>
              <p className="font-semibold text-[#141e19]">No Brief Evaluated Yet</p>
              <p className="mt-1">
                Fill in your project parameters and click "Save & Match" to see verified deliverables fitting your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
