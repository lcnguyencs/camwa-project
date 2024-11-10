const attendance = {
    "/attendance/create": {
      post: {
        security: [{ BearerAuth: [] }],
        tags: ["Attendance"],
        summary: "Create a new attendance record",
        responses: {
          200: { description: "Attendance created successfully" },
          401: { description: "Unauthorized" },
        },
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  studentId: { type: "string" },
                  date: { type: "string", format: "date" },
                  status: { type: "string", enum: ["present", "absent", "excused"] },
                },
                required: ["studentId", "date", "status"],
              },
            },
          },
        },
      },
    },
  
    "/attendance/view": {
      get: {
        security: [{ BearerAuth: [] }],
        tags: ["Attendance"],
        summary: "View attendance records",
        responses: {
          200: { description: "List of attendance records" },
          401: { description: "Unauthorized" },
        },
      },
    },
  
    "/attendance/{attendanceId}": {
      put: {
        security: [{ BearerAuth: [] }],
        tags: ["Attendance"],
        summary: "Update an attendance record",
        parameters: [
          {
            name: "attendanceId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID of the attendance record to update",
          },
        ],
        responses: {
          200: { description: "Attendance updated successfully" },
          401: { description: "Unauthorized" },
        },
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string", enum: ["present", "absent", "excused"] },
                },
                required: ["status"],
              },
            },
          },
        },
      },
      delete: {
        security: [{ BearerAuth: [] }],
        tags: ["Attendance"],
        summary: "Delete an attendance record",
        parameters: [
          {
            name: "attendanceId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID of the attendance record to delete",
          },
        ],
        responses: {
          200: { description: "Attendance deleted successfully" },
          401: { description: "Unauthorized" },
        },
      },
    },
  
    "/attendance/eligibility/calculate": {
      get: {
        security: [{ BearerAuth: [] }],
        tags: ["Attendance"],
        summary: "Calculate eligibility for exams",
        responses: {
          200: { description: "Eligibility calculated successfully" },
          401: { description: "Unauthorized" },
        },
      },
    },
  
    "/attendance/eligibility/status": {
      get: {
        security: [{ BearerAuth: [] }],
        tags: ["Attendance"],
        summary: "View exam eligibility status",
        responses: {
          200: { description: "Exam eligibility status retrieved successfully" },
          401: { description: "Unauthorized" },
        },
      },
    },
  
    "/attendance/student/correction": {
      post: {
        security: [{ BearerAuth: [] }],
        tags: ["Attendance"],
        summary: "Request attendance correction",
        responses: {
          200: { description: "Correction request submitted successfully" },
          401: { description: "Unauthorized" },
        },
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  attendanceId: { type: "string" },
                  reason: { type: "string" },
                },
                required: ["attendanceId", "reason"],
              },
            },
          },
        },
      },
    },
  
    "/attendance/correction/{requestId}": {
      put: {
        security: [{ BearerAuth: [] }],
        tags: ["Attendance"],
        summary: "Handle an attendance correction request",
        parameters: [
          {
            name: "requestId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID of the correction request to handle",
          },
        ],
        responses: {
          200: { description: "Correction request handled successfully" },
          401: { description: "Unauthorized" },
        },
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string", enum: ["approved", "denied"] },
                },
                required: ["status"],
              },
            },
          },
        },
      },
    },
  };
  
  export default attendance;
  