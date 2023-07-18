const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
//router.post("/forgotPassword", authController.forgotPassword);
//router.patch("/resetPassword/:token", authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.patch(
  "/updateMe",
    userController.uploadUserPhoto,
  userController.updateMe
);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(authController.restrictTo("Librarian", "Admin"), userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(authController.restrictTo("Admin"), userController.updateUser)
  .delete(authController.restrictTo("Admin"), userController.deleteUser);

module.exports = router;
