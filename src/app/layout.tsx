import type { Metadata, Viewport } from 'next';
import './globals.css';
import { COMPANY_DETAILS } from '@/data/companyData';

export const viewport: Viewport = {
  themeColor: '#071321',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Eazy Tech Solutions | Critical Power Infrastructure',
  description:
    'End-to-End Critical Power Infrastructure. Sales, Service, Testing, and Electrical Consultancy for UPS systems, battery diagnostics, AMC/CAMC, power quality audits, and Netman 204 SNMP monitoring.',
  keywords: [
    'Critical Power Infrastructure',
    'UPS Systems Supply',
    'Industrial Battery Banks',
    'UPS AMC CAMC Ghaziabad Noida Delhi',
    'Battery Impedance Testing IEEE 1188',
    'Power Quality Energy Audits THD',
    'Netman 204 SNMP Card Configuration',
    'Emergency Breakdown Repair UPS',
    'Eazy Tech Solutions',
  ],
  authors: [{ name: 'Eazy Tech Solutions' }],
  metadataBase: new URL('https://eazytechsolutions.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Eazy Tech Solutions | End-to-End Critical Power Infrastructure',
    description:
      'Powering the infrastructure that powers your business. Online double-conversion UPS, preventive maintenance, IEEE 1188 diagnostics, and smart SNMP telemetry.',
    url: 'https://eazytechsolutions.com',
    siteName: 'Eazy Tech Solutions',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/hero-datacenter-hd.jpg',
        width: 1200,
        height: 630,
        alt: 'Eazy Tech Solutions Critical Power Infrastructure Data Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eazy Tech Solutions | Critical Power Infrastructure',
    description:
      'Industrial UPS systems, battery impedance testing, AMC/CAMC contracts, and Netman 204 SNMP monitoring.',
    images: ['/images/hero-datacenter-hd.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.ico',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: COMPANY_DETAILS.name,
    legalName: COMPANY_DETAILS.legalName,
    description: COMPANY_DETAILS.brochureMission,
    url: 'https://eazytechsolutions.com',
    telephone: COMPANY_DETAILS.contactPhone,
    email: COMPANY_DETAILS.contactEmail,
    taxID: COMPANY_DETAILS.gstin,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_DETAILS.registeredOffice.line1,
      addressLocality: COMPANY_DETAILS.registeredOffice.city,
      addressRegion: COMPANY_DETAILS.registeredOffice.state,
      postalCode: COMPANY_DETAILS.registeredOffice.pincode,
      addressCountry: 'IN',
    },
    openingHours: 'Mo-Sa 09:00-19:00',
    areaServed: 'India',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Critical Power Infrastructure Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'UPS and Battery Sales & Supply',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Annual Maintenance Contracts (AMC & CAMC)',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Emergency Breakdown & Repair Maintenance',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Power Quality & Energy Audits',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Battery Impedance, Conductance & Capacity Testing',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Smart SNMP Power Telemetry and Remote Monitoring',
          },
        },
      ],
    },
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-brand-bg text-brand-text antialiased selection:bg-brand-cyan/20 selection:text-brand-cyan min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
