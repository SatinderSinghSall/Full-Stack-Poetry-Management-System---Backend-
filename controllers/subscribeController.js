const Email = require("../models/SubscribeEmail");
const { sendMail } = require("../config/mailer");

exports.subscribeUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const exists = await Email.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ message: "This email is already subscribed!" });
    }

    await Email.create({ email });

    await sendMail({
      to: email,
      subject: "✨ Welcome to Satinder Poetry",
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
You’re Subscribed ✨
</h1>

<p style="
  margin:22px auto 0;
  max-width:420px;
  color:#4b5563;
  font-size:16px;
  line-height:30px;
">
Thank you for subscribing to Satinder Poetry.
You’ll now receive updates whenever new poems are published.
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
What You Can Expect
</h2>

<p style="
  margin:0 0 16px;
  color:#374151;
  font-size:16px;
  line-height:28px;
">
• New poetry releases
</p>

<p style="
  margin:0 0 16px;
  color:#374151;
  font-size:16px;
  line-height:28px;
">
• Emotional and reflective writing
</p>

<p style="
  margin:0 0 16px;
  color:#374151;
  font-size:16px;
  line-height:28px;
">
• Calm and distraction-free reading
</p>

<p style="
  margin:0;
  color:#374151;
  font-size:16px;
  line-height:28px;
">
• Occasional stories behind the poems
</p>

<!-- Button -->
<div style="text-align:center; margin-top:42px;">

<a href="https://satinderpoetry.com/"
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
Explore Poems
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
“Poetry is where silence finds its voice.”
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

    res.json({ message: "Subscription successful! Check your email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Subscription failed" });
  }
};

exports.getSubscribers = async (req, res) => {
  const subscribers = await Email.find().sort({ createdAt: -1 });
  res.json(subscribers);
};

exports.getSubscriberCount = async (req, res) => {
  const count = await Email.countDocuments();
  res.json({ count });
};

exports.deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Email.findByIdAndDelete(req.params.id);

    if (!subscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    res.json({ message: "Subscriber deleted successfully" });
  } catch (err) {
    console.error("Delete subscriber error:", err);
    res.status(500).json({ message: "Failed to delete subscriber" });
  }
};

exports.getSubscriptionStatus = async (req, res) => {
  try {
    const record = await Email.findOne({ email: req.user.email });

    if (!record) {
      return res.json({
        subscribed: false,
        subscribedAt: null,
      });
    }

    res.json({
      subscribed: true,
      subscribedAt: record.createdAt,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to check subscription" });
  }
};
