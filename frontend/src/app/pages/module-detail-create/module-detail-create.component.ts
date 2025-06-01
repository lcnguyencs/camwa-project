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
  intakes: number[] = [];
  
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

    this.http.get<ApiResponse<number[]>>(`${this.baseUrl}/intake`).subscribe({
      next: (response) => {
        this.intakes = response.metaData;
      },
      error: (error) => {
        console.error('Error loading intakes:', error);
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
