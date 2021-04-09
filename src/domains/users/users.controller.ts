import { Controller, Request, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './types/users.dto';
import { AuthService } from '../../middlewares/auth/auth.service';

@Controller()
@ApiTags('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  @UseGuards(AuthGuard('local'))

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Request() { user }, @Body() _: LoginDto) {
    try {
      return await this.authService.generateJWT(user);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('create')
  @UseGuards(AuthGuard('local'))
  async createOne(@Request() { user }, @Body() createOneDto: any) {
    try {
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  // todo
  // @UseGuards(Authz('ADMIN')) check scope
  // finding query
}
