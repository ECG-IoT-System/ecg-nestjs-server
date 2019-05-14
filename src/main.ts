import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cors from 'cors';

// check if cloud sql exist
import * as fs from 'fs';
const cloudSqlFolder = '/cloudsql/';
if (fs.existsSync(cloudSqlFolder)) {
  fs.readdirSync(cloudSqlFolder).forEach(file => {
    global.console.debug('DEBUG: Detect Cloud SQL File /cloudsql/' + file);
  });
}
else {
  global.console.debug('DEBUG: Cloud SQL File /cloudsql does not exist');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());

  const options = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .setSchemes('https')
  .addTag('cats')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.NODE_PORT || 3000);
}
bootstrap();
