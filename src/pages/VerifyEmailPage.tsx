import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { applySeo } from '../lib/seo';

interface VerifyEmailPageProps {
  onAddToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

export function VerifyEmailPage({ onAddToast }: VerifyEmailPageProps) {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    applySeo({
      title: 'Verify Your Email | KINETIQ Escrow',
      description: 'Confirm your credentials to activate multi-sig marketplace capabilities.',
      canonicalPath: '/verify-email',
      noIndex: true,
    });
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    // Auto-advance focus to next field
    if (value && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`digit-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length < 6) {
      onAddToast('error', 'Incomplete Code', 'Please enter all 6 digits sent to your email.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      onAddToast('success', 'Email Verified', 'Your credentials have been cryptographically stamped.');
      setTimeout(() => {
        navigate('/client/briefs');
      }, 1500);
    }, 1000);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(45);
    onAddToast('info', 'Verification Code Resent', 'A fresh 6-digit cryptographic token was dispatched.');
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center py-12 px-margin-mobile">
      <div className="bg-white p-8 rounded-2xl border border-[#bccabf] shadow-lg max-w-md w-full text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#ebf6ee] text-[#006a42] flex items-center justify-center mx-auto mb-5 border border-[#62dd9e]/40">
          <span className="material-symbols-outlined text-3xl">mark_email_read</span>
        </div>

        <h1 className="font-headline-md text-2xl font-bold text-[#141e19] mb-2">
          Verify Your Work Email
        </h1>
        <p className="text-xs text-[#535f59] mb-6 leading-relaxed font-body-sm">
          We sent a 6-digit confirmation token to <strong className="text-[#141e19]">client@kinetiq.design</strong>. Enter the digits below to activate your multi-sig vault access.
        </p>

        {isSuccess ? (
          <div className="py-6 space-y-2">
            <span className="material-symbols-outlined text-4xl text-[#006a42]">
              check_circle
            </span>
            <p className="font-semibold text-sm text-[#141e19]">Authentication Confirmed</p>
            <p className="text-xs text-[#535f59]">Redirecting to your project briefs dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`digit-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-11 h-12 text-center text-lg font-bold font-code-badge rounded-xl bg-[#f1fcf4] border border-[#bccabf] focus:outline-none focus:ring-2 focus:ring-[#006a42] text-[#141e19]"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-2.5 bg-[#006a42] hover:bg-[#008655] disabled:opacity-50 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Token...</span>
                </>
              ) : (
                <span>Confirm Verification</span>
              )}
            </button>

            <div className="text-xs text-[#535f59]">
              {timer > 0 ? (
                <span>Resend token in <strong className="text-[#006a42]">{timer}s</strong></span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-[#006a42] hover:underline font-semibold"
                >
                  Resend Verification Code
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
