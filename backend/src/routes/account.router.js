import express from 'express';
import iamController from '../controllers/accountManagement.controller.js';
import { verifyTokenAndRole } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
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

const accountRouter = express.Router();

accountRouter.get('/', iamController.getAllUsers);
accountRouter.get('/:iamId', iamController.getUserById);
accountRouter.post('/create', verifyTokenAndRole(['ADMIN', 'faculty_assistant']), iamController.createUser);
// Endpoint with specific field name
accountRouter.post(
  '/create-students-from-csv', 
  verifyTokenAndRole(['ADMIN']), 
  upload.single('file'), // Changed field name to 'file' as it's a common default
  iamController.createStudentsFromCSV
);

// Alternative endpoint that can accept any field name - will use the first file it finds
accountRouter.post(
  '/upload-students-csv',
  verifyTokenAndRole(['ADMIN']),
  (req, res, next) => {
    // Using multer directly with any field
    const storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, uploadsDir),
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'students-' + uniqueSuffix + path.extname(file.originalname));
      }
    });
    
    const uploadAny = multer({ 
      storage,
      fileFilter: (req, file, cb) => {
        if (file.originalname.toLowerCase().endsWith('.csv')) {
          cb(null, true);
        } else {
          cb(new Error('Only CSV files are allowed!'), false);
        }
      }
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
  iamController.createStudentsFromCSV
);
accountRouter.post(
  '/create-students-from-default-csv',
  verifyTokenAndRole(['ADMIN']),
  (req, res, next) => {
    // Set the default CSV file path
    const defaultCsvPath = path.resolve(__dirname, '../../../..', 'list.csv');
    req.file = { path: defaultCsvPath };
    next();
  },
  iamController.createStudentsFromCSV
);
accountRouter.post(
  '/create-lecturers-from-csv', 
  verifyTokenAndRole(['ADMIN']), 
  upload.single('file'),
  iamController.createLecturersFromCSV
);

// Alternative endpoint for lecturers that can accept any field name
accountRouter.post(
  '/upload-lecturers-csv',
  verifyTokenAndRole(['ADMIN']),
  (req, res, next) => {
    // Using multer directly with any field
    const storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, uploadsDir),
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'lecturers-' + uniqueSuffix + path.extname(file.originalname));
      }
    });
    
    const uploadAny = multer({ 
      storage,
      fileFilter: (req, file, cb) => {
        if (file.originalname.toLowerCase().endsWith('.csv')) {
          cb(null, true);
        } else {
          cb(new Error('Only CSV files are allowed!'), false);
        }
      }
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
  iamController.createLecturersFromCSV
);

// Endpoint for using a default lecturer CSV file
accountRouter.post(
  '/create-lecturers-from-default-csv',
  verifyTokenAndRole(['ADMIN']),
  (req, res, next) => {
    // Set the default CSV file path
    const defaultCsvPath = path.resolve(__dirname, '../../../..', 'Admin - Create Lecturer List.csv');
    req.file = { path: defaultCsvPath };
    next();
  },
  iamController.createLecturersFromCSV
);
accountRouter.put('/:iamId', iamController.updateUser);
accountRouter.delete('/:iamId', iamController.deleteUser);

export default accountRouter;
