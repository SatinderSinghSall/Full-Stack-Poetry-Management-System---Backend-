const express = require("express");
const {
  addPoem,
  getPoems,
  getPoemById,
  updatePoem,
  deletePoem,
} = require("../controllers/poemController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, admin, addPoem); // Add poem (admin)
router.get("/", getPoems); // Get all poems
router.get("/:id", getPoemById); // Get single poem

router.put("/:id", protect, admin, updatePoem); // Update poem
router.delete("/:id", protect, admin, deletePoem); // Delete poem

module.exports = router;
