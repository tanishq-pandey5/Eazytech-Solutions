'use client';

import React from 'react';
import { X, Shield } from 'lucide-react';
import { COMPANY_DETAILS } from '@/data/companyData';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: LegalModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-brand-secondary border border-brand-border rounded-2xl shadow-2xl p-6 sm:p-8 z-10 space-y-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-brand-border">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-cyan" />
            <h3 className="text-xl font-bold text-brand-text">Privacy Policy</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-brand-muted hover:text-brand-text bg-brand-card border border-brand-border"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-brand-muted leading-relaxed">
          <p>
            At <strong>{COMPANY_DETAILS.name}</strong>, we respect the confidentiality of your facility
            parameters, electrical engineering schematics, and corporate contact information.
          </p>
          <h4 className="font-bold text-brand-text text-sm">1. Information Collection</h4>
          <p>
            We only collect information voluntarily submitted through our technical enquiry forms,
            such as contact name, business email, company affiliation, and critical power equipment parameters.
          </p>
          <h4 className="font-bold text-brand-text text-sm">2. Use of Diagnostic Data</h4>
          <p>
            Site survey data, battery impedance logs, power quality waveforms, and Single Line Diagrams (SLDs)
            shared with our engineering team are used solely for the preparation of engineering proposals,
            preventive maintenance logs, and harmonic mitigation reports.
          </p>
          <h4 className="font-bold text-brand-text text-sm">3. Non-Disclosure & Security</h4>
          <p>
            We do not sell, rent, or lease client data to third parties. All technical telemetry,
            quotations, and maintenance contracts are handled under strict confidentiality protocols.
          </p>
          <h4 className="font-bold text-brand-text text-sm">4. Contact Inquiries</h4>
          <p>
            For privacy-related inquiries, contact our data administrator at{' '}
            <a href={`mailto:${COMPANY_DETAILS.contactEmail}`} className="text-brand-cyan underline">
              {COMPANY_DETAILS.contactEmail}
            </a>.
          </p>
        </div>

        <div className="pt-4 border-t border-brand-border flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-semibold bg-brand-card border border-brand-border hover:border-brand-cyan text-brand-text"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function TermsModal({ isOpen, onClose }: LegalModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-brand-secondary border border-brand-border rounded-2xl shadow-2xl p-6 sm:p-8 z-10 space-y-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-brand-border">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-cyan" />
            <h3 className="text-xl font-bold text-brand-text">Terms of Service</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-brand-muted hover:text-brand-text bg-brand-card border border-brand-border"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-brand-muted leading-relaxed">
          <p>
            These terms govern the use of the <strong>{COMPANY_DETAILS.name}</strong> corporate web
            portal and informal technical assessments.
          </p>
          <h4 className="font-bold text-brand-text text-sm">1. Commercial Quotations & SLAs</h4>
          <p>
            Formal commercial terms, warranties, delivery timelines, and emergency response SLAs are
            governed exclusively by individual signed Commercial Quotations, Annual Maintenance Contracts
            (AMC/CAMC), and confirmed Purchase Orders.
          </p>
          <h4 className="font-bold text-brand-text text-sm">2. Telemetry and Equipment Simulation</h4>
          <p>
            All remote telemetry demos, SNMP parameters, and dashboard previews presented on this website
            are illustrative simulations designed to demonstrate SNMP interface card integration architecture.
            Live operational data requires physical hardware deployment, network configuration, and authorized access.
          </p>
          <h4 className="font-bold text-brand-text text-sm">3. Engineering Standards Compliance</h4>
          <p>
            Diagnostics and recommendations follow applicable industry standards for stationary
            battery systems, power quality benchmarking, and OEM specifications. Final site implementation requires customer facility sign-off.
          </p>
          <h4 className="font-bold text-brand-text text-sm">4. Registered Office & Jurisdiction</h4>
          <p>
            {COMPANY_DETAILS.name} operates from {COMPANY_DETAILS.registeredOffice.fullAddress}, under the
            statutory jurisdiction of Uttar Pradesh (State Code 09).
          </p>
        </div>

        <div className="pt-4 border-t border-brand-border flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-semibold bg-brand-card border border-brand-border hover:border-brand-cyan text-brand-text"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
