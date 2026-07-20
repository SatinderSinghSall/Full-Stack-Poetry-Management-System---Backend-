const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

// Import auth middleware (adjust path/export name if your authMiddleware differs)
const { protect, admin } = require("../middleware/authMiddleware");

// Public Routes
router.get("/", getBooks);
router.get("/:id", getBookById);

// Admin Routes
router.post("/", protect, admin, createBook);
router.put("/:id", protect, admin, updateBook);
router.delete("/:id", protect, admin, deleteBook);

module.exports = router;
