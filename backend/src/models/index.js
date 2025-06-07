import Iam from './Iam.model.js';
import Student from './Student.model.js';

// Define associations
Iam.hasOne(Student, {
  foreignKey: 'acc_id',
  as: 'Student'
});

Student.belongsTo(Iam, {
  foreignKey: 'acc_id',
  as: 'Account'
});

// Export models
export {
  Iam,
  Student
}; 