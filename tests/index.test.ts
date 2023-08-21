import request from 'supertest';
import { app } from '../src/index';

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  }, 10000); // 10 second timeout as image generation takes a while
});