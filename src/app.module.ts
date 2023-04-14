import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ModulesModule } from './modules/modules.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthCenterModule } from './modules/health-center/health-center.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { WhatsappService } from './services/whatsapp/whatsapp.service';
import { MercadoPagoService } from './services/mercado-pago/mercado-pago.service';
import { MyLogger } from './modules/logger';
import { Client } from 'whatsapp-web.js';
import { GoogleModule } from './modules/google/google.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ModulesModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    HealthCenterModule,
    AppointmentModule,
    GoogleModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [MyLogger, WhatsappService, Client, MercadoPagoService],
})
export class AppModule {}
