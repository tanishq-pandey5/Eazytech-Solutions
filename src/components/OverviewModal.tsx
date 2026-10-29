'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Play, Shield, Activity, Monitor, Wrench, CheckCircle } from 'lucide-react';
import { COMPANY_DETAILS } from '@/data/companyData';

interface OverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal: () => void;
}

export function OverviewModal({ isOpen, onClose, onOpenQuoteModal }: OverviewModalProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      title: 'Reliable Power Systems & UPS Architecture',
      eyebrow: 'CAPABILITY 01',
      description:
        'Online Double Conversion UPS topologies ensure zero millisecond transfer time during power grid interruptions. Eazy Tech Solutions engineers modular systems scaled precisely to facility load profiles.',
      image: '/images/hero-datacenter.png',
      features: [
        'True online double-conversion topology',
        'Scalable N+1 and 2N redundancy',
        'Industrial SMF, VRLA & LiFePO4 battery integration',
      ],
    },
    {
      title: 'Predictive Condition Monitoring & AMC',
      eyebrow: 'CAPABILITY 02',
      description:
        'Rather than waiting for sudden thermal runaway or battery string breakdown during mains failure, our scheduled maintenance protocols identify deteriorating cells and capacitor fatigue early.',
      image: '/images/service-amc.png',
      features: [
        'Quarterly preventative inspections & thermal scans',
        'Priority emergency breakdown response SLA',
        'OEM component replacements under CAMC',
      ],
    },
    {
      title: 'Diagnostic Precision & IEEE 1188 Compliance',
      eyebrow: 'CAPABILITY 03',
      description:
        'Field measurements conducted with calibrated Class-A analyzers and digital micro-ohmmeters. We profile harmonic currents (THD-V/THD-I) and measure individual cell impedance.',
      image: '/images/service-power-quality.png',
      features: [
        'Class-A harmonic distortion audits',
        'Cell-by-cell micro-ohm impedance logging',
        'IEEE 1188 compliance documentation',
      ],
    },
    {
      title: 'Smart SNMP Telemetry & Netman 204',
      eyebrow: 'CAPABILITY 04',
      description:
        'Transform standalone UPS equipment into intelligent networked assets. Real-time telemetry, automated server shutdown scripts, and seamless Building Management System (BMS) integration.',
      image: '/images/monitoring-netman204.png',
      features: [
        'SNMP v1/v2c/v3 encrypted traps',
        'RFC 1628 standard UPS-MIB compatibility',
        'Automated multi-server hypervisor shutdown',
      ],
    },
  ];

  const current = slides[activeTab];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-brand-secondary border border-brand-border rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="p-5 bg-brand-card/90 border-b border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse" />
            <span className="text-xs font-mono uppercase text-brand-cyan tracking-wider font-semibold">
              Interactive System Overview
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-brand-muted hover:text-brand-text bg-brand-secondary border border-brand-border"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-brand-border bg-brand-bg/60 overflow-x-auto text-xs font-mono">
          {slides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-3 whitespace-nowrap transition-colors flex items-center gap-2 border-b-2 ${
                activeTab === idx
                  ? 'border-brand-cyan text-brand-cyan font-bold bg-brand-card/40'
                  : 'border-transparent text-brand-muted hover:text-brand-text'
              }`}
            >
              <span>0{idx + 1}</span>
              <span className="hidden sm:inline">
                {idx === 0 && 'Power Systems'}
                {idx === 1 && 'Preventive AMC'}
                {idx === 2 && 'Diagnostics'}
                {idx === 3 && 'SNMP Monitoring'}
              </span>
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Visual Frame */}
            <div className="md:col-span-5 relative h-48 sm:h-56 rounded-xl overflow-hidden bg-brand-bg border border-brand-border">
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/80 to-transparent" />
            </div>

            {/* Narrative */}
            <div className="md:col-span-7 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan px-2 py-0.5 rounded bg-brand-cyan/10 border border-brand-cyan/20">
                {current.eyebrow}
              </span>
              <h3 className="text-xl font-bold text-brand-text leading-snug">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                {current.description}
              </p>

              <div className="space-y-1.5 pt-2">
                {current.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs text-brand-text">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="p-4 sm:p-6 bg-brand-card border-t border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                  activeTab === idx ? 'bg-brand-cyan w-6' : 'bg-brand-border hover:bg-brand-muted'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-brand-muted hover:text-brand-text px-3 py-1.5"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenQuoteModal();
              }}
              className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-cyan text-[#071321] hover:bg-brand-cyan-hover shadow-cyan-glow-sm"
            >
              Consult an Engineer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
