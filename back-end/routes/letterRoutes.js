const express = require("express");
const letterController = require("./../controllers/letterController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
  .route("/")
  .get(letterController.getAllLetters)
  .post(authController.restrictTo("Admin"), letterController.createLetter);

module.exports = router;
