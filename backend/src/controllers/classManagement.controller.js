import classService from "../services/class.service.js";

const classManagement = {
    // Create Class
    createClass: async (req, res, next) => {
        try {
            const classData = req.body;
            const result = await classService.createClass(classData);
            res.status(201).json({ message: 'Class created successfully', data: result });
        } catch (error) {
            next(error);
        }
    },

    // View Classes (List all classes for a course)
    viewClasses: async (req, res, next) => {
        try {
            const courseId = req.params.courseId;
            const result = await classService.viewClasses(courseId);
            res.status(200).json({ message: 'Classes retrieved successfully', data: result });
        } catch (error) {
            next(error);
        }
    },

    // Update Class
    updateClass: async (req, res, next) => {
        try {
            const classId = req.params.classId;
            const updatedData = req.body;
            const result = await classService.updateClass(classId, updatedData);
            res.status(200).json({ message: 'Class updated successfully', data: result });
        } catch (error) {
            next(error);
        }
    },

    // Delete Class
    deleteClass: async (req, res, next) => {
        try {
            const classId = req.params.classId;
            await classService.deleteClass(classId);
            res.status(200).json({ message: 'Class deleted successfully' });
        } catch (error) {
            next(error);
        }
    },
};

export default classManagement;
