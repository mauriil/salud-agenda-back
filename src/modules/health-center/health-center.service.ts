import { Injectable } from '@nestjs/common';
import { CreateHealthCenterDto } from './dto/create-health-center.dto';
import { UpdateHealthCenterDto } from './dto/update-health-center.dto';
import { MyLogger } from '../logger';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HealthCenter } from './health-center.types';

@Injectable()
export class HealthCenterService {
  constructor(
    @InjectModel('HealthCenter')
    private readonly healthCenterModel: Model<HealthCenter>,
    private readonly logger: MyLogger,
  ) {}
  async create(createHealthCenterDto: CreateHealthCenterDto) {
    await this.healthCenterModel.create({
      name: 'Nuevo centro de salud',
      location: 'Sin definir',
      photo: '',
      openTime: {
        Monday: 'cerrado',
        Tuesday: 'cerrado',
        Wednesday: 'cerrado',
        Thursday: 'cerrado',
        Friday: 'cerrado',
        Saturday: 'cerrado',
        Sunday: 'cerrado',
      },
      userId: createHealthCenterDto.userId,
    });
  }

  findAll() {
    return `This action returns all healthCenter`;
  }

  findOneById(id: number) {
    return `This action returns a #${id} healthCenter`;
  }

  async findOneByUserId(userId: string) {
    return await this.healthCenterModel.findOne({ userId });
  }

  update(id: number, updateHealthCenterDto: UpdateHealthCenterDto) {
    return `This action updates a #${id} healthCenter`;
  }

  remove(id: number) {
    return `This action removes a #${id} healthCenter`;
  }
}
