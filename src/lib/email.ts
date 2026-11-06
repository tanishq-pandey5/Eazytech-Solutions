import nodemailer from 'nodemailer';
import { EnquiryRecord } from './db';
import { COMPANY_DETAILS } from '@/data/companyData';

interface EmailResult {
  success: boolean;
  mode: 'smtp' | 'resend' | 'local_outbox' | 'disabled';
  error?: string;
}

/**
 * Send an email via Resend API (HTTP REST).
 */
async function sendViaResend(options: {
  to: string | string[];
  replyTo?: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || `${COMPANY_DETAILS.name} <onboarding@resend.dev>`,
      to: Array.isArray(options.to) ? options.to : [options.to],
      reply_to: options.replyTo,
      subject: options.subject,
      html: options.html,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('[Resend Error]', res.status, errText);
    throw new Error(`Resend error: ${errText}`);
  }

  return true;
}

/**
 * Helper to get configured nodemailer transporter.
 * Supports Gmail SMTP (with App Password) or custom SMTP host/port.
 */
function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  const cleanPass = pass.replace(/\s+/g, '');
  const isGmail = user.toLowerCase().endsWith('@gmail.com') || process.env.SMTP_SERVICE?.toLowerCase() === 'gmail';

  if (isGmail) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass: cleanPass,
      },
    });
  }

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass: cleanPass,
    },
  });
}

/**
 * Send quotation / technical consultation enquiry notification to company and acknowledgment to client.
 */
