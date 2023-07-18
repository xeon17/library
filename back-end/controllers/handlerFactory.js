const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.delete({
      where: {
        id: req.params.id,
      },
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create({
      data: req.body,
    });

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json(doc);
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const documents = await Model.findMany();

    if (documents && documents.length === 0) {
      return next(new AppError("No documents found", 404));
    }

    // SEND RESPONSE
    res.status(200).json({
      documents,
    });
  });
