import React, { useState } from 'react';
import { Specialist } from '../types';

interface SpecialistModalProps {
  specialist: Specialist | null;
  onClose: () => void;
  onOpenLightbox: (imageUrl: string, title: string) => void;
  onSubmitInquiry: (specialistName: string, message: string) => void;
}

export const SpecialistModal: React.FC<SpecialistModalProps> = ({
  specialist,
  onClose,
  onOpenLightbox,
  onSubmitInquiry,
}) => {
  const [briefText, setBriefText] = useState('');
  const [timeframe, setTimeframe] = useState('2-4 weeks');
  const [inquirySent, setInquirySent] = useState(false);

  if (!specialist) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!briefText.trim()) return;
    setInquirySent(true);
    onSubmitInquiry(specialist.name, briefText);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-2xl shadow-2xl overflow-y-auto border border-[#bccabf]/40 flex flex-col">
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-[#bccabf]/30">
          <div className="flex items-center gap-2">
            <span className="font-code-badge text-xs text-[#006a42] uppercase font-bold">
              [ PRACTITIONER DOSSIER ]
            </span>
            <span className="text-[#6d7a70] text-xs font-mono">• {specialist.badge}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f1fcf4] hover:bg-[#ebf6ee] flex items-center justify-center text-[#141e19] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Top Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl bg-[#f1fcf4] border border-[#bccabf]/30">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={specialist.avatarUrl}
                  alt={specialist.avatarAlt}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-[#006a42]"
                />
                <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#006c45] ring-2 ring-white"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-headline-sm text-xl text-[#141e19]">{specialist.name}</h2>
                  <span
                    className="material-symbols-outlined text-[#006a42] text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <p className="text-sm text-[#3d4a41]">{specialist.role}</p>
                <div className="flex items-center gap-3 mt-1 text-xs font-mono text-[#6d7a70]">
                  <span>Response: {specialist.avgResponseTime}</span>
                  <span>•</span>
                  <span>{specialist.completedEscrows} Escrows Completed</span>
                </div>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-[#bccabf]/40 sm:pl-6 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[#bccabf]/30">
              <span className="text-xs text-[#6d7a70] block">Hourly Retainer</span>
              <span className="font-mono text-2xl font-bold text-[#006a42]">
                ${specialist.hourlyRate} / hr
              </span>
            </div>
          </div>

          {/* Bio & Skills */}
          <div>
            <h3 className="font-label-md text-sm text-[#141e19] mb-1.5">Practitioner Background</h3>
            <p className="text-sm text-[#3d4a41] leading-relaxed">{specialist.bio}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {specialist.skills.map((skill, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-[#e5f1e8] text-xs font-mono text-[#006a42]">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Past Clients */}
          <div>
            <h3 className="font-label-md text-xs font-mono uppercase text-[#6d7a70] tracking-wider mb-2">
              Verified Client Engagements
            </h3>
            <div className="flex flex-wrap gap-2">
              {specialist.pastClients.map((client, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-white border border-[#bccabf]/40 text-xs font-medium text-[#141e19]"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-label-md text-sm text-[#141e19]">Featured Artifacts</h3>
              <span className="text-xs font-mono text-[#6d7a70]">Click to expand</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {specialist.portfolio.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => onOpenLightbox(item.url, `${specialist.name}: ${item.title}`)}
                  className="group relative h-36 rounded-xl overflow-hidden cursor-pointer border border-[#bccabf]/30 bg-black/10"
                >
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-2.5">
                    <span className="text-xs text-white font-medium drop-shadow-sm line-clamp-1">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-[#80fab9] font-mono">View full frame</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Inquiry Form */}
          <div className="p-5 rounded-xl bg-[#ebf6ee] border border-[#006a42]/30">
            <h3 className="font-headline-sm text-sm text-[#141e19] mb-1">
              Commission {specialist.name}
            </h3>
            <p className="text-xs text-[#3d4a41] mb-4">
              Send a project brief directly. Escrow is locked only once scope and milestones are mutually confirmed.
            </p>

            {inquirySent ? (
              <div className="p-4 rounded-lg bg-white text-center text-[#006a42] font-medium text-sm flex items-center justify-center gap-2 border border-[#006a42]/30 animate-fade-in">
                <span className="material-symbols-outlined">verified</span>
                <span>Commission Brief dispatched to {specialist.name}! Expected response in {specialist.avgResponseTime}.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <textarea
                    rows={3}
                    value={briefText}
                    onChange={(e) => setBriefText(e.target.value)}
                    placeholder="Briefly describe your milestone scope, technical requirements, or visual goals..."
                    className="w-full p-3 rounded-lg border border-[#bccabf] bg-white text-xs text-[#141e19] placeholder:text-[#6d7a70] focus:outline-none focus:ring-1 focus:ring-[#006a42]"
                    required
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-xs text-[#6d7a70] font-mono">Target Timeline:</span>
                    <select
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                      className="px-2 py-1 rounded border border-[#bccabf] bg-white text-xs font-mono text-[#141e19]"
                    >
                      <option value="1 week">Under 1 week (Fast-track)</option>
                      <option value="2-4 weeks">2-4 weeks (Standard)</option>
                      <option value="1-3 months">1-3 months (Extensive)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2 rounded-lg bg-[#006a42] hover:bg-[#008655] text-white text-xs font-label-md flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Send Commission Brief</span>
                    <span className="material-symbols-outlined text-[16px]">send</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
