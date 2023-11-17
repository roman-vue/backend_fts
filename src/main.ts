import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './settings/filter';
import {
  LoggingInterceptor,
  TimeoutInterceptor,
} from './settings/interceptors';
import { LoggerService } from './settings/logger';
import { SwaggerConfig } from './settings/swagger';
import { ResponseInterceptor } from './settings/interceptors/response';

async function bootstrap() {
  const logger = new LoggerService();

  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(
    new LoggingInterceptor(logger),
    new ResponseInterceptor(),
    new TimeoutInterceptor(),
  );
  app.useGlobalFilters(new AllExceptionFilter(logger));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setGlobalPrefix('api/v1/fts/');
  SwaggerConfig.ConfigSwaggerModule(app);
  const port = 3000;
  await app.listen(port, () => {
    logger.log('APP', `Cirugia is running on http://localhost:${port}`);
    logger.debug(
      'APP',
      `Swagger is running on http://localhost:${port}/api/v1/fts/docs`,
    );
  });
}
bootstrap();
