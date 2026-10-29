'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { MonitoringSection } from '@/components/MonitoringSection';
import { IndustriesSection } from '@/components/IndustriesSection';
import { ProcessSection } from '@/components/ProcessSection';
import { AboutSection } from '@/components/AboutSection';
import { ResourcesSection } from '@/components/ResourcesSection';
import { CtaSection } from '@/components/CtaSection';
import { Footer } from '@/components/Footer';
import { QuoteModal } from '@/components/QuoteModal';
import { ServiceDetailModal } from '@/components/ServiceDetailModal';
import { OverviewModal } from '@/components/OverviewModal';
import { PrivacyPolicyModal, TermsModal } from '@/components/LegalModals';
import { CORE_SERVICES, ServiceItem } from '@/data/companyData';

export default function HomePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [overviewModalOpen, setOverviewModalOpen] = useState(false);
  const [detailService, setDetailService] = useState<ServiceItem | null>(null);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  const handleOpenQuoteModal = (serviceTitle?: string) => {
    setPreselectedService(serviceTitle);
    setQuoteModalOpen(true);
  };

  const handleSelectServiceByTitle = (title: string) => {
    const found = CORE_SERVICES.find((s) => s.title.toLowerCase() === title.toLowerCase());
    if (found) {
      setDetailService(found);
    } else {
      handleOpenQuoteModal(title);
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-bg text-brand-text flex flex-col selection:bg-brand-cyan/20 selection:text-brand-cyan">
      {/* Anchor for top of page */}
      <div id="top" />

      {/* Section A: Navigation */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section B & C: Hero & Core Capabilities */}
        <HeroSection
          onOpenQuoteModal={handleOpenQuoteModal}
          onOpenOverviewModal={() => setOverviewModalOpen(true)}
        />

        {/* Section D: Services */}
        <ServicesSection
          onSelectService={(service) => setDetailService(service)}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* Section E: Smart Power Monitoring */}
        <MonitoringSection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* Section F: Industries We Serve */}
        <IndustriesSection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* Section G: How We Work */}
        <ProcessSection onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* Section: Company Overview, Engineering Mission & SLA Advantage (Brochure Source) */}
        <AboutSection onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* Section: Technical Documentation & Standards */}
        <ResourcesSection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* Section H: Final CTA */}
        <CtaSection onOpenQuoteModal={handleOpenQuoteModal} />
      </main>

      {/* Section I: Footer */}
      <Footer
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        onOpenTermsModal={() => setTermsModalOpen(true)}
        onSelectServiceByTitle={handleSelectServiceByTitle}
      />

      {/* Interactive Modals */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedService={preselectedService}
      />

      <ServiceDetailModal
        service={detailService}
        onClose={() => setDetailService(null)}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      <OverviewModal
        isOpen={overviewModalOpen}
        onClose={() => setOverviewModalOpen(false)}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      <PrivacyPolicyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />

      <TermsModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
      />
    </div>
  );
}
