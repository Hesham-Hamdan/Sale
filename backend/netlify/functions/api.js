const express = require("express");
require("express-async-errors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ServerlessHttp = require("serverless-http");

const connectDB = require("../../config/db.js");
const userRoutes = require("../../routes/userRoutes.js");
const categoryRoutes = require("../../routes/categoryRoutes.js");
const productRoutes = require("../../routes/productRoutes.js");
const uploadRoutes = require("../../routes/uploadRoutes.js");
const orderRoutes = require("../../routes/orderRoutes.js");
// IMPORT THE NEW MIDDLEWARE
const {
  notFound,
  errorHandler,
} = require("../../middlewares/errorMiddleware.js");

dotenv.config();
connectDB();

const app = express();

// ... (your cors configuration) ...
const whitelist = ["https://sale-frontend.netlify.app"];
if (process.env.CONTEXT !== "production") {
  const deployPreviewPattern =
    /^https:\/\/deploy-preview-\d+--sale-frontend\.netlify\.app$/;
  whitelist.push(deployPreviewPattern);
}
const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      whitelist.some((pattern) =>
        pattern instanceof RegExp ? pattern.test(origin) : pattern === origin
      )
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

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

// --- ADD THE ERROR MIDDLEWARE ---
// These MUST be the last pieces of middleware added to your app.
app.use(notFound);
app.use(errorHandler);
// --------------------------------

module.exports.handler = ServerlessHttp(app);
