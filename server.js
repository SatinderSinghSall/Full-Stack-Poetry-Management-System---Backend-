const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./database/config/db");
const User = require("./models/User.js");
const Email = require("./models/SubscribeEmail.js");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", require("./routes/authRoutes")); // Auth Routes
app.use("/api/poems", require("./routes/poemRoutes"));
app.use("/api/email", require("./routes/emailRoutes"));

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch users from the database
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email provider (Gmail, SMTP, etc.)
  auth: {
    user: "satindersinghsall2003@gmail.com",
    pass: "lneo wgao shgl uocy",
  },
});

app.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "This email is already subscribed!" });
    }

    // Save email to database
    await Email.create({ email });

    // Send Poetry Updates email
    const mailOptions = {
      from: '"Poetry Updates:" <satindersinghsall2003@gmail.com>',
      to: email,
      subject: "Welcome to Poetry Updates! ✨",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; background: #f4f4f4; padding: 20px;">
          <div style="background: white; padding: 20px; border-radius: 8px; max-width: 500px; margin: auto;">
            <h2 style="color: #333;">📜 Welcome to Poetry Updates!</h2>
            <p style="color: #555;">Thank you for subscribing! You'll now receive the latest poetry updates, inspiration, and special content.</p>
            <p>Stay inspired and keep reading! 📖</p>
            <a href="https://full-stack-poetry-management-system-frontend.vercel.app/" style="display: inline-block; background: #007bff; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Visit Our Website</a>
            <p style="margin-top: 20px; font-size: 12px; color: #777;">If you didn't subscribe, you can ignore this email.</p>
            <p style="margin-top: 20px; text-align: left; font-size: 12px; color: #777;">
                <strong>Satinder Singh Sall</strong><br>
                <b>A writer & poet</b><br/>
                Student<br>
                School of CSA<br>
                REVA University,<br>
                Bengaluru
              </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Subscription successful! Check your email." });
  } catch (error) {
    res.status(500).json({ message: "Error subscribing" });
  }
});

app.get("/subscribers-count", async (req, res) => {
  try {
    const subscribers = await Email.find();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/", (req, res) => res.send("API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
