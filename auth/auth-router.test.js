const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

describe('auth-router.test.js', () => {
  it('should set up testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });
});

describe('POST /register', () => {
  let res = {};

  beforeAll(async () => {
    await db('users').truncate();

    res = await request(server).post('/api/auth/register').send({
      username: 'user',
      password: 'password'
    });
  });

  it('should return 201', () => {
    expect(res.status).toBe(201);
  });

  it('should return a JSON object', () => {
    expect(res.type).toBe('application/json');
  });
});

describe('POST /login', () => {
  let res = {};

  beforeAll(async () => {
    await db('users').truncate();

    await request(server)
      .post('/api/auth/register')
      .send({ username: 'user', password: 'password' });

    res = await request(server).post('/api/auth/login').send({
      username: 'user',
      password: 'password'
    });
  });

  it('should return 200', () => {
    expect(res.status).toBe(200);
  });

  it('should return a JSON object', () => {
    expect(res.type).toBe('application/json');
  });
});
