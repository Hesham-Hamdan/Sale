import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// --- Controllers & Middlewares ---
import {
  addProduct,
  addProductReview,
  fetchAllProducts,
  fetchNewProducts,
  fetchProductById,
  fetchProducts,
  fetchTopProducts,
  filterProducts,
  removeProduct,
  updateProductDetails,
} from "../controllers/productController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

// --- 🧐 DEBUGGING BLOCK ---
// These logs will appear in your Netlify Deploy Log.
console.log("--- DEBUGGING IMPORTS ---");
console.log("Type of 'addProduct':", typeof addProduct);
console.log("Type of 'addProductReview':", typeof addProductReview);
console.log("Type of 'authenticate':", typeof authenticate);
console.log("Type of 'authorizeAdmin':", typeof authorizeAdmin);
console.log("Type of 'checkId':", typeof checkId);
console.log("--------------------------");
// --- END DEBUGGING BLOCK ---

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route("/allproducts").get(fetchAllProducts);

// This is the line that crashes. The logs above will tell us which of these is not a function.
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

router.route("/filtered-products").post(filterProducts);

export default router;
