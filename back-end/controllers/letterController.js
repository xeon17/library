const factory = require("./handlerFactory");
const catchAsync = require("./../utils/catchAsync"); // Utility function to catch asynchronous errors
const prisma = require("../prisma/prisma");

// Controller function for vaccination creation
exports.createLetter = factory.createOne(prisma.letter);
exports.getLetter = factory.getOne(prisma.letter);
exports.getAllLetters= factory.getAll(prisma.letter);
exports.updateLetter = factory.updateOne(prisma.letter);
exports.deleteLetter = factory.deleteOne(prisma.letter);