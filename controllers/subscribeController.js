const Email = require("../models/SubscribeEmail");
const transporter = require("../config/mailer");

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

    await transporter.sendMail({
      from: `"Poetry Updates" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Welcome to Poetry Updates ✨",
      html: `
        <h2>📜 Welcome to Poetry Updates!</h2>
        <p>Thank you for subscribing. Stay inspired 💫</p>
        <a href="https://satinder-poetry.vercel.app/">Visit Website</a>
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
