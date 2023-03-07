import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PasswordResetMailerService } from 'src/mailer/password-reset-mailer/password-reset-mailer.service';
import { UsersService } from 'src/users/users.service';
import { MockType } from 'test/types/mock-type';
import { Repository } from 'typeorm';
import { PasswordReset } from './entities/password-reset.entity';
import { PasswordResetService } from './password-reset.service';

describe('PasswordResetService', () => {
  let service: PasswordResetService;
  const passwordResetRepositoryMock: MockType<Repository<PasswordReset>> = {
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordResetService,
        {
          provide: getRepositoryToken(PasswordReset),
          useValue: passwordResetRepositoryMock,
        },
        {
          provide: UsersService,
          useValue: createMock<UsersService>(),
        },
        {
          provide: PasswordResetMailerService,
          useValue: createMock<PasswordResetMailerService>(),
        },
      ],
    }).compile();

    service = module.get<PasswordResetService>(PasswordResetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
