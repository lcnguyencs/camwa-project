const auth = {
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "User login with Firebase authentication",
        responses: {
          200: { description: "Successfully logged in" },
          401: { description: "Unauthorized" },
        },
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", description: "User's email" },
                  password: { type: "string", description: "User's password" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
      },
    },
  
    "/auth/refresh-token": {
      post: {
        tags: ["Auth"],
        summary: "Refresh the access token",
        responses: {
          200: { description: "Token refreshed successfully" },
          401: { description: "Unauthorized" },
        },
      },
    },
  
    "/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Log out the user",
        responses: {
          200: { description: "Successfully logged out" },
        },
      },
    },
  
    "/auth/create-user": {
      post: {
        security: [{ BearerAuth: [] }],
        tags: ["Auth"],
        summary: "Admin creates a new user",
        responses: {
          200: { description: "User created successfully" },
          401: { description: "Unauthorized" },
        },
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", description: "New user's email" },
                  password: { type: "string", description: "New user's password" },
                  role: { type: "string", description: "Role assigned to the new user" },
                },
                required: ["email", "password", "role"],
              },
            },
          },
        },
      },
    },
  
    "/auth/admin-dashboard": {
      get: {
        security: [{ BearerAuth: [] }],
        tags: ["Auth"],
        summary: "Access admin dashboard",
        responses: {
          200: { description: "Welcome to the admin dashboard" },
          401: { description: "Unauthorized" },
        },
      },
    },
  
    "/auth/faculty-assistant-dashboard": {
      get: {
        security: [{ BearerAuth: [] }],
        tags: ["Auth"],
        summary: "Access faculty assistant dashboard",
        responses: {
          200: { description: "Welcome to the faculty assistant dashboard" },
          401: { description: "Unauthorized" },
        },
      },
    },
  
    "/auth/lecturer-dashboard": {
      get: {
        security: [{ BearerAuth: [] }],
        tags: ["Auth"],
        summary: "Access lecturer dashboard",
        responses: {
          200: { description: "Welcome to the lecturer dashboard" },
          401: { description: "Unauthorized" },
        },
      },
    },
  
    "/auth/student-dashboard": {
      get: {
        security: [{ BearerAuth: [] }],
        tags: ["Auth"],
        summary: "Access student dashboard",
        responses: {
          200: { description: "Welcome to the student dashboard" },
          401: { description: "Unauthorized" },
        },
      },
    },
  };
  
  export default auth;
  