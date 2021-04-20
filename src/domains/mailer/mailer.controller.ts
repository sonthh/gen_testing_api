import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailerService } from './mailer.service';

@Controller()
@ApiTags('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Get('test')
  async sendMail(): Promise<any> {
    try {
      await this.mailerService.sendMailToPatient();
    } catch (error) {
      console.log(error);
    }
  }
}
