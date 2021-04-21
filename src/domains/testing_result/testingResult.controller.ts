import {
  Controller,
  Post,
  UseGuards,
  UsePipes,
  Request,
  Body,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Scopes } from 'src/middlewares/authz/authz.service';
import { ValidationPipe } from 'src/middlewares/pipes/validation.pipe';
import { MyLogger } from '../logger/logger.service';
import { TestingResultService } from './testingResult.service';
import {
  FindManyTestingResultResponse,
  TestingResult,
} from './types/testingResult.interface';
import {
  CreateTestingResultDto,
  FindManyDto,
  UpdateTestingResultDto,
} from './models/testingResult.dto';
import { checkControllerErrors } from 'src/helpers/check_errors';
import { ApiTags } from '@nestjs/swagger';
import { TestingService } from '../testing/testing.service';

@Controller('testing_results')
@ApiTags('testing_results')
export class TestingResultController {
  constructor(
    private readonly testingResultService: TestingResultService,
    private readonly testingService: TestingService,
  ) {}

  private logger = new MyLogger(TestingResultController.name);

  @Post()
  // @UseGuards(new Scopes(['ADMIN', 'DOCTOR']))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async createOne(
    @Request() { user },
    @Body() createOneDto: CreateTestingResultDto,
  ): Promise<TestingResult> {
    try {
      await this.testingService.findOne({
        query: { _id: createOneDto.testingId },
      });

      const result = await this.testingResultService.createOne({
        createOneTestingResult: { ...createOneDto },
        user,
      });

      return result;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }

  @Get(':id')
  // @UseGuards(new Scopes(['ADMIN', 'DOCTOR']))
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param() { id }): Promise<any> {
    try {
      const testingResult = await this.testingResultService.findOne({
        query: { _id: id },
      });

      return testingResult;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }

  @Get('')
  // @UseGuards(new Scopes(['ADMIN', 'DOCTOR']))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async findMany(
    @Query() findManyDto: FindManyDto,
  ): Promise<FindManyTestingResultResponse> {
    try {
      const testResults = await this.testingResultService.findMany({
        query: findManyDto,
      });

      return testResults;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }

  // @Put(':id')
  // // @UseGuards(new Scopes(['ADMIN', 'DOCTOR', 'PATIENT']))
  // @UseGuards(AuthGuard('jwt'))
  // @UsePipes(new ValidationPipe())
  // async updateOne(
  //   @Body() updateTestResultDto: UpdateTestResultDto,
  //   @Param() { id },
  // ): Promise<TestResult> {
  //   try {
  //     const updatedTestResult = await this.testResultService.updateOne({
  //       query: { _id: id },
  //       updateOneTestResult: updateTestResultDto,
  //     });

  //     return updatedTestResult;
  //   } catch (error) {
  //     this.logger.error(`${error.code}:${error.name}:${error.stack}`);
  //     checkControllerErrors(error);
  //   }
  // }

  // @Delete(':id')
  // // @UseGuards(new Scopes(['ADMIN', 'DOCTOR', 'PATIENT']))
  // @UseGuards(AuthGuard('jwt'))
  // async deleteOne(@Param() { id }): Promise<boolean> {
  //   try {
  //     const updatedTestResult = await this.testResultService.deleteOne({
  //       query: { _id: id },
  //     });

  //     return updatedTestResult;
  //   } catch (error) {
  //     this.logger.error(`${error.code}:${error.name}:${error.stack}`);
  //     checkControllerErrors(error);
  //   }
  // }
}
