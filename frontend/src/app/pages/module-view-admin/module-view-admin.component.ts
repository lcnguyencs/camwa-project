import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ActionTableComponent } from 'src/app/components/action-table/action-table.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { PopupAddModuleComponent } from 'src/app/components/popup-add-module/popup-add-module.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

interface Program {
  program_id: string;
  name: string;
  description?: string;
}

interface Semester {
  sem_id: string;
  name: string;
}

interface Module {
  moduleId: string;
  moduleName: string;
  programName: string;
  semesterId: string;
  intakeYear: number;
  lecturerName: string;
  studentCount: number;
}

interface ApiResponse<T> {
  status: string;
  code: number;
  message: string;
  metaData: T;
  doc: string;
}

@Component({
  selector: 'module-view-admin',
  standalone: true,
  imports: [CommonModule, ActionTableComponent, PopupAddModuleComponent, RouterModule, RouterLink, RouterOutlet, FormsModule],
  templateUrl: './module-view-admin.component.html',
  styleUrls: ['./module-view-admin.component.scss']
})
export class ModuleViewAdminComponent implements OnInit {
  private baseUrl = 'http://localhost:3000/api';
  
  // Search form fields
  searchModuleName: string = '';
  searchProgram: string = '';
  searchSemester: string = '';
  searchIntake: string = '';
  searchLecturer: string = '';

  // Data for select dropdowns
  programs: Program[] = [];
  semesters: Semester[] = [
    { sem_id: 'WS2024', name: 'Winter Semester 2024' },
    { sem_id: 'SS2024', name: 'Summer Semester 2024' }
  ];
  intakes: number[] = [];

  // Store modules
  modules: Module[] = [];
  isLoading: boolean = false;
  noResults: boolean = false;
  errorMessage: string = '';

  // For delete modal
  selectedModule: Module | null = null;

  constructor(private http: HttpClient) {
    // Initialize intakes array (e.g., last 10 years)
    const currentYear = new Date().getFullYear();
    this.intakes = Array.from({length: 10}, (_, i) => currentYear - i);
  }

  ngOnInit(): void {
  }

  searchModules() {
    this.isLoading = true;
    this.noResults = false;
    this.errorMessage = '';
    
    // Construct search parameters
    const searchParams = new URLSearchParams();
    if (this.searchModuleName) searchParams.append('name', this.searchModuleName);
    if (this.searchProgram) searchParams.append('program', this.searchProgram);
    if (this.searchSemester) searchParams.append('semester', this.searchSemester);
    if (this.searchIntake) searchParams.append('intake', this.searchIntake);
    if (this.searchLecturer) searchParams.append('lecturer', this.searchLecturer);

    // Only search if at least one parameter is provided
    if (searchParams.toString()) {
      const url = `${this.baseUrl}/intakemodule/search?${searchParams.toString()}`;
      
      this.http.get<ApiResponse<Module[]>>(url).subscribe({
        next: (response) => {
          if (response.metaData && Array.isArray(response.metaData)) {
            this.modules = response.metaData;
            this.noResults = this.modules.length === 0;
          } else {
            console.error('Invalid response format:', response);
            this.errorMessage = 'Invalid response format from server';
            this.modules = [];
            this.noResults = true;
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error details:', {
            status: error.status,
            statusText: error.statusText,
            message: error.error?.message || error.message,
            error: error.error
          });
          this.modules = [];
          this.noResults = true;
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'An error occurred while searching. Please try again.';
        }
      });
    } else {
      // If no search parameters, clear the results
      this.modules = [];
      this.isLoading = false;
    }
  }

  // Reset search filters
  resetSearch() {
    this.searchModuleName = '';
    this.searchProgram = '';
    this.searchSemester = '';
    this.searchIntake = '';
    this.searchLecturer = '';
    this.modules = [];
    this.noResults = false;
    this.errorMessage = '';
  }

  openDeleteModal(module: Module) {
    this.selectedModule = module;
  }

  deleteModule() {
    if (!this.selectedModule) return;

    this.http.delete<ApiResponse<any>>(`${this.baseUrl}/intakemodule/${this.selectedModule.moduleId}`).subscribe({
      next: (response) => {
        console.log('Module deleted successfully:', response);
        // Remove the module from the list
        this.modules = this.modules.filter(m => m.moduleId !== this.selectedModule?.moduleId);
        this.selectedModule = null;
      },
      error: (error) => {
        console.error('Error deleting module:', error);
        this.errorMessage = error.error?.message || 'An error occurred while deleting the module.';
      }
    });
  }
}
