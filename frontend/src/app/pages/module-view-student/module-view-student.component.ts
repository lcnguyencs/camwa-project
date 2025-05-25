import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ActionTableComponent } from 'src/app/components/action-table/action-table.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { PopupAddModuleComponent } from 'src/app/components/popup-add-module/popup-add-module.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../../services/token.service';

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
  imports: [CommonModule, ActionTableComponent, PopupAddModuleComponent, RouterModule, RouterLink, RouterOutlet],
  templateUrl: './module-view-student.component.html',
  styleUrls: ['./module-view-student.component.scss']
})
export class ModuleViewStudentComponent implements OnInit {
  private baseUrl = 'http://localhost:3000/api';
  modules: Module[] = [];
  isLoading = false;
  error: string | null = null;
  
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const decodedToken = this.tokenService.getDecodedToken();
    console.log('Decoded token:', decodedToken); // Debug log
    
    if (!decodedToken) {
      console.log('No token found, redirecting to login'); // Debug log
      this.router.navigate(['/login']);
      return;
    }
    
    if (decodedToken.role !== 'STUDENT') {
      console.log('User is not a student. Role:', decodedToken.role); // Debug log
      this.error = 'Access denied. Only students can view this page.';
      return;
    }

    console.log('Loading modules for student:', decodedToken.uid); // Debug log
    this.loadModules(decodedToken.uid);
  }

  loadModules(studentId: string) {
    this.isLoading = true;
    this.error = null;

    // Get the current token
    const token = localStorage.getItem('token');
    console.log('Current token:', token); // Debug log

    // Create headers with token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Request headers:', headers); // Debug log

    this.http.get<ApiResponse<Module[]>>(`${this.baseUrl}/class/student/${studentId}`, { headers })
      .subscribe({
        next: (response) => {
          console.log('Modules response:', response);
          if (!response?.metaData) {
            this.error = 'No module data received';
            return;
          }
          this.modules = response.metaData.map(module => ({
            moduleId: module.moduleId,
            moduleName: module.moduleName,
            semesterId: module.semesterId,
            lecturerName: module.lecturerName,
            enrollmentDate: module.enrollmentDate
          }));
        },
        error: (error) => {
          console.error('Error loading modules:', error);
          if (error.status === 401) {
            this.error = 'Unauthorized. Please log in again.';
            this.router.navigate(['/login']);
          } else if (error.status === 403) {
            this.error = 'Access denied. You do not have permission to view this page.';
            this.router.navigate(['/login']);
          } else {
            this.error = 'Failed to load modules. Please try again later.';
          }
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
}
