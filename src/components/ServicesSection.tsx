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
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';
import {
  PRODUCTS_LIST,
  SERVICES_LIST,
  ALL_OFFERINGS,
  CABLE_GALLERY,
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
  const [activeCableIndex, setActiveCableIndex] = useState(0);

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

  const handlePrevCable = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCableIndex((prev) => (prev === 0 ? CABLE_GALLERY.length - 1 : prev - 1));
  };

  const handleNextCable = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCableIndex((prev) => (prev === CABLE_GALLERY.length - 1 ? 0 : prev + 1));
  };

  // Standalone offerings in grid (Cables consolidated into DC Cables Showcase)
  const nonCableOfferings = (
    activeTab === 'all'
      ? ALL_OFFERINGS
      : activeTab === 'products'
      ? PRODUCTS_LIST
      : SERVICES_LIST
  ).filter((item) => item.id !== 'dc-cables' && item.id !== 'uninyvin-cables' && item.id !== 'miracle-cables');

  const showCablesShowcase = activeTab === 'all' || activeTab === 'products';

  const dcCableProduct = PRODUCTS_LIST.find((p) => p.id === 'dc-cables') || PRODUCTS_LIST[2];
  const uninyvinProduct = PRODUCTS_LIST.find((p) => p.id === 'uninyvin-cables') || PRODUCTS_LIST[3];
  const miracleProduct = PRODUCTS_LIST.find((p) => p.id === 'miracle-cables') || PRODUCTS_LIST[4];

  const currentCable = CABLE_GALLERY[activeCableIndex];

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
              <span>Hardware & Cables</span>
            </span>
            <span className="text-brand-border">|</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#56E0F8]" />
              <span>Diagnostics & Maintenance</span>
            </span>
          </div>
        </div>

        {/* MAIN SHOWCASE: CONSOLIDATED DC CABLES SHOWCASE (When All or Products Tab is Active) */}
        {showCablesShowcase && (
          <div className="mb-8 rounded-3xl bg-brand-card/95 border border-brand-cyan/40 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
            {/* Ambient cyan glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: DC Cables Showcase Info & 3 Product Categories */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-[11px] font-mono uppercase px-3 py-1 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 font-semibold tracking-wider">
                    MAIN CABLE PRODUCT SHOWCASE
                  </span>
                  <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-full bg-brand-secondary text-brand-muted border border-brand-border">
                    Power Distribution Solutions
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-text tracking-tight">
                    DC Cables & Industrial Cabling
                  </h3>
                  <p className="text-sm text-brand-muted mt-2 leading-relaxed">
                    Heavy-duty flexible DC power cables engineered specifically for low voltage-drop connections
                    between industrial battery banks and UPS inverter rectifiers. Consolidates our full range of
                    power cables, extreme-duty Uninyvin cables, and ultra-flexible Miracle cables.
                  </p>
                </div>

                {/* 3 Confirmed Product Categories with Descriptions */}
                <div className="space-y-3 pt-1">
                  <span className="text-xs font-mono uppercase text-brand-cyan tracking-wider font-semibold block">
                    Product Categories Included:
                  </span>

                  <div className="grid grid-cols-1 gap-2.5">
                    {/* Category 1: DC Cables */}
                    <div
                      onClick={() => {
                        setActiveCableIndex(0);
                        onSelectService(dcCableProduct);
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        activeCableIndex === 0
                          ? 'bg-brand-secondary border-brand-cyan/60 shadow-cyan-glow-sm'
                          : 'bg-brand-secondary/50 border-brand-border/60 hover:border-brand-border hover:bg-brand-secondary/80'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center shrink-0 text-brand-cyan mt-0.5">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-brand-text">1. DC Cables</h4>
                            <span className="text-[10px] font-mono text-brand-cyan">Active View</span>
                          </div>
                          <p className="text-xs text-brand-muted mt-0.5">
                            DC power cable solutions.
                          </p>
                        </div>
                      </div>
                      <Eye className="w-4 h-4 text-brand-cyan shrink-0 mt-1" />
                    </div>

                    {/* Category 2: Uninyvin Cables */}
                    <div
                      onClick={() => {
                        setActiveCableIndex(1);
                        onSelectService(uninyvinProduct);
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        activeCableIndex === 1
                          ? 'bg-brand-secondary border-brand-cyan/60 shadow-cyan-glow-sm'
                          : 'bg-brand-secondary/50 border-brand-border/60 hover:border-brand-border hover:bg-brand-secondary/80'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center shrink-0 text-brand-cyan mt-0.5">
                          <ShieldAlert className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-brand-text">2. Uninyvin Cables</h4>
                            <span className="text-[10px] font-mono text-brand-muted/80">Heat & Oil Resistant</span>
                          </div>
                          <p className="text-xs text-brand-muted mt-0.5">
                            Specialized Uninyvin cable solutions.
                          </p>
                        </div>
                      </div>
                      <Eye className="w-4 h-4 text-brand-muted hover:text-brand-cyan shrink-0 mt-1" />
                    </div>

                    {/* Category 3: Miracle Cables */}
                    <div
                      onClick={() => {
                        setActiveCableIndex(2);
                        onSelectService(miracleProduct);
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        activeCableIndex === 2
                          ? 'bg-brand-secondary border-brand-cyan/60 shadow-cyan-glow-sm'
                          : 'bg-brand-secondary/50 border-brand-border/60 hover:border-brand-border hover:bg-brand-secondary/80'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center shrink-0 text-brand-cyan mt-0.5">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-brand-text">3. Miracle Cables</h4>
                            <span className="text-[10px] font-mono text-brand-muted/80">Ultra-Flexible</span>
                          </div>
                          <p className="text-xs text-brand-muted mt-0.5">
                            Miracle cable products and solutions.
                          </p>
                        </div>
                      </div>
                      <Eye className="w-4 h-4 text-brand-muted hover:text-brand-cyan shrink-0 mt-1" />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onSelectService(dcCableProduct)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-cyan text-[#071321] hover:bg-brand-cyan-hover shadow-cyan-glow-sm transition-all"
                  >
                    <span>View Technical Specifications</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal('DC Cables')}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold text-brand-text bg-brand-secondary border border-brand-border hover:border-brand-cyan/60 transition-all"
                  >
                    <span>Request Cable Quotation</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Interactive Cable Carousel & Gallery */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <div className="w-full relative rounded-2xl overflow-hidden bg-brand-secondary border border-brand-border shadow-xl group">
                  {/* Image Viewport */}
                  <div className="relative h-72 sm:h-84 md:h-96 w-full">
                    <Image
                      src={currentCable.image}
                      alt={currentCable.title}
                      fill
                      className="object-cover object-center transition-all duration-500"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071321] via-transparent to-transparent opacity-80" />

                    {/* Navigation Arrows */}
                    <button
                      type="button"
                      onClick={handlePrevCable}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#071321]/80 border border-brand-border flex items-center justify-center text-brand-text hover:text-brand-cyan hover:border-brand-cyan transition-all backdrop-blur-sm"
                      aria-label="Previous cable image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextCable}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#071321]/80 border border-brand-border flex items-center justify-center text-brand-text hover:text-brand-cyan hover:border-brand-cyan transition-all backdrop-blur-sm"
                      aria-label="Next cable image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Active Caption Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-brand-card/90 border border-brand-border/80 backdrop-blur-md flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-brand-cyan/20 text-brand-cyan font-semibold">
                            {currentCable.tag}
                          </span>
                          <span className="text-[11px] font-mono text-brand-muted">
                            {currentCable.category}
                          </span>
                        </div>
                        <h5 className="text-sm font-bold text-brand-text mt-1">
                          {currentCable.title}
                        </h5>
                      </div>
                      <span className="text-xs font-mono text-brand-cyan font-bold">
                        0{activeCableIndex + 1} / 0{CABLE_GALLERY.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Thumbnails Strip */}
                <div className="grid grid-cols-4 gap-2.5 w-full mt-3">
                  {CABLE_GALLERY.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveCableIndex(idx)}
                      className={`relative h-16 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                        activeCableIndex === idx
                          ? 'border-brand-cyan ring-2 ring-brand-cyan/30'
                          : 'border-brand-border/70 opacity-60 hover:opacity-100 hover:border-brand-border'
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover object-center"
                        sizes="100px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Offerings Grid (UPS Systems, Batteries, Link Sets, and Technical Services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nonCableOfferings.map((item) => {
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
                onClick={() => onOpenQuoteModal('DC Cables')}
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
                harmonic disturbances, verify battery health and internal impedance, and maintain uptime
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
