const express = require("express");
const {
  subscribeUser,
  getSubscribers,
  getSubscriberCount,
  deleteSubscriber,
} = require("../controllers/subscribeController");

const router = express.Router();

router.post("/", subscribeUser);
router.get("/", getSubscribers);
router.get("/count", getSubscriberCount);
router.delete("/:id", deleteSubscriber);

module.exports = router;
