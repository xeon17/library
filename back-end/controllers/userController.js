const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const excludeFields = require("./../utils/excludeFields");
const factory = require("./handlerFactory");
const multer = require("multer");
const prisma = require("../prisma/prisma");
const bcrypt = require("bcryptjs");
const userFieldsToExclude = [
    "password",
    "passwordConfirm",
    "passwordChangedAt",
    "passwordResetToken",
    "passwordResetExpires",
    "active",
];

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img/users");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
    },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new AppError("Not an image! please only upload images", 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");
// Utility function to filter object properties
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

// Middleware function to get the current user
exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

// Controller function to update the current user's information
exports.updateMe = catchAsync(async (req, res, next) => {
    // Check if the request includes password-related fields
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                "This route is not for password updates. Please use /updateMyPassword.",
                400
            )
        );
    }

    // Check if the request includes a photo
    if(req.file){
        // Update the user's photo
        const updatedUser = await prisma.user.update({
            where: {
                id: req.user.id,
            },
            data: {
                photo: req.file.filename,
            },
        });
        // Check if the user was updated successfully
        if(updatedUser){
            return res.status(200).json({
                status: "success",
            });
        }
        next();
    }

    const {email, username} = req.body;
    // Check if the request includes a email
    if (email) {
        // Query the database to find a user with the same email
        const userByEmail = await prisma.user.findUnique({
            where: {
                email: email,
            },
            select: {
                id: true,
            },
        });
        // Check if the email is already taken
        if (userByEmail && userByEmail.id !== req.user.id) {
            return next(new AppError("Email is already taken", 409));
        }
    }

    // Check if the request includes a username
    if (username) {
        // Query the database to find a user with the same username
        const userByUsername = await prisma.user.findUnique({
            where: {
                username: username,
            },
            select: {
                id: true,
            },
        });
        // Check if the username is already taken
        if (userByUsername && userByUsername.id !== req.user.id) {
            return next(new AppError("Username is already taken", 409));
        }
    }

    // Filter the request body to allow only certain fields
    const filteredBody = filterObj(
        req.body,
        "firstName",
        "lastName",
        "email",
        "username",
        "gender",
        "birthDate",
        "address",
        "city",
        "country",
        "photo"
    );
    filteredBody.birthDate = new Date(filteredBody.birthDate);

    // Update the user with the filtered body
    const updatedUser = await prisma.user.update({
        where: {
            id: req.user.id,
        },
        data: filteredBody,
    });

    // Send the updated user as a response
    res.status(200).json({
        status: "success",
    });
});

// Controller function to delete the current user
exports.deleteMe = catchAsync(async (req, res, next) => {
    // Set the 'active' field of the user to false
    // Update the user with the filtered body
    const updatedUser = await prisma.user.update({
        where: {
            id: req.user.id,
        },
        data: {
            active: false,
        },
    });

    // Send a success response
    res.status(204).json({
        status: "success",
        data: null,
    });
});

// Controller function for creating a user
exports.createUser = catchAsync(async (req, res, next) => {
    const {email, username, role: roleName} = req.body;

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

    // Hash the password
    const password = await bcrypt.hash(req.body.password, 12);

    if (roleName) {
        const role = await prisma.role.findUnique({
            where: {
                name: roleName,
            },
        });

        if (role) {
            // Create a new user in the database with the provided user data
            const newUser = await prisma.user.create({
                data: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: password,
                    username: req.body.username,
                    gender: req.body.gender,
                    birthDate: new Date(req.body.birthDate),
                    address: req.body.address,
                    city: req.body.city,
                    country: req.body.country,
                    role: {
                        connect: {
                            id: role.id,
                        },
                    },
                },
            });

            // If the user is created successfully, send a success response
            if (newUser) {
                res.status(201).json({
                    status: "success",
                });
            }
        }
    }
});

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.params.id,
        },
    });
    const filteredUser = excludeFields(user, userFieldsToExclude);

    if (!filteredUser) {
        return next(new AppError("No user found with that ID", 404));
    }

    res.status(200).json(filteredUser);
});

// Controller functions for getting, getting all, updating, and deleting users

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const {role: roleName, search} = req.query;
    let users = [];

    const roleFilter = roleName ? {name: roleName} : {};
    const nameFilter = search
        ? {
            OR: [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ],
        }
        : {};

    const role = roleName ? await prisma.role.findUnique({where: roleFilter}) : null;

    if (role) {
        users = await prisma.user.findMany({
            where: {
                active: true,
                roleId: role.id,
                ...nameFilter,
            },
        });
    } else {
        users = await prisma.user.findMany({
            where: {
                active: true,
                ...nameFilter,
            },
        });
    }

    const filteredUsers = users.map((user) => excludeFields(user, userFieldsToExclude));
    res.status(200).json(filteredUsers);
});


exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.params.id,
        },
    });

    if (!user) {
        return next(new AppError("No user found with that ID", 404));
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: req.params.id,
        },
        data: {
            active: false,
        },
    });
    if (updatedUser) {
        res.status(200).json({
            status: "success",
        });
    }
});

exports.updateUser = factory.updateOne(prisma.user);