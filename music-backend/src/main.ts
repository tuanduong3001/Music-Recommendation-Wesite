import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from '@nestjs/config'
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initSwapper } from './swagger';
import * as cookieParser from 'cookie-parser';
import { BadRequestException, ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { useContainer, ValidationError } from 'class-validator';
import { normalizeValidationError } from './modules/common/utility/exception.utility';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService);
  app.useStaticAssets(path.join(__dirname, './', 'assets'), {
    prefix: '/public/', 
  });  
  app.setGlobalPrefix('api');  
  app.use(cookieParser());  
  initSwapper(app); 
  app.useGlobalPipes( new ValidationPipe({
    transform: true,
    exceptionFactory: (errors: ValidationError[]) => {
      if (errors.length > 0) throw new BadRequestException(normalizeValidationError(errors));
    },
  }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors(); 
  await app.listen(configService.get('PORT'));
}
bootstrap(); 
  