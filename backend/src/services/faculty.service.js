import FacilityFaculty from '../models/FacilityFaculty.model.js';

const facilityFacultyService = {
  createFacilityFaculty: async (facilityFacultyData) => {
    try {
      const newFacilityFaculty = await FacilityFaculty.create(facilityFacultyData);
      return newFacilityFaculty;
    } catch (error) {
      throw new Error('Error creating facility faculty: ' + error.message);
    }
  },

  getAllFacilityFaculties: async () => {
    try {
      const facilityFaculties = await FacilityFaculty.findAll();
      return facilityFaculties;
    } catch (error) {
      throw new Error('Error retrieving facility faculties: ' + error.message);
    }
  },

  findFacilityFacultyById: async (staff_id) => {
    try {
      const facilityFaculty = await FacilityFaculty.findOne({ where: { staff_id } });
      if (!facilityFaculty) {
        throw new Error('Facility Faculty not found');
      }
      return facilityFaculty;
    } catch (error) {
      throw new Error('Error finding facility faculty: ' + error.message);
    }
  },

  deleteFacilityFaculty: async (staff_id) => {
    try {
      const result = await FacilityFaculty.destroy({ where: { staff_id } });
      if (result === 0) {
        throw new Error('Facility Faculty not found');
      }
      return { message: 'Facility Faculty deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting facility faculty: ' + error.message);
    }
  },

  updateFacilityFaculty: async (staff_id, updatedData) => {
    try {
      const [updated] = await FacilityFaculty.update(updatedData, {
        where: { staff_id },
      });
      if (updated === 0) {
        throw new Error('Facility Faculty not found or no changes made');
      }
      const updatedFacilityFaculty = await FacilityFaculty.findOne({ where: { staff_id } });
      return updatedFacilityFaculty;
    } catch (error) {
      throw new Error('Error updating facility faculty: ' + error.message);
    }
  },
};

export default facilityFacultyService;
