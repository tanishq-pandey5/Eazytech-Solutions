'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Phone, Mail } from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY_DETAILS } from '@/data/companyData';

interface NavbarProps {
  onOpenQuoteModal: (preselectedService?: string) => void;
}

export function Navbar({ onOpenQuoteModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Simple scrollspy
      const sections = ['home', 'services', 'technology', 'industries', 'how-we-work', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Industries', href: '#industries', id: 'industries' },
    { label: 'Technology', href: '#technology', id: 'technology' },
    { label: 'Resources', href: '#resources', id: 'resources' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#071321]/90 backdrop-blur-md border-b border-[rgba(115,160,190,0.22)] py-3 shadow-lg'
            : 'bg-[#071321]/70 backdrop-blur-sm border-b border-[rgba(115,160,190,0.12)] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo size="sm" />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    className={`text-sm font-medium transition-colors relative py-1 focus:outline-none focus-visible:text-brand-cyan ${
                      isActive
                        ? 'text-brand-cyan font-semibold'
                        : 'text-brand-muted hover:text-brand-text'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-cyan rounded-full animate-in fade-in" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                type="button"
                onClick={() => onOpenQuoteModal()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-cyan text-[#071321] hover:bg-brand-cyan-hover shadow-cyan-glow-sm transition-all duration-200 active:scale-95"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-card focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`fixed right-0 top-0 bottom-0 w-full max-w-sm bg-brand-secondary border-l border-brand-border p-6 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-brand-border">
              <Logo size="sm" showSubtitle={false} />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-brand-muted hover:text-brand-text focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="mt-8 flex flex-col space-y-4" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-base font-medium text-brand-text hover:bg-brand-card hover:text-brand-cyan transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-brand-border space-y-4">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider bg-brand-cyan text-[#071321] hover:bg-brand-cyan-hover shadow-cyan-glow transition-all"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-xs text-brand-muted space-y-2">
              <a
                href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                className="flex items-center gap-2 hover:text-brand-cyan transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-cyan" />
                <span>{COMPANY_DETAILS.contactPhone}</span>
              </a>
              <a
                href={`mailto:${COMPANY_DETAILS.contactEmail}`}
                className="flex items-center gap-2 hover:text-brand-cyan transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-brand-cyan" />
                <span>{COMPANY_DETAILS.contactEmail}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
