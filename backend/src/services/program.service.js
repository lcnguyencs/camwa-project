import Program from '../models/Program.model.js'; 

const programService = {
  createProgram: async (programData) => {
    try {
      const newProgram = await Program.create(programData);
      return newProgram;
    } catch (error) {
      throw new Error('Error creating program: ' + error.message);
    }
  },

  getAllPrograms: async () => {
    try {
      const programs = await Program.findAll();
      return programs;
    } catch (error) {
      throw new Error('Error retrieving programs: ' + error.message);
    }
  },

  findProgramById: async (program_id) => {
    try {
      const program = await Program.findOne({ where: { program_id } });
      if (!program) {
        throw new Error('Program not found');
      }
      return program;
    } catch (error) {
      throw new Error('Error finding program: ' + error.message);
    }
  },

  deleteProgram: async (program_id) => {
    try {
      const result = await Program.destroy({ where: { program_id } });
      if (result === 0) {
        throw new Error('Program not found');
      }
      return { message: 'Program deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting program: ' + error.message);
    }
  },

  updateProgram: async (program_id, updatedData) => {
    try {
      const [updated] = await Program.update(updatedData, {
        where: { program_id },
      });
      if (updated === 0) {
        throw new Error('Program not found or no changes made');
      }
      const updatedProgram = await Program.findOne({ where: { program_id } });
      return updatedProgram;
    } catch (error) {
      throw new Error('Error updating program: ' + error.message);
    }
  },
};

export default programService;
