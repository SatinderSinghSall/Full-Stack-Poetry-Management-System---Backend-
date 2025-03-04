const express = require("express");
const {
  addPoem,
  getPoems,
  getPoemById,
} = require("../controllers/poemController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, admin, addPoem); // Only Admin can add poems

router.get("/", getPoems); // Public - View all poems
router.get("/:id", getPoemById); // Public - View single poem

module.exports = router;
