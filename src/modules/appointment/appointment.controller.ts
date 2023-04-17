import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @ApiTags('appointment')
  @ApiCreatedResponse()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @ApiTags('appointment')
  @ApiCreatedResponse()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
