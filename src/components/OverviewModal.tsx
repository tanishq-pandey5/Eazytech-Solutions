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
      title: 'Diagnostic Precision & Battery Health Testing',
      eyebrow: 'CAPABILITY 03',
      description:
        'Field measurements conducted with calibrated Class-A analyzers and digital micro-ohmmeters. We profile harmonic currents (THD-V/THD-I) and measure individual cell impedance.',
      image: '/images/service-power-quality.png',
      features: [
        'Class-A harmonic distortion audits',
        'Cell-by-cell micro-ohm impedance logging',
        'Detailed diagnostic health certification',
      ],
    },
    {
      title: 'Smart SNMP Telemetry & Remote Monitoring',
      eyebrow: 'CAPABILITY 04',
      description:
        'Transform standalone UPS equipment into intelligent networked assets via SNMP interface cards. Real-time telemetry, automated server shutdown scripts, and seamless Building Management System (BMS) integration.',
      image: '/images/monitoring-snmp-card.png',
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
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 text-slate-900">
        {/* Header */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse" />
            <span className="text-xs font-mono uppercase text-brand-cyan tracking-wider font-semibold">
              Interactive System Overview
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 bg-white border border-slate-200 shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 bg-slate-50/50 overflow-x-auto text-xs font-mono">
          {slides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-3 whitespace-nowrap transition-colors flex items-center gap-2 border-b-2 ${
                activeTab === idx
                  ? 'border-brand-cyan text-brand-cyan font-bold bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
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
            <div className="md:col-span-5 relative h-48 sm:h-56 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </div>

            {/* Narrative */}
            <div className="md:col-span-7 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan px-2 py-0.5 rounded bg-sky-50 border border-sky-200 font-semibold">
                {current.eyebrow}
              </span>
              <h3 className="text-xl font-bold text-slate-900 leading-snug">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {current.description}
              </p>

              <div className="space-y-1.5 pt-2">
                {current.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                  activeTab === idx ? 'bg-brand-cyan w-6' : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-600 hover:text-slate-900 px-3 py-1.5"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenQuoteModal();
              }}
              className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-cyan text-white hover:bg-brand-cyan-hover shadow-cyan-glow-sm"
            >
              Consult an Engineer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
