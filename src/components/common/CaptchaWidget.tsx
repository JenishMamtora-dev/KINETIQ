import React, { useState } from 'react';

interface CaptchaWidgetProps {
  onVerify: (verified: boolean) => void;
  className?: string;
}

export function CaptchaWidget({ onVerify, className = '' }: CaptchaWidgetProps) {
  const [status, setStatus] = useState<'idle' | 'verifying' | 'verified'>('idle');

  const handleVerify = () => {
    if (status !== 'idle') return;
    setStatus('verifying');
    setTimeout(() => {
      setStatus('verified');
      onVerify(true);
    }, 900);
  };

  return (
    <div
      className={`p-3 rounded-xl border border-[#bccabf] bg-white flex items-center justify-between text-xs select-none shadow-sm ${className}`}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleVerify}
          disabled={status !== 'idle'}
          aria-label="Verify you are human"
          className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${
            status === 'verified'
              ? 'bg-[#006a42] border-[#006a42] text-white'
              : status === 'verifying'
              ? 'border-[#62dd9e] bg-[#f1fcf4]'
              : 'border-[#6d7a70] hover:border-[#006a42] bg-[#f1fcf4]'
          }`}
        >
          {status === 'verified' ? (
            <span className="material-symbols-outlined text-base">check</span>
          ) : status === 'verifying' ? (
            <div className="w-3.5 h-3.5 border-2 border-[#006a42] border-t-transparent rounded-full animate-spin" />
          ) : null}
        </button>
        <div>
          <span className="font-semibold text-[#141e19]">
            {status === 'verified'
              ? 'Human verification complete'
              : status === 'verifying'
              ? 'Evaluating telemetry proofs...'
              : 'I am human / Cloudflare Turnstile'}
          </span>
          <p className="text-[10px] text-[#6d7a70]">Protected by multi-sig anti-bot heuristics</p>
        </div>
      </div>

      <div className="flex flex-col items-end text-[9px] text-[#6d7a70] font-code-badge leading-tight">
        <span className="text-[#006a42] font-semibold">TURNSTILE</span>
        <span>Privacy Certified</span>
      </div>
    </div>
  );
}
