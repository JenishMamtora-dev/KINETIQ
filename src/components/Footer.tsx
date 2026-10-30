import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onOpenArtisanModal: () => void;
  onOpenConciergeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenArtisanModal,
  onOpenConciergeModal,
}) => {
  return (
    <footer className="w-full bg-white border-t border-[#bccabf]/30">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin pt-space-xl pb-space-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-space-lg pb-space-xl border-b border-[#bccabf]/20">
          {/* Col 1: Explore */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#6d7a70] font-bold">
              Explore
            </span>
            <ul className="flex flex-col gap-space-xs text-xs font-body-sm">
              <li>
                <Link to="/explore" className="text-[#3d4a41] hover:text-[#141e19] transition-colors">
                  All Deliverables
                </Link>
              </li>
              <li>
                <Link to="/freelancers" className="text-[#3d4a41] hover:text-[#141e19] transition-colors">
                  Digital Artisans
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-[#3d4a41] hover:text-[#141e19] transition-colors">
                  Discipline Taxonomy
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-[#3d4a41] hover:text-[#141e19] transition-colors">
                  Compare Benchmarks
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: For Clients */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#6d7a70] font-bold">
              For Clients
            </span>
            <ul className="flex flex-col gap-space-xs text-xs font-body-sm">
              <li>
                <Link to="/client/briefs/new" className="text-[#3d4a41] hover:text-[#141e19] transition-colors">
                  Scope Project Brief
                </Link>
              </li>
              <li>
                <Link to="/client/briefs" className="text-[#3d4a41] hover:text-[#141e19] transition-colors">
                  Client Workspace
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-[#3d4a41] hover:text-[#141e19] transition-colors">
                  Escrow Guarantee
                </Link>
              </li>
              <li>
                <button onClick={onOpenConciergeModal} className="text-left text-[#3d4a41] hover:text-[#141e19] transition-colors">
                  Enterprise Squads
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: For Freelancers */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#6d7a70] font-bold">
              For Freelancers
            </span>
            <ul className="flex flex-col gap-space-xs text-xs font-body-sm">
              <li>
                <Link to="/become-a-freelancer" className="text-[#006a42] font-semibold hover:underline">
                  Artisan Admission
                </Link>
              </li>
              <li>
                <Link to="/onboarding" className="text-[#3d4a41] hover:text-[#141e19] transition-colors">
                  Specialist Onboarding
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-[#3d4a41] hover:text-[#141e19] transition-colors">
                  Guaranteed Escrows
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Operations */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#6d7a70] font-bold">
              Administration
            </span>
            <ul className="flex flex-col gap-space-xs text-xs font-body-sm">
              <li>
                <Link to="/admin/payments" className="text-[#3d4a41] hover:text-[#141e19] transition-colors">
                  Treasury &amp; Fees
                </Link>
              </li>
              <li>
                <Link to="/admin/reviews" className="text-[#3d4a41] hover:text-[#141e19] transition-colors">
                  Review Moderation
                </Link>
              </li>
              <li>
                <Link to="/admin/audit-logs" className="text-[#3d4a41] hover:text-[#141e19] transition-colors">
                  System Audit Logs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Security */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#6d7a70] font-bold">
              Security
            </span>
            <ul className="flex flex-col gap-space-xs text-xs font-body-sm">
              <li>
                <Link to="/legal/refunds" className="text-[#3d4a41] hover:text-[#141e19] transition-colors">
                  Dispute &amp; Refunds
                </Link>
              </li>
              <li>
                <Link to="/403" className="text-[#3d4a41] hover:text-[#141e19] transition-colors">
                  Clearance Gates
                </Link>
              </li>
              <li>
                <button onClick={onOpenConciergeModal} className="text-left text-[#3d4a41] hover:text-[#141e19] transition-colors">
                  Compliance Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 6: Legal */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#6d7a70] font-bold">
              Legal &amp; Privacy
            </span>
            <ul className="flex flex-col gap-space-xs text-xs font-body-sm">
              <li>
                <Link to="/legal/terms" className="text-[#3d4a41] hover:text-[#141e19] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/legal/privacy" className="text-[#3d4a41] hover:text-[#141e19] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/legal/cookies" className="text-[#3d4a41] hover:text-[#141e19] transition-colors">
                  Cookie Settings
                </Link>
              </li>
              <li>
                <Link to="/legal/refunds" className="text-[#3d4a41] hover:text-[#141e19] transition-colors">
                  Refund Rules
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm flex-wrap">
            <div className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-[#f1fcf4] border border-[#bccabf]/30">
              <span className="w-2 h-2 rounded-full bg-[#006c45]"></span>
              <span className="font-code-badge text-code-badge text-[#141e19]">
                SYSTEM OPERATIONAL • 99.98%
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-[#3d4a41]">
              © 2025 KINETIQ Marketplaces Inc. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-space-md">
            <span className="font-code-badge text-code-badge text-[#6d7a70]">
              UTC+00 LONDON / GLOBAL DIRECTORY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
