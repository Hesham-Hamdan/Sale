const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Check for valid image mimetypes
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  if (mimetypes.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only! Please upload a valid image file."), false);
  }
};

const upload = multer({ storage, fileFilter });

// --- The Upload Route ---
// This route now handles the upload to Cloudinary.
router.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No image file provided." });
  }

  // A helper function to upload the buffer stream to Cloudinary
  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      // streamifier helps convert the buffer (req.file.buffer) into a readable stream
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  try {
    const result = await streamUpload(req);
    // Send back the secure URL from Cloudinary
    res.status(200).send({
      message: "Image uploaded successfully to Cloudinary",
      image: result.secure_url, // The HTTPS URL of the uploaded image
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).send({
      message: "Failed to upload image.",
      error: error.message,
    });
  }
});

module.exports = router;
