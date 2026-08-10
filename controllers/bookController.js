const Book = require("../models/Book");
const User = require("../models/User");
const SubscribeEmail = require("../models/SubscribeEmail");
const { sendMail } = require("../config/mailer");

// @desc    Centralized handler for Mongoose validation, duplicate keys, and runtime errors
// @route   N/A (Helper)
// @access  Internal
const handleControllerError = (
  res,
  error,
  defaultMessage = "An unexpected error occurred",
) => {
  console.error("Book Controller Error Log:", error);

  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0] || "field";
    return res.status(409).json({
      message: `A record with this ${field} already exists.`,
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      message: `Invalid ID format for ${error.path}`,
    });
  }

  return res.status(500).json({
    message: error.message || defaultMessage,
  });
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// @desc    Notify all registered users and subscribers about a newly published book
// @route   N/A (Helper)
// @access  Internal
const notifyAllUsersAboutBook = async (recipients, book) => {
  const BATCH_SIZE = 2; // Resend rate limit safety

  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);

    try {
      await Promise.all(
        batch.map((recipient) =>
          sendMail({
            to: recipient.email,
            subject: `📚 New Book Recommendation — ${book.title}`,
            html: `
            <!DOCTYPE html>
            <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <meta name="color-scheme" content="light dark" />
              <meta name="supported-color-schemes" content="light dark" />
              <title>New Book Released</title>
              <style>
                :root {
                  color-scheme: light dark;
                  supported-color-schemes: light dark;
                }
                /* Dark Mode Styling Overrides */
                @media (prefers-color-scheme: dark) {
                  body, table.bg-outer { background-color: #0b0f19 !important; }
                  .card-container { background-color: #1e293b !important; border-color: #334155 !important; }
                  .hero-section { background: #0f172a !important; }
                  .text-main { color: #f8fafc !important; }
                  .text-muted { color: #94a3b8 !important; }
                  .synopsis-box { background-color: #0f172a !important; border-left-color: #f59e0b !important; color: #cbd5e1 !important; }
                  .nav-box { background-color: #0f172a !important; border-color: #334155 !important; }
                  .nav-link { color: #38bdf8 !important; }
                  .footer-section { background-color: #0f172a !important; color: #94a3b8 !important; }
                  .divider { border-top-color: #334155 !important; }
                }
              </style>
            </head>
            <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              <table width="100%" cellpadding="0" cellspacing="0" class="bg-outer" style="background-color:#f4f6f8;">
                <tr>
                  <td align="center" style="padding:32px 16px;">
                    <table width="100%" cellpadding="0" cellspacing="0" class="card-container" style="max-width:600px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 12px 35px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
                      
                      <!-- BRAND HEADER -->
                      <tr>
                        <td style="background:#0f172a; padding:20px 32px; border-bottom:3px solid #d97706;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td align="left">
                                <span style="color:#ffffff; font-size:17px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase;">
                                  📚 Satinder Bookshelf
                                </span>
                              </td>
                              <td align="right">
                                <span style="background:rgba(217,119,6,0.25); color:#fef3c7; font-size:11px; font-weight:600; padding:4px 10px; border-radius:12px; text-transform:uppercase; letter-spacing:0.5px; border: 1px solid rgba(217,119,6,0.4);">
                                  New Arrival
                                </span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- QUICK LINKS NAVIGATION SECTION -->
                      <tr>
                        <td class="nav-box" style="background:#f8fafc; padding:12px 32px; border-bottom:1px solid #e2e8f0; text-align:center;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td align="center" style="font-size:13px; font-weight:600;">
                                <a href="https://satinderpoetry.com/books" class="nav-link" style="color:#0284c7; text-decoration:none; margin:0 10px; display:inline-block;">📖 Library Catalog</a>
                                <span class="text-muted" style="color:#cbd5e1;">|</span>
                                <a href="https://satinderpoetry.com/featured" class="nav-link" style="color:#0284c7; text-decoration:none; margin:0 10px; display:inline-block;">⭐ Top Recommendations</a>
                                <span class="text-muted" style="color:#cbd5e1;">|</span>
                                <a href="https://satinderpoetry.com/community" class="nav-link" style="color:#0284c7; text-decoration:none; margin:0 10px; display:inline-block;">💬 Reader Reviews</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- BOOK SHOWCASE HERO SECTION -->
                      <tr>
                        <td class="hero-section" style="padding:32px 32px 24px; background:linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              ${
                                book.coverImage
                                  ? `
                              <!-- BOOK COVER IMAGE -->
                              <td width="140" valign="top" style="padding-right:24px;">
                                <a href="https://satinderpoetry.com/books/${
                                  book._id
                                }" target="_blank">
                                  <img src="${book.coverImage}" alt="${
                                    book.title
                                  }" style="width:140px; height:auto; border-radius:8px; box-shadow:0 10px 25px rgba(0,0,0,0.18); display:block; border: 1px solid #cbd5e1;" />
                                </a>
                              </td>
                              `
                                  : ""
                              }
                              
                              <!-- BOOK DETAILS -->
                              <td valign="top">
                                ${
                                  book.genre
                                    ? `
                                <span style="display:inline-block; background:#fef3c7; color:#92400e; font-size:11px; font-weight:700; padding:3px 10px; border-radius:20px; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">
                                  ${book.genre}
                                </span>
                                `
                                    : ""
                                }
                                
                                <h1 class="text-main" style="margin:4px 0 8px; color:#0f172a; font-size:22px; line-height:1.3; font-weight:700;">
                                  ${book.title}
                                </h1>
                                
                                <p class="text-muted" style="margin:0 0 12px; color:#475569; font-size:14px; font-weight:500;">
                                  By <strong class="text-main" style="color:#0f172a;">${book.author}</strong>
                                </p>

                                <!-- PRICE BADGE -->
                                <div style="margin-top:12px;">
                                  <span class="text-main" style="font-size:18px; font-weight:800; color:#0f172a;">
                                    ${
                                      book.price && book.price > 0
                                        ? `₹${book.price}`
                                        : "Free / Recommended"
                                    }
                                  </span>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- BOOK DESCRIPTION & SYNOPSIS -->
                      <tr>
                        <td style="padding:0 32px 32px;">
                          <h3 class="text-main" style="margin:0 0 10px; color:#1e293b; font-size:13px; text-transform:uppercase; letter-spacing:0.5px; font-weight:700;">
                            Synopsis & Literary Notes
                          </h3>
                          <p class="synopsis-box" style="color:#475569; font-size:14.5px; line-height:1.7; margin:0 0 24px; background:#f8fafc; padding:16px; border-radius:8px; border-left:4px solid #d97706;">
                            ${
                              book.description ||
                              "A new addition has landed in the library shelf. Discover themes, reflections, and insights crafted to enrich your personal reading list."
                            }
                          </p>

                          <!-- CALL TO ACTION BUTTONS -->
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td align="center">
                                <a href="https://satinderpoetry.com/books/${book._id}"
                                  style="display:inline-block; padding:12px 24px; background:#d97706; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:14px; margin-right:8px; margin-bottom:8px;">
                                  📖 View Details & Preview
                                </a>
                                ${
                                  book.buyUrl
                                    ? `
                                <a href="${book.buyUrl}" target="_blank"
                                  style="display:inline-block; padding:12px 24px; background:#0f172a; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:14px; margin-bottom:8px;">
                                  🛒 Get Your Copy
                                </a>
                                `
                                    : ""
                                }
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- DIVIDER -->
                      <tr>
                        <td style="padding:0 32px;">
                          <hr class="divider" style="border:none; border-top:1px solid #f1f5f9; margin:0;">
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
                        <td class="footer-section" style="padding:24px 32px; background:#f8fafc; font-size:13px; color:#64748b;">
                          <p class="text-main" style="margin:0 0 8px; font-weight:600; color:#1e293b; font-size:14px;">
                            — Satinder Singh Sall
                          </p>
                          <p style="margin:0 0 16px; line-height:1.6;">
                            ✉️ <a href="mailto:satindersinghsall111@gmail.com" style="color:#0284c7; text-decoration:none;">satindersinghsall111@gmail.com</a><br/>
                            🌐 <a href="https://satinder-portfolio.vercel.app" style="color:#0284c7; text-decoration:none;">Portfolio</a> |
                            <a href="https://www.linkedin.com/in/satinder-singh-sall-b62049204/" style="color:#0284c7; text-decoration:none;">LinkedIn</a> |
                            <a href="https://github.com/SatinderSinghSall" style="color:#0284c7; text-decoration:none;">GitHub</a>
                          </p>
                          
                          <!-- UNSUBSCRIBE NOTICE -->
                          <div style="padding-top:12px; border-top:1px solid #e2e8f0; font-size:12px; color:#94a3b8;">
                            You received this email because you're subscribed to new book alerts on Satinder Bookshelf.<br/>
                            Don't want to receive these updates? Manage preferences or unsubscribe in your <a href="https://satinderpoetry.com/profile" style="color:#0284c7; text-decoration:underline;">Account Profile Settings</a>.
                          </div>
                        </td>
                      </tr>

                    </table>

                    <!-- COPYRIGHT -->
                    <p style="margin-top:20px; font-size:12px; color:#94a3b8; text-align:center;">
                      © ${new Date().getFullYear()} Satinder Poetry Bookshelf. All rights reserved.
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
        `✅ Sent book notification batch ${i / BATCH_SIZE + 1} (${
          batch.length
        } emails)`,
      );
    } catch (err) {
      console.error(`❌ Book email batch ${i / BATCH_SIZE + 1} failed:`, err);
    }

    await delay(1000);
  }

  console.log("✅ All book notification emails processed safely");
};

// Helper: Dispatch broadcast emails without blocking controller thread
const triggerBookBroadcast = async (savedBook) => {
  try {
    const [users, subscribers] = await Promise.all([
      User.find({ email: { $exists: true } }, { email: 1 }),
      SubscribeEmail.find({ email: { $exists: true } }, { email: 1 }),
    ]);

    const allEmails = [
      ...users.map((u) => u.email),
      ...subscribers.map((s) => s.email),
    ];

    // Normalized case-insensitive de-duplication
    const uniqueEmails = [
      ...new Set(
        allEmails.filter(Boolean).map((email) => email.trim().toLowerCase()),
      ),
    ];

    if (uniqueEmails.length > 0) {
      const recipients = uniqueEmails.map((email) => ({ email }));
      await notifyAllUsersAboutBook(recipients, savedBook);
    }
  } catch (err) {
    console.error("Book email notification failure:", err);
  }
};

// ==========================================
// BOOK CONTROLLERS
// ==========================================

// @desc    Get all books (with optional filtering)
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
  try {
    const { type, category, status } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (status) filter.status = status;

    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    handleControllerError(res, error, "Failed to fetch books");
  }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    handleControllerError(res, error, "Error fetching book details");
  }
};

// @desc    Create a new book & send notification
// @route   POST /api/books
// @access  Private/Admin
const createBook = async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied. Admin privileges required." });
  }

  try {
    const {
      title,
      author,
      description,
      price,
      genre,
      buyUrl,
      coverImage,
      tags,
      status,
      featured,
      category,
      type,
      sendNotification = true, // Optional flag from req.body
    } = req.body;

    const validationErrors = [];
    if (!title?.trim()) validationErrors.push("Title is required.");
    if (!author?.trim()) validationErrors.push("Author is required.");
    if (!description?.trim()) validationErrors.push("Description is required.");

    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: "Missing or invalid required fields.",
        errors: validationErrors,
      });
    }

    const newBook = new Book({
      title: title.trim(),
      author: author.trim(),
      description: description.trim(),
      price: price !== undefined ? price : 0,
      genre: genre?.trim(),
      buyUrl: buyUrl?.trim(),
      coverImage: coverImage?.trim(),
      tags: Array.isArray(tags)
        ? tags.map((t) => t.trim()).filter(Boolean)
        : [],
      status: status || "published",
      featured: Boolean(featured),
      category: category?.trim() || "Literature",
      type: type?.trim() || "recommended",
    });

    const savedBook = await newBook.save();

    // Trigger notification asynchronously if status is published
    if (sendNotification && savedBook.status === "published") {
      setImmediate(() => triggerBookBroadcast(savedBook));
    }

    res.status(201).json(savedBook);
  } catch (error) {
    handleControllerError(res, error, "Failed to add book");
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied. Admin privileges required." });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true },
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    handleControllerError(res, error, "Failed to update book");
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied. Admin privileges required." });
  }

  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.deleteOne();
    res.status(200).json({ message: "Book removed successfully" });
  } catch (error) {
    handleControllerError(res, error, "Failed to delete book");
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
