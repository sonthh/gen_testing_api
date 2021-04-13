import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '../../configs/configs.service';
import {
  User,
  GetCurrentUserCredentials,
  CreateOneService,
} from './types/users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users')
    private readonly usersModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}

  async getCurrentUserCredentials(
    query: GetCurrentUserCredentials,
  ): Promise<User> {
    try {
      const user: any = await this.usersModel.findOne(query);

      return user;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async createOne({ createOneUser, user }: CreateOneService): Promise<User> {
    try {
      const password = await bcrypt.hash(
        createOneUser.password,
        this.configService.bcryptSalt,
      );

      const userParam = {
        ...createOneUser,
        createdBy: user,
        password,
      };

      const createUserData = await this.usersModel.create(userParam);

      delete createOneUser.password;

      return createUserData;
    } catch (error) {
      return Promise.reject(error);
    }
  }

}
