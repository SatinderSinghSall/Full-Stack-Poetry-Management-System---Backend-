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

        <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding:40px 16px;">

                <!-- Card -->
                <table width="100%" max-width="600" cellpadding="0" cellspacing="0"
                  style="max-width:600px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">

                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#141e30,#243b55); padding:36px; text-align:center;">
                      <h1 style="margin:0; color:#ffffff; font-size:26px;">
                        ✨ Welcome to Satinder Poetry
                      </h1>
                      <p style="margin-top:10px; color:#dcdde1; font-size:14px;">
                        Where words meet emotion
                      </p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding:32px;">
                      <h2 style="margin-top:0; color:#2d3436;">
                        📜 You’re officially in!
                      </h2>

                      <p style="color:#444; line-height:1.7;">
                        Thank you for subscribing to <strong>Satinder Poetry</strong>.
                        You’ll now receive updates whenever a new poem is published —
                        words written to inspire, heal, and resonate.
                      </p>

                      <p style="color:#444; line-height:1.7;">
                        This space is built for readers who appreciate meaning,
                        emotions, and stories told through poetry.
                      </p>

                      <!-- CTA -->
                      <div style="margin:32px 0; text-align:center;">
                        <a href="https://satinderpoetry.com/"
                          style="display:inline-block; padding:14px 30px; background:#243b55; color:#ffffff;
                                  text-decoration:none; border-radius:30px; font-weight:600; font-size:15px;">
                          Explore Poems →
                        </a>
                      </div>

                      <p style="font-size:14px; color:#636e72;">
                        Until then, stay inspired 💫
                      </p>
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr>
                    <td style="padding:0 32px;">
                      <hr style="border:none; border-top:1px solid #ecf0f1;">
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding:24px 32px; font-size:13px; color:#636e72;">
                      <p style="margin-top:0;">
                        You’re receiving this email because you subscribed to Satinder Poetry.
                      </p>

                      <p style="margin:16px 0 4px; font-weight:600; color:#2d3436;">
                        — Satinder Singh Sall
                      </p>

                      <p style="margin:0;">
                        ✉️ <a href="mailto:satindersinghsall111@gmail.com" style="color:#0984e3; text-decoration:none;">
                          satindersinghsall111@gmail.com
                        </a><br/>
                        🌐 <a href="https://satinder-portfolio.vercel.app" style="color:#0984e3; text-decoration:none;">My Portfolio</a> |
                        <a href="https://www.linkedin.com/in/satinder-singh-sall-b62049204/" style="color:#0984e3; text-decoration:none;">LinkedIn</a> |
                        <a href="https://github.com/SatinderSinghSall" style="color:#0984e3; text-decoration:none;">GitHub</a>
                      </p>
                    </td>
                  </tr>

                </table>

                <p style="margin-top:24px; font-size:12px; color:#b2bec3;">
                  © ${new Date().getFullYear()} Satinder Poetry
                </p>

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
