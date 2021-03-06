import request from 'supertest';
import app from '../../../src/index';

describe('Inquiry Router', () => {
  afterAll(async () => {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
  });

  // r = request
  let r;

  it('sends an email', async () => {
    r = await request(app)
      .post('/inquiry')
      .send({ email: 'yo@yo.com' });
    expect(r.status).toBe(200);
  });
});
