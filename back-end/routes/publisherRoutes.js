const express = require("express");
const authController = require("./../controllers/authController");
const publisherController = require("./../controllers/publisherController");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
    .route("/")
    .get(publisherController.getAllPublishers)
    .post(authController.restrictTo("Admin"), publisherController.createPublisher);

module.exports = router;
