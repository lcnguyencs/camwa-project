const Attendance = require('../models/attendance');

exports.viewAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findAll({
      where: { module_id: req.params.moduleId },
    });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve attendance records.' });
  }
};
