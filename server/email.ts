
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to: string, name?: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'TypeBeat Studio <onboarding@resend.dev>',
      to: to,
      subject: 'Welcome to TypeBeat Studio!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">Welcome to TypeBeat Studio!</h1>
          ${name ? `<p>Hi ${name},</p>` : '<p>Hi there,</p>'}
          <p>Thanks for your interest in TypeBeat Studio - the ultimate desktop app for creating professional type beat videos.</p>
          <p>We'll keep you updated on our latest features and release updates.</p>
          <p style="text-align: center; margin-top: 30px;">
            <strong>The TypeBeat Studio Team</strong>
          </p>
        </div>
      `
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    return { success: false, error };
  }
}

export async function sendContactEmail(from: string, name: string, message: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'TypeBeat Studio <onboarding@resend.dev>',
      to: 'typebeatz@voodoo808.com',
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${from}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      `,
      replyTo: from
    });

    if (error) {
      console.error('Contact email send error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Contact email service error:', error);
    return { success: false, error };
  }
}
