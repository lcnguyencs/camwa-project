import Student from './Student.js';
import Program from './Program.js';
import Intake from './Intake.js';
import ProgramRegistering from './ProgramRegistering.js';
import Module from './Module.js';
import CourseModules from './CourseModules.model.js'; // Changed from ProgramModules
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

// A Program contains many Students (correct)
Program.hasMany(Student, { foreignKey: 'program_id' });
// Each Student belongs to one Program (correct)
Student.belongsTo(Program, { foreignKey: 'program_id' });

// An Intake (year) contains many Students (correct)
Intake.hasMany(Student, { foreignKey: 'intake' });
// Each Student belongs to one Intake (year) (correct)
Student.belongsTo(Intake, { foreignKey: 'intake' });

// A Program has many Students (One-to-Many relationship)
Program.hasMany(Student, { foreignKey: 'program_id' });
// Each Student belongs to one Program
Student.belongsTo(Program, { foreignKey: 'program_id' });

// A Module has many Exams
Module.hasMany(Exam, { foreignKey: 'module_id' });
// Each Exam belongs to one Module
Exam.belongsTo(Module, { foreignKey: 'module_id' });

// A Semester contains many Modules through CourseModules (modules tied to a course and semester)
Semester.hasMany(CourseModules, { foreignKey: 'sem_id' });
// Each CourseModule belongs to one Semester
CourseModules.belongsTo(Semester, { foreignKey: 'sem_id' });

// A Lecturer teaches many Classes
Lecturer.hasMany(Class, { foreignKey: 'lecturer_id' });
// Each Class is taught by one Lecturer
Class.belongsTo(Lecturer, { foreignKey: 'lecturer_id' });

// A Lecturer teaches many Modules
Lecturer.hasMany(Module, { foreignKey: 'lecturer_id' });
// Each Module is taught by one Lecturer
Module.belongsTo(Lecturer, { foreignKey: 'lecturer_id' });

// A Student has many Attendance records (track the student's attendance)
Student.hasMany(Attendance, { foreignKey: 'student_id' });
// Each Attendance record belongs to one Student
Attendance.belongsTo(Student, { foreignKey: 'student_id' });

// A Module has many Attendance records (track attendance for the module's classes)
Module.hasMany(Attendance, { foreignKey: 'module_id' });
// Each Attendance record belongs to one Module
Attendance.belongsTo(Module, { foreignKey: 'module_id' });

// An Iam (identity/account) sends many Notifications
Iam.hasMany(Notification, { foreignKey: 'sender_id' });
// Each Notification is sent by one Iam (account)
Notification.belongsTo(Iam, { foreignKey: 'sender_id' });

// A Student receives many Notifications
Student.hasMany(Notification, { foreignKey: 'receiver_id' });
// Each Notification is received by one Student
Notification.belongsTo(Student, { foreignKey: 'receiver_id' });

// An Iam (identity/account) processes many Attendance Requests
Iam.hasMany(AttendanceRequest, { foreignKey: 'lecturer_id' });
// Each Attendance Request belongs to one Iam (account), typically a Lecturer
AttendanceRequest.belongsTo(Iam, { foreignKey: 'lecturer_id' });

// A Student makes many Attendance Requests
Student.hasMany(AttendanceRequest, { foreignKey: 'student_id' });
// Each Attendance Request is made by one Student
AttendanceRequest.belongsTo(Student, { foreignKey: 'student_id' });

// A Student takes many Exams (ExamTaking tracks the student's exam participation)
Student.hasMany(ExamTaking, { foreignKey: 'student_id' });
// Each ExamTaking record belongs to one Student
ExamTaking.belongsTo(Student, { foreignKey: 'student_id' });

// A Module has many ExamTaking records (track the students taking the module's exams)
Module.hasMany(ExamTaking, { foreignKey: 'module_id' });
// Each ExamTaking record belongs to one Module
ExamTaking.belongsTo(Module, { foreignKey: 'module_id' });

// A Program has many Courses
Program.hasMany(Course, { foreignKey: 'program_id' });
// Each Course belongs to one Program
Course.belongsTo(Program, { foreignKey: 'program_id' });

// A Course has many Modules through CourseModules (mapping courses to modules)
Course.hasMany(CourseModules, { foreignKey: 'course_id' });
// Each CourseModule belongs to one Module
CourseModules.belongsTo(Module, { foreignKey: 'module_id' });

// A Module has many Classes (e.g., 15 classes per module)
Module.hasMany(Class, { foreignKey: 'module_id' });
// Each Class belongs to one Module
Class.belongsTo(Module, { foreignKey: 'module_id' });

// A Lecturer teaches many Classes
Lecturer.hasMany(Class, { foreignKey: 'lecturer_id' });
// Each Class is taught by one Lecturer
Class.belongsTo(Lecturer, { foreignKey: 'lecturer_id' });

export {
  Student,
  Program,
  Intake,
  ProgramRegistering,
  Module,
  CourseModules,
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
