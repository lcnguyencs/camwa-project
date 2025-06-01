import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
// import "bootstrap";
import { RouterModule, ActivatedRoute } from "@angular/router";

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

interface Module {
  moduleId: string;
  moduleName: string;
  lecturerName: string;
  semesterId: string;
  programName: string;
  capacity: number;
  beginDate?: string;
  endDate?: string;
  examDate?: string;
}

interface Student {
  no: number;
  fullName: string;
  id: string;
  intake: string;
  attendancePercent: string;
  eligibility: string;
}

interface Attendance {
  name: string;
  id: string;
  status: string;
}

interface Session {
  date: string;
  startTime: string;
  endTime: string;
}

interface ApiResponse<T> {
  metaData: T;
  message: string;
  code: number;
}

type TabType = "classSessions" | "classStudents" | "classAttendance";
@Component({
  selector: "module-detail-lecturer-view",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./module-detail-lecturer.component.html",
  styleUrl: "./module-detail-lecturer.component.css",
})
export class ModuleDetailLecturerComponent implements OnInit {
  private baseUrl = 'http://localhost:3000/api';
  moduleId: string = '';
  module: Module | null = null;
  classSessions: Session[] = [];
  classStudents: Student[] = [];
  classAttendance: Attendance[] = [];

  activeTab: TabType = "classSessions"; // Default active tab

  showInviteModal: boolean = false;
  showRemoveModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.moduleId = params['id'];
      if (this.moduleId) {
        this.loadModuleDetails();
        this.loadModuleSessions();
        this.loadModuleStudents();
        this.loadModuleAttendance();
      }
    });
  }

  loadModuleDetails() {
    this.http.get<ApiResponse<Module>>(`${this.baseUrl}/intakemodule/${this.moduleId}`).subscribe({
      next: (response) => {
        if (response?.metaData) {
          this.module = response.metaData;
          console.log('Loaded module:', this.module);
        }
      },
      error: (error) => {
        console.error('Error loading module details:', error);
      }
    });
  }

  loadModuleSessions() {
    this.http.get<ApiResponse<Session[]>>(`${this.baseUrl}/class/intake-module/${this.moduleId}`).subscribe({
      next: (response) => {
        if (response?.metaData) {
          this.classSessions = response.metaData;
          console.log('Loaded sessions:', this.classSessions);
        }
      },
      error: (error) => {
        console.error('Error loading sessions:', error);
      }
    });
  }

  loadModuleStudents() {
    this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/intakemodule/${this.moduleId}/students`).subscribe({
      next: (response) => {
        if (response?.metaData) {
          this.classStudents = response.metaData.map((student, index) => ({
            no: index + 1,
            fullName: student.name,
            id: student.studentId,
            intake: student.intakeYear.toString(),
            attendancePercent: this.calculateAttendancePercentage(student.attendance),
            eligibility: this.calculateEligibility(student.attendance)
          }));
          console.log('Loaded students:', this.classStudents);
        }
      },
      error: (error) => {
        console.error('Error loading students:', error);
      }
    });
  }

  loadModuleAttendance() {
    this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/attendance/student/${this.moduleId}`).subscribe({
      next: (response) => {
        if (response?.metaData) {
          this.classAttendance = response.metaData.map(record => ({
            name: record.studentName,
            id: record.studentId,
            status: record.status
          }));
          console.log('Loaded attendance:', this.classAttendance);
        }
      },
      error: (error) => {
        console.error('Error loading attendance:', error);
      }
    });
  }

  private calculateAttendancePercentage(attendance: any[]): string {
    if (!attendance || attendance.length === 0) return '0%';
    const present = attendance.filter(a => a.status === 'P').length;
    return `${Math.round((present / attendance.length) * 100)}%`;
  }

  private calculateEligibility(attendance: any[]): string {
    if (!attendance || attendance.length === 0) return 'Ineligible';
    const present = attendance.filter(a => a.status === 'P').length;
    const percentage = (present / attendance.length) * 100;
    return percentage >= 80 ? 'Eligible' : 'Ineligible';
  }

  setActiveTab(tab: string) {
    this.activeTab = tab as TabType;
  }

  selectedItem: any;
  // Define the viewItem method

  viewItem(item: any) {
    console.log('Viewing item:', item);
  }

  // Define the editItem method
  editItem(item: any) {
    console.log('Editing item:', item);
  }

  close() {
    this.showInviteModal = false;
    this.showRemoveModal = false;
  }

  // ... other existing code ...
}
