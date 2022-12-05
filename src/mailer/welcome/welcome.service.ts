import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendgridService } from '../sendgrid.service';
import * as hbs from 'handlebars';
import * as fs from 'fs';

@Injectable()
export class WelcomeService {
  constructor(
    private readonly sendgridService: SendgridService,
    private configService: ConfigService,
  ) {}
  public async sendWelcome(email: string) {
    const emailTemplate = fs
      .readFileSync('./dist/src/mailer/welcome/welcome.hbs')
      .toString();

    const template = hbs.compile(emailTemplate);

    const messageBody = template({
      email: email,
      url: 'https://www.lesgrainesbouquinent.com',
      mainImage: '',
    });

    const mail = {
      to: email,
      subject: 'Bienvenue dans la communauté des graines bouquinent !',
      from: this.configService.get('SENDGRID_SENDER'),
      html: messageBody,
    };

    return await this.sendgridService.send(mail);
  }
}
