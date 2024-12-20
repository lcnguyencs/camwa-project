import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionTableComponent } from 'src/app/components/action-table/action-table.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopupAddModuleComponent } from 'src/app/components/popup-add-module/popup-add-module.component';

@Component({
  selector: 'app-module-admin',
  standalone: true,  // Đánh dấu RequestComponent là standalone
  imports: [CommonModule, ActionTableComponent, PopupAddModuleComponent],
  templateUrl: './module-admin.component.html',
  styleUrls: ['./module-admin.component.scss']
})
export class ModuleAdminComponent {
  moduleName = '';
  selectedProgram = '';
  selectedSemester = '';
  selectedLecturer = '';
  columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'program', header: 'Program' },
    { field: 'semester', header: 'Semester' },
    { field: 'lecturer', header: 'Lecturer' }
  ]
  programs = ['CSE', 'MEN', 'BFA', 'BBA', 'ARC', 'ECE'];
  semesters = ['2022', '2023', '2024', '2025'];
  lecturers = ['NguyenVanA', 'NguyenVanB'];

  tableData = [
    { id: 1, name: 'Master Thesis', program: 'ITS', semester: 'SS 2019', lecturer: 'NguyenVanA' },
    { id: 2, name: 'Discrete Math', program: 'CSE', semester: 'WS 2019', lecturer: 'NguyenVanB' },
    { id: 3, name: 'Algebra', program: 'CSE', semester: 'SS2020', lecturer: 'NguyenVanA' },
    { id: 4, name: 'Operating System', program: 'CSE', semester: 'WS2020', lecturer: 'NguyenVanB' },
  ];

  onSearch() {
    console.log('Searching with:', {
      moduleName: this.moduleName,
      selectedProgram: this.selectedProgram,
      selectedSemester: this.selectedSemester,
      selectedLecturer: this.selectedLecturer,
    });
  }

  onCreateModule() {
    console.log('Create Module button clicked');
  }

  constructor(private router: Router) {}

  onEditModule() {
    this.router.navigate(['/module/detail']);
  }

  onDelete(item: any) {
    console.log('Delete item:', item);
  }
  clearSelection(field: string) {
    if (field === 'program') {
      this.selectedProgram = '';
    } else if (field === 'semester') {
      this.selectedSemester = '';
    } else if (field === 'lecturer') {
      this.selectedLecturer = '';
    }
  }
  isPopupOpen: boolean = false; // Biến để kiểm soát hiển thị popup

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }
}
