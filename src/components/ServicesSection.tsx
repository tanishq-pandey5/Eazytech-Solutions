'use client';

import React from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Box,
  Wrench,
  ShieldAlert,
  Activity,
  FileText,
  BatteryCharging,
  CheckCircle2,
} from 'lucide-react';
import { CORE_SERVICES, ServiceItem } from '@/data/companyData';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenQuoteModal: (serviceTitle?: string) => void;
}

export function ServicesSection({ onSelectService, onOpenQuoteModal }: ServicesSectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Box':
        return <Box className="w-5 h-5 text-brand-cyan" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-brand-cyan" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-brand-cyan" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-brand-cyan" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-brand-cyan" />;
      case 'BatteryCharging':
        return <BatteryCharging className="w-5 h-5 text-brand-cyan" />;
      default:
        return <Activity className="w-5 h-5 text-brand-cyan" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-brand-cyan text-xs font-semibold tracking-wider uppercase">
              <span className="text-brand-cyan text-sm">✛</span>
              <span>Our Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text tracking-tight max-w-2xl leading-tight">
              Comprehensive Power Solutions <br className="hidden sm:inline" />
              for Critical Infrastructure.
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onOpenQuoteModal()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan hover:text-brand-cyan-hover transition-colors group"
          >
            <span>View All Services & Inquire</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Services Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_SERVICES.map((service) => {
            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service)}
                className="group relative rounded-2xl bg-brand-card/90 border border-brand-border/80 hover:border-brand-cyan/60 hover:shadow-cyan-glow-sm transition-all duration-300 flex overflow-hidden cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectService(service);
                  }
                }}
                aria-label={`View details for ${service.title}`}
              >
                {/* Left content container */}
                <div className="p-6 flex flex-col justify-between flex-1 z-10 min-w-0 pr-3">
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-brand-secondary border border-brand-border flex items-center justify-center shrink-0 group-hover:border-brand-cyan/40 group-hover:scale-105 transition-all">
                      {getIcon(service.icon)}
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-brand-text group-hover:text-brand-cyan transition-colors leading-snug">
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-brand-muted line-clamp-3 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Learn More / Arrow trigger */}
                  <div className="pt-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-brand-secondary/80 border border-brand-border flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan group-hover:text-[#071321] group-hover:border-brand-cyan transition-all duration-200">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-xs font-semibold text-brand-muted group-hover:text-brand-text transition-colors">
                      Learn More
                    </span>
                  </div>
                </div>

                {/* Right side image container (matching mockup composition) */}
                <div className="w-32 sm:w-36 relative shrink-0 overflow-hidden bg-brand-secondary/40 border-l border-brand-border/40">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    sizes="(max-width: 768px) 120px, 150px"
                  />
                  {/* Subtle vertical gradient blending */}
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-card via-transparent to-transparent opacity-80" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
