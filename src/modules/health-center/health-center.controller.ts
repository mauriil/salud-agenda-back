import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HealthCenterService } from './health-center.service';
import { CreateHealthCenterDto } from './dto/create-health-center.dto';
import { UpdateHealthCenterDto } from './dto/update-health-center.dto';

@Controller('health-center')
export class HealthCenterController {
  constructor(private readonly healthCenterService: HealthCenterService) {}

  @Post()
  create(@Body() createHealthCenterDto: CreateHealthCenterDto) {
    return this.healthCenterService.create(createHealthCenterDto);
  }

  @Get()
  findAll() {
    return this.healthCenterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthCenterService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHealthCenterDto: UpdateHealthCenterDto,
  ) {
    return this.healthCenterService.update(+id, updateHealthCenterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthCenterService.remove(+id);
  }
}
