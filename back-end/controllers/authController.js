// Importing required modules and files
const crypto = require("crypto"); // Module for cryptographic functions
const { promisify } = require("util"); // Module to convert callback-based functions to promise-based functions
const jwt = require("jsonwebtoken"); // Module for JSON Web Token implementation
const catchAsync = require("./../utils/catchAsync"); // Utility function to catch asynchronous errors
const AppError = require("./../utils/appError"); // Custom error handler
const comparePasswords = require("./../utils/comparePasswords"); // Utility function to send emails
const prisma = require("../prisma/prisma");
const bcrypt = require("bcryptjs");

// Function to sign a JSON Web Token (JWT) with user ID
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Function to create and send a JWT token to the client
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id); // Create a JWT token with user ID

  // Send the response with the token
  res.status(statusCode).json({
    status: "success",
    userId: user.id,
    role: user.role.name,
    token,
  });
};

// Controller function for user signup
exports.signup = catchAsync(async (req, res, next) => {
  const { email, username } = req.body;

  // Check if both email and username are provided in the request body
  if (email && username) {
    // Query the database to find a user with the same email
    const userByEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // Query the database to find a user with the same username
    const userByUsername = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    // If a user with the same email or username exists, return an error
    if (userByEmail || userByUsername) {
      return next(new AppError("Email or username already taken", 409));
    }
  }

  // Check if password and passwordConfirm are equal
  if (req.body.password !== req.body.passwordConfirm) {
    return next(new AppError("Passwords do not match", 409));
  }

  const password = await bcrypt.hash(req.body.password, 12);

  // Create a new user in the database with the provided user data
  const newUser = await prisma.user.create({
    data: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: password,
      username: req.body.username,
      role: {
        connect: {
          id: "64b2c7379537e6d88f7d6982",
        },
      },
    },
    select: {
      id: true,
      role: true,
    },
  });

  // Call a helper function to create and send a JWT token in the response
  createSendToken(newUser, 201, res);
});

// Controller function for user login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided in the request body
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  // Query the database to find a user with the provided email
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      password: true,
      role: {
        select: {
          name: true,
        },
      },
    },
  });

  // If no user is found or the password is incorrect, return an error
  if (!user || !(await comparePasswords(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      loginCount: {
        increment: 1,
      },
      lastLogin: {
        set: new Date(),
      },
    },
  });

  // Call a helper function to create and send a JWT token in the response
  createSendToken(user, 200, res);
});

// Middleware function to restrict access to certain roles
exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extract the token by splitting the header value
    token = req.headers.authorization.split(" ")[1];
  }

  // If no token is found, return an error indicating the user is not logged in
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // Verify the token and obtain the decoded information
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Query the database to find the user with the matching decoded ID
  const currentUser = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
    select: {
      id: true,
    },
  });

  // If no user is found, return an error indicating the user does not exist
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // Assign the currentUser object to the req.user property for access by subsequent middleware or route handlers
  req.user = currentUser;

  // Call the next middleware or route handler
  next();
});

// Middleware function to restrict access to certain roles
exports.restrictTo = (...roles) => {
  return async (req, res, next) => {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        role: true,
      },
    });

    if (!roles.includes(user.role.name)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

// Controller function for updating the password
exports.updatePassword = catchAsync(async (req, res, next) => {
  const { id } = req.user.id;

  // Query the database to find a user with the provided id
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      password: true,
    },
  });

  const isPasswordCorrect = await comparePasswords(
    req.body.passwordCurrent,
    user.password
  );
  if (!isPasswordCorrect) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // Update the password and save the user
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      password: req.body.password,
    },
  });

  // Create and send a JWT token as a response
  createSendToken(user, 200, res);
});
