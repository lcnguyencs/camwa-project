import express from 'express';
import { verifyTokenAndRole } from '../middleware/authMiddleware.js';
import programRegistrationController from '../controllers/programRegistration.controller.js';
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
    cb(null, 'registration-' + uniqueSuffix + path.extname(file.originalname));
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

const router = express.Router();

// Admin and faculty routes
router.post('/', verifyTokenAndRole(['ADMIN', 'FACULTY']), programRegistrationController.createRegistration);
router.put('/:id', verifyTokenAndRole(['ADMIN', 'FACULTY']), programRegistrationController.updateRegistration);
router.delete('/:id', verifyTokenAndRole(['ADMIN', 'FACULTY']), programRegistrationController.deleteRegistration);

// Routes accessible by admin, faculty, and lecturers
router.get('/', verifyTokenAndRole(['ADMIN', 'FACULTY', 'LECTURER']), programRegistrationController.getAllRegistrations);
router.get('/:id', verifyTokenAndRole(['ADMIN', 'FACULTY', 'LECTURER']), programRegistrationController.getRegistrationById);
router.get('/student/:student_id', verifyTokenAndRole(['ADMIN', 'FACULTY', 'LECTURER']), programRegistrationController.getRegistrationsByStudentId);
router.get('/module/:module_id', verifyTokenAndRole(['ADMIN', 'FACULTY', 'LECTURER']), programRegistrationController.getRegistrationsByModuleId);

// CSV upload routes (Faculty Assistant only)
// Standard endpoint with specific field name
router.post(
  '/create-from-csv', 
  verifyTokenAndRole(['ADMIN', 'FACULTY']), 
  upload.single('file'),
  programRegistrationController.createRegistrationsFromCSV
);

// Alternative endpoint that can accept any field name
router.post(
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
          success: false, 
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
  programRegistrationController.createRegistrationsFromCSV
);

// Endpoint for using a default CSV file
router.post(
  '/create-from-default-csv',
  verifyTokenAndRole(['ADMIN', 'FACULTY']),
  (req, res, next) => {
    // Set the default CSV file path
    const defaultCsvPath = path.resolve(__dirname, '../../../..', 'FA - Create Modle Registration List.csv');
    req.file = { path: defaultCsvPath };
    next();
  },
  programRegistrationController.createRegistrationsFromCSV
);

export default router;
