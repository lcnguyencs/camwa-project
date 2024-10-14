const express = require('express');
const app = express();
const lecturerRoutes = require('./routes/lecturerRoutes');
const facultyAssistantRoutes = require('./routes/facultyAssistantRoutes');

app.use(express.json());
app.use('/api/lecturers', lecturerRoutes);
app.use('/api/facultyAssistant', facultyAssistantRoutes);

module.exports = app;
