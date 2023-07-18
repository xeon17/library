const factory = require("./handlerFactory");
const catchAsync = require("./../utils/catchAsync"); // Utility function to catch asynchronous errors
const prisma = require("../prisma/prisma");

// Controller function for vaccination creation
exports.createCategory = factory.createOne(prisma.category);
exports.getCategory = factory.getOne(prisma.category);
exports.getAllCategories = factory.getAll(prisma.category);
exports.updateCategory = factory.updateOne(prisma.category);
exports.deleteCategory = factory.deleteOne(prisma.category);
