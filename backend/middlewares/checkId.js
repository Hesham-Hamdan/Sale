const { isValidObjectId } = require("mongoose");

// This is a standard middleware function.
function checkId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    // It's better to throw an error that your error handler can catch.
    throw new Error(`Invalid Object ID: ${req.params.id}`);
  }
  next();
}

// Use 'module.exports' for CommonJS.
module.exports = checkId;
