const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    if (req.params.id && req.params.id.length !== 24) {
      res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(500).json({ success: false, message: error.message });
  });
};

export default asyncHandler;
