import * as request from 'supertest';
import { testAppInstance } from '../../../test/helpers/app.helpers';

describe('Users (e2e)', () => {
  let app;
  beforeAll(async () => {
    // jest.setTimeout(600000);
    jest.useFakeTimers('legacy');
    app = await testAppInstance();
  });

  afterAll(async () => {
    app.close();
  });

  it('Guest user should not be able to get profile', () => {
    return request(app.getHttpServer()).get('/api/users/profile').expect(401);
  });

  it('Guest user should not be able to get user', () => {
    return request(app.getHttpServer()).get('/api/users').expect(401);
  });

  it('Guest user should not be able to get user by id', () => {
    return request(app.getHttpServer()).get('/api/users/1').expect(401);
  });

  it('Guest user should not be able to update profile', () => {
    return request(app.getHttpServer())
      .put('/api/users/profile')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
  });

  it('Guest user should not be able to update password', () => {
    return request(app.getHttpServer())
      .put('/api/users/change-password')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
  });

  it('Guest user should not be able to delete user', () => {
    return request(app.getHttpServer())
      .delete('/api/users/3')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
  });
});
