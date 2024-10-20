import express from 'express';
import authRouter from './authRoutes.js';
import attendanceRouter from './attendance.router.js';
import classRouter from './class.router.js';
import courseRouter from './course.router.js';
import notificationRouter from './notification.router.js';

const rootRoutes = express.Router();

// Default route for the root
rootRoutes.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Auth routes
rootRoutes.use('/auth', authRouter);

// Attendance routes
rootRoutes.use('/attendance', attendanceRouter);

// Class routes
rootRoutes.use('/class', classRouter);

// Course routes
rootRoutes.use('/course', courseRouter);

// Notification routes
rootRoutes.use('/notification', notificationRouter);

export default rootRoutes;
