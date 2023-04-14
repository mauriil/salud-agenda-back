import { Module } from '@nestjs/common';
import { AppointmentModule } from './appointment/appointment.module';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [AppointmentModule, PatientsModule],
})
export class ModulesModule {}
