import { Module } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';
import { WelcomeService } from './welcome/welcome.service';

@Module({
  providers: [SendgridService, WelcomeService],
  exports: [WelcomeService],
})
export class MailerModule {}
