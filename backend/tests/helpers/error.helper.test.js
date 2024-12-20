import { UnauthorizedError, NotFoundError } from '../../src/common/helpers/error.helper.js';

describe('Error helpers', () => {
  it('should create an UnauthorizedError with correct message', () => {
    const error = new UnauthorizedError('Unauthorized access');
    expect(error.statusCode).toBe(401);
    expect(error.message).toBe('Unauthorized access');
  });

  it('should create a NotFoundError with correct message', () => {
    const error = new NotFoundError('User not found');
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('User not found');
  });
});