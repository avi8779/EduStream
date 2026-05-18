import path from "path";
import multer from "multer";
import fs from "fs";

// Ensure uploads directory exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/");
  },
  filename: (_req, file, cb) => {
    // ← unique filename prevents conflicts
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (_req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (
    ext !== ".jpg" &&
    ext !== ".jpeg" &&
    ext !== ".webp" &&
    ext !== ".png" &&
    ext !== ".mp4" &&
    ext !== ".mkv" &&   // ← added more video formats
    ext !== ".mov"
  ) {
    cb(new Error(`Unsupported file type! ${ext}`), false);
    return;
  }
  cb(null, true);
};

const upload = multer({
  storage,              // ← only storage, no dest
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter,
});

export default upload;
