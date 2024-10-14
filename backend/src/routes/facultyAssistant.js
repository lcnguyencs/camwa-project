const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.put(
  '/attendance',
  jwtMiddleware,
  roleMiddleware(['facultyAssistant']),
  adminController.updateAttendance
);

module.exports = router;
