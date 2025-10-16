// This middleware handles requests for routes that don't exist.
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// This is the main error handler. It catches all errors thrown in your application.
const errorHandler = (err, req, res, next) => {
  // If the status code is still 200, it means the error was not an HTTP error,
  // so we default to a 500 Internal Server Error.
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message: message,
    // Provide the stack trace only in development mode for debugging.
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
