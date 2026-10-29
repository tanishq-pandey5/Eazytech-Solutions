'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Building2, Cpu, Factory, HeartPulse, ShieldCheck, X } from 'lucide-react';
import { INDUSTRIES, IndustryItem } from '@/data/companyData';

interface IndustriesSectionProps {
  onOpenQuoteModal: (industryTitle?: string) => void;
}

export function IndustriesSection({ onOpenQuoteModal }: IndustriesSectionProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryItem | null>(null);

  const getIndustryIcon = (id: string) => {
    switch (id) {
      case 'data-centers':
        return <Cpu className="w-4 h-4 text-brand-cyan" />;
      case 'manufacturing':
        return <Factory className="w-4 h-4 text-brand-cyan" />;
      case 'healthcare':
        return <HeartPulse className="w-4 h-4 text-brand-cyan" />;
      case 'enterprise-it':
        return <Building2 className="w-4 h-4 text-brand-cyan" />;
      default:
        return <Cpu className="w-4 h-4 text-brand-cyan" />;
    }
  };

  return (
    <section id="industries" className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-brand-cyan text-xs font-semibold tracking-wider uppercase">
              <span className="text-brand-cyan text-sm">✛</span>
              <span>Industries We Serve</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text tracking-tight leading-tight">
              Built for Mission-Critical <br className="hidden sm:inline" />
              Environments.
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onOpenQuoteModal()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan hover:text-brand-cyan-hover transition-colors group"
          >
            <span>Discuss Your Industry Needs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Industry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIES.map((industry) => (
            <div
              key={industry.id}
              onClick={() => setSelectedIndustry(industry)}
              className="group relative rounded-2xl overflow-hidden bg-brand-card/90 border border-brand-border/80 hover:border-brand-cyan/60 hover:shadow-cyan-glow-sm transition-all duration-300 flex flex-col justify-end cursor-pointer h-72 sm:h-80"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedIndustry(industry);
                }
              }}
              aria-label={`View critical power details for ${industry.title}`}
            >
              {/* Background Image */}
              <Image
                src={industry.image}
                alt={industry.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-75 group-hover:brightness-90"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071321] via-[#071321]/70 to-transparent" />

              {/* Card Foreground Content */}
              <div className="relative p-6 z-10 flex items-center justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="p-1 rounded bg-brand-secondary/80 border border-brand-border/60">
                      {getIndustryIcon(industry.id)}
                    </span>
                    <span className="text-[10px] font-mono text-brand-cyan uppercase tracking-wider">
                      Critical Sector
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-brand-text group-hover:text-brand-cyan transition-colors truncate">
                    {industry.title}
                  </h3>
                </div>

                <span className="w-8 h-8 rounded-full bg-brand-secondary/90 border border-brand-border flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan group-hover:text-[#071321] group-hover:border-brand-cyan transition-all duration-200 shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Industry Details Modal */}
      {selectedIndustry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedIndustry(null)}
          />

          <div className="relative w-full max-w-lg bg-brand-secondary border border-brand-border rounded-2xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-card border border-brand-border flex items-center justify-center">
                  {getIndustryIcon(selectedIndustry.id)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-text">
                    {selectedIndustry.title}
                  </h3>
                  <p className="text-xs text-brand-cyan font-mono">
                    Mission-Critical Power Architecture
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedIndustry(null)}
                className="p-1.5 rounded-lg text-brand-muted hover:text-brand-text bg-brand-card border border-brand-border"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-brand-muted leading-relaxed">
              {selectedIndustry.description}
            </p>

            <div className="p-4 rounded-xl bg-brand-card border border-brand-border space-y-2">
              <h4 className="text-xs font-mono uppercase text-brand-cyan tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Uptime Criticality Factors</span>
              </h4>
              <p className="text-xs sm:text-sm text-brand-text leading-relaxed">
                {selectedIndustry.criticality}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase text-brand-muted tracking-wider mb-2">
                Recommended Infrastructure Stack:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-brand-text">
                {selectedIndustry.recommendedServices.map((svc, i) => (
                  <li key={i} className="flex items-center gap-2 bg-brand-bg/60 p-2 rounded-lg border border-brand-border/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                    <span>{svc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-brand-border">
              <button
                type="button"
                onClick={() => setSelectedIndustry(null)}
                className="px-4 py-2 rounded-full text-xs font-medium text-brand-muted hover:text-brand-text"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const title = selectedIndustry.title;
                  setSelectedIndustry(null);
                  onOpenQuoteModal(`Critical Power for ${title}`);
                }}
                className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-cyan text-[#071321] hover:bg-brand-cyan-hover shadow-cyan-glow-sm"
              >
                Consult on {selectedIndustry.title}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
