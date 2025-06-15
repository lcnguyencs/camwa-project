import moduleRegistrationService from '../services/moduleRegistration.service.js';

const moduleRegistrationController = {
  // Create a new module registration
  createRegistration: async (req, res) => {
    try {
      const registrationData = req.body;
      const newRegistration = await moduleRegistrationService.createRegistration(registrationData);
      res.status(201).json({
        success: true,
        message: 'Module registration created successfully',
        data: newRegistration
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get all registrations
  getAllRegistrations: async (req, res) => {
    try {
      const registrations = await moduleRegistrationService.getAllRegistrations();
      res.status(200).json({
        success: true,
        data: registrations
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get registration by ID
  getRegistrationById: async (req, res) => {
    try {
      const { id } = req.params;
      const registration = await moduleRegistrationService.findRegistrationById(parseInt(id, 10));
      res.status(200).json({
        success: true,
        data: registration
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get registrations by student ID
  getRegistrationsByStudentId: async (req, res) => {
    try {
      const { student_id } = req.params;
      const registrations = await moduleRegistrationService.findRegistrationsByStudentId(student_id);
      res.status(200).json({
        success: true,
        data: registrations
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get registrations by module ID
  getRegistrationsByModuleId: async (req, res) => {
    try {
      const { module_id } = req.params;
      const registrations = await moduleRegistrationService.findRegistrationsByModuleId(module_id);
      res.status(200).json({
        success: true,
        data: registrations
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Update a registration
  updateRegistration: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedRegistration = await moduleRegistrationService.updateRegistration(parseInt(id, 10), updatedData);
      res.status(200).json({
        success: true,
        message: 'Module registration updated successfully',
        data: updatedRegistration
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Delete a registration
  deleteRegistration: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await moduleRegistrationService.deleteRegistration(parseInt(id, 10));
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Create registrations from CSV file (Faculty Assistant only)
  createRegistrationsFromCSV: async (req, res) => {
    try {
      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No CSV file uploaded. Make sure to include a file field with your CSV file.'
        });
      }

      console.log('File uploaded:', req.file);
      console.log('File path:', req.file.path);
      
      // Process the CSV file and create registrations
      const results = await moduleRegistrationService.createRegistrationsFromCSV(req.file.path);
      
      res.status(201).json({
        success: true,
        message: `Created ${results.successful.length} registrations successfully. ${results.failed.length} failed.`,
        data: results
      });
    } catch (error) {
      console.error('Error processing CSV:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

export default moduleRegistrationController;
