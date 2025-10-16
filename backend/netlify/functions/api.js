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

// // --- THE DEFINITIVE CORS FIX ---
// const whitelist = [
//   "https://sale-frontend.netlify.app", // Your main production frontend
// ];

// // THE FIX: Use Netlify's 'CONTEXT' variable instead of 'NODE_ENV'.
// // This is more reliable for detecting deploy previews.
// if (process.env.CONTEXT !== "production") {
//   const deployPreviewPattern =
//     /^https:\/\/deploy-preview-\d+--sale-frontend\.netlify\.app$/;
//   whitelist.push(deployPreviewPattern);
// }

// const corsOptions = {
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);

//     if (
//       whitelist.some((pattern) =>
//         pattern instanceof RegExp ? pattern.test(origin) : pattern === origin
//       )
//     ) {
//       return callback(null, true);
//     } else {
//       return callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };

// app.use(cors(corsOptions));
// // --- END CORS FIX ---

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

// --- THE FINAL CORS DEBUGGING STEP ---
// We are temporarily removing the dynamic logic and hardcoding the URLs.
// This is a test to force the correct configuration and break any caching issues.
const allowedOrigins = [
  "https://sale-frontend.netlify.app", // Your main production frontend
  "https://deploy-preview-4--sale-frontend.netlify.app", // The specific preview causing issues
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
// --- END CORS STEP ---

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const apiRouter = express.Router();
apiRouter.use("/users", userRoutes);
apiRouter.use("/category", categoryRoutes);
apiRouter.use("/products", productRoutes);
api - router.use("/upload", uploadRoutes);
apiRouter.use("/orders", orderRoutes);
apiRouter.get("/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});
app.use("/api", apiRouter);

module.exports.handler = ServerlessHttp(app);
