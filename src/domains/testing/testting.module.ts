import { TestResultController } from './testing.controller';
import { TestResultService } from './testting.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestResults, TestResultSchema } from './models/testting.schema';

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
