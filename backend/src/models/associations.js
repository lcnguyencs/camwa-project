import Iam from './Iam.model.js';
import Student from './Student.model.js';

// Define the association between Iam and Student
Iam.hasOne(Student, {
  foreignKey: 'acc_id',
  as: 'Student'
});

Student.belongsTo(Iam, {
  foreignKey: 'acc_id',
  as: 'Account'
});

// Export the models with their associations
export { Iam, Student };

// Initialize associations
export const initializeAssociations = () => {
  // The associations are already defined above
  console.log('Model associations initialized');
}; 