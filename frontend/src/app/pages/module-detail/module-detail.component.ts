import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
// import "bootstrap";
import { RouterModule, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FormsModule } from "@angular/forms";

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
  lecturerName: string;
  programName: string;
  semesterId: string;
  intake: number;
  capacity: number;
  // These will be implemented later
  beginDate?: string;
  endDate?: string;
  examDate?: string;
}

interface ClassSession {
  class_id: string;
  class_number: number;
  class_date: string;
  start_time: string;
  end_time: string;
  lecturer_id?: string;
  intake_module_id: string;
}

interface NewSession {
  class_date: string;
  start_time: string;
  end_time: string;
  intake_module_id: string;
}

interface EnrolledStudent {
  id: string;
  fullName: string;
  intake: string;
  enrollmentDate: string;
}

type TabType = "classSessions" | "classStudents" | "classAttendance";
@Component({
  selector: "module-detail-view",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: "./module-detail.component.html",
  styleUrl: "./module-detail.component.css",
})
export class ModuleDetailComponent implements OnInit {
  private baseUrl = 'http://localhost:3000/api';
  moduleId: string = '';
  module: Module | null = null;
  activeTab = 'classSessions';

  showInviteModal: boolean = false;
  showRemoveModal: boolean = false;

  // New session form data
  newSession: NewSession = {
    class_date: '',
    start_time: '',
    end_time: '',
    intake_module_id: ''
  };

  // Define the classSessions array with proper typing
  classSessions: ClassSession[] = [];
  
  // Update the classStudents array to be empty initially
  classStudents: EnrolledStudent[] = [];

  // Add search properties
  searchStudentId: string = '';
  filteredStudents: EnrolledStudent[] = [];

  classAttendance = [
    {
      name: "Student 1",
      id: "14841",
      status: "A", // A for Absent
    },
    {
      name: "Student 2",
      id: "14842",
      status: "P", // P for Present
    },
    {
      name: "Student 3",
      id: "14843",
      status: "P",
    },
    {
      name: "Student 4",
      id: "14844",
      status: "A",
    },
  ];

  // Add these properties to store the session being edited
  editingSession: ClassSession = {
    class_id: '',
    class_number: 0,
    class_date: '',
    start_time: '',
    end_time: '',
    intake_module_id: ''
  };

  // Add invite student properties
  inviteStudentId: string = '';
  inviteStudentName: string = '';

