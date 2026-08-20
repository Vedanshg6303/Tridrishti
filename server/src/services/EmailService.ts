import nodemailer from 'nodemailer';

export class EmailService {
  private static transporter: nodemailer.Transporter | null = null;

  private static getTransporter(): nodemailer.Transporter | null {
    if (this.transporter) return this.transporter;

    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      console.log(
        '[EmailService] ⚠️ SMTP_USER or SMTP_PASS not set in server/.env. OTP email logged to server console.'
      );
      return null;
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    return this.transporter;
  }

  /**
   * Send 6-Digit OTP Email
   */
  public static async sendOtpEmail(toEmail: string, otp: string, type: string = 'SIGNUP'): Promise<boolean> {
    const transporter = this.getTransporter();
    const actionText = type === 'LOGIN' ? 'Sign In to your account' : 'Verify and activate your account';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0b0f19; color: #f8fafc; margin: 0; padding: 20px; }
          .container { max-width: 500px; margin: 0 auto; background: #111827; border: 1px solid #1e293b; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #1e1b4b, #0369a1); padding: 30px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; color: #38bdf8; letter-spacing: 2px; text-transform: uppercase; font-weight: 800; }
          .header p { margin: 5px 0 0; font-size: 12px; color: #94a3b8; letter-spacing: 1px; }
          .body { padding: 30px 25px; text-align: center; }
          .otp-box { background: #0f172a; border: 2px dashed #0284c7; border-radius: 12px; padding: 18px; margin: 25px 0; font-size: 32px; font-family: monospace; font-weight: 900; letter-spacing: 10px; color: #38bdf8; }
          .warning { font-size: 11px; color: #64748b; line-height: 1.5; margin-top: 20px; }
          .footer { background: #090d16; padding: 15px; text-align: center; font-size: 10px; color: #475569; border-top: 1px solid #1e293b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>👁️ TRIDRISHTI</h1>
            <p>Connect. Grow. Empower.</p>
          </div>
          <div class="body">
            <h2 style="font-size: 18px; color: #ffffff; margin-top: 0;">Verification Code</h2>
            <p style="font-size: 13px; color: #94a3b8;">Use the one-time code below to ${actionText}:</p>
            
            <div class="otp-box">${otp}</div>

            <p style="font-size: 12px; color: #f59e0b; font-weight: 600;">⏱️ This code will expire in 5 minutes.</p>
            <div class="warning">
              If you did not request this verification code, please ignore this email. Never share this code with anyone.
            </div>
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} Tridrishti.com. All rights reserved. • Automated Security Alert
          </div>
        </div>
      </body>
      </html>
    `;

    if (!transporter) {
      console.log(`\n======================================================`);
      console.log(`📧 [EMAIL SIMULATOR] To: ${toEmail}`);
      console.log(`🔑 [OTP CODE]: ${otp} (${type})`);
      console.log(`======================================================\n`);
      return false;
    }

    try {
      const fromAddress = process.env.EMAIL_FROM || `"Tridrishti Platform" <${process.env.SMTP_USER}>`;
      await transporter.sendMail({
        from: fromAddress,
        to: toEmail,
        subject: `🔐 Your Tridrishti Verification Code: ${otp}`,
        html: htmlContent,
      });

      console.log(`[EmailService] ✅ Live OTP Email successfully delivered to ${toEmail}`);
      return true;
    } catch (err: any) {
      console.error(`[EmailService Error] Failed to send email to ${toEmail}:`, err.message);
      return false;
    }
  }
}
