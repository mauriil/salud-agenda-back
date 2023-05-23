import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/modules/logger';
import { Message } from 'whatsapp-web.js';
import client from '../../services/whatsapp/whatsapp';
const logger = new MyLogger();
@Injectable()
export class WhatsappService {
  sendMessage(phoneNumber: string, message: string) {
    logger.log(`Sending message to ${phoneNumber}`, 'WhatsappService');
    try {
      client.sendMessage(`${phoneNumber}@c.us`, message);
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
