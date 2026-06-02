import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      mobile,
      interest,
      message,
      date,
      slot
    } = body;

    if (!name || !mobile || !date || !slot) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.CONTACT_RECEIVER_EMAIL) {
      console.error("Missing email environment variables: EMAIL_USER, EMAIL_PASS, or CONTACT_RECEIVER_EMAIL");
      return new Response(
        JSON.stringify({ success: false, error: "Email service is not configured. Please contact the administrator." }),
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Generate unique identifiers for each email
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const uniqueMessageId = `<booking-${timestamp}-${randomId}@yourdomain.com>`;

    const mailOptions = {
      from: `"Dental Clinic Booking" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: `🦷 New Appointment - ${name} - ${date}`, // Made subject unique

      // Add these headers to prevent email threading
      headers: {
        'Message-ID': uniqueMessageId,
        'X-Entity-Ref-ID': uniqueMessageId,
        'In-Reply-To': undefined,
        'References': undefined,
      },

      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Appointment Request</title>
  <style>
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; }
    table { border-collapse: collapse; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    @media screen and (max-width: 600px) {
      .container { width: 100% !important; padding: 10px !important; }
      .content { padding: 20px !important; }
      .info-row { flex-direction: column !important; }
      .info-label { width: 100% !important; margin-bottom: 5px; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F2F0E9;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F2F0E9; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
          
          <!-- Header with Icon -->
          <tr>
            <td style="background: linear-gradient(135deg, #3563A8 0%, #2A4E85 100%); padding: 40px 30px; text-align: center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <div style="width: 70px; height: 70px; background-color: rgba(255,255,255,0.2); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px; backdrop-filter: blur(10px);">
                      <span style="font-size: 36px;">🦷</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">New Appointment Request</h1>
                    <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px; font-weight: 400;">Booking ID: #${timestamp}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Appointment Date/Time Highlight -->
          <tr>
            <td style="padding: 0 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: -25px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #FA5424 0%, #E54418 100%); border-radius: 15px; padding: 25px; text-align: center; box-shadow: 0 8px 25px rgba(250, 84, 36, 0.3);">
                    <p style="margin: 0; color: rgba(255,255,255,0.9); font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Scheduled For</p>
                    <h2 style="margin: 8px 0 0 0; color: #ffffff; font-size: 22px; font-weight: 700; line-height: 1.3;">${date}</h2>
                    <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 20px; font-weight: 600;">🕐 ${slot}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Patient Details Section -->
          <tr>
            <td class="content" style="padding: 35px 30px;">
              <h3 style="margin: 0 0 25px 0; color: #1A1A1A; font-size: 18px; font-weight: 600; border-bottom: 2px solid #F2F0E9; padding-bottom: 12px;">Patient Information</h3>
              
              <!-- Info Rows -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <!-- Name -->
                <tr>
                  <td style="padding: 18px 0; border-bottom: 1px solid #F2F0E9;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="140" style="vertical-align: top;">
                          <div style="display: inline-flex; align-items: center; gap: 8px;">
                            <span style="font-size: 18px;">👤</span>
                            <span style="color: #3563A8; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</span>
                          </div>
                        </td>
                        <td style="color: #1A1A1A; font-size: 15px; font-weight: 500; vertical-align: top;">${name}</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Email -->
                <tr>
                  <td style="padding: 18px 0; border-bottom: 1px solid #F2F0E9;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="140" style="vertical-align: top;">
                          <div style="display: inline-flex; align-items: center; gap: 8px;">
                            <span style="font-size: 18px;">📧</span>
                            <span style="color: #3563A8; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                          </div>
                        </td>
                        <td style="vertical-align: top;">
                          <a href="mailto:${email}" style="color: #3563A8; font-size: 15px; font-weight: 500; text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 0.3s;">${email}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Mobile -->
                <tr>
                  <td style="padding: 18px 0; border-bottom: 1px solid #F2F0E9;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="140" style="vertical-align: top;">
                          <div style="display: inline-flex; align-items: center; gap: 8px;">
                            <span style="font-size: 18px;">📱</span>
                            <span style="color: #3563A8; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Mobile</span>
                          </div>
                        </td>
                        <td style="vertical-align: top;">
                          <a href="tel:${mobile}" style="color: #3563A8; font-size: 15px; font-weight: 500; text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 0.3s;">${mobile}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Interest -->
                <tr>
                  <td style="padding: 18px 0; border-bottom: 1px solid #F2F0E9;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="140" style="vertical-align: top;">
                          <div style="display: inline-flex; align-items: center; gap: 8px;">
                            <span style="font-size: 18px;">💡</span>
                            <span style="color: #3563A8; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Interest</span>
                          </div>
                        </td>
                        <td style="vertical-align: top;">
                          <span style="background-color: #FFF9F5; color: #FA5424; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; display: inline-block;">${interest || 'Not specified'}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                ${message ? `
                <!-- Message -->
                <tr>
                  <td style="padding: 18px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="140" style="vertical-align: top; padding-top: 2px;">
                          <div style="display: inline-flex; align-items: center; gap: 8px;">
                            <span style="font-size: 18px;">💬</span>
                            <span style="color: #3563A8; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Message</span>
                          </div>
                        </td>
                        <td style="color: #555555; font-size: 14px; line-height: 1.7; vertical-align: top;">${message}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- Action Required Alert -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color: #FFF9F5; border-left: 4px solid #FA5424; border-radius: 10px; padding: 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="30" style="vertical-align: top; padding-top: 2px;">
                          <span style="font-size: 20px;">⚡</span>
                        </td>
                        <td>
                          <p style="margin: 0; color: #1A1A1A; font-size: 14px; line-height: 1.6;">
                            <strong style="color: #FA5424; font-weight: 700;">Action Required:</strong> 
                            Please confirm this appointment with the patient as soon as possible to ensure they receive timely confirmation.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Call-to-Action Button -->
          <tr>
            <td style="padding: 0 30px 40px 30px;" align="center">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="background: linear-gradient(135deg, #3563A8 0%, #2A4E85 100%); border-radius: 50px; box-shadow: 0 8px 20px rgba(53, 99, 168, 0.3);">
                    <a href="tel:${mobile}" style="display: inline-block; padding: 16px 40px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.5px; text-transform: uppercase;">
                      📞 Contact Patient
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F9F8F4; padding: 30px; text-align: center; border-top: 1px solid #EFECE5;">
              <p style="margin: 0 0 8px 0; color: #999999; font-size: 12px; line-height: 1.6;">
                This is an automated message from your appointment booking system.
              </p>
              <p style="margin: 0; color: #CCCCCC; font-size: 11px;">
                © ${new Date().getFullYear()} Your Dental Clinic. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );

  } catch (error) {
    console.error("CONTACT API ERROR:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Server error" }),
      { status: 500 }
    );
  }
}
