import { Injectable } from '@nestjs/common';
import { calendar_v3, google } from 'googleapis';
import { ConfigService } from '@nestjs/config';
import { MyLogger } from 'src/modules/logger';
import { GoogleAuthService } from './google-auth.service';
const logger = new MyLogger();

@Injectable()
export class GoogleCalendarService {
  constructor(
    private configService: ConfigService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  async createEvent(
    summary: string,
    patientEmail: string,
    doctorEmail: string,
    start: string,
    end: string,
    access_token: string,
    refresh_token: string,
  ) {
    try {
      const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
      const clientSecret = this.configService.get<string>(
        'GOOGLE_CLIENT_SECRET',
      );
      const calendarId = this.configService.get<string>('GOOGLE_CALENDAR_ID');

      const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);

      oauth2Client.setCredentials({
        access_token,
        refresh_token,
      });

      const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

      const event: calendar_v3.Params$Resource$Events$Insert = {
        calendarId,
        auth: oauth2Client,
        requestBody: {
          summary,
          location: '800 Howard St., San Francisco, CA 94103',
          description:
            "A chance to hear more about Google's developer products.",
          start: {
            dateTime: start,
            timeZone: 'America/Argentina/Buenos_Aires',
          },
          end: {
            dateTime: end,
            timeZone: 'America/Argentina/Buenos_Aires',
          },
          attendees: [{ email: patientEmail }, { email: doctorEmail }],
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 24 * 60 },
              { method: 'popup', minutes: 10 },
            ],
          },
        },
        sendUpdates: 'all',
      };

      const response = await calendar.events.insert(event);
      logger.log(response.data, 'GoogleCalendarService [RESPONSE]');
      return response.data;
    } catch (error) {
      logger.error(error, 'GoogleCalendarService');
    }
  }
}
