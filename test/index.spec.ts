import request from 'supertest';
import app from '../src/index';

describe('Index test', () => {
  let r: { status: any; }, server: any, agent: any;
  // eslint-disable-next-line jest/no-done-callback
  beforeAll((done) => {
    server = app.listen(7000, () => {
      agent = request.agent(server);
      return done();
    });
  });
  // eslint-disable-next-line jest/no-done-callback

  // eslint-disable-next-line jest/no-done-callback
  afterAll((done) => server && server.close(done));
  it('should return 500 error', async () => {
    r = await agent
      .delete('/bogus')
      .set({ origin: 'bogus' })
      .set('authorization', 'Bearer ');
    expect(r.status).toBe(500);
  });
  it('should wait unit tests finish before exiting', async () => { // eslint-disable-line jest/expect-expect
    const delay = (ms: number) => new Promise((resolve) => setTimeout(() => resolve(true), ms));
    await delay(4000);
  });
});
