import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import "bootstrap";

type TabType = "classSchedule" | "classMembers" | "moduleReport";
@Component({
  selector: "lecturer-class-view",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./lecturer-class-view.component.html",
  styleUrl: "./lecturer-class-view.component.css",
})
export class LecturerClassViewComponent {
  activeTab: TabType = "classSchedule"; // Default active tab

  showInviteModal: boolean = false;
  showRemoveModal: boolean = false;
  // Define the scheduleData array
  scheduleData = [
    { date: "01/05/2020", startTime: "9:00", endTime: "10:30" },
    { date: "01/05/2020", startTime: "1:00", endTime: "2:30" },
    { date: "02/05/2020", startTime: "9:00", endTime: "10:30" },
    { date: "02/05/2020", startTime: "1:00", endTime: "2:30" },
    { date: "03/05/2020", startTime: "9:00", endTime: "10:30" },
    { date: "03/05/2020", startTime: "1:00", endTime: "2:30" },
    { date: "04/05/2020", startTime: "9:00", endTime: "10:30" },
    { date: "03/05/2020", startTime: "1:00", endTime: "2:30" },
    { date: "04/05/2020", startTime: "9:00", endTime: "10:30" },
    { date: "03/05/2020", startTime: "1:00", endTime: "2:30" },
    { date: "04/05/2020", startTime: "9:00", endTime: "10:30" },
    { date: "03/05/2020", startTime: "1:00", endTime: "2:30" },
    { date: "04/05/2020", startTime: "9:00", endTime: "10:30" },
    { date: "03/05/2020", startTime: "1:00", endTime: "2:30" },
    { date: "04/05/2020", startTime: "9:00", endTime: "10:30" },
  ];

  studentList = [
    {
      name: "Student 1",
      id: 14841,
      status: "A", // A for Absent
    },
    {
      name: "Student 2",
      id: 17456,
      status: "P", // P for Present
    },
    {
      name: "Student 3",
      id: 11134,
      status: "P",
    },
    {
      name: "Student 4",
      id: 11045,
      status: "A",
    },
    {
      name: "Student 5",
      id: 20045,
      status: "P",
    },
    {
      name: "Student 6",
      id: "44493",
      status: "A",
    },
    {
      name: "Student 5",
      id: 20045,
      status: "P",
    },
    {
      name: "Student 6",
      id: "44493",
      status: "A",
    },
    {
      name: "Student 5",
      id: 20045,
      status: "P",
    },
    {
      name: "Student 6",
      id: "44493",
      status: "A",
    },
    {
      name: "Student 5",
      id: 20045,
      status: "P",
    },
    {
      name: "Student 6",
      id: "44493",
      status: "A",
    },
    {
      name: "Student 5",
      id: 20045,
      status: "P",
    },
    {
      name: "Student 6",
      id: "44493",
      status: "A",
    },
  ];

  memberList = [
    {
      no: 0,
      fullName: "Tran Hong Ngoc",
      id: "00000",
      role: "Lecturer",
      eligibility: "",
    },
    {
      no: 1,
      fullName: "student 1",
      id: "14842",
      role: "Student",
      eligibility: "Eligible",
    },
    {
      no: 2,
      fullName: "student 2",
      id: "14843",
      role: "Student",
      eligibility: "Ineligible",
    },
    {
      no: 3,
      fullName: "student 3",
      id: "14844",
      role: "Student",
      eligibility: "Ineligible",
    },
    {
      no: 4,
      fullName: "student 3",
      id: "14844",
      role: "Student",
      eligibility: "Ineligible",
    },
    {
      no: 5,
      fullName: "student 3",
      id: "14844",
      role: "Student",
      eligibility: "Eligible",
    },
    {
      no: 6,
      fullName: "student 3",
      id: "14844",
      role: "Student",
      eligibility: "Eligible",
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
