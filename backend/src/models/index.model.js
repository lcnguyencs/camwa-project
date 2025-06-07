import Student from './Student.model.js';
import Program from './Program.model.js';
import Intake from './Intake.model.js';
import ProgramRegistering from './ProgramRegistering.model.js';
import IntakeModules from './IntakeModules.model.js'; 
import Semester from './Semester.model.js';
import Class from './Class.model.js';
import Exam from './Exam.model.js';
import Lecturer from './Lecturer.model.js';
import Attendance from './Attendance.model.js';
import Iam from './Iam.model.js';
import Notification from './Notification.model.js';
import AttendanceRequest from './AttendanceRequest.model.js';
import ExamTaking from './ExamTaking.model.js';
import Course from './Course.model.js';
import StudentIntakeModule from './StudentIntakeModule.model.js';

// Define Associations

// 1. Program and Student Relationship (Many Students belong to one Program)
Program.hasMany(Student, { foreignKey: 'program_id' });
Student.belongsTo(Program, { foreignKey: 'program_id' });

// 2. Intake and Student Relationship (Many Students belong to one Intake)
Intake.hasMany(Student, { foreignKey: 'intake' });
Student.belongsTo(Intake, { foreignKey: 'intake' });

// 3. Program and ProgramRegistering Relationship
Program.hasMany(ProgramRegistering, { foreignKey: 'program_id' });
ProgramRegistering.belongsTo(Program, { foreignKey: 'program_id' });

// 4. Course and IntakeModule Relationship (A Course has many IntakeModules)
Course.hasMany(IntakeModules, { foreignKey: 'course_id' });
IntakeModules.belongsTo(Course, { foreignKey: 'course_id' });

// 5. Intake and IntakeModule Relationship (An Intake has many IntakeModules)
Intake.hasMany(IntakeModules, { foreignKey: 'intake' });
IntakeModules.belongsTo(Intake, { foreignKey: 'intake' });

// 6. Semester and IntakeModule Relationship (A Semester has many IntakeModules)
Semester.hasMany(IntakeModules, { foreignKey: 'semester_id' });
IntakeModules.belongsTo(Semester, { foreignKey: 'semester_id' });

// 7. Lecturer and IntakeModule Relationship (A Lecturer has many IntakeModules)
Lecturer.hasMany(IntakeModules, { foreignKey: 'lecturer_id' });
IntakeModules.belongsTo(Lecturer, { foreignKey: 'lecturer_id' });

// 8. Student and Attendance Relationship (A Student has many Attendance records)
Student.hasMany(Attendance, { foreignKey: 'student_id' });
Attendance.belongsTo(Student, { foreignKey: 'student_id' });

// 9. Student and ExamTaking Relationship (A Student has many ExamTaking records)
Student.hasMany(ExamTaking, { foreignKey: 'student_id' });
ExamTaking.belongsTo(Student, { foreignKey: 'student_id' });

// 10. IntakeModule and Attendance Relationship (An IntakeModule has many Attendance records)
IntakeModules.hasMany(Attendance, { foreignKey: 'intake_module_id' });
Attendance.belongsTo(IntakeModules, { foreignKey: 'intake_module_id' });

// 11. IntakeModule and Exam Relationship (An IntakeModule has many Exams)
IntakeModules.hasMany(Exam, { foreignKey: 'intake_module_id' });
Exam.belongsTo(IntakeModules, { foreignKey: 'intake_module_id' });

// 12. IntakeModule and ExamTaking Relationship (An IntakeModule has many ExamTaking records)
IntakeModules.hasMany(ExamTaking, { foreignKey: 'intake_module_id' });
ExamTaking.belongsTo(IntakeModules, { foreignKey: 'intake_module_id' });

// 13. IntakeModules and Class Relationship (An IntakeModule has many Classes)
IntakeModules.hasMany(Class, { foreignKey: 'intake_module_id' });
Class.belongsTo(IntakeModules, { foreignKey: 'intake_module_id' });

// 14. Student and AttendanceRequest Relationship (A Student has many AttendanceRequests)
Student.hasMany(AttendanceRequest, { foreignKey: 'student_id' });
AttendanceRequest.belongsTo(Student, { foreignKey: 'student_id' });

// 15. Class and AttendanceRequest Relationship (A Class has many AttendanceRequests)
Class.hasMany(AttendanceRequest, { foreignKey: 'class_id' });
AttendanceRequest.belongsTo(Class, { foreignKey: 'class_id' });

// 16. Student and Notification Relationship (A Student has many Notifications)
Student.hasMany(Notification, { foreignKey: 'student_id' });
Notification.belongsTo(Student, { foreignKey: 'student_id' });

// 17. Lecturer and Notification Relationship (A Lecturer has many Notifications)
Lecturer.hasMany(Notification, { foreignKey: 'lecturer_id' });
Notification.belongsTo(Lecturer, { foreignKey: 'lecturer_id' });

// 18. Class and Notification Relationship (A Class has many Notifications)
Class.hasMany(Notification, { foreignKey: 'class_id' });
Notification.belongsTo(Class, { foreignKey: 'class_id' });

// 19. IntakeModule and Student (Many-to-Many through StudentIntakeModule)
IntakeModules.belongsToMany(Student, {
  through: StudentIntakeModule,
  foreignKey: 'intake_module_id',
  otherKey: 'student_id',
  as: 'students'
});

Student.belongsToMany(IntakeModules, {
  through: StudentIntakeModule,
  foreignKey: 'student_id',
  otherKey: 'intake_module_id',
  as: 'intakeModules'
});

// 20. Iam and Notification Relationship (An Iam entity sends many Notifications)
Iam.hasMany(Notification, { foreignKey: 'sender_id' });
Notification.belongsTo(Iam, { foreignKey: 'sender_id' });

// 21. Iam and AttendanceRequest Relationship (An Iam entity processes many Attendance Requests)
Iam.hasMany(AttendanceRequest, { foreignKey: 'lecturer_id' });
AttendanceRequest.belongsTo(Iam, { foreignKey: 'lecturer_id' });

// 22. Iam and Student (One-to-One) - Represents student's account
Student.belongsTo(Iam, { foreignKey: 'acc_id', as: 'Account' });
Iam.hasOne(Student, { foreignKey: 'acc_id', as: 'Student' });

// Program and IntakeModule Relationship (A Program has many IntakeModules)
Program.hasMany(IntakeModules, { foreignKey: 'program_id' });
IntakeModules.belongsTo(Program, { foreignKey: 'program_id' });

// Semester and IntakeModule Relationship (A Semester has many IntakeModules)
Semester.hasMany(IntakeModules, { foreignKey: 'semester_id' });
IntakeModules.belongsTo(Semester, { foreignKey: 'sem_id' });

export {
  Student,
  Program,
  Intake,
  ProgramRegistering,
  IntakeModules,
  Semester,
  Class,
  Exam,
  Lecturer,
  Attendance,
  Iam,
  Notification,
  AttendanceRequest,
  ExamTaking,
  Course,
  StudentIntakeModule
};
