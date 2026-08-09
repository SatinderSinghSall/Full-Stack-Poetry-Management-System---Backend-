const express = require("express");
const router = express.Router();
const {
  getPublishedBlogs,
  getBlogBySlug,
  getAllBlogsAdmin,
  createBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
} = require("../controllers/blogController");
const { protect, admin } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getPublishedBlogs);
router.get("/:slug", getBlogBySlug);

// Admin routes
router.get("/admin/all", protect, admin, getAllBlogsAdmin);
router.post("/", protect, admin, createBlog);
router.put("/:id", protect, admin, updateBlog);
router.get("/id/:id", protect, admin, getBlogById);
router.delete("/:id", protect, admin, deleteBlog);

module.exports = router;
