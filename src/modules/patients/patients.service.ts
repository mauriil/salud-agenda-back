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

  async findAll(healthCenterId: string) {
    try {
      return await this.patientModel.find({ healthCenterId });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Something went wrong', 422);
    }
  }

  async findOneById(id: string) {
    try {
      return await this.patientModel.findById(id);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Something went wrong', 422);
    }
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    try {
      return await this.patientModel.findByIdAndUpdate(id, updatePatientDto);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Something went wrong', 422);
    }
  }

  async remove(id: number) {
    try {
      return await this.patientModel.findByIdAndDelete(id);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Something went wrong', 422);
    }
  }
}
