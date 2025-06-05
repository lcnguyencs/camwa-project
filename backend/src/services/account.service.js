import Iam from '../models/Iam.model.js';
import bcrypt from 'bcrypt';


const accountService = {
  getAllUsers: async () => {
    try {
      const users = await Iam.findAll({
        attributes: ['iam_id', 'username', 'email', 'role']
      });
      
      return users.map(user => ({
        iamId: user.iam_id,
        username: user.username,
        email: user.email,
        role: user.role
      }));
    } catch (error) {
      throw new Error('Error retrieving users: ' + error.message);
    }
  },

  getUserById: async (iamId) => {
    try {
      const user = await Iam.findByPk(iamId, {
        attributes: ['iam_id', 'username', 'email', 'role']
      });
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return {
        iamId: user.iam_id,
        username: user.username,
        email: user.email,
        role: user.role
      };
    } catch (error) {
      throw new Error('Error retrieving user: ' + error.message);
    }
  },

  createUser: async (userData) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const newUser = await Iam.create({
        iam_id: userData.iamId,
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        role: userData.role
      });
      
      return {
        iamId: newUser.iam_id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      };
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  },

  updateUser: async (iamId, userData) => {
    try {
      const updateData = {
        username: userData.username,
        email: userData.email,
        role: userData.role
      };

      if (userData.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(userData.password, salt);
      }

      const [updated] = await Iam.update(updateData, {
        where: { iam_id: iamId }
      });
      
      if (!updated) {
        throw new Error('User not found');
      }
      
      return await accountService.getUserById(iamId);
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  },

  deleteUser: async (iamId) => {
    try {
      const deleted = await Iam.destroy({
        where: { iam_id: iamId }
      });
      
      if (!deleted) {
        throw new Error('User not found');
      }
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  },
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
        
        // Skip empty rows
        if (!studentId || !email) continue;
        
        try {
          // Create student user with the same ID as username and password
          const userData = {
            iamId: studentId,
            username: studentId,
            password: studentId,
            email: email,
            role: 'STUDENT'
          };
          
          // Use the existing createUser method to create each student
          const newUser = await accountService.createUser(userData);
          results.successful.push({
            iamId: newUser.iamId,
            username: newUser.username,
            email: newUser.email
          });
        } catch (error) {
          results.failed.push({
            studentId,
            email,
            error: error.message
          });
        }
      }
      
      return results;
    } catch (error) {
      throw new Error('Error creating users from CSV: ' + error.message);
    }
  },

  createMultipleLecturersFromCSV: async (filePath) => {
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
        const lecturerId = row.getCell(1).value?.toString();
        const email = row.getCell(2).value?.toString();
        
        // Skip empty rows
        if (!lecturerId || !email) continue;
        
        try {
          // Create lecturer user with the same ID as username and password
          const userData = {
            iamId: lecturerId,
            username: lecturerId,
            password: lecturerId,
            email: email,
            role: 'LECTURER'
          };
          
          // Use the existing createUser method to create each lecturer
          const newUser = await accountService.createUser(userData);
          results.successful.push({
            iamId: newUser.iamId,
            username: newUser.username,
            email: newUser.email
          });
        } catch (error) {
          results.failed.push({
            lecturerId,
            email,
            error: error.message
          });
        }
      }
      
      return results;
    } catch (error) {
      throw new Error('Error creating lecturers from CSV: ' + error.message);
    }
  }
};

export default accountService;
