import { Controller, Get, Query } from '@nestjs/common';
import { GoogleAuthService } from '../../services/google/google-auth.service';

@Controller('auth/google')
export class GoogleController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}
  @Get('auth-url')
  async getAuthUrl(): Promise<{ url: string }> {
    const authUrl = await this.googleAuthService.getAuthUrl();
    return { url: authUrl };
  }

  @Get('callback')
  async getTokenFromCode(
    @Query('code') code: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { accessToken, refreshToken } =
      await this.googleAuthService.getTokensFromCode(code);
    console.log('🚀 ~ refreshToken:', refreshToken);
    console.log('🚀 ~ accessToken:', accessToken);
    return { accessToken, refreshToken };
  }
}
