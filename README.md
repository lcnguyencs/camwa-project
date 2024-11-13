# CAMWA – Class Attendance Management Web Application

## Overview
CAMWA is a web-based system designed for efficiently managing class attendance. It allows lecturers to track attendance, students to view their attendance records, and admins to manage courses, programs, and users seamlessly. The system utilizes:

- **Frontend**: Angular-based single-page application (SPA).
- **Backend**: Node.js with Express and PostgreSQL (using Docker).
- **Authentication**: Firebase Authentication with JWT for secure access control.

## Table of Contents
- [Project Setup](#project-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Project Setup

### Prerequisites
Before starting, ensure you have the following installed:

- **Node.js & npm**: [Download from Node.js](https://nodejs.org)
- **Angular CLI**: Install globally:
  ```bash
  npm install -g @angular/cli
  ```
- **Docker Desktop**: [Download from Docker](https://www.docker.com/products/docker-desktop)
- **Git**: [Download from Git](https://git-scm.com)
- **Postgres Client (TablePlus)**: [Download TablePlus](https://tableplus.com)

### Backend Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Dangtrunghieu2002/camwa-project.git
   cd camwa-project/backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Docker for PostgreSQL**:
   ```bash
   docker run --name Attendance-Checking-System-Postgres -e POSTGRES_PASSWORD=1234 -d -p 5433:5432 postgres:latest
   ```

4. **Configure PostgreSQL using TablePlus**:
   - Connect to the Postgres database with:
     - Host: `127.0.0.1`
     - Port: `5433`
     - User: `postgres`
     - Password: `1234`
   - Create the database and tables using the SQL script provided in the `/backend` directory.

5. **Create `.env` file in the backend directory**:
   ```env
   DB_HOST=127.0.0.1
   DB_PORT=5433
   DB_USER=postgres
   DB_PASSWORD=1234
   DB_NAME=camwa_db
   JWT_SECRET=mysecretkey
   GOOGLE_APPLICATION_CREDENTIALS=./backend/src/config/serviceAccountKey.json
   ```

6. **Start the backend server**:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:3000`.

### Frontend Setup
1. **Navigate to the frontend folder**:
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create `environment.ts` in `src/environments/`**:
   ```typescript
   export const environment = {
     production: false,
     firebaseConfig: {
       apiKey: "<your-firebase-api-key>",
       authDomain: "<your-auth-domain>.firebaseapp.com",
       projectId: "<your-project-id>",
       storageBucket: "<your-storage-bucket>.appspot.com",
       messagingSenderId: "<your-messaging-sender-id>",
       appId: "<your-app-id>"
     },
     apiUrl: 'http://localhost:3000'
   };
   ```

4. **Run the frontend server**:
   ```bash
   ng serve
   ```
   The frontend will be available at `http://localhost:4200`.

## Running the Application
1. **Start Docker**:
   ```bash
   docker-compose up -d
   ```

2. **Run the backend server**:
   ```bash
   cd backend
   npm start
   ```

3. **Run the frontend server**:
   ```bash
   cd frontend
   ng serve
   ```

4. **Access the application**:
   - **Frontend**: [http://localhost:4200](http://localhost:4200)
   - **Backend API**: [http://localhost:3000/api](http://localhost:3000/api)

## Project Structure
```
camwa-project/
│
├── backend/                      # Backend (Node.js + Express + PostgreSQL)
│   ├── src/                      # Source code for backend
│   │   ├── controllers/          # Controllers for API logic
│   │   ├── models/               # Sequelize models for database tables
│   │   ├── routes/               # Express routes
│   │   ├── middleware/           # Middleware for authentication, validation
│   │   └── config/               # Database and Firebase configuration
│   ├── .env                      # Environment variables
│   └── server.js                 # Server setup and launch
│
├── frontend/                     # Frontend (Angular)
│   ├── src/                      # Angular source code
│   │   ├── app/                  # Components, services, and modules
│   │   ├── environments/         # Environment configurations
│   │   └── index.html            # Root HTML template
└── docker-compose.yml            # Docker configuration
```

## API Documentation

### Authentication

#### **Login**
`POST /api/auth/login`
- **Summary**: User login with Firebase authentication.
- **Request**:
  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```
- **Responses**:
  - `200`: Successfully logged in
  - `401`: Unauthorized

#### **Refresh Token**
`POST /api/auth/refresh-token`
- **Summary**: Refresh the access token.
- **Responses**:
  - `200`: Token refreshed successfully
  - `401`: Unauthorized

#### **Logout**
`POST /api/auth/logout`
- **Summary**: Log out the user.
- **Responses**:
  - `200`: Successfully logged out

### Attendance

#### **Create Attendance**
`POST /api/attendance/create`
- **Summary**: Create a new attendance record.
- **Request**:
  ```json
  {
    "studentId": "S01",
    "date": "2024-11-01",
    "status": "present"
  }
  ```
- **Responses**:
  - `200`: Attendance created successfully
  - `401`: Unauthorized

#### **View Attendance**
`GET /api/attendance/view`
- **Summary**: View attendance records.
- **Responses**:
  - `200`: List of attendance records
  - `401`: Unauthorized

#### **Update Attendance**
`PUT /api/attendance/{attendanceId}`
- **Summary**: Update an attendance record.
- **Request**:
  ```json
  {
    "status": "absent"
  }
  ```
- **Responses**:
  - `200`: Attendance updated successfully
  - `401`: Unauthorized

#### **Delete Attendance**
`DELETE /api/attendance/{attendanceId}`
- **Summary**: Delete an attendance record.
- **Responses**:
  - `200`: Attendance deleted successfully
  - `401`: Unauthorized

#### **Calculate Exam Eligibility**
`GET /api/attendance/eligibility/calculate`
- **Summary**: Calculate eligibility for exams.
- **Responses**:
  - `200`: Eligibility calculated successfully
  - `401`: Unauthorized

#### **View Exam Eligibility Status**
`GET /api/attendance/eligibility/status`
- **Summary**: View exam eligibility status.
- **Responses**:
  - `200`: Exam eligibility status retrieved successfully
  - `401`: Unauthorized

### Class

#### **Create Class**
`POST /api/class/create`
- **Summary**: Create a new class.
- **Request**:
  ```json
  {
    "className": "Math 101",
    "intakeModuleId": "module01"
  }
  ```
- **Responses**:
  - `200`: Class created successfully
  - `401`: Unauthorized

#### **View Classes for Lecturer**
`GET /api/class/lecturer/{lecturerId}`
- **Summary**: View classes for a lecturer.
- **Responses**:
  - `200`: List of classes for the lecturer
  - `401`: Unauthorized

### Course

#### **Create Course**
`POST /api/course/create`
- **Summary**: Create a new course (Admin only).
- **Request**:
  ```json
  {
    "courseName": "Physics 101",
    "description": "Basic Physics course"
  }
  ```
- **Responses**:
  - `200`: Course created successfully
  - `401`: Unauthorized

#### **Assign Lecturer to Course**
`PUT /api/course/{intakeModuleId}/assign-lecturer`
- **Summary**: Assign a lecturer to an intake module (Faculty Assistant only).
- **Request**:
  ```json
  {
    "lecturerId": "L01"
  }
  ```
- **Responses**:
  - `200`: Lecturer assigned to intake module successfully
  - `401`: Unauthorized

### Notification

#### **Create Notification**
`POST /api/notification/create`
- **Summary**:

 Create a new notification (Admin or Faculty Assistant).
- **Request**:
  ```json
  {
    "receiver_email": "student@example.com",
    "content": "Your attendance is updated.",
    "notification_type": "attendance"
  }
  ```
- **Responses**:
  - `200`: Notification created successfully
  - `401`: Unauthorized

## Contributing
We welcome contributions from the community! Please follow these steps to contribute:

1. **Fork the repository** on GitHub.
2. **Clone your fork** to your local machine:
   ```bash
   git clone <your-fork-url>
   ```
3. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** and commit them:
   ```bash
   git add .
   git commit -m "Add your commit message here"
   ```
5. **Push your changes** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a pull request** on the main repository.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

