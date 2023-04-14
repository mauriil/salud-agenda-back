import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientsSchema } from './patients.model';
import { MyLogger } from '../logger';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Patient', schema: PatientsSchema }]),
  ],
  controllers: [PatientsController],
  providers: [PatientsService, MyLogger],
  exports: [PatientsService],
})
export class PatientsModule {}
