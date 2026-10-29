'use client';

import React from 'react';
import { ArrowRight, Search, FileCheck, Settings, CheckCircle2 } from 'lucide-react';
import { PROCESS_STEPS } from '@/data/companyData';

interface ProcessSectionProps {
  onOpenQuoteModal: () => void;
}

export function ProcessSection({ onOpenQuoteModal }: ProcessSectionProps) {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search':
        return <Search className="w-5 h-5 text-brand-cyan" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-brand-cyan" />;
      case 'Settings':
        return <Settings className="w-5 h-5 text-brand-cyan" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-brand-cyan" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-brand-cyan" />;
    }
  };

  return (
    <section id="how-we-work" className="py-24 bg-brand-secondary/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-brand-cyan text-xs font-semibold tracking-wider uppercase">
              <span className="text-brand-cyan text-sm">✛</span>
              <span>How We Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text tracking-tight leading-tight">
              A Structured Approach to <br className="hidden sm:inline" />
              Reliable Power.
            </h2>
          </div>

          <button
            type="button"
            onClick={onOpenQuoteModal}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan hover:text-brand-cyan-hover transition-colors group"
          >
            <span>Initiate an Assessment</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Process Cards with Horizontal Flow on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="h-full rounded-2xl bg-brand-card/80 border border-brand-border/80 p-6 flex flex-col justify-between hover:border-brand-cyan/60 hover:shadow-cyan-glow-sm transition-all duration-300">
                {/* Header row with step number and icon */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-brand-secondary border border-brand-border flex items-center justify-center group-hover:border-brand-cyan/40 group-hover:scale-105 transition-all">
                      {getStepIcon(step.icon)}
                    </div>
                    <span className="font-mono text-sm font-bold text-brand-cyan bg-brand-cyan/10 px-2.5 py-1 rounded border border-brand-cyan/20">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-brand-text mb-1 group-hover:text-brand-cyan transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-brand-cyan font-mono mb-3">
                    {step.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables tags */}
                <div className="pt-4 border-t border-brand-border/60 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-brand-muted tracking-wider block mb-1">
                    Key Deliverables:
                  </span>
                  {step.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-[11px] text-brand-text/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan/80 shrink-0" />
                      <span className="truncate">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connecting line / arrow on desktop */}
              {idx < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-brand-secondary border border-brand-border text-brand-cyan items-center justify-center shadow-lg pointer-events-none">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Methodology note */}
        <p className="text-center text-xs text-brand-muted/70 font-mono mt-10">
          Proposed service methodology tailored to client facility requirements and contractual SLAs.
        </p>
      </div>
    </section>
  );
}
