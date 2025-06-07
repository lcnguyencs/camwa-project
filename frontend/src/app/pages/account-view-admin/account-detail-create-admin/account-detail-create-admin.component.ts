import { Component, OnInit } from '@angular/core';
import { ActionTableComponent } from 'src/app/components/action-table/action-table.component';
import { CommonModule } from '@angular/common';
import { PopupAttendanceComponent } from 'src/app/components/popup-attendance/popup-attendance.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface ApiResponse<T> {
  status: string;
  code: number;
  message: string;
  metaData: T;
  doc: string;
}

interface Program {
  program_id: string;
  name: string;
}

@Component({
  selector: 'account-detail-create-admin',
  standalone: true, 
  imports: [CommonModule, ActionTableComponent, PopupAttendanceComponent, FormsModule],
  templateUrl: './account-detail-create-admin.component.html',
  styleUrls: ['./account-detail-create-admin.component.scss'],
})
export class AccountDetailCreateAdminComponent implements OnInit {
  private baseUrl = 'http://localhost:3000/api';

  roles: string[] = [];
  intakes: number[] = [];
  programs: Program[] = [];

  // Form data
  accountData = {
    username: '',
    role: '',
    accId: '',
    intake: '',
    program: '',
    email: '',
    password: ''
  };

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRoles();
    this.loadIntakes();
    this.loadPrograms();
  }

  loadRoles() {
    this.http.get<ApiResponse<string[]>>(`${this.baseUrl}/account/roles`).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.roles = response.metaData;
        }
      },
      error: (error) => {
        console.error('Error loading roles:', error);
        this.errorMessage = 'Failed to load roles';
      }
    });
  }

  loadIntakes() {
    this.http.get<ApiResponse<number[]>>(`${this.baseUrl}/intake`).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.intakes = response.metaData;
        }
      },
      error: (error) => {
        console.error('Error loading intakes:', error);
        this.errorMessage = 'Failed to load intakes';
      }
    });
  }

  loadPrograms() {
    this.http.get<ApiResponse<Program[]>>(`${this.baseUrl}/program`).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.programs = response.metaData;
        }
      },
      error: (error) => {
        console.error('Error loading programs:', error);
        this.errorMessage = 'Failed to load programs';
      }
    });
  }

  createAccount() {
    this.isLoading = true;
    this.errorMessage = '';

    // Validate required fields
    if (!this.accountData.username || !this.accountData.role || !this.accountData.accId || 
        !this.accountData.email || !this.accountData.password) {
      this.errorMessage = 'Please fill in all required fields';
      this.isLoading = false;
      return;
    }

    // Create a new object with only the required fields
    const accountPayload = {
      username: this.accountData.username,
      role: this.accountData.role,
      accId: this.accountData.accId,
      email: this.accountData.email,
      password: this.accountData.password,
      // intake: this.accountData.intake,
      // program: this.accountData.program,
    };

    this.http.post<ApiResponse<any>>(`${this.baseUrl}/account`, accountPayload)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            // Navigate back to account list on success
            this.router.navigate(['/account-view-admin']);
          } else {
            this.errorMessage = response.message || 'Failed to create account';
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error creating account:', error);
          this.errorMessage = error.error?.message || 'An error occurred while creating the account';
          this.isLoading = false;
        }
      });
  }
}
