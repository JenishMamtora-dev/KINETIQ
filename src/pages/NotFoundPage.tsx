import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '../lib/seo';

export function NotFoundPage() {
  useEffect(() => {
    applySeo({
      title: '404 Page Not Found | KINETIQ',
      description: 'The requested deliverable or marketplace node does not exist.',
      canonicalPath: '/404',
      noIndex: true,
    });
  }, []);

  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center py-16 px-margin-mobile">
      <div className="bg-white p-10 rounded-3xl border border-[#bccabf] shadow-lg max-w-lg w-full text-center">
        <span className="text-[11px] font-code-badge text-[#006a42] uppercase tracking-widest bg-[#ebf6ee] px-3 py-1 rounded-full border border-[#bccabf]/50 inline-block mb-3">
          ERROR 404 // UNRESOLVED NODE
        </span>
        <h1 className="font-headline-lg text-4xl font-bold text-[#141e19] mb-3">
          Artifact Not Found
        </h1>
        <p className="font-body-md text-xs text-[#535f59] mb-8 leading-relaxed">
          The requested page or milestone contract route does not exist in our registry. It may have been archived or relocated.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-[#006a42] hover:bg-[#008655] text-white text-xs font-semibold transition-colors"
          >
            Return to Marketplace
          </Link>
          <Link
            to="/explore"
            className="px-5 py-2.5 rounded-xl border border-[#bccabf] hover:bg-[#f1fcf4] text-[#141e19] text-xs font-semibold transition-colors"
          >
            Browse Deliverables
          </Link>
        </div>
      </div>
    </div>
  );
}
