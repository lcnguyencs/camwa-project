import { responseError } from "./response.helper.js";

// Error handler middleware
// Error handler middleware
export const handlerError = (err, req, res, next) => {
   console.error('Error occurred:', err);
   
   // Handle different types of errors
   if (err instanceof BaseError) {
       const resData = responseError(err.message, err.code);
       return res.status(resData.code).json(resData);
   }

   // Handle Sequelize specific errors
   if (err.name === 'SequelizeValidationError') {
       const resData = responseError('Validation error', 400);
       return res.status(400).json(resData);
   }

   if (err.name === 'SequelizeUniqueConstraintError') {
       const resData = responseError('Duplicate entry', 409);
       return res.status(409).json(resData);
   }

   // Default error response
   const resData = responseError(err.message || 'Internal Server Error', err.code || 500);
   return res.status(resData.code).json(resData);
};

// Base Error Class
export class BaseError extends Error {
   constructor(message, code) {
       super(message);
       this.code = code;
   }
}

// Custom Error Classes
export class BadRequestError extends BaseError {
   constructor(message = "Bad Request") {
       super(message, 400);
   }
}

export class UnauthorizedError extends BaseError {
   constructor(message = "Unauthorized Access") {
       super(message, 401);
   }
}

export class NotFoundError extends BaseError {
   constructor(message = "Resource Not Found") {
       super(message, 404);
   }
}

export class ForbiddenError extends BaseError {
   constructor(message = "Access Forbidden") {
       super(message, 403);
   }
}

export class ValidationError extends BaseError {
   constructor(message = "Validation Failed") {
       super(message, 422);
   }
}

export class ConflictError extends BaseError {
   constructor(message = "Resource Conflict") {
       super(message, 409);
   }
}

export class DatabaseError extends BaseError {
   constructor(message = "Database Error") {
       super(message, 500);
   }
}

