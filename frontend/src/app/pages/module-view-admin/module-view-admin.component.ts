import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ActionTableComponent } from 'src/app/components/action-table/action-table.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { PopupAddModuleComponent } from 'src/app/components/popup-add-module/popup-add-module.component';

@Component({
  selector: 'module-view-admin',
  standalone: true,  // Đánh dấu RequestComponent là standalone
  imports: [CommonModule, ActionTableComponent, PopupAddModuleComponent,RouterModule,RouterLink, RouterOutlet],  // Import thư viện cần thiết
  templateUrl: './module-view-admin.component.html',
  styleUrls: ['./module-view-admin.component.scss']
})
export class ModuleViewAdminComponent {  
  modules = [
    {
      id: "CS1",
      name: "Theoretical Computer Science",
      program: "CSE",
      semester: "WS 2024",
      intake: 2022,
      lecturer: "Lecturer 1",
      studentCount: 4,
    },
    {
      id: "CS2",
      name: "Discrete Math",
      program: "CSE",
      semester: "WS 2024",
      intake: 2022,
      lecturer: "Lecturer 2",
      studentCount: 4,
    },
    {
      id: "CS3",
      name: "Algebra",
      program: "CSE",
      semester: "WS 2024",
      intake: 2022,
      lecturer: "Lecturer 3",
      studentCount: 4,
    },
    {
      id: "CS4",
      name: "Operating System",
      program: "CSE",
      semester: "WS 2024",
      intake: 2022,
      lecturer: "Lecturer 4",
      studentCount: 4,
    },
  ];
}
