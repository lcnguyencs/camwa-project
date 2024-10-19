Here’s the updated **README.md** for the CAMWA project, reflecting all the details discussed earlier, including Firebase Authentication with JWT, Postgres, and other changes to the setup and configuration:

---

# **CAMWA – Class Attendance Management Web Application**

## **Overview**

CAMWA is a web-based system designed for managing class attendance efficiently. It allows lecturers to track attendance, students to view their attendance records, and admins to manage courses, programs, and users seamlessly.  
The system consists of:
- **Frontend:** Angular-based single-page application (SPA).
- **Backend:** Node.js with Express and PostgreSQL (using Docker).
- **Authentication:** Firebase Authentication with JWT for secure access control.

---

## **Table of Contents**

1. [Project Setup](#project-setup)  
2. [Running the Application](#running-the-application)  
3. [Project Structure](#project-structure)  
4. [API Documentation](#api-documentation)  
5. [Contributing](#contributing)  
6. [License](#license)

---

## **Project Setup**

### **Prerequisites**

- **Node.js & npm**: Download from [Node.js](https://nodejs.org/).  
- **Angular CLI**: Install globally:
  ```bash
  npm install -g @angular/cli
  ```
- **Docker Desktop**: Download from [Docker](https://www.docker.com/products/docker-desktop).
- **Git**: Download from [Git](https://git-scm.com/).  
- **Postgres Client (TablePlus)**: [Download TablePlus](https://tableplus.com/download).

---

### **Backend Setup**

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd camwa-project/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Docker for PostgreSQL:**
   ```bash
   docker run --name Attendance-Checking-System-Postgres -e POSTGRES_PASSWORD=1234 -d -p 5433:5432 postgres:latest
   ```

4. **Configure PostgreSQL using TablePlus:**
   - Connect to the Postgres database with:
     - **Host:** `127.0.0.1`
     - **Port:** `5433`
     - **User:** `postgres`
     - **Password:** `1234`
   - Create the database and tables using the SQL script provided in the `/backend` directory.

5. **Create `.env` file in the backend directory:**
   ```bash
   DB_HOST=127.0.0.1
   DB_PORT=5433
   DB_USER=postgres
   DB_PASSWORD=1234
   DB_NAME=camwa_db
   JWT_SECRET=mysecretkey
   GOOGLE_APPLICATION_CREDENTIALS=./backend/src/config/serviceAccountKey.json
   ```

6. **Start the backend server:**
   ```bash
   npm start
   ```
   The backend will run on **http://localhost:3000**.

---

### **Frontend Setup**

1. **Navigate to the frontend folder:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `environment.ts` in `src/environments/`:**
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

4. **Run the frontend server:**
   ```bash
   ng serve
   ```
   The frontend will be available at **http://localhost:4200**.

---

## **Running the Application**

1. **Start Docker:**
   ```bash
   docker-compose up -d
   ```

2. **Run the backend server:**
   ```bash
   cd backend
   npm start
   ```

3. **Run the frontend server:**
   ```bash
   cd frontend
   ng serve
   ```

4. **Access the application:**
   - **Frontend:** http://localhost:4200  
   - **Backend API:** http://localhost:3000/api

---

## **Project Structure**

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

---

## **API Documentation**

### **Endpoints:**

1. **Get All Students**  
   **GET** `/api/students`  
   - **Description:** Retrieves a list of all students.
   - **Response:**
     ```json
     [
       { "student_id": "S01", "name": "John Doe", "map_location": "Room A" }
     ]
     ```

2. **Add a New Student**  
   **POST** `/api/students`  
   - **Request:**
     ```json
     {
       "student_id": "S02",
       "name": "Jane Smith",
       "map_location": "Room B"
     }
     ```
   - **Response:**
     ```json
     { "message": "Student added successfully." }
     ```

3. **Update a Student**  
   **PUT** `/api/students/:id`  
   - **Request:**
     ```json
     { "name": "John Updated", "map_location": "Room C" }
     ```

4. **Delete a Student**  
   **DELETE** `/api/students/:id`  
   - **Response:**  
     ```json
     { "message": "Student deleted successfully." }
     ```

---

## **Contributing**

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

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---
