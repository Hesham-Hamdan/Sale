import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import ServerlessHttp from "serverless-http";

// Corrected relative paths are still needed
import connectDB from "../../config/db.js";
import userRoutes from "../../routes/userRoutes.js";
import categoryRoutes from "../../routes/categoryRoutes.js";
import productRoutes from "../../routes/productRoutes.js";
import uploadRoutes from "../../routes/uploadRoutes.js";
import orderRoutes from "../../routes/orderRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- THE FIX: Create a single parent router for the entire API ---
// This is a more robust way to handle routing in a serverless context.
const apiRouter = express.Router();

// Mount all your specific routes onto this single parent router
apiRouter.use("/users", userRoutes);
apiRouter.use("/category", categoryRoutes);
apiRouter.use("/products", productRoutes);
apiRouter.use("/upload", uploadRoutes);
apiRouter.use("/orders", orderRoutes);

apiRouter.get("/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// Now, mount the single parent router under the "/api" path prefix.
// The Express app will now correctly handle requests like "/api/products".
app.use("/api", apiRouter);

// Note: Serving static files from the local filesystem like this does not work in a
// serverless function environment. This code is effectively ignored on Netlify.
// Your images must be hosted on a service like Cloudinary.

// --- Export the handler for Netlify ---
export const handler = ServerlessHttp(app);
