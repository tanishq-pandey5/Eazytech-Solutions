'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, UserCheck, Layers, Wrench, ShieldCheck, PhoneCall } from 'lucide-react';
import { TRUST_HIGHLIGHTS, COMPANY_DETAILS } from '@/data/companyData';

interface CtaSectionProps {
  onOpenQuoteModal: (serviceTitle?: string) => void;
}

export function CtaSection({ onOpenQuoteModal }: CtaSectionProps) {
  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck className="w-4 h-4 text-brand-cyan" />;
      case 'Layers':
        return <Layers className="w-4 h-4 text-brand-cyan" />;
      case 'Wrench':
        return <Wrench className="w-4 h-4 text-brand-cyan" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-brand-cyan" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-brand-cyan" />;
    }
  };

  return (
    <section id="contact-cta" className="py-20 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl overflow-hidden border border-brand-border bg-brand-card shadow-2xl">
          {/* Background Datacenter Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-datacenter-hd.jpg"
              alt="Data Center Critical Power Infrastructure"
              fill
              className="object-cover object-center brightness-40 contrast-125"
            />
            {/* Dark Navy and Cyan Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#071321] via-[#071321]/90 to-[#071321]/60" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-cyan/15 via-transparent to-transparent" />
          </div>

          {/* Foreground Grid */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headlines & Action Buttons */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-brand-cyan text-xs font-semibold tracking-wider uppercase font-mono">
                <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                <span>Let&apos;s Discuss Your Requirements</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text tracking-tight leading-tight">
                Let&apos;s Build a More <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-[#56E0F8] to-[#1EA3C4]">
                  Reliable Power Infrastructure.
                </span>
              </h2>

              <p className="text-base text-brand-muted max-w-xl leading-relaxed">
                Connect with our technical team for UPS systems, battery solutions, specialized power cables,
                power audits, load studies, battery testing, maintenance contracts, or repairs.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenQuoteModal()}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider bg-brand-cyan text-[#071321] hover:bg-brand-cyan-hover shadow-cyan-glow transition-all active:scale-95"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-brand-text bg-brand-card/80 border border-brand-border hover:border-brand-cyan/60 hover:bg-brand-card-hover transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-brand-cyan" />
                  <span>Call {COMPANY_DETAILS.contactPhone}</span>
                </a>
              </div>
            </div>

            {/* Right Column: 4 Trust Badges matching mockup */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {TRUST_HIGHLIGHTS.map((badge, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-brand-secondary/80 border border-brand-border/80 backdrop-blur-md flex flex-col justify-between hover:border-brand-cyan/40 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center shrink-0">
                        {getBadgeIcon(badge.icon)}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-brand-text leading-snug">
                        {badge.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-brand-muted leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
