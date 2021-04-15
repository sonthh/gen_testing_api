import {
  Controller,
  Post,
  UseGuards,
  UsePipes,
  Request,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Scopes } from 'src/middlewares/authz/authz.service';
import { ValidationPipe } from 'src/middlewares/pipes/validation.pipe';
import { MyLogger } from '../logger/logger.service';
import { TestResultService } from './testResult.service';
import { TestResult } from './types/testResult.interface';
import { CreateTestResultDto } from './models/testResult.dto';
import { checkControllerErrors } from 'src/helpers/check_errors';

@Controller('test_results')
export class TestResultController {
  constructor(private readonly testResultService: TestResultService) {}

  private logger = new MyLogger(TestResultController.name);

  @Post()
  @UseGuards(new Scopes(['ADMIN', 'DOCTOR']))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async createOne(
    @Request() { user },
    @Body() createOneDto: CreateTestResultDto,
  ): Promise<TestResult> {
    try {
      const newUser = await this.testResultService.createOne({
        createOneTestResult: { ...createOneDto },
        user,
      });

      return newUser;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }

  @Get(':id')
  @UseGuards(new Scopes(['ADMIN', 'DOCTOR']))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async findOne(@Request() { user }, @Param() { id }): Promise<TestResult> {
    try {
      const newUser = await this.testResultService.findOne({
        query: { _id: id },
      });

      return newUser;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }
}
