import { testAppInstance } from './app.helpers';
import * as request from 'supertest';

export async function loginAsUser() {
  const app = await testAppInstance();

  const response = await request(app.getHttpServer())
    .post('/api/auth/login')
    .send({ email: 'shyam@ghanshyamdigital.com', password: 'Karan123#' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/);

  return { app, token: response.body.accessToken };
}
