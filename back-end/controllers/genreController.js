const factory = require("./handlerFactory");
const catchAsync = require("./../utils/catchAsync"); // Utility function to catch asynchronous errors
const prisma = require("../prisma/prisma");

// Controller function for vaccination creation
exports.createGenre = factory.createOne(prisma.genre);
exports.getGenre = factory.getOne(prisma.genre);
exports.getAllGenre = factory.getAll(prisma.genre);
exports.updateGenre = factory.updateOne(prisma.genre);
exports.deleteGenre = factory.deleteOne(prisma.genre);
