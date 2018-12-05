import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

const testFolder = '/cloudsql/';
const fs = require('fs');

fs.readdirSync(testFolder).forEach(file => {
  console.log(file);
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(process.env.NODE_PORT || 3000);
}
bootstrap();
