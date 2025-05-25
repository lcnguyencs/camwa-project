import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionTableComponent } from 'src/app/components/action-table/action-table.component';
import { PopupAttendanceComponent } from 'src/app/components/popup-attendance/popup-attendance.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Lecturer {
  staff_id: string;
  name: string;
}

interface Program {
  program_id: string;
  name: string;
}

interface Semester {
  sem_id: string;
  name: string;
}

interface ApiResponse<T> {
  status: string;
  code: number;
  message: string;
  metaData: T;
  doc: string;
}

@Component({
  selector: 'module-detail-create',
  standalone: true, 
  imports: [CommonModule, FormsModule, ActionTableComponent, PopupAttendanceComponent],
  templateUrl: './module-detail-create.component.html',
  styleUrls: ['./module-detail-create.component.scss'],
})
export class ModuleDetailCreateComponent implements OnInit {
  activeSection = 'information';
  private baseUrl = 'http://localhost:3000/api';

  moduleName = '';
  selectedLecturer = '';
  selectedProgram = '';
  selectedSemester = '';
  intake = '';
  beginDate = '';
  endDate = '';
  examDate = '';

  studentID = '';
  attendanceDate = '';

  lecturers: Lecturer[] = [];
  programs: Program[] = [];
  semesters: Semester[] = [];
  intakes = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

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
  attendanceStudents = [
    { name: 'NguyenVanA', id: '00001', status: 'Present' },
    { name: 'NguyenVanB', id: '00002', status: 'Present' },
    { name: 'NguyenVanC', id: '00003', status: 'Absent' },
    { name: 'NguyenVanD', id: '00004', status: 'Absent' },
    { name: 'NguyenVanE', id: '00005', status: 'Absent' },
  ];
  
  popupData: { date: string; time: string; students: any[] } | null = null;
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.http.get<ApiResponse<Lecturer[]>>(`${this.baseUrl}/lecturer`).subscribe({
      next: (response) => {
        this.lecturers = response.metaData;
      },
      error: (error) => {
        console.error('Error loading lecturers:', error);
      }
    });

    this.http.get<ApiResponse<Program[]>>(`${this.baseUrl}/program`).subscribe({
      next: (response) => {
        this.programs = response.metaData;
      },
      error: (error) => {
        console.error('Error loading programs:', error);
      }
    });

    this.http.get<ApiResponse<Semester[]>>(`${this.baseUrl}/semester`).subscribe({
      next: (response) => {
        this.semesters = response.metaData;
      },
      error: (error) => {
        console.error('Error loading semesters:', error);
      }
    });
  }

  createModule() {
    this.http.get<ApiResponse<string>>(`${this.baseUrl}/intakemodule/next-id`).subscribe({
      next: (response) => {
        const moduleData = {
          moduleId: response.metaData,
          name: this.moduleName,
          lecturerId: this.selectedLecturer,
          programId: this.selectedProgram,
          courseId: 1,
          intake: parseInt(this.intake),
          semesterId: this.selectedSemester,
          capacity: 30,
          ects: 5,
          beginDate: this.beginDate,
          endDate: this.endDate,
          examDate: this.examDate
        };

        this.http.post<ApiResponse<any>>(`${this.baseUrl}/intakemodule`, moduleData).subscribe({
          next: (response) => {
            console.log('Module created successfully:', response.metaData);
            this.router.navigate(['/module-view-admin']);
          },
          error: (error) => {
            console.error('Error creating module:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error getting next module ID:', error);
      }
    });
  }

  validateForm(): boolean {
    return (
      this.moduleName.trim() !== '' &&
      this.selectedLecturer !== '' &&
      this.selectedProgram !== '' &&
      this.selectedSemester !== '' &&
      this.intake !== '' &&
      this.beginDate.trim() !== '' &&
      this.endDate.trim() !== '' &&
      this.examDate.trim() !== ''
    );
  }
}
