import { NestFactory } from '@nestjs/core';
import { EventsModule } from './events.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EventsModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka:9093'],
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
