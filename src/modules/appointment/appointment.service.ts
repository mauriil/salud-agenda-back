import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { WhatsappService } from 'src/services/whatsapp/whatsapp.service';

@Injectable()
export class AppointmentService {
  constructor(private whatsappService: WhatsappService) {}
  create(createAppointmentDto: CreateAppointmentDto) {
    this.whatsappService.sendMessage(
      '5493804316087@c.us',
      'Hello world from service',
    );
    return 'This action adds a new appointment';
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
