const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get("/count", async (req, res) => {
  const count = await User.countDocuments();
  res.json({ count });
});

module.exports = router;
