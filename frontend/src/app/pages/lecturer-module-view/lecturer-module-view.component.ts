import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "lecturer-module-view",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./lecturer-module-view.component.html",
  styleUrls: ["./lecturer-module-view.component.css"],
})
export class LecturerModuleViewComponent {
  modules = [
    {
      id: 1,
      name: "Master Thesis",
      program: "ITS",
      semester: "SS 2019",
      intake: 2020,
    },
    {
      id: 2,
      name: "Discrete Math",
      program: "CSE",
      semester: "WS 2019",
      intake: 2021,
    },
    {
      id: 3,
      name: "Algebra",
      program: "CSE",
      semester: "SS 2020",
      intake: 2022,
    },
    {
      id: 4,
      name: "Operating System",
      program: "CSE",
      semester: "WS 2020",
      intake: 2023,
    },
  ];
}
