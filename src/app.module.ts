import { Module } from '@nestjs/common';
import { ConfigModule } from './configs/configs.module';
import { UsersModule } from './domains/users/users.module';
import { ConfigService } from './configs/configs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from './domains/logger/logger.module';

const DatabaseModule = MongooseModule.forRootAsync({
  useFactory: async (configService: ConfigService) => {
    return {
      uri: configService.database.uri,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
  },
  inject: [ConfigService],
});

@Module({
  imports: [ConfigModule, DatabaseModule, UsersModule, LoggerModule],
})
export class AppModule {}
