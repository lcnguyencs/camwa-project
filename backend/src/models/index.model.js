import Student from './Student.js';
import Program from './Program.js';
import Intake from './Intake.js';
import ProgramRegistering from './ProgramRegistering.js';
import IntakeModule from './IntakeModule.model.js'; // Changed from CourseModules
import Semester from './Semester.js';
import Class from './Class.js';
import Exam from './Exam.js';
import Lecturer from './Lecturer.js';
import Attendance from './Attendance.js';
import Iam from './Iam.js';
import Notification from './Notification.js';
import AttendanceRequest from './AttendanceRequest.js';
import ExamTaking from './ExamTaking.js';
import Course from './Course.js';

// Define Associations

// A Program contains many Students (correct)
Program.hasMany(Student, { foreignKey: 'program_id' });
Student.belongsTo(Program, { foreignKey: 'program_id' });

// An Intake (year) contains many Students (correct)
Intake.hasMany(Student, { foreignKey: 'intake' });
Student.belongsTo(Intake, { foreignKey: 'intake' });

// A Program has many Courses (One-to-Many relationship)
Program.hasMany(Course, { foreignKey: 'program_id' });
Course.belongsTo(Program, { foreignKey: 'program_id' });

// A Course has many IntakeModules
Course.hasMany(IntakeModule, { foreignKey: 'course_id' });
IntakeModule.belongsTo(Course, { foreignKey: 'course_id' });

// An IntakeModule is associated with one Intake
IntakeModule.belongsTo(Intake, { foreignKey: 'intake_id' });
Intake.hasMany(IntakeModule, { foreignKey: 'intake_id' });

// A Semester has many IntakeModules
Semester.hasMany(IntakeModule, { foreignKey: 'sem_id' });
IntakeModule.belongsTo(Semester, { foreignKey: 'sem_id' });

// A Lecturer teaches many IntakeModules
Lecturer.hasMany(IntakeModule, { foreignKey: 'lecturer_id' });
IntakeModule.belongsTo(Lecturer, { foreignKey: 'lecturer_id' });

// A Lecturer teaches many Classes
Lecturer.hasMany(Class, { foreignKey: 'lecturer_id' });
Class.belongsTo(Lecturer, { foreignKey: 'lecturer_id' });

// A Lecturer teaches many Modules
Lecturer.hasMany(Module, { foreignKey: 'lecturer_id' });
Module.belongsTo(Lecturer, { foreignKey: 'lecturer_id' });

// A Student has many Attendance records (track the student's attendance)
Student.hasMany(Attendance, { foreignKey: 'student_id' });
Attendance.belongsTo(Student, { foreignKey: 'student_id' });

// An IntakeModule has many Attendance records (track attendance for the module's classes)
IntakeModule.hasMany(Attendance, { foreignKey: 'intake_module_id' });
Attendance.belongsTo(IntakeModule, { foreignKey: 'intake_module_id' });

// A Student takes many Exams (ExamTaking tracks the student's exam participation)
Student.hasMany(ExamTaking, { foreignKey: 'student_id' });
ExamTaking.belongsTo(Student, { foreignKey: 'student_id' });

// An IntakeModule has many ExamTaking records (track the students taking the module's exams)
IntakeModule.hasMany(ExamTaking, { foreignKey: 'intake_module_id' });
ExamTaking.belongsTo(IntakeModule, { foreignKey: 'intake_module_id' });

// An IntakeModule has many Classes (e.g., 15 classes per module)
IntakeModule.hasMany(Class, { foreignKey: 'intake_module_id' });
Class.belongsTo(IntakeModule, { foreignKey: 'intake_module_id' });

// An Iam (identity/account) sends many Notifications
Iam.hasMany(Notification, { foreignKey: 'sender_id' });
Notification.belongsTo(Iam, { foreignKey: 'sender_id' });

// A Student receives many Notifications
Student.hasMany(Notification, { foreignKey: 'receiver_id' });
Notification.belongsTo(Student, { foreignKey: 'receiver_id' });

// An Iam processes many Attendance Requests
Iam.hasMany(AttendanceRequest, { foreignKey: 'lecturer_id' });
AttendanceRequest.belongsTo(Iam, { foreignKey: 'lecturer_id' });

// A Student makes many Attendance Requests
Student.hasMany(AttendanceRequest, { foreignKey: 'student_id' });
AttendanceRequest.belongsTo(Student, { foreignKey: 'student_id' });


export {
  Student,
  Program,
  Intake,
  ProgramRegistering,
  IntakeModule,
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
};
