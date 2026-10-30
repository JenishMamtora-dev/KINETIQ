import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptchaWidget } from '../components/common/CaptchaWidget';
import { applySeo } from '../lib/seo';

interface OnboardingPageProps {
  onAddToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

export function OnboardingPage({ onAddToast }: OnboardingPageProps) {
  const navigate = useNavigate();
  const [role, setRole] = useState<'client' | 'specialist' | null>(null);
  const [step, setStep] = useState(1);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // Client form state
  const [companyName, setCompanyName] = useState('');
  const [projectDomain, setProjectDomain] = useState('Brand Identity & Systems');
  const [typicalBudget, setTypicalBudget] = useState('$5,000 - $15,000');
  const [clientBio, setClientBio] = useState('');

  // Specialist form state
  const [fullName, setFullName] = useState('');
  const [specialtyTitle, setSpecialtyTitle] = useState('');
  const [hourlyRate, setHourlyRate] = useState(160);
  const [portfolioLink, setPortfolioLink] = useState('');
  const [availabilityChoice, setAvailabilityChoice] = useState('Available Now');

  useEffect(() => {
    applySeo({
      title: 'Join KINETIQ | Role Onboarding',
      description: 'Select your role as an enterprise client or vetted digital artisan on KINETIQ.',
      canonicalPath: '/onboarding',
      noIndex: true, // auth/onboarding pages are noindex
    });
  }, []);

  const handleRoleSelect = (selectedRole: 'client' | 'specialist') => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) {
      onAddToast('error', 'Verification Required', 'Please complete the Turnstile human verification check.');
      return;
    }

