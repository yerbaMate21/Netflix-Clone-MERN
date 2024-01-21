const express = require("express");

const { signupUser, loginUser } = require("../controllers/authController");
const {
  addToLikedMovies,
  getLikedMovies,
  removeFromLikedMovies,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
//
router.get("/liked/:email", getLikedMovies);
router.post("/liked", addToLikedMovies);
router.put("/liked/:id", removeFromLikedMovies);

module.exports = router;
