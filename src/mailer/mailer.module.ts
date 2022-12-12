import { Module } from '@nestjs/common';
import { PasswordResetMailerService } from './password-reset-mailer/password-reset-mailer.service';
import { SendgridService } from './sendgrid.service';
import { WelcomeService } from './welcome/welcome.service';

@Module({
  providers: [SendgridService, WelcomeService, PasswordResetMailerService],
  exports: [WelcomeService, PasswordResetMailerService],
})
export class MailerModule {}
