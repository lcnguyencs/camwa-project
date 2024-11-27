import { Component } from '@angular/core';

@Component({
  selector: 'app-account-detail-admin',
  templateUrl: './account-detail-admin.component.html',
  styleUrls: ['./account-detail-admin.component.scss']
})
export class AccountDetailAdminComponent {
  accountName: string = '';
  role: string = '';
  id: string = '';
  email: string = '';
  major: string = '';
  intake: string = '';

  updateAccount() {
    // Thực hiện logic cập nhật tài khoản ở đây
    console.log('Account updated with:', { accountName: this.accountName, role: this.role, id: this.id, email: this.email, major: this.major, intake: this.intake });
  }

  createAccount() {
    // Thực hiện logic tạo tài khoản ở đây
    console.log('New account created with:', { accountName: this.accountName, role: this.role, id: this.id, email: this.email, major: this.major, intake: this.intake });
  }

  deleteAccount() {
    // Thực hiện logic xóa tài khoản ở đây
    console.log('Account deleted');
  }

  viewCourse() {
    // Logic xem các khóa học được gán
    console.log('View courses assigned to this account');
  }
}
