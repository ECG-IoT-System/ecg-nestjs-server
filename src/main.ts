import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

const testFolder = './tests/';
const fs = require('fs');

fs.readdir('/cloudsql', (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(process.env.NODE_PORT || 3000);
}
bootstrap();
