const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");
const prisma = require("../prisma/prisma");
const AppError = require("../utils/AppError");

exports.getAllBooks = catchAsync(async (req, res, next) => {
  const { search } = req.query;
  const nameFilter = search
    ? {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { category: { name: { contains: search, mode: "insensitive" } } },
          { genre: { name: { contains: search, mode: "insensitive" } } },
        ],
      }
    : {};

  const books = await prisma.book.findMany({
    where: nameFilter,
    include: {
      category: true,
      author: true,
      letter: true,
      publisher: true,
      genre: true,
      language: true,
      format: true,
    },
  });

  if (!books || books.length === 0) {
    return next(new AppError("No books found", 404));
  }

  res.status(200).json(books);
});

exports.createBook = catchAsync(async (req, res, next) => {
  const { isbn, title } = req.body;

  const existingBook = await prisma.book.findFirst({
    where: {
      OR: [{ isbn: isbn }, { title: title }],
    },
  });

  if (existingBook) {
    return next(
      new AppError("A book with this isbn or title already exists", 409)
    );
  }

  const newBook = await prisma.book.create({
    data: {
      title: req.body.title,
      summary: req.body.summary,
      isbn: req.body.isbn,
      pageCount: req.body.pageCount,
      releaseDate: req.body.releaseDate,
      category: {
        connect: {
          id: req.body.category,
        },
      },
      publisher: {
        connect: {
          id: req.body.publisher,
        },
      },
      author: {
        connect: {
          id: req.body.author,
        },
      },
      letter: {
        connect: {
          id: req.body.letter,
        },
      },
      genre: {
        connect: {
          id: req.body.genre,
        },
      },
      language: {
        connect: {
          id: req.body.language,
        },
      },
      format: {
        connect: {
          id: req.body.format,
        },
      },
    },
  });
  // If the book is created successfully, send a success response
  if (newBook) {
    res.status(201).json({
      status: "success",
    });
  }
});

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await prisma.book.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      category: true,
      author: true,
      letter: true,
      publisher: true,
      genre: true,
      language: true,
      format: true,
    },
  });
  if (!book) {
    return next(new AppError("No book found with that ID", 404));
  }
  res.status(201).json(book);
});

exports.updateBook = catchAsync(async (req, res, next) => {
  const { title, isbn, pageCount, releaseDate, summary } = req.body;
  const bookId = req.params.id;

  // Check if the title or ISBN already exist for another book
  const existingBook = await prisma.book.findFirst({
    where: {
      OR: [
        { title: { equals: title }, NOT: { id: bookId } },
        { isbn: { equals: isbn }, NOT: { id: bookId } },
      ],
    },
  });

  if (existingBook) {
    if (existingBook.title === title) {
      return next(new AppError("Title is already taken", 409));
    } else if (existingBook.isbn === isbn) {
      return next(new AppError("ISBN is already taken", 409));
    }
  }

  // Update the book with the provided data
  const updatedBook = await prisma.book.update({
    where: {
      id: bookId,
    },
    data: {
      title,
      isbn,
      pageCount,
      releaseDate,
      summary,
      category: {
        connect: {
          id: req.body.category,
        },
      },
      publisher: {
        connect: {
          id: req.body.publisher,
        },
      },
      genre: {
        connect: {
          id: req.body.genre,
        },
      },
      letter: {
        connect: {
          id: req.body.letter,
        },
      },
      language: {
        connect: {
          id: req.body.language,
        },
      },
      format: {
        connect: {
          id: req.body.format,
        },
      },
      author: {
        connect: {
          id: req.body.author,
        },
      },
    },
  });

  if (updatedBook) {
    res.status(200).json({
      status: "success",
    });
  }
});

exports.deleteBook = factory.deleteOne(prisma.book);
