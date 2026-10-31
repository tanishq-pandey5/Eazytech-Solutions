'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  FileCheck,
  Layers,
  ChevronLeft,
  ChevronRight,
  Images,
} from 'lucide-react';
import { ServiceItem } from '@/data/companyData';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenQuoteModal: (serviceTitle?: string) => void;
}

export function ServiceDetailModal({
  service,
  onClose,
  onOpenQuoteModal,
}: ServiceDetailModalProps) {
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (service) {
      setSelectedImage(service.image);
    }
  }, [service]);

  if (!service) return null;

  const gallery =
    service.gallery && service.gallery.length > 0
      ? service.gallery
      : [service.image];
  const activeImage = selectedImage || service.image;
  const currentIndex = Math.max(0, gallery.indexOf(activeImage));

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = (currentIndex - 1 + gallery.length) % gallery.length;
    setSelectedImage(gallery[prevIdx]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (currentIndex + 1) % gallery.length;
    setSelectedImage(gallery[nextIdx]);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-service-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-brand-secondary border border-brand-border rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        {/* Header with image */}
        <div className="relative h-56 sm:h-64 w-full bg-brand-bg group">
          <Image
            src={activeImage}
            alt={service.title}
            fill
            className="object-cover object-center brightness-90 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-brand-secondary/50 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#071321]/80 text-brand-muted hover:text-brand-text hover:bg-[#071321] border border-brand-border transition-colors z-20"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Gallery badge if multiple */}
          {gallery.length > 1 && (
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-[#071321]/85 backdrop-blur-md px-3 py-1 rounded-full border border-brand-border text-[11px] font-mono text-brand-cyan">
              <Images className="w-3.5 h-3.5" />
              <span>
                Cable Showcase {currentIndex + 1} / {gallery.length}
              </span>
            </div>
          )}

          {/* Prev/Next arrows if multiple */}
          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#071321]/80 text-brand-text hover:bg-brand-cyan hover:text-[#071321] border border-brand-border transition-all z-20 shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#071321]/80 text-brand-text hover:bg-brand-cyan hover:text-[#071321] border border-brand-border transition-all z-20 shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Badge & Title */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
              {service.tag}
            </span>
            <h3
              id="modal-service-title"
              className="text-xl sm:text-2xl font-bold text-brand-text mt-2 drop-shadow-sm"
            >
              {service.title}
            </h3>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Multi-image thumbnail strip for consolidated cable gallery */}
          {gallery.length > 1 && (
            <div className="p-3.5 rounded-xl bg-brand-card/90 border border-brand-border/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase text-brand-cyan tracking-wider flex items-center gap-1.5">
                  <Images className="w-3.5 h-3.5" />
                  <span>Consolidated Cable Product Views</span>
                </span>
                <span className="text-[10px] text-brand-muted">
                  Click thumbnail to inspect
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {gallery.map((imgUrl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative h-14 rounded-lg overflow-hidden border transition-all ${
                      activeImage === imgUrl
                        ? 'border-brand-cyan ring-2 ring-brand-cyan/40 scale-[1.02]'
                        : 'border-brand-border/60 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`${service.title} view ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Full description */}
          <div>
            <h4 className="text-xs font-mono uppercase text-brand-cyan tracking-wider mb-2">
              Engineering Overview
            </h4>
            <p className="text-sm text-brand-muted leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Technical Scope */}
          <div className="p-4 rounded-xl bg-brand-card/80 border border-brand-border/80">
            <h4 className="text-xs font-mono uppercase text-brand-cyan tracking-wider mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Scope & Technical Capabilities</span>
            </h4>
            <p className="text-xs sm:text-sm text-brand-text mt-1.5 leading-relaxed">
              {service.scope}
            </p>
          </div>

          {/* Client Deliverables */}
          <div>
            <h4 className="text-xs font-mono uppercase text-brand-cyan tracking-wider mb-3 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5" />
              <span>Official Deliverables & Compliance</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-brand-muted bg-brand-card/40 p-2.5 rounded-lg border border-brand-border/40"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {service.standards && (
            <div className="flex items-center gap-2 text-xs text-brand-cyan/90 bg-brand-cyan/10 px-3 py-2 rounded-lg border border-brand-cyan/20">
              <ShieldCheck className="w-4 h-4 shrink-0 text-brand-cyan" />
              <span>Standard Compliance: {service.standards}</span>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-6 bg-brand-card/90 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold text-brand-muted hover:text-brand-text transition-colors order-2 sm:order-1"
          >
            Close Overview
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenQuoteModal(service.title);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-cyan text-[#071321] hover:bg-brand-cyan-hover shadow-cyan-glow-sm transition-all order-1 sm:order-2"
          >
            <span>
              {service.category === 'product'
                ? 'Request Product Quotation'
                : 'Request Service Quotation'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
