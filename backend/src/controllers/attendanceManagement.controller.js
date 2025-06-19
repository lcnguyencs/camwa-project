import attendanceService from "../services/attendance.service.js";
import { responseError, responseSuccess } from "../common/helpers/response.helper.js";

const attendanceManagement = {    // Create Attendance (Automated or Manual)
    createAttendance: async (req, res, next) => {
        try {
            const attendanceData = req.body;
            const userId = req.user?.uid;
            const userRole = req.user?.role;
            
            // Validate required fields
            if (!attendanceData.attendance_id || !attendanceData.student_id || !attendanceData.module_id || !attendanceData.attendance_status) {
                return res.status(400).json(responseError('Missing required fields: student_id, module_id, and attendance_status are required', 400));
            }
            
            // Check if a student user is trying to record attendance for someone else
            if (userRole === 'STUDENT' && userId !== attendanceData.student_id) {
                return res.status(403).json(responseError('Students can only record their own attendance', 403));
            }
            
            const result = await attendanceService.submitAttendance(attendanceData);
            const resData = responseSuccess(result, 'Attendance recorded successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            // Handle registration validation error with appropriate status code
            if (error.message && error.message.includes('not registered for this module')) {
                return res.status(400).json(responseError(error.message, 400));
            }
            
            const resError = responseError(error);
            res.status(resError.code).json(resError);
        }
    },    // View Attendance Records by Module or Student   
    viewAttendance: async (req, res, next) => {
        try {
            const { moduleId, studentId } = req.query;
            const userId = req.user?.uid;
            const userRole = req.user?.role;
            
            if (!moduleId && !studentId) {
                return res.status(400).json(responseError('Either moduleId or studentId must be provided', 400));
            }
            
            // If user is a student, they can only view their own attendance
            if (userRole === 'STUDENT') {
                // If studentId is provided, ensure it matches the user's ID
                if (studentId && studentId !== userId) {
                    return res.status(403).json(responseError('Students can only view their own attendance records', 403));
                }
                
                // Force studentId to be the user's ID regardless of what was in the request
                const result = await attendanceService.viewAttendanceByStudent(userId);
                const resData = responseSuccess(result, 'Attendance records retrieved successfully');
                return res.status(resData.code).json(resData);
            }
            
            // For non-student users, proceed normally
            let result;
            if (moduleId) {
                result = await attendanceService.viewAttendanceByModule(moduleId);
            } else if (studentId) {
                result = await attendanceService.viewAttendanceByStudent(studentId);
            }
            const resData = responseSuccess(result, 'Attendance records retrieved successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error);
            res.status(resError.code).json(resError);
        }
    },
        // Update Attendance (for corrections)
    updateAttendance: async (req, res, next) => {
        try {
            const attendanceId = req.params.attendanceId;
            const updatedData = req.body;
            const userId = req.user?.uid;
            const userRole = req.user?.role;
            
            // If the user is a student, verify they can only update their own attendance
            if (userRole === 'STUDENT') {
                // First retrieve the attendance record to check ownership
                const attendance = await attendanceService.getAttendanceById(attendanceId);
                
                if (!attendance) {
                    return res.status(404).json(responseError('Attendance record not found', 404));
                }
                
                // Check if this attendance record belongs to the student
                if (attendance.student_id !== userId) {
                    return res.status(403).json(responseError('Students can only update their own attendance records', 403));
                }
            }
            
            const result = await attendanceService.updateAttendance(attendanceId, updatedData);
            const resData = responseSuccess(result, 'Attendance updated successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error);
            res.status(resError.code).json(resError);
        }
    },

    // Delete Attendance Record
    deleteAttendance: async (req, res, next) => {
        try {
            const attendanceId = req.params.attendanceId;
            await attendanceService.deleteAttendance(attendanceId);
            const resData = responseSuccess(null, 'Attendance record deleted successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error);
            res.status(resError.code).json(resError);
        }
    },

    // Calculate Exam Eligibility
    calculateEligibility: async (req, res, next) => {
        try {
            const { studentId, moduleId, examDate } = req.query;
            const result = await attendanceService.calculateEligibility(studentId, moduleId, examDate);
            const resData = responseSuccess(result, 'Eligibility calculated successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error);
            res.status(resError.code).json(resError);
        }
    },    // View Exam Eligibility Status
    viewExamEligibilityStatus: async (req, res, next) => {
        try {
            const { studentId, moduleId } = req.query;
            const userId = req.user?.uid;
            const userRole = req.user?.role;
            
            // For student users, ensure they can only view their own eligibility status
            if (userRole === 'STUDENT') {
                if (studentId && studentId !== userId) {
                    return res.status(403).json(responseError('Students can only view their own eligibility status', 403));
                }
                
                // Force studentId to be the user's ID
                const result = await attendanceService.viewExamEligibilityStatus(userId, moduleId);
                const resData = responseSuccess(result, 'Exam eligibility status retrieved successfully');
                return res.status(resData.code).json(resData);
            }
            
            const result = await attendanceService.viewExamEligibilityStatus(studentId, moduleId);
            const resData = responseSuccess(result, 'Exam eligibility status retrieved successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error);
            res.status(resError.code).json(resError);
        }
    },    // Request Attendance Correction    
    requestAttendanceCorrection: async (req, res, next) => {
        try {
            const attendanceRequestData = req.body;
            const attendanceId = attendanceRequestData.attendance_id;
            const studentId = attendanceRequestData.student_id;
            const moduleId = attendanceRequestData.module_id;
            const proposedStatus = attendanceRequestData.proposed_status;
            const reason = attendanceRequestData.reason;
            const userId = req.user?.uid;
            const userRole = req.user?.role;
            
            if (!attendanceId || !studentId || !moduleId || !proposedStatus) {
                return res.status(400).json(responseError('Missing required fields', 400));
            }
            
            // If the user is a student, verify they can only request corrections for their own attendance
            if (userRole === 'STUDENT' && userId !== studentId) {
                return res.status(403).json(responseError('Students can only request corrections for their own attendance', 403));
            }
            
            const requestDetails = {
                proposed_status: proposedStatus,
                reason: reason
            };
            
            const result = await attendanceService.requestAttendanceCorrection(
                attendanceId, 
                studentId, 
                moduleId, 
                requestDetails
            );
            
            const resData = responseSuccess(result, 'Attendance correction request submitted successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error);
            res.status(resError.code).json(resError);
        }
    },    // Approve/Deny Attendance Correction Request
    handleCorrectionRequest: async (req, res, next) => {
        try {
            const requestId = req.params.requestId;
            const correctionData = req.body;
            const approved_status = correctionData.approved_status;
            const processedBy = correctionData.processedBy || req.user?.username || 'system';
            
            if (!approved_status) {
                return res.status(400).json(responseError('Approved status is required', 400));
            }
            
            // Validate that approved_status is a valid status value
            if (!['present', 'absent', 'late', 'excused'].includes(approved_status)) {
                return res.status(400).json(responseError('Invalid attendance status', 400));
            }
            
            const result = await attendanceService.handleCorrectionRequest(
                requestId, 
                approved_status,
                processedBy
            );
            
            const resData = responseSuccess(
                result, 
                `Correction request ${result.status === 'approved' ? 'approved' : 'rejected'} successfully`
            );
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error);
            res.status(resError.code).json(resError);
        }
    },    // Get attendance requests by status
    getAttendanceRequestsByStatus: async (req, res, next) => {
        try {
            const { status, moduleId } = req.query;
            
            if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
                return res.status(400).json({ message: 'Valid status parameter is required' });
            }
            
            const result = await attendanceService.getAttendanceRequestsByStatus(status, moduleId);
            const resData = responseSuccess(
                result, 
                `${status.charAt(0).toUpperCase() + status.slice(1)} attendance requests retrieved successfully`
            );
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error);
            res.status(resError.code).json(resError);
        }
    },

    // Create attendance records from CSV file (Faculty Assistant only)
    createAttendanceFromCSV: async (req, res, next) => {
        try {
            // Check if file was uploaded
            if (!req.file) {
                return res.status(400).json(responseError('No CSV file uploaded. Make sure to include a file field with your CSV file.', 400));
            }

            console.log('File uploaded for attendance:', req.file);
            console.log('File path:', req.file.path);
            
            // Process the CSV file and create attendance records
            const results = await attendanceService.createAttendanceFromCSV(req.file.path);
            
            res.status(201).json(
                responseSuccess(
                    results, 
                    `Created ${results.successful.length} attendance records successfully. ${results.failed.length} failed.`
                )
            );
        } catch (error) {
            console.error('Error processing attendance CSV:', error);
            res.status(500).json(responseError(error.message, 500));
        }
    }
};

export default attendanceManagement;

