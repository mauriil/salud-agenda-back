import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.types';
import { MyLogger } from 'src/modules/logger';
import { HealthCenterService } from '../health-center/health-center.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly logger: MyLogger,
    private readonly healthCenterService: HealthCenterService,
  ) {}

  retrieveUserByMail(email: string) {
    try {
      return this.userModel.findOne({ email });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Something went wrong', 422);
    }
  }

  async retrieveUserById(userId: string): Promise<Partial<User>> {
    try {
      return (await this.userModel
        .findById(userId)
        .select('-password')) as Partial<User>;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Something went wrong', 422);
    }
  }

  async createUser(newUser: User): Promise<User> {
    try {
      const createdUser: User = await this.userModel.create(newUser);
      await this.healthCenterService.create({ userId: createdUser._id });
      return createdUser;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Something went wrong', 422);
    }
  }

  deleteUser() {
    return 'deleteUser';
  }

  async updateOneUser(
    userId: string,
    newUserData: Partial<User>,
  ): Promise<Partial<User>> {
    try {
      const userExists = await this.retrieveUserById(userId);
      if (!userExists) throw new HttpException('User not found', 400);

      return (await this.userModel
        .findOneAndUpdate({ _id: userId }, { $set: newUserData }, { new: true })
        .select('-password')) as Partial<User>;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Something went wrong', 422);
    }
  }
}
