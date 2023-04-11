import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './modules/logger';
import client from './services/whatsapp/whatsapp';
import { WhatsappService } from './services/whatsapp/whatsapp.service';

async function bootstrap() {
  const logger = new MyLogger();
  const app = await NestFactory.create(AppModule);
  const whatsappService = app.get(WhatsappService);

  client.on('ready', async () => {
    logger.log('Client is ready!', 'Main');
    whatsappService.sendMessage('5493804316087@c.us', 'Hello world!');
    await app.listen(3000);
  });

  client.on('message', (message) => {
    whatsappService.processMessage(message);
  });
}
bootstrap();
