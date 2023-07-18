const express = require("express");
const bookController = require("./../controllers/bookController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(
    authController.restrictTo("Librarian", "Admin"),
    bookController.createBook
  );

router
  .route("/:id")
  .get(bookController.getBook)
  .patch(
    authController.restrictTo("Librarian", "Admin"),
    bookController.updateBook
  )
  .delete(
    authController.restrictTo("Librarian", "Admin"),
    bookController.deleteBook
  );

module.exports = router;
