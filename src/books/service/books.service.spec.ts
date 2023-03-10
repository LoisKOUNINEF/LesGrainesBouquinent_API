import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from 'src/users/service/users.service';
import { MockType } from 'test/types/mock-type';
import { Repository } from 'typeorm';
import { BooksService } from './books.service';
import { Book } from '../entities/book.entity';
import { User } from 'src/users/entities/user.entity';

describe('BooksService', () => {
  let service: BooksService;
  const booksRepositoryMock: MockType<Repository<Book>> = {
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: booksRepositoryMock,
        },
        {
          provide: UsersService,
          useValue: createMock<UsersService>(),
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
