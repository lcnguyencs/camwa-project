import Student from './Student.js';
import Program from './Program.js';
import Intake from './Intake.js';
import ProgramRegistering from './ProgramRegistering.js';
import Module from './Module.js';
import ProgramModules from './ProgramModules.js';
import Semester from './Semester.js';
import Class from './Class.js';
import Exam from './Exam.js';
import Lecturer from './Lecturer.js';
import Attendance from './Attendance.js';
import Iam from './Iam.js';
import Notification from './Notification.js';
import AttendanceRequest from './AttendanceRequest.js';
import ExamTaking from './ExamTaking.js';

// Define Associations
Program.hasMany(Student, { foreignKey: 'program_id' });
Student.belongsTo(Program, { foreignKey: 'program_id' });

Intake.hasMany(Student, { foreignKey: 'intake' });
Student.belongsTo(Intake, { foreignKey: 'intake' });

Student.hasMany(ProgramRegistering, { foreignKey: 'student_id' });
ProgramRegistering.belongsTo(Student, { foreignKey: 'student_id' });

Program.hasMany(ProgramRegistering, { foreignKey: 'program_id' });
ProgramRegistering.belongsTo(Program, { foreignKey: 'program_id' });

Module.hasMany(Exam, { foreignKey: 'module_id' });
Exam.belongsTo(Module, { foreignKey: 'module_id' });

Module.hasMany(ProgramModules, { foreignKey: 'module_id' });
ProgramModules.belongsTo(Module, { foreignKey: 'module_id' });

Semester.hasMany(ProgramModules, { foreignKey: 'sem_id' });
ProgramModules.belongsTo(Semester, { foreignKey: 'sem_id' });

Lecturer.hasMany(Class, { foreignKey: 'lecturer_id' });
Class.belongsTo(Lecturer, { foreignKey: 'lecturer_id' });

Lecturer.hasMany(Module, { foreignKey: 'lecturer_id' });
Module.belongsTo(Lecturer, { foreignKey: 'lecturer_id' });

Student.hasMany(Attendance, { foreignKey: 'student_id' });
Attendance.belongsTo(Student, { foreignKey: 'student_id' });

Module.hasMany(Attendance, { foreignKey: 'module_id' });
Attendance.belongsTo(Module, { foreignKey: 'module_id' });

Iam.hasMany(Notification, { foreignKey: 'sender_id' });
Notification.belongsTo(Iam, { foreignKey: 'sender_id' });

Student.hasMany(Notification, { foreignKey: 'receiver_id' });
Notification.belongsTo(Student, { foreignKey: 'receiver_id' });

Iam.hasMany(AttendanceRequest, { foreignKey: 'lecturer_id' });
AttendanceRequest.belongsTo(Iam, { foreignKey: 'lecturer_id' });

Student.hasMany(AttendanceRequest, { foreignKey: 'student_id' });
AttendanceRequest.belongsTo(Student, { foreignKey: 'student_id' });

Student.hasMany(ExamTaking, { foreignKey: 'student_id' });
ExamTaking.belongsTo(Student, { foreignKey: 'student_id' });

Module.hasMany(ExamTaking, { foreignKey: 'module_id' });
ExamTaking.belongsTo(Module, { foreignKey: 'module_id' });

export {
  Student,
  Program,
  Intake,
  ProgramRegistering,
  Module,
  ProgramModules,
  Semester,
  Class,
  Exam,
  Lecturer,
  Attendance,
  Iam,
  Notification,
  AttendanceRequest,
  ExamTaking,
};
