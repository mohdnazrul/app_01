import request from 'supertest';
import app from '../app';

describe('User Endpoints', () => {
  describe('GET /api/users', () => {
    it('should return 401 if no token is provided', async () => {
      const response = await request(app).get('/api/users');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'No token provided');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return 401 if no token is provided', async () => {
      const response = await request(app).get('/api/users/123');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'No token provided');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should return 401 if no token is provided', async () => {
      const response = await request(app).put('/api/users/123').send({
        name: 'Updated Name',
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'No token provided');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should return 401 if no token is provided', async () => {
      const response = await request(app).delete('/api/users/123');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'No token provided');
    });
  });
});
