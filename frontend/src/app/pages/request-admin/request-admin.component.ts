import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionTableComponent } from 'src/app/components/action-table/action-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request',
  standalone: true,  // Đánh dấu RequestComponent là standalone
  imports: [CommonModule, ActionTableComponent],
  templateUrl: './request-admin.component.html',
  styleUrls: ['./request-admin.component.scss']
})
export class RequestAdminComponent {
  requestName = '';
  selectedProgram = '';
  selectedSemester = '';
  selectedLecturer = '';

  programs = ['CSE', 'MEN', 'BFA', 'BBA', 'ARC', 'ECE'];
  semesters = ['2022', '2023', '2024', '2025'];
  lecturers = ['NguyenVanA', 'NguyenVanB'];
  columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'program', header: 'Program' },
    { field: 'intake', header: 'Intake' },
    { field: 'semester', header: 'Semester' },
    { field: 'lecturer', header: 'Lecturer' },
  ];
  
  tableData = [
    { id: 1, name: 'Master Thesis', program: 'ITS', intake: '2018', semester: 'SS 2019', lecturer: 'NguyenVanA' },
    { id: 2, name: 'Discrete Math', program: 'CSE', intake: '2019', semester: 'WS 2019', lecturer: 'NguyenVanB' },
    { id: 3, name: 'Algebra', program: 'CSE', intake: '2017', semester: 'SS2020', lecturer: 'NguyenVanA' },
    { id: 4, name: 'Operating System', program: 'CSE', intake: '2018', semester: 'WS2020', lecturer: 'NguyenVanB' },
  ];

  onSearch() {
    console.log('Searching with:', {
      requestName: this.requestName,  
      selectedProgram: this.selectedProgram,
      selectedSemester: this.selectedSemester,
      selectedLecturer: this.selectedLecturer,
    });
  }

  onCreateRequest() {
    console.log('Create Request button clicked');
  }

  constructor(private router: Router) {}

  onEditRequest() {
    this.router.navigate(['/request/detail']);
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
  isPopupOpen: boolean = false; 

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }
}
