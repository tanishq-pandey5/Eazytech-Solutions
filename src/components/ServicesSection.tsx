'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Zap,
  BatteryCharging,
  Layers,
  ShieldAlert,
  Sparkles,
  Boxes,
  Activity,
  FileCheck,
  Wrench,
  FileText,
  Package,
  Cpu,
  CheckCircle2,
} from 'lucide-react';
import {
  PRODUCTS_LIST,
  SERVICES_LIST,
  ALL_OFFERINGS,
  OfferingItem,
  ServiceItem,
} from '@/data/companyData';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenQuoteModal: (serviceTitle?: string) => void;
}

type TabType = 'all' | 'products' | 'services';

export function ServicesSection({ onSelectService, onOpenQuoteModal }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-5 h-5 text-brand-cyan" />;
      case 'BatteryCharging':
        return <BatteryCharging className="w-5 h-5 text-brand-cyan" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-brand-cyan" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-brand-cyan" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-brand-cyan" />;
      case 'Boxes':
        return <Boxes className="w-5 h-5 text-brand-cyan" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-brand-cyan" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-brand-cyan" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-brand-cyan" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-brand-cyan" />;
      default:
        return <Cpu className="w-5 h-5 text-brand-cyan" />;
    }
  };

  const displayedOfferings =
    activeTab === 'all'
      ? ALL_OFFERINGS
      : activeTab === 'products'
      ? PRODUCTS_LIST
      : SERVICES_LIST;

  return (
    <section id="services" className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Decorative gradient glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-brand-cyan text-xs font-semibold tracking-wider uppercase font-mono">
              <span className="text-brand-cyan text-sm">✛</span>
              <span>Our Offerings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text tracking-tight max-w-2xl leading-tight">
              Products & Technical Services <br className="hidden sm:inline" />
              for Critical Power Continuity.
            </h2>
            <p className="text-sm text-brand-muted max-w-2xl leading-relaxed">
              Explore our complete portfolio spanning industrial UPS hardware, backup battery banks,
              heavy-duty cables, diagnostics, maintenance, and technical consultancy.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenQuoteModal()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan hover:text-brand-cyan-hover transition-colors group self-start md:self-end shrink-0"
          >
            <span>Request a Custom Quote</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Tabs: Products & Solutions vs Technical Services */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-4 border-b border-brand-border/40">
          <div className="inline-flex p-1.5 rounded-xl bg-brand-secondary/80 border border-brand-border/80 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'all'
                  ? 'bg-brand-cyan text-[#071321] shadow-cyan-glow-sm'
                  : 'text-brand-muted hover:text-brand-text hover:bg-brand-card/50'
              }`}
            >
              <span>All Offerings</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  activeTab === 'all' ? 'bg-[#071321]/20 text-[#071321]' : 'bg-brand-card text-brand-muted'
                }`}
              >
                12
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'products'
                  ? 'bg-brand-cyan text-[#071321] shadow-cyan-glow-sm'
                  : 'text-brand-muted hover:text-brand-text hover:bg-brand-card/50'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Products & Solutions</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  activeTab === 'products' ? 'bg-[#071321]/20 text-[#071321]' : 'bg-brand-card text-brand-muted'
                }`}
              >
                6
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'services'
                  ? 'bg-brand-cyan text-[#071321] shadow-cyan-glow-sm'
                  : 'text-brand-muted hover:text-brand-text hover:bg-brand-card/50'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Technical Services</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  activeTab === 'services' ? 'bg-[#071321]/20 text-[#071321]' : 'bg-brand-card text-brand-muted'
                }`}
              >
                6
              </span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-brand-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-cyan" />
              <span>Hardware & Accessories</span>
            </span>
            <span className="text-brand-border">|</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#56E0F8]" />
              <span>Engineering & Diagnostics</span>
            </span>
          </div>
        </div>

        {/* 12 Offerings Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedOfferings.map((item) => {
            const isProduct = item.category === 'product';
            return (
              <div
                key={item.id}
                onClick={() => onSelectService(item)}
                className="group relative rounded-2xl bg-brand-card/90 border border-brand-border/80 hover:border-brand-cyan/60 hover:shadow-cyan-glow-sm transition-all duration-300 flex overflow-hidden cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectService(item);
                  }
                }}
                aria-label={`View technical specifications for ${item.title}`}
              >
                {/* Left content container */}
                <div className="p-6 flex flex-col justify-between flex-1 z-10 min-w-0 pr-3">
                  <div className="space-y-3">
                    {/* Category Pill & Icon */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-brand-secondary border border-brand-border flex items-center justify-center shrink-0 group-hover:border-brand-cyan/40 group-hover:scale-105 transition-all">
                        {getIcon(item.icon)}
                      </div>

                      <span
                        className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-semibold border ${
                          isProduct
                            ? 'bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30'
                            : 'bg-sky-400/15 text-[#56E0F8] border-sky-400/30'
                        }`}
                      >
                        {isProduct ? 'Product' : 'Service'}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-brand-text group-hover:text-brand-cyan transition-colors leading-snug pt-1">
                      {item.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-brand-muted line-clamp-3 leading-relaxed">
                      {item.shortDescription}
                    </p>
                  </div>

                  {/* Learn More / Arrow trigger */}
                  <div className="pt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-brand-secondary/80 border border-brand-border flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan group-hover:text-[#071321] group-hover:border-brand-cyan transition-all duration-200">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs font-semibold text-brand-muted group-hover:text-brand-text transition-colors">
                        Learn More
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-brand-muted/60 group-hover:text-brand-cyan/80 transition-colors">
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Right side image container */}
                <div className="w-32 sm:w-36 relative shrink-0 overflow-hidden bg-brand-secondary/40 border-l border-brand-border/40">
                  <Image
                    src={item.image}
                    alt={item.title}
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

        {/* Bottom Highlights: Side-by-Side Category Breakdown */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 pt-12 border-t border-brand-border/40">
          {/* Products Summary Card */}
          <div className="p-6 rounded-2xl bg-brand-card/60 border border-brand-border/70 hover:border-brand-cyan/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-brand-cyan font-bold tracking-wider mb-2">
                <Package className="w-4 h-4" />
                <span>Products & Solutions Portfolio</span>
              </div>
              <h3 className="text-lg font-bold text-brand-text mb-2">
                Critical Power Equipment & Distribution Hardware
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed mb-4">
                Engineered hardware for mission-critical continuity, from double-conversion UPS systems
                and industrial batteries to specialized low-loss DC cables, Uninyvin cables, Miracle cables,
                and busbar link sets.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-brand-muted">
                {PRODUCTS_LIST.map((prod) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => onSelectService(prod)}
                    className="flex items-center gap-2 text-left hover:text-brand-cyan transition-colors py-1 group/btn"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                    <span className="group-hover/btn:underline">{prod.title}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-6">
              <button
                type="button"
                onClick={() => onOpenQuoteModal('UPS Systems')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-brand-cyan hover:text-brand-cyan-hover"
              >
                <span>Request Product Specifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Technical Services Summary Card */}
          <div className="p-6 rounded-2xl bg-brand-card/60 border border-brand-border/70 hover:border-brand-cyan/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#56E0F8] font-bold tracking-wider mb-2">
                <Wrench className="w-4 h-4" />
                <span>Technical Services & SLA Support</span>
              </div>
              <h3 className="text-lg font-bold text-brand-text mb-2">
                Diagnostics, Preventative Maintenance & Consultancy
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed mb-4">
                Field-proven engineering services to maximize electrical system reliability, eliminate
                harmonic disturbances, verify battery health via IEEE 1188 testing, and maintain uptime
                through guaranteed AMC contracts and 24/7 repair response.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-brand-muted">
                {SERVICES_LIST.map((serv) => (
                  <button
                    key={serv.id}
                    type="button"
                    onClick={() => onSelectService(serv)}
                    className="flex items-center gap-2 text-left hover:text-brand-cyan transition-colors py-1 group/btn"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                    <span className="group-hover/btn:underline">{serv.title}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-6">
              <button
                type="button"
                onClick={() => onOpenQuoteModal('Power Audit')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-brand-cyan hover:text-brand-cyan-hover"
              >
                <span>Schedule a Technical Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
