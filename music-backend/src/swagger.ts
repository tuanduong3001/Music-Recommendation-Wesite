import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Test')
  .setDescription('test nestjs')
  .setVersion('1.0')
  .addTag('Test')
  .addBearerAuth()
  .build();

  export const initSwapper = (app:NestExpressApplication) => {
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)
  }