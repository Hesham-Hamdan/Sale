import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// controllers - Using named imports with curly braces
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

// middlewares - Using named imports for authenticate/authorizeAdmin
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
// middlewares - Using a default import for checkId
import checkId from "../middlewares/checkId.js";

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router
  .route("/:id")
  .get(fetchProductById)
  .patch(authenticate, authorizeAdmin, formidable(), updateProductDetails) // Note: Changed to PUT for consistency, but patch is also fine.
  .delete(authenticate, authorizeAdmin, removeProduct);

router.route("/filtered-products").post(filterProducts);

export default router;
