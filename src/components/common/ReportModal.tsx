import React, { useState } from 'react';
import { ReportItem } from '../../types';

interface ReportModalProps {
  isOpen: boolean;
  targetType: 'service' | 'specialist' | 'review' | 'message';
  targetId: string;
  targetName: string;
  onClose: () => void;
  onSubmitReport: (report: ReportItem) => void;
  onBlockUser?: (targetId: string, name: string) => void;
}

export function ReportModal({
  isOpen,
  targetType,
  targetId,
  targetName,
  onClose,
  onSubmitReport,
  onBlockUser,
}: ReportModalProps) {
  const [reason, setReason] = useState('Intellectual property infringement');
  const [details, setDetails] = useState('');
  const [blockAlso, setBlockAlso] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: ReportItem = {
      id: 'rep-' + Date.now(),
      targetType,
      targetId,
      targetName,
      reportedBy: 'current_user@kinetiq.design',
      reason: `${reason}: ${details.trim() || 'No additional details provided.'}`,
      timestamp: new Date().toISOString(),
      status: 'open',
    };
    onSubmitReport(newReport);
    if (blockAlso && onBlockUser) {
      onBlockUser(targetId, targetName);
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-[#f1fcf4] text-[#141e19] w-full max-w-md rounded-2xl p-6 shadow-2xl border border-[#bccabf]">
        <div className="flex items-center justify-between pb-3 border-b border-[#bccabf]/40 mb-4">
          <div className="flex items-center gap-2 text-[#ba1a1a]">
            <span className="material-symbols-outlined text-xl">flag</span>
            <h3 id="report-modal-title" className="font-headline-sm text-base font-semibold">
              Report {targetType.charAt(0).toUpperCase() + targetType.slice(1)}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#6d7a70] hover:text-[#141e19] p-1 rounded-full transition-colors"
            aria-label="Close dialog"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <span className="material-symbols-outlined text-4xl text-[#006a42]">
              check_circle
            </span>
            <p className="font-semibold text-sm">Report Logged into Moderation Queue</p>
            <p className="text-xs text-[#535f59]">
              Our compliance team will inspect {targetName} under community guidelines.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-body-sm">
            <div>
              <p className="font-semibold text-[#141e19] mb-1">Target Entity:</p>
              <p className="p-2.5 rounded-lg bg-[#ebf6ee] text-[#3d4a41] font-code-badge border border-[#bccabf]/40">
                {targetName} <span className="text-[#6d7a70]">({targetType} #{targetId})</span>
              </p>
            </div>

            <div>
              <label htmlFor="report-reason" className="block font-semibold text-[#141e19] mb-1">
                Violation Category:
              </label>
              <select
                id="report-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-white border border-[#bccabf] text-[#141e19] focus:outline-none focus:ring-2 focus:ring-[#006a42]"
              >
                <option value="Intellectual property infringement">Intellectual Property / Copyright Infringement</option>
                <option value="Misrepresentation of deliverables">Misrepresentation of Deliverables / Scope</option>
                <option value="Harassment or abusive messaging">Harassment or Abusive Messaging</option>
                <option value="Off-platform payment solicitation">Off-Platform Payment Solicitation (Escrow Evasion)</option>
                <option value="Spam or deceptive reviews">Spam or Deceptive / Fraudulent Review</option>
              </select>
            </div>

            <div>
              <label htmlFor="report-details" className="block font-semibold text-[#141e19] mb-1">
                Specific Evidence or Timestamps (Optional):
              </label>
              <textarea
                id="report-details"
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Include link to conflicting work, timestamp of message, or milestone discrepancies..."
                className="w-full p-2.5 rounded-lg bg-white border border-[#bccabf] text-[#141e19] focus:outline-none focus:ring-2 focus:ring-[#006a42]"
              />
            </div>

            {targetType === 'specialist' && (
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={blockAlso}
                  onChange={(e) => setBlockAlso(e.target.checked)}
                  className="accent-[#006a42]"
                />
                <span className="text-[#3d4a41]">
                  Also block this artisan (prevents them from messaging you or bidding on your briefs)
                </span>
              </label>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#bccabf]/40">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-[#bccabf] rounded-lg text-[#3d4a41] hover:bg-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#ba1a1a] text-white hover:bg-[#93000a] font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Submit to Trust & Safety</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
