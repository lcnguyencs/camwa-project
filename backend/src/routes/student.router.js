import express from 'express';
import studentController from '../controllers/student.controller.js';
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

const studentRouter = express.Router();

studentRouter.post('/create', verifyTokenAndRole(['ADMIN', 'FACULTY']), studentController.createStudent);
studentRouter.get('/all', studentController.getAllStudents);
studentRouter.get('/:student_id', studentController.findStudentById);
studentRouter.delete('/:student_id', studentController.deleteStudent);
studentRouter.put('/:student_id', studentController.updateStudent);

// New endpoints for CSV upload

// Endpoint with specific field name
studentRouter.post(
  '/create-from-csv', 
  verifyTokenAndRole(['ADMIN', 'FACULTY']), 
  upload.single('file'),
  studentController.createStudentsFromCSV
);

// Alternative endpoint that can accept any field name
studentRouter.post(
  '/upload-csv',
  verifyTokenAndRole(['ADMIN', 'FACULTY']),
  (req, res, next) => {
    // Using multer directly with any field
    const storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, uploadsDir),
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'student-records-' + uniqueSuffix + path.extname(file.originalname));
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
  studentController.createStudentsFromCSV
);

// Endpoint for using a default CSV file
studentRouter.post(
  '/create-from-default-csv',
  verifyTokenAndRole(['ADMIN', 'FACULTY']),
  (req, res, next) => {
    // Set the default CSV file path
    const defaultCsvPath = path.resolve(__dirname, '../../../..', 'FA - Create Student List .csv');
    req.file = { path: defaultCsvPath };
    next();
  },
  studentController.createStudentsFromCSV
);

export default studentRouter;