export async function sendEnquiryEmails(enquiry: EnquiryRecord): Promise<EmailResult> {
  const recipientEmail = process.env.NOTIFICATION_EMAIL || `${COMPANY_DETAILS.contactEmail}, eazytechsolutions@hotmail.com`;
  const senderEmail = process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@eazytechsolutions.com';

  const teamEmailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; padding: 32px 16px; color: #0F172A;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="background-color: #0284C7; padding: 24px 32px; color: #FFFFFF;">
          <h1 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">New Technical Inquiry &amp; Quote Request</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; color: #E0F2FE;">
            Ref: <strong>${enquiry.id}</strong> • ${new Date(enquiry.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
          </p>
        </div>

        <!-- Body -->
        <div style="padding: 28px 32px;">
          <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.5; color: #334155;">
            A new enquiry has been submitted on <strong>eazytechsolutions.vercel.app</strong>:
          </p>

          <table style="width: 100%; border-collapse: separate; border-spacing: 0; font-size: 14px; margin-bottom: 24px; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
            <tbody>
              <tr style="background-color: #F8FAFC;">
                <td style="padding: 12px 16px; font-weight: 600; color: #475569; width: 170px; border-bottom: 1px solid #E2E8F0;">Client Name:</td>
                <td style="padding: 12px 16px; font-weight: 700; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${enquiry.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; font-weight: 600; color: #475569; border-bottom: 1px solid #E2E8F0;">Business Email:</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0;">
                  <a href="mailto:${enquiry.businessEmail}" style="color: #0284C7; font-weight: 600; text-decoration: none;">${enquiry.businessEmail}</a>
                </td>
              </tr>
              <tr style="background-color: #F8FAFC;">
                <td style="padding: 12px 16px; font-weight: 600; color: #475569; border-bottom: 1px solid #E2E8F0;">Phone Number:</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0;">
                  ${enquiry.phoneNumber ? `<a href="tel:${enquiry.phoneNumber}" style="color: #0F172A; font-weight: 600; text-decoration: none;">${enquiry.phoneNumber}</a>` : '<span style="color: #94A3B8;">Not provided</span>'}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; font-weight: 600; color: #475569; border-bottom: 1px solid #E2E8F0;">Company / Org:</td>
                <td style="padding: 12px 16px; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${enquiry.companyName || '<span style="color: #94A3B8;">Individual / Not specified</span>'}</td>
              </tr>
              <tr style="background-color: #F8FAFC;">
                <td style="padding: 12px 16px; font-weight: 600; color: #475569; border-bottom: 1px solid #E2E8F0;">Service / Offering:</td>
                <td style="padding: 12px 16px; font-weight: 700; color: #0284C7; border-bottom: 1px solid #E2E8F0;">${enquiry.serviceRequired}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; font-weight: 600; color: #475569; border-bottom: 1px solid #E2E8F0;">Site Location:</td>
                <td style="padding: 12px 16px; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${enquiry.siteLocation || '<span style="color: #94A3B8;">Not specified</span>'}</td>
              </tr>
              <tr style="background-color: #F8FAFC;">
                <td style="padding: 12px 16px; font-weight: 600; color: #475569;">Equipment / Sizing:</td>
                <td style="padding: 12px 16px; color: #0F172A;">${enquiry.equipmentModel || '<span style="color: #94A3B8;">Not specified</span>'}</td>
              </tr>
            </tbody>
          </table>

          <div style="background-color: #F1F5F9; border-left: 4px solid #0284C7; border-radius: 4px; padding: 16px; margin-bottom: 24px;">
            <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #0369A1;">Requirement Details</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1E293B; white-space: pre-wrap;">${enquiry.requirementDescription}</p>
          </div>

          <div style="text-align: center; margin-top: 24px;">
            <a href="mailto:${enquiry.businessEmail}?subject=Re:%20Eazy%20Tech%20Solutions%20-%20${encodeURIComponent(enquiry.serviceRequired)}" style="display: inline-block; background-color: #0284C7; color: #FFFFFF; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-right: 8px;">Reply to Client</a>
            ${enquiry.phoneNumber ? `<a href="tel:${enquiry.phoneNumber}" style="display: inline-block; background-color: #0F172A; color: #FFFFFF; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 6px; text-decoration: none;">Call Client</a>` : ''}
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 16px 32px; font-size: 12px; color: #64748B; text-align: center;">
          <p style="margin: 0;"><strong>${COMPANY_DETAILS.name}</strong> • ${COMPANY_DETAILS.tagline}</p>
          <p style="margin: 4px 0 0 0;">${COMPANY_DETAILS.registeredOffice.fullAddress} • Phone: ${COMPANY_DETAILS.contactPhone}</p>
        </div>

      </div>
    </div>
  `;

  const clientAcknowledgmentHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; padding: 32px 16px; color: #0F172A;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        
        <div style="background-color: #0284C7; padding: 24px 32px; color: #FFFFFF;">
          <h1 style="margin: 0; font-size: 20px; font-weight: 700;">Thank You for Contacting Eazy Tech Solutions</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; color: #E0F2FE;">Your Inquiry Reference ID: <strong>${enquiry.id}</strong></p>
        </div>

        <div style="padding: 28px 32px;">
          <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #1E293B;">
            Dear <strong>${enquiry.fullName}</strong>,
          </p>
          <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #334155;">
            Thank you for reaching out to Eazy Tech Solutions regarding <strong>${enquiry.serviceRequired}</strong>. Our critical power engineering team has received your technical requirement and is reviewing your specifications.
          </p>
          <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #334155;">
            A senior solutions engineer will contact you shortly to discuss your requirements, provide detailed sizing/specifications, or arrange an on-site evaluation.
          </p>

          <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
            <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #0F172A;">Summary of Your Submission:</p>
            <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569; line-height: 1.6;">
              <li><strong>Service / Product:</strong> ${enquiry.serviceRequired}</li>
              ${enquiry.equipmentModel ? `<li><strong>Equipment / Capacity:</strong> ${enquiry.equipmentModel}</li>` : ''}
              ${enquiry.siteLocation ? `<li><strong>Location:</strong> ${enquiry.siteLocation}</li>` : ''}
            </ul>
          </div>

          <div style="background-color: #EFF6FF; border-left: 4px solid #0284C7; border-radius: 4px; padding: 14px; font-size: 13px; color: #1E40AF; line-height: 1.5;">
            <strong>Need immediate assistance or emergency dispatch?</strong><br />
            Call our 24/7 technical desk directly at <a href="tel:${COMPANY_DETAILS.phoneRaw}" style="color: #0284C7; font-weight: 700; text-decoration: none;">${COMPANY_DETAILS.contactPhone}</a> or email <a href="mailto:${COMPANY_DETAILS.contactEmail}" style="color: #0284C7; font-weight: 700; text-decoration: none;">${COMPANY_DETAILS.contactEmail}</a>.
          </div>
        </div>

        <div style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 16px 32px; font-size: 12px; color: #64748B; text-align: center;">
          <p style="margin: 0;"><strong>${COMPANY_DETAILS.name}</strong> • ${COMPANY_DETAILS.tagline}</p>
          <p style="margin: 4px 0 0 0;">${COMPANY_DETAILS.registeredOffice.fullAddress}</p>
        </div>

      </div>
    </div>
  `;

  // 1. Try Resend API first if configured
  if (process.env.RESEND_API_KEY) {
    try {
      await sendViaResend({
        to: recipientEmail,
        replyTo: enquiry.businessEmail,
        subject: `[New Inquiry ${enquiry.id}] ${enquiry.serviceRequired} — ${enquiry.fullName}`,
        html: teamEmailHtml,
      });

      // Best effort client acknowledgment
      try {
        await sendViaResend({
          to: enquiry.businessEmail,
          replyTo: recipientEmail,
          subject: `Inquiry Received: ${enquiry.serviceRequired} [Ref: ${enquiry.id}]`,
          html: clientAcknowledgmentHtml,
        });
      } catch (ackErr) {
        console.warn('[Resend] Client acknowledgment skipped:', ackErr);
      }

      console.log(`[Email Dispatch] Successfully sent inquiry alert ${enquiry.id} via Resend to ${recipientEmail}`);
      return { success: true, mode: 'resend' };
    } catch (resendError: any) {
      console.error('[Email Dispatch] Resend failed, falling back to SMTP:', resendError);
    }
  }

  // 2. Try Nodemailer SMTP if configured
  const transporter = getTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"${COMPANY_DETAILS.name} Website" <${senderEmail}>`,
        to: recipientEmail,
        replyTo: enquiry.businessEmail,
        subject: `[New Inquiry ${enquiry.id}] ${enquiry.serviceRequired} — ${enquiry.fullName}`,
        html: teamEmailHtml,
      });

      try {
        await transporter.sendMail({
          from: `"${COMPANY_DETAILS.name}" <${senderEmail}>`,
          to: enquiry.businessEmail,
          replyTo: recipientEmail,
          subject: `Inquiry Received: ${enquiry.serviceRequired} [Ref: ${enquiry.id}]`,
          html: clientAcknowledgmentHtml,
        });
      } catch (ackError) {
        console.warn(`[Email Dispatch] Client acknowledgment receipt skipped:`, ackError);
      }

      console.log(`[Email Dispatch] Successfully sent inquiry alert ${enquiry.id} via SMTP to ${recipientEmail}`);
      return { success: true, mode: 'smtp' };
    } catch (error: any) {
      console.error('[Email Dispatch] SMTP error sending enquiry emails:', error);
      return { success: false, mode: 'smtp', error: error?.message || 'SMTP transmission failure' };
    }
  }

  // Fallback: If neither configured, log simulation
  console.log(`[Email Dispatch Notice] No SMTP or Resend credentials provided. Enquiry ${enquiry.id} logged.`);
  return { success: true, mode: 'local_outbox' };
}

/**
 * Send resource download lead notification to the company.
 */
export async function sendResourceNotificationEmail(params: {
  resourceTitle: string;
  businessEmail: string;
  fullName?: string;
}): Promise<EmailResult> {
  const recipientEmail = process.env.NOTIFICATION_EMAIL || `${COMPANY_DETAILS.contactEmail}, eazytechsolutions@hotmail.com`;
  const senderEmail = process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@eazytechsolutions.com';

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; padding: 24px 16px; color: #0F172A;">
      <div style="max-width: 560px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <h2 style="color: #0284C7; margin: 0 0 12px 0; font-size: 18px;">Technical Resource Downloaded</h2>
        <p style="font-size: 14px; color: #475569; margin: 0 0 16px 0;">A visitor requested technical documentation on the website:</p>
        <table style="width: 100%; font-size: 14px; border-collapse: collapse; border: 1px solid #E2E8F0; border-radius: 6px; overflow: hidden; margin-bottom: 20px;">
          <tr style="background-color: #F8FAFC;">
            <td style="padding: 10px 14px; color: #64748B; width: 140px; border-bottom: 1px solid #E2E8F0; font-weight: 600;">Resource:</td>
            <td style="padding: 10px 14px; font-weight: 700; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${params.resourceTitle}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; color: #64748B; border-bottom: 1px solid #E2E8F0; font-weight: 600;">Visitor Email:</td>
            <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0;"><a href="mailto:${params.businessEmail}" style="color: #0284C7; font-weight: 600; text-decoration: none;">${params.businessEmail}</a></td>
          </tr>
          ${params.fullName ? `<tr style="background-color: #F8FAFC;"><td style="padding: 10px 14px; color: #64748B; border-bottom: 1px solid #E2E8F0; font-weight: 600;">Visitor Name:</td><td style="padding: 10px 14px; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${params.fullName}</td></tr>` : ''}
          <tr>
            <td style="padding: 10px 14px; color: #64748B; font-weight: 600;">Timestamp:</td>
            <td style="padding: 10px 14px; color: #0F172A;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td>
          </tr>
        </table>
        <div>
          <a href="mailto:${params.businessEmail}?subject=Eazy%20Tech%20Solutions%20-%20${encodeURIComponent(params.resourceTitle)}" style="display: inline-block; background-color: #0284C7; color: #FFFFFF; font-weight: 600; font-size: 13px; padding: 10px 20px; border-radius: 6px; text-decoration: none;">Follow Up with Lead</a>
        </div>
      </div>
    </div>
  `;

  if (process.env.RESEND_API_KEY) {
    try {
      await sendViaResend({
        to: recipientEmail,
        replyTo: params.businessEmail,
        subject: `[Resource Lead] ${params.resourceTitle} — ${params.fullName || params.businessEmail}`,
        html,
      });
      console.log(`[Email Dispatch] Sent resource notification for "${params.resourceTitle}" via Resend to ${recipientEmail}`);
      return { success: true, mode: 'resend' };
    } catch (err: any) {
      console.warn('[Resend] Resource lead email failed:', err);
    }
  }

  const transporter = getTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"${COMPANY_DETAILS.name} Portal" <${senderEmail}>`,
        to: recipientEmail,
        replyTo: params.businessEmail,
        subject: `[Resource Lead] ${params.resourceTitle} — ${params.fullName || params.businessEmail}`,
        html,
      });
      console.log(`[Email Dispatch] Sent resource notification for "${params.resourceTitle}" to ${recipientEmail}`);
      return { success: true, mode: 'smtp' };
    } catch (err: any) {
      console.error('[Email Dispatch] Resource lead email failed:', err);
      return { success: false, mode: 'smtp', error: err?.message };
    }
  }

  return { success: true, mode: 'local_outbox' };
}
