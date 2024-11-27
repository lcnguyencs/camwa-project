import { Component } from '@angular/core';
import { ActionTableComponent } from 'src/app/components/action-table/action-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-module-detail-admin',
  standalone: true, 
  imports: [CommonModule, ActionTableComponent],
  templateUrl: './module-detail-admin.component.html',
  styleUrls: ['./module-detail-admin.component.scss'],
})
export class ModuleDetailAdminComponent {
  activeSection = 'information';

  moduleName = '';
  lecturer = '';
  intake = '';
  program = '';
  semester = '';
  year = '';
  beginDate = '';
  endDate = '';

  studentID = '';
  attendanceDate = '';

  lecturers = ['NguyenVanA', 'NguyenVanB'];
  intakes = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  programs = ['CSE', 'ECE', 'MEN', 'BBA', 'BFA', 'ARC'];
  semesters = ['WS', 'SS'];
  years = [2020, 2021, 2022, 2023, 2024, 2025, 2026];

  studentColumns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'attendance', header: 'Attendance' },
  ];
  studentData = [
    { id: '10001', name: 'PhamVanA', attendance: '5/10' },
    { id: '10002', name: 'PhamVanB', attendance: '7/10' },
    { id: '10003', name: 'PhamVanC', attendance: '10/10' },
    { id: '10004', name: 'PhamVanD', attendance: '9/10' },
  ];

  attendanceColumns = [
    { field: 'date', header: 'Date' },
    { field: 'time', header: 'Time' },
    { field: 'attendance', header: 'Attendance' },
  ];
  attendanceData = [
    { date: '2/8/2024', time: '9:00-10:30', attendance: '5/10' },
    { date: '2/8/2024', time: '13:30-15:00', attendance: '6/10' },
    { date: '4/8/2024', time: '9:00-10:30', attendance: '9/10' },
    { date: '4/8/2024', time: '13:30-15:00', attendance: '10/10' },
  ];

  showSection(section: string) {
    this.activeSection = section;
  }

  updateModule() {
    console.log('Module updated:', this.moduleName);
  }

  deleteModule() {
    console.log('Module deleted');
  }

  searchStudent() {
    console.log('Searching for student:', this.studentID);
  }

  addStudent() {
    console.log('Adding student');
  }

  editStudent(student: any) {
    console.log('Editing student:', student);
  }

  deleteStudent(student: any) {
    console.log('Deleting student:', student);
  }

  searchAttendance() {
    console.log('Searching attendance for date:', this.attendanceDate);
  }

  editAttendance(attendance: any) {
    console.log('Editing attendance:', attendance);
  }
}
