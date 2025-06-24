import studentService from '../services/student.service.js';
import { responseSuccess, responseError } from '../common/helpers/response.helper.js';

const studentController = {
  // Create a new student
  createStudent: async (req, res) => {
    try {
      const newStudent = await studentService.createStudent(req.body);
      res.status(201).json(responseSuccess(newStudent, 'Student created successfully'));
    } catch (error) {
      res.status(400).json(responseError(error.message, 400));
    }
  },

  // Get all students
  getAllStudents: async (req, res) => {
    try {
      const students = await studentService.getAllStudents();
      res.status(200).json(responseSuccess(students, 'Students retrieved successfully'));
    } catch (error) {
      res.status(500).json(responseError(error.message, 500));
    }
  },

  // Find a student by student_id
  findStudentById: async (req, res) => {
    const { student_id } = req.params;
    try {
      const student = await studentService.findStudentById(student_id);
      res.status(200).json(responseSuccess(student, 'Student found successfully'));
    } catch (error) {
      res.status(404).json(responseError(error.message, 404));
    }
  },

  // Delete a student by student_id
  deleteStudent: async (req, res) => {
    const { student_id } = req.params;
    try {
      const result = await studentService.deleteStudent(student_id);
      res.status(200).json(responseSuccess(null, result.message));
    } catch (error) {
      res.status(404).json(responseError(error.message, 404));
    }
  },

  // Update a student by student_id
  updateStudent: async (req, res) => {
    const { student_id } = req.params;
    try {
      const updatedStudent = await studentService.updateStudent(student_id, req.body);
      res.status(200).json(responseSuccess(updatedStudent, 'Student updated successfully'));
    } catch (error) {
      res.status(400).json(responseError(error.message, 400));
    }
  },

  // Create students from CSV file
  createStudentsFromCSV: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json(responseError('No CSV file provided', 400));
      }

      const results = await studentService.createMultipleStudentsFromCSV(req.file.path);
      
      return res.status(200).json(responseSuccess({
        successful: results.successful.length,
        failed: results.failed.length,
        details: results
      }, 'Students creation process completed'));
    } catch (error) {
      return res.status(500).json(responseError(error.message, 500));
    }
  },

  // Get all registered modules for a student with attendance rates
  getStudentModulesWithAttendanceRate: async (req, res) => {
    try {
      const { student_id } = req.params;
      const userId = req.user?.uid;
      const userRole = req.user?.role;

      // If user is a student, they can only view their own modules
      if (userRole === 'STUDENT' && student_id !== userId) {
        return res.status(403).json(responseError('Students can only view their own modules', 403));
      }

      const modulesWithAttendanceRate = await studentService.getStudentModulesWithAttendanceRate(student_id);
      
      return res.status(200).json(responseSuccess(
        modulesWithAttendanceRate, 
        'Student modules with attendance rates retrieved successfully'
      ));
    } catch (error) {
      return res.status(500).json(responseError(error.message, 500));
    }
  },

  // Get my registered modules with attendance rates (for authenticated student)
  getMyModulesWithAttendanceRate: async (req, res) => {
    try {
      const studentId = req.user.uid; // Get student ID from authenticated user
      
      const modulesWithAttendanceRate = await studentService.getStudentModulesWithAttendanceRate(studentId);
      
      return res.status(200).json(responseSuccess(
        modulesWithAttendanceRate, 
        'My modules with attendance rates retrieved successfully'
      ));
    } catch (error) {
      return res.status(500).json(responseError(error.message, 500));
    }
  },

  // Get exam eligibility status for a student
  getStudentExamEligibilityStatus: async (req, res) => {
    try {
      const { student_id } = req.params;
      const userId = req.user?.uid;
      const userRole = req.user?.role;

      // If user is a student, they can only view their own exam eligibility
      if (userRole === 'STUDENT' && student_id !== userId) {
        return res.status(403).json(responseError('Students can only view their own exam eligibility status', 403));
      }

      const examEligibilityStatus = await studentService.getStudentExamEligibilityStatus(student_id);
      
      return res.status(200).json(responseSuccess(
        examEligibilityStatus, 
        'Student exam eligibility status retrieved successfully'
      ));
    } catch (error) {
      return res.status(500).json(responseError(error.message, 500));
    }
  },

  // Get my exam eligibility status (for authenticated student)
  getMyExamEligibilityStatus: async (req, res) => {
    try {
      const studentId = req.user.uid; // Get student ID from authenticated user
      
      const examEligibilityStatus = await studentService.getStudentExamEligibilityStatus(studentId);
      
      return res.status(200).json(responseSuccess(
        examEligibilityStatus, 
        'My exam eligibility status retrieved successfully'
      ));
    } catch (error) {
      return res.status(500).json(responseError(error.message, 500));
    }
  }
};

export default studentController;