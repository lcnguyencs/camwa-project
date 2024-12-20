import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionTableComponent } from 'src/app/components/action-table/action-table.component'; // Import ActionTableComponent
import { CommonModule } from '@angular/common'; // Import CommonModule
@Component({
  selector: 'app-account-admin',
  standalone: true, // Đánh dấu đây là standalone component
  imports: [CommonModule, ActionTableComponent], // Import các module và component cần thiết
  templateUrl: './account-admin.component.html',
  styleUrls: ['./account-admin.component.scss']
})
export class AccountAdminComponent {
  accountName = '';
  majors = ['CSE', 'MEN', 'BFA', 'BBA', 'ARC', 'ECE'];
  roles = ['Faculty', 'Lecturer', 'Student', ];
  intakes = ['2017', '2018', '2019', '2020', '2021', '2022'];

  columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'intake', header: 'Intake' },
    { field: 'major', header: 'Major' },
    { field: 'role', header: 'Role' },
  ];
  tableData = [
    { id: 10001, name: 'PhamVanA', intake: '2018', major: 'CSE', role: 'Student' },
    { id: 10002, name: 'PhamVanB', intake: '2019', major: 'CSE', role: 'Faculty' },
    { id: 10003, name: 'PhamVanC', intake: '2020', major: 'BBA', role: 'Lecturer' },
    { id: 10004, name: 'PhamVanD', intake: '2018', major: 'MEN', role: 'Student' },
  ];

  constructor(private router: Router) {}

  onSearch() {
    console.log('Searching with accountName:', this.accountName);
  }

  onCreateAccount() {
    this.router.navigate(['/account/detail']);
  }

  onEditAccount() {
    this.router.navigate(['/account/detail']);
  }

  onDelete(item: any) {
    console.log('Delete item:', item);
  }

  openPopup() {
    console.log('Popup opened');
  }
}
