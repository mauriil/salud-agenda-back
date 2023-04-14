import { ApiProperty } from '@nestjs/swagger';
import { IsHexadecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreateHealthCenterDto {
  @ApiProperty({
    example: '5f9f1c9c0b9b9c0b9b9c0b9b',
    description: 'The id of the user',
  })
  @IsString()
  @IsNotEmpty()
  @IsHexadecimal()
  public userId: string;
}
