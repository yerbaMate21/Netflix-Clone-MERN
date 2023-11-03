const express = require("express");
const {
  createUserDetails,
  getUserDetails,
  getUserDetail,
} = require("../controllers/userDetailsController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getUserDetails);

router.get("/:id", getUserDetail);

router.post("/", createUserDetails);

module.exports = router;
