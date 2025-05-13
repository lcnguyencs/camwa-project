import express from 'express';
import programController from '../controllers/programManagement.controller.js';
import { verifyTokenAndRole } from '../middleware/authMiddleware.js';

const programRouter = express.Router();

programRouter.post('/',verifyTokenAndRole(['Admin', 'Faculty']), programController.createProgram);
programRouter.get('/',verifyTokenAndRole(['Admin', 'Faculty']), programController.getAllPrograms);
programRouter.get('/:program_id',verifyTokenAndRole(['Admin', 'Faculty']), programController.findProgramById);
programRouter.delete('/:program_id',verifyTokenAndRole(['Admin', 'Faculty']), programController.deleteProgram);
programRouter.put('/:program_id',verifyTokenAndRole(['Admin', 'Faculty']), programController.updateProgram);
programRouter.post('/:program_id/students/:student_id',verifyTokenAndRole(['Admin', 'Faculty']), programController.assignStudentToProgram);
programRouter.post('/:program_id/lecturers/:lecturer_id',verifyTokenAndRole(['Admin', 'Faculty']), programController.assignLecturerToProgram);
programRouter.post('/:program_id/courses/:course_id',verifyTokenAndRole(['Admin', 'Faculty']), programController.assignCourseToProgram);
programRouter.get('/:program_id/courses',verifyTokenAndRole(['Admin', 'Faculty']), programController.viewCoursesInProgram);
programRouter.get('/:program_id/lecturers',verifyTokenAndRole(['Admin', 'Faculty']), programController.viewLecturersInProgram);
programRouter.get('/:program_id/students',verifyTokenAndRole(['Admin', 'Faculty']), programController.viewStudentsInProgram);

export default programRouter;
