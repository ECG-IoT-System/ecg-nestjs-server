import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

// check if cloud sql exist
import * as fs from 'fs';
const cloudSqlFolder = '/cloudsql/';
if (fs.existsSync(cloudSqlFolder)) {
  fs.readdirSync(cloudSqlFolder).forEach(file => {
    global.console.debug('DEBUG: Check Cloud SQL File /cloudsql/' + file);
  });
}
else {
  global.console.debug('DEBUG: Cloud SQL File /cloudsql does not exist');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(process.env.NODE_PORT || 3000);
}
bootstrap();
