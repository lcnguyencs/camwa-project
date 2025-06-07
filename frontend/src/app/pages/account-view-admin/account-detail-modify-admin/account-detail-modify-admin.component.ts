import { Component, OnInit } from '@angular/core';
import { ActionTableComponent } from 'src/app/components/action-table/action-table.component';
import { CommonModule } from '@angular/common';
import { PopupAttendanceComponent } from 'src/app/components/popup-attendance/popup-attendance.component';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

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
  selector: 'account-detail-modify-admin',
  standalone: true, 
  imports: [CommonModule, ActionTableComponent, PopupAttendanceComponent, FormsModule],
  templateUrl: './account-detail-modify-admin.component.html',
  styleUrls: ['./account-detail-modify-admin.component.scss'],
})
export class AccountDetailModifyAdminComponent implements OnInit {
  private baseUrl = environment.apiUrl;
  accountId: string = '';

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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadRoles();
    this.loadIntakes();
    this.loadPrograms();
    
    // Get account ID from route params
    this.route.params.subscribe(params => {
      this.accountId = params['id'];
      if (this.accountId) {
        this.loadAccountData();
      }
    });
  }

  loadRoles() {
    this.http.get<ApiResponse<string[]>>(`${this.baseUrl}/account/roles`)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.roles = response.metaData;
          }
        },
        error: (error) => {
          console.error('Error loading roles:', error);
        }
      });
  }

  loadIntakes() {
    this.http.get<ApiResponse<number[]>>(`${this.baseUrl}/intake`)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.intakes = response.metaData;
          }
        },
        error: (error) => {
          console.error('Error loading intakes:', error);
        }
      });
  }

  loadPrograms() {
    this.http.get<ApiResponse<Program[]>>(`${this.baseUrl}/program`)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.programs = response.metaData;
          }
        },
        error: (error) => {
          console.error('Error loading programs:', error);
        }
      });
  }

  loadAccountData() {
    this.http.get<ApiResponse<any>>(`${this.baseUrl}/account/${this.accountId}`)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            const account = response.metaData;
            this.accountData = {
              username: account.username || '',
              role: account.role || '',
              accId: account.accId || '',
              intake: account.intake || '',
              program: account.program || '',
              email: account.email || '',
              password: '' // Don't load password for security
            };
          }
        },
        error: (error) => {
          console.error('Error loading account data:', error);
          this.errorMessage = 'Failed to load account data';
        }
      });
  }

  updateAccount() {
    this.isLoading = true;
    this.errorMessage = '';

    // Validate required fields
    if (!this.accountData.username || !this.accountData.role || !this.accountData.accId || 
        !this.accountData.email) {
      this.errorMessage = 'Please fill in all required fields';
      this.isLoading = false;
      return;
    }

    // Create update payload
    const updatePayload = {
      username: this.accountData.username,
      role: this.accountData.role,
      accId: this.accountData.accId,
      email: this.accountData.email,
      // Only include password if it's been changed
      ...(this.accountData.password && { password: this.accountData.password })
    };

    this.http.put<ApiResponse<any>>(`${this.baseUrl}/account/${this.accountId}`, updatePayload)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            // Navigate back to account list on success
            this.router.navigate(['/account-view-admin']);
          } else {
            this.errorMessage = response.message || 'Failed to update account';
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error updating account:', error);
          this.errorMessage = error.error?.message || 'An error occurred while updating the account';
          this.isLoading = false;
        }
      });
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete this account?')) {
      this.http.delete<ApiResponse<any>>(`${this.baseUrl}/account/${this.accountId}`)
        .subscribe({
          next: (response) => {
            if (response.status === 'success') {
              // Navigate back to account list on success
              this.router.navigate(['/account-view-admin']);
            } else {
              this.errorMessage = response.message || 'Failed to delete account';
            }
          },
          error: (error) => {
            console.error('Error deleting account:', error);
            this.errorMessage = error.error?.message || 'An error occurred while deleting the account';
          }
        });
    }
  }
}
