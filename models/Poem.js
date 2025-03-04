const mongoose = require("mongoose");

const poemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true }, // Author's name
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Admin who added it
  },
  { timestamps: true }
);

const Poem = mongoose.model("Poem", poemSchema);
module.exports = Poem;
