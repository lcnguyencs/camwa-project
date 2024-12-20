import { Component, EventEmitter, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-popup-add-module",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./popup-add-module.component.html",
  styleUrls: ["./popup-add-module.component.scss"],
})
export class PopupAddModuleComponent {
  // Lists for dropdowns
  programs: string[] = ["CSE", "ECE", "MEN", "BFA", "FFA", "ARC"];
  intakes: number[] = [2018, 2019, 2020, 2021, 2022, 2023, 2024];
  semesterYears: number[] = [2020, 2021, 2022, 2023, 2024, 2025, 2026];

  // Output to close the popup
  @Output() close = new EventEmitter<void>();

  onSubmit() {
    // Handle form submission
    console.log("Form submitted");
  }

  closePopup() {
    this.close.emit();
  }
}
