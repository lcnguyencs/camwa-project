import express from "express";
import authRoutes from "./authRoutes.js";
import attendanceRoutes from "./attendanceRoutes.js"; // Assuming you have attendance routes
import classRoutes from "./classRoutes.js"; // Assuming you have class routes
import courseRoutes from "./courseRoutes.js"; // Assuming you have course routes
import notificationRoutes from "./notificationRoutes.js"; // Assuming you have notification routes

// Default route for
const rootRoutes = express.Router();

// Default route for the root
rootRoutes.get(`/`, (request, response, next) => {
    response.json({ message: 'Welcome to the API' });
});

// Auth routes
rootRoutes.use("/auth", authRoutes);

// Attendance routes
rootRoutes.use("/attendance", attendanceRoutes);

// Class routes
rootRoutes.use("/class", classRoutes);

// Course routes
rootRoutes.use("/course", courseRoutes);

// Notification routes
rootRoutes.use("/notification", notificationRoutes);

export default rootRoutes;
