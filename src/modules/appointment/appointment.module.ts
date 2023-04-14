import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { WhatsappService } from 'src/services/whatsapp/whatsapp.service';
import { Client } from 'whatsapp-web.js';
import { GoogleCalendarService } from 'src/services/google/google-calendar.service';
import { GoogleAuthService } from 'src/services/google/google-auth.service';
import { MercadoPagoService } from 'src/services/mercado-pago/mercado-pago.service';
import { MyLogger } from '../logger';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppointmentController],
  providers: [
    AppointmentService,
    WhatsappService,
    Client,
    GoogleCalendarService,
    GoogleAuthService,
    MercadoPagoService,
    MyLogger,
  ],
})
export class AppointmentModule {}
