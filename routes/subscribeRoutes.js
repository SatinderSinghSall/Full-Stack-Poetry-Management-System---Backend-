const express = require("express");
const {
  subscribeUser,
  getSubscribers,
  getSubscriberCount,
} = require("../controllers/subscribeController");

const router = express.Router();

router.post("/", subscribeUser);
router.get("/", getSubscribers);
router.get("/count", getSubscriberCount);

module.exports = router;
