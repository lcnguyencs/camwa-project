import Student from '../models/Student.model.js'; // Adjust the import path as needed

const studentService = {
  // Create a new student
  createStudent: async (studentData) => {
    try {
      const newStudent = await Student.create(studentData);
      return newStudent;
    } catch (error) {
      throw new Error('Error creating student: ' + error.message);
    }
  },

  // View all students
  getAllStudents: async () => {
    try {
      const students = await Student.findAll();
      return students;
    } catch (error) {
      throw new Error('Error retrieving students: ' + error.message);
    }
  },

  // Find a student by student_id
  findStudentById: async (student_id) => {
    try {
      const student = await Student.findOne({ where: { student_id } });
      if (!student) {
        throw new Error('Student not found');
      }
      return student;
    } catch (error) {
      throw new Error('Error finding student: ' + error.message);
    }
  },

  // Delete a student by student_id
  deleteStudent: async (student_id) => {
    try {
      const result = await Student.destroy({ where: { student_id } });
      if (result === 0) {
        throw new Error('Student not found');
      }
      return { message: 'Student deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting student: ' + error.message);
    }
  },

  // Update a student by student_id
  updateStudent: async (student_id, updatedData) => {
    try {
      const [updated] = await Student.update(updatedData, {
        where: { student_id },
      });
      if (updated === 0) {
        throw new Error('Student not found or no changes made');
      }
      const updatedStudent = await Student.findOne({ where: { student_id } });
      return updatedStudent;
    } catch (error) {
      throw new Error('Error updating student: ' + error.message);
    }
  },

  // Create multiple students from CSV file
  createMultipleStudentsFromCSV: async (filePath) => {
    try {
      const fs = await import('fs/promises');
      
      // Check if file exists before attempting to read
      try {
        await fs.access(filePath);
        console.log(`CSV file exists at: ${filePath}`);
      } catch (fileError) {
        throw new Error(`File not found: ${filePath}`);
      }
      
      const Excel = (await import('exceljs')).default;
      const workbook = new Excel.Workbook();
      
      console.log(`Attempting to read CSV from: ${filePath}`);
      
      // Parse the CSV file
      await workbook.csv.readFile(filePath);
      const worksheet = workbook.worksheets[0];
      
      console.log(`CSV loaded successfully with ${worksheet.rowCount} rows`);
      
      const results = {
        successful: [],
        failed: []
      };
      
      // Skip the header row and process each row
      for (let i = 2; i <= worksheet.rowCount; i++) {
        const row = worksheet.getRow(i);
        const studentId = row.getCell(1).value?.toString();
        const email = row.getCell(2).value?.toString();
        const intake = row.getCell(3).value?.toString();
        const programId = row.getCell(4).value?.toString();
        const name = row.getCell(5).value?.toString();
        const mapLocation = row.getCell(6).value?.toString();
        
        // Skip empty rows
        if (!studentId || !name) continue;
        
        try {
          // Create student record
          const studentData = {
            student_id: studentId,
            name: name,
            map_location: mapLocation || '',
            program_id: programId,
            intake: parseInt(intake)
          };
          
          // Use the existing createStudent method to create each student record
          const newStudent = await studentService.createStudent(studentData);
          results.successful.push({
            studentId: newStudent.student_id,
            name: newStudent.name,
            programId: newStudent.program_id,
            intake: newStudent.intake
          });
        } catch (error) {
          results.failed.push({
            studentId,
            name,
            error: error.message
          });
        }
      }
      
      return results;
    } catch (error) {
      throw new Error('Error creating students from CSV: ' + error.message);
    }
  }
};

export default studentService;