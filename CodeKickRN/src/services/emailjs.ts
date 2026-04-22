// ─── EmailJS Service — sends welcome email via EmailJS REST API ──────────────

const EMAILJS_BASE_URL = 'https://api.emailjs.com/api/v1.0/email/send';

/**
 * Send a welcome email to the new user via EmailJS.
 * Configure the EmailJS template with variables: {{to_name}}, {{to_email}}, {{app_name}}
 */
export const emailjsService = {
  async sendWelcomeEmail(toEmail: string, toName: string): Promise<void> {
    const serviceId = process.env.EXPO_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.EXPO_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EXPO_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // Dev mode: log to console when EmailJS is not configured
      console.log(`[DEV] Welcome email would be sent to ${toName} <${toEmail}>`);
      return;
    }

    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_name: toName,
        to_email: toEmail,
        app_name: 'CodeKick',
        message: `Welcome to CodeKick, ${toName}! 🚀\n\nYour account has been created successfully. Start exploring learning tracks in CP/DSA, AI/ML, Web2, and Web3.\n\nHappy coding!`,
      },
    };

    try {
      const response = await fetch(EMAILJS_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        console.warn(`EmailJS warning: ${text}`);
      }
    } catch (err) {
      // Don't block sign-up if welcome email fails
      console.warn('Failed to send welcome email:', err);
    }
  },
};
