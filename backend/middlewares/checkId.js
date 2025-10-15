import { isValidObjectId } from "mongoose";

// This is a standard middleware function.
function checkId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    // It's better to throw an error that your error handler can catch.
    throw new Error(`Invalid Object ID: ${req.params.id}`);
  }
  next();
}

// The key fix: Use 'export default' because this is the only thing in the file.
export default checkId;
