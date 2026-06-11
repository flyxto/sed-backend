const request = require('supertest');
const { app, server } = require('../../src/index');

describe('Health Check', () => {
  afterAll((done) => {
    server.close(done);
  });

  it('GET /health should return 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('GET / should return 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});
