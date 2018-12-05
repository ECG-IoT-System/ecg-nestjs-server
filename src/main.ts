import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

try {
  const testFolder = '/cloudsql/';
  const fs = require('fs');

  console.log("---cloudsql----")
  fs.readdirSync(testFolder).forEach(file => {
    console.log(file);
  })
}
catch {
  console.log("---cloudsql error----")
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(process.env.NODE_PORT || 3000);
}
bootstrap();
