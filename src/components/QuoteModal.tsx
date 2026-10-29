'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Send, ShieldCheck, Mail, Phone, Loader2 } from 'lucide-react';
import { COMPANY_DETAILS, CORE_SERVICES } from '@/data/companyData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

interface FormState {
  fullName: string;
  businessEmail: string;
  companyName: string;
  phoneNumber: string;
  serviceRequired: string;
  siteLocation: string;
  equipmentModel: string;
  requirementDescription: string;
  consent: boolean;
}

interface FormErrors {
  [key: string]: string;
}

interface ServerSuccessState {
  enquiryId: string;
  message: string;
  createdAt: string;
}

export function QuoteModal({ isOpen, onClose, preselectedService }: QuoteModalProps) {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    businessEmail: '',
    companyName: '',
    phoneNumber: '',
    serviceRequired: preselectedService || 'UPS & Battery Supply',
    siteLocation: '',
    equipmentModel: '',
    requirementDescription: '',
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<ServerSuccessState | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, serviceRequired: preselectedService }));
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = 'Business email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
      newErrors.businessEmail = 'Please provide a valid email address.';
    }

    if (!formData.serviceRequired) {
      newErrors.serviceRequired = 'Please select a required service.';
    }

    if (!formData.requirementDescription.trim()) {
      newErrors.requirementDescription = 'Please briefly describe your requirement or site parameters.';
    } else if (formData.requirementDescription.trim().length < 10) {
      newErrors.requirementDescription = 'Please provide at least 10 characters describing your scope.';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must acknowledge the submission consent to proceed.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setServerError(data.error || 'Failed to submit enquiry. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setSubmissionResult({
        enquiryId: data.enquiryId,
        message: data.message,
        createdAt: data.enquiry?.createdAt || new Date().toISOString(),
      });
    } catch (err) {
      console.error('Submission error:', err);
      setServerError('Network error while connecting to server. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setServerError(null);
    setFormData({
      fullName: '',
      businessEmail: '',
      companyName: '',
      phoneNumber: '',
      serviceRequired: 'UPS & Battery Supply',
      siteLocation: '',
      equipmentModel: '',
      requirementDescription: '',
      consent: false,
    });
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-brand-secondary border border-brand-border rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="p-6 bg-brand-card/90 border-b border-brand-border flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase text-brand-cyan tracking-wider">
              Request a Technical Quote
            </span>
            <h3 id="quote-modal-title" className="text-xl font-bold text-brand-text mt-0.5">
              Power Infrastructure Consultation
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-brand-muted hover:text-brand-text bg-brand-secondary border border-brand-border transition-colors"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {submissionResult ? (
            /* Real Backend Confirmed State */
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider px-2.5 py-1 rounded bg-brand-cyan/10 border border-brand-cyan/20">
                  REF ID: {submissionResult.enquiryId}
                </span>
                <h4 className="text-2xl font-bold text-brand-text mt-2">
                  Enquiry Registered & Dispatched
                </h4>
                <p className="text-xs text-brand-muted mt-1 font-mono">
                  Logged in system at: {new Date(submissionResult.createdAt).toLocaleString('en-IN')}
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-xl bg-brand-card border border-brand-border text-left space-y-2 text-xs text-brand-muted font-mono">
                <div className="flex justify-between border-b border-brand-border/40 pb-1">
                  <span>Client:</span>
                  <span className="text-brand-text font-bold">{formData.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-brand-border/40 pb-1">
                  <span>Email:</span>
                  <span className="text-brand-text">{formData.businessEmail}</span>
                </div>
                <div className="flex justify-between border-b border-brand-border/40 pb-1">
                  <span>Scope:</span>
                  <span className="text-brand-cyan font-bold">{formData.serviceRequired}</span>
                </div>
                {formData.equipmentModel && (
                  <div className="flex justify-between border-b border-brand-border/40 pb-1">
                    <span>Equipment:</span>
                    <span className="text-brand-text">{formData.equipmentModel}</span>
                  </div>
                )}
                <div className="flex justify-between pt-1">
                  <span>Backend Status:</span>
                  <span className="text-emerald-400 font-bold">STORED IN DATABASE (ACTIVE)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-brand-bg/80 border border-brand-border/80 text-xs text-brand-muted text-left space-y-1.5 leading-relaxed">
                <p className="font-semibold text-brand-text flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-cyan" />
                  <span>Engineering Lead Notification:</span>
                </p>
                <p>
                  Your critical power enquiry has been saved to the database. An engineering summary has
                  been prepared for technical assessment and dispatched to{' '}
                  <strong className="text-brand-cyan">{COMPANY_DETAILS.contactEmail}</strong>.
                </p>
                <p className="pt-1 text-[11px] text-brand-muted/70">
                  For urgent breakdown response, contact our rapid deployment desk at{' '}
                  <a href={`tel:${COMPANY_DETAILS.phoneRaw}`} className="text-brand-cyan underline font-mono">
                    {COMPANY_DETAILS.contactPhone}
                  </a>.
                </p>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-cyan text-[#071321] hover:bg-brand-cyan-hover shadow-cyan-glow-sm"
                >
                  Close & Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {serverError && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{serverError}</span>
                </div>
              )}

              <p className="text-xs text-brand-muted leading-relaxed mb-4">
                Provide your critical power specifications. Our technical lead will review your load sizing,
                diagnostics, or maintenance requirements and respond with a formal engineering offer.
              </p>

              {/* Row 1: Full Name & Business Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-brand-muted mb-1">
                    Full Name <span className="text-brand-cyan">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-brand-card border border-brand-border text-brand-text text-sm focus:border-brand-cyan focus:outline-none"
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-brand-muted mb-1">
                    Business Email <span className="text-brand-cyan">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.businessEmail}
                    onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-brand-card border border-brand-border text-brand-text text-sm focus:border-brand-cyan focus:outline-none"
                  />
                  {errors.businessEmail && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.businessEmail}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Company Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-brand-muted mb-1">
                    Company / Organization <span className="text-brand-muted/60">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. CloudCorp Data Systems"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-brand-card border border-brand-border text-brand-text text-sm focus:border-brand-cyan focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-brand-muted mb-1">
                    Phone Number <span className="text-brand-muted/60">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="+91 98112 34567"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-brand-card border border-brand-border text-brand-text text-sm focus:border-brand-cyan focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Service Required & Site Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-brand-muted mb-1">
                    Service Required <span className="text-brand-cyan">*</span>
                  </label>
                  <select
                    value={formData.serviceRequired}
                    onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-brand-card border border-brand-border text-brand-text text-sm focus:border-brand-cyan focus:outline-none"
                  >
                    {CORE_SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Smart SNMP Power Telemetry and Remote Monitoring">
                      Smart SNMP Power Telemetry and Remote Monitoring (Netman 204)
                    </option>
                    <option value="General Critical Power Assessment">
                      General Critical Power Assessment
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-brand-muted mb-1">
                    Site Location / City <span className="text-brand-muted/60">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.siteLocation}
                    onChange={(e) => setFormData({ ...formData, siteLocation: e.target.value })}
                    placeholder="e.g. Sector 62, Noida"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-brand-card border border-brand-border text-brand-text text-sm focus:border-brand-cyan focus:outline-none"
                  />
                </div>
              </div>

              {/* Equipment Model / Capacity */}
              <div>
                <label className="block text-xs font-mono uppercase text-brand-muted mb-1">
                  Equipment Model or Capacity <span className="text-brand-muted/60">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.equipmentModel}
                  onChange={(e) => setFormData({ ...formData, equipmentModel: e.target.value })}
                  placeholder="e.g. 120 kVA Online UPS / 32x 12V 100Ah VRLA Batteries / Netman 204 Card"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-brand-card border border-brand-border text-brand-text text-sm focus:border-brand-cyan focus:outline-none"
                />
              </div>

              {/* Requirement Description */}
              <div>
                <label className="block text-xs font-mono uppercase text-brand-muted mb-1">
                  Requirement Details <span className="text-brand-cyan">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.requirementDescription}
                  onChange={(e) => setFormData({ ...formData, requirementDescription: e.target.value })}
                  placeholder="Describe your critical loads, existing UPS capacity, battery age, or specific maintenance/testing requirements..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-brand-card border border-brand-border text-brand-text text-sm focus:border-brand-cyan focus:outline-none resize-none"
                />
                {errors.requirementDescription && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.requirementDescription}</span>
                  </p>
                )}
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1 rounded bg-brand-card border-brand-border text-brand-cyan focus:ring-brand-cyan"
                  />
                  <span className="text-xs text-brand-muted leading-relaxed">
                    I consent to submitting this technical enquiry for evaluation. Eazy Tech Solutions
                    respects commercial privacy and will not share facility or contact details with third parties.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.consent}</span>
                  </p>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-brand-border">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-brand-muted hover:text-brand-text transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-cyan text-[#071321] hover:bg-brand-cyan-hover shadow-cyan-glow-sm disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Logging to Backend...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Technical Enquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
