import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './modules/logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import client from './services/whatsapp/whatsapp';
import helmet from 'helmet';
import { WhatsappService } from './services/whatsapp/whatsapp.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new MyLogger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(helmet({ contentSecurityPolicy: false }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useLogger(app.get(MyLogger));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Salud Agenda API Documentation')
    .setDescription('The Salud Agenda API endpoints and examples.')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const whatsappService = app.get(WhatsappService);

  client.on('ready', async () => {
    logger.log('Client is ready!', 'Main (Whatsapp))');
    whatsappService.sendMessage('5493804316087', 'Hello world!');
    await app.listen(3000);
  });

  client.on('message', (message) => {
    whatsappService.processMessage(message);
  });
}
bootstrap();
