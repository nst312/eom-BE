import * as request from 'supertest';
import { testAppInstance } from '../../../test/helpers/app.helpers';

describe('Salaries (e2e)', () => {
  let app;
  beforeAll(async () => {
    // jest.setTimeout(600000);
    jest.useFakeTimers('legacy');
    app = await testAppInstance();
  });

  afterAll(async () => {
    app.close();
  });

  it('Guest user should not be able to get salaries', () => {
    return request(app.getHttpServer()).get('/api/salaries').expect(401);
  });

  it('Guest user should not be able to send salary slip', () => {
    return request(app.getHttpServer())
      .post('/api/salaries/sendSalarySlip/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
  });

  it('Guest user should not be able to get salaries by employee id', () => {
    return request(app.getHttpServer()).get('/api/salaries/1').expect(401);
  });

  it('Guest user should not be able to access add salary API', () => {
    return request(app.getHttpServer())
      .post('/api/salaries/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
  });

  it('Guest user should not be able to update salary', () => {
    return request(app.getHttpServer())
      .put('/api/salaries/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
  });
});
