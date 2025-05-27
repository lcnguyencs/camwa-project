import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
// import "bootstrap";
import { RouterModule, ActivatedRoute } from "@angular/router";

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth.service";

interface ApiResponse<T> {
  status: string;
  code: number;
  message: string;
  metaData: T;
  doc: string;
}

interface Module {
  moduleId: string;
  moduleName: string;
  lecturerName: string;
  programName: string;
  semesterId: string;
  intake: number;
  capacity: number;
  // These will be implemented later
  beginDate?: string;
  endDate?: string;
  examDate?: string;
}

interface AttendanceRecord {
  date: string;
  startTime: string;
  endTime: string;
  status: string;
}

@Component({
  selector: "module-detail-student-view",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./module-detail-student.component.html",
  styleUrl: "./module-detail-student.component.css",
})
export class ModuleDetailStudentComponent {
  private baseUrl = 'http://localhost:3000/api';
  moduleId: string = '';
  module: Module | null = null;
  attendanceRecords: AttendanceRecord[] = [];
  studentId: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: { [key: string]: string }) => {
      this.moduleId = params['id'];
      if (this.moduleId) {
        this.loadModuleDetails();
        this.loadCurrentUser();
      }
    });
  }

  loadCurrentUser() {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.studentId = user.acc_id;
        this.loadAttendanceData();
      },
      error: (error) => {
        console.error('Error loading current user:', error);
      }
    });
  }

  loadModuleDetails() {
    console.log('Loading module details for ID:', this.moduleId);
    this.http.get<ApiResponse<Module>>(`${this.baseUrl}/intakemodule/${this.moduleId}`).subscribe({
      next: (response) => {
        console.log('Module details response:', response);
        if (!response?.metaData) {
          console.error('No module data received');
          return;
        }

        this.module = response.metaData;
        console.log('Loaded module:', this.module);
      },
      error: (error) => {
        console.error('Error loading module details:', error);
      }
    });
  }

  loadAttendanceData() {
    if (!this.studentId) {
      console.error('No student ID available');
      return;
    }

    this.http.get<ApiResponse<AttendanceRecord[]>>(`${this.baseUrl}/attendance/student/${this.studentId}/module/${this.moduleId}`).subscribe({
      next: (response) => {
        if (response?.metaData) {
          this.attendanceRecords = response.metaData;
          console.log('Loaded attendance records:', this.attendanceRecords);
        }
      },
      error: (error) => {
        console.error('Error loading attendance data:', error);
      }
    });
  }
}
