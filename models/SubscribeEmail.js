const mongoose = require("mongoose");

const subscribeSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

const Email = mongoose.model("Email", subscribeSchema);
module.exports = Email;
