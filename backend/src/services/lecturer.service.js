import Lecturer from '../models/Lecturer.model.js'; 

const lecturerService = {
  createLecturer: async (lecturerData) => {
    try {
      const newLecturer = await Lecturer.create(lecturerData);
      return newLecturer;
    } catch (error) {
      throw new Error('Error creating lecturer: ' + error.message);
    }
  },

  getAllLecturers: async () => {
    try {
      const lecturers = await Lecturer.findAll();
      return lecturers;
    } catch (error) {
      throw new Error('Error retrieving lecturers: ' + error.message);
    }
  },
  findLecturerById: async (lecturer_id) => {
    try {
      const lecturer = await Lecturer.findOne({ where: { lecturer_id } });
      if (!lecturer) {
        throw new Error('Lecturer not found');
      }
      return lecturer;
    } catch (error) {
      throw new Error('Error finding lecturer: ' + error.message);
    }
  },
  deleteLecturer: async (lecturer_id) => {
    try {
      const result = await Lecturer.destroy({ where: { lecturer_id } });
      if (result === 0) {
        throw new Error('Lecturer not found');
      }
      return { message: 'Lecturer deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting lecturer: ' + error.message);
    }
  },
  updateLecturer: async (lecturer_id, updatedData) => {
    try {
      const [updated] = await Lecturer.update(updatedData, {
        where: { lecturer_id },
      });
      if (updated === 0) {
        throw new Error('Lecturer not found or no changes made');
      }
      const updatedLecturer = await Lecturer.findOne({ where: { lecturer_id } });
      return updatedLecturer;
    } catch (error) {
      throw new Error('Error updating lecturer: ' + error.message);
    }
  },
};

export default lecturerService;
