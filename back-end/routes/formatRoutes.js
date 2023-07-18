const express = require("express");
const formatController = require("./../controllers/formatController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
  .route("/")
  .get(formatController.getAllFormats)
  .post(authController.restrictTo("Admin"), formatController.createFormat);

module.exports = router;
