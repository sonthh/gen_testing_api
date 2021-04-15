import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestResults } from './models/testResult.schema';
import {
  CreateOneService,
  FindOneService,
  TestResult,
} from './types/testResult.interface';

@Injectable()
export class TestResultService {
  constructor(
    @InjectModel(TestResults)
    private readonly testResultModel: Model<TestResult>,
  ) {}

  async createOne({
    createOneTestResult,
    user,
  }: CreateOneService): Promise<TestResult> {
    try {
      const createOneTestParams = {
        ...createOneTestResult,
        createdBy: user._id,
      };

      const testResult = await this.testResultModel.create(createOneTestParams);

      return testResult;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne({ query }: FindOneService): Promise<TestResult> {
    try {
      const testResult = await this.testResultModel
        .findOne(query)
        .populate('createdBy');

      if (!testResult) {
        return Promise.reject({
          name: 'TestResultNotFound',
          code: 404,
        });
      }

      return testResult;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
