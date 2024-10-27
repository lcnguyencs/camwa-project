import Class from '../models/Class.model.js';
import Lecturer from '../models/Lecturer.model.js';
import Attendance from '../models/Attendance.model.js'; 
import NotificationService from '../services/notification.service.js'; 
import Student from '../models/Student.model.js';

const classService = {
    // Create a new class (Faculty Assistant)
    createClass: async (classData) => {
        const newClass = await Class.create(classData);
        // Notify students and lecturer about the new class
        await NotificationService.sendClassCreationNotification(newClass);
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
        const result = await Class.update(updatedData, { where: { class_id: classId } });
        if (result[0] > 0) {
            // Notify students and lecturer about the class update
            await NotificationService.sendClassUpdateNotification(classId);
        }
        return result;
    },

    // Deletes a class by class_id (Faculty Assistant)
    deleteClass: async (classId) => {
        const result = await Class.destroy({ where: { class_id: classId } });
        if (result > 0) {
            // Notify students and lecturer about the class deletion
            await NotificationService.sendClassDeletionNotification(classId);
        }
        return result;
    },

    // Lecturer views student attendance for a class
    viewStudentAttendance: async (classId) => {
        const attendance = await Attendance.findAll({ where: { class_id: classId } });
        if (!attendance) {
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
