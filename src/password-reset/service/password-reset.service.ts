import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  noUser,
  passwordLength,
  tokenNotFound,
} from 'common/exceptions/password-reset.exceptions';
import { PasswordResetMailerService } from 'src/mailer/password-reset-mailer/password-reset-mailer.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/service/users.service';
import { Repository } from 'typeorm';
import { PasswordReset } from '../entities/password-reset.entity';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(PasswordReset)
    private passwordResetRepository: Repository<PasswordReset>,
    private usersService: UsersService,
    private passwordResetMailerService: PasswordResetMailerService,
  ) {}

  async create(email: string): Promise<any> {
    const user = this.usersService.findOneByEmail(email);
    if (!user) {
      noUser();
    }

    const alreadyExists = await this.findOneByEmail(email);
    if (alreadyExists) {
      return await this.passwordResetMailerService.sendResetLink(alreadyExists);
    }

    const newPwdReset = this.passwordResetRepository.create({ email });
    const pwdReset = await this.passwordResetRepository.save(newPwdReset);

    return await this.passwordResetMailerService.sendResetLink(pwdReset);
  }

  async reset(id: string, password: string): Promise<User> {
    if (password.length < 10) {
      passwordLength();
    }

    const pwdReset = await this.findOne(id);

    if (!pwdReset) {
      tokenNotFound();
    }

    const user = await this.usersService.findOneByEmail(pwdReset.email);

    return await this.usersService.update(user.id, { password: password });
  }

  findOne(id: string): Promise<PasswordReset> {
    return this.passwordResetRepository.findOneBy({ id: id });
  }

  findOneByEmail(email: string): Promise<PasswordReset> {
    return this.passwordResetRepository.findOneBy({ email: email });
  }

  async remove(id: string) {
    const pwdReset = await this.findOne(id);
    return await this.passwordResetRepository.delete(pwdReset);
  }
}
