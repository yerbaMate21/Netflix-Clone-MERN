const express = require("express");
const { createCreditCard } = require("../controllers/creditCardController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// router.use(requireAuth);

router.post("/", createCreditCard);

module.exports = router;
