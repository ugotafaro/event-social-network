import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
        ],
        queue: 'auth_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  app
    .listen()
    .then(() => console.log('Microservice is listening'))
    .catch((err) => {
      console.error('Error starting microservice', err);
      setTimeout(bootstrap, 5000); // Retry after 5 seconds
    });
}
bootstrap();
