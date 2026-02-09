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

module.exports = { sendMail };
