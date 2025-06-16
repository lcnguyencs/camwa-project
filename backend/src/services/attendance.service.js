import Attendance from '../models/Attendance.model.js';
import AttendanceRequest from '../models/AttendanceRequest.model.js';
import ExamTaking from '../models/ExamTaking.model.js';
import { sendMail } from '../common/nodemailer/send-mail.nodemailer.js';

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
    },    // Submit attendance for a class or module
    submitAttendance: async (attendanceData) => {
        // Ensure attendance status is valid
        if (!['present', 'absent', 'late', 'excused'].includes(attendanceData.attendance_status)) {
            throw new Error('Invalid attendance status');
        }
        return await Attendance.create(attendanceData);
    },    // View attendance by module
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
    },    // Calculate attendance eligibility for a student based on the 80% rule
    calculateEligibility: async (studentId, moduleId, examDate) => {
        try {
            // Count entries in Attendance table for this module
            const totalClasses = await Attendance.count({ 
                where: { module_id: moduleId },
                distinct: true,
                col: 'attendance_id'
            });

            // If there are no classes scheduled, return a default response
            if (totalClasses === 0) {
                return { attendancePercentage: 0, eligibilityStatus: 'No Classes Scheduled' };
            }

            // Count the number of classes the student attended
            const attendedClasses = await Attendance.count({
                where: {
                    student_id: studentId,
                    module_id: moduleId,
                    attendance_status: 'present'
                }
            });
            
            // Count classes marked as excused (these don't count against attendance)
            const excusedClasses = await Attendance.count({
                where: {
                    student_id: studentId,
                    module_id: moduleId,
                    attendance_status: 'excused'
                }
            });
            
            // Calculate attendance percentage (counting only present against total minus excused)
            const effectiveClassCount = totalClasses - excusedClasses;
            const attendancePercentage = effectiveClassCount > 0 ? (attendedClasses / effectiveClassCount) * 100 : 0;

            // Determine eligibility based on the 80% rule
            const isEligible = attendancePercentage >= 80;
            const eligibilityStatus = isEligible ? 'Eligible' : 'Not Eligible';

            // Update or insert exam eligibility in the ExamTaking table
            await ExamTaking.upsert({
                student_id: studentId,
                module_id: moduleId,
                exam_date: examDate,  // Use provided exam date or keep it null if unknown
                is_eligible: isEligible
            });

            return { 
                attendancePercentage, 
                eligibilityStatus,
                presentCount: attendedClasses,
                excusedCount: excusedClasses,
                totalClasses: totalClasses 
            };
        } catch (error) {
            console.error('Error calculating eligibility:', error);
            throw new Error('Failed to calculate eligibility');
        }
    },


    // Retrieve exam eligibility status for a student
    viewExamEligibilityStatus: async (studentId, moduleId) => {
        const examStatus = await ExamTaking.findOne({
            where: { student_id: studentId, module_id: moduleId}
        });
        return examStatus ? examStatus.is_eligible ? 'Eligible' : 'Not Eligible' : 'No Record';
    },// Handle attendance discrepancy - request correction
    requestAttendanceCorrection: async (attendanceId, studentId, moduleId, requestDetails) => {
        if (!requestDetails.proposed_status || 
            !['present', 'absent', 'late', 'excused'].includes(requestDetails.proposed_status)) {
            throw new Error('Invalid proposed attendance status');
        }

        const attendance = await Attendance.findByPk(attendanceId);
        if (!attendance) {
            throw new Error('Attendance record not found');
        }

        const request = await AttendanceRequest.create({
            attendance_id: attendanceId,
            student_id: studentId,
            module_id: moduleId,
            request_status: 'pending',
            proposed_status: requestDetails.proposed_status,
            reason: requestDetails.reason || null
        });

        // Send email notification to student about the correction request submission
        await sendMail({
            to: 'student@example.com', // Replace with student's email
            subject: 'Attendance Correction Request Submitted',
            text: `Your attendance correction request for module ${moduleId} has been submitted successfully.`,
            html: `<p>Your attendance correction request for module ${moduleId} has been submitted successfully.</p>`
        });

        return request;
    },    // Approve or deny attendance correction
    handleCorrectionRequest: async (requestId, approvalStatus, processedBy) => {
        const request = await AttendanceRequest.findByPk(requestId);
        if (!request) {
            throw new Error('Attendance request not found');
        }
        
        if (request.request_status !== 'pending') {
            throw new Error('This request has already been processed');
        }

        const newStatus = approvalStatus ? 'approved' : 'rejected';

        // Update the correction request with processed information
        const updateData = {
            request_status: newStatus,
            processed_by: processedBy,
            processed_at: new Date()
        };
        
        // If approved, also set the approved_status and update the attendance record
        if (approvalStatus) {
            updateData.approved_status = request.proposed_status;
            
            // Update the actual attendance record
            await Attendance.update(
                { 
                    attendance_status: request.proposed_status,
                    updated_at: new Date()
                },
                { where: { attendance_id: request.attendance_id } }
            );
            
            console.log(`Correction request ${requestId} approved and attendance updated to ${request.proposed_status}.`);
        } else {
            console.log(`Correction request ${requestId} rejected.`);
        }
        
        // Update the request record
        await AttendanceRequest.update(updateData, { where: { request_id: requestId } });

        // Send email notification about the correction decision
        await sendMail({
            to: 'student@example.com',  // Replace with student's email in a real scenario
            subject: `Attendance Correction ${approvalStatus ? 'Approved' : 'Rejected'}`,
            text: `Your attendance correction request for module ${request.module_id} has been ${approvalStatus ? 'approved' : 'rejected'}.`,
            html: `<p>Your attendance correction request for module ${request.module_id} has been ${approvalStatus ? 'approved' : 'rejected'}.</p>`
        });

        return {
            status: newStatus,
            message: approvalStatus ? 'Correction Approved' : 'Correction Rejected'
        };
    },    // Get all attendance requests by status
    getAttendanceRequestsByStatus: async (status, moduleId = null) => {
        const query = { where: { request_status: status } };
        if (moduleId) {
            query.where.module_id = moduleId;
        }
        return await AttendanceRequest.findAll(query);
    },

    // Create multiple attendance records from CSV file (Faculty Assistant only)
    createAttendanceFromCSV: async (filePath) => {
        try {
            const fs = await import('fs/promises');
            
            // Check if file exists before attempting to read
            try {
                await fs.access(filePath);
                console.log(`CSV file exists at: ${filePath}`);
            } catch (fileError) {
                throw new Error(`File not found: ${filePath}`);
            }
            
            const Excel = (await import('exceljs')).default;
            const workbook = new Excel.Workbook();
            
            console.log(`Attempting to read CSV from: ${filePath}`);
            
            // Parse the CSV file
            await workbook.csv.readFile(filePath);
            const worksheet = workbook.worksheets[0];
            
            console.log(`CSV loaded successfully with ${worksheet.rowCount} rows`);
            
            const results = {
                successful: [],
                failed: []
            };
            
            // Skip the header row and process each row
            for (let i = 2; i <= worksheet.rowCount; i++) {
                const row = worksheet.getRow(i);
                const student_id = row.getCell(1).value?.toString(); // StudentID
                const module_id = row.getCell(2).value?.toString(); // moduleId
                const module_name = row.getCell(3).value?.toString(); // ModuleName
                const status = row.getCell(4).value?.toString(); // status
                
                // Skip empty rows or rows with missing required fields
                if (!student_id || !module_id || !status) {
                    console.log(`Skipping row ${i} due to missing required fields`);
                    results.failed.push({
                        row: i,
                        error: 'Missing required fields'
                    });
                    continue;
                }
                
                // Validate attendance status
                const validStatuses = ['present', 'absent', 'late', 'excused'];
                const normalizedStatus = status.toLowerCase();
                
                if (!validStatuses.includes(normalizedStatus)) {
                    console.log(`Skipping row ${i} due to invalid status: ${status}`);
                    results.failed.push({
                        student_id,
                        module_id,
                        error: `Invalid attendance status: ${status}. Must be one of: present, absent, late, excused`
                    });
                    continue;
                }
                
                try {
                    // Create attendance record
                    const attendanceData = {
                        student_id,
                        module_id,
                        attendance_status: normalizedStatus,
                    };
                    
                    // Use the existing submitAttendance method
                    const newAttendance = await attendanceService.submitAttendance(attendanceData);
                    
                    results.successful.push({
                        attendance_id: newAttendance.attendance_id,
                        student_id: newAttendance.student_id,
                        module_id: newAttendance.module_id,
                        attendance_status: newAttendance.attendance_status
                    });
                } catch (error) {
                    console.error(`Error creating attendance at row ${i}:`, error);
                    results.failed.push({
                        student_id,
                        module_id,
                        error: error.message
                    });
                }
            }
            
            return results;
        } catch (error) {
            console.error('Error creating attendance from CSV:', error);
            throw new Error('Error creating attendance from CSV: ' + error.message);
        }
    }
};

export default attendanceService;
