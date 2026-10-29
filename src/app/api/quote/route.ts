import { NextRequest, NextResponse } from 'next/server';
import { createEnquiry, getEnquiries, updateEnquiry } from '@/lib/db';
import { sendEnquiryEmails } from '@/lib/email';

// Simple in-memory rate limiting map (IP -> timestamps array)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10;

  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return false;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

/**
 * POST /api/quote
 * Submit a critical power quote or technical inquiry.
 */
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a minute before submitting again.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Anti-spam honeypot
    if (body.website_trap || body.bot_catch) {
      return NextResponse.json({ success: true, message: 'Enquiry received.' });
    }

    const {
      fullName,
      businessEmail,
      companyName,
      phoneNumber,
      serviceRequired,
      siteLocation,
      equipmentModel,
      requirementDescription,
      consent,
    } = body;

    // Server-side validation
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return NextResponse.json({ success: false, error: 'Full name is required.' }, { status: 400 });
    }

    if (!businessEmail || typeof businessEmail !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessEmail)) {
      return NextResponse.json({ success: false, error: 'A valid business email is required.' }, { status: 400 });
    }

    if (!serviceRequired || typeof serviceRequired !== 'string') {
      return NextResponse.json({ success: false, error: 'Service required selection is required.' }, { status: 400 });
    }

    if (
      !requirementDescription ||
      typeof requirementDescription !== 'string' ||
      requirementDescription.trim().length < 10
    ) {
      return NextResponse.json(
        { success: false, error: 'Please provide at least 10 characters detailing your requirement.' },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { success: false, error: 'Submission consent is required to process technical queries.' },
        { status: 400 }
      );
    }

    // Persist to database
    const newEnquiry = await createEnquiry({
      fullName: fullName.trim(),
      businessEmail: businessEmail.trim().toLowerCase(),
      companyName: companyName ? String(companyName).trim() : undefined,
      phoneNumber: phoneNumber ? String(phoneNumber).trim() : undefined,
      serviceRequired: String(serviceRequired).trim(),
      siteLocation: siteLocation ? String(siteLocation).trim() : undefined,
      equipmentModel: equipmentModel ? String(equipmentModel).trim() : undefined,
      requirementDescription: requirementDescription.trim(),
      consent: Boolean(consent),
      sourceIp: ip,
    });

    // Send emails / write outbox
    const emailRes = await sendEnquiryEmails(newEnquiry);
    if (emailRes.success) {
      await updateEnquiry(newEnquiry.id, {
        emailStatus: emailRes.mode === 'smtp' ? 'SENT' : 'QUEUED_LOCAL',
      });
    }

    return NextResponse.json(
      {
        success: true,
        enquiryId: newEnquiry.id,
        message: 'Your critical power enquiry has been securely logged and dispatched for engineering review.',
        enquiry: {
          id: newEnquiry.id,
          createdAt: newEnquiry.createdAt,
          fullName: newEnquiry.fullName,
          serviceRequired: newEnquiry.serviceRequired,
          status: newEnquiry.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API /api/quote POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while processing quotation enquiry.' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/quote
 * Query stored inquiries with status, service, and search filters.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;
    const service = searchParams.get('service') || undefined;
    const search = searchParams.get('search') || undefined;

    const list = await getEnquiries({ status, service, search });

    return NextResponse.json({
      success: true,
      count: list.length,
      enquiries: list,
    });
  } catch (error) {
    console.error('API /api/quote GET error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch enquiries.' }, { status: 500 });
  }
}

/**
 * PATCH /api/quote
 * Update inquiry status or add internal engineering notes.
 */
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, note } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ success: false, error: 'Enquiry ID is required.' }, { status: 400 });
    }

    const updated = await updateEnquiry(id, {
      status,
      note,
    });

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Enquiry not found.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Enquiry ${id} updated successfully.`,
      enquiry: updated,
    });
  } catch (error) {
    console.error('API /api/quote PATCH error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update enquiry.' }, { status: 500 });
  }
}
