import * as request from 'supertest';
import { testAppInstance } from '../../../test/helpers/app.helpers';

describe('Posts (e2e)', () => {
  let app;
  beforeAll(async () => {
    // jest.setTimeout(600000);
    jest.useFakeTimers('legacy');
    app = await testAppInstance();
  });

  afterAll(async () => {
    app.close();
  });

  it('Guest user should not be able to access add posts', () => {
    return request(app.getHttpServer())
      .post('/api/posts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
  });

  it('Guest user should not be able to get posts', () => {
    return request(app.getHttpServer())
      .get('/api/posts?page=1&perPage=10')
      .expect(401);
  });

  it('Guest user should not be able to get me posts', () => {
    return request(app.getHttpServer())
      .get('/api/posts/me?page=1&perPage=10')
      .expect(401);
  });

  it('Guest user should not be able to get posts by id', () => {
    return request(app.getHttpServer()).get('/api/posts/1').expect(401);
  });

  it('Guest user should not be able to update posts', () => {
    return request(app.getHttpServer())
      .put('/api/posts/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
  });

  it('Guest user should not be able to access add posts accept', () => {
    return request(app.getHttpServer())
      .post('/api/posts/1/accept')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
  });

  it('Guest user should not be able to get posts accept', () => {
    return request(app.getHttpServer()).get('/api/posts/1/accept').expect(401);
  });

  it('Guest user should not be able to access add posts rating', () => {
    return request(app.getHttpServer())
      .post('/api/posts/1/rating')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
  });
});
