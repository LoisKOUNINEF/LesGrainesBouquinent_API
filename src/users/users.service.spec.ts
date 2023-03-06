import { createMock } from '@golevelup/ts-jest';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MailerModule } from 'src/mailer/mailer.module';
import { WelcomeService } from 'src/mailer/welcome/welcome.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

describe('UsersService', () => {
  let service: UsersService;
  const newUser = {
    id: 'randomString',
    name: 'newName',
    email: 'testing@yopmail.com',
    password: 'testing1234',
  };
  const user = {
    id: 'randomString',
    name: 'randomName',
    email: 'nobody@yopmail.com',
    password: '12345678',
  };
  const usersRepositoryMock: MockType<Repository<User>> = {
    create: jest.fn().mockReturnValue(newUser),
    save: jest.fn(),
    remove: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepositoryMock,
        },
        {
          provide: WelcomeService,
          useValue: createMock<WelcomeService>(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user entry', async () => {
      usersRepositoryMock.save.mockReturnValue(newUser);
      const createdUser = await service.create(newUser);
      expect(createdUser).toMatchObject(newUser);
      expect(usersRepositoryMock.save).toHaveBeenCalledWith(newUser);
    });
  });

  describe('findAll', () => {
    it('should return a list with all users', async () => {
      const users = [
        {
          id: 'randomString1',
          name: 'randomName1',
          email: 'nobody1@yopmail.com',
          password: '12345678',
        },
        {
          id: 'randomString2',
          name: 'randomName2',
          email: 'nobody2@yopmail.com',
          password: '12345678',
        },
      ];
      usersRepositoryMock.find.mockReturnValue(users);
      const usersFound = await service.findAll();
      expect(usersFound).toBe(users);
      expect(usersRepositoryMock.find).toHaveBeenCalled();
    });
  });

  describe('findOneById', () => {
    it('should find one user with provided ID', async () => {
      usersRepositoryMock.findOne.mockReturnValue(user);
      const userFound = await service.findOne(user.id);
      expect(userFound).toMatchObject(user);
      expect(usersRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: user.id },
        relations: { books: true },
      });
    });
  });

  describe('findOneByEmail', () => {
    it('should find one user with provided email', async () => {
      usersRepositoryMock.findOne.mockReturnValue(user);
      const userFound = await service.findOneByEmail(user.email);
      expect(userFound).toMatchObject(user);
      expect(usersRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { email: user.email },
      });
    });
  });

  describe('findOneByName', () => {
    it('should find one user with provided name', async () => {
      usersRepositoryMock.findOne.mockReturnValue(user);
      const userFound = await service.findOneByName(user.name);
      expect(userFound).toMatchObject(user);
      expect(usersRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { name: user.name },
      });
    });
  });
});
