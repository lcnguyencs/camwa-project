import express from 'express';
import attendanceRouter from './attendance.router.js';
import classRouter from './class.router.js';
import courseRouter from './course.router.js';
import notificationRouter from './notification.router.js';
import authRoutes from './authRoutes.js';

const rootRoutes = express.Router();

// Default route for the root
rootRoutes.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Auth routes
rootRoutes.use('/auth', authRoutes);

// Attendance routes
rootRoutes.use('/attendance', attendanceRouter);

// Class routes
rootRoutes.use('/class', classRouter);

// Course routes
rootRoutes.use('/course', courseRouter);

// Notification routes
rootRoutes.use('/notification', notificationRouter);

export default rootRoutes;
