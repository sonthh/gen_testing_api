import {
  Controller,
  Request,
  Post,
  Body,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './types/users.dto';
import { AuthService } from '../../middlewares/auth/auth.service';
import { Scopes } from 'src/middlewares/authz/authz.service';
import { CreateUserDto } from './models/users.dto';
import { UsersService } from './users.service';
import { User } from './types/users.interface';
import { ValidationPipe } from 'src/middlewares/pipes/validation.pipe';
import { MyLogger } from '../logger/logger.service';
import { checkControllerErrors } from 'src/helpers/check_errors';

@Controller()
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  private logger = new MyLogger(UsersController.name);

  @Post('auth/login')
  @UseGuards(AuthGuard('local'))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Request() { user }, @Body() _: LoginDto) {
    try {
      const accessToken = await this.authService.generateJWT(user);

      return {
        ...accessToken,
        role: user.role,
      };
    } catch (error) {
      console.log(error);
    }
  }

  @Post('users/create')
  @UseGuards(new Scopes(['ADMIN', 'DOCTOR']))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async createOne(
    @Request() { user },
    @Body() createOneDto: CreateUserDto,
  ): Promise<User> {
    try {
      const newUser = await this.usersService.createOne({
        createOneUser: createOneDto,
        user,
      });

      return newUser;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }

  // todo
  // @UseGuards(Authz('ADMIN')) check scope
  // finding query
}
