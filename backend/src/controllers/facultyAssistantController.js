const Attendance = require('../models/attendance');

exports.updateAttendance = async (req, res) => {
  try {
    const { student_id, module_id, status } = req.body;
    const attendance = await Attendance.update(
      { status },
      { where: { student_id, module_id } }
    );
    res.json({ message: 'Attendance updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update attendance.' });
  }
};
