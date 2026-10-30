import React, { useState, useEffect } from 'react';
import { INITIAL_REVIEWS } from '../data/marketplaceData';
import { ReviewItem } from '../types';
import { applySeo } from '../lib/seo';

interface AdminReviewsPageProps {
  onAddToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

export function AdminReviewsPage({ onAddToast }: AdminReviewsPageProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'published' | 'flagged' | 'hidden'>('all');

  useEffect(() => {
    applySeo({
      title: 'Review Moderation & Trust Standards | KINETIQ Admin',
      description: 'Audit community reviews, handle flagged feedback, and verify artisan delivery integrity.',
      canonicalPath: '/admin/reviews',
      noIndex: true,
    });

    try {
      const stored = localStorage.getItem('kinetiq_reviews');
      if (stored) {
        setReviews(JSON.parse(stored));
      } else {
        setReviews(INITIAL_REVIEWS);
      }
    } catch {
      setReviews(INITIAL_REVIEWS);
    }
  }, []);

  const saveReviews = (updated: ReviewItem[]) => {
    setReviews(updated);
    try {
      localStorage.setItem('kinetiq_reviews', JSON.stringify(updated));
    } catch {}
  };

  const handleUpdateStatus = (id: string, newStatus: 'published' | 'flagged' | 'hidden') => {
    const updated = reviews.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
    saveReviews(updated);
    onAddToast('success', 'Review Moderated', `Review #${id} status changed to "${newStatus}".`);
  };

  const filteredReviews = reviews.filter((r) => filter === 'all' || r.status === filter);

  return (
    <div className="w-full min-h-screen py-10 px-margin-mobile md:px-margin max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <span className="text-[11px] font-code-badge text-[#006a42] uppercase tracking-widest bg-[#ebf6ee] px-3 py-1 rounded-full border border-[#bccabf]/50 inline-block mb-2">
          TRUST & SAFETY // REVIEW MODERATION DESK
        </span>
        <h1 className="font-headline-lg text-3xl font-bold text-[#141e19]">
          Artisan Deliverable Reviews
        </h1>
        <p className="font-body-md text-xs text-[#535f59] mt-1">
          Review community submissions, triage customer disputes, and manage published ratings.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 text-xs">
        {(['all', 'published', 'flagged', 'hidden'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl font-semibold capitalize transition-colors ${
              filter === tab
                ? 'bg-[#006a42] text-white shadow-sm'
                : 'bg-white border border-[#bccabf] text-[#3d4a41] hover:bg-[#ebf6ee]'
            }`}
          >
            {tab} ({tab === 'all' ? reviews.length : reviews.filter((r) => r.status === tab).length})
          </button>
        ))}
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-2xl border border-[#bccabf] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-body-sm">
            <thead className="bg-[#ebf6ee] border-b border-[#bccabf]/60 text-[#3d4a41] uppercase tracking-wider font-code-badge text-[11px]">
              <tr>
                <th className="p-4">Author & Role</th>
                <th className="p-4">Deliverable</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Review Content</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#bccabf]/30">
              {filteredReviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-[#f1fcf4]/50 transition-colors">
                  <td className="p-4 font-semibold text-[#141e19]">
                    {rev.authorName}
                    <span className="block text-[10px] text-[#6d7a70] font-normal">{rev.authorRole}</span>
                  </td>
                  <td className="p-4 max-w-xs truncate text-[#3d4a41]">
                    {rev.serviceTitle}
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 font-bold text-[#006a42] bg-[#f1fcf4] px-2 py-0.5 rounded border border-[#62dd9e]/40">
                      ★ {rev.rating}.0
                    </span>
                  </td>
                  <td className="p-4 max-w-md">
                    <p className="text-[#141e19] line-clamp-2">{rev.content}</p>
                    {rev.flagReason && (
                      <p className="text-[10px] text-[#ba1a1a] mt-1 font-mono">
                        Flag alert: {rev.flagReason}
                      </p>
                    )}
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-[10px] font-code-badge px-2 py-0.5 rounded-full font-bold uppercase ${
                        rev.status === 'published'
                          ? 'bg-[#ebf6ee] text-[#006a42] border border-[#62dd9e]'
                          : rev.status === 'flagged'
                          ? 'bg-[#ffdad6] text-[#ba1a1a] border border-[#ba1a1a]'
                          : 'bg-[#dae5dd] text-[#6d7a70]'
                      }`}
                    >
                      {rev.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {rev.status !== 'published' && (
                        <button
                          onClick={() => handleUpdateStatus(rev.id, 'published')}
                          className="px-2.5 py-1 bg-[#006a42] hover:bg-[#008655] text-white rounded font-semibold text-[11px]"
                          title="Approve and Publish Review"
                        >
                          Approve
                        </button>
                      )}
                      {rev.status !== 'flagged' && (
                        <button
                          onClick={() => handleUpdateStatus(rev.id, 'flagged')}
                          className="px-2.5 py-1 border border-[#ba1a1a] text-[#ba1a1a] hover:bg-[#ffdad6] rounded font-semibold text-[11px]"
                          title="Flag for Investigation"
                        >
                          Flag
                        </button>
                      )}
                      {rev.status !== 'hidden' && (
                        <button
                          onClick={() => handleUpdateStatus(rev.id, 'hidden')}
                          className="px-2.5 py-1 border border-[#bccabf] text-[#6d7a70] hover:bg-[#dae5dd] rounded font-semibold text-[11px]"
                          title="Hide Review"
                        >
                          Hide
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
