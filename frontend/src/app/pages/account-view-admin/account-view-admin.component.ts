import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ActionTableComponent } from 'src/app/components/action-table/action-table.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { PopupAddModuleComponent } from 'src/app/components/popup-add-module/popup-add-module.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';

interface Account {
  id: string;
  name: string;
  email: string;
  role: string;
  program: string;
  intake: string;
}

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
  selector: 'account-view-admin',
  standalone: true,
  imports: [CommonModule, ActionTableComponent, PopupAddModuleComponent, RouterModule, RouterLink, RouterOutlet, FormsModule],
  templateUrl: './account-view-admin.component.html',
  styleUrls: ['./account-view-admin.component.scss']
})
export class AccountViewAdminComponent implements OnInit {
  private baseUrl = 'http://localhost:3000/api';
  
  // Search parameters
  searchParams = {
    accId: '',
    username: '',
    program: '',
    intake: '',
    role: ''
  };

  // Data for select dropdowns
  roles: string[] = [];

  // Store accounts
  accounts: Account[] = [];
  isLoading: boolean = false;
  noResults: boolean = false;
  errorMessage: string = '';
  selectedAccount: Account | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadRoles();
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

  onSearch() {
    this.isLoading = true;
    this.noResults = false;
    this.errorMessage = '';
    
    const params = new URLSearchParams();
    if (this.searchParams.accId) params.append('accId', this.searchParams.accId);
    if (this.searchParams.username) params.append('username', this.searchParams.username);
    if (this.searchParams.role) params.append('role', this.searchParams.role);
    // Program and intake fields are commented out for now
    // if (this.searchParams.program) params.append('program', this.searchParams.program);
    // if (this.searchParams.intake) params.append('intake', this.searchParams.intake);

    this.http.get<ApiResponse<Account[]>>(`${this.baseUrl}/account/search?${params.toString()}`)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            // Create a new array to trigger change detection
            this.accounts = [...response.metaData];
            this.noResults = this.accounts.length === 0;
          } else {
            this.errorMessage = response.message || 'Failed to search accounts';
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Search error:', error);
          this.errorMessage = error.error?.message || 'An error occurred while searching accounts';
          this.isLoading = false;
        }
      });
  }

  openDeleteModal(account: Account) {
    this.selectedAccount = account;
  }

  confirmDelete() {
    if (this.selectedAccount) {
      this.http.delete<ApiResponse<any>>(`${this.baseUrl}/account/${this.selectedAccount.id}`)
        .subscribe({
          next: (response) => {
            if (response.status === 'success') {
              // Remove the deleted account from the list
              this.accounts = this.accounts.filter(acc => acc.id !== this.selectedAccount?.id);
              this.selectedAccount = null;
            } else {
              console.error('Error deleting account:', response.message);
            }
          },
          error: (error) => {
            console.error('Error deleting account:', error);
          }
        });
    }
  }
}
