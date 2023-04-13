import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

export class newUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    maxLength: 50,
    minLength: 4,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(4)
  public name: string;

  @ApiProperty({
    example: 'user@domain.com',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the user',
    maxLength: 20,
    minLength: 4,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(4)
  public password: string;
}

export class loginUserDto {
  @ApiProperty({
    example: 'user@domain.com',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the user',
    maxLength: 20,
    minLength: 4,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(4)
  public password: string;
}

export class editUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(4)
  @IsOptional()
  public name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(4)
  @IsOptional()
  public password: string;
}

export class getUser {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    maxLength: 50,
    minLength: 4,
  })
  public name: string;

  @ApiProperty({
    example: 'user@domain.com',
    description: 'The email of the user',
  })
  public email: string;

  @ApiProperty({ example: 'YYYY-mm-dd THH:MM:ss' })
  public createdAt: Date;

  @ApiProperty({ example: 'YYYY-mm-dd THH:MM:ss' })
  public updatedAt: Date;
}
