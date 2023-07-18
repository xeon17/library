const express = require("express");
const languageController = require("./../controllers/languageController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
    .route("/")
    .get(languageController.getAllLanguage)
    .post(authController.restrictTo("Admin"), languageController.createLanguage);

module.exports = router;
