import { HttpException, Injectable, UseFilters } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.types';
import { MyLogger } from 'src/modules/logger';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly logger: MyLogger,
  ) {}

  retrieveUserByMail(email: string) {
    try {
      return this.userModel.findOne({ email });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Something went wrong', 422);
    }
  }

  retrieveUserById(userId: string): Partial<User> {
    try {
      return this.userModel
        .findById(userId)
        .select('-password') as Partial<User>;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Something went wrong', 422);
    }
  }

  createUser(newUser: User): Promise<User> {
    try {
      this.logger.log(JSON.stringify(newUser), 'createUser');
      const user = this.userModel.create(newUser);
      this.logger.log(JSON.stringify(user), 'created createUser');
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Something went wrong', 422);
    }
  }

  deleteUser() {
    return 'deleteUser';
  }
}
