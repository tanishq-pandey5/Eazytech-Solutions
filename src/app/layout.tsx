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
  title: 'Eazy Tech Solutions | End-to-End Critical Power Service Provider',
  description:
    'Your trusted partner for reliable power solutions, delivering UPS systems, battery solutions, power audits, maintenance, testing, and technical consultancy to keep your operations running without interruption.',
  keywords: [
    'Critical Power Service Provider',
    'UPS Systems Supply',
    'Industrial Batteries Backup',
    'DC Power Cables',
    'Uninyvin Cables',
    'Miracle Cables',
    'Battery Link Sets Busbars',
    'Power Audit Class A',
    'Electrical Load Study',
    'Battery Impedance Testing IEEE 1188',
    'UPS AMC CAMC Ghaziabad Noida Delhi',
    'UPS Repair 24/7 Breakdown Response',
    'Industrial Power Consultancy',
    'Netman 204 SNMP Remote Monitoring',
    'Eazy Tech Solutions',
  ],
  authors: [{ name: 'Eazy Tech Solutions' }],
  metadataBase: new URL('https://eazytechsolutions.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Eazy Tech Solutions | End-to-End Critical Power Service Provider',
    description:
      'Your trusted partner for reliable power solutions, delivering UPS systems, battery solutions, power audits, maintenance, testing, and technical consultancy to keep your operations running without interruption.',
    url: 'https://eazytechsolutions.com',
    siteName: 'Eazy Tech Solutions',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/hero-datacenter-hd.jpg',
        width: 1200,
        height: 630,
        alt: 'Eazy Tech Solutions End-to-End Critical Power Service Provider',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eazy Tech Solutions | End-to-End Critical Power Service Provider',
    description:
      'Industrial UPS systems, battery solutions, specialized power cables, power audits, load studies, battery impedance testing, UPS AMC, repairs, and power consultancy.',
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
      name: 'Critical Power Products and Technical Services',
      itemListElement: [
        // Products (6)
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'UPS Systems',
            description: 'Supply and solutions for Uninterruptible Power Supply systems.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Batteries',
            description: 'Battery supply and solutions for critical power backup applications.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'DC Cables',
            description: 'DC power cable solutions.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Uninyvin Cables',
            description: 'Specialized Uninyvin cable solutions.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Miracle Cables',
            description: 'Miracle cable products and solutions.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Battery Link Sets',
            description: 'Battery interconnection and linking solutions.',
          },
        },
        // Services (6)
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Power Audit',
            description: 'Assessment and evaluation of existing power infrastructure.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Load Study',
            description: 'Analysis of electrical loads and power requirements.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Battery Impedance Testing',
            description: 'Testing and evaluation of battery health and performance.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'UPS AMC (Annual Maintenance Contract)',
            description: 'Preventive maintenance and ongoing UPS support.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'UPS Repair',
            description: 'UPS troubleshooting, diagnostics, and repair services.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Power Consultancy',
            description: 'Professional technical guidance and consultancy for critical power requirements.',
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
