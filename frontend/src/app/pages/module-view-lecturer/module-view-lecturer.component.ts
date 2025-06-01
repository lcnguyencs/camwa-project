import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ActionTableComponent } from 'src/app/components/action-table/action-table.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { PopupAddModuleComponent } from 'src/app/components/popup-add-module/popup-add-module.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';

interface Module {
  moduleId: string;
  moduleName: string;
  programName: string;
  semesterId: string;
  intakeYear: number;
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
  selector: 'module-view-lecturer',
  standalone: true,
  imports: [CommonModule, ActionTableComponent, PopupAddModuleComponent, RouterModule, RouterLink, RouterOutlet, FormsModule],
  templateUrl: './module-view-lecturer.component.html',
  styleUrls: ['./module-view-lecturer.component.scss']
})
export class ModuleViewLecturerComponent implements OnInit {
  private baseUrl = 'http://localhost:3000/api';
  modules: Module[] = [];
  filteredModules: Module[] = [];
  isLoading = false;
  error: string | null = null;

  // Search filters
  searchModuleName: string = '';
  searchProgram: string = '';
  searchSemester: string = '';
  searchIntake: string = '';

  // Dropdown options
  programOptions: string[] = [];
  semesterOptions: string[] = [];
  intakeOptions: string[] = [];

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.loadModules();
  }

  loadModules() {
    this.isLoading = true;
    this.error = null;

    // Get lecturer ID from decoded token
    const decodedToken = this.tokenService.getDecodedToken();
    if (!decodedToken?.uid) {
      this.error = 'Lecturer ID not found. Please log in again.';
      this.isLoading = false;
      return;
    }

    console.log('Loading modules for lecturer:', decodedToken.uid); // Debug log

    // Use the intakeModule endpoint to get modules for this lecturer
    this.http.get<ApiResponse<Module[]>>(`${this.baseUrl}/intakemodule/lecturer/${decodedToken.uid}`).subscribe({
      next: (response) => {
        console.log('Response from server:', response); // Debug log
        if (response?.metaData) {
          this.modules = response.metaData;
          this.filteredModules = [...this.modules];
          
          // Extract unique values for dropdowns
          this.programOptions = [...new Set(this.modules.map(m => m.programName))].sort();
          this.semesterOptions = [...new Set(this.modules.map(m => m.semesterId))].sort();
          this.intakeOptions = [...new Set(this.modules.map(m => m.intakeYear.toString()))].sort();
          
          console.log('Modules loaded:', this.modules); // Debug log
        } else {
          console.warn('No modules found in response'); // Debug log
          this.modules = [];
          this.filteredModules = [];
          this.programOptions = [];
          this.semesterOptions = [];
          this.intakeOptions = [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading modules:', error);
        if (error.status === 404) {
          this.error = 'No modules found for this lecturer.';
        } else if (error.status === 401) {
          this.error = 'Please log in again to view your modules.';
        } else {
          this.error = error.error?.message || 'Failed to load modules. Please try again later.';
        }
        this.isLoading = false;
      }
    });
  }

  filterModules() {
    this.filteredModules = this.modules.filter(module => {
      const matchesName = !this.searchModuleName || 
        module.moduleName.toLowerCase().includes(this.searchModuleName.toLowerCase());
      const matchesProgram = !this.searchProgram || 
        module.programName === this.searchProgram;
      const matchesSemester = !this.searchSemester || 
        module.semesterId === this.searchSemester;
      const matchesIntake = !this.searchIntake || 
        module.intakeYear.toString() === this.searchIntake;

      return matchesName && matchesProgram && matchesSemester && matchesIntake;
    });
  }

  resetFilters() {
    this.searchModuleName = '';
    this.searchProgram = '';
    this.searchSemester = '';
    this.searchIntake = '';
    this.filteredModules = [...this.modules];
  }
}
