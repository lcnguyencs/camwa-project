import Attendance from '../models/Attendance.model.js';
import AttendanceRequest from '../models/AttendanceRequest.model.js';
import ModuleRegistration from '../models/ModuleRegistration.model.js';
import Exam from '../models/Exam.model.js';
import { sendMail } from '../common/nodemailer/send-mail.nodemailer.js';
import { Op, Sequelize } from 'sequelize';

const attendanceService = {
    // Get attendance by id
    getAttendanceById: async (attendanceId) => {
        return await Attendance.findByPk(attendanceId);
    },
    
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

        // Check if the student is registered for the module
        const registration = await ModuleRegistration.findOne({
            where: {
                student_id: attendanceData.student_id,
                module_id: attendanceData.module_id
            }
        });        if (!registration) {
            throw new Error(`Student ${attendanceData.student_id} is not registered for module ${attendanceData.module_id}`);
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
    },    // Handle attendance discrepancy - request correction
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
    },
    
    // Approve or deny attendance correction
    handleCorrectionRequest: async (requestId, approved_status, processedBy) => {
        const request = await AttendanceRequest.findByPk(requestId);
        if (!request) {
            throw new Error('Attendance request not found');
        }
        
        if (request.request_status !== 'pending') {
            throw new Error('This request has already been processed');
        }

        // Compare approved_status with proposed_status to determine if it's an approval
        const isApproved = approved_status === request.proposed_status;
        const newStatus = isApproved ? 'approved' : 'rejected';

        // Update the correction request with processed information
        const updateData = {
            request_status: newStatus,
            processed_by: processedBy,
            processed_at: new Date(),
            approved_status: approved_status
        };
        
        // If approved (approved_status matches proposed_status), update the attendance record
        if (isApproved) {
            // Update the actual attendance record
            await Attendance.update(
                { 
                    attendance_status: approved_status,
                    updated_at: new Date()
                },
                { where: { attendance_id: request.attendance_id } }
            );
            
            console.log(`Correction request ${requestId} approved and attendance updated to ${approved_status}.`);
        } else {
            console.log(`Correction request ${requestId} rejected. Proposed status was ${request.proposed_status}, admin approved status is ${approved_status}.`);
        }
        
        // Update the request record
        await AttendanceRequest.update(updateData, { where: { request_id: requestId } });        // Send email notification about the correction decision
        await sendMail({
            to: 'student@example.com',  // Replace with student's email in a real scenario
            subject: `Attendance Correction ${isApproved ? 'Approved' : 'Rejected'}`,
            text: `Your attendance correction request for module ${request.module_id} has been ${isApproved ? 'approved' : 'rejected'}.`,
            html: `<p>Your attendance correction request for module ${request.module_id} has been ${isApproved ? 'approved' : 'rejected'}.</p>`
        });return {
            status: newStatus,
            message: isApproved ? 'Correction Approved' : 'Correction Rejected',
            proposed_status: request.proposed_status,
            approved_status: approved_status,
            isApproved: isApproved
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
    },
    
    // Calculate attendance rate for a student in a specific module
    calculateAttendanceRate: async (studentId, moduleId) => {
        try {
            const attendanceRecords = await Attendance.findAll({
                where: {
                    student_id: studentId,
                    module_id: moduleId
                }
            });
            
            if (attendanceRecords.length === 0) {
                return 0; // No attendance records found
            }
            
            const totalClasses = attendanceRecords.length;
            const presentClasses = attendanceRecords.filter(record => 
                record.attendance_status === 'present' || record.attendance_status === 'late' || record.attendance_status === 'excused'
            ).length;
            
            const attendanceRate = (presentClasses / totalClasses) * 100;
            return parseFloat(attendanceRate.toFixed(2)); // Return with 2 decimal places
        } catch (error) {
            console.error('Error calculating attendance rate:', error);
            throw new Error('Error calculating attendance rate: ' + error.message);
        }
    },    // Check if a student is eligible for an exam in a specific module
    // This function will only retrieve eligibility data, not update it
    checkExamEligibility: async (studentId, moduleId) => {
        try {
            // Check if the student is registered for the module
            const registration = await ModuleRegistration.findOne({
                where: {
                    student_id: studentId,
                    module_id: moduleId
                }
            });
            
            if (!registration) {
                throw new Error(`Student ${studentId} is not registered for module ${moduleId}`);
            }
            
            // Calculate the current attendance rate (this doesn't update the database)
            const attendanceRate = await attendanceService.calculateAttendanceRate(studentId, moduleId);
            const isEligible = attendanceRate >= 80;
            
            // Find the existing exam record but don't create or update it
            const examRecord = await Exam.findOne({
                where: {
                    student_id: studentId,
                    module_id: moduleId
                }
            });
            
            return {
                attendanceRate,
                isEligible,
                // Return the existing record if found, otherwise return calculated values
                examRecord: examRecord || {
                    student_id: studentId,
                    module_id: moduleId,
                    attendance_rate: attendanceRate,
                    is_eligible: isEligible,
                    // Mark that this record hasn't been saved yet
                    _calculated: true
                }
            };
        } catch (error) {
            console.error('Error checking exam eligibility:', error);
            throw new Error('Error checking exam eligibility: ' + error.message);
        }
    },
      // Get all exam eligibility records for a module
    getExamEligibilityByModule: async (moduleId) => {
        try {
            return await Exam.findAll({
                where: {
                    module_id: moduleId
                },
                order: [
                    ['student_id', 'ASC']
                ]
            });
        } catch (error) {
            console.error('Error getting exam eligibility by module:', error);
            // Return an empty array instead of throwing to prevent crashes
            console.error(error);
            return [];
        }
    },
    
    // Get all exam eligibility records for a student
    getExamEligibilityByStudent: async (studentId) => {
        try {
            return await Exam.findAll({
                where: {
                    student_id: studentId
                },
                order: [
                    ['module_id', 'ASC']
                ]
            });
        } catch (error) {
            console.error('Error getting exam eligibility by student:', error);
            // Return an empty array instead of throwing to prevent crashes
            console.error(error);
            return [];
        }
    },    // Update exam eligibility for all students in a module
    // This is the function that should be called via admin API to explicitly update exam eligibility
    updateExamEligibilityForModule: async (moduleId) => {
        try {
            // Get all students registered for the module
            const registrations = await ModuleRegistration.findAll({
                where: {
                    module_id: moduleId
                }
            });
            
            if (registrations.length === 0) {
                throw new Error(`No students registered for module ${moduleId}`);
            }
            
            const results = [];
            
            // Calculate and update eligibility for each student
            for (const registration of registrations) {
                try {
                    // Calculate attendance rate for this student
                    const attendanceRate = await attendanceService.calculateAttendanceRate(
                        registration.student_id, 
                        moduleId
                    );
                    
                    // Determine eligibility based on 80% threshold
                    const isEligible = attendanceRate >= 80;
                    
                    // Find existing record or create a new one
                    let examRecord = await Exam.findOne({
                        where: {
                            student_id: registration.student_id,
                            module_id: moduleId
                        }
                    });
                    
                    if (examRecord) {
                        // Update existing record
                        examRecord.attendance_rate = attendanceRate;
                        examRecord.is_eligible = isEligible;
                        await examRecord.save();
                    } else {
                        // Create new record
                        examRecord = await Exam.create({
                            student_id: registration.student_id,
                            module_id: moduleId,
                            attendance_rate: attendanceRate,
                            is_eligible: isEligible
                        });
                    }
                    
                    results.push({
                        attendanceRate,
                        isEligible,
                        examRecord
                    });
                } catch (studentError) {
                    console.error(`Error processing student ${registration.student_id}:`, studentError);
                    // Add error info but continue with other students
                    results.push({
                        student_id: registration.student_id,
                        module_id: moduleId,
                        error: studentError.message
                    });
                }
            }
            
            return results;
        } catch (error) {
            console.error('Error updating exam eligibility for module:', error);
            return []; // Return empty array instead of throwing to prevent app crash
        }
    },
};

export default attendanceService;
