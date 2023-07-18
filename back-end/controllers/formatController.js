const factory = require("./handlerFactory");
const catchAsync = require("./../utils/catchAsync"); // Utility function to catch asynchronous errors
const prisma = require("../prisma/prisma");

// Controller function for vaccination creation
exports.createFormat = factory.createOne(prisma.format);
exports.getFormat = factory.getOne(prisma.format);
exports.getAllFormats = factory.getAll(prisma.format);
exports.updateFormat = factory.updateOne(prisma.format);
exports.deleteFormat = factory.deleteOne(prisma.format);
