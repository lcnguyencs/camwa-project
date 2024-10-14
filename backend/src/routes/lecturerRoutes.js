const express = require('express');
const router = express.Router();
const lecturerController = require('../controllers/lecturerController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get(
  '/attendance/:moduleId',
  jwtMiddleware,
  roleMiddleware(['lecturer']),
  lecturerController.viewAttendance
);

module.exports = router;
