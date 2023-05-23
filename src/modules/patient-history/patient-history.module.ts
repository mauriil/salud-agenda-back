import { Module } from '@nestjs/common';
import { PatientHistoryService } from './patient-history.service';
import { PatientHistoryController } from './patient-history.controller';

@Module({
  controllers: [PatientHistoryController],
  providers: [PatientHistoryService]
})
export class PatientHistoryModule {}
