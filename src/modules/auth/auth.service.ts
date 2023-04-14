import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { MyLogger } from 'src/modules/logger';
import { UsersService } from 'src/modules/users/users.service';
import { User } from 'src/modules/users/users.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private readonly logger: MyLogger,
  ) {}

  async signIn(loginUser: Partial<User>) {
    try {
      const user = await this.usersService.retrieveUserByMail(loginUser.email);
      if (!user) throw new HttpException('User not found', 400);

      const validPassword = await verify(user.password, loginUser.password);
      if (!validPassword) throw new ForbiddenException('Invalid credentials');

      const payload = { username: user.name, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Something went wrong', 422);
    }
  }

  async signUp(newUser: User) {
    try {
      const newUserObject = newUser;
      newUserObject.password = await hash(newUser.password);
      await this.usersService.createUser(newUserObject);
      return;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Something went wrong', 422);
    }
  }
}
