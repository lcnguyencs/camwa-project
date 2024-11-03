import Attendance from '../models/Attendance.model.js';
import AttendanceRequest from '../models/AttendanceRequest.model.js';
import Class from '../models/Class.model.js';
import ExamTaking from '../models/ExamTaking.model.js';

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
    },

    // Calculate attendance eligibility for a student based on 80% rule
    calculateEligibility: async (studentId, moduleId) => {
        const totalClasses = await Class.count({
            where: { module_id: moduleId }
        });

        if (totalClasses === 0) {
            return { attendancePercentage: 0, eligibilityStatus: 'No Classes Scheduled' };
        }

        const attendedClasses = await Attendance.count({
            where: { student_id: studentId, intake_module_id: moduleId, attendance_status: 'present' }
        });

        const attendancePercentage = (attendedClasses / totalClasses) * 100;
        const eligibilityStatus = attendancePercentage >= 80;

        await ExamTaking.upsert({
            student_id: studentId,
            intake_module_id: moduleId,
            exam_date: null,
            is_eligible: eligibilityStatus
        });

        return { attendancePercentage, eligibilityStatus: eligibilityStatus ? 'Eligible' : 'Not Eligible' };
    },


    // Retrieve exam eligibility status for a student
    viewExamEligibilityStatus: async (studentId, moduleId) => {
        const examStatus = await ExamTaking.findOne({
            where: { student_id: studentId, module_id: moduleId }
        });
        return examStatus ? examStatus.is_eligible ? 'Eligible' : 'Not Eligible' : 'No Record';
    },

    // Handle attendance discrepancy - request correction
    requestAttendanceCorrection: async (studentId, moduleId, requestDetails) => {
        return await AttendanceRequest.create({
            student_id: studentId,
            module_id: moduleId,
            status: 'pending',
            ...requestDetails
        });
    },

    // Approve or deny attendance correction
    handleCorrectionRequest: async (requestId, approvalStatus) => {
        // Update the correction request's status
        await AttendanceRequest.update(
            { status: approvalStatus ? 'approved' : 'denied' },
            { where: { request_id: requestId } }
        );

        // If approved, update the attendance record accordingly
        if (approvalStatus) {
            const request = await AttendanceRequest.findOne({ where: { request_id: requestId } });
            if (request) {
                await Attendance.update(
                    { attendance_status: 'present' },  // Assuming correction to mark as present
                    { where: { student_id: request.student_id, module_id: request.module_id } }
                );
            }
            console.log(`Correction request ${requestId} approved and attendance updated.`);
        } else {
            console.log(`Correction request ${requestId} denied.`);
        }

        
        return approvalStatus ? 'Correction Approved' : 'Correction Denied';
    }
};

export default attendanceService;
