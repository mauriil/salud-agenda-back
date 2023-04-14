import { Module } from '@nestjs/common';
import { GoogleAuthService } from '../../services/google/google-auth.service';
import { GoogleController } from './google.controller';

@Module({
  controllers: [GoogleController],
  providers: [GoogleAuthService],
})
export class GoogleModule {}
