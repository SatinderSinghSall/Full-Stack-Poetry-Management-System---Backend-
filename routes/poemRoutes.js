const express = require("express");
const {
  addPoem,
  getPoems,
  getPoemById,
  updatePoem,
  deletePoem,
  likePoem,
  submitPoemDraft,
  getPoemSubmissions,
  approvePoemSubmission,
  rejectPoemSubmission,
  deletePoemSubmission,
  resetPoemSubmissionToPending,
} = require("../controllers/poemController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getPoems);

// Authenticated User Routes
router.post("/submit-draft", protect, submitPoemDraft);

// Admin Submission Management Routes
router.get("/submissions", protect, admin, getPoemSubmissions);
router.put("/submissions/:id/approve", protect, admin, approvePoemSubmission);
router.put("/submissions/:id/reject", protect, admin, rejectPoemSubmission);
router.delete("/submissions/:id", protect, admin, deletePoemSubmission);
router.put(
  "/submissions/:id/pending",
  protect,
  admin,
  resetPoemSubmissionToPending,
);

// Admin Poem Management Routes
router.post("/", protect, admin, addPoem);
router.put("/:id", protect, admin, updatePoem);
router.delete("/:id", protect, admin, deletePoem);

// Dynamic / ID Routes
router.get("/:id", getPoemById);
router.post("/:id/like", likePoem);

module.exports = router;
