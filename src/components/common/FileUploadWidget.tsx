import React, { useState, useRef } from 'react';

interface FileUploadWidgetProps {
  label?: string;
  isPrivateDeliverable?: boolean;
  onFileProcessed?: (fileInfo: {
    name: string;
    sizeKb: number;
    webpPreviewUrl: string;
    signedUrl: string;
    expiresInMins: number;
  }) => void;
  className?: string;
}

export function FileUploadWidget({
  label = 'Upload Milestone Artifact or Deliverable',
  isPrivateDeliverable = true,
  onFileProcessed,
  className = '',
}: FileUploadWidgetProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processedFile, setProcessedFile] = useState<{
    name: string;
    sizeKb: number;
    webpPreviewUrl: string;
    signedUrl: string;
    expiresInMins: number;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // 1. MIME Validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'application/pdf', 'application/zip'];
    if (!allowedTypes.includes(file.type)) {
      setError(`Invalid MIME format (${file.type}). Allowed: JPEG, PNG, WebP, SVG, PDF, ZIP.`);
      return;
    }

    // 2. Size Validation (Max 15MB)
    const maxBytes = 15 * 1024 * 1024;
    if (file.size > maxBytes) {
      setError(`File size exceeds 15MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).`);
      return;
    }

    setIsProcessing(true);

    // 3. Client-side WebP conversion & thumbnail generation for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          // Scale to max 1600px width/height while preserving aspect ratio
          const maxDim = 1600;
          let width = img.width;
          let height = img.height;
          if (width > height && width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Convert to WebP format
          const webpDataUrl = canvas.toDataURL('image/webp', 0.88);
          const mockSignedUrl = `https://vault.kinetiq.design/deliverables/${Date.now()}-${file.name.replace(/\s+/g, '_')}?token=kq_sig_${Math.random().toString(36).substring(2, 10)}`;

          const info = {
            name: file.name,
            sizeKb: Math.round(webpDataUrl.length / 1024),
            webpPreviewUrl: webpDataUrl,
            signedUrl: mockSignedUrl,
            expiresInMins: 60,
          };

          setIsProcessing(false);
          setProcessedFile(info);
          onFileProcessed?.(info);
        };
        img.src = readerEvent.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      // Non-image deliverable (PDF, ZIP)
      setTimeout(() => {
        const mockSignedUrl = `https://vault.kinetiq.design/vault-artifacts/${Date.now()}-${file.name.replace(/\s+/g, '_')}?token=kq_sig_${Math.random().toString(36).substring(2, 10)}`;
        const info = {
          name: file.name,
          sizeKb: Math.round(file.size / 1024),
          webpPreviewUrl: '',
          signedUrl: mockSignedUrl,
          expiresInMins: 60,
        };
        setIsProcessing(false);
        setProcessedFile(info);
        onFileProcessed?.(info);
      }, 700);
    }
  };

  return (
    <div className={`p-4 rounded-xl border border-[#bccabf] bg-white text-xs ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <label className="font-semibold text-[#141e19]">{label}</label>
        {isPrivateDeliverable && (
          <span className="inline-flex items-center gap-1 text-[10px] font-code-badge text-[#006a42] bg-[#f1fcf4] px-2 py-0.5 rounded-full border border-[#62dd9e]/40">
            <span className="material-symbols-outlined text-[12px]">lock</span>
            Private Multi-Sig Bucket
          </span>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept=".jpg,.jpeg,.png,.webp,.svg,.pdf,.zip"
        className="hidden"
      />

      {!processedFile && !isProcessing && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-2 border-dashed border-[#bccabf] hover:border-[#006a42] rounded-xl p-5 text-center transition-colors bg-[#f1fcf4]/40 hover:bg-[#f1fcf4] cursor-pointer"
        >
          <span className="material-symbols-outlined text-3xl text-[#006a42] mb-1">
            cloud_upload
          </span>
          <p className="font-semibold text-[#141e19]">Click to attach or drag & drop</p>
          <p className="text-[11px] text-[#6d7a70] mt-0.5">
            Auto WebP conversion • Max 15MB (Images, PDF, ZIP)
          </p>
        </button>
      )}

      {isProcessing && (
        <div className="py-6 text-center space-y-2">
          <div className="w-6 h-6 border-2 border-[#006a42] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-semibold text-[#141e19]">Optimizing artifact & generating signed URL...</p>
        </div>
      )}

      {error && (
        <div className="mt-2 p-2 bg-[#ffdad6] text-[#ba1a1a] rounded-lg font-semibold flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm">warning</span>
          <span>{error}</span>
        </div>
      )}

      {processedFile && (
        <div className="mt-2 p-3 bg-[#ebf6ee] rounded-xl border border-[#62dd9e]/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            {processedFile.webpPreviewUrl ? (
              <img
                src={processedFile.webpPreviewUrl}
                alt="Upload preview"
                className="w-12 h-12 rounded-lg object-cover border border-[#bccabf] shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-[#dae5dd] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#006a42]">description</span>
              </div>
            )}
            <div className="overflow-hidden">
              <p className="font-semibold text-[#141e19] truncate">{processedFile.name}</p>
              <p className="text-[10px] text-[#6d7a70] font-code-badge">
                WebP Optimized: {processedFile.sizeKb} KB • Signed URL Active (Exp: {processedFile.expiresInMins}m)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setProcessedFile(null);
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
            className="text-[#ba1a1a] hover:text-[#93000a] text-xs font-semibold shrink-0"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
