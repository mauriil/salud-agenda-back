import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.model';
import { MyLogger } from 'src/modules/logger';
import { HealthCenterModule } from '../health-center/health-center.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    HealthCenterModule,
  ],
  providers: [UsersService, MyLogger],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
