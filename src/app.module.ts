import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ModulesModule } from './modules/modules.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthCenterModule } from './modules/health-center/health-center.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { WhatsappService } from './services/whatsapp/whatsapp.service';
import { MercadoPagoService } from './services/mercado-pago/mercado-pago.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ModulesModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    HealthCenterModule,
    AppointmentModule,
  ],
  controllers: [],
  providers: [WhatsappService, MercadoPagoService],
})
export class AppModule {}
