import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
@Component({
  selector: "faculty-assistant-module-view",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./faculty-assistant-module-view.component.html",
  styleUrl: "./faculty-assistant-module-view.component.css",
})
export class FacultyAssistantModuleViewComponent {
  modules = [
    {
      name: "Master Thesis",
      program: "ITS",
      semester: "SS 2019",
      intake: 2020,
    },
    {
      name: "Discrete Math",
      program: "CSE",
      semester: "WS 2019",
      intake: 2021,
    },
    {
      name: "Algebra",
      program: "CSE",
      semester: "SS 2020",
      intake: 2022,
    },
    {
      name: "Operating System",
      program: "CSE",
      semester: "WS 2020",
      intake: 2023,
    },
  ];
}
