import { TestResultController } from './testResult.controller';
import { TestResultService } from './testResult.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestResults, TestResultSchema } from './models/testResult.schema';

const TestResultModel = MongooseModule.forFeature([
  { name: TestResults, schema: TestResultSchema },
]);

@Module({
  imports: [TestResultModel],
  controllers: [TestResultController],
  providers: [TestResultService],
  exports: [TestResultModel, TestResultService],
})
export class TestResultModule {}
