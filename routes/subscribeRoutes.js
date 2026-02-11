const express = require("express");
const {
  subscribeUser,
  getSubscribers,
  getSubscriberCount,
  deleteSubscriber,
  getSubscriptionStatus,
} = require("../controllers/subscribeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", subscribeUser);
router.get("/", getSubscribers);
router.get("/count", getSubscriberCount);
router.delete("/:id", deleteSubscriber);
router.get("/status", protect, getSubscriptionStatus);

module.exports = router;
