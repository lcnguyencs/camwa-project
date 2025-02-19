import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
// import "bootstrap";
import { RouterModule } from "@angular/router";

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

type TabType = "classSessions" | "classStudents" | "classAttendance";
@Component({
  selector: "module-detail-view",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./module-detail.component.html",
  styleUrl: "./module-detail.component.css",
})
export class ModuleDetailComponent {
  // data$: Observable<any>;

  // dataArray: any[] = [];

  // constructor(private http: HttpClient) {
  //   this.data$ = this.fetchData();
  //   this.data$.subscribe((data) => {
  //     this.dataArray = data; // Assign the fetched data to the array
  //     console.log(this.dataArray);
  //   });
  // }

  // fetchData(): Observable<any> {
  //   return this.http.get("http://localhost:3000/class/lecturer/L001");
  // }

  activeTab: TabType = "classSessions"; // Default active tab

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


  setActiveTab(tab: string) {
    this.activeTab = tab as TabType;
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
