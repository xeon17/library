const express = require("express");
const categoryController = require("./../controllers/categoryController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
    .route("/")
    .get(categoryController.getAllCategories)
    .post(authController.restrictTo("Admin"), categoryController.createCategory);

module.exports = router;
