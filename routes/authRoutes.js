const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController.js");
const router = express.Router();

router.post("/register", registerUser); // Register User/Admin
router.post("/login", loginUser); // Login User/Admin

module.exports = router;
