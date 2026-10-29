import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import { EnquiryRecord } from './db';
import { COMPANY_DETAILS } from '@/data/companyData';

const OUTBOX_LOG = path.join(process.cwd(), 'data', 'outbox.log');

/**
 * Send quotation enquiry notification and client acknowledgment.
 */
export async function sendEnquiryEmails(enquiry: EnquiryRecord): Promise<{ success: boolean; mode: 'smtp' | 'local_outbox' }> {
  const hasSmtpConfig = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

  const teamEmailHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #071321; color: #F4F7FB; padding: 24px; border-radius: 8px;">
      <div style="border-bottom: 2px solid #36D7F5; padding-bottom: 12px; margin-bottom: 16px;">
        <h2 style="color: #36D7F5; margin: 0;">New Critical Power Enquiry</h2>
        <p style="color: #B7C5D6; margin: 4px 0 0 0; font-size: 13px;">Reference ID: <strong>${enquiry.id}</strong> • Submitted: ${new Date(enquiry.createdAt).toLocaleString('en-IN')}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #F4F7FB;">
        <tr>
          <td style="padding: 8px; color: #36D7F5; font-weight: bold; width: 180px;">Client Name:</td>
          <td style="padding: 8px; background-color: #101F30;">${enquiry.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; color: #36D7F5; font-weight: bold;">Business Email:</td>
          <td style="padding: 8px; background-color: #0B1827;"><a href="mailto:${enquiry.businessEmail}" style="color: #36D7F5;">${enquiry.businessEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; color: #36D7F5; font-weight: bold;">Company / Org:</td>
          <td style="padding: 8px; background-color: #101F30;">${enquiry.companyName || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; color: #36D7F5; font-weight: bold;">Phone Number:</td>
          <td style="padding: 8px; background-color: #0B1827;">${enquiry.phoneNumber ? `<a href="tel:${enquiry.phoneNumber}" style="color: #F4F7FB;">${enquiry.phoneNumber}</a>` : 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; color: #36D7F5; font-weight: bold;">Service Required:</td>
          <td style="padding: 8px; background-color: #101F30; font-weight: bold; color: #36D7F5;">${enquiry.serviceRequired}</td>
        </tr>
        <tr>
          <td style="padding: 8px; color: #36D7F5; font-weight: bold;">Site Location:</td>
          <td style="padding: 8px; background-color: #0B1827;">${enquiry.siteLocation || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; color: #36D7F5; font-weight: bold;">Equipment Model / Sizing:</td>
          <td style="padding: 8px; background-color: #101F30;">${enquiry.equipmentModel || 'Not specified'}</td>
        </tr>
      </table>

      <div style="margin-top: 16px; background-color: #101F30; padding: 16px; border-radius: 6px; border-left: 4px solid #36D7F5;">
        <h4 style="margin: 0 0 8px 0; color: #36D7F5; font-size: 13px; text-transform: uppercase;">Requirement Parameters:</h4>
        <p style="margin: 0; line-height: 1.5; font-size: 14px; white-space: pre-wrap;">${enquiry.requirementDescription}</p>
      </div>

      <div style="margin-top: 20px; font-size: 12px; color: #B7C5D6; border-top: 1px solid rgba(115,160,190,0.2); padding-top: 12px;">
        Eazy Tech Solutions Dispatcher • Registered Office: ${COMPANY_DETAILS.registeredOffice.fullAddress}
      </div>
    </div>
  `;

  if (hasSmtpConfig) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${COMPANY_DETAILS.name} Portal" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: process.env.NOTIFICATION_EMAIL || COMPANY_DETAILS.contactEmail,
        replyTo: enquiry.businessEmail,
        subject: `[New Lead ${enquiry.id}] ${enquiry.serviceRequired} — ${enquiry.fullName}`,
        html: teamEmailHtml,
      });

      return { success: true, mode: 'smtp' };
    } catch (error) {
      console.error('SMTP error, falling back to local outbox log:', error);
    }
  }

  // Fallback / Default Mode: append to local outbox log
  try {
    const logEntry = `
================================================================================
TIME: ${new Date().toISOString()}
TYPE: QUOTATION_ENQUIRY
REFERENCE: ${enquiry.id}
TO: ${COMPANY_DETAILS.contactEmail}
REPLY-TO: ${enquiry.businessEmail}
CLIENT: ${enquiry.fullName} (${enquiry.companyName || 'N/A'})
PHONE: ${enquiry.phoneNumber || 'N/A'}
SERVICE: ${enquiry.serviceRequired}
LOCATION: ${enquiry.siteLocation || 'N/A'}
EQUIPMENT: ${enquiry.equipmentModel || 'N/A'}
DESCRIPTION:
${enquiry.requirementDescription}
================================================================================
`;
    await fs.mkdir(path.dirname(OUTBOX_LOG), { recursive: true });
    await fs.appendFile(OUTBOX_LOG, logEntry, 'utf-8');
    return { success: true, mode: 'local_outbox' };
  } catch (err) {
    console.error('Error logging to local outbox:', err);
    return { success: false, mode: 'local_outbox' };
  }
}
