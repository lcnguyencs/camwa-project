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

