import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { WhatsappService } from 'src/services/whatsapp/whatsapp.service';
import { GoogleCalendarService } from 'src/services/google/google-calendar.service';
import { MyLogger } from '../logger';
const logger = new MyLogger();

@Injectable()
export class AppointmentService {
  constructor(
    private whatsappService: WhatsappService,
    private readonly calendarService: GoogleCalendarService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
// 🚀 ~ refreshToken: 1//0f_xl5ZsnSe9NCgYIARAAGA8SNwF-L9IrUEoa92jHqRiMSapyCXH9J9TbIx68dngdVsOQBJ4HZd6opMGAcfmaDjS5AXtHAMI8xbw
//🚀 ~ accessToken: ya29.a0Ael9sCNkTj8G_6hkyVldFf7v_rGBtxKQYR7y1ZwMNzLtl4rJtebv7kEFepPhPGRPIc6sApHCO2fVDLYgdzAqQc9RdGf1ghaPod4JK5lZ-XKVc0tft2u4J_Ua9FMT53bIVNiK-t9ha86BOEuoSp-IIddf732GaCgYKAbsSARASFQF4udJhsOp_24uFYi9cmLV_ib7ZJQ0163
    try {
      const event = await this.calendarService.createEvent(
        'Evento test',
        'mauricio@gogrow.dev',
        'mauricio.mm94@gmail.com',
        '2023-04-12T20:00:00-03:00',
        '2023-04-12T22:00:00-03:00',
        'ya29.a0Ael9sCNkTj8G_6hkyVldFf7v_rGBtxKQYR7y1ZwMNzLtl4rJtebv7kEFepPhPGRPIc6sApHCO2fVDLYgdzAqQc9RdGf1ghaPod4JK5lZ-XKVc0tft2u4J_Ua9FMT53bIVNiK-t9ha86BOEuoSp-IIddf732GaCgYKAbsSARASFQF4udJhsOp_24uFYi9cmLV_ib7ZJQ0163',
        '1//0f_xl5ZsnSe9NCgYIARAAGA8SNwF-L9IrUEoa92jHqRiMSapyCXH9J9TbIx68dngdVsOQBJ4HZd6opMGAcfmaDjS5AXtHAMI8xbw',
      );
      this.whatsappService.sendMessage(
        '5493804252022',
        'Hello world from service',
      );
      return { message: 'Event created successfully', event };
    } catch (error) {
      logger.error(error, 'AppointmentService');
    }
  }

  findAll() {
    return `This action returns all appointment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
