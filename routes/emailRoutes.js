const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../models/User.js");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "satindersinghsall2003@gmail.com",
    pass: "lneo wgao shgl uocy",
  },
});

router.post("/send-email", async (req, res) => {
  const { title, author, date } = req.body;

  try {
    const users = await User.find({}, "email"); // Get only emails
    const emails = users.map((user) => user.email);

    if (emails.length === 0) {
      return res.status(400).json({ message: "No users found to send emails" });
    }

    const mailOptions = {
      from: '"The Poet\'s Corner 📜" <satindersinghsall2003@gmail.com>',
      to: emails.join(","),
      subject: "📜 New Poem Added! 🌟",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
          <h2 style="color: #333; text-align: center;">📖 A New Poem Has Arrived!</h2>
          <p style="font-size: 16px; color: #555;">We have an exciting new addition to our poetry collection!</p>
          <div style="padding: 15px; background: #ffffff; border-radius: 5px; box-shadow: 0px 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #007bff; margin: 0;">"${title}"</h3>
            <p style="margin: 5px 0;"><strong>By:</strong> ${author}</p>
            <p style="margin: 5px 0;"><strong>Published On:</strong> ${new Date(
              date
            ).toLocaleDateString()}</p>
          </div>
          <p style="margin-top: 15px; font-size: 14px; color: #777;">Click below to read the poem:</p>
          <div style="text-align: center;">
            <a href="https://satinder-poetry.vercel.app/poems" style="background: #007bff; color: #fff; text-decoration: none; padding: 10px 15px; border-radius: 5px; display: inline-block; font-weight: bold;">📚 Read Now</a>
          </div>
          <p style="font-size: 12px; color: #999; text-align: center; margin-top: 20px;">You received this email because you subscribed to our poetry updates. <br>If you wish to unsubscribe, click <a href="YOUR_UNSUBSCRIBE_LINK_HERE" style="color: #007bff;">here</a>.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Email sending failed:", error);
    res.status(500).json({ message: "Email sending failed" });
  }
});

module.exports = router;