    if (role === 'client') {
      onAddToast(
        'success',
        'Enterprise Profile Created',
        `Welcome ${companyName || 'partner'}. Your account is authenticated for multi-sig escrow.`
      );
      navigate('/client/briefs');
    } else {
      onAddToast(
        'success',
        'Artisan Application Queued',
        `Thank you ${fullName || 'Artisan'}. Application #KQ-${Math.floor(1000 + Math.random() * 9000)} submitted for peer review.`
      );
      navigate('/verify-email');
    }
  };

  return (
    <div className="w-full min-h-screen py-12 px-margin-mobile md:px-margin max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="text-[11px] font-code-badge text-[#006a42] uppercase tracking-widest bg-[#ebf6ee] px-3 py-1 rounded-full border border-[#bccabf]/50 inline-block mb-3">
          STEP {step} OF 3 // IDENTITY CALIBRATION
        </span>
        <h1 className="font-headline-lg text-3xl md:text-4xl font-bold tracking-tight text-[#141e19]">
          {step === 1
            ? 'Select Your Marketplace Role'
            : role === 'client'
            ? 'Configure Your Client Profile'
            : 'Artisan Portfolio Onboarding'}
        </h1>
        <p className="font-body-md text-[#3d4a41] mt-2">
          {step === 1
            ? 'Choose how you intend to interact with the KINETIQ verified network.'
            : 'Tailor your workspace preferences and escrow security standards.'}
        </p>
      </div>

      {/* Step 1: Role Selection */}
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Option A: Client */}
          <div
            onClick={() => handleRoleSelect('client')}
            className="group cursor-pointer bg-white p-8 rounded-2xl border-2 border-[#bccabf]/60 hover:border-[#006a42] transition-all hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#ebf6ee] text-[#006a42] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">business_center</span>
              </div>
              <h2 className="font-headline-sm text-xl font-bold text-[#141e19] mb-2">
                I am a Client
              </h2>
              <p className="text-xs text-[#3d4a41] leading-relaxed mb-6 font-body-sm">
                I need to commission elite digital deliverables, manage team milestones, and lock funds safely in multi-sig escrow vaults.
              </p>
              <ul className="text-xs text-[#535f59] space-y-2 mb-6 font-body-sm">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#006a42]">check</span>
                  Direct access to Top 1% audited artisans
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#006a42]">check</span>
                  Automated milestone release workflows
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#006a42]">check</span>
                  Guided project brief matcher
                </li>
              </ul>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-[#ebf6ee] group-hover:bg-[#006a42] text-[#006a42] group-hover:text-white font-semibold text-xs transition-colors">
              Continue as Client
            </button>
          </div>

          {/* Option B: Specialist */}
          <div
            onClick={() => handleRoleSelect('specialist')}
            className="group cursor-pointer bg-white p-8 rounded-2xl border-2 border-[#bccabf]/60 hover:border-[#006a42] transition-all hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#002111] text-[#62dd9e] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">verified_user</span>
              </div>
              <h2 className="font-headline-sm text-xl font-bold text-[#141e19] mb-2">
                I am a Specialist
              </h2>
              <p className="text-xs text-[#3d4a41] leading-relaxed mb-6 font-body-sm">
                I offer world-class craftsmanship in brand systems, AI engineering, or 3D direction and seek high-ticket, escrow-protected commissions.
              </p>
              <ul className="text-xs text-[#535f59] space-y-2 mb-6 font-body-sm">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#006a42]">check</span>
                  100% Guaranteed payment via vault escrow
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#006a42]">check</span>
                  Curated client briefs (no race-to-the-bottom)
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#006a42]">check</span>
                  Independent editorial verification badge
                </li>
              </ul>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-[#002111] text-[#f1fcf4] group-hover:bg-[#006a42] font-semibold text-xs transition-colors">
              Apply as Specialist
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Role Details Form */}
      {step === 2 && (
        <div className="bg-white p-8 rounded-2xl border border-[#bccabf] shadow-sm">
          <form onSubmit={handleComplete} className="space-y-5 text-xs font-body-sm">
            {role === 'client' ? (
              <>
                <div>
                  <label className="block font-semibold text-[#141e19] mb-1">
                    Company or Entity Name
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Meridian Protocol Labs"
                    className="w-full p-2.5 rounded-xl bg-[#f1fcf4]/50 border border-[#bccabf] focus:ring-2 focus:ring-[#006a42]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#141e19] mb-1">
                      Primary Project Domain
                    </label>
                    <select
                      value={projectDomain}
                      onChange={(e) => setProjectDomain(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#f1fcf4]/50 border border-[#bccabf]"
                    >
                      <option>Brand Identity & Systems</option>
                      <option>Full-Stack Microservices</option>
                      <option>AI Automation & ML</option>
                      <option>Cinema & 3D Motion</option>
                      <option>Editorial & Narrative</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-[#141e19] mb-1">
                      Typical Project Budget
                    </label>
                    <select
                      value={typicalBudget}
                      onChange={(e) => setTypicalBudget(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#f1fcf4]/50 border border-[#bccabf]"
                    >
                      <option>$2,000 - $5,000</option>
                      <option>$5,000 - $15,000</option>
                      <option>$15,000 - $50,000</option>
                      <option>$50,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#141e19] mb-1">
                    What are your primary goals on KINETIQ?
                  </label>
                  <textarea
                    rows={3}
                    value={clientBio}
                    onChange={(e) => setClientBio(e.target.value)}
                    placeholder="Briefly describe upcoming launches or milestone requirements..."
                    className="w-full p-2.5 rounded-xl bg-[#f1fcf4]/50 border border-[#bccabf] focus:ring-2 focus:ring-[#006a42]"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#141e19] mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Astrid Lindholm"
                      className="w-full p-2.5 rounded-xl bg-[#f1fcf4]/50 border border-[#bccabf]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#141e19] mb-1">
                      Discipline Title
                    </label>
                    <input
                      type="text"
                      required
                      value={specialtyTitle}
                      onChange={(e) => setSpecialtyTitle(e.target.value)}
                      placeholder="e.g. Principal Brand Architect"
                      className="w-full p-2.5 rounded-xl bg-[#f1fcf4]/50 border border-[#bccabf]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#141e19] mb-1">
                      Standard Hourly Rate ($ USD)
                    </label>
                    <input
                      type="number"
                      required
                      min={80}
                      max={400}
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl bg-[#f1fcf4]/50 border border-[#bccabf]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#141e19] mb-1">
                      Current Availability
                    </label>
                    <select
                      value={availabilityChoice}
                      onChange={(e) => setAvailabilityChoice(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#f1fcf4]/50 border border-[#bccabf]"
                    >
                      <option value="Available Now">Available Now</option>
                      <option value="Available Next Week">Available Next Week</option>
                      <option value="Booked">Booked</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#141e19] mb-1">
                    Portfolio / Case Studies URL
                  </label>
                  <input
                    type="url"
                    required
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    placeholder="https://yourstudio.design or ReadCV / Figma showcase"
                    className="w-full p-2.5 rounded-xl bg-[#f1fcf4]/50 border border-[#bccabf]"
                  />
                </div>
              </>
            )}

            {/* Turnstile Human Verification */}
            <div className="pt-2">
              <label className="block font-semibold text-[#141e19] mb-1">
                Security & Anti-Abuse Verification
              </label>
              <CaptchaWidget onVerify={setCaptchaVerified} />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#bccabf]/30">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 border border-[#bccabf] rounded-xl text-[#3d4a41] hover:bg-[#ebf6ee] transition-colors"
              >
                Back to Role Selection
              </button>
              <button
                type="submit"
                disabled={!captchaVerified}
                className="px-6 py-2.5 bg-[#006a42] disabled:opacity-40 hover:bg-[#008655] text-white font-semibold rounded-xl transition-colors shadow-sm"
              >
                Complete Onboarding
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
