'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Activity,
  Gauge,
  Mail,
  Network,
  Server,
  Cpu,
  Terminal,
  Radio,
  RefreshCw,
} from 'lucide-react';
import { MONITORING_WORKFLOW, MONITORING_PILLARS } from '@/data/companyData';

interface MonitoringSectionProps {
  onOpenQuoteModal: (serviceTitle?: string) => void;
}

interface TelemetryResponse {
  timestamp: string;
  agent: {
    model: string;
    ip: string;
    port: number;
    mib: string;
    uptimeSeconds: number;
  };
  telemetry: {
    status: string;
    statusColor: string;
    badgeBg: string;
    inputVoltage: string;
    inputFrequency: string;
    outputVoltage: string;
    outputFrequency: string;
    loadPercent: number;
    batteryState: string;
    batteryVoltage: string;
    temperatureCelsius: string;
    activePath: string;
    event: string;
  };
  networkStats: {
    latencyMs: string;
    packetsSent: number;
    trapsDispatched: number;
  };
}

export function MonitoringSection({ onOpenQuoteModal }: MonitoringSectionProps) {
  const [simulationProfile, setSimulationProfile] = useState<'normal' | 'battery-test' | 'eco'>('normal');
  const [telemetryData, setTelemetryData] = useState<TelemetryResponse | null>(null);
  const [isLivePolling, setIsLivePolling] = useState(true);

  // Fetch telemetry from backend API
  const fetchTelemetry = async (profile: string) => {
    try {
      const res = await fetch(`/api/telemetry?profile=${profile}`);
      if (res.ok) {
        const json = await res.json();
        setTelemetryData(json);
      }
    } catch (err) {
      console.error('Failed to fetch telemetry from backend:', err);
    }
  };

  useEffect(() => {
    fetchTelemetry(simulationProfile);

    if (!isLivePolling) return;
    const timer = setInterval(() => {
      fetchTelemetry(simulationProfile);
    }, 4000);

    return () => clearInterval(timer);
  }, [simulationProfile, isLivePolling]);

  // Fallback state if initial fetch is pending
  const current = telemetryData?.telemetry || {
    status: 'NORMAL (INVERTER ONLINE)',
    statusColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30',
    inputVoltage: '231.2',
    inputFrequency: '50.01',
    outputVoltage: '230.0',
    loadPercent: 46,
    batteryState: 'FLOAT CHARGE (100%)',
    batteryVoltage: '408.4',
    temperatureCelsius: '23.8',
    event: 'Mains healthy; inverter delivering clean regulated sine-wave.',
  };

  const netStats = telemetryData?.networkStats || {
    latencyMs: '2.4',
    packetsSent: 142095,
    trapsDispatched: 0,
  };

  return (
    <section id="technology" className="py-24 bg-brand-secondary/60 relative overflow-hidden border-y border-brand-border/40">
      {/* Background glow accents */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Top Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 text-brand-cyan text-xs font-semibold tracking-wider uppercase font-mono">
              <span className="text-brand-cyan text-sm">✛</span>
              <span>SMART SNMP POWER MONITORING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text tracking-tight leading-tight">
              SNMP-Based Remote <br className="hidden sm:inline" />
              Power Monitoring.
            </h2>
            <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed pt-1">
              Integration of SNMP interface cards into UPS communication systems for network-based monitoring,
              equipment status visibility and remote alerts across enterprise IT, data centers, and BMS platforms.
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <button
              type="button"
              onClick={() => onOpenQuoteModal('Smart SNMP Power Telemetry and Remote Monitoring')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-cyan text-[#071321] hover:bg-brand-cyan-hover shadow-cyan-glow transition-all"
            >
              <span>Inquire SNMP Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4-Step Architecture Workflow (Horizontal on desktop, vertical on mobile) */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {MONITORING_WORKFLOW.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="h-full rounded-2xl bg-brand-card/90 border border-brand-border/80 p-5 flex flex-col justify-between hover:border-brand-cyan/60 hover:shadow-cyan-glow-sm transition-all duration-300">
                  {/* Step header with Node Title and Subtitle */}
                  <div className="text-center mb-3">
                    <h3 className="text-sm font-extrabold uppercase font-mono text-brand-cyan tracking-wider">
                      {step.node}
                    </h3>
                    <p className="text-[11px] text-brand-muted/90 mt-0.5 leading-snug">
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Centered Equipment Visual */}
                  <div className="relative h-32 w-full rounded-xl overflow-hidden bg-brand-secondary/60 border border-brand-border/40 my-2 flex items-center justify-center p-3">
                    <Image
                      src={step.image}
                      alt={step.node}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-xs text-brand-muted leading-relaxed text-center mt-2 line-clamp-3">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector between cards (on desktop) */}
                {idx < MONITORING_WORKFLOW.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-brand-secondary border border-brand-border text-brand-cyan items-center justify-center pointer-events-none shadow-md">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 6-Point SNMP Architecture & Deployment Workflow */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-brand-card/50 border border-brand-border/80">
          <div className="mb-6">
            <span className="text-[11px] font-mono uppercase text-brand-cyan font-semibold tracking-wider">
              Deployment Lifecycle & Technical Process
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-brand-text mt-1">
              End-to-End SNMP Implementation Framework
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted mt-1 max-w-3xl leading-relaxed">
              Step-by-step engineering methodology for physical integration, IP provisioning, protocol security,
              and seamless centralized telemetry ingestion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-brand-secondary/70 border border-brand-border/60 hover:border-brand-cyan/40 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-brand-cyan">01.</span>
                <h4 className="text-xs sm:text-sm font-bold text-brand-text">Physical Slot Integration</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Precise mechanical insertion of the SNMP interface card into the UPS communications option slot with safe galvanic isolation and bus connectivity.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-brand-secondary/70 border border-brand-border/60 hover:border-brand-cyan/40 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-brand-cyan">02.</span>
                <h4 className="text-xs sm:text-sm font-bold text-brand-text">SNMP Interface Card Installation</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Hardware seating verification, ground continuity verification, firmware integrity check, and operational power-on diagnostic validation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-brand-secondary/70 border border-brand-border/60 hover:border-brand-cyan/40 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-brand-cyan">03.</span>
                <h4 className="text-xs sm:text-sm font-bold text-brand-text">IP Network Configuration</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Static IP assignment, subnet masking, gateway routing, DNS binding, and dedicated VLAN isolation for critical power telemetry.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-brand-secondary/70 border border-brand-border/60 hover:border-brand-cyan/40 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-brand-cyan">04.</span>
                <h4 className="text-xs sm:text-sm font-bold text-brand-text">SNMP Parameter Configuration</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Setting RFC 1628 standard UPS-MIB tables, trap community strings, SNMP v3 authentication credentials, and privacy encryption profiles.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-brand-secondary/70 border border-brand-border/60 hover:border-brand-cyan/40 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-brand-cyan">05.</span>
                <h4 className="text-xs sm:text-sm font-bold text-brand-text">Network Communication</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Low-latency bi-directional polling and instantaneous threshold event-driven trap delivery over secure enterprise Ethernet uplinks.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-brand-secondary/70 border border-brand-border/60 hover:border-brand-cyan/40 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-brand-cyan">06.</span>
                <h4 className="text-xs sm:text-sm font-bold text-brand-text">Monitoring System Integration</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Telemetry ingestion into Building Management Systems (BMS), DCIM platforms, Modbus/TCP gateways, and automated server shutdown daemons.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Core Monitoring Capability Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {MONITORING_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-brand-card/70 border border-brand-border/70 hover:border-brand-cyan/40 hover:bg-brand-card transition-all flex items-center gap-3.5"
            >
              <div className="w-9 h-9 rounded-lg bg-brand-secondary border border-brand-border flex items-center justify-center text-brand-cyan shrink-0">
                {idx === 0 && <Gauge className="w-4 h-4" />}
                {idx === 1 && <Mail className="w-4 h-4" />}
                {idx === 2 && <Network className="w-4 h-4" />}
                {idx === 3 && <Server className="w-4 h-4" />}
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-brand-text truncate">{pillar.title}</h3>
                <p className="text-[11px] text-brand-muted truncate mt-0.5">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Rich Interactive Simulated Monitoring Dashboard Preview */}
        <div className="rounded-2xl bg-brand-card border border-brand-border shadow-2xl overflow-hidden">
          {/* Dashboard Header Bar */}
          <div className="px-6 py-4 bg-brand-secondary border-b border-brand-border flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-brand-text">
                    SNMP INTERFACE CARD (SNMP v3)
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">
                    LIVE BACKEND TELEMETRY
                  </span>
                </div>
                <span className="text-[11px] text-brand-muted font-mono">
                  Endpoint: /api/telemetry • Ping: {netStats.latencyMs}ms • RFC 1628 UPS-MIB
                </span>
              </div>
            </div>

            {/* Simulation Profile Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-muted font-mono mr-1 hidden sm:inline">
                Test Profile:
              </span>
              <button
                type="button"
                onClick={() => setSimulationProfile('normal')}
                className={`text-xs px-3 py-1.5 rounded-lg font-mono transition-all ${
                  simulationProfile === 'normal'
                    ? 'bg-brand-cyan text-[#071321] font-bold shadow-cyan-glow-sm'
                    : 'bg-brand-bg text-brand-muted hover:text-brand-text border border-brand-border'
                }`}
              >
                Online Inverter
              </button>
              <button
                type="button"
                onClick={() => setSimulationProfile('battery-test')}
                className={`text-xs px-3 py-1.5 rounded-lg font-mono transition-all ${
                  simulationProfile === 'battery-test'
                    ? 'bg-amber-400 text-[#071321] font-bold'
                    : 'bg-brand-bg text-brand-muted hover:text-brand-text border border-brand-border'
                }`}
              >
                Battery Discharge
              </button>
              <button
                type="button"
                onClick={() => setSimulationProfile('eco')}
                className={`text-xs px-3 py-1.5 rounded-lg font-mono transition-all ${
                  simulationProfile === 'eco'
                    ? 'bg-brand-cyan text-[#071321] font-bold shadow-cyan-glow-sm'
                    : 'bg-brand-bg text-brand-muted hover:text-brand-text border border-brand-border'
                }`}
              >
                ECO Mode
              </button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1: Operating State */}
            <div className="p-4 rounded-xl bg-brand-secondary/60 border border-brand-border/70 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-brand-muted mb-2 font-mono">
                <span>SYSTEM STATUS</span>
                <Radio className="w-3.5 h-3.5 text-brand-cyan" />
              </div>
              <div>
                <span
                  className={`text-xs font-bold font-mono tracking-tight px-2.5 py-1 rounded inline-block border ${current.badgeBg} ${current.statusColor}`}
                >
                  {current.status}
                </span>
                <p className="text-[11px] text-brand-muted mt-2 font-mono">
                  Sync: Mains 50Hz Locked
                </p>
              </div>
            </div>

            {/* Metric 2: Voltages */}
            <div className="p-4 rounded-xl bg-brand-secondary/60 border border-brand-border/70">
              <div className="flex items-center justify-between text-xs text-brand-muted mb-2 font-mono">
                <span>INPUT / OUTPUT</span>
                <Activity className="w-3.5 h-3.5 text-brand-cyan" />
              </div>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xl font-bold font-mono text-brand-text">
                    {current.outputVoltage} V
                  </span>
                  <span className="text-[11px] text-brand-muted ml-1">OUT</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono text-brand-muted">
                    {current.inputVoltage} V
                  </span>
                  <span className="text-[10px] text-brand-muted/70 ml-1">IN</span>
                </div>
              </div>
              <p className="text-[11px] text-brand-muted mt-2 font-mono">
                Frequency: {current.inputFrequency} Hz
              </p>
            </div>

            {/* Metric 3: Critical Load % */}
            <div className="p-4 rounded-xl bg-brand-secondary/60 border border-brand-border/70">
              <div className="flex items-center justify-between text-xs text-brand-muted mb-2 font-mono">
                <span>LOAD FACTOR</span>
                <Gauge className="w-3.5 h-3.5 text-brand-cyan" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold font-mono text-brand-text">
                  {current.loadPercent}%
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  BALANCED
                </span>
              </div>
              {/* Load Bar */}
              <div className="w-full h-1.5 bg-brand-bg rounded-full mt-2.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-cyan to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${current.loadPercent}%` }}
                />
              </div>
            </div>

            {/* Metric 4: Battery & Temp */}
            <div className="p-4 rounded-xl bg-brand-secondary/60 border border-brand-border/70">
              <div className="flex items-center justify-between text-xs text-brand-muted mb-2 font-mono">
                <span>BATTERY BUS & TEMP</span>
                <Cpu className="w-3.5 h-3.5 text-brand-cyan" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-bold font-mono text-brand-text">
                  {current.batteryVoltage} V DC
                </span>
                <span className="text-xs font-mono text-brand-cyan">
                  {current.temperatureCelsius} °C
                </span>
              </div>
              <p className="text-[11px] text-brand-muted mt-2 font-mono">
                {current.batteryState}
              </p>
            </div>
          </div>

          {/* Terminal / SNMP Event Log Preview */}
          <div className="px-6 py-3 bg-[#050D17] border-t border-brand-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-brand-muted gap-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
              <span className="text-brand-cyan">SNMP Trap:</span>
              <span className="text-brand-text">{current.event}</span>
            </div>
            <span className="text-brand-muted/70 text-[10px] tracking-wide">
              NOTICE: Simulated metrics from /api/telemetry. Production deployment interfaces directly with physical SNMP interface card.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
