import React, { useState } from 'react';

interface ArtisanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (name: string) => void;
}

export const ArtisanModal: React.FC<ArtisanModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    discipline: 'Graphics & Design',
    yearsExp: '5-8 years',
    portfolioUrl: '',
    githubOrFigma: '',
    caseStudyHighlight: '',
    hourlyRate: 150,
    availability: '20-30 hrs / week',
    agreedToTerms: true,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    } else {
      setStep(4);
      onSuccess(formData.fullName || 'Artisan');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#bccabf]/40 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#f1fcf4] border-b border-[#bccabf]/30">
          <div>
            <span className="font-code-badge text-xs text-[#006a42] uppercase font-bold">
              [ ARTISAN ADMISSION PROTOCOL ]
            </span>
            <h3 className="font-headline-sm text-base text-[#141e19]">
              Apply for KINETIQ Roster (Top 3% Curation)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#ebf6ee] flex items-center justify-center text-[#141e19] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="px-6 py-2 bg-[#e5f1e8]/50 border-b border-[#bccabf]/20 flex items-center justify-between text-xs font-mono text-[#6d7a70]">
            <span className={step >= 1 ? 'text-[#006a42] font-bold' : ''}>1. Identity</span>
            <span>→</span>
            <span className={step >= 2 ? 'text-[#006a42] font-bold' : ''}>2. Proof of Work</span>
            <span>→</span>
            <span className={step >= 3 ? 'text-[#006a42] font-bold' : ''}>3. Terms &amp; Rates</span>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 md:p-8">
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#141e19] mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Chen"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#bccabf] text-sm text-[#141e19] focus:outline-none focus:ring-1 focus:ring-[#006a42]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#141e19] mb-1">Direct Contact Email</label>
                <input
                  type="email"
                  required
                  placeholder="maya@studio.design"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#bccabf] text-sm text-[#141e19] focus:outline-none focus:ring-1 focus:ring-[#006a42]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#141e19] mb-1">Primary Discipline</label>
                  <select
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#bccabf] text-sm text-[#141e19] focus:outline-none focus:ring-1 focus:ring-[#006a42]"
                  >
                    <option>Graphics &amp; Design</option>
                    <option>Programming &amp; Development</option>
                    <option>AI &amp; Automation</option>
                    <option>Video &amp; Animation</option>
                    <option>Digital Marketing</option>
                    <option>Data &amp; Analytics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#141e19] mb-1">Years of Senior Practice</label>
                  <select
                    value={formData.yearsExp}
                    onChange={(e) => setFormData({ ...formData, yearsExp: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#bccabf] text-sm text-[#141e19] focus:outline-none focus:ring-1 focus:ring-[#006a42]"
                  >
                    <option>3-5 years</option>
                    <option>5-8 years</option>
                    <option>8-12 years</option>
                    <option>12+ years (Director)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#006a42] hover:bg-[#008655] text-white text-xs font-label-md flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Continue to Proof of Work</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#141e19] mb-1">
                  Primary Portfolio or Case Studies URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://yourportfolio.studio or Read.cv"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#bccabf] text-sm text-[#141e19] focus:outline-none focus:ring-1 focus:ring-[#006a42]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#141e19] mb-1">
                  GitHub, Behance, Dribbble or Figma Profile
                </label>
                <input
                  type="text"
                  placeholder="https://github.com/yourhandle or @figma_profile"
                  value={formData.githubOrFigma}
                  onChange={(e) => setFormData({ ...formData, githubOrFigma: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#bccabf] text-sm text-[#141e19] focus:outline-none focus:ring-1 focus:ring-[#006a42]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#141e19] mb-1">
                  Notable Client or System Highlight
                </label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe an iconic project, high-impact outcome, or brand system you architected..."
                  value={formData.caseStudyHighlight}
                  onChange={(e) => setFormData({ ...formData, caseStudyHighlight: e.target.value })}
                  className="w-full p-3 rounded-lg border border-[#bccabf] text-sm text-[#141e19] focus:outline-none focus:ring-1 focus:ring-[#006a42]"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-mono text-[#6d7a70] hover:text-[#141e19]"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#006a42] hover:bg-[#008655] text-white text-xs font-label-md flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Continue to Terms &amp; Rates</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#141e19] mb-1">
                    Target Hourly Retainer ($ USD)
                  </label>
                  <input
                    type="number"
                    min="75"
                    max="500"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[#bccabf] text-sm font-mono text-[#141e19] focus:outline-none focus:ring-1 focus:ring-[#006a42]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#141e19] mb-1">Weekly Bandwidth</label>
                  <select
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#bccabf] text-sm text-[#141e19] focus:outline-none focus:ring-1 focus:ring-[#006a42]"
                  >
                    <option>10-20 hrs / week</option>
                    <option>20-30 hrs / week</option>
                    <option>Full-time Retainer (40 hrs)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f1fcf4] border border-[#bccabf]/30 space-y-2 text-xs text-[#3d4a41]">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#006a42] text-[16px] shrink-0 mt-0.5">
                    verified
                  </span>
                  <span>
                    <strong>Direct Milestone Payouts:</strong> No intermediary platform cut deducted from your deliverable fee. Clients pay exact milestone totals.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#006a42] text-[16px] shrink-0 mt-0.5">
                    lock
                  </span>
                  <span>
                    <strong>Guaranteed Milestone Escrow:</strong> Work starts only once client funds are locked into multi-signature vaults.
                  </span>
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                  className="rounded text-[#006a42] focus:ring-[#006a42]"
                  required
                />
                <span className="text-xs text-[#141e19]">
                  I agree to KINETIQ's Master Creator Standards and peer-vetted portfolio audit.
                </span>
              </label>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs font-mono text-[#6d7a70] hover:text-[#141e19]"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#006a42] hover:bg-[#008655] text-white text-xs font-label-md flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Submit Application</span>
                  <span className="material-symbols-outlined text-[16px]">task_alt</span>
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="text-center py-6 space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#e5f1e8] text-[#006a42] flex items-center justify-center mx-auto shadow-inner">
                <span className="material-symbols-outlined text-3xl">mark_email_read</span>
              </div>
              <span className="font-code-badge text-xs text-[#006a42] uppercase font-bold tracking-wider">
                APPLICATION RECEIVED // ID #KQ-8419
              </span>
              <h3 className="font-headline-lg text-xl text-[#141e19]">
                Welcome to the Admissions Queue, {formData.fullName || 'Artisan'}.
              </h3>
              <p className="text-xs text-[#3d4a41] max-w-md mx-auto leading-relaxed">
                Our senior review guild evaluates portfolios against our strict 3% bar. You will receive an encrypted invitation for a 15-minute peer huddle within 24 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-[#006a42] text-white text-xs font-label-md hover:bg-[#008655]"
                >
                  Return to Marketplace
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
