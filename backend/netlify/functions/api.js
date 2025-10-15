const express = require("express");
require("express-async-errors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ServerlessHttp = require("serverless-http");

// THE FIX: Use 'require' to import the CommonJS db.js module correctly.
const connectDB = require("../../config/db.js");
const userRoutes = require("../../routes/userRoutes.js");
const categoryRoutes = require("../../routes/categoryRoutes.js");
const productRoutes = require("../../routes/productRoutes.js");
const uploadRoutes = require("../../routes/uploadRoutes.js");
const orderRoutes = require("../../routes/orderRoutes.js");

dotenv.config();
connectDB();

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

module.exports.handler = ServerlessHttp(app);
