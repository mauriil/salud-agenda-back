import { HttpException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { WhatsappService } from 'src/services/whatsapp/whatsapp.service';
import { GoogleCalendarService } from 'src/services/google/google-calendar.service';
import { MyLogger } from '../logger';
import { MercadoPagoService } from 'src/services/mercado-pago/mercado-pago.service';
import { UsersService } from '../users/users.service';
import { HealthCenterService } from '../health-center/health-center.service';
import { PatientsService } from '../patients/patients.service';

@Injectable()
export class AppointmentService {
  constructor(
    private whatsappService: WhatsappService,
    private readonly calendarService: GoogleCalendarService,
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly logger: MyLogger,
    private readonly userService: UsersService,
    private readonly healthCenterService: HealthCenterService,
    private readonly patientService: PatientsService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const user = await this.userService.retrieveUserById(
      createAppointmentDto.userId,
    );
    if (!user) throw new HttpException('User not found', 400);
    const patient = await this.patientService.findOneById(
      createAppointmentDto.patientId,
    );
    if (!patient) throw new HttpException('Patient not found', 400);
    const healthCenter = await this.healthCenterService.findOneByUserId(
      createAppointmentDto.userId,
    );
    // TODO: traer datos del paciente para colocar el nombre en el createEvent y el email en el attendee y telefono para el whatsapp
    try {
      const event = await this.calendarService.createEvent(
        createAppointmentDto.title
          ? createAppointmentDto.title
          : 'Salud Agenda Meeting',
        createAppointmentDto.description
          ? createAppointmentDto.description
          : `Cita con tu profesional ${user.name}}`,
        healthCenter.location,
        patient.email,
        user.email,
        createAppointmentDto.startTimestamp,
        createAppointmentDto.stopTimestamp,
        user.google.access_token,
        user.google.refresh_token,
      );
      this.whatsappService.sendMessage(
        patient.phone,
        'Tu profesional te asignó una nueva cita. Te llegara un mail con la invitacion al evento, aparecerá en tu calendario de Google y enseguida recibiras el link de pago para reservar tu cita por este mismo medio',
      );
      const paymentLink = await this.mercadoPagoService.createPaymentLink({
        id: `${createAppointmentDto.userId}-${createAppointmentDto.patientId}`,
        email: patient.email,
        amount: createAppointmentDto.amount,
        title: createAppointmentDto.title,
      });
      this.whatsappService.sendMessage(
        patient.phone,
        `Este es tu link de pago:
        ${paymentLink.body.init_point}

        Recuerda pagar para reservar tu cita.`,
      );
      return { message: 'Event created successfully', event, paymentLink };
    } catch (error) {
      this.logger.error(error, 'AppointmentService');
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
