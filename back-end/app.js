const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const xss = require("xss-clean");
const hpp = require("hpp");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const bookRouter = require("./routes/bookRoutes");
const authorRouter = require("./routes/authorRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const formatRouter = require("./routes/formatRoutes");
const genreRouter = require("./routes/genreRoutes");
const languageRouter = require("./routes/languageRoutes");
const letterRouter = require("./routes/letterRoutes");
const publisherRouter = require("./routes/publisherRoutes");

const app = express();

// Set security HTTP headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "http://localhost:8080"],
    },
  })
);

// Set up CORS
app.use(cors());
app.options("*", cors());

// Body parser, reading data from body into req.body
app.use(express.json());

// Data sanitization against XSS
app.use(xss());

// Serving static files
app.use(express.static(`${__dirname}/public`));

// 3) ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/genres", genreRouter);
app.use("/api/v1/publishers", publisherRouter);
app.use("/api/v1/languages", languageRouter);
app.use("/api/v1/letters", letterRouter);
app.use("/api/v1/formats", formatRouter);
app.use("/api/v1/authors", authorRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
