import { NextResponse } from 'next/server';
import { readDb } from '@/lib/db';

export async function GET() {
  try {
    const db = await readDb();
    return NextResponse.json({
      status: 'UP',
      uptimeSeconds: process.uptime(),
      timestamp: new Date().toISOString(),
      service: 'Eazy Tech Solutions API Core',
      database: {
        enquiriesCount: db.enquiries.length,
        resourceRequestsCount: db.resourceRequests.length,
        lastUpdated: db.settings.lastUpdated,
      },
      environment: process.env.NODE_ENV || 'production',
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'DEGRADED', error: String(error) },
      { status: 500 }
    );
  }
}
