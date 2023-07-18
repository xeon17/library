const factory = require("./handlerFactory");
const catchAsync = require("./../utils/catchAsync"); // Utility function to catch asynchronous errors
const prisma = require("../prisma/prisma");

// Controller function for vaccination creation
exports.createAuthor = factory.createOne(prisma.author);
exports.getAuthor = factory.getOne(prisma.author);
exports.getAllAuthors = factory.getAll(prisma.author);
exports.updateAuthor = factory.updateOne(prisma.author);
exports.deleteAuthor = factory.deleteOne(prisma.author);