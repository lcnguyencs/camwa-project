import express from 'express';
import attendanceController from '../controllers/attendanceManagement.controller.js';

const attendanceRouter = express.Router();

attendanceRouter.post('/create', attendanceController.createAttendance);
attendanceRouter.get('/:classId', attendanceController.viewAttendance);
attendanceRouter.put('/:attendanceId', attendanceController.updateAttendance);
attendanceRouter.delete('/:attendanceId', attendanceController.deleteAttendance);

export default attendanceRouter;
