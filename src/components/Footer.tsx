'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, ArrowUp, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY_DETAILS, CORE_SERVICES } from '@/data/companyData';

interface FooterProps {
  onOpenPrivacyModal: () => void;
  onOpenTermsModal: () => void;
  onSelectServiceByTitle: (title: string) => void;
}

export function Footer({
  onOpenPrivacyModal,
  onOpenTermsModal,
  onSelectServiceByTitle,
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#050D17] border-t border-[rgba(115,160,190,0.18)] pt-16 pb-12 relative overflow-hidden">
      {/* Subtle top light bar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-brand-border/40">
          {/* Col 1: Brand & Positioning (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="md" showSubtitle={true} />
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed max-w-sm pt-2">
              Sales • Service • Testing • Electrical Consultancy for critical power infrastructure.
              Delivering high-uptime engineering for mission-critical facilities across India.
            </p>
            <div className="pt-2 text-xs text-brand-muted/80 font-mono">
              <span className="text-brand-cyan font-semibold">GSTIN:</span> {COMPANY_DETAILS.gstin}
              <br />
              <span className="text-brand-cyan font-semibold">Jurisdiction:</span> {COMPANY_DETAILS.stateJurisdiction}
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-brand-text tracking-wide uppercase font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-muted">
              <li>
                <Link href="#home" className="hover:text-brand-cyan transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-brand-cyan transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-brand-cyan transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#industries" className="hover:text-brand-cyan transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="#technology" className="hover:text-brand-cyan transition-colors">
                  Technology (SNMP)
                </Link>
              </li>
              <li>
                <Link href="#how-we-work" className="hover:text-brand-cyan transition-colors">
                  Methodology
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Our Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-brand-text tracking-wide uppercase font-mono">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-muted">
              {CORE_SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => onSelectServiceByTitle(s.title)}
                    className="hover:text-brand-cyan transition-colors text-left"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Information (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-brand-text tracking-wide uppercase font-mono">
              Contact Information
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-brand-muted">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed">
                  {COMPANY_DETAILS.registeredOffice.fullAddress}
                </address>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-cyan shrink-0" />
                <a
                  href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                  className="hover:text-brand-cyan transition-colors font-mono"
                >
                  {COMPANY_DETAILS.contactPhone}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-cyan shrink-0" />
                <a
                  href={`mailto:${COMPANY_DETAILS.contactEmail}`}
                  className="hover:text-brand-cyan transition-colors font-mono break-all"
                >
                  {COMPANY_DETAILS.contactEmail}
                </a>
              </div>

              <div className="pt-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-card border border-brand-border text-[11px] font-mono text-brand-cyan">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>24/7 Breakdown Response SLA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-muted/70 gap-4">
          <div>
            <p>© {new Date().getFullYear()} Eazy Tech Solutions. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenPrivacyModal}
              className="hover:text-brand-text transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-brand-border">|</span>
            <button
              type="button"
              onClick={onOpenTermsModal}
              className="hover:text-brand-text transition-colors"
            >
              Terms of Service
            </button>
            <span className="text-brand-border">|</span>
            <Link href="/sitemap.xml" className="hover:text-brand-text transition-colors">
              Sitemap
            </Link>
            <span className="text-brand-border">|</span>
            <Link href="/admin" className="hover:text-brand-cyan transition-colors font-mono text-[11px]">
              Lead Hub
            </Link>
          </div>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-card border border-brand-border hover:border-brand-cyan/60 hover:text-brand-cyan text-brand-muted transition-colors text-xs font-mono"
            aria-label="Back to top of page"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
