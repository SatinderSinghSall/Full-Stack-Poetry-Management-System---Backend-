const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0 },
    genre: { type: String, default: "" },
    buyUrl: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
    featured: { type: Boolean, default: false },

    category: {
      type: String,
      enum: ["Poetry", "Literature", "Stories", "Art & Film", "Music"],
      default: "Literature",
    },
    type: {
      type: String,
      enum: ["recommended", "reading-list"],
      default: "recommended",
    },
    review: { type: String },
    rating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Book", bookSchema);
