import * as request from 'supertest';
import { testAppInstance } from '../../../test/helpers/app.helpers';

describe('Employees (e2e)', () => {
  let app;
  beforeAll(async () => {
    // jest.setTimeout(600000);
    jest.useFakeTimers('legacy');
    app = await testAppInstance();
  });

  afterAll(async () => {
    app.close();
  });

  it('Guest user should not be able to get employees', () => {
    return request(app.getHttpServer())
      .get('/api/employees?search=asdasd')
      .expect(401);
  });

  it('Guest user should not be able to get employees by id', () => {
    return request(app.getHttpServer()).get('/api/employees/1').expect(401);
  });

  it('Guest user should not be able to update employees', () => {
    return request(app.getHttpServer())
      .put('/api/employees/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
  });
});
