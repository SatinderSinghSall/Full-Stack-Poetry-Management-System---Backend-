const Book = require("../models/Book");

// @desc    Centralized handler for Mongoose validation, duplicate keys, and runtime errors
// @route   N/A (Helper)
// @access  Internal
const handleControllerError = (
  res,
  error,
  defaultMessage = "An unexpected error occurred",
) => {
  console.error("Book Controller Error Log:", error);

  // Mongoose Schema Validation Error
  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  // Mongoose Duplicate Key Error
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0] || "field";
    return res.status(409).json({
      message: `A record with this ${field} already exists.`,
    });
  }

  // Invalid ObjectId Format
  if (error.name === "CastError") {
    return res.status(400).json({
      message: `Invalid ID format for ${error.path}`,
    });
  }

  return res.status(500).json({
    message: error.message || defaultMessage,
  });
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

// @desc    Create a new book
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
