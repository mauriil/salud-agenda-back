import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { WhatsappService } from './services/whatsapp/whatsapp.service';
import { MercadoPagoService } from './services/mercado-pago/mercado-pago.service';
import { MyLogger } from './modules/logger';
import { Client } from 'whatsapp-web.js';
import { GoogleModule } from './modules/google/google.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PatientsModule } from './modules/patients/patients.module';
import { HealthCenterModule } from './modules/health-center/health-center.module';
import { PatientHistoryModule } from './modules/patient-history/patient-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: () => ({ uri: process.env.MONGO_URI }),
    }),
    AppointmentModule,
    GoogleModule,
    UsersModule,
    AuthModule,
    AppointmentModule,
    HealthCenterModule,
    PatientsModule,
    PatientHistoryModule,
  ],
  controllers: [],
  providers: [MyLogger, WhatsappService, Client, MercadoPagoService],
})
export class AppModule {}
