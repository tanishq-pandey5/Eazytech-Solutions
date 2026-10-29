export interface ServiceItem {
  id: string;
  title: string;
  shortTitle: string;
  shortDescription: string;
  fullDescription: string;
  scope: string;
  deliverables: string[];
  icon: string;
  image: string;
  standards?: string;
  tag: string;
}

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

export interface MetricData {
  label: string;
  value: string;
  subtext: string;
}

export const COMPANY_DETAILS = {
  name: "Eazy Tech Solutions",
  legalName: "EAZY TECH SOLUTIONS",
  tagline: "End-to-End Critical Power Infrastructure",
  positioning: "Sales • Service • Testing • Electrical Consultancy",
  brochureMission:
    "Engineering end-to-end reliability for mission-critical electrical environments. From precision battery diagnostics to advanced SNMP telemetry, we protect uptime where power failure is not an option.",
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
    description: "Class-A power quality audits, harmonic distortion profiling, and IEEE 1188 cell-level impedance testing.",
    icon: "Activity",
  },
  {
    id: "remote-monitoring",
    title: "Remote Monitoring",
    shortTitle: "Remote Monitoring",
    description: "Smart SNMP v1/v2c/v3 telemetry integration with Netman 204 cards for real-time alerts and BMS integration.",
    icon: "Monitor",
  },
];

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: "ups-battery-supply",
    title: "UPS & Battery Supply",
    shortTitle: "UPS & Battery Supply",
    shortDescription: "Supply and commissioning of online UPS systems, industrial batteries and power protection solutions.",
    fullDescription:
      "Engineered supply and commissioning of high-efficiency Online Double Conversion UPS systems and industrial energy storage. We calculate exact runtime requirements and match scalable architectures to your facility's critical electrical load profile.",
    scope:
      "Supply of Online Double Conversion UPS systems, modular scalable architectures, industrial SMF VRLA, Tubular, and LiFePO4 battery banks.",
    deliverables: [
      "OEM warranty-backed equipment supply",
      "Load-matched runtime and sizing calculations",
      "Safe on-site rig-in and mechanical installation",
      "Pre-commissioning electrical verification",
    ],
    icon: "Box",
    image: "/images/service-ups-hd.jpg",
    tag: "Equipment Supply & Commissioning",
    standards: "OEM Certified Standards",
  },
  {
    id: "maintenance-contracts",
    title: "Maintenance Contracts (AMC & CAMC)",
    shortTitle: "Maintenance Contracts (AMC & CAMC)",
    shortDescription: "Preventive maintenance and comprehensive support to ensure maximum uptime.",
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
    id: "emergency-repair",
    title: "Emergency Breakdown & Repair",
    shortTitle: "Emergency Breakdown & Repair",
    shortDescription: "24/7 rapid response for UPS failures, inverter faults and critical power issues.",
    fullDescription:
      "Round-the-clock technical response when critical power systems fail. Our certified engineers carry calibrated diagnostic instruments to rapidly isolate inverter faults, rectifier issues, static switch failures, and blown DC fuses.",
    scope:
      "24/7 on-call rapid response team for critical power failures, inverter faults, static bypass failures, and component-level board repairs.",
    deliverables: [
      "Rapid on-site triage and emergency stabilization",
      "Calibrated fault diagnosis and component replacement",
      "Temporary bypass routing and loaner unit options",
      "Comprehensive Root Cause Analysis (RCA) reporting",
    ],
    icon: "ShieldAlert",
    image: "/images/service-emergency.png",
    tag: "24/7 Emergency Support",
    standards: "Rapid SLA Response",
  },
  {
    id: "power-quality-audits",
    title: "Power Quality & Energy Audits",
    shortTitle: "Power Quality Audits",
    shortDescription: "Detailed analysis of voltage sags, harmonics, THD and power factor irregularities.",
    fullDescription:
      "Comprehensive electrical power profiling using calibrated Class-A power quality analyzers. We uncover invisible power anomalies that overheat transformers, trip sensitive electronics, and inflate utility billing.",
    scope:
      "Class-A power quality analyzers recording THD-V, THD-I, neutral currents, voltage sags/swells, transient surges, and power factor irregularities.",
    deliverables: [
      "Full spectrum harmonic distortion profiling (up to 50th order)",
      "Neutral-to-ground voltage and circulating neutral current study",
      "Waveform capture during heavy inductive load switching",
      "Engineering harmonic mitigation and active filter recommendations",
    ],
    icon: "Activity",
    image: "/images/service-power-quality-hd.jpg",
    tag: "Diagnostic Electrical Testing",
    standards: "Class-A Analyzer Compliant",
  },
  {
    id: "power-backup-consultancy",
    title: "Power Backup Consultancy",
    shortTitle: "Power Backup Consultancy",
    shortDescription: "Electrical design, SLD optimization, load segregation and generator-UPS coordination.",
    fullDescription:
      "Expert engineering advisory for industrial power distribution and backup resilience. We review your Single Line Diagrams (SLD), coordinate automatic transfer switches (ATS) with standby diesel gensets, and eliminate single points of failure.",
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
    tag: "Engineering Advisory",
    standards: "National Electrical Code & IEEE Standards",
  },
  {
    id: "battery-testing",
    title: "Battery Impedance & Capacity Testing",
    shortTitle: "Battery Impedance & Capacity Testing",
    shortDescription: "Cell-level testing, impedance measurement and discharge testing as per IEEE 1188.",
    fullDescription:
      "Cell-by-cell scientific health assessment of stationary battery systems. Internal cell impedance and conductance testing identifies sulfation, dry-out, and weak cells long before an entire battery string fails under actual load.",
    scope:
      "Individual cell internal impedance, conductance measurement, inter-tier connection resistance, and timed DC load-bank discharge testing.",
    deliverables: [
      "Cell-by-cell micro-ohm internal resistance logs",
      "Inter-cell connector torque and resistance verification",
      "Constant-current DC load bank discharge curve validation",
      "Compliance certification under IEEE 1188 recommended practices",
    ],
    icon: "BatteryCharging",
    image: "/images/service-battery-testing-hd.jpg",
    tag: "Preventive Cell Diagnostics",
    standards: "IEEE 1188 Recommended Practices",
  },
];

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
    node: "NETMAN 204",
    subtitle: "SNMP Card Slot installation & configuration",
    description: "High-performance SNMP interface card slotted into the UPS communications bay, translating proprietary bus data into standard MIB protocols.",
    image: "/images/workflow-netman204-v1.png",
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
      "Netman 204 SNMP Telemetry",
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
      "IEEE 1188 Battery Impedance Audits",
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
      "Netman 204 SNMP Integration",
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
    deliverables: ["Class-A power quality analysis", "IEEE 1188 impedance test", "Single Line Diagram review"],
    icon: "FileCheck",
  },
  {
    step: "03",
    number: "03",
    title: "Implement",
    tagline: "Deployment & Maintenance",
    description: "Supply, configure, install, or maintain systems with OEM precision and strict safety protocols.",
    deliverables: ["Turnkey UPS rig-in & cabling", "Netman 204 IP configuration", "Quarterly scheduled AMC execution"],
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

export const NETMAN_204_SPECS = {
  model: "Netman 204",
  type: "UPS Network Interface SNMP / Web Card",
  compatibility: "Riello & standard OEM compatible critical UPS architectures with expansion slots",
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
