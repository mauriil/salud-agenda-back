import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthCenterDto } from './create-health-center.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateHealthCenterDto extends PartialType(CreateHealthCenterDto) {
  @ApiProperty({
    example: 'Nuevo centro de salud',
    description: 'The name of the health center',
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    example: 'Sin definir',
    description: 'The location of the health center',
  })
  @IsString()
  @IsNotEmpty()
  public location: string;

  @ApiProperty({
    example: 'https://url.com/photo.png',
    description: 'The photo of the health center',
  })
  @IsString()
  @IsNotEmpty()
  public photo: string;

  @ApiProperty({
    example: {
      Monday: '09:00 - 18:00',
      Tuesday: '09:00 - 18:00 y 19:00 - 21:00',
      Wednesday: '19:00 - 21:00',
      Thursday: 'cerrado',
      Friday: 'cerrado',
      Saturday: 'cerrado',
      Sunday: 'cerrado',
    },
    description: 'The open time of the health center',
  })
  @IsString()
  @IsNotEmpty()
  public openTime: {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
  };
}
