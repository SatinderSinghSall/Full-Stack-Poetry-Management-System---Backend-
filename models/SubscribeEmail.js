const mongoose = require("mongoose");

const subscribeSchema = new mongoose.Schema({
  email: String,
});

const Email = mongoose.model("Email", subscribeSchema);
module.exports = Email;
