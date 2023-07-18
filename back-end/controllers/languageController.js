const factory = require("./handlerFactory");
const catchAsync = require("./../utils/catchAsync"); // Utility function to catch asynchronous errors
const prisma = require("../prisma/prisma");

// Controller function for vaccination creation
exports.createLanguage = factory.createOne(prisma.language);
exports.getLanguage= factory.getOne(prisma.language);
exports.getAllLanguage = factory.getAll(prisma.language);
exports.updateLanguage = factory.updateOne(prisma.language);
exports.deleteLanguage = factory.deleteOne(prisma.language);