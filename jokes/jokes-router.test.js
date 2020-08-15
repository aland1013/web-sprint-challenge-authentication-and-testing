const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

describe('jokes-router.js', () => {
  describe('GET /', () => {
    let token = '';
    let res = {};

    beforeAll(async () => {
      await db('users').truncate();

      await db('users').truncate();

      await request(server)
        .post('/api/auth/register')
        .send({ username: 'user', password: 'password' });

      const user = await request(server).post('/api/auth/login').send({
        username: 'user',
        password: 'password'
      });

      token = user.body.token;

      res = await request(server)
        .get('/api/jokes')
        .set('Authorization', `Bearer ${token}`);
    });

    it('should return 200', async () => {
      expect(res.status).toBe(200);
    });

    it('should return a JSON object', () => {
      expect(res.type).toBe('application/json');
    });

    it('should return an array', () => {
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
