const express = require("express");
const {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} = require("../controllers/categoryController.js");

const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, createCategory);
router
  .route("/:categoryId")
  .patch(authenticate, authorizeAdmin, updateCategory);
router
  .route("/:categoryId")
  .delete(authenticate, authorizeAdmin, removeCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

module.exports = router;
