import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { WhatsappService } from 'src/services/whatsapp/whatsapp.service';
import { Client } from 'whatsapp-web.js';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService, WhatsappService, Client],
})
export class AppointmentModule {}
