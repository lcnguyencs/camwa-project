import Program from '../models/Program.model.js'; 
import Student from '../models/Student.model.js';
import Lecturer from '../models/Lecturer.model.js';
import Course from '../models/Course.model.js';

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

  // Assign a student to a program
  assignStudentToProgram: async (program_id, student_id) => {
    try {
      const program = await Program.findByPk(program_id);
      const student = await Student.findByPk(student_id);
      if (!program || !student) {
        throw new Error('Program or Student not found');
      }
      await program.addStudent(student); 
      return { message: 'Student assigned to program successfully' };
    } catch (error) {
      throw new Error('Error assigning student to program: ' + error.message);
    }
  },

  // Assign a lecturer to a program
  assignLecturerToProgram: async (program_id, lecturer_id) => {
    try {
      const program = await Program.findByPk(program_id);
      const lecturer = await Lecturer.findByPk(lecturer_id);
      if (!program || !lecturer) {
        throw new Error('Program or Lecturer not found');
      }
      await program.addLecturer(lecturer); 
      return { message: 'Lecturer assigned to program successfully' };
    } catch (error) {
      throw new Error('Error assigning lecturer to program: ' + error.message);
    }
  },

  // Assign a course to a program
  assignCourseToProgram: async (program_id, course_id) => {
    try {
      const program = await Program.findByPk(program_id);
      const course = await Course.findByPk(course_id);
      if (!program || !course) {
        throw new Error('Program or Course not found');
      }
      await program.addCourse(course);
      return { message: 'Course assigned to program successfully' };
    } catch (error) {
      throw new Error('Error assigning course to program: ' + error.message);
    }
  },

  // View courses in a program
  viewCoursesInProgram: async (program_id) => {
    try {
      const program = await Program.findByPk(program_id, {
        include: Course 
      });
      if (!program) {
        throw new Error('Program not found');
      }
      return program.Courses; 
    } catch (error) {
      throw new Error('Error retrieving courses in program: ' + error.message);
    }
  },

  // View lecturers in a program
  viewLecturersInProgram: async (program_id) => {
    try {
      const program = await Program.findByPk(program_id, {
        include: Lecturer 
      });
      if (!program) {
        throw new Error('Program not found');
      }
      return program.Lecturers; 
    } catch (error) {
      throw new Error('Error retrieving lecturers in program: ' + error.message);
    }
  },

  // View students in a program
  viewStudentsInProgram: async (program_id) => {
    try {
      const program = await Program.findByPk(program_id, {
        include: Student 
      });
      if (!program) {
        throw new Error('Program not found');
      }
      return program.Students;
    } catch (error) {
      throw new Error('Error retrieving students in program: ' + error.message);
    }
  },
};

export default programService;
