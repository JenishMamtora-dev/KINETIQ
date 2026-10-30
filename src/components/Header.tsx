import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  onOpenArtisanModal: () => void;
  onOpenConciergeModal: () => void;
  favoritesCount: number;
  onExploreClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenArtisanModal,
  onOpenConciergeModal,
  favoritesCount,
  onExploreClick,
}) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSignedUser, setIsSignedUser] = useState(true);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f1fcf4]/90 backdrop-blur-md border-b border-[#bccabf]/30 transition-all">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin h-20 flex items-center justify-between gap-space-md">
        {/* Brand Lockup */}
        <Link 
          to="/"
          onClick={onExploreClick}
          className="flex items-center gap-space-sm shrink-0 cursor-pointer group"
        >
          <img
            alt="Marketplace Kinetic Monogram"
            className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxsVziqkflvRE1jU40YMGm43DNoM48KUv3yI_ZDNnTKQ0pGl1DYcsIOapdvHs3YV21FojYZjomhWXMsZO-4_JbkuMjBMVffcce9uhqseF1MEd_BtBvkND-99GF3VFRygBQu3U3cZWiRr9kBzxACCylhmfUSxckqOZSrYuuVeeLeGuPShkhPxUE7vHP_fdPOHaxBjkHHecG3ieRtKaLooq46A2QmZnKRwuB54eioAKB2BjAsSc9NR1EUw"
          />
          <span className="font-headline-sm text-headline-sm tracking-tight text-[#141e19] uppercase font-bold">
            KINETIQ
          </span>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
          <Link
            to="/explore"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              location.pathname === '/explore'
                ? 'bg-[#e5f1e8] text-[#141e19] font-semibold'
                : 'text-[#3d4a41] hover:text-[#141e19] hover:bg-[#ebf6ee]'
            }`}
          >
            Explore
          </Link>
          <Link
            to="/categories"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              location.pathname === '/categories'
                ? 'bg-[#e5f1e8] text-[#141e19] font-semibold'
                : 'text-[#3d4a41] hover:text-[#141e19] hover:bg-[#ebf6ee]'
            }`}
          >
            Categories
          </Link>
          <Link
            to="/freelancers"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              location.pathname === '/freelancers'
                ? 'bg-[#e5f1e8] text-[#141e19] font-semibold'
                : 'text-[#3d4a41] hover:text-[#141e19] hover:bg-[#ebf6ee]'
            }`}
          >
            Find Freelancers
          </Link>
          <Link
            to="/how-it-works"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              location.pathname === '/how-it-works'
                ? 'bg-[#e5f1e8] text-[#141e19] font-semibold'
                : 'text-[#3d4a41] hover:text-[#141e19] hover:bg-[#ebf6ee]'
            }`}
          >
            How it Works
          </Link>
          <Link
            to="/compare"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              location.pathname === '/compare'
                ? 'bg-[#e5f1e8] text-[#141e19] font-semibold'
                : 'text-[#3d4a41] hover:text-[#141e19] hover:bg-[#ebf6ee]'
            }`}
          >
            Compare
          </Link>
          <button
            onClick={() => onOpenConciergeModal()}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#3d4a41] hover:text-[#141e19] hover:bg-[#ebf6ee] transition-all duration-150"
          >
            Enterprise
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-space-sm shrink-0">
          {/* Saved Items Counter if any */}
          {favoritesCount > 0 && (
            <button
              onClick={() => {
                const elem = document.getElementById('services-grid');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e5f1e8] text-xs font-medium text-[#006a42] hover:bg-[#dfebe3] transition-colors"
              title={`${favoritesCount} saved deliverables`}
            >
              <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
              <span>{favoritesCount} Saved</span>
            </button>
          )}

          <button
            onClick={onOpenArtisanModal}
            className="hidden sm:inline-flex items-center px-space-sm py-space-xs rounded-lg font-label-md text-label-md text-[#3d4a41] hover:text-[#141e19] hover:bg-[#e5f1e8] transition-all duration-150"
          >
            Become a Freelancer
          </button>

          {isSignedUser ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2 pl-space-xs focus:outline-none"
                aria-label="User profile menu"
              >
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-[#bccabf]/60 hover:ring-[#006a42] transition-all"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnjKySUGxnltlh4l6ol7Tf217ObvE2krQ7MNkcQ5uWpeS-GlGN-jpmZQhMUIp0xholPlZtwSOkVFpyBGj0dDFpA7z7GnLuw0UCCQu7s3g6r9Fk5woPULh5Lyj2lGmw9uxn_-Q0uEFaM6x7-rCQisTkva28a3H-lGA9_oU5gJKP5UJSPzLoBmBB-0xEIcmIV9U5KhYmZVmKBC3EKEnysOZswYF1nP-hhXU7kWsubmUO8T4CATznaJPHZw"
                />
                <span className="hidden md:inline font-code-badge text-[11px] text-[#6d7a70]">CLIENT</span>
              </button>

              {/* Profile dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-[#bccabf]/30 p-2 z-50">
                  <div className="px-3 py-2 border-b border-[#bccabf]/20">
                    <p className="font-label-md text-sm text-[#141e19]">Marcus Sterling</p>
                    <p className="font-code-badge text-[11px] text-[#006a42]">Escrow Active: $12,450</p>
                  </div>
                  <div className="py-1 text-xs">
                    <span className="px-3 py-1 text-[10px] uppercase font-code-badge text-[#6d7a70] block">
                      Client Workspace
                    </span>
                    <Link
                      to="/client/briefs"
                      onClick={() => setShowProfileDropdown(false)}
                      className="w-full text-left px-3 py-1.5 text-[#3d4a41] hover:bg-[#f1fcf4] rounded flex items-center justify-between"
                    >
                      <span>Project Briefs</span>
                      <span className="font-code-badge text-[10px] text-[#006a42]">2 Active</span>
                    </Link>
                    <Link
                      to="/client/briefs/new"
                      onClick={() => setShowProfileDropdown(false)}
                      className="w-full text-left px-3 py-1.5 text-[#3d4a41] hover:bg-[#f1fcf4] rounded block"
                    >
                      Scope New Brief
                    </Link>

                    <span className="px-3 py-1 text-[10px] uppercase font-code-badge text-[#6d7a70] block mt-1 pt-1 border-t border-[#bccabf]/20">
                      Platform Governance
                    </span>
                    <Link
                      to="/admin/payments"
                      onClick={() => setShowProfileDropdown(false)}
                      className="w-full text-left px-3 py-1.5 text-[#3d4a41] hover:bg-[#f1fcf4] rounded block"
                    >
                      Treasury & Platform Fees
                    </Link>
                    <Link
                      to="/admin/reviews"
                      onClick={() => setShowProfileDropdown(false)}
                      className="w-full text-left px-3 py-1.5 text-[#3d4a41] hover:bg-[#f1fcf4] rounded block"
                    >
                      Review Moderation
                    </Link>
                    <Link
                      to="/admin/audit-logs"
                      onClick={() => setShowProfileDropdown(false)}
                      className="w-full text-left px-3 py-1.5 text-[#3d4a41] hover:bg-[#f1fcf4] rounded block"
                    >
                      System Audit Logs
                    </Link>

                    <button
                      onClick={() => {
                        setIsSignedUser(false);
                        setShowProfileDropdown(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded mt-1 border-t border-[#bccabf]/20 pt-1.5"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/onboarding"
              className="font-label-md text-label-md text-[#3d4a41] hover:text-[#141e19] px-space-xs py-space-xs transition-colors duration-150"
            >
              Sign In
            </Link>
          )}

          <Link
            to="/onboarding"
            className="inline-flex items-center justify-center bg-[#006a42] text-white font-label-md text-label-md px-space-md py-space-sm rounded-lg hover:bg-[#008655] transition-transform duration-150 ease-out hover:-translate-y-0.5 shadow-sm"
          >
            Join Marketplace
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#3d4a41] hover:bg-[#e5f1e8]"
            aria-label="Toggle mobile menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f1fcf4] border-b border-[#bccabf]/30 px-margin-mobile py-4 flex flex-col gap-2">
          <Link
            to="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#141e19] hover:bg-[#e5f1e8]"
          >
            Explore Deliverables
          </Link>
          <Link
            to="/categories"
            onClick={() => setMobileMenuOpen(false)}
            className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#141e19] hover:bg-[#e5f1e8]"
          >
            Categories
          </Link>
          <Link
            to="/freelancers"
            onClick={() => setMobileMenuOpen(false)}
            className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#141e19] hover:bg-[#e5f1e8]"
          >
            Find Freelancers
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#141e19] hover:bg-[#e5f1e8]"
          >
            How it Works
          </Link>
          <Link
            to="/compare"
            onClick={() => setMobileMenuOpen(false)}
            className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#141e19] hover:bg-[#e5f1e8]"
          >
            Compare Deliverables
          </Link>
          <Link
            to="/client/briefs"
            onClick={() => setMobileMenuOpen(false)}
            className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#006a42] bg-[#ebf6ee]"
          >
            Client Briefs Dashboard
          </Link>
          <Link
            to="/admin/payments"
            onClick={() => setMobileMenuOpen(false)}
            className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#3d4a41] hover:bg-[#e5f1e8]"
          >
            Admin Treasury &amp; Fees
          </Link>
        </div>
      )}
    </header>
  );
};
