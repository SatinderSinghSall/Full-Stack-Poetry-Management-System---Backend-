const BookSuggestion = require("../models/Suggestion");
const { sendMail } = require("../config/mailer");

// ==========================================
// BOOK SUGGESTION CONTROLLERS
// ==========================================

// @desc    Submit a new book recommendation (Public Modal)
// @route   POST /api/book-suggestions
exports.createSuggestion = async (req, res) => {
  try {
    const { title, author, suggestedBy, email, note } = req.body;

    // 1. Validation
    if (!title?.trim() || !author?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and Author are required fields.",
      });
    }

    // 2. Create MongoDB Record
    const suggestion = await BookSuggestion.create({
      title: title.trim(),
      author: author.trim(),
      suggestedBy: suggestedBy?.trim() || "Anonymous Reader",
      email: email?.trim(),
      note: note?.trim(),
    });

    // 3. Send Acknowledgement Email (if email is provided)
    if (email?.trim()) {
      const recipientName = suggestedBy?.trim() || "Fellow Reader";

      const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Book Recommendation Received</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding:32px 16px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 12px 35px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
                
                <!-- BRAND HEADER -->
                <tr>
                  <td style="background:#0f172a; padding:24px 32px; border-bottom:3px solid #8b5cf6;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="left">
                          <span style="color:#ffffff; font-size:18px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase;">
                            ✒️ Satinder Poetry
                          </span>
                        </td>
                        <td align="right">
                          <span style="background:rgba(139,92,246,0.25); color:#ddd6fe; font-size:11px; font-weight:600; padding:4px 10px; border-radius:12px; text-transform:uppercase; letter-spacing:0.5px; border: 1px solid rgba(139,92,246,0.4);">
                            Recommendation Received
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- MAIN CARD CONTENT -->
                <tr>
                  <td style="padding:32px 32px 24px;">
                    
                    <h1 style="margin:0 0 12px; color:#0f172a; font-size:24px; line-height:1.3; font-weight:700; font-family: Georgia, serif;">
                      Hi ${recipientName},
                    </h1>

                    <p style="margin:0 0 20px; color:#475569; font-size:15px; line-height:1.6;">
                      Thank you for sharing your book recommendation with us! Your suggestion has reached our desk and is currently under review for addition to our library shelf.
                    </p>

                    <!-- SUGGESTED BOOK DETAILS BOX -->
                    <div style="background:#faf5ff; border-left:4px solid #8b5cf6; padding:20px 24px; border-radius:0 12px 12px 0; margin-bottom:24px;">
                      <span style="display:inline-block; background:#f3e8ff; color:#6b21a8; font-size:11px; font-weight:700; padding:3px 10px; border-radius:20px; margin-bottom:10px; text-transform:uppercase; letter-spacing:0.5px;">
                        📚 Suggested Title
                      </span>

                      <h2 style="margin:0 0 4px; color:#0f172a; font-size:18px; font-weight:700; font-family: Georgia, serif;">
                        ${title}
                      </h2>

                      <p style="margin:0 0 10px; color:#64748b; font-size:14px; font-style:italic;">
                        By <strong style="color:#334155;">${author}</strong>
                      </p>

                      ${
                        note
                          ? `
                        <p style="color:#4c1d95; font-size:14px; line-height:1.7; font-family: Georgia, serif; font-style:italic; margin:8px 0 0; padding-top:8px; border-top:1px dashed #e9d5ff;">
                          "${note}"
                        </p>
                      `
                          : ""
                      }
                    </div>

                    <p style="margin:0 0 20px; color:#475569; font-size:15px; line-height:1.6;">
                      We review reader recommendations regularly. If this title gets featured or added to our reading shelf, we'll reach out to let you know!
                    </p>

                    <!-- EXPLORE PLATFORM CTA BUTTON -->
                    <div style="text-align:center; margin-bottom:20px;">
                      <a href="https://satinderpoetry.com/books"
                        style="display:inline-block; padding:12px 30px; background:#0f172a; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:14px;">
                        Explore Book Shelf →
                      </a>
                    </div>

                    <!-- FORMAL ACKNOWLEDGEMENT NOTE AFTER BUTTON -->
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px 20px; text-align:center; margin-bottom:12px;">
                      <p style="margin:0; color:#334155; font-size:13px; line-height:1.6; font-weight:500;">
                        📌 <strong>Formal Note:</strong> Please be assured that your request has been formally logged into our system. Our editorial team will carefully review the suggestion and send a follow-up response as soon as possible.
                      </p>
                    </div>

                  </td>
                </tr>

                <!-- QUICK LINKS NAVIGATION SECTION -->
                <tr>
                  <td style="padding:16px 32px; background:#f8fafc; border-top:1px solid #f1f5f9; border-bottom:1px solid #f1f5f9; text-align:center;">
                    <span style="font-size:12px; font-weight:700; text-transform:uppercase; color:#94a3b8; letter-spacing:0.8px; display:block; margin-bottom:8px;">
                      Explore Platform
                    </span>
                    <a href="https://satinderpoetry.com/poems" style="color:#0284c7; text-decoration:none; font-size:13px; font-weight:500; margin:0 8px;">Poems</a> •
                    <a href="https://satinderpoetry.com/books" style="color:#0284c7; text-decoration:none; font-size:13px; font-weight:500; margin:0 8px;">Books</a> •
                    <a href="https://satinderpoetry.com/blogs" style="color:#0284c7; text-decoration:none; font-size:13px; font-weight:500; margin:0 8px;">Blogs</a> •
                    <a href="https://satinderpoetry.com/about-me" style="color:#0284c7; text-decoration:none; font-size:13px; font-weight:500; margin:0 8px;">About</a> •
                    <a href="https://satinderpoetry.com/newsletter" style="color:#0284c7; text-decoration:none; font-size:13px; font-weight:500; margin:0 8px;">Newsletter</a>
                  </td>
                </tr>

                <!-- AUTHOR FOOTER & LINKS -->
                <tr>
                  <td style="padding:24px 32px; background:#f8fafc; font-size:13px; color:#64748b;">
                    <p style="margin:0 0 8px; font-weight:600; color:#1e293b; font-size:14px;">
                      — Satinder Singh Sall
                    </p>
                    <p style="margin:0 0 16px; line-height:1.5;">
                      ✉️ <a href="mailto:satindersinghsall111@gmail.com" style="color:#0284c7; text-decoration:none;">satindersinghsall111@gmail.com</a><br/>
                      🌐 <a href="https://satinder-portfolio.vercel.app" style="color:#0284c7; text-decoration:none;">Portfolio</a> |
                      <a href="https://www.linkedin.com/in/satinder-singh-sall-b62049204/" style="color:#0284c7; text-decoration:none;">LinkedIn</a> |
                      <a href="https://github.com/SatinderSinghSall" style="color:#0284c7; text-decoration:none;">GitHub</a>
                    </p>
                    
                    <div style="padding-top:12px; border-top:1px solid #e2e8f0; font-size:12px; color:#94a3b8;">
                      You received this email because you submitted a book suggestion on Satinder Poetry.
                    </div>
                  </td>
                </tr>

              </table>

              <!-- COPYRIGHT -->
              <p style="margin-top:20px; font-size:12px; color:#94a3b8; text-align:center;">
                © ${new Date().getFullYear()} Satinder Poetry. All rights reserved.
              </p>

            </td>
          </tr>
        </table>
      </body>
      </html>
      `;

      // Dispatch mail non-blockingly
      sendMail({
        to: email,
        subject: `📚 Book Suggestion Received — "${title}"`,
        html: emailHtml,
      }).catch((err) =>
        console.error("Failed to send book suggestion email:", err),
      );
    }

    return res.status(201).json({
      success: true,
      message: "Suggestion submitted successfully!",
      data: suggestion,
    });
  } catch (error) {
    console.error("Error creating book suggestion:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Could not save suggestion.",
    });
  }
};

// @desc    Get all suggestions (Admin Panel)
// @route   GET /api/book-suggestions
exports.getAllSuggestions = async (req, res) => {
  try {
    const suggestions = await BookSuggestion.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: suggestions.length,
      data: suggestions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error. Could not retrieve suggestions.",
    });
  }
};

// @desc    Update suggestion status (Admin Panel: e.g. pending -> added_to_shelf)
// @route   PATCH /api/book-suggestions/:id
exports.updateSuggestionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await BookSuggestion.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Suggestion not found." });
    }

    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// @desc    Delete a suggestion (Admin Panel)
// @route   DELETE /api/book-suggestions/:id
exports.deleteSuggestion = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await BookSuggestion.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Suggestion not found." });
    }

    return res
      .status(200)
      .json({ success: true, message: "Suggestion removed." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
