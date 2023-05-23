import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientHistoryService } from './patient-history.service';
import { CreatePatientHistoryDto } from './dto/create-patient-history.dto';
import { UpdatePatientHistoryDto } from './dto/update-patient-history.dto';

@Controller('patient-history')
export class PatientHistoryController {
  constructor(private readonly patientHistoryService: PatientHistoryService) {}

  @Post()
  create(@Body() createPatientHistoryDto: CreatePatientHistoryDto) {
    return this.patientHistoryService.create(createPatientHistoryDto);
  }

  @Get()
  findAll() {
    return this.patientHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientHistoryDto: UpdatePatientHistoryDto) {
    return this.patientHistoryService.update(+id, updatePatientHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientHistoryService.remove(+id);
  }
}
