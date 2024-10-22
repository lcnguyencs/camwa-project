import { responseError } from "./response.helper.js";

// Error handler middleware
export const handlerError = (err, req, res, next) => {
   console.error('Error occurred:', err);
   const resData = responseError(err, err.code || 500); // Default to 500 if code is not specified
   res.status(resData.code).json(resData);
};

// Custom Error Classes
export class BadRequestError extends Error {
   constructor(message = "Bad Request") {
      super(message);
      this.code = 400;
   }
}

export class UnauthorizedError extends Error {
   constructor(message = "Unauthorized Access") {
      super(message);
      this.code = 401;
   }
}

export class NotFoundError extends Error {
   constructor(message = "Resource Not Found") {
      super(message);
      this.code = 404;
   }
}

export class ForbiddenError extends Error {
   constructor(message = "Access Forbidden") {
      super(message);
      this.code = 403;
   }
}
