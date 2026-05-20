const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async ({ to, subject, html, text }) => {
  try {
    console.log("📤 Sending email to:", to);

    const data = await resend.emails.send({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html: html || `<p>${text}</p>`,
      text,
    });

    console.log("✅ Resend success:", data);
    return data;
  } catch (error) {
    console.error("❌ Resend error:", error);
    throw new Error("Email sending failed");
  }
};

const sendWelcomeEmail = async (user) => {
  return sendMail({
    to: user.email,
    subject: `Welcome to Satinder Poetry ✨`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

<title>Welcome to Satinder Poetry</title>
</head>

<body style="
  margin:0;
  padding:0;
  background-color:#f5f5f5;
  font-family:Arial,Helvetica,sans-serif;
">

<table width="100%" cellpadding="0" cellspacing="0" border="0"
style="background-color:#f5f5f5;">

<tr>
<td align="center" style="padding:40px 16px;">

<!-- Container -->
<table width="100%" cellpadding="0" cellspacing="0" border="0"
style="
  max-width:560px;
  background-color:#ffffff;
  border-radius:18px;
  overflow:hidden;
  border:1px solid #e5e7eb;
">

<!-- Header -->
<tr>
<td align="center"
style="
  padding:56px 32px 40px;
  background-color:#ffffff;
">

<div style="
  font-size:13px;
  letter-spacing:2px;
  color:#6b7280;
  margin-bottom:18px;
">
SATINDER POETRY
</div>

<h1 style="
  margin:0;
  font-size:34px;
  line-height:42px;
  color:#111827;
  font-weight:700;
">
Welcome, ${user.name}
</h1>

<p style="
  margin:22px auto 0;
  max-width:420px;
  color:#4b5563;
  font-size:16px;
  line-height:30px;
">
Thank you for joining a space built for poetry,
emotion, silence, and reflection.
</p>

</td>
</tr>

<!-- Divider -->
<tr>
<td>
<div style="
  height:1px;
  background-color:#e5e7eb;
"></div>
</td>
</tr>

<!-- Content -->
<tr>
<td style="
  padding:40px 32px;
">

<h2 style="
  margin:0 0 24px;
  font-size:22px;
  color:#111827;
  font-weight:600;
">
What You’ll Receive
</h2>

<p style="
  margin:0 0 16px;
  color:#374151;
  font-size:16px;
  line-height:28px;
">
• New poetry updates
</p>

<p style="
  margin:0 0 16px;
  color:#374151;
  font-size:16px;
  line-height:28px;
">
• Carefully written emotional poems
</p>

<p style="
  margin:0 0 16px;
  color:#374151;
  font-size:16px;
  line-height:28px;
">
• Stories and reflections behind the words
</p>

<p style="
  margin:0;
  color:#374151;
  font-size:16px;
  line-height:28px;
">
• A calm and meaningful reading experience
</p>

<!-- Button -->
<div style="text-align:center; margin-top:42px;">

<a href="https://satinderpoetry.com/poems"
style="
  display:inline-block;
  background-color:#111827;
  color:#ffffff;
  text-decoration:none;
  padding:14px 30px;
  border-radius:999px;
  font-size:15px;
  font-weight:600;
">
Start Reading
</a>

</div>

</td>
</tr>

<!-- Quote -->
<tr>
<td style="
  padding:0 32px 40px;
">

<div style="
  border-left:3px solid #d1d5db;
  padding-left:18px;
">

<p style="
  margin:0;
  color:#6b7280;
  font-size:16px;
  line-height:32px;
  font-style:italic;
">
“Poetry begins where ordinary words
can no longer hold emotion.”
</p>

</div>

</td>
</tr>

<!-- Footer -->
<tr>
<td align="center"
style="
  padding:32px;
  background-color:#fafafa;
  border-top:1px solid #e5e7eb;
">

<h3 style="
  margin:0;
  font-size:18px;
  color:#111827;
  font-weight:600;
">
✒️ Satinder Poetry
</h3>

<p style="
  margin:14px 0 24px;
  color:#6b7280;
  font-size:14px;
  line-height:26px;
">
Crafted with emotion and simplicity.
</p>

<p style="margin:0 0 18px;">

<a href="https://satinder-portfolio.vercel.app"
style="
  color:#4b5563;
  text-decoration:none;
  margin:0 8px;
  font-size:14px;
">
Portfolio
</a>

<a href="https://github.com/SatinderSinghSall"
style="
  color:#4b5563;
  text-decoration:none;
  margin:0 8px;
  font-size:14px;
">
GitHub
</a>

<a href="https://www.linkedin.com/in/satinder-singh-sall-b62049204/"
style="
  color:#4b5563;
  text-decoration:none;
  margin:0 8px;
  font-size:14px;
">
LinkedIn
</a>

</p>

<p style="
  margin:0;
  color:#9ca3af;
  font-size:12px;
  line-height:22px;
">
© ${new Date().getFullYear()} Satinder Poetry<br/>
All rights reserved.
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
  });
};

module.exports = {
  sendMail,
  sendWelcomeEmail,
};
