const notification = {
    "/notification/create": {
      post: {
        security: [{ BearerAuth: [] }],
        tags: ["Notification"],
        summary: "Create a new notification (Admin or Faculty Assistant)",
        responses: {
          200: { description: "Notification created successfully" },
          401: { description: "Unauthorized" },
        },
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  receiver_email: { type: "string", description: "Email of the notification receiver" },
                  content: { type: "string", description: "Content of the notification" },
                  notification_type: { type: "string", description: "Type of notification" },
                },
                required: ["receiver_email", "content"],
              },
            },
          },
        },
      },
    },
  
    "/notification/student/{userId}": {
      get: {
        security: [{ BearerAuth: [] }],
        tags: ["Notification"],
        summary: "Retrieve notifications for a student",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID of the student",
          },
        ],
        responses: {
          200: { description: "List of notifications for the student" },
          401: { description: "Unauthorized" },
        },
      },
    },
  
    "/notification/lecturer/{userId}": {
      get: {
        security: [{ BearerAuth: [] }],
        tags: ["Notification"],
        summary: "Retrieve notifications for a lecturer",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID of the lecturer",
          },
        ],
        responses: {
          200: { description: "List of notifications for the lecturer" },
          401: { description: "Unauthorized" },
        },
      },
    },
  
    "/notification/{userRole}/{notificationId}/read": {
      put: {
        security: [{ BearerAuth: [] }],
        tags: ["Notification"],
        summary: "Mark a notification as read",
        parameters: [
          {
            name: "userRole",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Role of the user (student, lecturer, etc.)",
          },
          {
            name: "notificationId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID of the notification to mark as read",
          },
        ],
        responses: {
          200: { description: "Notification marked as read successfully" },
          401: { description: "Unauthorized" },
        },
      },
    },
  
    "/notification/{userRole}/{notificationId}": {
      put: {
        security: [{ BearerAuth: [] }],
        tags: ["Notification"],
        summary: "Update a notification (Admin or Faculty Assistant)",
        parameters: [
          {
            name: "userRole",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Role of the user (student, lecturer, etc.)",
          },
          {
            name: "notificationId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID of the notification to update",
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  content: { type: "string", description: "Updated content of the notification" },
                  notification_type: { type: "string", description: "Updated type of the notification" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Notification updated successfully" },
          401: { description: "Unauthorized" },
        },
      },
      delete: {
        security: [{ BearerAuth: [] }],
        tags: ["Notification"],
        summary: "Delete a notification (Admin or Faculty Assistant)",
        parameters: [
          {
            name: "userRole",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Role of the user (student, lecturer, etc.)",
          },
          {
            name: "notificationId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID of the notification to delete",
          },
        ],
        responses: {
          200: { description: "Notification deleted successfully" },
          401: { description: "Unauthorized" },
        },
      },
    },
  };
  
  export default notification;
  