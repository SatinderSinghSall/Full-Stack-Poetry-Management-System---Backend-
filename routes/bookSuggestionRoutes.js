const express = require("express");
const {
  createSuggestion,
  getAllSuggestions,
  updateSuggestionStatus,
  deleteSuggestion,
} = require("../controllers/bookSuggestionController");

const router = express.Router();

router.post("/", createSuggestion);
router.get("/", getAllSuggestions);
router.patch("/:id", updateSuggestionStatus);
router.delete("/:id", deleteSuggestion);

module.exports = router;
