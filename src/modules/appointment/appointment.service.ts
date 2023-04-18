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
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from './appointment.types';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel('Appointment')
    private readonly appointmentModel: Model<Appointment>,
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

    const date = new Date(createAppointmentDto.startTimestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `el dia ${day}/${month}/${year} a las ${hour}:${minutes}`;

    try {
      const emojiStatus =
        createAppointmentDto.payment.payToConfirm === false ? '✅' : '⏳';
      const googleEvent = await this.calendarService.createEvent(
        createAppointmentDto.title
          ? `${emojiStatus} ${createAppointmentDto.title} `
          : `${emojiStatus} ${healthCenter.name} - ${user.name}`,
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
        `Hola ${patient.name}\nTu profesional ${user.name} de ${healthCenter.name} te asignó una nueva cita ${formattedDate}.\nTe llegara un mail con la invitacion al evento, aparecerá en tu calendario de Google.`,
      );

      const newAppointmentObject = {
        ...createAppointmentDto,
        googleEventId: googleEvent.id,
      };

      if (createAppointmentDto.payment.payToConfirm === false) {
        newAppointmentObject.payment.payed = true;
      } else {
        switch (createAppointmentDto.payment.type) {
          case 'mercadopago':
            const MPpaymentLink =
              await this.mercadoPagoService.createPaymentLink({
                id: `${googleEvent.id}`,
                email: patient.email,
                amount:
                  createAppointmentDto.payment.hasToPay === '50%'
                    ? createAppointmentDto.amount / 2
                    : createAppointmentDto.payment.hasToPay === '100%'
                    ? createAppointmentDto.amount
                    : 0,
                title: createAppointmentDto.title,
              });
            this.whatsappService.sendMessage(
              patient.phone,
              `El pago de la consulta se realizará de manera online, el valor es de $${createAppointmentDto.amount} y deberás abonar el ${createAppointmentDto.payment.hasToPay} mediante este link de pago :\n${MPpaymentLink.body.init_point}\n\nRecuerda pagar para reservar tu cita.`,
            );
            newAppointmentObject.payment.paymentUrl =
              MPpaymentLink.body.init_point;
            newAppointmentObject.payment.paymentId = MPpaymentLink.response.id;
            break;
          case 'personal':
            this.whatsappService.sendMessage(
              patient.phone,
              `Recuerda que el pago de la consulta se realizará de manera presencial. El monto es de $${createAppointmentDto.amount}.`,
            );
            break;
          default:
            break;
        }
      }

      const appointment = await this.appointmentModel.create(
        newAppointmentObject,
      );
      return {
        message: 'Event created successfully',
        appointment,
      };
    } catch (error) {
      this.logger.error(error, 'AppointmentService');
      throw new HttpException(error, 400);
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
