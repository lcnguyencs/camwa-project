import Class from '../models/Class.model.js';

const classService = {
    // Create a new class
    createClass: async (classData) => {
        return await Class.create(classData);
    },

    // View classes by module
    viewClassesByModule: async (moduleId) => {
        return await Class.findAll({ where: { module_id: moduleId } });
    },

    // View classes by lecturer
    viewClassesByLecturer: async (lecturerId) => {
        return await Class.findAll({ where: { lecturer_id: lecturerId } });
    },

    // Update a class by class_id
    updateClass: async (classId, updatedData) => {
        return await Class.update(updatedData, { where: { class_id: classId } });
    },

    // Delete a class by class_id
    deleteClass: async (classId) => {
        return await Class.destroy({ where: { class_id: classId } });
    },

    // View all classes
    viewAllClasses: async () => {
        return await Class.findAll();
    }
};

export default classService;
