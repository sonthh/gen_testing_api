import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '../../configs/configs.service';
import {
  User,
  GetCurrentUserCredentials,
  CreateOneService,
} from './types/users.interface';

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

  async createOne({ user }: CreateOneService): Promise<User> {
    try {
      const createUserData = await this.usersModel.create(user);

      return createUserData;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
