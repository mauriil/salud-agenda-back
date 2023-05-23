import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsHexadecimal,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class Payment {
  @ApiProperty({
    example: "'personal' || 'mercadopago']",
    description: 'The type of payment',
  })
  @IsString()
  @IsNotEmpty()
  public type: string;

  @ApiProperty({
    example: 'false',
    description: 'If the payment is required to confirm the appointment',
  })
  @IsBoolean()
  @IsNotEmpty()
  public payToConfirm: boolean;

  @ApiProperty({
    example: "'0%' || '50%' || '100%'",
    description: 'The percentage of the payment that has to be payed',
  })
  @IsString()
  @IsNotEmpty()
  public hasToPay: string;

  @ApiProperty({
    example: 'false',
    description: 'If the payment has been payed',
  })
  @IsBoolean()
  @IsNotEmpty()
  public payed: boolean;

  public paymentUrl: string;

  public mercadoPagoPaymentId: string;
}
export class CreateAppointmentDto {
  @ApiProperty({
    example: '5f9f1c9c0b9b9c0b9b9c0b9b',
    description: 'The id of the user',
  })
  @IsString()
  @IsNotEmpty()
  @IsHexadecimal()
  public userId: string;

  @ApiProperty({
    example: '5f9f1c9c0b9b9c0b9b9c0b9b',
    description: 'The id of the patient',
  })
  @IsString()
  @IsNotEmpty()
  @IsHexadecimal()
  public patientId: string;

  @ApiProperty({
    example: 'Meeting with the doctor',
    description: 'The title of the appointment',
  })
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty({
    example: 'This is the description of the appointment',
    description: 'The description of the appointment',
  })
  @IsString()
  @IsNotEmpty()
  public description: string;

  @ApiProperty({
    example: 100,
    description: 'The amount to pay for the appointment ($ARS)',
  })
  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @ApiProperty({
    example: '2023-04-12T20:00:00-03:00',
    description: 'The start timestamp of the appointment',
  })
  @IsString()
  @IsNotEmpty()
  public startTimestamp: string;

  @ApiProperty({
    example: '2023-04-12T21:00:00-03:00',
    description: 'The stop timestamp of the appointment',
  })
  @IsString()
  @IsNotEmpty()
  public stopTimestamp: string;

  @ApiProperty({
    example: {
      type: 'personal',
      payToConfirm: false,
      hasToPay: '0%',
      payed: true,
    },
    description: 'The payment object',
  })
  @IsNotEmpty()
  @IsObject()
  public payment: Payment;
}
