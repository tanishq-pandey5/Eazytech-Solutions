export interface OfferingItem {
  id: string;
  category: 'product' | 'service';
  title: string;
  shortTitle: string;
  shortDescription: string;
  fullDescription: string;
  scope: string;
  deliverables: string[];
  icon: string;
  image: string;
  gallery?: string[];
  tag: string;
  standards?: string;
}

export type ServiceItem = OfferingItem;

export interface IndustryItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  criticality: string;
  recommendedServices: string[];
  image: string;
}

export interface ProcessStep {
  step: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export const COMPANY_DETAILS = {
  name: "Eazy Tech Solutions",
  legalName: "EAZY TECH SOLUTIONS",
  tagline: "End-to-End Critical Power Service Provider",
  positioning: "Sales • Service • Testing • Electrical Consultancy",
  brochureMission:
    "Your trusted partner for reliable power solutions, delivering UPS systems, battery solutions, power audits, maintenance, testing, and technical consultancy to keep your operations running without interruption.",
  gstin: "09FALPP6353P1ZN",
  stateJurisdiction: "Uttar Pradesh (09)",
  contactEmail: "eazytechsolutions@hotmail.com",
  contactPhone: "+91 74289 77714",
  formattedPhone: "+91 74289 77714",
  phoneRaw: "+917428977714",
  registeredOffice: {
    line1: "F2, B-253, Shalimar Garden Main",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    pincode: "201005",
    country: "India",
    fullAddress: "F2, B-253, Shalimar Garden Main, Ghaziabad, Uttar Pradesh - 201005",
  },
  operatingHours: "24/7 Emergency Dispatch / Mon - Sat: 9:00 AM - 7:00 PM IST",
  uptimeCommitment: "99.99% Uptime Assurance",
  responseSLA: "Rapid on-site technician deployment within committed SLA hours",
};

export const CORE_CAPABILITIES = [
  {
    id: "power-systems",
    title: "Reliable Power Systems",
    shortTitle: "UPS & Battery Systems",
    description: "Online double-conversion UPS systems and industrial battery banks designed for zero-break power transfer.",
    icon: "Zap",
  },
  {
    id: "preventive-maintenance",
    title: "Preventive Maintenance",
    shortTitle: "Maintenance Services",
    description: "Scheduled comprehensive maintenance and condition monitoring to prevent premature equipment wear and thermal runaway.",
    icon: "Wrench",
  },
  {
    id: "advanced-diagnostics",
    title: "Advanced Diagnostics",
    shortTitle: "Power Diagnostics",
    description: "Class-A power quality audits, harmonic distortion profiling, and cell-level battery impedance testing.",
    icon: "Activity",
  },
  {
    id: "remote-monitoring",
    title: "Remote Monitoring",
    shortTitle: "Remote Monitoring",
    description: "Smart SNMP v1/v2c/v3 telemetry integration with SNMP interface cards for real-time alerts and BMS integration.",
    icon: "Monitor",
  },
];

/**
 * Confirmed Products (6)
 */
export const PRODUCTS_LIST: OfferingItem[] = [
  {
    id: "ups-systems",
    category: "product",
    title: "UPS Systems",
    shortTitle: "UPS Systems",
    shortDescription: "Supply and solutions for Uninterruptible Power Supply systems.",
    fullDescription:
      "High-efficiency Online Double Conversion UPS systems and modular scalable power architectures. We calculate exact runtime requirements and deliver load-matched, zero-break power protection for data centers, industrial plants, and critical IT environments.",
    scope:
      "Supply of Online Double Conversion UPS systems (10 kVA to 500+ kVA), scalable modular architectures, single-phase and three-phase industrial units.",
    deliverables: [
      "OEM warranty-backed UPS equipment supply",
      "Load-matched runtime and sizing calculations",
      "Safe on-site mechanical placement & cabling",
      "Pre-commissioning electrical verification & testing",
    ],
    icon: "Zap",
    image: "/images/service-ups-hd.jpg",
    tag: "Power Backup Hardware",
    standards: "OEM Certified Standards",
  },
  {
    id: "batteries",
    category: "product",
    title: "Batteries",
    shortTitle: "Batteries",
    shortDescription: "Battery supply and solutions for critical power backup applications.",
    fullDescription:
      "Engineered battery supply and energy storage solutions for mission-critical backup autonomy. We supply high-rate discharge industrial batteries designed for high cyclic endurance and reliable power delivery during grid interruptions.",
    scope:
      "Supply of industrial Sealed Maintenance Free (SMF) VRLA batteries, high-durability Tubular batteries, and advanced Lithium Iron Phosphate (LiFePO4) storage banks.",
    deliverables: [
      "Fresh batch cell delivery with OEM warranty",
      "Precision string sizing and ampere-hour (Ah) matching",
      "Heavy-duty tier rack supply and mounting",
      "Post-installation float voltage and impedance baseline check",
    ],
    icon: "BatteryCharging",
    image: "/images/service-battery-testing-hd.jpg",
    tag: "Energy Storage",
    standards: "OEM & Industrial Battery Standards",
  },
  {
    id: "dc-cables",
    category: "product",
    title: "DC Cables",
    shortTitle: "DC Cables",
    shortDescription: "DC power cable solutions.",
    fullDescription:
      "Heavy-duty flexible DC power cables engineered specifically for low voltage-drop connections between industrial battery banks and UPS inverter rectifiers. Includes specialized Uninyvin and ultra-flexible Miracle cable solutions.",
    scope:
      "High-amperage, double-insulated flexible copper DC cables with flame-retardant outer sheathing rated for high DC current draws and continuous duty, alongside specialized and flexible cable variants.",
    deliverables: [
      "99.9% electrolytic grade high-conductivity copper conductors",
      "Flame-retardant, heat-resistant insulation",
      "Precision factory-crimped terminal lugs with heat-shrink boots",
      "Voltage-drop calculation and cross-section validation",
    ],
    icon: "Layers",
    image: "/images/product-dc-cables-hd.jpg",
    gallery: [
      "/images/product-dc-cables-hd.jpg",
      "/images/product-uninyvin-cables-hd.jpg",
      "/images/product-miracle-cables-hd.jpg",
      "/images/product-battery-links-hd.jpg",
    ],
    tag: "Power Distribution",
    standards: "IS & IEC Power Cable Standards",
  },
  {
    id: "uninyvin-cables",
    category: "product",
    title: "Uninyvin Cables",
    shortTitle: "Uninyvin Cables",
    shortDescription: "Specialized Uninyvin cable solutions.",
    fullDescription:
      "Specialized high-temperature and chemical-resistant Uninyvin power cables designed for harsh industrial, aircraft ground power, and demanding critical backup installations.",
    scope:
      "Supply of specialized Uninyvin cables with composite heat-resistant nylon and vinyl insulation, offering extreme durability against oils, fuels, and thermal stress.",
    deliverables: [
      "High thermal endurance (-50°C to +105°C operating range)",
      "High dielectric insulation strength and abrasion resistance",
      "Pre-cut custom run lengths with certified end terminations",
      "Industrial compliance documentation",
    ],
    icon: "ShieldAlert",
    image: "/images/product-uninyvin-cables-hd.jpg",
    gallery: [
      "/images/product-dc-cables-hd.jpg",
      "/images/product-uninyvin-cables-hd.jpg",
      "/images/product-miracle-cables-hd.jpg",
      "/images/product-battery-links-hd.jpg",
    ],
    tag: "Specialized Cables",
    standards: "Def-Stan & Industrial Specifications",
  },
  {
    id: "miracle-cables",
    category: "product",
    title: "Miracle Cables",
    shortTitle: "Miracle Cables",
    shortDescription: "Miracle cable products and solutions.",
    fullDescription:
      "Premium Miracle ultra-flexible multi-strand power cables engineered for maximum current-carrying efficiency and effortless routing in compact electrical enclosures and battery cabinets.",
    scope:
      "Supply of high-flexibility Miracle multi-strand cables with tinned copper conductors, minimal electrical resistance, and superior thermal dissipation properties.",
    deliverables: [
      "High-purity tinned copper strands for maximum corrosion resistance",
      "Ultra-high flexibility for tight-bend-radius routing",
      "Reduced I²R resistance losses under high continuous load",
      "Ready-to-install custom harness configurations",
    ],
    icon: "Sparkles",
    image: "/images/product-miracle-cables-hd.jpg",
    gallery: [
      "/images/product-dc-cables-hd.jpg",
      "/images/product-uninyvin-cables-hd.jpg",
      "/images/product-miracle-cables-hd.jpg",
      "/images/product-battery-links-hd.jpg",
    ],
    tag: "Flexible Power Cables",
    standards: "High-Conductivity Standards",
  },
  {
    id: "battery-link-sets",
    category: "product",
    title: "Battery Link Sets",
    shortTitle: "Battery Link Sets",
    shortDescription: "Battery interconnection and linking solutions.",
    fullDescription:
      "Precision-machined copper busbar link sets and flexible inter-cell linking connectors for stationary battery strings, ensuring low-resistance connectivity across all battery cells.",
    scope:
      "Solid electrolytic copper busbars, flexible laminated copper links, and insulated interconnection cables with protective touch-safe terminal covers.",
    deliverables: [
      "Electro-tin plated copper links for anti-oxidation protection",
      "Color-coded touch-proof insulating shroud covers (Red/Black)",
      "Uniform contact resistance across all series and parallel tiers",
      "Torque-specified terminal hardware sets",
    ],
    icon: "Boxes",
    image: "/images/product-battery-links-hd.jpg",
    tag: "Interconnection Accessories",
    standards: "Industrial Hardware Compliance Standards",
  },
];

/**
 * Confirmed Services (6)
 */
export const SERVICES_LIST: OfferingItem[] = [
  {
    id: "power-audit",
    category: "service",
    title: "Power Audit",
    shortTitle: "Power Audit",
    shortDescription: "Assessment and evaluation of existing power infrastructure.",
    fullDescription:
      "Comprehensive diagnostic evaluation of your facility's electrical power quality. Using calibrated Class-A power analyzers, we detect hidden anomalies, harmonic distortion, and phase imbalances before they damage sensitive equipment.",
    scope:
      "On-site power quality logging recording THD-V, THD-I, neutral currents, voltage sags/swells, transient events, and power factor irregularities.",
    deliverables: [
      "Class-A harmonic distortion audit report (up to 50th order)",
      "Neutral-to-ground voltage and circulating neutral current study",
      "Waveform captures during inductive switching & transfer tests",
      "Harmonic mitigation schematics and active filter recommendations",
    ],
    icon: "Activity",
    image: "/images/service-power-quality-hd.jpg",
    tag: "Diagnostic Audit",
    standards: "Class-A Power Quality Standards",
  },
  {
    id: "load-study",
    category: "service",
    title: "Load Study",
    shortTitle: "Load Study",
    shortDescription: "Analysis of electrical loads and power requirements.",
    fullDescription:
      "In-depth analysis of critical electrical loads, inrush profiles, and capacity demands to prevent breaker trips, optimize sizing, and balance three-phase distributions.",
    scope:
      "Detailed electrical load profiling across peak, nominal, and standby operational states, monitoring kVA, kW, and power factor demands.",
    deliverables: [
      "Phase-by-phase load balance analysis and balance recommendations",
      "Peak inrush current and motor startup step-loading analysis",
      "Feeder capacity utilization and thermal headroom assessment",
      "Future load expansion margin and sizing recommendations",
    ],
    icon: "FileCheck",
    image: "/images/service-consultancy.png",
    tag: "Engineering Analysis",
    standards: "National Electrical Code Guidelines",
  },
  {
    id: "battery-impedance-testing",
    category: "service",
    title: "Battery Impedance Testing",
    shortTitle: "Battery Impedance Testing",
    shortDescription: "Testing and evaluation of battery health and performance.",
    fullDescription:
      "Cell-level scientific condition assessment of stationary battery systems. Internal cell impedance and conductance testing identifies deteriorating cells and sulfation long before an entire string fails under actual mains loss.",
    scope:
      "Individual cell internal impedance, conductance measurement, inter-tier connection resistance, and timed DC load-bank discharge testing.",
    deliverables: [
      "Cell-by-cell micro-ohm internal resistance logs",
      "Inter-cell connector torque and resistance verification",
      "Constant-current DC load bank discharge curve validation",
      "Comprehensive cell impedance and health certification report",
    ],
    icon: "BatteryCharging",
    image: "/images/service-battery-testing-hd.jpg",
    tag: "Condition Monitoring",
    standards: "Standard Battery Diagnostic Protocols",
  },
  {
    id: "ups-amc",
    category: "service",
    title: "UPS AMC (Annual Maintenance Contract)",
    shortTitle: "UPS AMC",
    shortDescription: "Preventive maintenance and ongoing UPS support.",
    fullDescription:
      "Structured service level agreements designed to catch deteriorating components before they threaten operational uptime. Rather than waiting for catastrophic failure during mains loss, we deliver predictive condition monitoring.",
    scope:
      "Comprehensive (CAMC including OEM spare parts & inverter components) and Non-Comprehensive (AMC) quarterly service schedules.",
    deliverables: [
      "Quarterly planned preventive maintenance inspections",
      "Priority emergency breakdown dispatch within SLA window",
      "Infrared thermal imaging of critical electrical junctions",
      "Detailed health logs and capacitor wear reports",
    ],
    icon: "Wrench",
    image: "/images/service-amc.png",
    tag: "Preventive SLA Contracts",
    standards: "ISO & OEM Maintenance Protocols",
  },
  {
    id: "ups-repair",
    category: "service",
    title: "UPS Repair",
    shortTitle: "UPS Repair",
    shortDescription: "UPS troubleshooting, diagnostics, and repair services.",
    fullDescription:
      "Round-the-clock technical response and component-level repair for critical power failures. Our certified engineers rapidly isolate inverter faults, rectifier issues, static switch failures, and blown DC fuses.",
    scope:
      "24/7 rapid response for critical power failures, inverter faults, static bypass failures, and component-level board repairs.",
    deliverables: [
      "Rapid on-site triage and emergency stabilization",
      "Calibrated fault diagnosis and component replacement",
      "Temporary bypass routing and loaner unit options",
      "Comprehensive Root Cause Analysis (RCA) reporting",
    ],
    icon: "ShieldAlert",
    image: "/images/service-emergency.png",
    tag: "24/7 Breakdown Response",
    standards: "Rapid SLA Response",
  },
  {
    id: "power-consultancy",
    category: "service",
    title: "Power Consultancy",
    shortTitle: "Power Consultancy",
    shortDescription: "Professional technical guidance and consultancy for critical power requirements.",
    fullDescription:
      "Expert engineering advisory for industrial power distribution and backup resilience. We review Single Line Diagrams (SLD), coordinate automatic transfer switches (ATS) with standby diesel gensets, and eliminate single points of failure.",
    scope:
      "Industrial electrical design, Single Line Diagram (SLD) optimization, electrical load segregation schemes, generator-UPS synchronization.",
    deliverables: [
      "Single Line Diagram (SLD) reviews and design blueprints",
      "Critical vs. non-critical load segregation schemes",
      "Generator-UPS frequency slew rate & governor tuning recommendations",
      "Fault level discrimination and breaker coordination studies",
    ],
    icon: "FileText",
    image: "/images/service-consultancy.png",
    tag: "Technical Advisory",
    standards: "National Electrical Code & Industrial Standards",
  },
];

/**
 * Combined list of all 12 confirmed offerings
 */
export const ALL_OFFERINGS: OfferingItem[] = [...PRODUCTS_LIST, ...SERVICES_LIST];

// Backwards compatibility alias for services components
export const CORE_SERVICES = ALL_OFFERINGS;

export const MONITORING_WORKFLOW = [
  {
    step: "01",
    node: "UPS SYSTEM",
    subtitle: "Critical power equipment",
    description: "Online UPS power subsystem continuously broadcasting internal operating state, voltage, current, and battery bus values.",
    image: "/images/workflow-ups-v1.png",
  },
  {
    step: "02",
    node: "SNMP INTERFACE CARD",
    subtitle: "Card slot installation & network configuration",
    description: "Physical slot integration into the UPS communications bay, configuring IP network parameters and enabling SNMP telemetry broadcasting.",
    image: "/images/workflow-snmp-card-v1.png",
  },
  {
    step: "03",
    node: "IP NETWORK",
    subtitle: "SNMP Communication",
    description: "Secure isolated Ethernet LAN/WAN uplink with static IP addressing, VLAN tagging, and encrypted SNMP v3 trap dispatch.",
    image: "/images/workflow-network-v1.png",
  },
  {
    step: "04",
    node: "MONITORING & ALERTS",
    subtitle: "BMS / NMS Integration",
    description: "Centralized Building Management Systems (BMS), SCADA, or DCIM platforms receiving telemetry, trends, and real-time email/SMS alerts.",
    image: "/images/workflow-dashboard-v1.png",
  },
];

export const MONITORING_PILLARS = [
  {
    title: "Real-time Status Monitoring",
    description: "Continuous telemetry of voltage, frequency, load percentage, and inverter state.",
    icon: "Gauge",
  },
  {
    title: "Email / SMS Alerts",
    description: "Instant notification on mains failure, bypass engagement, or high battery temperature.",
    icon: "Mail",
  },
  {
    title: "Network Integration",
    description: "Seamless compatibility with BACnet, Modbus-TCP, RFC 1628 UPS-MIB, and SNMP v1/v2c/v3.",
    icon: "Network",
  },
  {
    title: "Scalable for Enterprises",
    description: "Multi-device telemetry aggregation across decentralized branch offices and data halls.",
    icon: "Server",
  },
];

export const INDUSTRIES: IndustryItem[] = [
  {
    id: "data-centers",
    title: "Data Centers",
    tagline: "Zero-tolerance uptime for cloud & enterprise servers",
    description:
      "Modern colocation, hyperscale, and enterprise data facilities depend on uninterrupted power. A millisecond drop triggers server reboots, corrupted storage clusters, and costly SLA penalties.",
    criticality: "Continuous 2N / N+1 redundancy, clean sine-wave delivery, and millisecond-level telemetry to avert server rack downtime.",
    recommendedServices: [
      "Online UPS & Battery Banks",
      "Comprehensive CAMC Maintenance",
      "Smart SNMP Telemetry & Remote Alerts",
      "Power Quality & Harmonic Audits",
    ],
    image: "/images/hero-datacenter-hd.jpg",
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    tagline: "Preventing assembly halts and batch spoiling",
    description:
      "Automated robotic assembly, CNC machining centers, and pharmaceutical production lines suffer severe material loss when voltage dips cause unexpected control system resets.",
    criticality: "Robust ride-through protection against grid voltage sags, switching surges, and heavy inductive motor startup transients.",
    recommendedServices: [
      "Industrial UPS Systems",
      "Power Quality Harmonic Mitigation",
      "Emergency 24/7 Breakdown Response",
      "SLD Electrical Load Segregation",
    ],
    image: "/images/industry-manufacturing-hd.jpg",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    tagline: "Life-critical electrical reliability for patient care",
    description:
      "Surgical suites, intensive care units (ICU), MRI imaging, and cardiac monitoring cannot tolerate power interruptions. Power continuity directly safeguards human life.",
    criticality: "Stringent adherence to medical electrical safety, zero earth-leakage current, and immediate generator-to-UPS synchronization.",
    recommendedServices: [
      "Online Double Conversion Medical UPS",
      "Cell-Level Battery Impedance Testing",
      "Quarterly Preventive AMC",
      "24/7 Dedicated Emergency Standby",
    ],
    image: "/images/industry-healthcare-hd.jpg",
  },
  {
    id: "enterprise-it",
    title: "Enterprise IT",
    tagline: "Business continuity for trading, telecom & office operations",
    description:
      "Corporate headquarters, trading floors, and telecommunication exchanges require continuous power for network switches, PBX servers, and security access infrastructure.",
    criticality: "Compact footprint, clean battery runtime, remote multi-site telemetry, and automated graceful server shutdown triggers.",
    recommendedServices: [
      "Rackmount & Tower UPS Systems",
      "SNMP Remote Monitoring Integration",
      "AMC Maintenance Contracts",
      "Consultancy & Capacity Upgrades",
    ],
    image: "/images/industry-enterprise-hd.jpg",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    number: "01",
    title: "Understand",
    tagline: "Site & Load Assessment",
    description: "Assess your site, electrical distribution, equipment load profile, and specific business continuity requirements.",
    deliverables: ["Site power survey", "KVA/KW load profiling", "Runtime autonomy determination"],
    icon: "Search",
  },
  {
    step: "02",
    number: "02",
    title: "Evaluate",
    tagline: "Diagnostic Infrastructure Inspection",
    description: "Inspect electrical infrastructure, battery string health, harmonics, and identify critical vulnerability areas.",
    deliverables: ["Class-A power quality analysis", "Battery impedance and health test", "Single Line Diagram review"],
    icon: "FileCheck",
  },
  {
    step: "03",
    number: "03",
    title: "Implement",
    tagline: "Deployment & Maintenance",
    description: "Supply, configure, install, or maintain systems with OEM precision and strict safety protocols.",
    deliverables: ["Turnkey UPS rig-in & cabling", "SNMP interface card IP configuration", "Quarterly scheduled AMC execution"],
    icon: "Settings",
  },
  {
    step: "04",
    number: "04",
    title: "Verify",
    tagline: "Testing & Documentation",
    description: "Test completed work, simulate grid failure scenarios, verify SNMP alerting, and deliver certified reports.",
    deliverables: ["Full load bank discharge test", "Alert dispatch validation", "Formal engineering documentation"],
    icon: "CheckCircle2",
  },
];

export const TRUST_HIGHLIGHTS = [
  {
    title: "Expert Consultation",
    description: "Tailored engineering sizing backed by deep domain experience in critical electrical backup.",
    icon: "UserCheck",
  },
  {
    title: "Customized Solutions",
    description: "Vendor-agnostic UPS sizing, modular battery architectures, and custom telemetry integration.",
    icon: "Layers",
  },
  {
    title: "On-site Support",
    description: "Trained field service engineers equipped with calibrated micro-ohmmeters and analyzers.",
    icon: "Wrench",
  },
  {
    title: "Long-term Reliability",
    description: "Predictive maintenance protocols engineered to stop cell thermal runaway before it occurs.",
    icon: "ShieldCheck",
  },
];

export const SNMP_CARD_SPECS = {
  model: "SNMP Interface Card",
  type: "UPS Network Interface SNMP / Web Card",
  compatibility: "Compatible with standard critical UPS architectures with expansion communication slots",
  network: "10/100/1000 Mbps RJ45 Auto-sensing Ethernet",
  protocols: [
    "SNMP v1, SNMP v2c, SNMP v3 (with SHA / AES encryption)",
    "RFC 1628 Standard UPS-MIB & Private Extension MIBs",
    "HTTP / HTTPS Web Interface with SSL/TLS encryption",
    "Modbus/TCP over IP for Building Management Systems (BMS)",
    "SMTP Email Trap Notifications with authentication",
    "NTP (Network Time Protocol) synchronization",
  ],
  features: [
    "Real-time event logging with non-volatile history buffer",
    "Configurable threshold alarms for voltage, frequency, load, and battery limits",
    "Automated safe shutdown scripts for remote Linux, Windows, and VMware hypervisors",
    "Environmental sensor support (temperature & humidity probe input)",
  ],
};

export const CABLE_GALLERY = [
  {
    id: "dc-power",
    title: "DC Power Cables",
    category: "DC Cables",
    shortDesc: "DC power cable solutions.",
    description:
      "Heavy-duty flexible DC power cables engineered for low voltage-drop connections between battery banks and UPS inverters.",
    image: "/images/product-dc-cables-hd.jpg",
    tag: "Low-Loss DC Distribution",
  },
  {
    id: "uninyvin",
    title: "Uninyvin Cables",
    category: "Uninyvin Cables",
    shortDesc: "Specialized Uninyvin cable solutions.",
    description:
      "Specialized high-temperature and chemical-resistant Uninyvin power cables designed for harsh industrial environments.",
    image: "/images/product-uninyvin-cables-hd.jpg",
    tag: "High-Temperature Endurance",
  },
  {
    id: "miracle",
    title: "Miracle Cables",
    category: "Miracle Cables",
    shortDesc: "Miracle cable products and solutions.",
    description:
      "Ultra-flexible multi-strand tinned copper power cables engineered for maximum current-carrying efficiency and tight-bend routing.",
    image: "/images/product-miracle-cables-hd.jpg",
    tag: "High-Flexibility Micro-Strands",
  },
  {
    id: "terminations",
    title: "Cable Connectors & Link Sets",
    category: "Terminations & Busbars",
    shortDesc: "Interconnection hardware and protective shrouds.",
    description:
      "Solid electrolytic copper busbars, heavy crimped lugs, and touch-proof shroud covers for battery and UPS connections.",
    image: "/images/product-battery-links-hd.jpg",
    tag: "Certified Terminations",
  },
];
