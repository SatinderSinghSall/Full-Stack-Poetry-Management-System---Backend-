const mongoose = require("mongoose");

const bookSuggestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    suggestedBy: {
      type: String,
      default: "Anonymous Reader",
      trim: true,
    },
    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },
    note: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "added_to_shelf", "archived"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.BookSuggestion ||
  mongoose.model("BookSuggestion", bookSuggestionSchema);
