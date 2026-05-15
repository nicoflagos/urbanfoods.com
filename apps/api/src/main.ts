import "dotenv/config";
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module.js";
import { env } from "./config/env.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  );
  await app.listen(env.PORT);
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${env.PORT}`);
}

bootstrap();
