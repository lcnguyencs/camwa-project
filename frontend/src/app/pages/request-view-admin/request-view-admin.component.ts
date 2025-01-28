import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
// import "bootstrap";
import { RouterModule } from "@angular/router";

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Component({
  selector: "request-view-admin-view",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./request-view-admin.component.html",
  styleUrl: "./request-view-admin.component.css",
})
export class RequestViewAdminComponent {
  requestData = [
    {
      moduleID: "CS1",
      moduleName: "Theoretical Computer Science",
      program: "CSE",
      semester: "WS 2024",
      intake: "2022",
      sessionDate: "09/09/2024", 
      sessionStartTime: "9:00", 
      sessionEndTime: "11:45",
      studentID: "14841",
      studentName: "Student 1",
      requestDate: "09/09/2024", 
      requestTime: "13:00", 
      status: "In Progress",
    },
    {
      moduleID: "CS2",
      moduleName: "Discreet Math",
      program: "CSE",
      semester: "WS 2024",
      intake: "2022",
      sessionDate: "09/09/2024", 
      sessionStartTime: "9:00", 
      sessionEndTime: "11:45",
      studentID: "14842",
      studentName: "Student 2",
      requestDate: "09/09/2024", 
      requestTime: "13:00", 
      status: "In Progress",
    },
    {
      moduleID: "CS3",
      moduleName: "Algebra",
      program: "CSE",
      semester: "WS 2024",
      intake: "2022",
      sessionDate: "09/09/2024", 
      sessionStartTime: "9:00", 
      sessionEndTime: "11:45",
      studentID: "14843",
      studentName: "Student 3",
      requestDate: "09/09/2024", 
      requestTime: "13:00", 
      status: "Completed",
    },
    {
      moduleID: "CS4",
      moduleName: "Operating Systems",
      program: "CSE",
      semester: "WS 2024",
      intake: "2022",
      sessionDate: "09/09/2024", 
      sessionStartTime: "9:00", 
      sessionEndTime: "11:45",
      studentID: "14844",
      studentName: "Student 4",
      requestDate: "09/09/2024", 
      requestTime: "13:00", 
      status: "Completed",
    }
  ];
}
