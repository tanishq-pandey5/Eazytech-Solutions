import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const profile = searchParams.get('profile') || 'normal';

  // Realistic micro-jitter for live sensor simulation
  const jitterVolt = (Math.random() * 0.6 - 0.3);
  const jitterFreq = (Math.random() * 0.04 - 0.02);
  const jitterLoad = Math.floor(Math.random() * 3 - 1);

  if (profile === 'battery-test') {
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      agent: {
        model: 'Netman 204 SNMP v3',
        ip: '192.168.10.45',
        port: 161,
        mib: 'RFC 1628 Standard UPS-MIB',
        uptimeSeconds: 849320,
      },
      telemetry: {
        status: 'SELF-TEST (BATTERY DISCHARGE)',
        statusColor: 'text-amber-400',
        badgeBg: 'bg-amber-500/10 border-amber-500/30',
        inputVoltage: (228.6 + jitterVolt).toFixed(1),
        inputFrequency: (49.98 + jitterFreq).toFixed(2),
        outputVoltage: (229.8 + jitterVolt * 0.5).toFixed(1),
        outputFrequency: '50.00',
        loadPercent: Math.max(10, Math.min(100, 52 + jitterLoad)),
        batteryState: 'DISCHARGING (94%)',
        batteryVoltage: (394.2 - Math.random() * 0.4).toFixed(1),
        temperatureCelsius: (25.6 + Math.random() * 0.2).toFixed(1),
        activePath: 'DC Bus / Inverter',
        event: 'Scheduled IEEE 1188 automated self-test routine active.',
      },
      networkStats: {
        latencyMs: (2.1 + Math.random() * 0.8).toFixed(1),
        packetsSent: 142095,
        trapsDispatched: 14,
      },
    });
  }

  if (profile === 'eco') {
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      agent: {
        model: 'Netman 204 SNMP v3',
        ip: '192.168.10.45',
        port: 161,
        mib: 'RFC 1628 Standard UPS-MIB',
        uptimeSeconds: 849320,
      },
      telemetry: {
        status: 'HIGH EFFICIENCY ECO-MODE',
        statusColor: 'text-brand-cyan',
        badgeBg: 'bg-brand-cyan/10 border-brand-cyan/30',
        inputVoltage: (230.8 + jitterVolt).toFixed(1),
        inputFrequency: (50.00 + jitterFreq).toFixed(2),
        outputVoltage: (230.8 + jitterVolt).toFixed(1),
        outputFrequency: '50.00',
        loadPercent: Math.max(10, Math.min(100, 38 + jitterLoad)),
        batteryState: 'STANDBY (100%)',
        batteryVoltage: '412.0',
        temperatureCelsius: '22.4',
        activePath: 'Static Bypass line (Inverter standby)',
        event: 'Direct high-efficiency path; static bypass standby armed.',
      },
      networkStats: {
        latencyMs: (1.9 + Math.random() * 0.5).toFixed(1),
        packetsSent: 142095,
        trapsDispatched: 8,
      },
    });
  }

  // Default 'normal' profile (True Online Double Conversion)
  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    agent: {
      model: 'Netman 204 SNMP v3',
      ip: '192.168.10.45',
      port: 161,
      mib: 'RFC 1628 Standard UPS-MIB',
      uptimeSeconds: 849320,
    },
    telemetry: {
      status: 'NORMAL (INVERTER ONLINE)',
      statusColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30',
      inputVoltage: (231.2 + jitterVolt).toFixed(1),
      inputFrequency: (50.01 + jitterFreq).toFixed(2),
      outputVoltage: (230.0 + jitterVolt * 0.2).toFixed(1),
      outputFrequency: '50.00',
      loadPercent: Math.max(10, Math.min(100, 46 + jitterLoad)),
      batteryState: 'FLOAT CHARGE (100%)',
      batteryVoltage: (408.4 + jitterVolt * 0.1).toFixed(1),
      temperatureCelsius: '23.8',
      activePath: 'Online Double Conversion (AC-DC-AC)',
      event: 'Mains healthy; inverter delivering clean regulated sine-wave.',
    },
    networkStats: {
      latencyMs: (2.3 + Math.random() * 0.6).toFixed(1),
      packetsSent: 142095,
      trapsDispatched: 0,
    },
  });
}
