import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActionTableComponent } from 'src/app/components/action-table/action-table.component';
import { PopupAttendanceComponent } from 'src/app/components/popup-attendance/popup-attendance.component';

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
  capacity: number;
  ects: number;
  courseId: number;
  intake: number;
  lecturerId: string;
  lecturerName: string;
  programId: string;
  programName: string;
  semesterId: string;
  // beginDate?: string;
  // endDate?: string;
  // examDate?: string;
}

interface Lecturer {
  staff_id: string;
  name: string;
}

interface Program {
  program_id: string;
  name: string;
}

interface Semester {
  sem_id: string;
  name: string;
}

@Component({
  selector: 'app-module-detail-modify',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ActionTableComponent, PopupAttendanceComponent],
  templateUrl: './module-detail-modify.component.html',
  styleUrls: ['./module-detail-modify.component.scss']
})
export class ModuleDetailModifyComponent implements OnInit {
  moduleId: string = '';
  module: Module | null = null;
  lecturers: Lecturer[] = [];
  programs: Program[] = [];
  semesters: Semester[] = [];
  intakes = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
  private baseUrl = 'http://localhost:3000/api';

  activeSection = 'information';

  // Form fields
  moduleName: string = '';
  lecturer: string = '';
  program: string = '';
  semester: string = '';
  intake: string = '';
  // Placeholder date fields (not connected to backend yet)
  beginDate: string = '';
  endDate: string = '';
  examDate: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // First load all reference data
    Promise.all([
      this.loadLecturers(),
      this.loadPrograms(),
      this.loadSemesters()
    ]).then(() => {
      // After reference data is loaded, get the module ID and load module details
      this.route.params.subscribe(params => {
        this.moduleId = params['id'];
        if (this.moduleId) {
          this.loadModuleDetails();
        }
      });
    });
  }

  loadModuleDetails() {
    console.log('Loading module details for ID:', this.moduleId);
    this.http.get<ApiResponse<Module>>(`${this.baseUrl}/intakemodule/${this.moduleId}`).subscribe({
      next: (response) => {
        console.log('Module details response:', response);
        if (!response?.metaData) {
          console.error('No module data received');
          return;
        }

        this.module = response.metaData;
        console.log('Loaded module:', this.module);

        // Initialize form fields with current module data
        if (this.module) {
          this.moduleName = this.module.moduleName;
          
          // Find lecturer by name
          const lecturerName = this.module.lecturerName || '';
          const matchingLecturer = this.lecturers.find(l => l.name === lecturerName);
          this.lecturer = matchingLecturer?.staff_id || '';
          console.log('Matching lecturer:', {
            lecturerName: lecturerName,
            foundLecturer: matchingLecturer,
            selectedId: this.lecturer
          });

          // Find program by name
          const programName = this.module.programName || '';
          const matchingProgram = this.programs.find(p => p.name === programName);
          this.program = matchingProgram?.program_id || '';
          console.log('Matching program:', {
            programName: programName,
            foundProgram: matchingProgram,
            selectedId: this.program
          });

          this.semester = this.module.semesterId;
          this.intake = this.module.intake?.toString() || '';
          // Reset date fields (will be implemented later)
          this.beginDate = '';
          this.endDate = '';
          this.examDate = '';

          console.log('Form fields initialized:', {
            moduleName: this.moduleName,
            lecturer: this.lecturer,
            program: this.program,
            semester: this.semester,
            intake: this.intake,
            // Log date fields but they're not used yet
            beginDate: this.beginDate,
            endDate: this.endDate,
            examDate: this.examDate
          });
        }
      },
      error: (error) => {
        console.error('Error loading module details:', error);
      }
    });
  }

  loadLecturers() {
    return this.http.get<ApiResponse<Lecturer[]>>(`${this.baseUrl}/lecturer`).toPromise()
      .then(response => {
        if (response?.metaData) {
          this.lecturers = response.metaData;
          console.log('Loaded lecturers:', this.lecturers);
          // Log each lecturer's staff_id for debugging
          this.lecturers.forEach(lect => {
            console.log(`Lecturer ${lect.name} has staff_id: ${lect.staff_id}`);
          });
        }
      })
      .catch(error => {
        console.error('Error loading lecturers:', error);
      });
  }

  loadPrograms() {
    return this.http.get<ApiResponse<Program[]>>(`${this.baseUrl}/program`).toPromise()
      .then(response => {
        if (response?.metaData) {
          this.programs = response.metaData;
          console.log('Loaded programs:', this.programs);
          // Log each program's program_id for debugging
          this.programs.forEach(prog => {
            console.log(`Program ${prog.name} has program_id: ${prog.program_id}`);
          });
        }
      })
      .catch(error => {
        console.error('Error loading programs:', error);
      });
  }

  loadSemesters() {
    return this.http.get<ApiResponse<Semester[]>>(`${this.baseUrl}/semester`).toPromise()
      .then(response => {
        if (response?.metaData) {
          this.semesters = response.metaData;
          console.log('Loaded semesters:', this.semesters);
          // Log each semester's sem_id for debugging
          this.semesters.forEach(sem => {
            console.log(`Semester ${sem.name} has sem_id: ${sem.sem_id}`);
          });
        }
      })
      .catch(error => {
        console.error('Error loading semesters:', error);
      });
  }

  updateModule() {
    if (!this.module) return;

    // Map form fields back to module object
    const updatedModule = {
      ...this.module,
      moduleName: this.moduleName,
      lecturerId: this.lecturer,
      programId: this.program,
      semesterId: this.semester,
      intake: parseInt(this.intake)
    };

    console.log('Updating module with:', updatedModule);

    this.http.put<ApiResponse<Module>>(`${this.baseUrl}/intakemodule/${this.moduleId}`, updatedModule).subscribe({
      next: (response) => {
        console.log('Module updated successfully:', response.metaData);
        this.router.navigate(['/module-view-admin']);
      },
      error: (error) => {
        console.error('Error updating module:', error);
      }
    });
  }

  cancelEdit() {
    this.router.navigate(['/module-view-admin']);
  }
}
