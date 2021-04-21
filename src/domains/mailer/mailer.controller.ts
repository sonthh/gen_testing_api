import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailerService } from './mailer.service';

@Controller()
@ApiTags('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('sendToPatient')
  async sendMail(): Promise<any> {
    try {
      await this.mailerService.sendMailToPatient();
    } catch (error) {
      console.log(error);
    }
  }
}
