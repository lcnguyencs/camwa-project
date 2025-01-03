import express from 'express';
import programController from '../controllers/programManagement.controller.js';

const programRouter = express.Router();

programRouter.post('/', programController.createProgram);
programRouter.get('/', programController.getAllPrograms);
programRouter.get('/:program_id', programController.findProgramById);
programRouter.delete('/:program_id', programController.deleteProgram);
programRouter.put('/:program_id', programController.updateProgram);
programRouter.post('/:program_id/students/:student_id', programController.assignStudentToProgram);
programRouter.post('/:program_id/lecturers/:lecturer_id', programController.assignLecturerToProgram);
programRouter.post('/:program_id/courses/:course_id', programController.assignCourseToProgram);
programRouter.get('/:program_id/courses', programController.viewCoursesInProgram);
programRouter.get('/:program_id/lecturers', programController.viewLecturersInProgram);
programRouter.get('/:program_id/students', programController.viewStudentsInProgram);

export default programRouter;
