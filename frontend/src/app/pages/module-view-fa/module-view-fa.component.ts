import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ActionTableComponent } from 'src/app/components/action-table/action-table.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { PopupAddModuleComponent } from 'src/app/components/popup-add-module/popup-add-module.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Program {
  program_id: string;
  name: string;
  description?: string;
}

interface Semester {
  sem_id: string;
  name: string;
  start_date?: string;
  end_date?: string;
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
  selector: 'module-view-fa',
  standalone: true,
  imports: [CommonModule, ActionTableComponent, PopupAddModuleComponent, RouterModule, RouterLink, RouterOutlet, FormsModule],
  templateUrl: './module-view-fa.component.html',
  styleUrls: ['./module-view-fa.component.scss']
})
export class ModuleViewFAComponent implements OnInit {
  private baseUrl = 'http://localhost:3000/api';
  
  // Search form fields
  searchModuleName: string = '';
  searchProgram: string = '';
  searchSemester: string = '';
  searchIntake: string = '';
  searchLecturer: string = '';

  // Data for select dropdowns
  programs: Program[] = [];
  semesters: Semester[] = [];
  intakes: number[] = [];

  // Store all modules and filtered modules
  allModules: Module[] = [];
  modules: Module[] = [];
  isLoading: boolean = false;
  noResults: boolean = false;
  errorMessage: string = '';

  // For delete modal
  selectedModule: Module | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('Component initialized');
    this.loadModules();
  }

  loadModules() {
    console.log('Loading modules...');
    this.isLoading = true;
    this.errorMessage = '';

    // Get the current user's account ID from localStorage
    const accountId = localStorage.getItem('accountId');
    console.log('Account ID from localStorage:', accountId);
    
    if (!accountId) {
      console.error('No account ID found in localStorage');
      this.errorMessage = 'User account ID not found';
      this.isLoading = false;
      return;
    }

    this.http.get<ApiResponse<Module[]>>(`${this.baseUrl}/intakemodule/faculty/${accountId}`).subscribe({
      next: (response) => {
        console.log('Modules response:', response);
        if (response.metaData && Array.isArray(response.metaData)) {
          this.allModules = response.metaData;
          console.log('All modules loaded:', this.allModules);
          
          // Populate dropdowns from the loaded modules
          this.populateDropdowns();
          
          // Apply any existing filters
          this.filterModules();
        } else {
          console.error('Invalid response format:', response);
          this.errorMessage = 'Invalid response format from server';
          this.allModules = [];
          this.modules = [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading modules:', error);
        this.errorMessage = error.error?.message || 'An error occurred while loading modules.';
        this.allModules = [];
        this.modules = [];
        this.isLoading = false;
      }
    });
  }

  populateDropdowns() {
    // Get unique programs
    const uniquePrograms = Array.from(new Set(this.allModules.map(m => m.programName)))
      .map(name => ({ program_id: name, name: name }));
    this.programs = uniquePrograms;

    // Get unique semesters
    const uniqueSemesters = Array.from(new Set(this.allModules.map(m => m.semesterId)))
      .map(id => ({ sem_id: id, name: id }));
    this.semesters = uniqueSemesters;

    // Get unique intakes
    this.intakes = Array.from(new Set(this.allModules.map(m => m.intakeYear)))
      .sort((a, b) => b - a); // Sort in descending order
  }

  filterModules() {
    console.log('Filtering modules...');
    console.log('Current search criteria:', {
      moduleName: this.searchModuleName,
      program: this.searchProgram,
      semester: this.searchSemester,
      intake: this.searchIntake,
      lecturer: this.searchLecturer
    });
    
    this.modules = this.allModules.filter(module => {
      const matchesName = !this.searchModuleName || 
        module.moduleName.toLowerCase().includes(this.searchModuleName.toLowerCase());
      
      const matchesProgram = !this.searchProgram || 
        module.programName === this.searchProgram;
      
      const matchesSemester = !this.searchSemester || 
        module.semesterId === this.searchSemester;
      
      const matchesIntake = !this.searchIntake || 
        module.intakeYear.toString() === this.searchIntake;
      
      const matchesLecturer = !this.searchLecturer || 
        module.lecturerName.toLowerCase().includes(this.searchLecturer.toLowerCase());

      return matchesName && matchesProgram && matchesSemester && matchesIntake && matchesLecturer;
    });

    console.log('Filtered modules:', this.modules);
    this.noResults = this.modules.length === 0;
  }

  // Reset search filters
  resetSearch() {
    this.searchModuleName = '';
    this.searchProgram = '';
    this.searchSemester = '';
    this.searchIntake = '';
    this.searchLecturer = '';
    this.filterModules();
  }

  openDeleteModal(module: Module) {
    this.selectedModule = module;
  }

  deleteModule() {
    if (!this.selectedModule) return;

    this.http.delete<ApiResponse<any>>(`${this.baseUrl}/intakemodule/${this.selectedModule.moduleId}`).subscribe({
      next: (response) => {
        console.log('Module deleted successfully:', response);
        // Remove the module from both arrays
        this.allModules = this.allModules.filter(m => m.moduleId !== this.selectedModule?.moduleId);
        this.modules = this.modules.filter(m => m.moduleId !== this.selectedModule?.moduleId);
        // Update dropdowns after deletion
        this.populateDropdowns();
        this.selectedModule = null;
      },
      error: (error) => {
        console.error('Error deleting module:', error);
        this.errorMessage = error.error?.message || 'An error occurred while deleting the module.';
      }
    });
  }
}
