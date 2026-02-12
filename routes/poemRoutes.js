const express = require("express");
const {
  addPoem,
  getPoems,
  getPoemById,
  updatePoem,
  deletePoem,
  likePoem,
} = require("../controllers/poemController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, admin, addPoem);
router.get("/", getPoems);
router.get("/:id", getPoemById);
router.put("/:id", protect, admin, updatePoem);
router.delete("/:id", protect, admin, deletePoem);
router.post("/:id/like", likePoem);

module.exports = router;
