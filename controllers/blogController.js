const Blog = require("../models/Blog");
const User = require("../models/User");
const SubscribeEmail = require("../models/SubscribeEmail");
const { sendMail } = require("../config/mailer");

// Utility function to generate slugs
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// @desc    Notify all registered users and subscribers about a published blog post
// @route   N/A (Helper)
// @access  Internal
const notifyAllUsersAboutBlog = async (recipients, blog) => {
  const BATCH_SIZE = 2; // Rate-limit safety for mail service

  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);

    try {
      await Promise.all(
        batch.map((recipient) =>
          sendMail({
            to: recipient.email,
            subject: `✍️ New Post: ${blog.title}`,
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <title>New Blog Post</title>
            </head>
            <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:32px 16px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 12px 35px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
                      
                      <!-- BRAND HEADER -->
                      <tr>
                        <td style="background:#0f172a; padding:24px 32px; border-bottom:3px solid #0984e3;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td align="left">
                                <span style="color:#ffffff; font-size:18px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase;">
                                  ✍️ Satinder Poetry
                                </span>
                              </td>
                              <td align="right">
                                <span style="background:rgba(255,255,255,0.15); color:#e2e8f0; font-size:11px; font-weight:600; padding:4px 10px; border-radius:12px; text-transform:uppercase; letter-spacing:0.5px;">
                                  New Article
                                </span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      ${
                        blog.coverImage
                          ? `
                      <!-- FEATURED COVER IMAGE -->
                      <tr>
                        <td style="padding:0;">
                          <a href="https://satinderpoetry.com/blogs/${blog.slug}" target="_blank">
                            <img src="${blog.coverImage}" alt="${blog.title}" style="width:100%; max-height:280px; object-fit:cover; display:block;" />
                          </a>
                        </td>
                      </tr>
                      `
                          : ""
                      }

                      <!-- MAIN BLOG ARTICLE CARD -->
                      <tr>
                        <td style="padding:32px;">
                          
                          ${
                            blog.tags && blog.tags.length > 0
                              ? `
                          <!-- TAG BADGES -->
                          <div style="margin-bottom:12px;">
                            ${blog.tags
                              .slice(0, 3)
                              .map(
                                (tag) => `
                              <span style="display:inline-block; background:#e0f2fe; color:#0369a1; font-size:12px; font-weight:600; padding:3px 10px; border-radius:20px; margin-right:6px; margin-bottom:6px;">
                                #${tag}
                              </span>
                            `,
                              )
                              .join("")}
                          </div>
                          `
                              : ""
                          }

                          <!-- TITLE -->
                          <h1 style="margin:0 0 16px; color:#0f172a; font-size:24px; line-height:1.3; font-weight:700;">
                            <a href="https://satinderpoetry.com/blogs/${
                              blog.slug
                            }" style="color:#0f172a; text-decoration:none;">
                              ${blog.title}
                            </a>
                          </h1>

                          <!-- EXCERPT -->
                          <p style="color:#475569; font-size:15px; line-height:1.7; margin:0 0 24px;">
                            ${
                              blog.excerpt ||
                              "A fresh post has been published. Read the latest thoughts, literary perspectives, and writings on Satinder Poetry."
                            }
                          </p>

                          <!-- READ MORE BUTTON -->
                          <div style="margin:28px 0 12px;">
                            <a href="https://satinderpoetry.com/blogs/${blog.slug}"
                              style="display:inline-block; padding:12px 28px; background:#0f172a; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:14px; transition:all 0.2s ease;">
                              Read Full Post →
                            </a>
                          </div>

                        </td>
                      </tr>

                      <!-- DIVIDER -->
                      <tr>
                        <td style="padding:0 32px;">
                          <hr style="border:none; border-top:1px solid #f1f5f9; margin:0;">
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
                          
                          <!-- UNSUBSCRIBE NOTICE -->
                          <div style="padding-top:12px; border-top:1px solid #e2e8f0; font-size:12px; color:#94a3b8;">
                            You received this email because you're subscribed to updates from Satinder Poetry.<br/>
                            Don't want to receive these emails? You can manage your preferences or unsubscribe anytime by visiting your <a href="https://satinderpoetry.com/profile" style="color:#0284c7; text-decoration:underline;">Account Profile Settings</a>.
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
            `,
          }),
        ),
      );

      console.log(
        `✅ Sent blog notification batch ${i / BATCH_SIZE + 1} (${
          batch.length
        } emails)`,
      );
    } catch (err) {
      console.error(`❌ Blog email batch ${i / BATCH_SIZE + 1} failed:`, err);
    }

    await delay(1000);
  }

  console.log("✅ All blog notification emails processed safely");
};

// Helper: Dispatch broadcast emails without blocking controller thread
const triggerBlogBroadcast = async (savedBlog) => {
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
      await notifyAllUsersAboutBlog(recipients, savedBlog);
    }
  } catch (err) {
    console.error("Blog email notification failure:", err);
  }
};

// ==========================================
// PUBLIC CONTROLLERS
// ==========================================

// @desc    Get all published blogs (with pagination & search)
// @route   GET /api/blogs
// @access  Public
exports.getPublishedBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 6, search, tag } = req.query;

    const query = { status: "published" };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    if (tag) {
      query.tags = tag;
    }

    const blogs = await Blog.find(query)
      .populate("author", "name email")
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Blog.countDocuments(query);

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single blog by slug & increment views
// @route   GET /api/blogs/:slug
// @access  Public
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug, status: "published" },
      { $inc: { views: 1 } },
      { new: true },
    ).populate("author", "name email");

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog post not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// ADMIN CONTROLLERS
// ==========================================

// @desc    Get all blogs (Drafts + Published for Admin)
// @route   GET /api/blogs/admin/all
// @access  Private/Admin
exports.getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new blog post & trigger email broadcast if published
// @route   POST /api/blogs
// @access  Private/Admin
exports.createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      coverImage,
      tags,
      status,
      sendNotification = true,
    } = req.body;

    let slug = slugify(title);
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      slug = `${slug}-${Date.now()}`;
    }

    const blog = await Blog.create({
      title,
      slug,
      content,
      excerpt,
      coverImage,
      tags: tags ? tags.map((t) => t.trim()) : [],
      status: status || "draft",
      author: req.user._id,
      publishedAt: status === "published" ? new Date() : undefined,
    });

    // Send emails asynchronously if created directly as published
    if (sendNotification && blog.status === "published") {
      setImmediate(() => triggerBlogBroadcast(blog));
    }

    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update blog post & trigger email if status changes from draft to published
// @route   PUT /api/blogs/:id
// @access  Private/Admin
exports.updateBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      coverImage,
      tags,
      status,
      sendNotification = true,
    } = req.body;

    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog post not found" });
    }

    const wasPublished = blog.status === "published";

    if (title && title !== blog.title) {
      blog.title = title;
      blog.slug = slugify(title);
    }
    if (content) blog.content = content;
    if (excerpt !== undefined) blog.excerpt = excerpt;
    if (coverImage !== undefined) blog.coverImage = coverImage;
    if (tags) blog.tags = tags.map((t) => t.trim());
    if (status) {
      blog.status = status;
      if (status === "published" && !blog.publishedAt) {
        blog.publishedAt = new Date();
      }
    }

    await blog.save();

    // Trigger emails only when transitioning from non-published (e.g. draft) to published
    if (sendNotification && !wasPublished && blog.status === "published") {
      setImmediate(() => triggerBlogBroadcast(blog));
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get single blog by ID (Admin / Edit)
// @route   GET /api/blogs/id/:id
// @access  Private/Admin
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email",
    );

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog post not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog post not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
