import { testAppInstance } from '../../../test/helpers/app.helpers';
import * as request from 'supertest';

describe('Addresses (e2e)', () => {
  let app;
  beforeAll(async () => {
    // jest.setTimeout(600000);
    jest.useFakeTimers('legacy');
    app = await testAppInstance();
  });

  afterAll(async () => {
    app.close();
  });

  it('Guest user should not be able to access add address API', () => {
    return request(app.getHttpServer())
      .post('/api/company/address')
      .expect(401);
  });

  it('Guest user should not be able to Single get address', () => {
    return request(app.getHttpServer())
      .get('/api/company/address/1')
      .expect(401);
  });

  it('Guest user should not be able to get address', () => {
    return request(app.getHttpServer()).get('/api/company/address').expect(401);
  });

  it('Guest user should not be able to update address', () => {
    return request(app.getHttpServer())
      .put('/api/company/address/1')
      .expect(401);
  });

  it('Guest user should not be able to delete address', () => {
    return request(app.getHttpServer())
      .delete('/api/company/address/1')
      .expect(401);
  });
});
