import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import ServerlessHttp from "serverless-http";

import connectDB from "../../config/db.js";
import userRoutes from "../../routes/userRoutes.js";
import categoryRoutes from "../../routes/categoryRoutes.js";
import productRoutes from "../../routes/productRoutes.js";
import uploadRoutes from "../../routes/uploadRoutes.js";
import orderRoutes from "../../routes/orderRoutes.js";

// --- 🧐 DEBUGGING BLOCK ---
// This log will appear in your Netlify FUNCTION LOG.
console.log("--- DEBUGGING DATABASE IMPORT ---");
console.log("Type of 'connectDB':", typeof connectDB);
console.log("---------------------------------");
// --- END DEBUGGING BLOCK ---

dotenv.config();
connectDB(); // The error happens here.

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const apiRouter = express.Router();
apiRouter.use("/users", userRoutes);
apiRouter.use("/category", categoryRoutes);
apiRouter.use("/products", productRoutes);
apiRouter.use("/upload", uploadRoutes);
apiRouter.use("/orders", orderRoutes);
apiRouter.get("/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});
app.use("/api", apiRouter);
