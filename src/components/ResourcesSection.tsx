'use client';

import React, { useState } from 'react';
import { FileText, Download, ShieldCheck, ArrowRight, CheckCircle2, Cpu, Loader2, X } from 'lucide-react';

interface ResourcesSectionProps {
  onOpenQuoteModal: (topic?: string) => void;
}

export function ResourcesSection({ onOpenQuoteModal }: ResourcesSectionProps) {
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [requestEmail, setRequestEmail] = useState('');
  const [requestName, setRequestName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);

  const technicalResources = [
    {
      title: 'Netman 204 SNMP MIB & Architecture Spec',
      category: 'TELEMETRY WHITEPAPER',
      description:
        'Technical parameters covering RFC 1628 UPS-MIB integration, SNMP v1/v2c/v3 encrypted traps, slot pinouts, and Modbus/TCP mapping for BMS platforms.',
      size: 'Technical Brief',
      icon: Cpu,
    },
    {
      title: 'IEEE 1188 Battery Testing Standard Guide',
      category: 'DIAGNOSTIC PROTOCOL',
      description:
        'Overview of individual cell micro-ohm internal impedance, conductance benchmarking, inter-tier connection resistance, and timed DC discharge testing.',
      size: 'Standard Protocol',
      icon: ShieldCheck,
    },
    {
      title: 'Industrial Power Quality & Harmonics Mitigation',
      category: 'AUDIT METHODOLOGY',
      description:
        'Understanding THD-V and THD-I harmonic distortion, neutral circulating currents, and corrective filter deployment in data center and CNC manufacturing plants.',
      size: 'Audit Whitepaper',
      icon: FileText,
    },
  ];

  const handleResourceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestEmail || !selectedResource) return;

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resourceTitle: selectedResource,
          businessEmail: requestEmail,
          fullName: requestName,
        }),
      });

      if (res.ok) {
        setRequestSuccess(true);
      }
    } catch (err) {
      console.error('Resource request error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedResource(null);
    setRequestEmail('');
    setRequestName('');
    setRequestSuccess(false);
  };

  return (
    <section id="resources" className="py-20 bg-brand-bg relative overflow-hidden border-t border-brand-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-brand-cyan text-xs font-semibold tracking-wider uppercase font-mono">
              <span className="text-brand-cyan text-sm">✛</span>
              <span>Engineering Resources</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text tracking-tight leading-tight">
              Technical Documentation & <br className="hidden sm:inline" />
              Engineering Standards.
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onOpenQuoteModal('Request Technical Documentation')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan hover:text-brand-cyan-hover transition-colors group"
          >
            <span>Request Full Engineering Dossier</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {technicalResources.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-brand-card/80 border border-brand-border hover:border-brand-cyan/60 hover:shadow-cyan-glow-sm transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan px-2 py-0.5 rounded bg-brand-cyan/10 border border-brand-cyan/20">
                      {item.category}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-brand-secondary border border-brand-border flex items-center justify-center text-brand-cyan">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-brand-text mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-brand-muted/70">
                    {item.size}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedResource(item.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-cyan hover:text-brand-cyan-hover transition-colors"
                  >
                    <span>Request Spec</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resource Download / Request Modal */}
      {selectedResource && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={handleCloseModal} />

          <div className="relative w-full max-w-md bg-brand-secondary border border-brand-border rounded-2xl p-6 sm:p-8 z-10 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <span className="text-xs font-mono uppercase text-brand-cyan">
                Instant Technical Brief
              </span>
              <button
                type="button"
                onClick={handleCloseModal}
                className="p-1 rounded-lg text-brand-muted hover:text-brand-text bg-brand-card border border-brand-border"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {requestSuccess ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-brand-text">Access Granted</h4>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Your request for <strong>{selectedResource}</strong> has been logged in our engineering repository. A copy has been dispatched to <strong>{requestEmail}</strong>.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-cyan text-[#071321]"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleResourceSubmit} className="space-y-4">
                <p className="text-xs text-brand-muted leading-relaxed">
                  Enter your business email to receive the engineering specification for{' '}
                  <strong className="text-brand-text">{selectedResource}</strong>.
                </p>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-brand-muted mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={requestName}
                    onChange={(e) => setRequestName(e.target.value)}
                    placeholder="e.g. Amit Saxena"
                    className="w-full px-3 py-2 rounded-lg bg-brand-card border border-brand-border text-xs text-brand-text focus:outline-none focus:border-brand-cyan"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-brand-muted mb-1">
                    Business Email <span className="text-brand-cyan">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={requestEmail}
                    onChange={(e) => setRequestEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 rounded-lg bg-brand-card border border-brand-border text-xs text-brand-text focus:outline-none focus:border-brand-cyan"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 rounded-full text-xs text-brand-muted hover:text-brand-text"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-cyan text-[#071321] hover:bg-brand-cyan-hover shadow-cyan-glow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                    <span>Send Technical Brief</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
