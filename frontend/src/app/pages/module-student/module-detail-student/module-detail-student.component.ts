import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-module-detail-admin",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./module-detail-student.component.html",
  styleUrls: ["./module-detail-student.component.scss"],
})
export class ModuleDetailStudentComponent {
  attendanceDate = "";
  tableData = [
    {
      date: "2/8/2024",
      time: "9:00-10:30",
      attendance: { status: "Present", color: "#56F000" },
      request: null,
    },
    {
      date: "2/8/2024",
      time: "13:30-15:00",
      attendance: { status: "Present", color: "#56F000" },
      request: null,
    },
    {
      date: "4/8/2024",
      time: "9:00-10:30",
      attendance: { status: "Absent", color: "#FF3838" },
      request: "Send Request",
    },
    {
      date: "4/8/2024",
      time: "13:30-15:00",
      attendance: { status: "Present", color: "#56F000" },
      request: null,
    },
  ];
  searchAttendance() {
    console.log("Searching attendance for date:", this.attendanceDate);
  }
}
