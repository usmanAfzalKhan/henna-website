import nodemailer from "nodemailer";

// tiny helpers for safe HTML
const escapeHtml = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const row = (label, value) => `
  <tr>
    <td style="padding:8px 0;color:#ffe174;font-weight:700;width:140px;vertical-align:top;">
      ${escapeHtml(label)}
    </td>
    <td style="padding:8px 0;color:#f0f7f3;vertical-align:top;">
      ${escapeHtml(value)}
    </td>
  </tr>
`;

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body || "{}");
    const { name, phone, city, serviceTitle, dateVal, people, message } = data;

    // Basic validation
    if (!name || !phone || !city || !serviceTitle || !dateVal || !people) {
      return { statusCode: 400, body: "Missing required fields." };
    }

    const host = process.env.EMAIL_HOST || "smtp.gmail.com";
    const port = Number(process.env.EMAIL_PORT || 465);
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass) {
      return { statusCode: 500, body: "EMAIL_USER or EMAIL_PASS is not set." };
    }

    // Gmail SMTP
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // SSL on 465; STARTTLS if 587
      auth: { user, pass },
    });

    const to = process.env.EMAIL_TO || user;
    const subject = `Contact request: ${serviceTitle}`;

    // Plain text (fallback)
    const text =
`Name: ${name}
Phone: ${phone}
City: ${city}
Service: ${serviceTitle}
Event Day: ${dateVal}
Guests: ${people}

${message ? `Message:\n${message}\n\n` : ""}Sent from Mehndi By Simra site`;

    // HTML (pretty)
    const logoUrl = process.env.LOGO_URL || ""; // e.g. https://your-site.netlify.app/images/logo.png
    const html = `
  <div style="margin:0;padding:24px;background:#0f1a14;font-family:Inter,Segoe UI,Roboto,Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#103423;border:1px solid rgba(255,225,116,.22);border-radius:12px;overflow:hidden;">
      <tr>
        <td style="padding:20px 24px;text-align:center;background:#0e2c20;">
          ${logoUrl ? `<img src="${logoUrl}" alt="Mehndi By Simra" width="72" height="72" style="display:block;margin:0 auto 8px;border-radius:999px;" />` : ""}
          <div style="font-size:20px;line-height:1.2;color:#ffe174;font-weight:800;">New Contact Request</div>
          <div style="margin-top:6px;color:rgba(240,247,243,.75);font-size:12px;">
            ${escapeHtml(new Date().toLocaleString("en-CA"))}
          </div>
        </td>
      </tr>

      <tr>
        <td style="padding:16px 24px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
            ${row("Name", name)}
            ${row("Phone", phone)}
            ${row("City", city)}
            ${row("Service", serviceTitle)}
            ${row("Event Day", dateVal)}
            ${row("Guests", String(people))}
            ${
              message
                ? `<tr><td colspan="2" style="padding-top:12px;color:#ffe174;font-weight:700;">Message</td></tr>
                   <tr><td colspan="2" style="padding-top:6px;color:#f0f7f3;line-height:1.55;">
                     ${escapeHtml(message).replace(/\n/g, "<br>")}
                   </td></tr>`
                : ""
            }
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding:14px 24px;background:#0e2c20;color:rgba(240,247,243,.7);font-size:12px;text-align:center;">
          Sent from <span style="color:#ffe174;font-weight:700;">Mehndi By Simra</span> website
        </td>
      </tr>
    </table>
  </div>`;

    await transporter.sendMail({
      from: `"Mehndi By Simra Website" <${user}>`,
      to,
      subject,
      text,
      html,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
      headers: { "Content-Type": "application/json" },
    };
  } catch (err) {
    console.error("send-contact error:", err);
    return { statusCode: 500, body: String(err?.message || err) };
  }
};
