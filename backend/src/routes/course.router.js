import express from 'express';
import courseController from '../controllers/courseManagement.controller.js';
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
    cb(null, 'course-' + uniqueSuffix + path.extname(file.originalname));
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

const courseRouter = express.Router();

// Create a course (Admin only)
courseRouter.post('/create', verifyTokenAndRole(['ADMIN']), courseController.createCourse); 

// Update and delete courses (Admin/Faculty Assistant)
courseRouter.put('/update/:courseId', verifyTokenAndRole(['ADMIN']),  courseController.updateCourse); 
courseRouter.delete('/delete/:courseId', verifyTokenAndRole(['ADMIN']),  courseController.deleteCourse); 

// Assign lecturers and students to intake modules (Faculty Assistant only)
courseRouter.put('/:intakeModuleId/assign-lecturer', verifyTokenAndRole(['ADMIN', 'FACULTY']), courseController.assignLecturerToIntakeModule); 
courseRouter.put('/:intakeModuleId/assign-students', verifyTokenAndRole(['ADMIN', 'FACULTY']), courseController.assignStudentsToIntakeModule); 

// Create classes for intake modules (Faculty Assistant only)
courseRouter.post('/:intakeModuleId/classes', verifyTokenAndRole(['ADMIN', 'FACULTY']), courseController.createClassesForIntakeModule); 

// Export Intake Module Report (Faculty Assistant only)
courseRouter.get('/:intakeModuleId/export-report', verifyTokenAndRole(['ADMIN', 'FACULTY']), courseController.exportIntakeModuleReport);

// New routes for CSV upload
// Endpoint with specific field name
courseRouter.post(
  '/create-from-csv', 
  verifyTokenAndRole(['ADMIN']), 
  upload.single('file'),
  courseController.createCoursesFromCSV
);

// Alternative endpoint that can accept any field name
courseRouter.post(
  '/upload-csv',
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
  courseController.createCoursesFromCSV
);

// Endpoint for using a default CSV file
courseRouter.post(
  '/create-from-default-csv',
  verifyTokenAndRole(['ADMIN']),
  (req, res, next) => {
    // Set the default CSV file path
    const defaultCsvPath = path.resolve(__dirname, '../../../..', 'Admin - Create Course List.csv');
    req.file = { path: defaultCsvPath };
    next();
  },
  courseController.createCoursesFromCSV
);

export default courseRouter;
