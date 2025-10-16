// const express = require("express");
// require("express-async-errors");
// const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const ServerlessHttp = require("serverless-http");

// const connectDB = require("../../config/db.js");
// const userRoutes = require("../../routes/userRoutes.js");
// const categoryRoutes = require("../../routes/categoryRoutes.js");
// const productRoutes = require("../../routes/productRoutes.js");
// const uploadRoutes = require("../../routes/uploadRoutes.js");
// const orderRoutes = require("../../routes/orderRoutes.js");

// dotenv.config();
// connectDB();

// const app = express();

// const frontendURL = [
//   "https://sale-frontend.netlify.app",
//   "https://deploy-preview-4--sale-frontend.netlify.app",
// ];

// app.use(
//   cors({
//     origin: frontendURL,
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// const apiRouter = express.Router();
// apiRouter.use("/users", userRoutes);
// apiRouter.use("/category", categoryRoutes);
// apiRouter.use("/products", productRoutes);
// apiRouter.use("/upload", uploadRoutes);
// apiRouter.use("/orders", orderRoutes);
// apiRouter.get("/config/paypal", (req, res) => {
//   res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
// });
// app.use("/api", apiRouter);

// module.exports.handler = ServerlessHttp(app);

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

dotenv.config();
connectDB();

const app = express();

// --- THE DEFINITIVE CORS FIX ---
// This list contains the trusted domains.
const whitelist = [
  "https://sale-frontend.netlify.app", // Your main production frontend
];

// In development, or for deploy previews, we want to allow any deploy preview URL.
// We use a regular expression to match any URL like: https://deploy-preview-NUMBER--sale-frontend.netlify.app
if (process.env.NODE_ENV !== "production") {
  const deployPreviewPattern =
    /^https:\/\/deploy-preview-\d+--sale-frontend\.netlify\.app$/;
  whitelist.push(deployPreviewPattern);
}

const corsOptions = {
  // The origin function checks if the request's origin is in our whitelist.
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
  credentials: true, // This is essential for sending cookies.
};

app.use(cors(corsOptions));
// --- END CORS FIX ---

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
