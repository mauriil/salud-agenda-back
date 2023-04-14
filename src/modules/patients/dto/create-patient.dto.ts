import { ApiProperty } from '@nestjs/swagger';
import { IsHexadecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({
    example: '5f9f1c9c0b9b9c0b9b9c0b9b',
    description: 'The id of the health center',
  })
  @IsString()
  @IsNotEmpty()
  @IsHexadecimal()
  public healthCenterId: string;

  @ApiProperty({
    example: 'Juan Manuel',
    description: 'The name of the patient',
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'The date of birth of the patient',
  })
  @IsString()
  @IsNotEmpty()
  public dob: string;

  @ApiProperty({
    example: 'user@email.com',
    description: 'The email of the patient',
  })
  @IsString()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the patient',
  })
  @IsString()
  @IsNotEmpty()
  public phone: string;
}
