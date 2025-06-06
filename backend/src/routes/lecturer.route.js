import express from 'express';
import lecturerController from '../controllers/lecturerManagement.controller.js';
import { verifyTokenAndRole } from '../middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Set file filter to only allow csv files
const fileFilter = (req, file, cb) => {
  if (file.originalname.toLowerCase().endsWith('.csv')) {
    cb(null, true);
  } else {
    cb(new Error('Only CSV files are allowed!'), false);
  }
};

// Create the multer upload middleware
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB max file size
});

const lecturerRouter = express.Router();

// Basic CRUD routes
lecturerRouter.post('/', lecturerController.createLecturer);
lecturerRouter.get('/', lecturerController.getAllLecturers);
lecturerRouter.get('/:lecturer_id', lecturerController.findLecturerById);
lecturerRouter.delete('/:lecturer_id', lecturerController.deleteLecturer);
lecturerRouter.put('/:lecturer_id', lecturerController.updateLecturer);

// CSV upload routes for bulk creation
// Endpoint with specific field name
lecturerRouter.post(
  '/create-from-csv', 
  verifyTokenAndRole(['ADMIN', 'FACULTY']), 
  upload.single('file'), 
  lecturerController.createLecturersFromCSV
);

// Alternative endpoint that can accept any field name
lecturerRouter.post(
  '/upload-csv',
  verifyTokenAndRole(['ADMIN', 'FACULTY']),
  (req, res, next) => {
    // Using multer directly with any field
    const uploadAny = multer({ 
      storage,
      fileFilter,
      limits: { fileSize: 1024 * 1024 * 5 }
    }).any();
    
    uploadAny(req, res, (err) => {
      if (err) {
        return res.status(400).json({ 
          status: 'error', 
          code: 400, 
          message: 'File upload error', 
          error: err.message 
        });
      }
      
      // Take the first file if any exists
      if (req.files && req.files.length > 0) {
        req.file = req.files[0];
      }
      
      next();
    });
  },
  lecturerController.createLecturersFromCSV
);

// Endpoint for using a default CSV file
lecturerRouter.post(
  '/create-from-default-csv',
  verifyTokenAndRole(['ADMIN', 'faculty_assistant']),
  (req, res, next) => {
    // Set the default CSV file path
    const defaultCsvPath = path.resolve(__dirname, '../../../..', 'FA - Create Lecturer List .csv');
    req.file = { path: defaultCsvPath };
    next();
  },
  lecturerController.createLecturersFromCSV
);

export default lecturerRouter;
