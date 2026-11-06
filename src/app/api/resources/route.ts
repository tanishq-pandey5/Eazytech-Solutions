import { NextRequest, NextResponse } from 'next/server';
import { createResourceRequest } from '@/lib/db';
import { sendResourceNotificationEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resourceTitle, businessEmail, fullName } = body;

    if (!businessEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessEmail)) {
      return NextResponse.json({ success: false, error: 'A valid email is required.' }, { status: 400 });
    }

    if (!resourceTitle) {
      return NextResponse.json({ success: false, error: 'Resource title is required.' }, { status: 400 });
    }

    const requestLog = await createResourceRequest({
      resourceTitle,
      businessEmail,
      fullName,
    });

    // Send email alert to company inbox (non-blocking for visitor download UX)
    sendResourceNotificationEmail({
      resourceTitle,
      businessEmail,
      fullName,
    }).catch((err) => console.error('Background resource notification error:', err));

    return NextResponse.json({
      success: true,
      message: `Technical brief for "${resourceTitle}" has been logged. Access granted.`,
      requestId: requestLog.id,
      downloadUrl: `/docs/${encodeURIComponent(resourceTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}.pdf`,
    });
  } catch (error) {
    console.error('API /api/resources error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process resource request.' }, { status: 500 });
  }
}
