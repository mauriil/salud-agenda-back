import { HttpException, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient } from './patients.types';
import { MyLogger } from '../logger';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel('Patient') private readonly patientModel: Model<Patient>,
    private readonly logger: MyLogger,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    try {
      return await this.patientModel.create(createPatientDto);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Something went wrong', 422);
    }
  }

  findAll() {
    return `This action returns all patients`;
  }

  async findOneById(id: string) {
    return await this.patientModel.findById(id);
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
