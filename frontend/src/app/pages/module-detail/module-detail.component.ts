import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
// import "bootstrap";
import { RouterModule, ActivatedRoute } from "@angular/router";

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

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

type TabType = "classSessions" | "classStudents" | "classAttendance";
@Component({
  selector: "module-detail-view",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./module-detail.component.html",
  styleUrl: "./module-detail.component.css",
})
export class ModuleDetailComponent implements OnInit {
  private baseUrl = 'http://localhost:3000/api';
  moduleId: string = '';
  module: Module | null = null;
  activeTab = 'classSessions';

  showInviteModal: boolean = false;
  showRemoveModal: boolean = false;

  // Define the scheduleData array
  classSessions = [
    { date: "09/09/2024", startTime: "9:00", endTime: "11:45" },
    { date: "09/09/2024", startTime: "13:00", endTime: "16:00" },
    { date: "12/09/2024", startTime: "9:00", endTime: "11:45" },
    { date: "12/09/2024", startTime: "13:00", endTime: "16:30" },
  ];
  
  classStudents = [
    {
      no: 1,
      fullName: "Student 1",
      id: "14841",
      intake: "2022",
      attendancePercent: "50%",
      eligibility: "Ineligible",
    },
    {
      no: 2,
      fullName: "Student 2",
      id: "14842",
      intake: "2022",
      attendancePercent: "50%",
      eligibility: "Ineligible",
    },
    {
      no: 3,
      fullName: "Student 3",
      id: "14843",
      intake: "2022",
      attendancePercent: "50%",
      eligibility: "Ineligible",
    },
    {
      no: 4,
      fullName: "Student 4",
      id: "14844",
      intake: "2022",
      attendancePercent: "50%",
      eligibility: "Ineligible",
    },
  ];

  classAttendance = [
    {
      name: "Student 1",
      id: "14841",
      status: "A", // A for Absent
    },
    {
      name: "Student 2",
      id: "14842",
      status: "P", // P for Present
    },
    {
      name: "Student 3",
      id: "14843",
      status: "P",
    },
    {
      name: "Student 4",
      id: "14844",
      status: "A",
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.moduleId = params['id'];
      if (this.moduleId) {
        this.loadModuleDetails();
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

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  selectedItem: any;
  // Define the viewItem method

  viewItem(item: any) {
    this.selectedItem = item;
  }

  // Define the editItem method
  editItem(item: any) {
    this.selectedItem = item;
  }

  close() {
    this.showInviteModal = false;
    this.showRemoveModal = false;
  }

  // ... other existing code ...
}
