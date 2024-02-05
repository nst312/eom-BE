import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/modules/app/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { API_PREFIX } from '../../src/shared/constants/global.constants';
import { InvalidFormExceptionFilter } from '../../src/filters/invalid.form.exception.filter';
import { PrismaInterceptor } from '../../src/interceptors/prisma.interceptor';

export async function testAppInstance() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  const app: INestApplication = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalFilters(new InvalidFormExceptionFilter());
  app.useGlobalInterceptors(new PrismaInterceptor());
  await app.init();
  return app;
}
