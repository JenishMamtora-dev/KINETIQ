import React from 'react';

interface LightboxModalProps {
  isOpen: boolean;
  imageUrl: string | null;
  title: string | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  imageUrl,
  title,
  onClose,
}) => {
  if (!isOpen || !imageUrl) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl max-h-[90vh] flex flex-col items-center"
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Close image preview"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <img
          src={imageUrl}
          alt={title || 'Portfolio Preview'}
          className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-white/10"
          referrerPolicy="no-referrer"
        />

        {title && (
          <div className="mt-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white font-mono text-xs border border-white/10 text-center">
            {title}
          </div>
        )}
      </div>
    </div>
  );
};