  // Add remove student properties
  studentToRemove: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.moduleId = params['id'];
      if (this.moduleId) {
        this.loadModuleDetails();
        this.loadClassSessions();
        this.loadEnrolledStudents();
        this.newSession.intake_module_id = this.moduleId;
      }
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
      },
      error: (error) => {
        console.error('Error loading module details:', error);
      }
    });
  }

  loadClassSessions() {
    console.log('Loading class sessions for module ID:', this.moduleId);
    this.http.get<ApiResponse<ClassSession[]>>(`${this.baseUrl}/class/intake-module/${this.moduleId}`).subscribe({
      next: (response) => {
        console.log('Class sessions response:', response);
        if (!response?.metaData) {
          console.error('No class sessions data received');
          return;
        }

        // Sort sessions by date and time
        this.classSessions = response.metaData.sort((a, b) => {
          const dateA = new Date(a.class_date);
          const dateB = new Date(b.class_date);
          if (dateA.getTime() === dateB.getTime()) {
            return a.start_time.localeCompare(b.start_time);
          }
          return dateA.getTime() - dateB.getTime();
        });
        console.log('Loaded class sessions:', this.classSessions);
      },
      error: (error) => {
        console.error('Error loading class sessions:', error);
      }
    });
  }

  loadEnrolledStudents() {
    console.log('Loading enrolled students for module ID:', this.moduleId);
    this.http.get<ApiResponse<EnrolledStudent[]>>(`${this.baseUrl}/class/module/${this.moduleId}/students`).subscribe({
      next: (response) => {
        console.log('Enrolled students response:', response);
        if (!response?.metaData) {
          console.error('No enrolled students data received');
          return;
        }
        this.classStudents = response.metaData;
        this.filteredStudents = [...this.classStudents]; // Initialize filtered students
        console.log('Loaded enrolled students:', this.classStudents);
      },
      error: (error) => {
        console.error('Error loading enrolled students:', error);
      }
    });
  }

  // Add search method
  searchStudent() {
    if (!this.searchStudentId.trim()) {
      // If search is empty, show all students
      this.filteredStudents = [...this.classStudents];
    } else {
      // Filter students by ID (case-insensitive)
      this.filteredStudents = this.classStudents.filter(student => 
        student.id.toLowerCase().includes(this.searchStudentId.toLowerCase())
      );
    }
  }

  // Add method to handle search input changes
  onSearchInputChange() {
    this.searchStudent();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  formatTime(timeString: string): string {
    // Assuming timeString is in HH:mm:ss format
    return timeString.substring(0, 5);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Update the viewItem method to handle edit button click
  viewItem(session: ClassSession) {
    this.editingSession = { ...session };
  }

  close() {
    this.showInviteModal = false;
    this.showRemoveModal = false;
  }

  createSession() {
    if (!this.newSession.class_date || !this.newSession.start_time || !this.newSession.end_time) {
      alert('Please fill in all fields');
      return;
    }

    // Calculate class number based on existing sessions
    const classNumber = this.classSessions.length + 1;

    // Format the date to YYYY-MM-DD
    const formattedDate = new Date(this.newSession.class_date).toISOString().split('T')[0];

    const sessionData = {
      ...this.newSession,
      class_number: classNumber,
      class_date: formattedDate
    };

    this.http.post<ApiResponse<ClassSession>>(`${this.baseUrl}/class/create`, sessionData).subscribe({
      next: (response) => {
        if (response?.metaData) {
          // Add the new session to the list
          this.classSessions.push(response.metaData);
          // Sort the sessions
          this.classSessions.sort((a, b) => {
            const dateA = new Date(a.class_date);
            const dateB = new Date(b.class_date);
            if (dateA.getTime() === dateB.getTime()) {
              return a.start_time.localeCompare(b.start_time);
            }
            return dateA.getTime() - dateB.getTime();
          });
          // Reset the form
          this.newSession = {
            class_date: '',
            start_time: '',
            end_time: '',
            intake_module_id: this.moduleId
          };
          // Close the modal
          const modal = document.getElementById('addModalSession');
          if (modal) {
            const closeButton = modal.querySelector('[data-dismiss="modal"]');
            if (closeButton) {
              (closeButton as HTMLElement).click();
            }
          }
        }
      },
      error: (error) => {
        console.error('Error creating session:', error);
        alert('Failed to create session. Please try again.');
      }
    });
  }

  updateSession() {
    if (!this.editingSession) return;

    // Format the date to YYYY-MM-DD HH:mm:ss
    const date = new Date(this.editingSession.class_date);
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');

    const sessionData = {
      ...this.editingSession,
      class_date: formattedDate
    };

    this.http.put<ApiResponse<ClassSession>>(`${this.baseUrl}/class/${this.editingSession.class_id}`, sessionData).subscribe({
      next: (response) => {
        if (response?.metaData) {
          // Update the session in the list
          const index = this.classSessions.findIndex(s => s.class_id === this.editingSession?.class_id);
          if (index !== -1) {
            this.classSessions[index] = response.metaData;
            // Sort the sessions
            this.classSessions.sort((a, b) => {
              const dateA = new Date(a.class_date);
              const dateB = new Date(b.class_date);
              if (dateA.getTime() === dateB.getTime()) {
                return a.start_time.localeCompare(b.start_time);
              }
              return dateA.getTime() - dateB.getTime();
            });
          }
          // Reset editing session
          this.editingSession = {
            class_id: '',
            class_number: 0,
            class_date: '',
            start_time: '',
            end_time: '',
            intake_module_id: ''
          };
          // Close the modal
          const modal = document.getElementById('editModalSession');
          if (modal) {
            const closeButton = modal.querySelector('[data-dismiss="modal"]');
            if (closeButton) {
              (closeButton as HTMLElement).click();
            }
          }
        }
      },
      error: (error) => {
        console.error('Error updating session:', error);
        alert('Failed to update session. Please try again.');
      }
    });
  }

  deleteSession(sessionId: string) {
    if (!confirm('Are you sure you want to delete this session?')) {
      return;
    }

    this.http.delete<ApiResponse<any>>(`${this.baseUrl}/class/${sessionId}`).subscribe({
      next: (response) => {
        // Remove the session from the list
        this.classSessions = this.classSessions.filter(s => s.class_id !== sessionId);
        // Close the modal
        const modal = document.getElementById('deleteModalSession');
        if (modal) {
          const closeButton = modal.querySelector('[data-dismiss="modal"]');
          if (closeButton) {
            (closeButton as HTMLElement).click();
          }
        }
      },
      error: (error) => {
        console.error('Error deleting session:', error);
        alert('Failed to delete session. Please try again.');
      }
    });
  }

  // Add method to handle student ID input changes
  onInviteStudentIdChange() {
    if (this.inviteStudentId.trim()) {
      this.http.get<ApiResponse<any>>(`${this.baseUrl}/class/student/${this.inviteStudentId}/details`).subscribe({
        next: (response) => {
          if (response?.metaData) {
            this.inviteStudentName = response.metaData.name;
          }
        },
        error: (error) => {
          console.error('Error fetching student details:', error);
          this.inviteStudentName = '';
        }
      });
    } else {
      this.inviteStudentName = '';
    }
  }

  // Update invite student method to reset name
  inviteStudent() {
    if (!this.inviteStudentId.trim()) {
      alert('Please enter a student ID');
      return;
    }

    this.http.post<ApiResponse<any>>(`${this.baseUrl}/class/module/${this.moduleId}/invite`, {
      studentId: this.inviteStudentId
    }).subscribe({
      next: (response) => {
        if (response?.metaData) {
          // Reload the students list
          this.loadEnrolledStudents();
          // Reset the form
          this.inviteStudentId = '';
          this.inviteStudentName = '';
          // Close the modal
          const modal = document.getElementById('inviteModalStudent');
          if (modal) {
            const closeButton = modal.querySelector('[data-dismiss="modal"]');
            if (closeButton) {
              (closeButton as HTMLElement).click();
            }
          }
        }
      },
      error: (error) => {
        console.error('Error inviting student:', error);
        alert(error.error?.message || 'Failed to invite student. Please try again.');
      }
    });
  }

  // Add remove student method
  removeStudent(studentId: string) {
    // Store the student ID to be removed
    this.studentToRemove = studentId;
  }

  // Add method to handle the actual removal after confirmation
  confirmRemoveStudent() {
    if (!this.studentToRemove) return;

    this.http.delete<ApiResponse<any>>(`${this.baseUrl}/class/module/${this.moduleId}/student/${this.studentToRemove}`).subscribe({
      next: (response) => {
        if (response?.metaData) {
          // Reload the students list
          this.loadEnrolledStudents();
          // Reset the student to remove
          this.studentToRemove = null;
          // Close the modal
          const modal = document.getElementById('deleteModalStudent');
          if (modal) {
            const closeButton = modal.querySelector('[data-dismiss="modal"]');
            if (closeButton) {
              (closeButton as HTMLElement).click();
            }
          }
        }
      },
      error: (error) => {
        console.error('Error removing student:', error);
        alert(error.error?.message || 'Failed to remove student. Please try again.');
      }
    });
  }
}
