'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Clock, Award, CheckCircle2, Cpu, Wrench, FileSearch } from 'lucide-react';
import { COMPANY_DETAILS } from '@/data/companyData';

interface AboutSectionProps {
  onOpenQuoteModal: () => void;
}

export function AboutSection({ onOpenQuoteModal }: AboutSectionProps) {
  const metrics = [
    {
      label: 'UPTIME ASSURANCE',
      value: '99.99%',
      desc: 'Critical load continuity design',
    },
    {
      label: 'EMERGENCY RESPONSE',
      value: '24 / 7',
      desc: 'On-call breakdown deployment',
    },
    {
      label: 'OEM STANDARDS',
      value: '100%',
      desc: 'Factory-grade parts & testing',
    },
  ];

  return (
    <section id="about" className="py-24 bg-brand-bg relative overflow-hidden border-t border-brand-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image & Calibrated Instruments Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-brand-border bg-brand-card shadow-2xl">
              <div className="relative h-96 w-full">
                <Image
                  src="/images/service-power-quality-hd.jpg"
                  alt="Certified Engineer using Class-A Power Quality Analyzer"
                  fill
                  className="object-cover object-center brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071321] via-transparent to-transparent" />
              </div>

              {/* Floating SLA Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-brand-secondary/90 border border-brand-border/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center shrink-0 text-brand-cyan">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-text">
                      Predictive Maintenance SLA
                    </h4>
                    <p className="text-xs text-brand-muted">
                      Condition-based testing with calibrated micro-ohmmeters & thermal cameras.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-brand-cyan text-xs font-semibold tracking-wider uppercase font-mono">
              <span className="text-brand-cyan text-sm">✛</span>
              <span>Company Overview & Engineering Mission</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text tracking-tight leading-tight">
              Preventive Precision. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-[#1EA3C4]">
                Stopping Failures Before They Happen.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              As an <strong>End-to-End Critical Power Service Provider</strong>, <strong>Eazy Tech Solutions</strong> combines
              reliable equipment supply—including UPS systems, industrial batteries, and specialized cables—with
              comprehensive power audits, load studies, battery impedance testing, preventive AMC contracts, 24/7 emergency repairs,
              and expert power consultancy to ensure your critical operations never stop.
            </p>

            {/* 3 Pillars (Balanced Layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-brand-card/80 border border-brand-border/70 flex flex-col justify-between"
                >
                  <span className="text-xl sm:text-2xl font-black font-mono text-brand-cyan">
                    {m.value}
                  </span>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-brand-text block mt-1">
                      {m.label}
                    </span>
                    <span className="text-[10px] text-brand-muted block mt-0.5">
                      {m.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Engineering Standards List */}
            <div className="pt-2 space-y-2.5 text-xs sm:text-sm text-brand-muted">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                <span>
                  <strong>Guaranteed SLA Response:</strong> Rapid on-site technician deployment within
                  contractual SLA hours for enterprise contract holders.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                <span>
                  <strong>Calibrated Instrumentation:</strong> All diagnostics executed with certified
                  micro-ohmmeters, thermal imaging cameras, and digital power meters.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                <span>
                  <strong>Battery Diagnostics & Capacity Testing:</strong> Rigorous cell-level internal impedance,
                  conductance measurement, and timed DC load-bank discharge testing.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
