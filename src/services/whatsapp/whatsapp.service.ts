import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/modules/logger';
import { Client, Message } from 'whatsapp-web.js';
const logger = new MyLogger();
@Injectable()
export class WhatsappService {
  sendMessage(client: Client, chatId: string, message: string) {
    try {
      client.sendMessage(chatId, message);
    } catch (error) {
      logger.error(error, 'WhatsappService');
    }
  }
  processMessage(message: Message) {
    try {
      // TODO: Do something with the message
    } catch (error) {
      logger.error(error, 'WhatsappService');
    }
  }
}
