import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from './configs/configs.service';
const configService = new ConfigService();

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const options = new DocumentBuilder()
      .setTitle('Gen testing')
      .setDescription(`Gen testing's APIs description`)
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(configService.port);
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
