import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { API_PREFIX } from './shared/constants/global.constants';
import { InvalidFormExceptionFilter } from './filters/invalid.form.exception.filter';
import { PrismaInterceptor } from './interceptors/prisma.interceptor';
import { ConfigService } from '@nestjs/config';
import { SwaggerConfig } from './configs/config.interface';
import { MyLogger } from './modules/logger/logger.service';
import { GLOBAL_CONFIG } from './configs/global.config';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalFilters(
    // TODO: uncomment when ready
    // new GlobalExceptionFilter(),

    new InvalidFormExceptionFilter(),
  );
  app.useGlobalInterceptors(new PrismaInterceptor());
  app.use('/images', express.static('images'));
  // console.log('app', app.use);
  const configService = app.get<ConfigService>(ConfigService);
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  // Swagger Api
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'EOM')
      .setDescription(swaggerConfig.description || 'The EOM API description')
      .setVersion(swaggerConfig.version || '1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
    // fs.writeFileSync('./swagger.json', JSON.stringify(document));
    // SwaggerModule.setup('/api', app, document);
  }

  const PORT = process.env.PORT || GLOBAL_CONFIG.nest.port;
  await app.listen(PORT, async () => {
    const myLogger = await app.resolve(MyLogger);
    myLogger.log(`Server started listening: ${PORT}`);
  });
}
bootstrap();
