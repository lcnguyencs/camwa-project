import { Op } from 'sequelize';
import Student from '../models/Student.model.js';
import Attendance from '../models/Attendance.model.js';

const dashboardService = {
  getDashboardStats: async () => {
    try {
      // Get total number of students
      const totalStudents = await Student.count();
      
      // Get students with 'present' status in attendance
      // This gets unique students who have at least one 'present' attendance record
      const studentsWithPresentStatus = await Attendance.count({
        distinct: true,
        col: 'student_id',
        where: {
          attendance_status: 'present',
          is_deleted: false
        }
      });
      
      return {
        totalStudents,
        studentsWithPresentStatus
      };
    } catch (error) {
      console.error('Error in getDashboardStats:', error);
      throw error;
    }
  }
};

export default dashboardService;
