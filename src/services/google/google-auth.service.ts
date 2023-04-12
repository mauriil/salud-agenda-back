import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleAuthService {
  private readonly oAuth2Client: OAuth2Client;

  constructor(private configService: ConfigService) {
    this.oAuth2Client = new google.auth.OAuth2(
      this.configService.get<string>('GOOGLE_CLIENT_ID'),
      this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
      this.configService.get<string>('GOOGLE_REDIRECT_URI'),
    );
  }

  async getAccessToken(refreshToken: string): Promise<string> {
    const { tokens } = await this.oAuth2Client.getToken(refreshToken);
    return tokens.access_token;
  }

  async getAuthUrl(): Promise<string> {
    const scopes = ['https://www.googleapis.com/auth/calendar'];
    return this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
  }

  async getTokensFromCode(
    code: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { tokens } = await this.oAuth2Client.getToken(code);
    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;
    return { accessToken, refreshToken };
  }
}
