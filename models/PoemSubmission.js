const mongoose = require("mongoose");

const poemSubmissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Poem title is required"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      default: "Poetry",
    },
    content: {
      type: String,
      required: [true, "Poem content is required"],
    },
    noteToAdmin: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("PoemSubmission", poemSubmissionSchema);
