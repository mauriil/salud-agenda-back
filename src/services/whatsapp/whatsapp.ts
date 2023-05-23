import { MyLogger } from 'src/modules/logger';
import { Client, LocalAuth } from 'whatsapp-web.js';

const logger = new MyLogger();
const client = new Client({
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
  authStrategy: new LocalAuth({ dataPath: '@whatsAppSession' }),
});
client.on('qr', (qr) => {
  // TODO: Send QR via email or SMS
  logger.log(`QR RECEIVED, ${qr}`, 'WhatsappService');
});

client.initialize();
logger.log('Whatsapp client initialized', 'WhatsappService');

export default client;
