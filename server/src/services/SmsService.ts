export class SmsService {
  /**
   * Normalize Phone Number to 10-digit Indian Mobile format or international digits
   */
  public static normalizePhoneNumber(rawPhone: string): string {
    const digitsOnly = rawPhone.replace(/\D/g, '');
    // If starts with 91 and has 12 digits, return last 10
    if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
      return digitsOnly.slice(2);
    }
    // If starts with 0 and has 11 digits
    if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
      return digitsOnly.slice(1);
    }
    return digitsOnly;
  }

  /**
   * Send 6-digit OTP SMS to Mobile Phone Number
   */
  public static async sendOtpSms(phone: string, otp: string, type: string = 'SIGNUP'): Promise<boolean> {
    const cleanPhone = this.normalizePhoneNumber(phone);
    const actionText = type === 'LOGIN' ? 'login' : 'registration';
    const message = `Your Tridrishti ${actionText} verification OTP is ${otp}. Valid for 5 minutes. Do not share with anyone. - TRIDRISHTI`;

    // 1. Fast2SMS Integration (Instant Indian SMS Gateway)
    const fast2smsApiKey = process.env.FAST2SMS_API_KEY;
    if (fast2smsApiKey) {
      try {
        const res = await fetch('https://www.fast2sms.com/dev/bulkV2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: fast2smsApiKey,
          },
          body: JSON.stringify({
            variables_values: otp,
            route: 'otp',
            numbers: cleanPhone,
          }),
        });

        const data: any = await res.json();
        if (data && data.return) {
          console.log(`[SmsService Fast2SMS] ✅ Live OTP SMS sent to +91 ${cleanPhone}`);
          return true;
        }
      } catch (err: any) {
        console.error('[SmsService Fast2SMS Error]:', err.message);
      }
    }

    // 2. Twilio SMS Integration
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
    const twilioFrom = process.env.TWILIO_PHONE_NUMBER;

    if (twilioSid && twilioAuth && twilioFrom) {
      try {
        const fullNumber = phone.startsWith('+') ? phone : `+91${cleanPhone}`;
        const authHeader = 'Basic ' + Buffer.from(`${twilioSid}:${twilioAuth}`).toString('base64');
        const params = new URLSearchParams();
        params.append('To', fullNumber);
        params.append('From', twilioFrom);
        params.append('Body', message);

        const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
          method: 'POST',
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        });

        if (res.ok) {
          console.log(`[SmsService Twilio] ✅ Live OTP SMS delivered to ${fullNumber}`);
          return true;
        }
      } catch (err: any) {
        console.error('[SmsService Twilio Error]:', err.message);
      }
    }

    // Fallback: Console SMS Simulator
    console.log(`\n======================================================`);
    console.log(`📱 [SMS GATEWAY SIMULATOR] To: +91 ${cleanPhone}`);
    console.log(`💬 [SMS TEXT]: "${message}"`);
    console.log(`🔑 [OTP CODE]: ${otp}`);
    console.log(`======================================================\n`);
    return false;
  }
}
