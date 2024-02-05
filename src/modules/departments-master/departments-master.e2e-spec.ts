import * as request from 'supertest';
import { testAppInstance } from '../../../test/helpers/app.helpers';

describe('Departments (e2e)', () => {
  let app;
  beforeAll(async () => {
    // jest.setTimeout(600000);
    jest.useFakeTimers('legacy');
    app = await testAppInstance();
  });

  afterAll(async () => {
    app.close();
  });

  it('Guest user should not be able to access add departments', () => {
    return request(app.getHttpServer())
      .post('/api/departments')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
  });

  it('Guest user should not be able to get departments', () => {
    return request(app.getHttpServer()).get('/api/departments').expect(401);
  });

  it('Guest user should not be able to update departments', () => {
    return request(app.getHttpServer())
      .put('/api/departments/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
  });

  it('Guest user should not be able to delete departments', () => {
    return request(app.getHttpServer())
      .delete('/api/departments/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
  });
});
