import { HttpException, Injectable } from '@nestjs/common';
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
    try {
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
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Something went wrong', 422);
    }
  }

  findAll() {
    return `This action returns all healthCenter`;
  }

  async findOneById(id: string) {
    try {
      return await this.healthCenterModel.findById(id);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Something went wrong', 422);
    }
  }

  async findOneByUserId(userId: string) {
    return await this.healthCenterModel.findOne({ userId });
  }

  async update(id: string, updateHealthCenterDto: UpdateHealthCenterDto) {
    try {
      return await this.healthCenterModel.findByIdAndUpdate(
        id,
        updateHealthCenterDto,
      );
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Something went wrong', 422);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} healthCenter`;
  }
}
