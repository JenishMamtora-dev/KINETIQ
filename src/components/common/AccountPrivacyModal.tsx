import React, { useState } from 'react';

interface AccountPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountPrivacyModal({ isOpen, onClose }: AccountPrivacyModalProps) {
  const [deleteStage, setDeleteStage] = useState<'initial' | 'confirming' | 'scheduled'>('initial');
  const [confirmationText, setConfirmationText] = useState('');

  if (!isOpen) return null;

  const handleExportData = () => {
    const userData = {
      user: {
        id: 'usr_kq_8912',
        email: 'client@kinetiq.design',
        registeredAt: '2026-03-15T12:00:00Z',
        role: 'Enterprise Client',
        company: 'Meridian Capital Protocol',
      },
      escrowOrders: [
        {
          id: 'KQ-ESC-2026-901',
          amount: 1250,
          service: 'Enterprise Design System & Web App UX Audit',
          status: 'Funded in Multi-Sig',
        },
      ],
      privacySettings: {
        gdprConsented: true,
        analyticsEnabled: false,
        retentionPolicy: 'Standard 7-year cryptographic accounting ledger record',
      },
      exportTimestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kinetiq_account_export_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleScheduleDeletion = () => {
    if (confirmationText.trim().toUpperCase() === 'DELETE') {
      setDeleteStage('scheduled');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-[#f1fcf4] text-[#141e19] w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-[#bccabf]">
        <div className="flex items-center justify-between pb-3 border-b border-[#bccabf]/40 mb-4">
          <div className="flex items-center gap-2 text-[#006a42]">
            <span className="material-symbols-outlined text-2xl">shield_lock</span>
            <h3 id="privacy-modal-title" className="font-headline-sm text-base font-semibold">
              Privacy, Data Portability & Account Deletion
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

        {deleteStage === 'scheduled' ? (
          <div className="py-6 text-center space-y-3">
            <span className="material-symbols-outlined text-4xl text-[#ba1a1a]">
              schedule
            </span>
            <h4 className="font-headline-sm font-semibold text-[#141e19]">
              Account Deletion Scheduled
            </h4>
            <p className="text-xs text-[#535f59] leading-relaxed max-w-sm mx-auto">
              Your account has entered the 30-day retention grace period. All personal identification, communication threads, and drafts will be purged. Financial escrow records will be cryptographically anonymized per legal compliance.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-[#006a42] text-white rounded-lg text-xs font-semibold"
            >
              Close
            </button>
          </div>
        ) : deleteStage === 'confirming' ? (
          <div className="space-y-4 text-xs font-body-sm">
            <div className="p-3 bg-[#ffdad6] text-[#ba1a1a] rounded-xl border border-[#ba1a1a]/30">
              <p className="font-bold mb-1">Irreversible Action Warning</p>
              <p className="leading-relaxed">
                Deleting your account will forfeit access to any open escrow disputes, verified artisan reviews, and saved briefs. A 30-day grace period applies before full erasure.
              </p>
            </div>

            <div>
              <label htmlFor="confirm-delete" className="block font-semibold mb-1">
                Type <span className="font-mono text-[#ba1a1a]">DELETE</span> to confirm:
              </label>
              <input
                id="confirm-delete"
                type="text"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder="DELETE"
                className="w-full p-2.5 rounded-lg bg-white border border-[#bccabf] focus:outline-none focus:ring-2 focus:ring-[#ba1a1a]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#bccabf]/40">
              <button
                type="button"
                onClick={() => setDeleteStage('initial')}
                className="px-4 py-2 border border-[#bccabf] rounded-lg text-[#3d4a41] hover:bg-white"
              >
                Back
              </button>
              <button
                type="button"
                disabled={confirmationText.trim().toUpperCase() !== 'DELETE'}
                onClick={handleScheduleDeletion}
                className="px-4 py-2 bg-[#ba1a1a] disabled:opacity-40 text-white rounded-lg font-semibold hover:bg-[#93000a]"
              >
                Permanently Schedule Deletion
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5 text-xs font-body-sm">
            {/* Section 1: Data Portability */}
            <div className="p-4 rounded-xl bg-white border border-[#bccabf] flex items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-sm text-[#141e19]">Export Account Data (JSON)</h4>
                <p className="text-[#535f59] mt-0.5">
                  Download a machine-readable package of your profile, order history, escrow records, and preferences.
                </p>
              </div>
              <button
                type="button"
                onClick={handleExportData}
                className="px-3.5 py-2 bg-[#f1fcf4] border border-[#006a42] text-[#006a42] hover:bg-[#006a42] hover:text-white rounded-lg font-semibold transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span className="material-symbols-outlined text-base">download</span>
                <span>Export Data</span>
              </button>
            </div>

            {/* Section 2: Retention Policy Notice */}
            <div className="p-4 rounded-xl bg-[#ebf6ee] border border-[#62dd9e]/40">
              <h4 className="font-semibold text-[#141e19] mb-1">Retention & Compliance Protocol</h4>
              <p className="text-[#3d4a41] leading-relaxed">
                KINETIQ abides by GDPR and CCPA standards. When an account is terminated:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#535f59]">
                <li>Personal tokens, credentials, and attachments are purged in 30 days.</li>
                <li>Transactional escrow logs are salted and hashed for taxation auditability.</li>
                <li>Artisan reviews are preserved anonymously to protect community integrity.</li>
              </ul>
            </div>

            {/* Section 3: Deletion */}
            <div className="pt-2 flex justify-between items-center border-t border-[#bccabf]/40">
              <span className="text-[#ba1a1a] font-semibold">Danger Zone</span>
              <button
                type="button"
                onClick={() => setDeleteStage('confirming')}
                className="px-3.5 py-1.5 border border-[#ba1a1a] text-[#ba1a1a] hover:bg-[#ffdad6] rounded-lg font-semibold transition-colors"
              >
                Request Account Deletion
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
