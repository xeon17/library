const factory = require("./handlerFactory");
const catchAsync = require("./../utils/catchAsync"); // Utility function to catch asynchronous errors
const prisma = require("../prisma/prisma");

// Controller function for vaccination creation
exports.createPublisher = factory.createOne(prisma.publisher);
exports.getPublisher = factory.getOne(prisma.publisher);
exports.getAllPublishers = factory.getAll(prisma.publisher);
exports.updatePublisher = factory.updateOne(prisma.publisher);
exports.deletePublisher = factory.deleteOne(prisma.publisher);
