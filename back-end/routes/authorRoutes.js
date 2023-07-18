const express = require("express");
const authorController = require("./../controllers/authorController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
    .route("/")
    .get(authorController.getAllAuthors)
    .post(authController.restrictTo("Admin"), authorController.createAuthor);

module.exports = router;
