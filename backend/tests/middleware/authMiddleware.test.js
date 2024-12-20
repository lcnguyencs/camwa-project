import { authenticateJWT } from '../../src/middleware/authMiddleware.js';
import admin from '../../src/config/firebaseConfig.js';

jest.mock('../../src/config/firebaseConfig.js');

describe('authenticateJWT', () => {
  it('should authenticate user and attach user data to the request', async () => {
    const req = { headers: { authorization: 'Bearer firebase_token' } };
    const res = {};
    const next = jest.fn();
    const decodedToken = { uid: '123', email: 'john@example.com' };

    // Mocking the Firebase admin to return decoded token
    admin.auth().verifyIdToken.mockResolvedValue(decodedToken);

    await authenticateJWT(req, res, next);

    expect(req.user).toEqual({ uid: '123', email: 'john@example.com' });
    expect(next).toHaveBeenCalled();
  });

  it('should return 401 if token is missing or invalid', async () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    // Mocking the scenario where no token is present
    await authenticateJWT(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'No token provided' });
  });
});