const express = require("express");
const {
  createUserDetails,
  getUserDetails,
  updateUserDetails,
} = require("../controllers/userDetailsController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getUserDetails);
router.post("/", createUserDetails);
router.patch("/:id", updateUserDetails);

module.exports = router;
