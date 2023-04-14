import { Module } from '@nestjs/common';
import { HealthCenterService } from './health-center.service';
import { HealthCenterController } from './health-center.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthCenterSchema } from './health-center.model';
import { MyLogger } from '../logger';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'HealthCenter', schema: HealthCenterSchema },
    ]),
  ],
  controllers: [HealthCenterController],
  providers: [HealthCenterService, MyLogger],
  exports: [HealthCenterService],
})
export class HealthCenterModule {}
