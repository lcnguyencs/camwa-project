import attendanceService from "../services/attendance.service.js";

const attendanceManagement = {
    // Create Attendance (Automated or Manual)
    createAttendance: async (req, res, next) => {
        try {
            const attendanceData = req.body;
            const result = await attendanceService.createAttendance(attendanceData);
            res.status(201).json({ message: 'Attendance recorded successfully', data: result });
        } catch (error) {
            next(error);
        }
    },

    // View Attendance Records
    viewAttendance: async (req, res, next) => {
        try {
            const classId = req.params.classId; // or studentId, based on what's required
            const result = await attendanceService.viewAttendance(classId);
            res.status(200).json({ message: 'Attendance records retrieved successfully', data: result });
        } catch (error) {
            next(error);
        }
    },

    // Update Attendance (for corrections)
    updateAttendance: async (req, res, next) => {
        try {
            const attendanceId = req.params.attendanceId;
            const updatedData = req.body;
            const result = await attendanceService.updateAttendance(attendanceId, updatedData);
            res.status(200).json({ message: 'Attendance updated successfully', data: result });
        } catch (error) {
            next(error);
        }
    },

    // Delete Attendance Record
    deleteAttendance: async (req, res, next) => {
        try {
            const attendanceId = req.params.attendanceId;
            await attendanceService.deleteAttendance(attendanceId);
            res.status(200).json({ message: 'Attendance record deleted successfully' });
        } catch (error) {
            next(error);
        }
    },
};

export default attendanceManagement;
