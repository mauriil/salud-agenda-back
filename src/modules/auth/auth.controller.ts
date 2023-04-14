import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { loginUserDto, newUserDto } from 'src/modules/users/users.dto';
import { User, UserLogin } from 'src/modules/users/users.types';
import { AuthService } from './auth.service';

@ApiTags('users')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  @ApiOkResponse({ description: '{ access-token: string }' })
  @HttpCode(200)
  async signIn(@Body() loginUser: loginUserDto): Promise<UserLogin> {
    return this.authService.signIn(loginUser as Partial<User>);
  }

  @Post('signUp')
  @ApiCreatedResponse()
  async signUp(@Body() newUser: newUserDto): Promise<void> {
    return this.authService.signUp(newUser as User);
  }
}
