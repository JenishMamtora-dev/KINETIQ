import React, { useState } from 'react';

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (company: string) => void;
}

export const ConciergeModal: React.FC<ConciergeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([
    'Principal Design Architect',
    'Senior Full-Stack AI Engineer',
  ]);
  const [duration, setDuration] = useState('3-Month Dedicated Squad');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [scheduled, setScheduled] = useState(false);

  if (!isOpen) return null;

  const availableRoles = [
    { title: 'Principal Design Architect', rate: '$160/hr' },
    { title: 'Senior Full-Stack AI Engineer', rate: '$195/hr' },
    { title: 'Lead 3D Motion Director', rate: '$175/hr' },
    { title: 'Distributed Systems & Rust Lead', rate: '$210/hr' },
    { title: 'Quantitative Growth Architect', rate: '$165/hr' },
  ];

  const toggleRole = (title: string) => {
    if (selectedRoles.includes(title)) {
      if (selectedRoles.length > 1) {
        setSelectedRoles(selectedRoles.filter((r) => r !== title));
      }
    } else {
      setSelectedRoles([...selectedRoles, title]);
    }
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setScheduled(true);
    onSuccess(companyName || 'Enterprise');
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#bccabf]/40 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#28332d] text-[#e8f4eb]">
          <div>
            <span className="font-code-badge text-xs text-[#80fab9] uppercase font-bold">
              [ ENTERPRISE SQUAD CONCIERGE ]
            </span>
            <h3 className="font-headline-sm text-base text-[#f1fcf4]">
              Build a Dedicated Multi-Disciplinary Squad
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#f1fcf4] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {scheduled ? (
            <div className="text-center py-8 space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#e5f1e8] text-[#006a42] flex items-center justify-center mx-auto shadow-inner">
                <span className="material-symbols-outlined text-3xl">calendar_month</span>
              </div>
              <h3 className="font-headline-md text-xl text-[#141e19]">
                Concierge Brief Confirmed
              </h3>
              <p className="text-xs text-[#3d4a41] max-w-md mx-auto">
                Our Senior Enterprise Partner will review your squad requirements and connect with calendar options within 4 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBook} className="space-y-5">
              <div>
                <label className="block text-xs font-mono uppercase text-[#6d7a70] mb-2 font-bold">
                  Select Squad Specialists Needed ({selectedRoles.length} selected)
                </label>
                <div className="space-y-2">
                  {availableRoles.map((role) => {
                    const isChecked = selectedRoles.includes(role.title);
                    return (
                      <div
                        key={role.title}
                        onClick={() => toggleRole(role.title)}
                        className={`p-3 rounded-lg flex items-center justify-between border cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-[#f1fcf4] border-[#006a42] shadow-sm'
                            : 'bg-white hover:bg-[#ebf6ee] border-[#bccabf]/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-4 h-4 rounded border flex items-center justify-center ${
                              isChecked
                                ? 'bg-[#006a42] border-[#006a42] text-white'
                                : 'border-[#6d7a70]'
                            }`}
                          >
                            {isChecked && (
                              <span className="material-symbols-outlined text-xs">check</span>
                            )}
                          </span>
                          <span className="text-xs font-medium text-[#141e19]">
                            {role.title}
                          </span>
                        </div>
                        <span className="font-code-badge text-[11px] text-[#006a42] font-semibold">
                          {role.rate}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#141e19] mb-1">
                    Company / Lab Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme AI Technologies"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#bccabf] text-sm text-[#141e19] focus:outline-none focus:ring-1 focus:ring-[#006a42]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#141e19] mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="partner@acme.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#bccabf] text-sm text-[#141e19] focus:outline-none focus:ring-1 focus:ring-[#006a42]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#141e19] mb-1">
                  Engagement Horizon
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#bccabf] text-sm text-[#141e19] focus:outline-none focus:ring-1 focus:ring-[#006a42]"
                >
                  <option>1-Month Rapid MVP Sprint</option>
                  <option>3-Month Dedicated Squad</option>
                  <option>6-Month Long-term Engineering &amp; Brand Partnership</option>
                </select>
              </div>

              <div className="p-3 bg-[#f1fcf4] rounded-lg border border-[#bccabf]/30 flex items-center justify-between text-xs text-[#3d4a41]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#006a42] text-sm">verified_user</span>
                  <span>Unified Master Services Agreement (MSA) + Consolidated Escrow</span>
                </div>
                <span className="font-mono text-[#006a42] font-bold">1 CONTRACT</span>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-[#bccabf] rounded-lg text-xs font-mono text-[#3d4a41] hover:bg-[#ebf6ee]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-[#006a42] hover:bg-[#008655] text-white text-xs font-label-md flex items-center gap-1.5 shadow-sm"
                >
                  <span>Schedule Concierge Brief</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
