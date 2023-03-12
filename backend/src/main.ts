import 'dotenv-defaults/config';
const mandatoryEnvironmentVariables = [
  'BACKEND_URL',
  'BACKEND_URL_ACCESS_KEY',
  'DATABASE_URL',
];
const missingEnvironmentVariables = mandatoryEnvironmentVariables.filter(
  (variable) => !process.env[variable],
);
if (missingEnvironmentVariables.length > 0) {
  console.error(
    `Environment variables [${missingEnvironmentVariables.join(
      ', ',
    )}] not defined, terminating...`,
  );
  process.exit(1);
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Currency Exchange APi')
    .setDescription('This is the currency exchange api description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
