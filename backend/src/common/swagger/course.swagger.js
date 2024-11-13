const course = {
    "/course/create": {
      post: {
        security: [{ BearerAuth: [] }],
        tags: ["Course"],
        summary: "Create a new course (Admin only)",
        responses: {
          200: { description: "Course created successfully" },
          401: { description: "Unauthorized" },
        },
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  courseName: { type: "string", description: "Name of the course" },
                  description: { type: "string", description: "Description of the course" },
                },
                required: ["courseName"],
              },
            },
          },
        },
      },
    },
  
    "/course/{courseId}": {
      put: {
        security: [{ BearerAuth: [] }],
        tags: ["Course"],
        summary: "Update a course (Admin/Faculty Assistant)",
        parameters: [
          {
            name: "courseId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID of the course to update",
          },
        ],
        responses: {
          200: { description: "Course updated successfully" },
          401: { description: "Unauthorized" },
        },
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  courseName: { type: "string", description: "Updated name of the course" },
                  description: { type: "string", description: "Updated description of the course" },
                },
              },
            },
          },
        },
      },
      delete: {
        security: [{ BearerAuth: [] }],
        tags: ["Course"],
        summary: "Delete a course (Admin only)",
        parameters: [
          {
            name: "courseId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID of the course to delete",
          },
        ],
        responses: {
          200: { description: "Course deleted successfully" },
          401: { description: "Unauthorized" },
        },
      },
    },
  
    "/course/{intakeModuleId}/assign-lecturer": {
      put: {
        security: [{ BearerAuth: [] }],
        tags: ["Course"],
        summary: "Assign a lecturer to an intake module (Faculty Assistant only)",
        parameters: [
          {
            name: "intakeModuleId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID of the intake module",
          },
        ],
        responses: {
          200: { description: "Lecturer assigned to intake module successfully" },
          401: { description: "Unauthorized" },
        },
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  lecturerId: { type: "string", description: "ID of the lecturer" },
                },
                required: ["lecturerId"],
              },
            },
          },
        },
      },
    },
  
    "/course/{intakeModuleId}/assign-students": {
      put: {
        security: [{ BearerAuth: [] }],
        tags: ["Course"],
        summary: "Assign students to an intake module (Faculty Assistant only)",
        parameters: [
          {
            name: "intakeModuleId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID of the intake module",
          },
        ],
        responses: {
          200: { description: "Students assigned to intake module successfully" },
          401: { description: "Unauthorized" },
        },
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  studentIds: {
                    type: "array",
                    items: { type: "string" },
                    description: "Array of student IDs to assign",
                  },
                },
                required: ["studentIds"],
              },
            },
          },
        },
      },
    },
  
    "/course/{intakeModuleId}/classes": {
      post: {
        security: [{ BearerAuth: [] }],
        tags: ["Course"],
        summary: "Create classes for an intake module (Faculty Assistant only)",
        parameters: [
          {
            name: "intakeModuleId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID of the intake module",
          },
        ],
        responses: {
          200: { description: "Classes created for intake module successfully" },
          401: { description: "Unauthorized" },
        },
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  classData: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        className: { type: "string", description: "Name of the class" },
                        schedule: { type: "string", description: "Schedule for the class" },
                      },
                    },
                  },
                },
                required: ["classData"],
              },
            },
          },
        },
      },
    },
  
    "/course/{intakeModuleId}/export-report": {
      get: {
        security: [{ BearerAuth: [] }],
        tags: ["Course"],
        summary: "Export report for an intake module (Faculty Assistant only)",
        parameters: [
          {
            name: "intakeModuleId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID of the intake module",
          },
        ],
        responses: {
          200: { description: "Report exported successfully" },
          401: { description: "Unauthorized" },
        },
      },
    },
  };
  
  export default course;
  