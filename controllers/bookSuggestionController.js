const BookSuggestion = require("../models/Suggestion");

// @desc    Submit a new book recommendation (Public Modal)
// @route   POST /api/book-suggestions
// POST /api/book-suggestions
exports.createSuggestion = async (req, res) => {
  try {
    const { title, author, suggestedBy, email, note } = req.body;

    if (!title || !author) {
      return res.status(400).json({
        success: false,
        message: "Title and Author are required fields.",
      });
    }

    const suggestion = await BookSuggestion.create({
      title,
      author,
      suggestedBy: suggestedBy || "Anonymous Reader",
      email,
      note,
    });

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
// GET /api/book-suggestions
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
// PATCH /api/book-suggestions/:id
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
// DELETE /api/book-suggestions/:id
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
