import Attendance from '../models/Attendance.model.js';
import AttendanceRequest from '../models/AttendanceRequest.model.js';

const attendanceService = {
    // Create a new attendance request
    createAttendanceRequest: async (attendanceData) => {
        return await AttendanceRequest.create(attendanceData);
    },

    // View attendance requests by module
    viewAttendanceRequestsByModule: async (moduleId) => {
        return await AttendanceRequest.findAll({ where: { module_id: moduleId } });
    },

    // View attendance requests by student
    viewAttendanceRequestsByStudent: async (studentId) => {
        return await AttendanceRequest.findAll({ where: { student_id: studentId } });
    },

    // Update an attendance request by request_id
    updateAttendanceRequest: async (requestId, updatedData) => {
        return await AttendanceRequest.update(updatedData, { where: { request_id: requestId } });
    },

    // Delete an attendance request by request_id
    deleteAttendanceRequest: async (requestId) => {
        return await AttendanceRequest.destroy({ where: { request_id: requestId } });
    },

    // Submit attendance for a class or module
    submitAttendance: async (attendanceData) => {
        return await Attendance.create(attendanceData);
    },

    // View attendance by module
    viewAttendanceByModule: async (moduleId) => {
        return await Attendance.findAll({ where: { module_id: moduleId } });
    },

    // View attendance by student
    viewAttendanceByStudent: async (studentId) => {
        return await Attendance.findAll({ where: { student_id: studentId } });
    },

    // Update attendance by attendance_id
    updateAttendance: async (attendanceId, updatedData) => {
        return await Attendance.update(updatedData, { where: { attendance_id: attendanceId } });
    },

    // Delete attendance by attendance_id
    deleteAttendance: async (attendanceId) => {
        return await Attendance.destroy({ where: { attendance_id: attendanceId } });
    }
};

export default attendanceService;
