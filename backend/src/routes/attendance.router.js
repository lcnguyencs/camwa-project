import express from 'express';
import attendanceController from '../controllers/attendanceManagement.controller.js';
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
    cb(null, 'attendance-' + uniqueSuffix + path.extname(file.originalname));
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

const attendanceRouter = express.Router();

// Create and manage attendance records (for Admin or Faculty Assistant)
attendanceRouter.post('/create', verifyTokenAndRole(['ADMIN', 'FACULTY','STUDENT']), attendanceController.createAttendance);
attendanceRouter.get('/view', verifyTokenAndRole(['ADMIN', 'FACULTY', 'LECTURER', 'STUDENT']), attendanceController.viewAttendance);
attendanceRouter.put('/:attendanceId', verifyTokenAndRole(['ADMIN', 'FACULTY']), attendanceController.updateAttendance);
attendanceRouter.delete('/:attendanceId', verifyTokenAndRole(['ADMIN', 'FACULTY']), attendanceController.deleteAttendance);

// Calculate and view eligibility for exams
attendanceRouter.get('/eligibility/calculate', verifyTokenAndRole(['ADMIN', 'FACULTY']), attendanceController.calculateEligibility);
attendanceRouter.get('/eligibility/status', verifyTokenAndRole(['STUDENT', 'lecturer', 'ADMIN']), attendanceController.viewExamEligibilityStatus);

// Attendance request management
attendanceRouter.get('/requests', verifyTokenAndRole(['ADMIN', 'FACULTY', 'LECTURER']), attendanceController.getAttendanceRequestsByStatus);

// Attendance correction requests
attendanceRouter.post('/STUDENT/correction', verifyTokenAndRole(['ADMIN', 'STUDENT']), attendanceController.requestAttendanceCorrection);
attendanceRouter.put('/correction/:requestId', verifyTokenAndRole(['ADMIN', 'FACULTY']), attendanceController.handleCorrectionRequest);

// CSV upload routes (Faculty Assistant only)
// Standard endpoint with specific field name
attendanceRouter.post(
  '/create-from-csv', 
  verifyTokenAndRole(['ADMIN', 'FACULTY']), 
  upload.single('file'),
  attendanceController.createAttendanceFromCSV
);

// Alternative endpoint that can accept any field name
attendanceRouter.post(
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
  attendanceController.createAttendanceFromCSV
);

// Endpoint for using a default CSV file
attendanceRouter.post(
  '/create-from-default-csv',
  verifyTokenAndRole(['ADMIN', 'FACULTY']),
  (req, res, next) => {
    // Set the default CSV file path
    const defaultCsvPath = path.resolve(__dirname, '../../../..', 'FA - Create Attendance List.csv');
    req.file = { path: defaultCsvPath };
    next();
  },
  attendanceController.createAttendanceFromCSV
);

export default attendanceRouter;
