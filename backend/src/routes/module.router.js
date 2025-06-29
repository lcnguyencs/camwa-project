import express from 'express';
import moduleController from '../controllers/moduleManagement.controller.js';
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
    cb(null, 'module-' + uniqueSuffix + path.extname(file.originalname));
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

const moduleRouter = express.Router();

// Create a module (Admin only)
moduleRouter.post('/create', verifyTokenAndRole(['ADMIN','FACULTY']), moduleController.createModule); 

// Update and delete modules (Admin/Faculty Assistant)
moduleRouter.put('/update/:moduleId', verifyTokenAndRole(['ADMIN']),  moduleController.updateModule); 
moduleRouter.delete('/delete/:moduleId', verifyTokenAndRole(['ADMIN']),  moduleController.deleteModule); 

// New routes for CSV upload
// Endpoint with specific field name
moduleRouter.post(
  '/create-from-csv', 
  verifyTokenAndRole(['ADMIN','FACULTY']), 
  upload.single('file'),
  moduleController.createModulesFromCSV
);

// Alternative endpoint that can accept any field name
moduleRouter.post(
  '/upload-csv',
  verifyTokenAndRole(['ADMIN','FACULTY']),
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
  moduleController.createModulesFromCSV
);

// Endpoint for using a default CSV file
moduleRouter.post(
  '/create-from-default-csv',
  verifyTokenAndRole(['ADMIN','FACULTY']),
  (req, res, next) => {
    // Set the default CSV file path
    const defaultCsvPath = path.resolve(__dirname, '../../../..', 'Admin - Create Module List.csv');
    req.file = { path: defaultCsvPath };
    next();
  },
  moduleController.createModulesFromCSV
);

// Delete modules from CSV file - Endpoint with specific field name
moduleRouter.post(
  '/delete-from-csv', 
  verifyTokenAndRole(['ADMIN']), 
  upload.single('file'),
  moduleController.deleteModulesFromCSV
);

// Delete modules from CSV file - Alternative endpoint that can accept any field name
moduleRouter.post(
  '/delete/upload-csv',
  verifyTokenAndRole(['ADMIN']),
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
  moduleController.deleteModulesFromCSV
);

// Delete modules from a default CSV file
moduleRouter.post(
  '/delete-from-default-csv',
  verifyTokenAndRole(['ADMIN']),
  (req, res, next) => {
    // Set the default CSV file path for deletion
    const defaultCsvPath = path.resolve(__dirname, '../../../..', 'Admin - Delete Module List.csv');
    req.file = { path: defaultCsvPath };
    next();
  },
  moduleController.deleteModulesFromCSV
);

export default moduleRouter;
