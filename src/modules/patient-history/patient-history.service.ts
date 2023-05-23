import { Injectable } from '@nestjs/common';
import { CreatePatientHistoryDto } from './dto/create-patient-history.dto';
import { UpdatePatientHistoryDto } from './dto/update-patient-history.dto';

@Injectable()
export class PatientHistoryService {
  create(createPatientHistoryDto: CreatePatientHistoryDto) {
    return 'This action adds a new patientHistory';
  }

  findAll() {
    return `This action returns all patientHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patientHistory`;
  }

  update(id: number, updatePatientHistoryDto: UpdatePatientHistoryDto) {
    return `This action updates a #${id} patientHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} patientHistory`;
  }
}
