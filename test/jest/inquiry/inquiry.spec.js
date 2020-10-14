const request = require('supertest');
const app = require('../../../index');

describe('Inquiry Router', () => {
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
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
