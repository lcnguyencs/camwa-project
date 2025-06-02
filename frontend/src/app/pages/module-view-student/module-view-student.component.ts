import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ActionTableComponent } from 'src/app/components/action-table/action-table.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { PopupAddModuleComponent } from 'src/app/components/popup-add-module/popup-add-module.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../../services/token.service';
import { FormsModule } from '@angular/forms';

interface ApiResponse<T> {
  status: string;
  code: number;
  message: string;
  metaData: T;
  doc: string;
}

interface Module {
  moduleId: string;
  moduleName: string;
  semesterId: string;
  lecturerName: string;
  enrollmentDate?: string;
}

@Component({
  selector: 'module-view-student',
  standalone: true,
  imports: [CommonModule, ActionTableComponent, PopupAddModuleComponent, RouterModule, RouterLink, RouterOutlet, FormsModule],
  templateUrl: './module-view-student.component.html',
  styleUrls: ['./module-view-student.component.scss']
})
export class ModuleViewStudentComponent implements OnInit {
  private baseUrl = 'http://localhost:3000/api';
  modules: Module[] = [];
  filteredModules: Module[] = [];
  isLoading = false;
  error: string | null = null;
  
  // Search form fields
  searchModuleName: string = '';
  searchSemester: string = '';
  searchLecturer: string = '';

  // Available semesters will be populated from modules data
  semesters: string[] = [];
  
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const decodedToken = this.tokenService.getDecodedToken();
    console.log('Decoded token:', decodedToken);
    
    if (!decodedToken) {
      console.error('No token found or invalid token');
      this.error = 'Please log in to view your modules.';
      this.router.navigate(['/login']);
      return;
    }
    
    if (decodedToken.role !== 'STUDENT') {
      console.error('User is not a student. Role:', decodedToken.role);
      this.error = 'Access denied. Only students can view this page.';
      return;
    }

    console.log('Loading modules for student:', decodedToken.uid);
    this.loadModules(decodedToken.uid);
  }

  loadModules(studentId: string) {
    this.isLoading = true;
    this.error = null;

    // Get the current token
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No token found in localStorage');
      this.error = 'Authentication token not found. Please log in again.';
      this.router.navigate(['/login']);
      return;
    }
    console.log('Token found:', token.substring(0, 20) + '...'); // Show first 20 chars for debugging

    // Create headers with token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Request URL:', `${this.baseUrl}/intakemodule/student/${studentId}`);
    console.log('Request headers:', headers.get('Authorization')?.substring(0, 20) + '...');

    // Use the correct endpoint for fetching student's modules
    this.http.get<ApiResponse<Module[]>>(`${this.baseUrl}/intakemodule/student/${studentId}`, { headers })
      .subscribe({
        next: (response) => {
          console.log('Full response:', response);
          if (!response) {
            console.error('No response received');
            this.error = 'No response received from server';
            return;
          }
          if (!response.metaData) {
            console.error('No metaData in response:', response);
            this.error = 'Invalid response format from server';
            return;
          }
          this.modules = response.metaData.map(module => ({
            moduleId: module.moduleId,
            moduleName: module.moduleName,
            semesterId: module.semesterId,
            lecturerName: module.lecturerName,
            enrollmentDate: module.enrollmentDate
          }));
          this.filteredModules = [...this.modules];
          
          // Populate semesters from the modules data
          this.semesters = [...new Set(this.modules.map(module => module.semesterId))].sort();
          
          console.log('Processed modules:', this.modules);
          console.log('Available semesters:', this.semesters);
        },
        error: (error) => {
          console.error('Full error object:', error);
          console.error('Error status:', error.status);
          console.error('Error message:', error.message);
          console.error('Error response:', error.error);
          
          if (error.status === 401) {
            this.error = 'Unauthorized. Please log in again.';
            this.router.navigate(['/login']);
          } else if (error.status === 403) {
            this.error = 'Access denied. You do not have permission to view this page.';
            this.router.navigate(['/login']);
          } else if (error.status === 404) {
            this.error = 'Could not find modules for this student.';
          } else {
            this.error = `Failed to load modules: ${error.message || 'Unknown error'}`;
          }
        },
        complete: () => {
          this.isLoading = false;
          console.log('Request completed');
        }
      });
  }

  filterModules() {
    this.filteredModules = this.modules.filter(module => {
      const matchesModuleName = !this.searchModuleName || 
        module.moduleName.toLowerCase().includes(this.searchModuleName.toLowerCase());
      
      const matchesSemester = !this.searchSemester || 
        module.semesterId === this.searchSemester;
      
      const matchesLecturer = !this.searchLecturer || 
        module.lecturerName.toLowerCase().includes(this.searchLecturer.toLowerCase());
      
      return matchesModuleName && matchesSemester && matchesLecturer;
    });
  }

  resetFilters() {
    this.searchModuleName = '';
    this.searchSemester = '';
    this.searchLecturer = '';
    this.filteredModules = [...this.modules];
  }
}
