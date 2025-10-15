const express = require("express");
const formidable = require("express-formidable");
const { isValidObjectId } = require("mongoose");
const router = express.Router();

// --- Controllers ---
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
} from "../controllers/productController.js";

// --- Middlewares ---
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
// NOTE: The import for 'checkId' has been removed for this test.

// --- INLINE MIDDLEWARE FOR DEBUGGING ---
// The logic from checkId.js has been moved directly into this file.
// This test will prove if the module import system is the source of the error.
function checkId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error(`Invalid Object ID: ${req.params.id}`);
  }
  next();
}
// --- END INLINE MIDDLEWARE ---

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route("/allproducts").get(fetchAllProducts);

// The 'checkId' function being used here is now the one defined locally in this file.
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

router.route("/filtered-products").post(filterProducts);

module.exports = router;
