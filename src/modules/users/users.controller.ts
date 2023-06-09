import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwtAuth.guard';
import { getUser } from './users.dto';
import { UsersService } from './users.service';
import { User } from './users.types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('Users')
  @ApiOkResponse({ type: getUser })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Partial<User>> {
    return this.usersService.retrieveUserById(id);
  }

  @ApiTags('Users')
  @ApiOkResponse({ type: getUser })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() newUserData: Partial<User>,
  ): Promise<Partial<User>> {
    return this.usersService.updateOneUser(id, newUserData);
  }
}
