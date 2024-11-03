import Class from '../models/Class.model.js';
import Lecturer from '../models/Lecturer.model.js';
import Attendance from '../models/Attendance.model.js';
import NotificationService from '../services/notification.service.js';
import Student from '../models/Student.model.js';
import sequelize from '../common/sequelize/connect.sequelize.js'; // Import sequelize for Op

const { Op } = sequelize;

const classService = {
    // Check for scheduling conflicts
    checkScheduleConflict: async (classData) => {
        const conflict = await Class.findOne({
            where: {
                class_date: classData.class_date,
                intake_module_id: classData.intake_module_id,
                [Op.or]: [
                    {
                        start_time: { [Op.between]: [classData.start_time, classData.end_time] },
                    },
                    {
                        end_time: { [Op.between]: [classData.start_time, classData.end_time] },
                    },
                    {
                        start_time: { [Op.lte]: classData.start_time },
                        end_time: { [Op.gte]: classData.end_time },
                    },
                ],
            },
        });
        return !!conflict; // Return true if a conflict is found
    },

    // Create a new class (Admin)
    createClass: async (classData) => {
        const conflictExists = await classService.checkScheduleConflict(classData); // Corrected to use classData
        if (conflictExists) {
            throw new Error('Schedule conflict detected');
        }
        
        const newClass = await Class.create(classData);
        
        // Notify students and lecturer about the new class
        try {
            await NotificationService.sendClassCreationNotification(newClass);
        } catch (notificationError) {
            console.error('Failed to send class creation notification:', notificationError);
        }

        return newClass;
    },

    // View all classes (Admin/Faculty Assistant)
    viewClasses: async () => {
        return await Class.findAll();
    },

    // View classes by lecturer (Lecturer/Admin/Faculty Assistant)
    viewClassesByLecturer: async (lecturerId) => {
        return await Class.findAll({ where: { lecturer_id: lecturerId } });
    },

    // View classes by module (Admin/Faculty Assistant)
    viewClassesByIntakeModule: async (intakeModuleId) => {
        return await Class.findAll({ where: { intake_module_id: intakeModuleId } });
    },

    // Assign lecturer to a class (Admin/Faculty Assistant)
    assignLecturerToClass: async (classId, lecturerId) => {
        const lecturer = await Lecturer.findByPk(lecturerId);
        if (!lecturer) {
            throw new Error('Lecturer not found');
        }
        return await Class.update({ lecturer_id: lecturerId }, { where: { class_id: classId } });
    },

    // Assign students to a class (Admin/Faculty Assistant)
    assignStudentsToClass: async (classId, studentIds) => {
        const students = await Student.findAll({ where: { student_id: studentIds } });
        if (students.length !== studentIds.length) {
            throw new Error('Some students not found');
        }
        const classEntity = await Class.findByPk(classId);
        if (!classEntity) {
            throw new Error('Class not found');
        }
        await classEntity.addStudents(students);
        return classEntity;
    },

    // Updates a class by class_id (Admin/Faculty Assistant)
    updateClass: async (classId, updatedData) => {
        const conflictExists = await classService.checkScheduleConflict(updatedData);
        if (conflictExists) {
            throw new Error('Schedule conflict detected');
        }

        const result = await Class.update(updatedData, { where: { class_id: classId } });
        if (result[0] > 0) {
            // Notify students and lecturer about the class update
            try {
                await NotificationService.sendClassUpdateNotification(classId);
            } catch (notificationError) {
                console.error('Failed to send class update notification:', notificationError);
            }
        }
        return result;
    },

    // Deletes a class by class_id (Admin)
    deleteClass: async (classId) => {
        const hasDependencies = await classService.checkDependencies(classId);
        if (hasDependencies) {
            throw new Error('Cannot delete class with existing dependencies');
        }

        const result = await Class.destroy({ where: { class_id: classId } });
        if (result > 0) {
            // Notify students and lecturer about the class deletion
            try {
                await NotificationService.sendClassDeletionNotification(classId);
            } catch (notificationError) {
                console.error('Failed to send class deletion notification:', notificationError);
            }
        }
        return result;
    },

    // Check for dependencies before deletion
    checkDependencies: async (classId) => {
        const attendanceRecords = await Attendance.findAll({ where: { class_id: classId } });
        return attendanceRecords.length > 0; // Return true if dependencies are found
    },

    // Lecturer views student attendance for a class
    viewStudentAttendance: async (classId) => {
        const attendance = await Attendance.findAll({ where: { class_id: classId } });
        if (attendance.length === 0) {
            throw new Error('No attendance data found for this class');
        }
        return attendance;
    },

    // Lecturer views student's attendance rate for the module
    viewStudentAttendanceRate: async (moduleId) => {
        const attendances = await Attendance.findAll({ where: { module_id: moduleId } });

        if (!attendances || attendances.length === 0) {
            throw new Error('No attendance data found for this module');
        }

        const totalClasses = attendances.length;
        const attendedClasses = attendances.filter(a => a.status === 'present').length;

        // Calculate attendance rate
        const attendanceRate = (attendedClasses / totalClasses) * 100;
        return attendanceRate;
    },
};

export default classService;
