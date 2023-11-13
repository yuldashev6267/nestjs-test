import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

// configure env
dotenv.config({ path: '.env' });

const redisPort: string = process.env.REDIS_PORT;
const redisHost: string = process.env.REDIS_HOST;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8000);
}

bootstrap();
