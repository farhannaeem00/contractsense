import multer from 'multer';
import path from 'path';

// Store file in memory (as buffer), not on disk
// This is better for cloud deployment (Render has no persistent disk)
const storage = multer.memoryStorage();

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.pdf', '.docx', '.doc'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(ext)) {
    cb(null, true); // ✅ Accept file
  } else {
    cb(new Error('Only PDF and DOCX files are allowed'), false); // ❌ Reject file
  }
};

// Final multer config
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
});