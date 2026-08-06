const Poem = require("../models/Poem");
const User = require("../models/User");
const SubscribeEmail = require("../models/SubscribeEmail");
const PoemSubmission = require("../models/PoemSubmission");
const { sendMail } = require("../config/mailer");

// NEW: reading time helper
const calculateReadingTime = (text = "") => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

// Add Poem (Admin Only)
const addPoem = async (req, res) => {
  const {
    title,
    content,
    author,
    summary,
    theme,
    tags = [],
    coverImage,
    status = "published",
    featured = false,
    sendNotification = true,
  } = req.body;

  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, Admins only" });
  }

  try {
    const poem = new Poem({
      title,
      content,
      author,
      summary,
      theme,
      tags,
      coverImage,
      status,
      featured,
      readingTime: calculateReadingTime(content),
      addedBy: req.user._id,
    });

    const savedPoem = await poem.save();

    if (sendNotification && status === "published") {
      const users = await User.find({ email: { $exists: true } }, { email: 1 });
      const subscribers = await SubscribeEmail.find(
        { email: { $exists: true } },
        { email: 1 },
      );

      const allEmails = [
        ...users.map((u) => u.email),
        ...subscribers.map((s) => s.email),
      ];
      const uniqueEmails = [...new Set(allEmails)];
      const recipients = uniqueEmails.map((email) => ({ email }));

      if (recipients.length > 0) {
        notifyAllUsers(recipients, savedPoem).catch((err) =>
          console.error("User email notify failed:", err),
        );
      }
    }

    res.status(201).json(savedPoem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// notify all registered users
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const notifyAllUsers = async (users, poem) => {
  const BATCH_SIZE = 2; // Resend allows 2 req/sec

  for (let i = 0; i < users.length; i += BATCH_SIZE) {
    const batch = users.slice(i, i + BATCH_SIZE);

    try {
      await Promise.all(
        batch.map((user) =>
          sendMail({
            to: user.email,
            subject: `📝 New Poem Published — ${poem.title}`,
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <title>New Poem</title>
            </head>
            <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:40px 16px;">
                    <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
                      <tr>
                        <td style="background:linear-gradient(135deg,#0f2027,#203a43,#2c5364); padding:32px; text-align:center;">
                          <h1 style="margin:0; color:#ffffff; font-size:26px; letter-spacing:0.5px;">
                            ✒️ Satinder Poetry
                          </h1>
                          <p style="margin-top:8px; color:#dfe6e9; font-size:14px;">
                            A new poem just arrived
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:32px;">
                          <h2 style="margin-top:0; color:#2d3436; font-size:22px;">
                            📜 ${poem.title}
                          </h2>
                          <p style="color:#636e72; margin:8px 0 24px;">
                            By <strong>${poem.author}</strong>
                          </p>
                          <p style="color:#444; line-height:1.6;">
                            A fresh piece of poetry has just been published on <strong>Satinder Poetry</strong>.
                            Dive into words crafted to make you pause, feel, and reflect.
                          </p>
                          <div style="margin:32px 0; text-align:center;">
                            <a href="https://satinderpoetry.com/poems/${poem._id}"
                              style="display:inline-block; padding:14px 28px; background:#2c5364; color:#ffffff; text-decoration:none; border-radius:30px; font-weight:600; font-size:15px;">
                              Read the Poem →
                            </a>
                          </div>
                          <div style="text-align:center;">
                            <a href="https://satinderpoetry.com/poems"
                              style="color:#0984e3; text-decoration:none; font-size:14px;">
                              Explore All Poems
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 32px;">
                          <hr style="border:none; border-top:1px solid #ecf0f1;">
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:24px 32px; font-size:13px; color:#636e72;">
                          <p style="margin-top:0;">
                            You’re receiving this email because you’re part of the Satinder Poetry community.
                          </p>
                          <p style="margin:16px 0 4px; font-weight:600; color:#2d3436;">
                            — Satinder Singh Sall
                          </p>
                          <p style="margin:0;">
                            ✉️ <a href="mailto:satindersinghsall111@gmail.com" style="color:#0984e3; text-decoration:none;">satindersinghsall111@gmail.com</a><br/>
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
          }),
        ),
      );

      console.log(
        `✅ Sent batch ${i / BATCH_SIZE + 1} (${batch.length} emails)`,
      );
    } catch (err) {
      console.error("❌ Email batch failed:", err);
    }

    await delay(1000);
  }

  console.log("✅ All emails processed safely");
};

// Get All Poems
const getPoems = async (req, res) => {
  try {
    const { theme, tag, status } = req.query;
    const filter = {};
    if (theme) filter.theme = theme;
    if (tag) filter.tags = tag;
    if (status) filter.status = status;

    const poems = await Poem.find(filter).sort({ createdAt: -1 });
    res.json(poems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Poem by ID
const getPoemById = async (req, res) => {
  try {
    const poem = await Poem.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true },
    );

    if (!poem) return res.status(404).json({ message: "Poem not found" });

    res.json(poem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Poem (Admin Only)
const updatePoem = async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }

  const {
    title,
    content,
    author,
    summary,
    theme,
    tags,
    coverImage,
    status,
    featured,
  } = req.body;

  try {
    const poem = await Poem.findById(req.params.id);
    if (!poem) return res.status(404).json({ message: "Poem not found" });

    poem.title = title ?? poem.title;
    poem.content = content ?? poem.content;
    poem.author = author ?? poem.author;
    poem.summary = summary ?? poem.summary;
    poem.theme = theme ?? poem.theme;
    poem.tags = tags ?? poem.tags;
    poem.coverImage = coverImage ?? poem.coverImage;
    poem.status = status ?? poem.status;
    poem.featured = featured ?? poem.featured;

    if (content) {
      poem.readingTime = calculateReadingTime(content);
    }

    const updated = await poem.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Poem (Admin Only)
const deletePoem = async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }

  try {
    const poem = await Poem.findByIdAndDelete(req.params.id);
    if (!poem) return res.status(404).json({ message: "Poem not found" });

    res.json({ message: "Poem deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Like Poem
const likePoem = async (req, res) => {
  try {
    const poem = await Poem.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true },
    );

    if (!poem) return res.status(404).json({ message: "Poem not found" });

    res.json({ likes: poem.likes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Submit a poem draft for admin review
// @route   POST /api/poems/submit-draft
// @access  Private (Authenticated users)
const submitPoemDraft = async (req, res) => {
  try {
    const { title, genre, content, noteToAdmin } = req.body;

    if (!title || !genre || !content) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }

    const newSubmission = await PoemSubmission.create({
      user: req.user._id,
      title,
      genre,
      content,
      noteToAdmin,
    });

    res.status(201).json({
      success: true,
      message: "Submission sent for review!",
      data: newSubmission,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

// @desc    Get all pending poem submissions (Admin only)
// @route   GET /api/poems/submissions
// @access  Private/Admin
const getPoemSubmissions = async (req, res) => {
  try {
    const submissions = await PoemSubmission.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve submission and publish as a real Poem
// @route   PUT /api/poems/submissions/:id/approve
// @access  Private/Admin
const approvePoemSubmission = async (req, res) => {
  try {
    const submission = await PoemSubmission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    if (submission.status === "approved") {
      return res
        .status(400)
        .json({ message: "Submission is already approved" });
    }

    // 1. Create entry in main Poem collection
    const approvedPoem = new Poem({
      title: submission.title,
      content: submission.content,
      author: req.body.author || "Community Contributor",
      theme: submission.genre || "Poetry",
      summary: req.body.summary || "",
      readingTime: calculateReadingTime(submission.content),
      status: "published",
      addedBy: submission.user,
    });

    await approvedPoem.save();

    // 2. Update submission status
    submission.status = "approved";
    await submission.save();

    res.json({
      message: "Poem approved and published successfully!",
      poem: approvedPoem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reject a poem submission
// @route   PUT /api/poems/submissions/:id/reject
// @access  Private/Admin
const rejectPoemSubmission = async (req, res) => {
  try {
    const submission = await PoemSubmission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    submission.status = "rejected";
    await submission.save();

    res.json({ message: "Submission rejected", submission });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a poem submission permanently
// @route   DELETE /api/poems/submissions/:id
// @access  Private/Admin
const deletePoemSubmission = async (req, res) => {
  try {
    const submission = await PoemSubmission.findByIdAndDelete(req.params.id);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.json({ message: "Submission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reset a poem submission status to pending
// @route   PUT /api/poems/submissions/:id/pending
// @access  Private/Admin
const resetPoemSubmissionToPending = async (req, res) => {
  try {
    const submission = await PoemSubmission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    submission.status = "pending";
    await submission.save();

    res.json({ message: "Submission reset to pending", submission });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addPoem,
  getPoems,
  getPoemById,
  updatePoem,
  deletePoem,
  likePoem,
  submitPoemDraft,
  getPoemSubmissions,
  approvePoemSubmission,
  rejectPoemSubmission,
  deletePoemSubmission,
  resetPoemSubmissionToPending,
};
