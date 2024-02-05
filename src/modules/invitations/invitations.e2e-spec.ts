import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app/app.module';
import { loginAsUser } from '../../../test/helpers/auth.helpers';
import { testAppInstance } from '../../../test/helpers/app.helpers';

describe('Invitation (e2e)', () => {
  let app;
  beforeAll(async () => {
    // jest.setTimeout(600000);
    jest.useFakeTimers('legacy');
    app = await testAppInstance();
  });

  afterAll(async () => {
    app.close();
  });

  it('/validate (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/invitations/validate/erewru2323werw12werer234r')
      .expect(400);
  });

  it('Guest user should not be able to invite', () => {
    return request(app.getHttpServer())
      .post('/api/invitations/employee')
      .expect(401);
  });

  it('Guest user should not be able to resend invite', () => {
    return request(app.getHttpServer())
      .put('/api/invitations/resend/5')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
  });

  it('Guest user should not be able to delete invitation', () => {
    return request(app.getHttpServer())
      .delete('/api/invitations/delete/3')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
  });
});

describe('Invitation Logged in user (e2e)', () => {
  // const agent = request;
  let app;
  let token;

  beforeAll(async () => {
    // jest.setTimeout(6000000);
    // jest.useFakeTimers('legacy');
    const response = await loginAsUser();
    app = response.app;
    token = response.token;
  });

  afterAll(async () => {
    app.close();
    token = null;
  });

  it('Company Admin should be able to invite', async () => {
    const email = 'gopal@ghanshyamdigital.com';
    const response = await request(app.getHttpServer())
      .post('/api/invitations/employee')
      .auth(token, { type: 'bearer' })
      .send({
        firstName: 'Gopal',
        lastName: 'Patel',
        email,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    expect(response.body.id).toEqual(2);
    expect(response.body.email).toEqual(email);
    expect(response.body.company_id).toEqual(1);
    expect(response.body.deletedAt).toBeFalsy();
    return response;
  });

  it('Company Admin should be able to resend invite', async () => {
    const response = await request(app.getHttpServer())
      .put('/api/invitations/resend/1')
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.id).toEqual(1);
    // expect(response.body.token).toEqual('somerandomstringtoken');
    expect(response.body.email).toEqual('newuser@ghanshyamdigital.com');
    expect(response.body.company_id).toEqual(1);
    expect(response.body.deletedAt).toBeFalsy();
    return response;
  });

  it('Company Admin should not be able to validate token', () => {
    return request(app.getHttpServer())
      .get('/api/invitations/validate/erewru2323werw12werer234r')
      .auth(token, { type: 'bearer' })
      .expect(401);
  });

  it('Company Admin should not be able to Accept token', () => {
    return request(app.getHttpServer())
      .post('/api/invitations/accept/erewru2323werw12werer234r')
      .auth(token, { type: 'bearer' })
      .expect(401);
  });

  it('Company Admin should be able to delete invitation', async () => {
    const response = await request(app.getHttpServer())
      .delete('/api/invitations/delete/1')
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.id).toEqual(1);
    expect(response.body.email).toEqual('newuser@ghanshyamdigital.com');
    expect(response.body.company_id).toEqual(1);
    expect(response.body.deletedAt).toBeTruthy();
    return response;
  });
});
