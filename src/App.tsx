/**
 * KINETIQ - Cinematic Editorial Marketplace
 * Full Platform Application Router & State Manager
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ServiceModal } from './components/ServiceModal';
import { SpecialistModal } from './components/SpecialistModal';
import { ArtisanModal } from './components/ArtisanModal';
import { ConciergeModal } from './components/ConciergeModal';
import { LightboxModal } from './components/LightboxModal';
import { Toast, ToastMessage } from './components/Toast';
import { CookieConsentBanner } from './components/common/CookieConsentBanner';
import { PageTransition } from './components/motion/PageTransition';

// Pages
import { HomePage } from './pages/HomePage';
import { FreelancersPage } from './pages/FreelancersPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { ForbiddenPage } from './pages/ForbiddenPage';
import { CheckoutSuccessPage } from './pages/CheckoutSuccessPage';
import { CheckoutCancelledPage } from './pages/CheckoutCancelledPage';
import { ClientBriefsPage } from './pages/ClientBriefsPage';
import { NewBriefPage } from './pages/NewBriefPage';
import { AdminReviewsPage } from './pages/AdminReviewsPage';
import { AdminPaymentsPage } from './pages/AdminPaymentsPage';
import { AdminAuditLogsPage } from './pages/AdminAuditLogsPage';
import { ComparePage } from './pages/ComparePage';
import { ExplorePage } from './pages/ExplorePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { BecomeFreelancerPage } from './pages/BecomeFreelancerPage';
import { LegalTermsPage } from './pages/LegalTermsPage';
import { LegalPrivacyPage } from './pages/LegalPrivacyPage';
import { LegalCookiesPage } from './pages/LegalCookiesPage';
import { LegalRefundsPage } from './pages/LegalRefundsPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { ServiceDeliverable, Specialist } from './types';

function AppContent() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [activeService, setActiveService] = useState<ServiceDeliverable | null>(null);
  const [activeSpecialist, setActiveSpecialist] = useState<Specialist | null>(null);
  const [isArtisanModalOpen, setIsArtisanModalOpen] = useState(false);
  const [isConciergeModalOpen, setIsConciergeModalOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; url: string | null; title: string | null }>({
    isOpen: false,
    url: null,
    title: null,
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'error', title: string, message?: string) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, type, title, message }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleFavorite = (serviceId: string, title: string) => {
    setFavorites((prev) => {
      const willBeSaved = !prev[serviceId];
      if (willBeSaved) {
        addToast('success', 'Deliverable Saved', `"${title.slice(0, 30)}..." added to your collection.`);
      } else {
        addToast('info', 'Deliverable Removed', 'Item removed from saved.');
      }
      return {
        ...prev,
        [serviceId]: willBeSaved,
      };
    });
  };

  const handleLockEscrow = (serviceTitle: string, amount: number) => {
    addToast(
      'success',
      'Escrow Lock Initialized',
      `$${amount.toLocaleString()} deposited in Multi-Sig Vault for "${serviceTitle.slice(0, 28)}..."`
    );
  };

  const handleSpecialistInquiry = (specialistName: string) => {
    addToast(
      'success',
      'Direct Commission Brief Transmitted',
      `Encrypted workspace notification sent to ${specialistName}.`
    );
  };

  const handleArtisanSuccess = (name: string) => {
    addToast(
      'success',
      'Application Submitted',
      `Thank you ${name}. Your portfolio review ticket #KQ-8419 is being processed.`
    );
  };

  const handleConciergeSuccess = (company: string) => {
    addToast(
      'success',
      'Concierge Brief Queued',
      `Enterprise Squad consultation logged for ${company}.`
    );
  };

  const favoritesCount = Object.values(favorites).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#f1fcf4] text-[#141e19] flex flex-col font-body-md antialiased selection:bg-[#96f3bf] selection:text-[#002111]">
      {/* Top Header Navigation */}
      <Header
        onOpenArtisanModal={() => setIsArtisanModalOpen(true)}
        onOpenConciergeModal={() => setIsConciergeModalOpen(true)}
        favoritesCount={favoritesCount}
        onExploreClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Routed Content Area */}
      <div className="pt-20 flex-1 flex flex-col">
        <Routes>
          {/* 1. Home */}
          <Route
            path="/"
            element={
              <PageTransition pageTitle="KINETIQ - Cinematic Editorial Marketplace">
                <HomePage
                  onOpenServiceModal={(s) => setActiveService(s)}
                  onOpenSpecialistModal={(spec) => setActiveSpecialist(spec)}
                  onOpenArtisanModal={() => setIsArtisanModalOpen(true)}
                  onOpenConciergeModal={() => setIsConciergeModalOpen(true)}
                  onOpenLightbox={(url, title) => setLightbox({ isOpen: true, url, title })}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  onAddToast={addToast}
                />
              </PageTransition>
            }
          />

          {/* 2. Find Freelancers */}
          <Route
            path="/freelancers"
            element={
              <PageTransition pageTitle="Find Vetted Freelance Specialists | KINETIQ">
                <FreelancersPage
                  onOpenSpecialistModal={(spec) => setActiveSpecialist(spec)}
                  onOpenLightbox={(url, title) => setLightbox({ isOpen: true, url, title })}
                  onSpecialistInquiry={handleSpecialistInquiry}
                  onAddToast={addToast}
                />
              </PageTransition>
            }
          />

          {/* 3. Onboarding */}
          <Route
            path="/onboarding"
            element={
              <PageTransition pageTitle="Join KINETIQ | Role Onboarding">
                <OnboardingPage onAddToast={addToast} />
              </PageTransition>
            }
          />

          {/* 4. Verify Email */}
          <Route
            path="/verify-email"
            element={
              <PageTransition pageTitle="Verify Email Authentication | KINETIQ">
                <VerifyEmailPage onAddToast={addToast} />
              </PageTransition>
            }
          />

          {/* 5. 403 Forbidden */}
          <Route
            path="/403"
            element={
              <PageTransition pageTitle="403 Forbidden Clearance | KINETIQ">
                <ForbiddenPage />
              </PageTransition>
            }
          />

          {/* 6. Checkout Success */}
          <Route
            path="/client/checkout/success"
            element={
              <PageTransition pageTitle="Escrow Vault Confirmed | KINETIQ">
                <CheckoutSuccessPage />
              </PageTransition>
            }
          />

          {/* 7. Checkout Cancelled */}
          <Route
            path="/client/checkout/cancelled"
            element={
              <PageTransition pageTitle="Checkout Suspended | KINETIQ">
                <CheckoutCancelledPage />
              </PageTransition>
            }
          />

          {/* 8. Client Briefs */}
          <Route
            path="/client/briefs"
            element={
              <PageTransition pageTitle="Project Briefs Dashboard | KINETIQ">
                <ClientBriefsPage
                  onOpenServiceModal={(s) => setActiveService(s)}
                  onAddToast={addToast}
                />
              </PageTransition>
            }
          />

          {/* 9. Guided Project Brief Builder */}
          <Route
            path="/client/briefs/new"
            element={
              <PageTransition pageTitle="Guided Project Brief Builder | KINETIQ">
                <NewBriefPage
                  onAddToast={addToast}
                  onOpenServiceModal={(s) => setActiveService(s)}
                />
              </PageTransition>
            }
          />

          {/* 10. Admin Reviews Moderation */}
          <Route
            path="/admin/reviews"
            element={
              <PageTransition pageTitle="Review Moderation | KINETIQ Admin">
                <AdminReviewsPage onAddToast={addToast} />
              </PageTransition>
            }
          />

          {/* 11. Admin Payments & Platform Fees */}
          <Route
            path="/admin/payments"
            element={
              <PageTransition pageTitle="Platform Fees & Multi-Sig Treasury | KINETIQ Admin">
                <AdminPaymentsPage onAddToast={addToast} />
              </PageTransition>
            }
          />

          {/* 12. Admin Audit Logs */}
          <Route
            path="/admin/audit-logs"
            element={
              <PageTransition pageTitle="Audit & Telemetry Logs | KINETIQ Admin">
                <AdminAuditLogsPage />
              </PageTransition>
            }
          />

          {/* 13. Compare Benchmarks */}
          <Route
            path="/compare"
            element={
              <PageTransition pageTitle="Compare Deliverables Side by Side | KINETIQ">
                <ComparePage
                  onOpenServiceModal={(s) => setActiveService(s)}
                  onLockEscrow={handleLockEscrow}
                />
              </PageTransition>
            }
          />

          {/* 14. Explore Catalog */}
          <Route
            path="/explore"
            element={
              <PageTransition pageTitle="Explore Verified Deliverables | KINETIQ">
                <ExplorePage
                  onOpenServiceModal={(s) => setActiveService(s)}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  onAddToast={addToast}
                />
              </PageTransition>
            }
          />

          {/* 15. Categories */}
          <Route
            path="/categories"
            element={
              <PageTransition pageTitle="Marketplace Categories | KINETIQ">
                <CategoriesPage />
              </PageTransition>
            }
          />

          {/* 16. How It Works */}
          <Route
            path="/how-it-works"
            element={
              <PageTransition pageTitle="How Multi-Sig Escrow Works | KINETIQ">
                <HowItWorksPage />
              </PageTransition>
            }
          />

          {/* 17. Become a Freelancer */}
          <Route
            path="/become-a-freelancer"
            element={
              <PageTransition pageTitle="Artisan Admissions | KINETIQ">
                <BecomeFreelancerPage
                  onOpenArtisanModal={() => setIsArtisanModalOpen(true)}
                  onAddToast={addToast}
                />
              </PageTransition>
            }
          />

          {/* 18. Legal Terms */}
          <Route
            path="/legal/terms"
            element={
              <PageTransition pageTitle="Terms of Service | KINETIQ">
                <LegalTermsPage />
              </PageTransition>
            }
          />

          {/* 19. Legal Privacy */}
          <Route
            path="/legal/privacy"
            element={
              <PageTransition pageTitle="Privacy Policy | KINETIQ">
                <LegalPrivacyPage />
              </PageTransition>
            }
          />

          {/* 20. Legal Cookies */}
          <Route
            path="/legal/cookies"
            element={
              <PageTransition pageTitle="Cookie Policy | KINETIQ">
                <LegalCookiesPage />
              </PageTransition>
            }
          />

          {/* 21. Legal Refunds & Disputes */}
          <Route
            path="/legal/refunds"
            element={
              <PageTransition pageTitle="Cancellation & Refund Rules | KINETIQ">
                <LegalRefundsPage />
              </PageTransition>
            }
          />

          {/* 22. 404 Fallback */}
          <Route
            path="*"
            element={
              <PageTransition pageTitle="404 Not Found | KINETIQ">
                <NotFoundPage />
              </PageTransition>
            }
          />
        </Routes>
      </div>

      {/* Global Footer */}
      <Footer
        onOpenArtisanModal={() => setIsArtisanModalOpen(true)}
        onOpenConciergeModal={() => setIsConciergeModalOpen(true)}
      />

      {/* Interactive Global Modals */}
      <ServiceModal
        service={activeService}
        onClose={() => setActiveService(null)}
        onLockEscrow={handleLockEscrow}
      />

      <SpecialistModal
        specialist={activeSpecialist}
        onClose={() => setActiveSpecialist(null)}
        onOpenLightbox={(url, title) => setLightbox({ isOpen: true, url, title })}
        onSubmitInquiry={handleSpecialistInquiry}
      />

      <ArtisanModal
        isOpen={isArtisanModalOpen}
        onClose={() => setIsArtisanModalOpen(false)}
        onSuccess={handleArtisanSuccess}
      />

      <ConciergeModal
        isOpen={isConciergeModalOpen}
        onClose={() => setIsConciergeModalOpen(false)}
        onSuccess={handleConciergeSuccess}
      />

      <LightboxModal
        isOpen={lightbox.isOpen}
        imageUrl={lightbox.url}
        title={lightbox.title}
        onClose={() => setLightbox({ isOpen: false, url: null, title: null })}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Persistent Cookie & GDPR Consent Banner */}
      <CookieConsentBanner />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
