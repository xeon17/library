const express = require("express");
const genreController = require("./../controllers/genreController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
    .route("/")
    .get(genreController.getAllGenre)
    .post(authController.restrictTo("Admin"), genreController.createGenre);

module.exports = router;
