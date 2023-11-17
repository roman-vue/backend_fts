import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  static ConfigSwaggerModule(app: INestApplication): void {
    const version = 'v0.0.0';
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('TASK Service')
      .setVersion(`${version}`)
      .build();
    Logger.verbose(version);
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/fts/docs', app, document, {
      swaggerOptions: {
        filter: true,
        showRequestDuration: true,
      },
    });
  }
}
