function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendContactEmail({ name, email, subject, message }) {
  const resendApiKey = process.env.RESEND_API_KEY || process.env.RESEND_KEY;
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  const ownerEmail = process.env.OWNER_EMAIL || process.env.TO_EMAIL || 'sdharaneeshwari8@gmail.com';
  const fromEmail = process.env.FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

  const emailSubject = `[Portfolio Contact] ${subject}`;
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; color: #333333;">
      <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-top: 0;">New Contact Form Message</h2>
      <p style="margin: 8px 0;"><strong>Sender Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 8px 0;"><strong>Sender Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #2563eb;">${escapeHtml(email)}</a></p>
      <p style="margin: 8px 0;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
      <h3 style="margin-bottom: 10px; color: #1e293b;">Message:</h3>
      <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb; white-space: pre-wrap; font-size: 15px; line-height: 1.5; color: #1e293b;">${escapeHtml(message)}</div>
      <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
      <p style="font-size: 12px; color: #64748b; margin: 0;">This email was sent from the contact form on S. Dharaneeshwari's Portfolio website.</p>
    </div>
  `;

  // Option 1: Send via Resend API
  if (resendApiKey) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey.trim()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [ownerEmail],
        reply_to: email.trim(),
        subject: emailSubject,
        html: htmlContent
      })
    });

    const data = await response.json();

    if (response.ok && data && (data.id || data.name)) {
      return { success: true, id: data.id };
    } else {
      const errMsg = (data && (data.message || data.error)) || `Resend API returned status ${response.status}`;
      throw new Error(`Resend email delivery failed: ${errMsg}`);
    }
  }

  // Option 2: Send via SMTP (Nodemailer) if SMTP credentials provided
  if (smtpUser && smtpPass) {
    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const info = await transporter.sendMail({
        from: `"${name.trim()}" <${smtpUser}>`,
        to: ownerEmail,
        replyTo: email.trim(),
        subject: emailSubject,
        html: htmlContent
      });

      return { success: true, id: info.messageId };
    } catch (smtpErr) {
      throw new Error(`SMTP email delivery failed: ${smtpErr.message}`);
    }
  }

  // No email service configured
  throw new Error('Email service is not configured. Please set RESEND_API_KEY in Vercel Environment Variables.');
}

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { name, email, subject, message } = body;

    if (!name || !name.trim() || !email || !email.trim() || !subject || !subject.trim() || !message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'All fields (Name, Email, Subject, Message) are required.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.'
      });
    }

    // Attempt real email sending
    await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim()
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you for your message! S. Dharaneeshwari will get back to you soon.'
    });
  } catch (error) {
    console.error('Contact email sending error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to send email. Please try again later.'
    });
  }
};
