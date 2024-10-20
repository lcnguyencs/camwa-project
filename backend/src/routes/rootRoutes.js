import express from "express";
import authRoutes from "./authRoutes.js";
import attendanceManagement from "../controllers/attendanceManagement.controller.js"; 
import classManagement from "../controllers/classManagement.controller.js"; 
import courseManagement from "../controllers/courseManagement.controller.js"; 
import notificationManagement from "../controllers/notificationManagement.controller.js"; 

// Default route for
const rootRoutes = express.Router();

// Default route for the root
rootRoutes.get(`/`, (request, response, next) => {
    response.json({ message: 'Welcome to the API' });
});

// Auth routes
rootRoutes.use("/auth", authRoutes);

// Attendance routes
rootRoutes.use("/attendance", attendanceManagement);

// Class routes
rootRoutes.use("/class", classManagement);

// Course routes
rootRoutes.use("/course", courseManagement);

// Notification routes
rootRoutes.use("/notification", notificationManagement);

export default rootRoutes;
