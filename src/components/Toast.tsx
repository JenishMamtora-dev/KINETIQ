import React, { useEffect } from 'react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      onDismiss(toasts[0].id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toasts, onDismiss]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#141e19] text-[#f1fcf4] p-4 rounded-xl shadow-2xl border border-[#80fab9]/30 flex items-start gap-3 animate-fade-in transition-all"
        >
          <span
            className="material-symbols-outlined text-[#80fab9] text-xl shrink-0 mt-0.5"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {toast.type === 'error' ? 'error' : toast.type === 'info' ? 'info' : 'check_circle'}
          </span>
          <div className="flex-1">
            <h5 className="font-label-md text-xs text-white">{toast.title}</h5>
            {toast.message && (
              <p className="text-[11px] text-[#bccabf] mt-0.5">{toast.message}</p>
            )}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-[#6d7a70] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};
