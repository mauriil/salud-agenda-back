import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Client, LocalAuth } from 'whatsapp-web.js';
import { MyLogger } from './modules/logger';

async function bootstrap() {
  const logger = new MyLogger();
  const client = new Client({
    puppeteer: {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
    authStrategy: new LocalAuth({ dataPath: './whatsAppSession' }),
  });
  client.on('qr', (qr) => {
    logger.log(`QR RECEIVED, ${qr}`, 'Main');
  });

  client.on('message', (message) => {
    console.log('message:', JSON.stringify(message));
    console.log(message.body);
  });

  client.initialize();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
