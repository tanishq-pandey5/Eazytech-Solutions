'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Play,
  Zap,
  Wrench,
  Activity,
  Monitor,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { CORE_CAPABILITIES } from '@/data/companyData';

interface HeroSectionProps {
  onOpenQuoteModal: (service?: string) => void;
  onOpenOverviewModal: () => void;
}

export function HeroSection({ onOpenQuoteModal, onOpenOverviewModal }: HeroSectionProps) {
  const [activeCapabilityIndex, setActiveCapabilityIndex] = useState(0);

  const capabilities = [
    {
      title: 'Reliable Power Systems',
      icon: Zap,
      desc: 'Zero-break online double conversion UPS & industrial batteries.',
    },
    {
      title: 'Preventive Maintenance',
      icon: Wrench,
      desc: 'Predictive condition monitoring & SLA emergency support.',
    },
    {
      title: 'Advanced Diagnostics',
      icon: Activity,
      desc: 'Class-A harmonic power quality & IEEE 1188 impedance tests.',
    },
    {
      title: 'Remote Monitoring',
      icon: Monitor,
      desc: 'Smart Netman 204 SNMP v1/v2c/v3 telemetry & BMS alerts.',
    },
  ];

  const handlePrev = () => {
    setActiveCapabilityIndex((prev) => (prev === 0 ? capabilities.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveCapabilityIndex((prev) => (prev === capabilities.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="home"
      className="relative pt-28 pb-12 overflow-hidden bg-[#071321] border-b border-[rgba(115,160,190,0.18)]"
    >
      {/* Background Datacenter Graphic spanning the right side (matching mockup) */}
      <div className="absolute top-0 right-0 bottom-0 w-full lg:w-3/5 pointer-events-none z-0 overflow-hidden">
        <Image
          src="/images/hero-datacenter-hd.jpg"
          alt="Critical Power Datacenter Server Racks"
          fill
          className="object-cover object-center brightness-75 contrast-110 opacity-75 lg:opacity-90"
          priority
        />
        {/* Soft edge gradients blending seamlessly into #071321 */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071321] via-[#071321]/60 to-transparent w-full lg:w-1/2" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071321] via-transparent to-[#071321]/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071321] via-transparent to-[#071321]" />
        {/* Ambient cyan glow */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-cyan/15 rounded-full blur-[140px]" />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px] lg:min-h-[520px]">
          {/* Left Column: Headlines & CTA Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 pt-4 lg:pt-0">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-brand-cyan text-xs font-semibold tracking-wider uppercase font-mono">
              <span className="text-brand-cyan text-sm">✛</span>
              <span>CRITICAL POWER. ENGINEERED FOR CONTINUITY.</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-brand-text tracking-tight leading-[1.12]">
              End-to-End <br />
              Critical Power <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-[#56E0F8] to-[#1EA3C4] drop-shadow-[0_0_25px_rgba(54,215,245,0.35)]">
                Service Provider.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-brand-muted max-w-xl leading-relaxed">
              Your trusted partner for reliable power solutions, delivering UPS systems, battery solutions,
              power audits, maintenance, testing, and technical consultancy to keep your operations running
              without interruption.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-cyan text-[#071321] hover:bg-brand-cyan-hover shadow-cyan-glow transition-all duration-200 active:scale-95"
              >
                <span>Explore Our Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => onOpenQuoteModal()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold text-brand-text bg-brand-card/70 border border-brand-border hover:border-brand-cyan/60 hover:bg-brand-card transition-all duration-200"
              >
                <span>Request a Consultation</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Features & Watch Overview (matching mockup placement) */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between space-y-12 lg:space-y-24 py-6">
            {/* Vertical Technical Badges */}
            <div className="flex flex-col items-start lg:items-end space-y-2.5 text-left lg:text-right">
              {[
                'UPS & BATTERY SYSTEMS',
                'INDUSTRIAL CABLES & LINKS',
                'POWER AUDITS & LOAD STUDIES',
                'AMC, REPAIR & CONSULTANCY',
              ].map(
                (item, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono tracking-widest text-brand-muted/90 font-medium hover:text-brand-cyan transition-colors"
                  >
                    {item}
                  </span>
                )
              )}
            </div>

            {/* Watch Overview Button */}
            <div>
              <button
                type="button"
                onClick={onOpenOverviewModal}
                className="inline-flex items-center gap-3.5 text-brand-text hover:text-brand-cyan transition-colors group"
                aria-label="Watch interactive overview"
              >
                <span className="w-10 h-10 rounded-full bg-brand-cyan/20 border border-brand-cyan flex items-center justify-center text-brand-cyan group-hover:scale-110 group-hover:bg-brand-cyan group-hover:text-[#071321] transition-all shadow-cyan-glow-sm">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider font-mono">
                  Watch Overview
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Section C: Core Capability Highlights Bar (Bottom of Hero matching mockup) */}
        <div className="mt-12 pt-8 border-t border-[rgba(115,160,190,0.18)]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* 4 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full flex-1">
              {capabilities.map((cap, idx) => {
                const IconComp = cap.icon;
                const isActive = activeCapabilityIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveCapabilityIndex(idx)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                      isActive
                        ? 'bg-brand-card border-brand-cyan/60 shadow-cyan-glow-sm'
                        : 'bg-brand-card/40 border-brand-border/60 hover:border-brand-border hover:bg-brand-card/70'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-brand-cyan text-[#071321]'
                          : 'bg-brand-secondary text-brand-cyan border border-brand-border'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-semibold text-brand-text leading-snug truncate">
                        {cap.title}
                      </h3>
                      <p className="text-[11px] text-brand-muted/70 truncate mt-0.5">
                        {cap.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-4 shrink-0 font-mono text-xs text-brand-muted">
              <span className="text-brand-cyan font-bold">
                0{activeCapabilityIndex + 1}
              </span>
              <span className="text-brand-muted/60">/ 04</span>
              <div className="flex items-center gap-1.5 ml-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center hover:text-brand-cyan hover:border-brand-cyan transition-colors"
                  aria-label="Previous capability"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center hover:text-brand-cyan hover:border-brand-cyan transition-colors"
                  aria-label="Next capability"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
